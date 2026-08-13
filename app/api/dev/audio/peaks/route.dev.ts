import { NextRequest, NextResponse } from "next/server";
import { existsSync } from "fs";
import {
  DEFAULT_PEAKS_PER_SECOND,
  getOrCreatePeaks,
  isValidWorkspaceId,
  readMeta,
  sourcePath,
} from "@/lib/dev/audio-workspace";

/**
 * Returns the waveform as raw interleaved Int16 [min, max] pairs. Binary keeps
 * a 3-hour scan at ~2 MB, versus ~15 MB if it were JSON.
 */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const id = params.get("id");
  if (!isValidWorkspaceId(id)) {
    return NextResponse.json({ error: "Invalid workspace id" }, { status: 400 });
  }

  const requested = parseInt(params.get("pps") ?? "", 10);
  const peaksPerSecond = Number.isFinite(requested)
    ? Math.min(200, Math.max(5, requested))
    : DEFAULT_PEAKS_PER_SECOND;

  const meta = await readMeta(id);
  if (!meta) {
    return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
  }
  if (!existsSync(sourcePath(meta))) {
    return NextResponse.json({ error: "Source file missing" }, { status: 404 });
  }

  try {
    const data = await getOrCreatePeaks(meta, peaksPerSecond);
    const body = Buffer.from(
      data.peaks.buffer,
      data.peaks.byteOffset,
      data.peaks.byteLength,
    );

    return new NextResponse(new Uint8Array(body), {
      status: 200,
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Length": String(body.length),
        "Cache-Control": "no-store",
        "X-Peaks-Per-Second": String(data.peaksPerSecond),
        "X-Peak-Count": String(data.peaks.length / 2),
        "X-Max-Amplitude": String(data.maxAmplitude),
        "X-Duration": String(meta.duration),
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to analyse audio",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
