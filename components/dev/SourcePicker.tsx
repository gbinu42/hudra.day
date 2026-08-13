"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FolderOpen, Loader2, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import type {
  AudioWorkspaceMeta,
  DownloadEvent,
} from "@/lib/dev/audio-sections-types";
import { formatBytes, formatTime } from "@/lib/dev/format-time";

interface SourcePickerProps {
  onReady: (workspace: AudioWorkspaceMeta) => void;
}

export function SourcePicker({ onReady }: SourcePickerProps) {
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [stage, setStage] = useState("");
  const [percent, setPercent] = useState<number | null>(null);
  const [detail, setDetail] = useState("");
  const [recent, setRecent] = useState<AudioWorkspaceMeta[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const refreshRecent = async () => {
    try {
      const response = await fetch("/api/dev/audio/workspaces");
      if (!response.ok) return;
      const data = (await response.json()) as {
        workspaces: AudioWorkspaceMeta[];
      };
      setRecent(data.workspaces);
    } catch {
      // Listing is a convenience; failing quietly is fine.
    }
  };

  useEffect(() => {
    void refreshRecent();
  }, []);

  const handleDownload = async () => {
    if (!url.trim() || busy) return;
    setBusy(true);
    setPercent(null);
    setDetail("");
    setStage("Starting…");

    try {
      const response = await fetch("/api/dev/audio/workspaces", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!response.ok || !response.body) {
        const message = await response.text();
        throw new Error(message || "Request failed");
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
          const event = JSON.parse(line) as DownloadEvent;

          if (event.type === "stage") {
            setStage(event.message);
            setPercent(null);
          } else if (event.type === "progress") {
            setStage("Downloading audio…");
            setPercent(event.percent ?? null);
            setDetail(
              [event.fileSize, event.speed, event.eta && `ETA ${event.eta}`]
                .filter(Boolean)
                .join(" · "),
            );
          } else if (event.type === "error") {
            throw new Error(event.message);
          } else if (event.type === "complete") {
            toast.success("Audio ready");
            onReady(event.workspace);
            return;
          }
        }
      }

      throw new Error("Download ended without producing a file");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to fetch audio",
      );
    } finally {
      setBusy(false);
      setStage("");
      setPercent(null);
      setDetail("");
    }
  };

  const handleUpload = async (file: File) => {
    setBusy(true);
    setStage(`Importing ${file.name}…`);
    setPercent(null);

    try {
      const response = await fetch("/api/dev/audio/upload", {
        method: "POST",
        headers: {
          "x-file-name": encodeURIComponent(file.name),
          "Content-Type": "application/octet-stream",
        },
        body: file,
        duplex: "half",
      } as RequestInit & { duplex: "half" });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          details?: string;
          error?: string;
        } | null;
        throw new Error(data?.details ?? data?.error ?? "Upload failed");
      }

      const data = (await response.json()) as { workspace: AudioWorkspaceMeta };
      toast.success("Audio imported");
      onReady(data.workspace);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setBusy(false);
      setStage("");
    }
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/dev/audio/workspaces?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    void refreshRecent();
  };

  return (
    <div className="mx-auto grid w-full max-w-3xl gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Load audio</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && handleDownload()}
              placeholder="YouTube, Facebook, Instagram, Vimeo, SoundCloud… URL"
              disabled={busy}
            />
            <Button onClick={handleDownload} disabled={busy || !url.trim()}>
              {busy ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Download className="mr-2 h-4 w-4" />
              )}
              Fetch audio
            </Button>
          </div>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            or
            <span className="h-px flex-1 bg-border" />
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*,video/*"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void handleUpload(file);
              event.target.value = "";
            }}
          />
          <Button
            variant="outline"
            className="w-full"
            disabled={busy}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="mr-2 h-4 w-4" />
            Import a local audio or video file
          </Button>

          {busy && (
            <div className="space-y-2 rounded-md border bg-slate-50 p-3">
              <div className="flex items-center justify-between text-sm">
                <span>{stage}</span>
                {percent !== null && (
                  <span className="font-mono">{percent.toFixed(1)}%</span>
                )}
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                <div
                  className={`h-full bg-primary transition-[width] ${
                    percent === null ? "w-1/3 animate-pulse" : ""
                  }`}
                  style={percent !== null ? { width: `${percent}%` } : undefined}
                />
              </div>
              {detail && (
                <p className="text-xs text-muted-foreground">{detail}</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {recent.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FolderOpen className="h-4 w-4" />
              Previously loaded
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y p-0">
            {recent.map((workspace) => (
              <div
                key={workspace.id}
                className="flex items-center gap-3 px-6 py-3"
              >
                <button
                  type="button"
                  className="flex-1 text-left"
                  onClick={() => onReady(workspace)}
                >
                  <p className="truncate text-sm font-medium">
                    {workspace.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatTime(workspace.duration, false)} ·{" "}
                    {formatBytes(workspace.size)} · {workspace.ext}
                  </p>
                </button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-destructive"
                  onClick={() => handleDelete(workspace.id)}
                  title="Delete from disk"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
