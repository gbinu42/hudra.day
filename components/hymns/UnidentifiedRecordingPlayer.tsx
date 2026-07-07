"use client";

import { useState } from "react";
import { UnidentifiedRecording } from "@/lib/types/hymn";
import { Youtube } from "lucide-react";

function LazyYoutubePlayer({
  url,
  title,
}: {
  url: string;
  title?: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/
  )?.[1];

  if (!videoId) {
    return null;
  }

  if (!isPlaying) {
    return (
      <button
        type="button"
        onClick={() => setIsPlaying(true)}
        className="relative w-full max-w-md aspect-video mt-1 rounded overflow-hidden border bg-black group"
        aria-label="Play YouTube recording"
      >
        <img
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
          alt={title || "YouTube recording thumbnail"}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-90"
        />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-lg group-hover:bg-red-700">
            <Youtube className="h-7 w-7" />
          </span>
        </span>
      </button>
    );
  }

  return (
    <iframe
      className="w-full max-w-md aspect-video mt-1 rounded"
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
      title={title || "YouTube recording"}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}

export default function UnidentifiedRecordingPlayer({
  recording,
}: {
  recording: Pick<UnidentifiedRecording, "type" | "url" | "title">;
}) {
  if (recording.url === "pending") {
    return null;
  }

  if (recording.type === "audio") {
    return (
      <audio controls preload="none" className="w-full max-w-md mt-1 h-8">
        <source src={recording.url} type="audio/mpeg" />
        <source src={recording.url} type="audio/wav" />
        <source src={recording.url} type="audio/ogg" />
      </audio>
    );
  }

  if (recording.type === "video") {
    return (
      <video controls preload="none" className="w-full max-w-md mt-1 rounded">
        <source src={recording.url} type="video/mp4" />
        <source src={recording.url} type="video/webm" />
        <source src={recording.url} type="video/ogg" />
      </video>
    );
  }

  if (recording.type === "youtube") {
    return (
      <LazyYoutubePlayer url={recording.url} title={recording.title} />
    );
  }

  // link type uses the Visit button in the card header
  return null;
}
