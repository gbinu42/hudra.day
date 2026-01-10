import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import { unlink, chmod, readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { randomUUID } from "crypto";

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

export async function POST(request: NextRequest) {
  // Only allow in development/local environment
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is only available in local development" },
      { status: 403 }
    );
  }

  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }

    // Check if URL is from YouTube or Facebook
    const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");
    const isFacebook = url.includes("facebook.com") || url.includes("fb.com") || url.includes("fb.watch");
    
    if (!isYouTube && !isFacebook) {
      return NextResponse.json(
        { error: "Only YouTube and Facebook URLs are supported" },
        { status: 400 }
      );
    }

    // Use yt-dlp from bin/yt-dlp in project directory
    const projectRoot = process.cwd();
    const ytDlpPath = path.join(projectRoot, "bin", "yt-dlp");

    // Verify yt-dlp binary exists
    if (!existsSync(ytDlpPath)) {
      return NextResponse.json(
        { error: "yt-dlp binary not found at bin/yt-dlp" },
        { status: 400 }
      );
    }

    // Ensure the binary has execute permissions
    try {
      await chmod(ytDlpPath, 0o755);
    } catch (error) {
      console.error("Failed to set execute permissions:", error);
      return NextResponse.json(
        { error: "Failed to set execute permissions on yt-dlp binary" },
        { status: 500 }
      );
    }

    // Generate unique filename
    const platform = isYouTube ? "youtube" : "facebook";
    const outputFilename = `${platform}_audio_${randomUUID()}`;
    const outputPath = path.join("/tmp", outputFilename);

    // Download audio using yt-dlp
    // Use worstaudio for both platforms to get smallest file size
    const ytDlpArgs: string[] = [
      "-f",
      "worstaudio/worst",
      "-o",
      `${outputPath}.%(ext)s`,
    ];
    
    // For Facebook, also extract audio if video format is downloaded
    if (isFacebook) {
      ytDlpArgs.push(
        "-x"  // Extract audio only (in case worst format includes video)
      );
    }

    // Facebook often blocks non-browser clients; these hints improve success rate.
    // For private/age-gated/region-locked content, cookies may still be required.
    if (isFacebook) {
      ytDlpArgs.push(
        "--user-agent",
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "--add-header",
        "Accept-Language:en-US,en;q=0.9"
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

      ytDlp.on("close", (code) => {
        if (code !== 0) {
          reject(new Error(`yt-dlp failed: ${stderr}`));
        } else {
          // Find the actual downloaded file (yt-dlp adds extension)
          const possibleExtensions = ["webm", "m4a", "opus", "ogg", "mp3"];
          let downloadedFile = "";

          for (const ext of possibleExtensions) {
            const testPath = `${outputPath}.${ext}`;
            if (existsSync(testPath)) {
              downloadedFile = testPath;
              break;
            }
          }

          if (!downloadedFile) {
            reject(new Error("Downloaded file not found"));
          } else {
            resolve(downloadedFile);
          }
        }
      });

      ytDlp.on("error", (error) => {
        reject(error);
      });
    });

    // Wait for download with timeout (5 minutes)
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error("Download timeout")), 5 * 60 * 1000);
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
      '.mp3': 'audio/mpeg',
      '.m4a': 'audio/mp4',
      '.webm': 'audio/webm',
      '.ogg': 'audio/ogg',
      '.opus': 'audio/opus',
      '.wav': 'audio/wav',
    };
    const mimeType = mimeTypes[fileExtension] || 'audio/mpeg';

    // Clean up the downloaded file
    try {
      await unlink(downloadedFilePath);
    } catch (error) {
      console.error("Failed to clean up temporary file:", error);
    }

    // Return the file as a blob
    return new NextResponse(fileBuffer, {
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
      path.join(process.cwd(), "bin", "yt-dlp")
    );
    return NextResponse.json(
      {
        error: "Failed to download audio",
        details: error instanceof Error ? error.message : String(error),
        hint:
          "If this is a Facebook URL, it may require cookies. You can set YTDLP_COOKIES_PATH to a Netscape cookies.txt file. Also make sure yt-dlp is up to date (bin/yt-dlp -U or replace the binary).",
        ytDlpVersion: version ?? undefined,
      },
      { status: 500 }
    );
  }
}

