import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import { unlink, chmod, readFile, readdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { promisify } from "util";
import { exec } from "child_process";

const execAsync = promisify(exec);

async function getYtDlpVersion(ytDlpPath: string): Promise<string | null> {
  return await new Promise((resolve) => {
    try {
      const proc = spawn(ytDlpPath, ["--version"]);
      let out = "";
      let err = "";

      const timeout = setTimeout(() => {
        try {
          proc.kill("SIGKILL");
        } catch {
          // ignore
        }
        resolve(null);
      }, 3000);

      proc.stdout.on("data", (d) => (out += d.toString()));
      proc.stderr.on("data", (d) => (err += d.toString()));
      proc.on("close", () => {
        clearTimeout(timeout);
        const v = (out || err).trim();
        resolve(v.length > 0 ? v : null);
      });
      proc.on("error", () => {
        clearTimeout(timeout);
        resolve(null);
      });
    } catch {
      resolve(null);
    }
  });
}

function parseYtDlpProgress(line: string): {
  percent?: number;
  speed?: string;
  eta?: string;
  fileSize?: string;
} | null {
  // Remove carriage returns and extra whitespace
  const cleanLine = line.replace(/\r/g, "").trim();

  // yt-dlp outputs progress like: [download]  45.2% of 10.00MiB at 1.00MiB/s ETA 00:05
  const downloadMatch = cleanLine.match(
    /\[download\]\s+(\d+\.?\d*)%(?:\s+of\s+([\d.]+\w+))?(?:\s+at\s+([\d.]+\w+\/s))?(?:\s+ETA\s+([\d:]+))?/,
  );

  if (downloadMatch) {
    return {
      percent: parseFloat(downloadMatch[1]),
      fileSize: downloadMatch[2] || undefined,
      speed: downloadMatch[3] || undefined,
      eta: downloadMatch[4] || undefined,
    };
  }

  return null;
}

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
      const { stat } = await import("fs/promises");
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

async function handleProgressStream(inputUrl: string) {
  const projectRoot = process.cwd();
  const ytDlpPath = path.join(projectRoot, "bin", "yt-dlp");

  if (!existsSync(ytDlpPath)) {
    return NextResponse.json(
      { error: "yt-dlp binary not found at bin/yt-dlp" },
      { status: 400 },
    );
  }

  try {
    await chmod(ytDlpPath, 0o755);
  } catch (error) {
    console.error("Failed to set execute permissions:", error);
    return NextResponse.json(
      { error: "Failed to set execute permissions on yt-dlp binary" },
      { status: 500 },
    );
  }

  // Ensure URL has protocol
  let url = inputUrl.trim();
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }

  const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");
  const isFacebook =
    url.includes("facebook.com") ||
    url.includes("fb.com") ||
    url.includes("fb.watch");

  if (!isYouTube && !isFacebook) {
    return NextResponse.json(
      { error: "Only YouTube and Facebook URLs are supported" },
      { status: 400 },
    );
  }

  const platform = isYouTube ? "youtube" : "facebook";
  const outputFilename = `${platform}_audio_${randomUUID()}`;
  const outputPath = path.join("/tmp", outputFilename);

  const ytDlpArgs: string[] = [];

  // For YouTube, try worstaudio first, then fall back to other formats
  if (isYouTube) {
    ytDlpArgs.push(
      "-f",
      // Try worstaudio first (simplest, smallest file), then filtered variants, then specific format codes as fallback
      "worstaudio/worstaudio[protocol!=m3u8_native][protocol!=http_dash_segments]/140/139/bestaudio[protocol!=m3u8_native][protocol!=http_dash_segments]/bestaudio",
      "-o",
      `${outputPath}.%(ext)s`,
      "--newline", // Output progress on new lines for easier parsing
      "--no-warnings", // Suppress warnings in output
    );
  } else {
    // For Facebook
    ytDlpArgs.push(
      "-f",
      "worstaudio/worst",
      "-x", // Extract audio
      "-o",
      `${outputPath}.%(ext)s`,
      "--user-agent",
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "--add-header",
      "Accept-Language:en-US,en;q=0.9",
    );

    const cookiesPath = process.env.YTDLP_COOKIES_PATH;
    if (cookiesPath && existsSync(cookiesPath)) {
      ytDlpArgs.push("--cookies", cookiesPath);
    }
  }

  ytDlpArgs.push(url);

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const ytDlp = spawn(ytDlpPath, ytDlpArgs);
      let stderr = "";
      let lastProgress = 0;
      let isComplete = false;

      // Set timeout (10 minutes for large files)
      const timeout = setTimeout(
        () => {
          if (!isComplete) {
            try {
              ytDlp.kill("SIGKILL");
            } catch (error) {
              console.error("Failed to kill yt-dlp process:", error);
            }
            const errorMessage =
              JSON.stringify({
                type: "error",
                message:
                  "Download timeout - the download took too long (>10 minutes). The file may be too large or the connection is slow.",
              }) + "\n";
            controller.enqueue(encoder.encode(errorMessage));
            controller.close();
          }
        },
        10 * 60 * 1000,
      ); // 10 minutes

      // Listen to both stdout and stderr for progress
      const handleProgressData = (data: Buffer) => {
        const text = data.toString();

        // Parse progress from output
        const lines = text.split("\n");
        for (const line of lines) {
          const progress = parseYtDlpProgress(line);
          if (progress && progress.percent !== undefined) {
            // Only send updates if progress changed significantly (every 1%)
            if (Math.abs(progress.percent - lastProgress) >= 1) {
              lastProgress = progress.percent;
              const message =
                JSON.stringify({
                  type: "progress",
                  ...progress,
                }) + "\n";
              controller.enqueue(encoder.encode(message));
            }
          }
        }
      };

      ytDlp.stdout.on("data", handleProgressData);

      ytDlp.stderr.on("data", (data) => {
        const text = data.toString();
        stderr += text;
        handleProgressData(data);
      });

      ytDlp.on("close", async (code) => {
        clearTimeout(timeout);
        isComplete = true;

        if (code !== 0) {
          const errorMessage =
            JSON.stringify({
              type: "error",
              message: `yt-dlp failed: ${stderr}`,
            }) + "\n";
          controller.enqueue(encoder.encode(errorMessage));
          controller.close();
          return;
        }

        try {
          // Find the downloaded file
          const tmpFiles = await readdir("/tmp");
          const matchingFiles = tmpFiles.filter((f) =>
            f.startsWith(outputFilename),
          );

          if (matchingFiles.length === 0) {
            const possibleExtensions = [
              "webm",
              "m4a",
              "opus",
              "ogg",
              "mp3",
              "mp4",
              "wav",
              "aac",
              "flac",
            ];
            let downloadedFile = "";

            for (const ext of possibleExtensions) {
              const testPath = `${outputPath}.${ext}`;
              if (existsSync(testPath)) {
                downloadedFile = testPath;
                break;
              }
            }

            if (!downloadedFile) {
              const errorMessage =
                JSON.stringify({
                  type: "error",
                  message: `Downloaded file not found. Expected pattern: ${outputFilename}`,
                }) + "\n";
              controller.enqueue(encoder.encode(errorMessage));
              controller.close();
              return;
            }

            await sendFileData(controller, encoder, downloadedFile, platform);
          } else {
            const downloadedFile = path.join("/tmp", matchingFiles[0]);
            await sendFileData(controller, encoder, downloadedFile, platform);
          }
        } catch (error) {
          const errorMessage =
            JSON.stringify({
              type: "error",
              message: `Failed to process file: ${error}`,
            }) + "\n";
          controller.enqueue(encoder.encode(errorMessage));
        } finally {
          controller.close();
        }
      });

      ytDlp.on("error", (error) => {
        clearTimeout(timeout);
        isComplete = true;
        const errorMessage =
          JSON.stringify({
            type: "error",
            message: error.message,
          }) + "\n";
        controller.enqueue(encoder.encode(errorMessage));
        controller.close();
      });
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
    },
  });
}

