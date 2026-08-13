const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;

export function getYoutubeVideoId(url: string): string | undefined {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^(www|m)\./, "");

    if (host === "youtu.be") {
      const id = parsed.pathname.split("/").filter(Boolean)[0];
      return id && YOUTUBE_ID.test(id) ? id : undefined;
    }

    if (host === "youtube.com" || host === "youtube-nocookie.com") {
      const v = parsed.searchParams.get("v");
      if (v && YOUTUBE_ID.test(v)) return v;

      const parts = parsed.pathname.split("/").filter(Boolean);
      if (
        parts[0] &&
        ["embed", "shorts", "live", "v"].includes(parts[0]) &&
        parts[1] &&
        YOUTUBE_ID.test(parts[1])
      ) {
        return parts[1];
      }
    }
  } catch {
    // Fall through to regex for non-URL strings
  }

  const match = url.match(
    /(?:youtube(?:-nocookie)?\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/,
  );
  return match?.[1];
}

export function getYoutubeEmbedSrc(url: string): string | undefined {
  const id = getYoutubeVideoId(url);
  if (!id) return undefined;
  return `https://www.youtube-nocookie.com/embed/${id}`;
}
