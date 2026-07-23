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
  "audio/*,audio/webm,video/webm,.m4a,.mp3,.wav,.ogg,.opus,.webm,.aac,.flac,audio/mp4,audio/x-m4a";

/** Accept attribute for the audio upload field - also allows video so audio can be stripped */
export const AUDIO_UPLOAD_ACCEPT = `${AUDIO_FILE_ACCEPT},video/*,.mp4,.mov,.mkv,.avi,.ogv`;

const VIDEO_CONTAINER_EXTENSIONS = ["mp4", "mov", "mkv", "avi", "ogv"];

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

  // Some browsers report WebM audio as video/webm
  if (file.type === "audio/webm" || file.type === "video/webm") {
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

/** True when a file dropped into the audio field should have its audio track extracted */
export function shouldExtractAudioFromVideo(file: File): boolean {
  const extension = file.name.split(".").pop()?.toLowerCase();
  if (extension && VIDEO_CONTAINER_EXTENSIONS.includes(extension)) {
    return true;
  }

  // video/* MIME that isn't the browser WebM-audio quirk already accepted as audio
  if (
    file.type.startsWith("video/") &&
    file.type !== "video/webm" &&
    extension !== "webm"
  ) {
    return true;
  }

  return false;
}

export function isAcceptedRecordingFile(
  file: File,
  type: "audio" | "video"
): boolean {
  if (type === "video") return isVideoFile(file);
  // Audio field accepts audio files and video containers (audio will be stripped)
  return isAudioFile(file) || shouldExtractAudioFromVideo(file);
}

export async function extractAudioFromVideoFile(file: File): Promise<File> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/extract-audio", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    let details = "Failed to extract audio from video";
    try {
      const error = await response.json();
      details = error.details || error.error || details;
    } catch {
      // ignore JSON parse errors
    }
    throw new Error(details);
  }

  const blob = await response.blob();
  const contentDisposition = response.headers.get("Content-Disposition") || "";
  const filenameMatch = contentDisposition.match(/filename="([^"]+)"/);
  const filename =
    filenameMatch?.[1] ||
    `${file.name.replace(/\.[^/.]+$/, "")}.m4a`;

  return new File([blob], filename, {
    type: response.headers.get("Content-Type") || blob.type || "audio/mp4",
  });
}
