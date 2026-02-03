"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Play,
  Pause,
  Scissors,
  RotateCcw,
  Volume2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { toast } from "sonner";
import { useWavesurfer } from "@wavesurfer/react";
import { Slider } from "@/components/ui/slider";

type WaveSurferRegion = {
  start: number;
  end: number;
  on: (eventName: "update" | "update-end", callback: () => void) => void;
  play: () => void;
  setOptions: (options: { start?: number; end?: number }) => void;
};

type RegionsPluginInstance = {
  clearRegions: () => void;
  addRegion: (options: {
    start: number;
    end: number;
    color?: string;
    drag?: boolean;
    resize?: boolean;
  }) => WaveSurferRegion;
};

type UnknownRecord = Record<string, unknown>;
const isRecord = (v: unknown): v is UnknownRecord =>
  typeof v === "object" && v !== null;

const isRegionsPluginInstance = (p: unknown): p is RegionsPluginInstance => {
  if (!isRecord(p)) return false;

  const ctor = (p as { constructor?: unknown }).constructor;
  const ctorName =
    ctor && typeof ctor === "function"
      ? (ctor as { name?: unknown }).name
      : undefined;

  return (
    ctorName === "RegionsPlugin" &&
    typeof (p as { clearRegions?: unknown }).clearRegions === "function" &&
    typeof (p as { addRegion?: unknown }).addRegion === "function"
  );
};

interface AudioTrimmerProps {
  audioFile: File;
  onTrimComplete: (
    trimmedFile: File,
    metadata?: { bitrate?: string; duration?: string }
  ) => void;
  onCancel: () => void;
}

