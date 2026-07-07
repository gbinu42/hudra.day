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
