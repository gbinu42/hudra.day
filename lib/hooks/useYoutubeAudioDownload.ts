"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { formatFileSize } from "@/lib/format-file-size";
import { ENABLE_EXPERIMENTAL_FEATURES } from "@/lib/config";

export interface YoutubeDownloadMetadata {
  bitrate?: string;
  duration?: string;
}

interface UseYoutubeAudioDownloadOptions {
  sourceUrl?: string;
  onDownloadComplete?: (file: File, metadata: YoutubeDownloadMetadata) => void;
}

export function useYoutubeAudioDownload({
  sourceUrl,
  onDownloadComplete,
}: UseYoutubeAudioDownloadOptions) {
  const [downloadYoutubeAudio, setDownloadYoutubeAudio] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadSpeed, setDownloadSpeed] = useState("");
  const [downloadEta, setDownloadEta] = useState("");
  const [downloadedFileSize, setDownloadedFileSize] = useState("");
  const [downloadedBitrate, setDownloadedBitrate] = useState("");
  const [downloadedDuration, setDownloadedDuration] = useState("");
  const downloadedUrlRef = useRef("");
  const onDownloadCompleteRef = useRef(onDownloadComplete);

  useEffect(() => {
    onDownloadCompleteRef.current = onDownloadComplete;
  }, [onDownloadComplete]);

  const resetDownload = () => {
    setDownloadYoutubeAudio(false);
    setDownloadedFileSize("");
    setDownloadedBitrate("");
    setDownloadedDuration("");
    setDownloadProgress(0);
    setDownloadSpeed("");
    setDownloadEta("");
    downloadedUrlRef.current = "";
  };

  useEffect(() => {
    const handleDownload = async () => {
      const url = sourceUrl;

      if (!url || !downloadYoutubeAudio || isDownloading) return;
      if (downloadedUrlRef.current === url) return;

      downloadedUrlRef.current = url;
      setIsDownloading(true);
      setDownloadProgress(0);
      setDownloadSpeed("");
      setDownloadEta("");

      const abortController = new AbortController();
      const timeoutId = setTimeout(() => {
        abortController.abort();
      }, 12 * 60 * 1000);

      try {
        const response = await fetch("/api/download-youtube", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url,
            streamProgress: true,
          }),
          signal: abortController.signal,
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.details || "Failed to download audio");
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        if (!reader) {
          throw new Error("No response body");
        }

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (!line.trim()) continue;

            try {
              const message = JSON.parse(line);

              if (message.type === "progress") {
                setDownloadProgress(message.percent || 0);
                setDownloadSpeed(message.speed || "");
                setDownloadEta(message.eta || "");
              } else if (message.type === "complete") {
                clearTimeout(timeoutId);

                const byteCharacters = atob(message.fileData);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                  byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], { type: message.mimeType });
                const file = new File([blob], message.fileName, {
                  type: message.mimeType,
                });

                const metadata = {
                  bitrate: message.bitrate || "",
                  duration: message.duration || "",
                };

                setDownloadedFileSize(formatFileSize(file.size));
                setDownloadedBitrate(metadata.bitrate);
                setDownloadedDuration(metadata.duration);

                onDownloadCompleteRef.current?.(file, metadata);

                const bitrateInfo = metadata.bitrate
                  ? ` @ ${metadata.bitrate}bps`
                  : "";
                const durationInfo = metadata.duration
                  ? ` • ${metadata.duration}`
                  : "";
                const trimMessage = ENABLE_EXPERIMENTAL_FEATURES
                  ? ' - Click "Trim Audio" if you want to trim it.'
                  : "";

                toast.success(
                  `Audio downloaded successfully! (${formatFileSize(file.size)}${bitrateInfo}${durationInfo})${trimMessage}`
                );
              } else if (message.type === "error") {
                clearTimeout(timeoutId);

                let errorMsg = message.message;
                if (errorMsg.includes("No supported JavaScript runtime")) {
                  errorMsg =
                    "YouTube download may have issues. Consider updating yt-dlp for better compatibility.";
                } else if (
                  errorMsg.includes("HTTP Error 403") ||
                  errorMsg.includes("fragment 1 not found")
                ) {
                  errorMsg =
                    "YouTube blocked the download (HTTP 403 Forbidden). This usually means:\n" +
                    "1. Your yt-dlp version is outdated - update it to the latest version\n" +
                    "2. The video may be region-restricted or require authentication\n" +
                    "3. YouTube recently changed their API\n\n" +
                    "To update yt-dlp: Run 'yt-dlp -U' or download the latest version from github.com/yt-dlp/yt-dlp";
                } else if (
                  errorMsg.includes("Requested format is not available")
                ) {
                  errorMsg =
                    "The requested audio format is not available for this video. This may be a region-restricted or private video.";
                }

                throw new Error(errorMsg);
              }
            } catch (parseError) {
              if (line.trim().length > 0) {
                console.error("Failed to parse message:", line, parseError);
              }
            }
          }
        }
      } catch (error) {
        clearTimeout(timeoutId);
        console.error("Error downloading audio:", error);

        if (error instanceof Error && error.name === "AbortError") {
          toast.error(
            "Download timeout - the download took too long (>12 minutes). Try a shorter video or check your connection."
          );
        } else {
          toast.error(
            error instanceof Error
              ? error.message
              : "Failed to download audio"
          );
        }

        setDownloadYoutubeAudio(false);
        downloadedUrlRef.current = "";
      } finally {
        setIsDownloading(false);
        setDownloadProgress(0);
        setDownloadSpeed("");
        setDownloadEta("");
      }
    };

    if (downloadYoutubeAudio) {
      void handleDownload();
    }
  }, [downloadYoutubeAudio, sourceUrl, isDownloading]);

  return {
    downloadYoutubeAudio,
    setDownloadYoutubeAudio,
    isDownloading,
    downloadProgress,
    downloadSpeed,
    downloadEta,
    downloadedFileSize,
    downloadedBitrate,
    downloadedDuration,
    resetDownload,
  };
}
