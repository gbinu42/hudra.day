import { NextRequest, NextResponse } from "next/server";
import { mkdtemp, readFile, rm } from "fs/promises";
import os from "os";
import path from "path";
import {
  isMp4Container,
  isValidWorkspaceId,
  mimeForExt,
  readMeta,
  run,
  sourcePath,
} from "@/lib/dev/audio-workspace";
import { createZip, type ZipEntry } from "@/lib/dev/zip";

interface ExportSection {
  name?: string;
  start: number;
  end: number;
}

function safeFileName(name: string, fallback: string): string {
  const cleaned = name
    .replace(/[/\\?%*:|"<>]/g, "-")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120);
  return cleaned || fallback;
}

function codecArgsFor(ext: string): string[] {
  switch (ext) {
    case "m4a":
    case "mp4":
    case "aac":
      return ["-c:a", "aac", "-b:a", "128k"];
    case "opus":
    case "webm":
      return ["-c:a", "libopus", "-b:a", "96k"];
    case "ogg":
      return ["-c:a", "libvorbis", "-q:a", "5"];
    case "wav":
      return ["-c:a", "pcm_s16le"];
    default:
      return ["-c:a", "libmp3lame", "-b:a", "160k"];
  }
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    id?: string;
    sections?: ExportSection[];
    reencode?: boolean;
  };

  if (!isValidWorkspaceId(body.id)) {
    return NextResponse.json({ error: "Invalid workspace id" }, { status: 400 });
  }

  const meta = await readMeta(body.id);
  if (!meta) {
    return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
  }

  const sections = (body.sections ?? []).filter(
    (section) =>
      Number.isFinite(section.start) &&
      Number.isFinite(section.end) &&
      section.end > section.start,
  );

  if (sections.length === 0) {
    return NextResponse.json(
      { error: "At least one valid section is required" },
      { status: 400 },
    );
  }

  const input = sourcePath(meta);
  const ext = meta.ext;
  const tempDir = await mkdtemp(path.join(os.tmpdir(), "hudra-export-"));

  try {
    const entries: ZipEntry[] = [];
    const usedNames = new Set<string>();

    for (let index = 0; index < sections.length; index += 1) {
      const section = sections[index];
      const start = Math.max(0, section.start);
      const duration = Math.min(meta.duration, section.end) - start;
      if (duration <= 0) continue;

      const outputPath = path.join(tempDir, `section-${index}.${ext}`);

      // Placing -ss before -i makes ffmpeg seek by index instead of decoding
      // from zero, which is what keeps cuts near-instant on a 3h source.
      const args = [
        "-nostdin",
        "-v",
        "error",
        "-ss",
        start.toFixed(3),
        "-i",
        input,
        "-t",
        duration.toFixed(3),
        "-vn",
        "-map_metadata",
        "0",
      ];

      if (body.reencode) {
        args.push(...codecArgsFor(ext));
      } else {
        args.push("-c:a", "copy");
      }

      args.push("-avoid_negative_ts", "make_zero");
      if (isMp4Container(ext)) {
        args.push("-movflags", "+faststart");
      }
      args.push("-y", outputPath);

      const result = await run("ffmpeg", args, 10 * 60 * 1000);
      if (result.code !== 0) {
        throw new Error(
          `ffmpeg failed on section ${index + 1}: ${result.stderr.slice(-400)}`,
        );
      }

      const base = safeFileName(
        section.name ?? "",
        `${String(index + 1).padStart(2, "0")} - section`,
      );
      let fileName = `${base}.${ext}`;
      let suffix = 2;
      while (usedNames.has(fileName)) {
        fileName = `${base} (${suffix}).${ext}`;
        suffix += 1;
      }
      usedNames.add(fileName);

      entries.push({ name: fileName, data: await readFile(outputPath) });
    }

    if (entries.length === 1) {
      return new NextResponse(new Uint8Array(entries[0].data), {
        status: 200,
        headers: {
          "Content-Type": mimeForExt(ext),
          "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(entries[0].name)}`,
          "Content-Length": String(entries[0].data.length),
        },
      });
    }

    const zip = createZip(entries);
    const zipName = `${safeFileName(meta.title, "sections")} - sections.zip`;

    return new NextResponse(new Uint8Array(zip), {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(zipName)}`,
        "Content-Length": String(zip.length),
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Export failed",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
}
