/**
 * Server-side helpers for the local-only "grab this video" tool.
 *
 * Under WSL the Windows drive is a DrvFS mount that is far slower than the
 * Linux filesystem, so a download is staged in the Linux temp dir - where
 * yt-dlp writes its fragments and ffmpeg merges them - and only the finished
 * file crosses the boundary, as a single sequential copy.
 */

import { spawn } from "child_process";
import { createReadStream, createWriteStream, existsSync, readFileSync } from "fs";
import {
  chmod,
  copyFile,
  mkdtemp,
  rename,
  rm,
  stat,
  statfs,
} from "fs/promises";
import os from "os";
import path from "path";
import { pipeline } from "stream/promises";

const DOWNLOADS_FOLDER_GUID = "{374DE290-123F-4565-9164-39C4925E467B}";

/** DrvFS throughput improves noticeably with chunks well above the 64K default. */
const COPY_CHUNK_BYTES = 4 * 1024 * 1024;

interface CaptureResult {
  code: number | null;
  stdout: string;
  stderr: string;
}

/** Runs a short-lived command and collects its output. */
function capture(
  command: string,
  args: string[],
  options: { cwd?: string; timeoutMs?: number } = {},
): Promise<CaptureResult> {
  const { cwd, timeoutMs = 15_000 } = options;

  return new Promise((resolve) => {
    let child;
    try {
      child = spawn(command, args, { cwd });
    } catch {
      resolve({ code: null, stdout: "", stderr: "" });
      return;
    }

    let stdout = "";
    let stderr = "";
    let settled = false;

    const done = (code: number | null) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve({ code, stdout, stderr });
    };

    const timer = setTimeout(() => {
      child.kill("SIGKILL");
      done(null);
    }, timeoutMs);

    child.stdout?.on("data", (d: Buffer) => (stdout += d.toString()));
    child.stderr?.on("data", (d: Buffer) => (stderr += d.toString()));
    child.on("error", () => done(null));
    child.on("close", (code) => done(code));
  });
}

let wslChecked = false;
let wslDetected = false;

export function isWsl(): boolean {
  if (wslChecked) return wslDetected;
  wslChecked = true;

  if (process.env.WSL_DISTRO_NAME) {
    wslDetected = true;
    return true;
  }
  try {
    wslDetected = readFileSync("/proc/version", "utf8")
      .toLowerCase()
      .includes("microsoft");
  } catch {
    wslDetected = false;
  }
  return wslDetected;
}

let cachedYtDlp: string | null = null;

/**
 * Prefers `YTDLP_PATH`, then a system `yt-dlp` on PATH (uv/pip install),
 * then the optional vendored binary at `bin/yt-dlp`.
 */
export async function resolveYtDlpPath(): Promise<string> {
  if (cachedYtDlp) return cachedYtDlp;

  const envPath = process.env.YTDLP_PATH;
  if (envPath && existsSync(envPath)) {
    await chmod(envPath, 0o755).catch(() => undefined);
    cachedYtDlp = envPath;
    return envPath;
  }

  const onPath = await capture("which", ["yt-dlp"]);
  const found = onPath.stdout.trim().split("\n")[0];
  if (onPath.code === 0 && found) {
    cachedYtDlp = found;
    return found;
  }

  const vendored = path.join(process.cwd(), "bin", "yt-dlp");
  if (existsSync(vendored)) {
    await chmod(vendored, 0o755).catch(() => undefined);
    cachedYtDlp = vendored;
    return vendored;
  }

  throw new Error(
    "yt-dlp was not found. Install it on PATH (e.g. `uv tool install yt-dlp`), set YTDLP_PATH, or place a binary at bin/yt-dlp.",
  );
}

export async function ytDlpVersion(): Promise<string> {
  const binary = await resolveYtDlpPath();
  const result = await capture(binary, ["--version"]);
  return result.stdout.trim() || "unknown";
}

/**
 * Netscape cookies file for login-walled sites.
 * Prefers an immutable `bin/cookies.source.txt` (yt-dlp rewrites whatever
 * path is passed to `--cookies`), then `bin/cookies.txt`, then env.
 */
export function resolveCookiesPath(): string | null {
  const candidates = [
    process.env.YTDLP_COOKIES_PATH,
    path.join(process.cwd(), "bin", "cookies.source.txt"),
    path.join(process.cwd(), "bin", "cookies.txt"),
  ].filter((candidate): candidate is string => Boolean(candidate));

  return candidates.find((candidate) => existsSync(candidate)) ?? null;
}

/**
 * yt-dlp always writes cookie updates back to the `--cookies` path, which
 * clobbers carefully exported files. Hand it a disposable copy instead.
 */
export async function prepareCookiesForYtDlp(): Promise<string | null> {
  const source = resolveCookiesPath();
  if (!source) return null;

  const dir = await mkdtemp(path.join(os.tmpdir(), "hudra-cookies-"));
  const dest = path.join(dir, "cookies.txt");
  await copyFile(source, dest);
  await chmod(dest, 0o644).catch(() => undefined);
  return dest;
}

const IMPERSONATE_HOSTS = [
  "facebook.com",
  "fb.com",
  "fb.watch",
  "instagram.com",
];

