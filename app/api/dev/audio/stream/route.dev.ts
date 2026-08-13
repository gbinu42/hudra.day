import { NextRequest, NextResponse } from "next/server";
import { createReadStream, existsSync } from "fs";
import { stat } from "fs/promises";
import { Readable } from "stream";
import {
  isValidWorkspaceId,
  readMeta,
  sourcePath,
} from "@/lib/dev/audio-workspace";

/**
 * Serves the source recording with byte-range support so the <audio> element
 * can seek anywhere in a multi-hour file without fetching the whole thing.
 */
export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!isValidWorkspaceId(id)) {
    return NextResponse.json({ error: "Invalid workspace id" }, { status: 400 });
  }

  const meta = await readMeta(id);
  if (!meta) {
    return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
  }

  const filePath = sourcePath(meta);
  if (!existsSync(filePath)) {
    return NextResponse.json({ error: "Source file missing" }, { status: 404 });
  }

  const { size } = await stat(filePath);
  const rangeHeader = request.headers.get("range");

  const baseHeaders: Record<string, string> = {
    "Content-Type": meta.mimeType,
    "Accept-Ranges": "bytes",
    "Cache-Control": "no-store",
  };

  if (!rangeHeader) {
    const stream = Readable.toWeb(
      createReadStream(filePath),
    ) as unknown as ReadableStream;
    return new NextResponse(stream, {
      status: 200,
      headers: { ...baseHeaders, "Content-Length": String(size) },
    });
  }

  const match = /^bytes=(\d*)-(\d*)$/.exec(rangeHeader.trim());
  if (!match) {
    return new NextResponse(null, {
      status: 416,
      headers: { "Content-Range": `bytes */${size}` },
    });
  }

  const [, startRaw, endRaw] = match;
  let start = startRaw ? parseInt(startRaw, 10) : 0;
  let end = endRaw ? parseInt(endRaw, 10) : size - 1;

  // A suffix range ("bytes=-500") asks for the trailing N bytes.
  if (!startRaw && endRaw) {
    start = Math.max(0, size - parseInt(endRaw, 10));
    end = size - 1;
  }

  if (Number.isNaN(start) || Number.isNaN(end) || start > end || start >= size) {
    return new NextResponse(null, {
      status: 416,
      headers: { "Content-Range": `bytes */${size}` },
    });
  }

  end = Math.min(end, size - 1);

  const stream = Readable.toWeb(
    createReadStream(filePath, { start, end }),
  ) as unknown as ReadableStream;

  return new NextResponse(stream, {
    status: 206,
    headers: {
      ...baseHeaders,
      "Content-Range": `bytes ${start}-${end}/${size}`,
      "Content-Length": String(end - start + 1),
    },
  });
}
