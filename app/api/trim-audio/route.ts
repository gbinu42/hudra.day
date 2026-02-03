import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import { writeFile, unlink, readFile, stat } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { promisify } from "util";
import { exec } from "child_process";

const execAsync = promisify(exec);

async function getAudioMetadata(
  filePath: string,
): Promise<{ bitrate?: string; duration?: string } | undefined> {
  try {
    // Use ffprobe to get audio metadata
    const { stdout } = await execAsync(
      `ffprobe -v error -show_entries format=duration,bit_rate -of default=noprint_wrappers=1:nokey=1 "${filePath}"`,
    );

    const lines = stdout.trim().split("\n");
    const duration = parseFloat(lines[0]);
    let bitrate = lines[1] ? parseInt(lines[1]) : null;

    // If ffprobe doesn't give us bitrate directly, calculate it from file size and duration
    if (!bitrate || bitrate === 0) {
      const stats = await stat(filePath);
      const fileSizeInBits = stats.size * 8;
      bitrate = Math.round(fileSizeInBits / duration);
    }

    // Format bitrate (convert to kbps)
    const bitrateStr =
      bitrate >= 1000 ? Math.round(bitrate / 1000) + "k" : bitrate + "";

    // Format duration (convert seconds to mm:ss)
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    const durationStr = `${minutes}:${seconds.toString().padStart(2, "0")}`;

    return {
      bitrate: bitrateStr,
      duration: durationStr,
    };
  } catch (error) {
    console.error("Failed to get audio metadata:", error);
    return undefined;
  }
}

export async function POST(request: NextRequest) {
  // Only allow in development/local environment
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is only available in local development" },
      { status: 403 },
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const startTime = formData.get("startTime") as string;
    const endTime = formData.get("endTime") as string;
    const gainDbStr = formData.get("gainDb") as string;

    if (!file) {
      return NextResponse.json(
        { error: "Audio file is required" },
        { status: 400 },
      );
    }

    if (!startTime || !endTime) {
      return NextResponse.json(
        { error: "Start time and end time are required" },
        { status: 400 },
      );
    }

    // Validate time format (should be in seconds)
    const start = parseFloat(startTime);
    const end = parseFloat(endTime);
    const gainDb = gainDbStr ? parseFloat(gainDbStr) : 0;

    if (isNaN(start) || isNaN(end) || start < 0 || end <= start) {
      return NextResponse.json(
        { error: "Invalid time range" },
        { status: 400 },
      );
    }

    // Generate unique filenames
    // Always preserve the original file extension
    const fileExtension = file.name.split(".").pop() || "mp3";
    const inputFilename = `input_${randomUUID()}.${fileExtension}`;
    const outputFilename = `trimmed_${randomUUID()}.${fileExtension}`;
    const inputPath = path.join("/tmp", inputFilename);
    const outputPath = path.join("/tmp", outputFilename);

    // Write the uploaded file to disk
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await writeFile(inputPath, buffer);

    // Build ffmpeg arguments based on whether we need to apply gain
    let ffmpegArgs: string[];

    // Calculate duration from start and end times
    // Using -t (duration) instead of -to (end time) is more reliable with -ss
    const duration = end - start;

    if (gainDb !== 0) {
      // Need to re-encode to apply volume filter
      // Convert dB to volume multiplier: multiplier = 10^(dB/20)
      const volumeMultiplier = Math.pow(10, gainDb / 20);

      // Determine codec and bitrate based on file extension to preserve original format
      // Use conservative bitrates to avoid size increases (suitable for voice/hymns)
      let codec = "libmp3lame";
      let bitrate = "96k";
      const extraArgs: string[] = [];

      if (fileExtension === "m4a") {
        codec = "aac";
        bitrate = "64k"; // AAC is very efficient, 64k is good quality for voice
        extraArgs.push("-movflags", "+faststart");
      } else if (fileExtension === "opus") {
        codec = "libopus";
        bitrate = "48k"; // Opus is extremely efficient, 48k is excellent for voice
      } else if (fileExtension === "ogg") {
        codec = "libvorbis";
        bitrate = "80k";
      } else if (fileExtension === "webm") {
        codec = "libopus";
        bitrate = "48k"; // Opus is extremely efficient
      }

      ffmpegArgs = [
        "-ss",
        start.toString(),
        "-i",
        inputPath,
        "-t",
        duration.toString(), // Use duration instead of end time
        "-af",
        `volume=${volumeMultiplier}`, // Apply volume filter
        "-c:a",
        codec, // Use appropriate codec for the format
        "-b:a",
        bitrate,
        "-avoid_negative_ts",
        "make_zero",
        "-fflags",
        "+genpts",
        "-map_metadata",
        "0",
        ...extraArgs,
        "-y",
        outputPath,
      ];
    } else {
      // Use stream copy (no re-encoding) when no gain adjustment needed
      // This is much faster and preserves original quality/bitrate
      ffmpegArgs = [
        "-ss",
        start.toString(),
        "-i",
        inputPath,
        "-t",
        duration.toString(), // Use duration instead of end time
        "-c",
        "copy",
        "-avoid_negative_ts",
        "make_zero",
        "-fflags",
        "+genpts",
        "-map_metadata",
        "0",
        "-movflags",
        "+faststart",
        "-y",
        outputPath,
      ];
    }

    const trimPromise = new Promise<void>((resolve, reject) => {
      const ffmpeg = spawn("ffmpeg", ffmpegArgs);

      let stderr = "";

      ffmpeg.stderr.on("data", (data) => {
        stderr += data.toString();
      });

      ffmpeg.on("close", (code) => {
        if (code !== 0) {
          reject(new Error(`ffmpeg failed: ${stderr}`));
        } else {
          resolve();
        }
      });

      ffmpeg.on("error", (error) => {
        reject(error);
      });
    });

    // Wait for trimming with timeout (2 minutes)
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error("Trim timeout")), 2 * 60 * 1000);
    });

    await Promise.race([trimPromise, timeoutPromise]);

    // Get metadata from trimmed file before reading it
    const metadata = await getAudioMetadata(outputPath);

    // Read the trimmed file
    const trimmedBuffer = await readFile(outputPath);

    // Determine the appropriate MIME type based on file extension
    const mimeTypes: { [key: string]: string } = {
      mp3: "audio/mpeg",
      webm: "audio/webm",
      m4a: "audio/mp4",
      ogg: "audio/ogg",
      opus: "audio/opus",
      wav: "audio/wav",
    };
    const mimeType = mimeTypes[fileExtension] || "audio/mpeg";
    const outputFileName = `trimmed_audio.${fileExtension}`;

    // Clean up temporary files
    try {
      await unlink(inputPath);
      await unlink(outputPath);
    } catch (error) {
      console.error("Failed to clean up temporary files:", error);
    }

    // Return the trimmed file with metadata in headers
    const headers: HeadersInit = {
      "Content-Type": mimeType,
      "Content-Disposition": `attachment; filename="${outputFileName}"`,
      "X-File-Name": outputFileName,
    };

    if (metadata?.bitrate) {
      headers["X-Bitrate"] = metadata.bitrate;
    }
    if (metadata?.duration) {
      headers["X-Duration"] = metadata.duration;
    }

    return new NextResponse(new Uint8Array(trimmedBuffer), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Error trimming audio:", error);
    return NextResponse.json(
      {
        error: "Failed to trim audio",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
