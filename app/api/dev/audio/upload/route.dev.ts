import { NextRequest, NextResponse } from "next/server";
import { createWriteStream } from "fs";
import { mkdir, rename } from "fs/promises";
import { Readable } from "stream";
import { pipeline } from "stream/promises";
import path from "path";
import { randomUUID } from "crypto";
import {
  deleteWorkspace,
  ensureWorkspaceRoot,
  fileSize,
  mimeForExt,
  normaliseToAudio,
  probe,
  workspaceDir,
  writeMeta,
  type WorkspaceMeta,
} from "@/lib/dev/audio-workspace";

/**
 * Takes the raw request body rather than multipart form data so a multi-hundred
 * megabyte recording streams straight to disk instead of being buffered.
 */
export async function POST(request: NextRequest) {
  if (!request.body) {
    return NextResponse.json({ error: "Request body is empty" }, { status: 400 });
  }

  const rawName = request.headers.get("x-file-name") ?? "upload";
  const originalName = decodeURIComponent(rawName);
  const uploadExt = (path.extname(originalName).slice(1) || "bin").toLowerCase();

  await ensureWorkspaceRoot();
  const id = randomUUID();
  const dir = workspaceDir(id);
  await mkdir(dir, { recursive: true });

  const uploadPath = path.join(dir, `source.${uploadExt}`);

  try {
    await pipeline(
      Readable.fromWeb(request.body as Parameters<typeof Readable.fromWeb>[0]),
      createWriteStream(uploadPath),
    );

    const { filePath, ext } = await normaliseToAudio(uploadPath, dir);
    const finalPath = path.join(dir, `source.${ext}`);
    if (filePath !== finalPath) {
      await rename(filePath, finalPath);
    }

    const info = await probe(finalPath);
    if (!info.duration) {
      throw new Error("File does not contain a readable audio stream");
    }

    const meta: WorkspaceMeta = {
      id,
      title: path.basename(originalName, path.extname(originalName)),
      fileName: `source.${ext}`,
      ext,
      mimeType: mimeForExt(ext),
      duration: info.duration,
      size: await fileSize(finalPath),
      createdAt: new Date().toISOString(),
    };
    await writeMeta(meta);

    return NextResponse.json({ workspace: meta });
  } catch (error) {
    await deleteWorkspace(id);
    return NextResponse.json(
      {
        error: "Failed to import audio",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
