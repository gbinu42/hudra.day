/**
 * Server-side helpers for the local-only audio sectioning workspace.
 *
 * Long recordings (3h+) are kept on disk and never round-tripped through the
 * browser as a whole: ffmpeg does the decoding, the browser only ever receives
 * a compact peak array plus byte ranges of the original file.
 */

import { spawn } from "child_process";
import { existsSync } from "fs";
import { mkdir, readdir, readFile, rm, stat, writeFile } from "fs/promises";
import os from "os";
import path from "path";

export const WORKSPACE_ROOT = path.join(os.tmpdir(), "hudra-audio-workspaces");

/** Sample rate ffmpeg downmixes to when scanning for waveform peaks. */
const PEAK_SAMPLE_RATE = 8000;

export const DEFAULT_PEAKS_PER_SECOND = 50;

export interface WorkspaceMeta {
  id: string;
  title: string;
  sourceUrl?: string;
  fileName: string;
  ext: string;
  mimeType: string;
  duration: number;
  size: number;
  createdAt: string;
}

const MIME_BY_EXT: Record<string, string> = {
  mp3: "audio/mpeg",
  m4a: "audio/mp4",
  mp4: "audio/mp4",
  aac: "audio/aac",
  webm: "audio/webm",
  ogg: "audio/ogg",
  oga: "audio/ogg",
  opus: "audio/opus",
  wav: "audio/wav",
  flac: "audio/flac",
};

export function mimeForExt(ext: string): string {
  return MIME_BY_EXT[ext.toLowerCase().replace(/^\./, "")] ?? "audio/mpeg";
}

/** mov/mp4 muxer options blow up on other containers, so gate them by ext. */
export function isMp4Container(ext: string): boolean {
  const e = ext.toLowerCase().replace(/^\./, "");
  return e === "m4a" || e === "mp4" || e === "mov" || e === "aac";
}

export function isValidWorkspaceId(id: string | null | undefined): id is string {
  return typeof id === "string" && /^[A-Za-z0-9_-]{6,64}$/.test(id);
}

export function workspaceDir(id: string): string {
  return path.join(WORKSPACE_ROOT, id);
}

export async function ensureWorkspaceRoot(): Promise<void> {
  await mkdir(WORKSPACE_ROOT, { recursive: true });
}

export async function readMeta(id: string): Promise<WorkspaceMeta | null> {
  try {
    const raw = await readFile(path.join(workspaceDir(id), "meta.json"), "utf8");
    return JSON.parse(raw) as WorkspaceMeta;
  } catch {
    return null;
  }
}

export async function writeMeta(meta: WorkspaceMeta): Promise<void> {
  const dir = workspaceDir(meta.id);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, "meta.json"), JSON.stringify(meta, null, 2));
}

export async function listWorkspaces(): Promise<WorkspaceMeta[]> {
  await ensureWorkspaceRoot();
  const entries = await readdir(WORKSPACE_ROOT, { withFileTypes: true });
  const metas = await Promise.all(
    entries
      .filter((entry) => entry.isDirectory() && isValidWorkspaceId(entry.name))
      .map((entry) => readMeta(entry.name)),
  );
  return metas
    .filter((meta): meta is WorkspaceMeta => meta !== null)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function deleteWorkspace(id: string): Promise<void> {
  await rm(workspaceDir(id), { recursive: true, force: true });
}

export function sourcePath(meta: WorkspaceMeta): string {
  return path.join(workspaceDir(meta.id), meta.fileName);
}

export interface RunResult {
  code: number | null;
  stdout: string;
  stderr: string;
}

export function run(
  command: string,
  args: string[],
  timeoutMs = 30 * 60 * 1000,
): Promise<RunResult> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args);
    let stdout = "";
    let stderr = "";
    let settled = false;

    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      child.kill("SIGKILL");
      reject(new Error(`${command} timed out after ${timeoutMs}ms`));
    }, timeoutMs);

    child.stdout.on("data", (d) => (stdout += d.toString()));
    child.stderr.on("data", (d) => (stderr += d.toString()));
    child.on("error", (error) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      reject(error);
    });
    child.on("close", (code) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve({ code, stdout, stderr });
    });
  });
}

export interface ProbeResult {
  duration: number;
  hasVideo: boolean;
  audioCodec?: string;
}

export async function probe(filePath: string): Promise<ProbeResult> {
  const { stdout } = await run(
    "ffprobe",
    [
      "-v",
      "error",
      "-show_entries",
      "format=duration:stream=codec_type,codec_name",
      "-of",
      "json",
      filePath,
    ],
    60_000,
  );

  let duration = 0;
  let hasVideo = false;
  let audioCodec: string | undefined;

  try {
    const parsed = JSON.parse(stdout) as {
      format?: { duration?: string };
      streams?: Array<{ codec_type?: string; codec_name?: string }>;
    };
    duration = parseFloat(parsed.format?.duration ?? "0") || 0;
    for (const stream of parsed.streams ?? []) {
      if (stream.codec_type === "video") hasVideo = true;
      if (stream.codec_type === "audio" && !audioCodec) {
        audioCodec = stream.codec_name;
      }
    }
  } catch {
    // Leave defaults; the caller surfaces a friendlier error.
  }

  return { duration, hasVideo, audioCodec };
}

export interface PeakData {
  /** Interleaved [min, max] pairs, one pair per peak bucket. */
  peaks: Int16Array;
  peaksPerSecond: number;
  /** Largest absolute sample value seen, for client-side auto-normalisation. */
  maxAmplitude: number;
}

function peakCachePath(id: string, peaksPerSecond: number): string {
  return path.join(workspaceDir(id), `peaks-${peaksPerSecond}.bin`);
}