function hostNeedsImpersonation(host: string): boolean {
  const normalised = host.replace(/^www\./, "");
  return IMPERSONATE_HOSTS.some(
    (candidate) =>
      normalised === candidate || normalised.endsWith(`.${candidate}`),
  );
}

/**
 * Cookies + Facebook/Instagram TLS impersonation. Do not mix a custom
 * User-Agent with `--impersonate` - that breaks fingerprinting.
 */
export async function appendSiteAccessArgs(
  args: string[],
  host: string,
): Promise<string | null> {
  const cookiesPath = await prepareCookiesForYtDlp();
  if (cookiesPath) {
    args.push("--cookies", cookiesPath);
  }

  if (hostNeedsImpersonation(host)) {
    args.push(
      "--impersonate",
      process.env.YTDLP_IMPERSONATE?.trim() || "Chrome-99:Windows-10",
    );
  } else if (!host.includes("youtu")) {
    args.push(
      "--user-agent",
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    );
  }

  return cookiesPath;
}

/** Best-effort cleanup of the disposable cookies dir from prepareCookiesForYtDlp. */
export async function cleanupPreparedCookies(
  cookiesPath: string | null,
): Promise<void> {
  if (!cookiesPath) return;
  await rm(path.dirname(cookiesPath), { recursive: true, force: true }).catch(
    () => undefined,
  );
}

/** Converts a path this process can see into its Windows equivalent. */
export async function toWindowsPath(linuxPath: string): Promise<string | null> {
  if (!isWsl()) return null;
  const result = await capture("wslpath", ["-w", linuxPath]);
  const converted = result.stdout.trim();
  return result.code === 0 && converted ? converted : null;
}

/**
 * Asks Windows where Downloads actually lives, so a relocated folder still
 * works, and falls back to the profile directory if the registry read fails.
 */
async function windowsDownloadsDir(): Promise<string | null> {
  // reg.exe warns when the working directory is a Linux path it cannot map.
  const cwd = existsSync("/mnt/c") ? "/mnt/c" : undefined;

  const registry = await capture(
    "reg.exe",
    [
      "query",
      "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Shell Folders",
      "/v",
      DOWNLOADS_FOLDER_GUID,
    ],
    { cwd },
  );

  let windowsPath = registry.stdout
    .replace(/\r/g, "")
    .match(/REG_SZ\s+(.+)$/m)?.[1]
    ?.trim();

  if (!windowsPath) {
    const profile = await capture("cmd.exe", ["/c", "echo %USERPROFILE%"], {
      cwd,
    });
    const home = profile.stdout.replace(/\r/g, "").trim();
    if (!home || home.includes("%")) return null;
    windowsPath = `${home}\\Downloads`;
  }

  const converted = await capture("wslpath", ["-u", windowsPath]);
  const linuxPath = converted.stdout.trim();
  if (converted.code !== 0 || !linuxPath || !existsSync(linuxPath)) return null;
  return linuxPath;
}

let cachedDownloadsDir: string | null = null;

export async function resolveDownloadsDir(): Promise<string> {
  if (cachedDownloadsDir) return cachedDownloadsDir;

  const override = process.env.WINDOWS_DOWNLOADS_DIR;
  if (override && existsSync(override)) {
    cachedDownloadsDir = override;
    return override;
  }

  if (isWsl()) {
    const windows = await windowsDownloadsDir();
    if (windows) {
      cachedDownloadsDir = windows;
      return windows;
    }
  }

  cachedDownloadsDir = path.join(os.homedir(), "Downloads");
  return cachedDownloadsDir;
}

export async function freeBytes(dir: string): Promise<number | null> {
  try {
    const stats = await statfs(dir);
    return Number(stats.bavail) * Number(stats.bsize);
  } catch {
    return null;
  }
}

export function createStagingDir(): Promise<string> {
  return mkdtemp(path.join(os.tmpdir(), "hudra-video-"));
}

/** Picks a name that does not clash with a file already sitting in `dir`. */
export function uniqueDestination(dir: string, fileName: string): string {
  const ext = path.extname(fileName);
  const base = path.basename(fileName, ext);

  let candidate = path.join(dir, fileName);
  let counter = 1;
  while (existsSync(candidate)) {
    candidate = path.join(dir, `${base} (${counter})${ext}`);
    counter += 1;
  }
  return candidate;
}

/**
 * Moves the staged file to its final home, reporting progress when the two
 * live on different filesystems and the bytes have to be copied.
 */
export async function moveIntoPlace(
  source: string,
  destination: string,
  onProgress: (copied: number, total: number) => void,
): Promise<void> {
  const { size } = await stat(source);

  try {
    await rename(source, destination);
    onProgress(size, size);
    return;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "EXDEV") throw error;
  }

  let copied = 0;
  const reader = createReadStream(source, { highWaterMark: COPY_CHUNK_BYTES });
  reader.on("data", (chunk) => {
    copied += chunk.length;
    onProgress(copied, size);
  });

  try {
    await pipeline(
      reader,
      createWriteStream(destination, { highWaterMark: COPY_CHUNK_BYTES }),
    );
  } catch (error) {
    await rm(destination, { force: true });
    throw error;
  }

  await rm(source, { force: true });
}
