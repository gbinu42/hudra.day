import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import { readdir, readFile, rm, stat } from "fs/promises";
import path from "path";
import {
  appendSiteAccessArgs,
  cleanupPreparedCookies,
  createStagingDir,
  freeBytes,
  isWsl,
  moveIntoPlace,
  resolveCookiesPath,
  resolveDownloadsDir,
  resolveYtDlpPath,
  toWindowsPath,
  uniqueDestination,
  ytDlpVersion,
} from "@/lib/dev/video-download";
import type {
  DownloadPhase,
  VideoDownloadEnvironment,
  VideoDownloadEvent,
} from "@/lib/dev/video-download-types";

/** A three hour Facebook Live can take a while on a slow connection. */
const DOWNLOAD_TIMEOUT_MS = 4 * 60 * 60 * 1000;

/** Marker that separates machine-readable progress from yt-dlp's chatter. */
const PROGRESS_PREFIX = "@@DL@@";

const INFO_FILE = ".hudra-info";

const PROGRESS_TEMPLATE = [
  "%(progress.downloaded_bytes)s",
  "%(progress.total_bytes)s",
  "%(progress.total_bytes_estimate)s",
  "%(progress.speed)s",
  "%(progress.eta)s",
  "%(info.vcodec)s",
  "%(info.acodec)s",
].join("|");

const INFO_TEMPLATE = [
  "%(id)s",
  "%(duration)s",
  "%(width)s",
  "%(height)s",
  "%(title)s",
].join("|");

