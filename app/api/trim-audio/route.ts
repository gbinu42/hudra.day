import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export async function POST(request: NextRequest) {
  // Only allow in development/local environment
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is only available in local development" },
      { status: 403 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const startTime = formData.get("startTime") as string;
    const endTime = formData.get("endTime") as string;

    if (!file) {
      return NextResponse.json(
        { error: "Audio file is required" },
        { status: 400 }
      );
    }

    if (!startTime || !endTime) {
      return NextResponse.json(
        { error: "Start time and end time are required" },
        { status: 400 }
      );
    }

    // Validate time format (should be in seconds)
    const start = parseFloat(startTime);
    const end = parseFloat(endTime);

    if (isNaN(start) || isNaN(end) || start < 0 || end <= start) {
      return NextResponse.json(
        { error: "Invalid time range" },
        { status: 400 }
      );
    }

    // Generate unique filenames
    // Preserve the original file extension for proper stream copy
    const fileExtension = file.name.split('.').pop() || 'mp3';
    const inputFilename = `input_${randomUUID()}.${fileExtension}`;
    const outputFilename = `trimmed_${randomUUID()}.${fileExtension}`;
    const inputPath = path.join("/tmp", inputFilename);
    const outputPath = path.join("/tmp", outputFilename);

    // Write the uploaded file to disk
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await writeFile(inputPath, buffer);

    // Use ffmpeg to trim the audio WITHOUT re-encoding (stream copy)
    // This is much faster and preserves original quality/bitrate
    const ffmpegArgs = [
      "-ss",
      start.toString(), // Seek to start position BEFORE input (faster)
      "-i",
      inputPath,
      "-to",
      end.toString(), // End position
      "-c",
      "copy", // Copy streams without re-encoding
      "-avoid_negative_ts",
      "make_zero", // Fix timestamp issues
      "-fflags",
      "+genpts", // Generate presentation timestamps
      "-map_metadata",
      "0", // Copy metadata from input
      "-movflags",
      "+faststart", // Enable fast start for web playback
      "-y", // Overwrite output file if it exists
      outputPath,
    ];

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

    // Read the trimmed file
    const fs = require("fs").promises;
    const trimmedBuffer = await fs.readFile(outputPath);
    
    // Determine the appropriate MIME type based on file extension
    const mimeTypes: { [key: string]: string } = {
      'mp3': 'audio/mpeg',
      'webm': 'audio/webm',
      'm4a': 'audio/mp4',
      'ogg': 'audio/ogg',
      'opus': 'audio/opus',
      'wav': 'audio/wav',
    };
    const mimeType = mimeTypes[fileExtension] || 'audio/mpeg';
    const outputFileName = `trimmed_audio.${fileExtension}`;

    // Clean up temporary files
    try {
      await unlink(inputPath);
      await unlink(outputPath);
    } catch (error) {
      console.error("Failed to clean up temporary files:", error);
    }

    // Return the trimmed file
    return new NextResponse(trimmedBuffer, {
      status: 200,
      headers: {
        "Content-Type": mimeType,
        "Content-Disposition": `attachment; filename="${outputFileName}"`,
        "X-File-Name": outputFileName,
      },
    });
  } catch (error) {
    console.error("Error trimming audio:", error);
    return NextResponse.json(
      {
        error: "Failed to trim audio",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

