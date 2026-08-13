import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import { mkdir, readdir, rename } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import {
  deleteWorkspace,
  ensureWorkspaceRoot,
  fileSize,
  isValidWorkspaceId,
  listWorkspaces,
  mimeForExt,
  normaliseToAudio,
  probe,
  writeMeta,
  workspaceDir,
  type WorkspaceMeta,
} from "@/lib/dev/audio-workspace";
import {
  appendSiteAccessArgs,
  cleanupPreparedCookies,
  resolveYtDlpPath,
} from "@/lib/dev/video-download";

const SUPPORTED_HOSTS = [
  "youtube.com",
  "youtu.be",
  "facebook.com",
  "fb.com",
  "fb.watch",
  "instagram.com",
  "vimeo.com",
  "dailymotion.com",
  "soundcloud.com",
  "twitter.com",
  "x.com",
];

function normaliseUrl(input: string): string {
  const trimmed = input.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

function parseProgress(line: string) {
  const clean = line.replace(/\r/g, "").trim();
  const match = clean.match(
    /\[download\]\s+(\d+\.?\d*)%(?:\s+of\s+~?\s*([\d.]+\w+))?(?:\s+at\s+([\d.]+\w+\/s))?(?:\s+ETA\s+([\d:]+))?/,
  );
  if (!match) return null;
  return {
    percent: parseFloat(match[1]),
    fileSize: match[2] || undefined,
    speed: match[3] || undefined,
    eta: match[4] || undefined,
  };
}

export async function GET() {
  const workspaces = await listWorkspaces();
  return NextResponse.json({ workspaces });
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!isValidWorkspaceId(id)) {
    return NextResponse.json({ error: "Invalid workspace id" }, { status: 400 });
  }
  await deleteWorkspace(id);
  return NextResponse.json({ ok: true });
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { url?: string };
  if (!body.url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  const url = normaliseUrl(body.url);
  let host: string;
  try {
    host = new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  if (!SUPPORTED_HOSTS.some((h) => host === h || host.endsWith(`.${h}`))) {
    return NextResponse.json(
      {
        error: `Unsupported host "${host}". Supported: ${SUPPORTED_HOSTS.join(", ")}`,
      },
      { status: 400 },
    );
  }

  let ytDlpPath: string;
  try {
    ytDlpPath = await resolveYtDlpPath();
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "yt-dlp binary not found",
      },
      { status: 400 },
    );
  }

  await ensureWorkspaceRoot();
  const id = randomUUID();
  const dir = workspaceDir(id);
  await mkdir(dir, { recursive: true });

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      let closed = false;
      const send = (event: unknown) => {
        if (closed) return;
        controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`));
      };
      const finish = () => {
        if (closed) return;
        closed = true;
        controller.close();
      };

      send({ type: "stage", message: "Resolving media…" });

      // Prefer a mid-quality audio-only stream: good enough for sectioning
      // work while keeping 3h downloads small.
      const args = [
        "-f",
        "bestaudio[ext=m4a]/bestaudio/best",
        "-o",
        path.join(dir, "source.%(ext)s"),
        "--no-playlist",
        "--newline",
        "--no-warnings",
        "--print-to-file",
        "%(title)s",
        path.join(dir, "title.txt"),
      ];

      const cookiesPath = await appendSiteAccessArgs(args, host);
      args.push(url);

      const ytDlp = spawn(ytDlpPath, args);
      let stderr = "";
      let lastPercent = -1;

      const onData = (data: Buffer) => {
        for (const line of data.toString().split("\n")) {
          const progress = parseProgress(line);
          if (progress?.percent !== undefined) {
            if (Math.abs(progress.percent - lastPercent) >= 0.5) {
              lastPercent = progress.percent;
              send({ type: "progress", ...progress });
            }
          }
        }
      };

      ytDlp.stdout.on("data", onData);
      ytDlp.stderr.on("data", (data: Buffer) => {
        stderr += data.toString();
        onData(data);
      });

      const timeout = setTimeout(
        () => {
          try {
            ytDlp.kill("SIGKILL");
          } catch {
            // already gone
          }
        },
        60 * 60 * 1000,
      );

      ytDlp.on("error", async (error) => {
        clearTimeout(timeout);
        await cleanupPreparedCookies(cookiesPath);
        send({ type: "error", message: error.message });
        finish();
      });

      ytDlp.on("close", async (code) => {
        clearTimeout(timeout);
        await cleanupPreparedCookies(cookiesPath);

        if (code !== 0) {
          await deleteWorkspace(id);
          send({
            type: "error",
            message: `yt-dlp exited with ${code}: ${stderr.slice(-600)}`,
          });
          finish();
          return;
        }

        try {
          send({ type: "stage", message: "Preparing audio…" });

          const files = await readdir(dir);
          const sourceFile = files.find((f) => f.startsWith("source."));
          if (!sourceFile) {
            throw new Error("Downloaded file not found in workspace");
          }

          const downloaded = path.join(dir, sourceFile);
          const { filePath, ext } = await normaliseToAudio(downloaded, dir);

          // Keep the on-disk name predictable for later ffmpeg invocations.
          const finalPath = path.join(dir, `source.${ext}`);
          if (filePath !== finalPath) {
            await rename(filePath, finalPath);
          }

          send({ type: "stage", message: "Reading duration…" });
          const info = await probe(finalPath);
          if (!info.duration) {
            throw new Error("Could not determine audio duration");
          }

          let title = url;
          try {
            const { readFile } = await import("fs/promises");
            title =
              (await readFile(path.join(dir, "title.txt"), "utf8")).trim() ||
              url;
          } catch {
            // Title is cosmetic; fall back to the URL.
          }

          const meta: WorkspaceMeta = {
            id,
            title,
            sourceUrl: url,
            fileName: `source.${ext}`,
            ext,
            mimeType: mimeForExt(ext),
            duration: info.duration,
            size: await fileSize(finalPath),
            createdAt: new Date().toISOString(),
          };
          await writeMeta(meta);

          send({ type: "complete", workspace: meta });
        } catch (error) {
          await deleteWorkspace(id);
          send({
            type: "error",
            message: error instanceof Error ? error.message : String(error),
          });
        } finally {
          finish();
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
