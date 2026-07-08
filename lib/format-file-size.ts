export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}

export function isDownloadableSocialUrl(url: string): boolean {
  return (
    url.includes("youtube.com") ||
    url.includes("youtu.be") ||
    url.includes("facebook.com") ||
    url.includes("fb.com") ||
    url.includes("fb.watch") ||
    url.includes("instagram.com")
  );
}

export const AUDIO_FILE_ACCEPT =
  "audio/*,.m4a,.mp3,.wav,.ogg,.opus,.webm,.aac,.flac,audio/mp4,audio/x-m4a";

export function isAudioFile(file: File): boolean {
  const extension = file.name.split(".").pop()?.toLowerCase();
  if (
    extension &&
    ["m4a", "mp3", "wav", "ogg", "opus", "webm", "aac", "flac"].includes(
      extension
    )
  ) {
    return true;
  }

  return file.type.startsWith("audio/");
}

export function isVideoFile(file: File): boolean {
  const extension = file.name.split(".").pop()?.toLowerCase();
  if (
    extension &&
    ["mp4", "webm", "ogv", "mov", "mkv", "avi"].includes(extension)
  ) {
    return true;
  }

  return file.type.startsWith("video/");
}

export function isAcceptedRecordingFile(
  file: File,
  type: "audio" | "video"
): boolean {
  return type === "audio" ? isAudioFile(file) : isVideoFile(file);
}
