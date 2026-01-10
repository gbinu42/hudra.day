import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import { writeFile, unlink, readFile } from "fs/promises";
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
    // Get quality from form data, default to "low"
    const qualityParam = (formData.get("quality") as string) || "low";
    const quality = (qualityParam === "medium" || qualityParam === "high") ? qualityParam : "low";

    if (!file) {
      return NextResponse.json(
        { error: "Audio file is required" },
        { status: 400 }
      );
    }

    // Generate unique filenames - preserve original format
    const fileExtension = file.name.split(".").pop() || "mp3";
    const inputFilename = `input_${randomUUID()}.${fileExtension}`;
    const outputFilename = `compressed_${randomUUID()}.${fileExtension}`;
    const inputPath = path.join("/tmp", inputFilename);
    const outputPath = path.join("/tmp", outputFilename);

    // Define MIME types (used later)
    const mimeTypes: { [key: string]: string } = {
      'mp3': 'audio/mpeg',
      'm4a': 'audio/mp4',
      'webm': 'audio/webm',
      'ogg': 'audio/ogg',
      'opus': 'audio/opus',
      'wav': 'audio/wav',
    };

    // Write the uploaded file to disk
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await writeFile(inputPath, buffer);

    // First, probe the input file to get its current bitrate
    const probeResult = await new Promise<{ bitrate: number; sampleRate: number }>((resolve, reject) => {
      const ffprobe = spawn("ffprobe", [
        "-v", "quiet",
        "-print_format", "json",
        "-show_format",
        "-show_streams",
        inputPath
      ]);

      let output = "";
      ffprobe.stdout.on("data", (data) => {
        output += data.toString();
      });

      ffprobe.on("close", (code) => {
        if (code === 0) {
          try {
            const data = JSON.parse(output);
            const audioStream = data.streams?.find((s: any) => s.codec_type === "audio");
            const bitrate = parseInt(audioStream?.bit_rate || data.format?.bit_rate || "0") / 1000; // Convert to kbps
            const sampleRate = parseInt(audioStream?.sample_rate || "44100");
            resolve({ bitrate, sampleRate });
          } catch (e) {
            reject(new Error("Failed to parse ffprobe output"));
          }
        } else {
          reject(new Error("ffprobe failed"));
        }
      });

      ffprobe.on("error", reject);
    });

    // Determine compression settings based on quality
    let audioBitrate = "96k"; // default medium quality
    let audioSampleRate = "44100";

    switch (quality) {
      case "low":
        audioBitrate = "64k";
        audioSampleRate = "22050";
        break;
      case "medium":
        audioBitrate = "96k";
        audioSampleRate = "44100";
        break;
      case "high":
        audioBitrate = "128k";
        audioSampleRate = "44100";
        break;
    }

    // Determine codec based on file extension to preserve original format
    let codec = "libmp3lame"; // default to MP3
    let extraArgs: string[] = [];
    
    // Adjust bitrates for more efficient codecs (AAC and Opus need lower bitrates for same quality)
    let adjustedBitrate = audioBitrate;
    
    if (fileExtension === "m4a") {
      codec = "aac";
      extraArgs = ["-movflags", "+faststart"];
      // AAC is ~30% more efficient than MP3, reduce bitrate accordingly
      adjustedBitrate = quality === "low" ? "48k" : quality === "medium" ? "64k" : "96k";
    } else if (fileExtension === "opus" || fileExtension === "webm") {
      codec = "libopus";
      // Opus is extremely efficient, can use much lower bitrates
      adjustedBitrate = quality === "low" ? "32k" : quality === "medium" ? "48k" : "64k";
    } else if (fileExtension === "ogg") {
      codec = "libvorbis";
      // Vorbis is similar to AAC efficiency
      adjustedBitrate = quality === "low" ? "48k" : quality === "medium" ? "80k" : "112k";
    }

    // Check if file is already compressed enough
    const targetBitrateNum = parseInt(adjustedBitrate);
    if (probeResult.bitrate > 0 && probeResult.bitrate <= targetBitrateNum) {
      // File is already at or below target bitrate, just return it as-is
      await unlink(inputPath);
      
      return new NextResponse(buffer, {
        status: 200,
        headers: {
          "Content-Type": mimeTypes[fileExtension] || 'audio/mpeg',
          "Content-Disposition": `attachment; filename="${file.name}"`,
          "X-Original-Size": buffer.length.toString(),
          "X-Compressed-Size": buffer.length.toString(),
          "X-Skipped-Reason": `Already compressed (${Math.round(probeResult.bitrate)}kbps <= ${targetBitrateNum}kbps)`,
        },
      });
    }

    // Use ffmpeg to compress the audio while preserving format
    await new Promise<void>((resolve, reject) => {
      const ffmpegArgs = [
        "-i",
        inputPath,
        "-vn", // No video
        "-c:a",
        codec, // Use appropriate codec for format
        "-ar",
        audioSampleRate, // Sample rate
        "-ac",
        "2", // Stereo
        "-b:a",
        adjustedBitrate, // Audio bitrate (adjusted per codec efficiency)
        ...extraArgs,
        "-y", // Overwrite output file
        outputPath,
      ];
      
      const ffmpeg = spawn("ffmpeg", ffmpegArgs);

      let errorOutput = "";

      ffmpeg.stderr.on("data", (data) => {
        errorOutput += data.toString();
      });

      ffmpeg.on("close", (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`ffmpeg exited with code ${code}: ${errorOutput}`));
        }
      });

      ffmpeg.on("error", (err) => {
        reject(err);
      });
    });

    // Read the compressed file
    const compressedBuffer = await readFile(outputPath);

    // Clean up temporary files
    await unlink(inputPath);
    await unlink(outputPath);

    // Determine MIME type based on file extension
    const mimeType = mimeTypes[fileExtension] || 'audio/mpeg';
    
    // Return the compressed file
    const originalName = file.name.replace(/\.[^/.]+$/, "");
    return new NextResponse(compressedBuffer, {
      status: 200,
      headers: {
        "Content-Type": mimeType,
        "Content-Disposition": `attachment; filename="${originalName}_compressed.${fileExtension}"`,
        "X-Original-Size": buffer.length.toString(),
        "X-Compressed-Size": compressedBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("Error compressing audio:", error);
    return NextResponse.json(
      {
        error: "Failed to compress audio",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
