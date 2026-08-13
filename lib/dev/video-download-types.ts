/** Shape shared by the video download route and its client component. */

export interface DownloadDestination {
  /** Path as this process sees it (a /mnt/... mount under WSL). */
  dir: string;
  /** Windows-style path, when the destination lives on a Windows drive. */
  windowsDir: string | null;
  /** Free space on the destination volume, when it could be measured. */
  freeBytes: number | null;
}

export interface VideoDownloadEnvironment {
  destination: DownloadDestination;
  ytDlpVersion: string | null;
  ytDlpError: string | null;
  /** Cookies file handed to yt-dlp, needed for login-walled Facebook posts. */
  cookiesPath: string | null;
}

export interface DownloadedFile {
  name: string;
  /** Windows-style path when available, otherwise the plain filesystem path. */
  path: string;
  size: number;
  title?: string;
  duration?: number;
  width?: number;
  height?: number;
}

/** Which part of the job the current progress numbers belong to. */
export type DownloadPhase = "video" | "audio" | "media" | "copy";

export interface VideoProgressEvent {
  type: "progress";
  phase: DownloadPhase;
  percent: number | null;
  transferred: number;
  total: number | null;
  /** Bytes per second, reported by yt-dlp or measured during the copy. */
  speed?: number;
  /** Seconds remaining. */
  eta?: number;
}

export interface VideoStageEvent {
  type: "stage";
  message: string;
}

export interface VideoCompleteEvent {
  type: "complete";
  file: DownloadedFile;
}

export interface VideoErrorEvent {
  type: "error";
  message: string;
}

export type VideoDownloadEvent =
  | VideoProgressEvent
  | VideoStageEvent
  | VideoCompleteEvent
  | VideoErrorEvent;