async function sendFileData(
  controller: ReadableStreamDefaultController,
  encoder: TextEncoder,
  downloadedFilePath: string,
  platform: string,
) {
  const fileBuffer = await readFile(downloadedFilePath);
  const fileExtension = path.extname(downloadedFilePath);
  const fileName = `${platform}_audio${fileExtension}`;

  const mimeTypes: { [key: string]: string } = {
    ".mp3": "audio/mpeg",
    ".m4a": "audio/mp4",
    ".webm": "audio/webm",
    ".ogg": "audio/ogg",
    ".opus": "audio/opus",
    ".wav": "audio/wav",
  };
  const mimeType = mimeTypes[fileExtension] || "audio/mpeg";

  // Get actual audio metadata (bitrate and duration)
  const metadata = await getAudioMetadata(downloadedFilePath);

  // Send completion message with file metadata
  const completeMessage =
    JSON.stringify({
      type: "complete",
      fileName,
      fileSize: fileBuffer.length,
      mimeType,
      bitrate: metadata?.bitrate,
      duration: metadata?.duration,
      fileData: fileBuffer.toString("base64"),
    }) + "\n";

  controller.enqueue(encoder.encode(completeMessage));

  // Clean up the downloaded file
  try {
    await unlink(downloadedFilePath);
  } catch (error) {
    console.error("Failed to clean up temporary file:", error);
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
    const { url: inputUrl, streamProgress } = await request.json();

    if (!inputUrl) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Ensure URL has protocol
    let url = inputUrl.trim();
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url;
    }

    // If streaming progress, return a streaming response
    if (streamProgress) {
      return handleProgressStream(url);
    }

    // Check if URL is from YouTube or Facebook
    const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");
    const isFacebook =
      url.includes("facebook.com") ||
      url.includes("fb.com") ||
      url.includes("fb.watch");

    if (!isYouTube && !isFacebook) {
      return NextResponse.json(
        { error: "Only YouTube and Facebook URLs are supported" },
        { status: 400 },
      );
    }

    // Use yt-dlp from bin/yt-dlp in project directory
    const projectRoot = process.cwd();
    const ytDlpPath = path.join(projectRoot, "bin", "yt-dlp");

    // Verify yt-dlp binary exists
    if (!existsSync(ytDlpPath)) {
      return NextResponse.json(
        { error: "yt-dlp binary not found at bin/yt-dlp" },
        { status: 400 },
      );
    }

    // Ensure the binary has execute permissions
    try {
      await chmod(ytDlpPath, 0o755);
    } catch (error) {
      console.error("Failed to set execute permissions:", error);
      return NextResponse.json(
        { error: "Failed to set execute permissions on yt-dlp binary" },
        { status: 500 },
      );
    }

    // Generate unique filename
    const platform = isYouTube ? "youtube" : "facebook";
    const outputFilename = `${platform}_audio_${randomUUID()}`;
    const outputPath = path.join("/tmp", outputFilename);

    // Download audio using yt-dlp
    const ytDlpArgs: string[] = [];

    // For YouTube, try worstaudio first, then fall back to other formats
    if (isYouTube) {
      ytDlpArgs.push(
        "-f",
        // Try worstaudio first (simplest, smallest file), then filtered variants, then specific format codes as fallback
        "worstaudio/worstaudio[protocol!=m3u8_native][protocol!=http_dash_segments]/140/139/bestaudio[protocol!=m3u8_native][protocol!=http_dash_segments]/bestaudio",
        "-o",
        `${outputPath}.%(ext)s`,
        "--newline", // Output progress on new lines for easier parsing
        "--no-warnings", // Suppress warnings in output
      );
    } else {
      // For Facebook
      ytDlpArgs.push(
        "-f",
        "worstaudio/worst",
        "-x", // Extract audio
        "-o",
        `${outputPath}.%(ext)s`,
        "--user-agent",
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "--add-header",
        "Accept-Language:en-US,en;q=0.9",
      );

      const cookiesPath = process.env.YTDLP_COOKIES_PATH;
      if (cookiesPath && existsSync(cookiesPath)) {
        ytDlpArgs.push("--cookies", cookiesPath);
      }
    }

    ytDlpArgs.push(url);

    const downloadPromise = new Promise<string>((resolve, reject) => {
      const ytDlp = spawn(ytDlpPath, ytDlpArgs);

      let stderr = "";

      ytDlp.stderr.on("data", (data) => {
        stderr += data.toString();
      });

      ytDlp.on("close", async (code) => {
        if (code !== 0) {
          reject(new Error(`yt-dlp failed: ${stderr}`));
        } else {
          // Log stderr for debugging (yt-dlp outputs progress info to stderr)
          console.log("yt-dlp output:", stderr);

          // Find the actual downloaded file by scanning /tmp for files matching the pattern
          try {
            const tmpFiles = await readdir("/tmp");
            const matchingFiles = tmpFiles.filter((f) =>
              f.startsWith(outputFilename),
            );

            if (matchingFiles.length === 0) {
              // Fallback: check common extensions
              const possibleExtensions = [
                "webm",
                "m4a",
                "opus",
                "ogg",
                "mp3",
                "mp4",
                "wav",
                "aac",
                "flac",
              ];
              let downloadedFile = "";

              for (const ext of possibleExtensions) {
                const testPath = `${outputPath}.${ext}`;
                if (existsSync(testPath)) {
                  downloadedFile = testPath;
                  break;
                }
              }

              if (!downloadedFile) {
                reject(
                  new Error(
                    `Downloaded file not found. Expected pattern: ${outputFilename}. Stderr: ${stderr.slice(-500)}`,
                  ),
                );
                return;
              }
              resolve(downloadedFile);
            } else {
              // Use the first matching file
              const downloadedFile = path.join("/tmp", matchingFiles[0]);
              console.log("Found downloaded file:", downloadedFile);
              resolve(downloadedFile);
            }
          } catch (error) {
            reject(new Error(`Failed to scan /tmp directory: ${error}`));
          }
        }
      });

      ytDlp.on("error", (error) => {
        reject(error);
      });
    });

    // Wait for download with timeout (10 minutes for large files)
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(
        () =>
          reject(
            new Error(
              "Download timeout - the download took too long (>10 minutes). The file may be too large or the connection is slow.",
            ),
          ),
        10 * 60 * 1000,
      );
    });

    const downloadedFilePath = await Promise.race([
      downloadPromise,
      timeoutPromise,
    ]);

    // Read the downloaded file
    const fileBuffer = await readFile(downloadedFilePath);
    const fileExtension = path.extname(downloadedFilePath);
    const fileName = `${platform}_audio${fileExtension}`;

    // Determine the appropriate MIME type based on file extension
    const mimeTypes: { [key: string]: string } = {
      ".mp3": "audio/mpeg",
      ".m4a": "audio/mp4",
      ".webm": "audio/webm",
      ".ogg": "audio/ogg",
      ".opus": "audio/opus",
      ".wav": "audio/wav",
    };
    const mimeType = mimeTypes[fileExtension] || "audio/mpeg";

    // Clean up the downloaded file
    try {
      await unlink(downloadedFilePath);
    } catch (error) {
      console.error("Failed to clean up temporary file:", error);
    }

    // Return the file as a blob
    return new NextResponse(new Uint8Array(fileBuffer), {
      status: 200,
      headers: {
        "Content-Type": mimeType,
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "X-File-Name": fileName,
      },
    });
  } catch (error) {
    console.error("Error downloading audio:", error);
    const version = await getYtDlpVersion(
      path.join(process.cwd(), "bin", "yt-dlp"),
    );
    return NextResponse.json(
      {
        error: "Failed to download audio",
        details: error instanceof Error ? error.message : String(error),
        hint: "If this is a Facebook URL, it may require cookies. You can set YTDLP_COOKIES_PATH to a Netscape cookies.txt file. Also make sure yt-dlp is up to date (bin/yt-dlp -U or replace the binary).",
        ytDlpVersion: version ?? undefined,
      },
      { status: 500 },
    );
  }
}
