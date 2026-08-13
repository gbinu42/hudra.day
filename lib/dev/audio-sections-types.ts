export interface AudioWorkspaceMeta {
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

export interface AudioSection {
  id: string;
  name: string;
  start: number;
  end: number;
}

export interface PeakPayload {
  /** Interleaved [min, max] pairs. */
  peaks: Int16Array;
  peaksPerSecond: number;
  maxAmplitude: number;
}

export interface DownloadProgressEvent {
  type: "progress";
  percent?: number;
  speed?: string;
  eta?: string;
  fileSize?: string;
}

export interface DownloadStageEvent {
  type: "stage";
  message: string;
}

export interface DownloadCompleteEvent {
  type: "complete";
  workspace: AudioWorkspaceMeta;
}

export interface DownloadErrorEvent {
  type: "error";
  message: string;
}

export type DownloadEvent =
  | DownloadProgressEvent
  | DownloadStageEvent
  | DownloadCompleteEvent
  | DownloadErrorEvent;