function normaliseUrl(input: string): string {
  const trimmed = input.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

/** yt-dlp writes "NA" for values it does not have yet. */
function toNumber(value: string | undefined): number | undefined {
  if (!value || value === "NA" || value === "None") return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function phaseFor(vcodec?: string, acodec?: string): DownloadPhase {
  const hasVideo = Boolean(vcodec) && vcodec !== "none" && vcodec !== "NA";
  const hasAudio = Boolean(acodec) && acodec !== "none" && acodec !== "NA";
  if (hasVideo && hasAudio) return "media";
  if (hasVideo) return "video";
  if (hasAudio) return "audio";
  return "media";
}

export async function GET() {
  const dir = await resolveDownloadsDir();

  let version: string | null = null;
  let ytDlpError: string | null = null;
  try {
    version = await ytDlpVersion();
  } catch (error) {
    ytDlpError = error instanceof Error ? error.message : String(error);
  }

  const environment: VideoDownloadEnvironment = {
    destination: {
      dir,
      windowsDir: await toWindowsPath(dir),
      freeBytes: await freeBytes(dir),
    },
    ytDlpVersion: version,
    ytDlpError,
    cookiesPath: resolveCookiesPath(),
  };

  return NextResponse.json(environment);
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { url?: string };
  if (!body.url?.trim()) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  const url = normaliseUrl(body.url);
  let host: string;
  try {
    host = new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  let ytDlpPath: string;
  try {
    ytDlpPath = await resolveYtDlpPath();
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 400 },
    );
  }

  const downloadsDir = await resolveDownloadsDir();
  const stagingDir = await createStagingDir();
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      let closed = false;

      const send = (event: VideoDownloadEvent) => {
        if (closed) return;
        controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`));
      };
      const finish = async () => {
        if (closed) return;
        closed = true;
        await rm(stagingDir, { recursive: true, force: true });
        controller.close();
      };

      send({ type: "stage", message: "Resolving media…" });

      const args = [
        // Best video plus best audio, falling back to the best single stream.
        "-f",
        "bv*+ba/b",
        "--merge-output-format",
        "mp4",
        "-o",
        path.join(stagingDir, "%(title).150B [%(id)s].%(ext)s"),
        "--no-playlist",
        "--newline",
        "--no-warnings",
        "--retries",
        "10",
        "--fragment-retries",
        "10",
        // Fragmented (DASH) sources dominate here and parallelise well.
        "--concurrent-fragments",
        "4",
        "--progress-template",
        `download:${PROGRESS_PREFIX}${PROGRESS_TEMPLATE}`,
        "--print-to-file",
        INFO_TEMPLATE,
        path.join(stagingDir, INFO_FILE),
      ];

      if (isWsl()) {
        // The file lands on NTFS, so keep the name legal there.
        args.push("--windows-filenames");
      }

      const cookiesPath = await appendSiteAccessArgs(args, host);
      args.push(url);

      const ytDlp = spawn(ytDlpPath, args);
      let stderr = "";
      let lastEmit = 0;

      const kill = () => {
        try {
          ytDlp.kill("SIGKILL");
        } catch {
          // Already gone.
        }
      };

      const timeout = setTimeout(kill, DOWNLOAD_TIMEOUT_MS);
      request.signal.addEventListener("abort", kill);

      let pending = "";
      const handleChunk = (data: Buffer) => {
        pending += data.toString();
        const lines = pending.split("\n");
        pending = lines.pop() ?? "";

        for (const raw of lines) {
          const line = raw.replace(/\r/g, "").trim();
          if (!line) continue;

          if (line.startsWith(PROGRESS_PREFIX)) {
            const [downloaded, total, estimate, speed, eta, vcodec, acodec] =
              line.slice(PROGRESS_PREFIX.length).split("|");

            // yt-dlp emits several updates a second; the UI needs far fewer.
            const now = Date.now();
            if (now - lastEmit < 250) continue;
            lastEmit = now;

            const transferred = toNumber(downloaded) ?? 0;
            const size = toNumber(total) ?? toNumber(estimate) ?? null;
            send({
              type: "progress",
              phase: phaseFor(vcodec, acodec),
              transferred,
              total: size,
              percent: size ? Math.min(100, (transferred / size) * 100) : null,
              speed: toNumber(speed),
              eta: toNumber(eta),
            });
            continue;
          }

          if (line.includes("[Merger]")) {
            send({ type: "stage", message: "Merging video and audio…" });
          } else if (line.includes("[FixupM3u8]") || line.includes("[Fixup")) {
            send({ type: "stage", message: "Repairing container…" });
          }
        }
      };

      ytDlp.stdout.on("data", handleChunk);
      ytDlp.stderr.on("data", (data: Buffer) => {
        stderr += data.toString();
        handleChunk(data);
      });

      ytDlp.on("error", async (error) => {
        clearTimeout(timeout);
        await cleanupPreparedCookies(cookiesPath);
        send({ type: "error", message: error.message });
        await finish();
      });

      ytDlp.on("close", async (code) => {
        clearTimeout(timeout);
        await cleanupPreparedCookies(cookiesPath);

        if (code !== 0) {
          send({
            type: "error",
            message: request.signal.aborted
              ? "Download cancelled"
              : `yt-dlp exited with ${code}: ${stderr.slice(-800)}`,
          });
          await finish();
          return;
        }

        try {
          const entries = await readdir(stagingDir, { withFileTypes: true });
          const candidates = entries.filter(
            (entry) =>
              entry.isFile() &&
              !entry.name.startsWith(".") &&
              !entry.name.endsWith(".part") &&
              !entry.name.endsWith(".ytdl"),
          );
          if (candidates.length === 0) {
            throw new Error("yt-dlp finished but produced no file");
          }

          const sized = await Promise.all(
            candidates.map(async (entry) => {
              const filePath = path.join(stagingDir, entry.name);
              return { filePath, name: entry.name, size: (await stat(filePath)).size };
            }),
          );
          const staged = sized.sort((a, b) => b.size - a.size)[0];

          const available = await freeBytes(downloadsDir);
          if (available !== null && available < staged.size) {
            throw new Error(
              `Not enough space in the destination folder: the file is ${Math.round(
                staged.size / 1024 / 1024,
              )} MB but only ${Math.round(available / 1024 / 1024)} MB is free.`,
            );
          }

          send({ type: "stage", message: "Copying to Downloads…" });

          const destination = uniqueDestination(downloadsDir, staged.name);
          let lastCopyEmit = 0;
          const copyStarted = Date.now();

          await moveIntoPlace(staged.filePath, destination, (copied, total) => {
            const now = Date.now();
            if (now - lastCopyEmit < 250 && copied < total) return;
            lastCopyEmit = now;

            const elapsed = (now - copyStarted) / 1000;
            const speed = elapsed > 0 ? copied / elapsed : undefined;
            send({
              type: "progress",
              phase: "copy",
              transferred: copied,
              total,
              percent: (copied / total) * 100,
              speed,
              eta: speed ? (total - copied) / speed : undefined,
            });
          });

          const info = await readInfo(stagingDir);

          send({
            type: "complete",
            file: {
              name: path.basename(destination),
              path: (await toWindowsPath(destination)) ?? destination,
              size: staged.size,
              ...info,
            },
          });
        } catch (error) {
          send({
            type: "error",
            message: error instanceof Error ? error.message : String(error),
          });
        } finally {
          await finish();
        }
      });
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
    },
  });
}

/** Metadata is cosmetic, so a missing or malformed sidecar is not fatal. */
async function readInfo(stagingDir: string): Promise<{
  title?: string;
  duration?: number;
  width?: number;
  height?: number;
}> {
  try {
    const raw = await readFile(path.join(stagingDir, INFO_FILE), "utf8");
    const line = raw.split("\n").find((entry) => entry.trim());
    if (!line) return {};

    const [, duration, width, height, ...titleParts] = line.trim().split("|");
    return {
      title: titleParts.join("|") || undefined,
      duration: toNumber(duration),
      width: toNumber(width),
      height: toNumber(height),
    };
  } catch {
    return {};
  }
}
