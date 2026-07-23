import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import { writeFile, unlink, readFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

function probeAudioCodec(inputPath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const ffprobe = spawn("ffprobe", [
      "-v",
      "quiet",
      "-select_streams",
      "a:0",
      "-show_entries",
      "stream=codec_name",
      "-of",
      "default=noprint_wrappers=1:nokey=1",
      inputPath,
    ]);

    let output = "";
    let errorOutput = "";

    ffprobe.stdout.on("data", (data) => {
      output += data.toString();
    });

    ffprobe.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    ffprobe.on("close", (code) => {
      if (code === 0) {
        const codec = output.trim().split("\n")[0]?.trim();
        if (!codec) {
          reject(new Error("No audio stream found in video"));
          return;
        }
        resolve(codec);
      } else {
        reject(new Error(`ffprobe failed: ${errorOutput || `code ${code}`}`));
      }
    });

    ffprobe.on("error", reject);
  });
}

/** Map codec to a container that can hold it with -c:a copy */
function containerForCodec(codec: string): {
  extension: string;
  mimeType: string;
} {
  switch (codec) {
    case "aac":
      return { extension: "m4a", mimeType: "audio/mp4" };
    case "mp3":
      return { extension: "mp3", mimeType: "audio/mpeg" };
    case "opus":
      return { extension: "opus", mimeType: "audio/opus" };
    case "vorbis":
      return { extension: "ogg", mimeType: "audio/ogg" };
    case "flac":
      return { extension: "flac", mimeType: "audio/flac" };
    case "pcm_s16le":
    case "pcm_s24le":
    case "pcm_f32le":
      return { extension: "wav", mimeType: "audio/wav" };
    default:
      // Generic Matroska can hold most codecs without remux issues
      return { extension: "mka", mimeType: "audio/x-matroska" };
  }
}

export async function POST(request: NextRequest) {
  // Only allow in development/local environment
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is only available in local development" },
      { status: 403 }
    );
  }

  let inputPath = "";
  let outputPath = "";

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "Video file is required" },
        { status: 400 }
      );
    }

    const inputExtension = (
      file.name.split(".").pop() || "mp4"
    ).toLowerCase();
    const id = randomUUID();
    inputPath = path.join("/tmp", `input_${id}.${inputExtension}`);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await writeFile(inputPath, buffer);

    const codec = await probeAudioCodec(inputPath);
    const { extension, mimeType } = containerForCodec(codec);
    outputPath = path.join("/tmp", `extracted_${id}.${extension}`);

    await new Promise<void>((resolve, reject) => {
      const ffmpeg = spawn("ffmpeg", [
        "-i",
        inputPath,
        "-vn",
        "-c:a",
        "copy",
        "-y",
        outputPath,
      ]);

      let errorOutput = "";

      ffmpeg.stderr.on("data", (data) => {
        errorOutput += data.toString();
      });

      ffmpeg.on("close", (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(
            new Error(`ffmpeg exited with code ${code}: ${errorOutput}`)
          );
        }
      });

      ffmpeg.on("error", (err) => {
        reject(err);
      });
    });

    const audioBuffer = await readFile(outputPath);

    const originalName = file.name.replace(/\.[^/.]+$/, "");
    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        "Content-Type": mimeType,
        "Content-Disposition": `attachment; filename="${originalName}.${extension}"`,
        "X-Original-Size": buffer.length.toString(),
        "X-Extracted-Size": audioBuffer.length.toString(),
        "X-Audio-Codec": codec,
      },
    });
  } catch (error) {
    console.error("Error extracting audio:", error);
    return NextResponse.json(
      {
        error: "Failed to extract audio",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  } finally {
    if (inputPath) await unlink(inputPath).catch(() => undefined);
    if (outputPath) await unlink(outputPath).catch(() => undefined);
  }
}