export default function AudioTrimmer({
  audioFile,
  onTrimComplete,
  onCancel,
}: AudioTrimmerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [isTrimming, setIsTrimming] = useState(false);
  const [trimmedFile, setTrimmedFile] = useState<File | null>(null);
  const [originalFileSize, setOriginalFileSize] = useState(0);
  const [trimmedFileSize, setTrimmedFileSize] = useState(0);
  const [volume, setVolume] = useState(1);
  const [gainDb, setGainDb] = useState(0); // Audio gain in decibels (-20 to +20)
  const [zoomLevel, setZoomLevel] = useState<number | undefined>(undefined); // Pixels per second for waveform zoom
  const containerRef = useRef<HTMLDivElement>(null);
  const audioUrl = useRef<string>("");
  const regionRef = useRef<WaveSurferRegion | null>(null);
  const mousePositionRef = useRef<{ x: number; time: number } | null>(null);

  // Initialize wavesurfer
  const { wavesurfer, isReady } = useWavesurfer({
    container: containerRef,
    url: audioUrl.current,
    waveColor: "#94a3b8",
    progressColor: "#3b82f6",
    cursorColor: "#1e40af",
    barWidth: 2,
    barGap: 1,
    barRadius: 2,
    height: 80,
    normalize: false, // Disabled for faster rendering of long files
    dragToSeek: true,
    backend: "MediaElement", // Use native media element for faster initial load
  });

  useEffect(() => {
    // Reset all state when file changes - ensures fresh start for each trim session
    setDuration(0);
    setCurrentTime(0);
    setStartTime(0);
    setEndTime(0);
    setTrimmedFile(null);
    setTrimmedFileSize(0);
    setIsPlaying(false);
    setZoomLevel(undefined);
    mousePositionRef.current = null;

    // Clean up old URL if exists
    if (audioUrl.current) {
      URL.revokeObjectURL(audioUrl.current);
    }

    // Create new object URL for the audio file
    audioUrl.current = URL.createObjectURL(audioFile);
    setOriginalFileSize(audioFile.size);

    return () => {
      // Clean up object URL
      if (audioUrl.current) {
        URL.revokeObjectURL(audioUrl.current);
      }
    };
  }, [audioFile]);

  const initializeRegion = useCallback(
    async (audioDuration: number) => {
      if (!wavesurfer) return;

      // Dynamically import regions plugin
      const RegionsPlugin = (
        await import("wavesurfer.js/dist/plugins/regions.esm.js")
      ).default;

      // Check if regions plugin is already registered
      const activePlugins = wavesurfer.getActivePlugins() as unknown[];
      let regions = activePlugins.find(isRegionsPluginInstance);

      if (!regions) {
        regions = wavesurfer.registerPlugin(
          RegionsPlugin.create()
        ) as unknown as RegionsPluginInstance;
      }

      // Clear existing regions
      regions.clearRegions();

      // Add a region for the entire audio
      const region = regions.addRegion({
        start: 0,
        end: audioDuration,
        color: "rgba(59, 130, 246, 0.2)",
        drag: true,
        resize: true,
      });

      regionRef.current = region;

      // Update state while region is being dragged (real-time)
      region.on("update", () => {
        setStartTime(region.start);
        setEndTime(region.end);
      });

      // Also update when drag ends
      region.on("update-end", () => {
        setStartTime(region.start);
        setEndTime(region.end);
      });

      setStartTime(0);
      setEndTime(audioDuration);
    },
    [wavesurfer]
  );

  useEffect(() => {
    if (!wavesurfer) return;

    // Load the audio with error handling
    wavesurfer.load(audioUrl.current).catch((error) => {
      // Ignore abort errors which happen during component cleanup
      if (error.name !== "AbortError" && !error.message?.includes("aborted")) {
        console.error("Error loading audio:", error);
      }
    });

    // Set up event listeners
    const subscriptions = [
      wavesurfer.on("ready", () => {
        const audioDuration = wavesurfer.getDuration();
        setDuration(audioDuration);
        setEndTime(audioDuration);

        // Calculate zoom to fit entire waveform in viewport
        const container = containerRef.current;
        if (container && audioDuration > 0) {
          const containerWidth = container.clientWidth - 20; // Account for padding
          // Calculate pixels per second needed to fit the entire waveform
          // Use a very small minimum to allow extreme zoom out for long files
          const minZoom = Math.max(0.1, containerWidth / audioDuration);
          setZoomLevel(minZoom);
        }

        // Initialize region plugin for selection
        initializeRegion(audioDuration);
      }),
      wavesurfer.on("timeupdate", (time) => {
        setCurrentTime(time);
      }),
      wavesurfer.on("play", () => {
        setIsPlaying(true);
      }),
      wavesurfer.on("pause", () => {
        setIsPlaying(false);
      }),
      wavesurfer.on("finish", () => {
        setIsPlaying(false);
      }),
      // Catch and ignore abort errors
      wavesurfer.on("error", (error) => {
        if (
          error.name !== "AbortError" &&
          !error.message?.includes("aborted")
        ) {
          console.error("Wavesurfer error:", error);
        }
      }),
    ];

    return () => {
      subscriptions.forEach((unsub) => unsub());
    };
  }, [wavesurfer, audioFile, initializeRegion]);

  // Handle volume and gain changes - apply both to playback for real-time feedback
  useEffect(() => {
    if (wavesurfer) {
      // Apply both volume slider and gain adjustment
      // Convert dB to volume multiplier: multiplier = 10^(dB/20)
      const gainMultiplier = Math.pow(10, gainDb / 20);
      const combinedVolume = volume * gainMultiplier;

      // Clamp to valid range [0, 1] for HTML audio element
      // Note: Preview may clip if gain is too high, but output file will have the full gain applied
      const clampedVolume = Math.max(0, Math.min(1, combinedVolume));
      wavesurfer.setVolume(clampedVolume);
    }
  }, [volume, gainDb, wavesurfer]);

  // Track mouse position for zoom-to-cursor
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !wavesurfer || !duration) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;

      // Get the wrapper div that contains the actual waveform
      const wrapper = container.querySelector(
        "[data-scroll-container], .scroll"
      ) as HTMLElement;
      const scrollLeft = wrapper?.scrollLeft || 0;

      // Calculate time position at mouse cursor
      const timeAtCursor =
        (duration * (x + scrollLeft)) / (duration * (zoomLevel || 1));

      mousePositionRef.current = { x, time: timeAtCursor };
    };

    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, [wavesurfer, duration, zoomLevel]);

  // Handle zoom with Ctrl + scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !wavesurfer || !duration) return;

    const handleWheel = (e: WheelEvent) => {
      // Only zoom when Ctrl is pressed
      if (e.ctrlKey) {
        e.preventDefault();

        // Store current mouse position before zoom
        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const wrapper = container.querySelector(
          "[data-scroll-container], .scroll"
        ) as HTMLElement;

        setZoomLevel((prev) => {
          if (prev === undefined) return prev;

          // Calculate minimum zoom to fit entire waveform
          const containerWidth = container.clientWidth - 20; // Account for padding
          const minZoom = Math.max(0.1, containerWidth / duration);

          // Zoom in (scroll up) or out (scroll down)
          const delta = e.deltaY > 0 ? -10 : 10;
          const newZoom = prev + delta;

          // Clamp zoom between minimum (to fit) and 500 pixels per second
          const clampedZoom = Math.max(minZoom, Math.min(500, newZoom));

          // After zoom, adjust scroll to keep mouse position at same time
          requestAnimationFrame(() => {
            if (wrapper && mousePositionRef.current) {
              const timeAtMouse = mousePositionRef.current.time;
              const newScrollLeft = timeAtMouse * clampedZoom - mouseX;
              wrapper.scrollLeft = Math.max(0, newScrollLeft);
            }
          });

          return clampedZoom;
        });
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [wavesurfer, duration]);

  // Apply zoom level to wavesurfer
  useEffect(() => {
    if (wavesurfer && isReady && zoomLevel !== undefined) {
      wavesurfer.zoom(zoomLevel);
    }
  }, [zoomLevel, wavesurfer, isReady]);

  const togglePlayPause = () => {
    if (wavesurfer) {
      wavesurfer.playPause();
    }
  };

  const parseTimeInput = (value: string): number | null => {
    // Try to parse as MM:SS format first
    const timeMatch = value.match(/^(\d+):(\d+)$/);
    if (timeMatch) {
      const mins = parseInt(timeMatch[1], 10);
      const secs = parseInt(timeMatch[2], 10);
      if (secs < 60) {
        return mins * 60 + secs;
      }
    }
    // Fallback to parsing as plain seconds
    const seconds = parseFloat(value);
    return !isNaN(seconds) ? seconds : null;
  };

  const formatTimeInput = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartTimeChange = (value: string) => {
    const time = parseTimeInput(value);
    if (time !== null && time >= 0 && time < endTime) {
      setStartTime(time);
      if (regionRef.current) {
        regionRef.current.setOptions({ start: time });
      }
    }
  };

  const handleEndTimeChange = (value: string) => {
    const time = parseTimeInput(value);
    if (time !== null && time > startTime && time <= duration) {
      setEndTime(time);
      if (regionRef.current) {
        regionRef.current.setOptions({ end: time });
      }
    }
  };

  const formatTime = (seconds: number): string => {
    if (isNaN(seconds) || seconds === 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const handleTrim = async () => {
    setIsTrimming(true);
    try {
      const formData = new FormData();
      formData.append("file", audioFile);
      formData.append("startTime", startTime.toString());
      formData.append("endTime", endTime.toString());
      formData.append("gainDb", gainDb.toString());

      const response = await fetch("/api/trim-audio", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.details || "Failed to trim audio");
      }

      const blob = await response.blob();
      const fileName =
        response.headers.get("X-File-Name") || "trimmed_audio.mp3";
      const contentType = response.headers.get("Content-Type") || "audio/mpeg";
      const bitrate = response.headers.get("X-Bitrate");
      const duration = response.headers.get("X-Duration");
      const trimmedFile = new File([blob], fileName, { type: contentType });

      setTrimmedFile(trimmedFile);
      setTrimmedFileSize(trimmedFile.size);

      // Prepare metadata
      const metadata: { bitrate?: string; duration?: string } = {};
      if (bitrate) metadata.bitrate = bitrate;
      if (duration) metadata.duration = duration;

      toast.success("Audio trimmed successfully!");
      onTrimComplete(trimmedFile, metadata);
    } catch (error) {
      console.error("Error trimming audio:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to trim audio"
      );
    } finally {
      setIsTrimming(false);
    }
  };

  const handleReTrim = () => {
    setTrimmedFile(null);
    setTrimmedFileSize(0);
    // Reset region to full duration
    if (regionRef.current && duration > 0) {
      regionRef.current.setOptions({ start: 0, end: duration });
      setStartTime(0);
      setEndTime(duration);
    }
  };

  const playSelection = () => {
    if (wavesurfer && regionRef.current) {
      regionRef.current.play();
    }
  };

  return (
    <div
      className="relative left-1/2 right-1/2 -mx-[50vw] w-screen my-4"
      onSubmit={(e) => {
        // Prevent any form submission from within the trimmer
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <Card className="border-2 border-blue-500 mx-4">
        <CardContent className="space-y-2 pt-3 pb-3 px-4">
          {/* Waveform container */}
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-4 mb-1">
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium whitespace-nowrap">
                  Preview Volume
                </Label>
                <div className="flex items-center gap-2">
                  <Volume2 className="h-4 w-4 text-muted-foreground" />
                  <div className="w-24">
                    <Slider
                      value={[volume * 100]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={(values) => setVolume(values[0] / 100)}
                      className="cursor-pointer"
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-8 text-right">
                    {Math.round(volume * 100)}%
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium whitespace-nowrap">
                  Output Gain
                </Label>
                <div className="flex items-center gap-2">
                  <Volume2 className="h-4 w-4 text-muted-foreground" />
                  <div className="w-32">
                    <Slider
                      value={[gainDb]}
                      min={-20}
                      max={20}
                      step={0.5}
                      onValueChange={(values) => setGainDb(values[0])}
                      className="cursor-pointer"
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-12 text-right">
                    {gainDb > 0 ? "+" : ""}
                    {gainDb.toFixed(1)} dB
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-muted-foreground italic">
              Gain adjusts output volume (preview reflects changes in real-time)
            </p>

            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            <div
              ref={containerRef}
              className="border rounded bg-slate-50 p-2"
              onClick={(e) => {
                // Prevent click events on the waveform from bubbling up
                e.stopPropagation();
              }}
            />

            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                Drag region edges to select portion to keep
              </p>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0"
                  onClick={() => {
                    const container = containerRef.current;
                    if (container && duration > 0 && zoomLevel !== undefined) {
                      const wrapper = container.querySelector(
                        "[data-scroll-container], .scroll"
                      ) as HTMLElement;
                      const scrollLeft = wrapper?.scrollLeft || 0;
                      const centerX = container.clientWidth / 2;
                      const timeAtCenter = (scrollLeft + centerX) / zoomLevel;

                      const containerWidth = container.clientWidth - 20; // Account for padding
                      const minZoom = Math.max(0.1, containerWidth / duration);
                      const newZoom = Math.max(minZoom, zoomLevel - 20);

                      setZoomLevel(newZoom);

                      // Maintain center position after zoom
                      requestAnimationFrame(() => {
                        if (wrapper) {
                          const newScrollLeft =
                            timeAtCenter * newZoom - centerX;
                          wrapper.scrollLeft = Math.max(0, newScrollLeft);
                        }
                      });
                    }
                  }}
                  disabled={
                    !isReady ||
                    zoomLevel === undefined ||
                    (containerRef.current !== null &&
                      duration > 0 &&
                      zoomLevel <=
                        Math.max(
                          0.1,
                          (containerRef.current.clientWidth - 20) / duration
                        ))
                  }
                >
                  <ZoomOut className="h-3 w-3" />
                </Button>
                <span className="text-xs text-muted-foreground min-w-16 text-center">
                  {zoomLevel !== undefined ? Math.round(zoomLevel) : 0}px/s
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0"
                  onClick={() => {
                    const container = containerRef.current;
                    if (container && duration > 0 && zoomLevel !== undefined) {
                      const wrapper = container.querySelector(
                        "[data-scroll-container], .scroll"
                      ) as HTMLElement;
                      const scrollLeft = wrapper?.scrollLeft || 0;
                      const centerX = container.clientWidth / 2;
                      const timeAtCenter = (scrollLeft + centerX) / zoomLevel;

                      const newZoom = Math.min(500, zoomLevel + 20);

                      setZoomLevel(newZoom);

                      // Maintain center position after zoom
                      requestAnimationFrame(() => {
                        if (wrapper) {
                          const newScrollLeft =
                            timeAtCenter * newZoom - centerX;
                          wrapper.scrollLeft = Math.max(0, newScrollLeft);
                        }
                      });
                    }
                  }}
                  disabled={
                    !isReady || zoomLevel === undefined || zoomLevel >= 500
                  }
                >
                  <ZoomIn className="h-3 w-3" />
                </Button>
                <span className="text-xs text-muted-foreground italic">
                  (Ctrl+Scroll)
                </span>
              </div>
            </div>
          </div>

          {/* Playback controls */}
          <div className="flex justify-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={togglePlayPause}
              disabled={!isReady}
            >
              {isPlaying ? (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Play Full
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={playSelection}
              disabled={!isReady}
            >
              <Play className="h-4 w-4 mr-2" />
              Play Selection
            </Button>
          </div>

          {/* Manual time input */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="start-time">Start Time (MM:SS)</Label>
              <Input
                id="start-time"
                type="text"
                placeholder="0:00"
                value={formatTimeInput(startTime)}
                onChange={(e) => handleStartTimeChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                className="font-mono text-base"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="end-time">End Time (MM:SS)</Label>
              <Input
                id="end-time"
                type="text"
                placeholder="0:00"
                value={formatTimeInput(endTime)}
                onChange={(e) => handleEndTimeChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                className="font-mono text-base"
              />
            </div>
          </div>

          {/* File size comparison */}
          <div className="p-3 bg-muted rounded-lg text-sm space-y-1">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-muted-foreground">Original Duration:</p>
                <p className="font-semibold text-base">
                  {formatTime(duration)}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Original Size:</p>
                <p className="font-semibold text-base">
                  {formatFileSize(originalFileSize)}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-muted-foreground">Trimmed Duration:</p>
                <p className="font-semibold text-base">
                  {formatTime(endTime - startTime)}
                </p>
              </div>
              {trimmedFileSize > 0 && (
                <div>
                  <p className="text-muted-foreground">Trimmed Size:</p>
                  <p className="font-semibold text-base">
                    {formatFileSize(trimmedFileSize)}
                  </p>
                </div>
              )}
            </div>
            {trimmedFileSize > 0 && (
              <div className="pt-1 border-t">
                <p className="text-green-600 font-bold text-base">
                  Saved: {formatFileSize(originalFileSize - trimmedFileSize)} (
                  {Math.round(
                    ((originalFileSize - trimmedFileSize) / originalFileSize) *
                      100
                  )}
                  %)
                </p>
              </div>
            )}
            {trimmedFileSize === 0 && duration > 0 && (
              <p className="text-muted-foreground text-xs italic pt-1 border-t">
                Estimated: ~
                {formatFileSize(
                  Math.round(
                    (originalFileSize * (endTime - startTime)) / duration
                  )
                )}
              </p>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-2">
            {trimmedFile && (
              <Button
                type="button"
                variant="outline"
                onClick={handleReTrim}
                disabled={isTrimming}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Re-trim
              </Button>
            )}
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isTrimming}
            >
              {trimmedFile ? "Use Trimmed Audio" : "Cancel"}
            </Button>
            {!trimmedFile && (
              <Button
                type="button"
                onClick={handleTrim}
                disabled={isTrimming || !isReady}
              >
                {isTrimming ? (
                  "Trimming..."
                ) : (
                  <>
                    <Scissors className="h-4 w-4 mr-2" />
                    Trim Audio
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
