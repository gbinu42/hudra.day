import { NextRequest, NextResponse } from "next/server";
import {
  isValidWorkspaceId,
  readMeta,
  run,
  sourcePath,
} from "@/lib/dev/audio-workspace";

interface SilenceSpan {
  start: number;
  end: number;
}

/**
 * Uses ffmpeg's silencedetect to propose section boundaries. On a 3-hour
 * recording this beats scrubbing by hand for finding where tracks begin.
 */
export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    id?: string;
    noiseDb?: number;
    minSilence?: number;
    minSection?: number;
    padding?: number;
  };

  if (!isValidWorkspaceId(body.id)) {
    return NextResponse.json({ error: "Invalid workspace id" }, { status: 400 });
  }

  const meta = await readMeta(body.id);
  if (!meta) {
    return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
  }

  const noiseDb = clamp(body.noiseDb ?? -35, -90, -5);
  const minSilence = clamp(body.minSilence ?? 1.5, 0.1, 60);
  const minSection = clamp(body.minSection ?? 5, 0, 3600);
  const padding = clamp(body.padding ?? 0.25, 0, 5);

  try {
    const { stderr } = await run(
      "ffmpeg",
      [
        "-nostdin",
        "-i",
        sourcePath(meta),
        "-af",
        `silencedetect=noise=${noiseDb}dB:d=${minSilence}`,
        "-f",
        "null",
        "-",
      ],
      30 * 60 * 1000,
    );

    const silences: SilenceSpan[] = [];
    let pendingStart: number | null = null;

    for (const line of stderr.split("\n")) {
      const startMatch = line.match(/silence_start:\s*(-?[\d.]+)/);
      if (startMatch) {
        pendingStart = Math.max(0, parseFloat(startMatch[1]));
        continue;
      }
      const endMatch = line.match(/silence_end:\s*([\d.]+)/);
      if (endMatch && pendingStart !== null) {
        silences.push({ start: pendingStart, end: parseFloat(endMatch[1]) });
        pendingStart = null;
      }
    }

    // Trailing silence that runs to the end of the file never gets an end mark.
    if (pendingStart !== null) {
      silences.push({ start: pendingStart, end: meta.duration });
    }

    const sections: SilenceSpan[] = [];
    let cursor = 0;
    for (const silence of silences) {
      if (silence.start - cursor > 0) {
        sections.push({ start: cursor, end: silence.start });
      }
      cursor = Math.max(cursor, silence.end);
    }
    if (meta.duration - cursor > 0) {
      sections.push({ start: cursor, end: meta.duration });
    }

    const padded = sections
      .map((section) => ({
        start: Math.max(0, section.start - padding),
        end: Math.min(meta.duration, section.end + padding),
      }))
      .filter((section) => section.end - section.start >= minSection);

    return NextResponse.json({ sections: padded, silenceCount: silences.length });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Silence detection failed",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}
