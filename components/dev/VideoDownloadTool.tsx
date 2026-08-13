"use client";

import { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  Check,
  Copy,
  Download,
  FolderDown,
  Loader2,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatBytes, formatTime } from "@/lib/dev/format-time";
import type {
  DownloadedFile,
  DownloadPhase,
  VideoDownloadEnvironment,
  VideoDownloadEvent,
} from "@/lib/dev/video-download-types";

const PHASE_LABELS: Record<DownloadPhase, string> = {
  video: "Downloading video stream",
  audio: "Downloading audio stream",
  media: "Downloading",
  copy: "Copying to Downloads",
};

/** Short two-note chime so a finished save is noticeable after a long wait. */
const playDoneChime = (() => {
  let audioContext: AudioContext | null = null;

  return () => {
    try {
      if (!audioContext) {
        const Ctor =
          window.AudioContext ||
          (
            window as typeof window & {
              webkitAudioContext: typeof AudioContext;
            }
          ).webkitAudioContext;
        audioContext = new Ctor();
      }

      if (audioContext.state === "suspended") {
        void audioContext.resume().catch(() => undefined);
      }

      const now = audioContext.currentTime;
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5

      for (let i = 0; i < notes.length; i += 1) {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.type = "sine";
        osc.frequency.value = notes[i];
        const start = now + i * 0.12;
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.exponentialRampToValueAtTime(0.18, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.28);
        osc.start(start);
        osc.stop(start + 0.3);
      }
    } catch {
      // Audio is a nicety; never block the download flow on it.
    }
  };
})();

interface Progress {
  phase: DownloadPhase;
  percent: number | null;
  transferred: number;
  total: number | null;
  speed?: number;
  eta?: number;
}

export function VideoDownloadTool() {
  const [environment, setEnvironment] =
    useState<VideoDownloadEnvironment | null>(null);
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [stage, setStage] = useState("");
  const [progress, setProgress] = useState<Progress | null>(null);
  const [finished, setFinished] = useState<DownloadedFile[]>([]);
  const [copiedPath, setCopiedPath] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const refreshEnvironment = async () => {
    try {
      const response = await fetch("/api/dev/video-download");
      if (!response.ok) return;
      setEnvironment((await response.json()) as VideoDownloadEnvironment);
    } catch {
      // The banner is informational; a failure here should not block the form.
    }
  };

  useEffect(() => {
    void refreshEnvironment();
  }, []);

  const handleDownload = async () => {
    if (!url.trim() || busy) return;

    const controller = new AbortController();
    abortRef.current = controller;
    setBusy(true);
    setStage("Starting…");
    setProgress(null);

    try {
      const response = await fetch("/api/dev/video-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        const data = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(data?.error ?? "Request failed");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.trim()) continue;
          const event = JSON.parse(line) as VideoDownloadEvent;

          if (event.type === "stage") {
            setStage(event.message);
            setProgress(null);
          } else if (event.type === "progress") {
            setStage("");
            setProgress(event);
          } else if (event.type === "error") {
            throw new Error(event.message);
          } else if (event.type === "complete") {
            setFinished((current) => [event.file, ...current]);
            setUrl("");
            playDoneChime();
            toast.success(`Saved ${event.file.name}`);
            void refreshEnvironment();
            return;
          }
        }
      }

      throw new Error("The download ended without producing a file");
    } catch (error) {
      if (controller.signal.aborted) {
        toast.info("Download cancelled");
      } else {
        toast.error(
          error instanceof Error ? error.message : "Failed to download",
        );
      }
    } finally {
      abortRef.current = null;
      setBusy(false);
      setStage("");
      setProgress(null);
    }
  };

  const handleCopyPath = async (filePath: string) => {
    await navigator.clipboard.writeText(filePath);
    setCopiedPath(filePath);
    setTimeout(() => setCopiedPath(null), 1500);
  };

  const destination = environment?.destination;
  const lowOnSpace =
    destination?.freeBytes !== null &&
    destination?.freeBytes !== undefined &&
    destination.freeBytes < 5 * 1024 * 1024 * 1024;

  return (
    <div className="mx-auto grid w-full max-w-3xl gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Download a video</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && handleDownload()}
              placeholder="https://www.facebook.com/… (or any yt-dlp supported URL)"
              disabled={busy}
            />
            <Button onClick={handleDownload} disabled={busy || !url.trim()}>
              {busy ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Download className="mr-2 h-4 w-4" />
              )}
              Download
            </Button>
            {busy && (
              <Button
                variant="outline"
                onClick={() => abortRef.current?.abort()}
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            )}
          </div>

          <p className="text-xs text-muted-foreground">
            Grabs the best available video and audio streams and merges them
            into a single MP4. Nothing passes through the browser - the file is
            written straight to disk by the dev server.
          </p>

          {(busy || progress) && (
            <div className="space-y-2 rounded-md border bg-slate-50 p-3">
              <div className="flex items-center justify-between text-sm">
                <span>{progress ? PHASE_LABELS[progress.phase] : stage}</span>
                {progress?.percent !== null &&
                  progress?.percent !== undefined && (
                    <span className="font-mono">
                      {progress.percent.toFixed(1)}%
                    </span>
                  )}
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                <div
                  className={`h-full bg-primary transition-[width] ${
                    progress?.percent == null ? "w-1/3 animate-pulse" : ""
                  }`}
                  style={
                    progress?.percent != null
                      ? { width: `${progress.percent}%` }
                      : undefined
                  }
                />
              </div>
              {progress && (
                <p className="text-xs text-muted-foreground">
                  {[
                    progress.total
                      ? `${formatBytes(progress.transferred)} of ${formatBytes(progress.total)}`
                      : formatBytes(progress.transferred),
                    progress.speed && `${formatBytes(progress.speed)}/s`,
                    progress.eta !== undefined &&
                      `ETA ${formatTime(progress.eta, false)}`,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {destination && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FolderDown className="h-4 w-4" />
              Saving to
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="font-mono break-all">
              {destination.windowsDir ?? destination.dir}
            </p>
            <p className="text-xs text-muted-foreground">
              {destination.freeBytes !== null &&
                `${formatBytes(destination.freeBytes)} free`}
              {environment.ytDlpVersion &&
                ` · yt-dlp ${environment.ytDlpVersion}`}
              {environment.cookiesPath && " · using cookies file"}
            </p>
            {lowOnSpace && (
              <p className="flex items-start gap-2 text-xs text-amber-700">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                The destination drive is running low on space. Long videos can
                easily be a couple of gigabytes.
              </p>
            )}
            {environment.ytDlpError && (
              <p className="flex items-start gap-2 text-xs text-destructive">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                {environment.ytDlpError}
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {finished.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Downloaded</CardTitle>
          </CardHeader>
          <CardContent className="divide-y p-0">
            {finished.map((file) => (
              <div key={file.path} className="flex items-center gap-3 px-6 py-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {file.title ?? file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {[
                      formatBytes(file.size),
                      file.width &&
                        file.height &&
                        `${file.width}×${file.height}`,
                      file.duration && formatTime(file.duration, false),
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                  <p className="mt-1 truncate font-mono text-xs text-muted-foreground">
                    {file.path}
                  </p>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() => handleCopyPath(file.path)}
                  title="Copy path"
                >
                  {copiedPath === file.path ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