/**
 * Streams the decoded signal through ffmpeg and reduces it to min/max buckets
 * as the bytes arrive, so peak extraction stays O(1) in memory regardless of
 * how long the recording is.
 */
export async function computePeaks(
  filePath: string,
  duration: number,
  peaksPerSecond: number,
): Promise<PeakData> {
  const samplesPerPeak = Math.max(
    1,
    Math.round(PEAK_SAMPLE_RATE / peaksPerSecond),
  );
  const estimatedPeaks = Math.max(
    1,
    Math.ceil((duration * PEAK_SAMPLE_RATE) / samplesPerPeak) + 2,
  );

  let out = new Int16Array(estimatedPeaks * 2);
  let peakCount = 0;
  let bucketMin = 32767;
  let bucketMax = -32768;
  let samplesInBucket = 0;
  let maxAmplitude = 0;
  let pendingByte = -1;

  const pushBucket = () => {
    if (peakCount * 2 + 2 > out.length) {
      const grown = new Int16Array(Math.ceil(out.length * 1.5) + 1024);
      grown.set(out);
      out = grown;
    }
    out[peakCount * 2] = bucketMin;
    out[peakCount * 2 + 1] = bucketMax;
    peakCount += 1;
    bucketMin = 32767;
    bucketMax = -32768;
    samplesInBucket = 0;
  };

  await new Promise<void>((resolve, reject) => {
    const ffmpeg = spawn("ffmpeg", [
      "-nostdin",
      "-v",
      "error",
      "-i",
      filePath,
      "-vn",
      "-ac",
      "1",
      "-ar",
      String(PEAK_SAMPLE_RATE),
      "-f",
      "s16le",
      "-",
    ]);

    let stderr = "";
    ffmpeg.stderr.on("data", (d) => (stderr += d.toString()));

    ffmpeg.stdout.on("data", (chunk: Buffer) => {
      let offset = 0;
      let buffer = chunk;

      // A 16-bit sample can straddle two chunks.
      if (pendingByte >= 0) {
        buffer = Buffer.concat([Buffer.from([pendingByte]), chunk]);
        pendingByte = -1;
      }

      const usableLength = buffer.length - (buffer.length % 2);
      for (offset = 0; offset < usableLength; offset += 2) {
        const sample = buffer.readInt16LE(offset);
        if (sample < bucketMin) bucketMin = sample;
        if (sample > bucketMax) bucketMax = sample;
        const magnitude = sample < 0 ? -sample : sample;
        if (magnitude > maxAmplitude) maxAmplitude = magnitude;
        samplesInBucket += 1;
        if (samplesInBucket >= samplesPerPeak) pushBucket();
      }

      if (usableLength < buffer.length) {
        pendingByte = buffer[buffer.length - 1];
      }
    });

    ffmpeg.on("error", reject);
    ffmpeg.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`ffmpeg peak extraction failed: ${stderr.slice(-500)}`));
        return;
      }
      if (samplesInBucket > 0) pushBucket();
      resolve();
    });
  });

  return {
    peaks: out.subarray(0, peakCount * 2),
    peaksPerSecond,
    maxAmplitude: maxAmplitude || 1,
  };
}

export async function getOrCreatePeaks(
  meta: WorkspaceMeta,
  peaksPerSecond: number,
): Promise<PeakData> {
  const cachePath = peakCachePath(meta.id, peaksPerSecond);

  if (existsSync(cachePath)) {
    const buffer = await readFile(cachePath);
    const peaks = new Int16Array(
      buffer.buffer,
      buffer.byteOffset,
      Math.floor(buffer.byteLength / 2),
    );
    let maxAmplitude = 1;
    for (let i = 0; i < peaks.length; i += 1) {
      const magnitude = peaks[i] < 0 ? -peaks[i] : peaks[i];
      if (magnitude > maxAmplitude) maxAmplitude = magnitude;
    }
    return { peaks, peaksPerSecond, maxAmplitude };
  }

  const data = await computePeaks(
    sourcePath(meta),
    meta.duration,
    peaksPerSecond,
  );
  await writeFile(
    cachePath,
    Buffer.from(
      data.peaks.buffer,
      data.peaks.byteOffset,
      data.peaks.byteLength,
    ),
  );
  return data;
}

/**
 * Facebook/Instagram downloads and local uploads can arrive as video. Strip the
 * video stream (copying the audio when possible) so later cuts are cheap.
 */
export async function normaliseToAudio(
  inputPath: string,
  dir: string,
): Promise<{ filePath: string; ext: string }> {
  const info = await probe(inputPath);
  const inputExt = path.extname(inputPath).slice(1).toLowerCase();

  if (!info.hasVideo) {
    return { filePath: inputPath, ext: inputExt };
  }

  const copyable = info.audioCodec === "aac" || info.audioCodec === "alac";
  const ext = copyable ? "m4a" : "opus";
  const outputPath = path.join(dir, `source.${ext}`);

  const args = ["-nostdin", "-v", "error", "-i", inputPath, "-vn"];
  if (copyable) {
    args.push("-c:a", "copy", "-movflags", "+faststart");
  } else {
    args.push("-c:a", "libopus", "-b:a", "96k");
  }
  args.push("-y", outputPath);

  const result = await run("ffmpeg", args);
  if (result.code !== 0) {
    throw new Error(`Failed to extract audio: ${result.stderr.slice(-500)}`);
  }

  await rm(inputPath, { force: true });
  return { filePath: outputPath, ext };
}

export async function fileSize(filePath: string): Promise<number> {
  const stats = await stat(filePath);
  return stats.size;
}

export function isProductionRuntime(): boolean {
  return process.env.NODE_ENV === "production";
}
