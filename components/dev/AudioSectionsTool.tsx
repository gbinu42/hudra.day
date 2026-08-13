"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowLeft,
  Download,
  Loader2,
  Package,
  Pause,
  Play,
  Repeat,
  Scissors,
  SkipBack,
  SkipForward,
  Wand2,
} from "lucide-react";
import { toast } from "sonner";
import { SectionList } from "@/components/dev/SectionList";
import { SourcePicker } from "@/components/dev/SourcePicker";
import {
  WrappedWaveform,
  type WaveformHandle,
} from "@/components/dev/WrappedWaveform";
import type {
  AudioSection,
  AudioWorkspaceMeta,
} from "@/lib/dev/audio-sections-types";
import { formatBytes, formatTime } from "@/lib/dev/format-time";

const ROW_LENGTH_OPTIONS = [10, 15, 30, 60, 120, 300];
const ROW_HEIGHT_OPTIONS = [
  { label: "Compact", value: 64 },
  { label: "Normal", value: 88 },
  { label: "Tall", value: 128 },
];
const DETAIL_OPTIONS = [25, 50, 100];

function storageKey(id: string) {
  return `hudra-dev-audio-sections:${id}`;
}

function sortSections(sections: AudioSection[]): AudioSection[] {
  return [...sections].sort((a, b) => a.start - b.start);
}

export function AudioSectionsTool() {
  const [workspace, setWorkspace] = useState<AudioWorkspaceMeta | null>(null);
  const [peaks, setPeaks] = useState<Int16Array | null>(null);
  const [peakMeta, setPeakMeta] = useState({
    peaksPerSecond: 50,
    maxAmplitude: 32768,
  });
  const [analysing, setAnalysing] = useState(false);
  const [sections, setSections] = useState<AudioSection[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [secondsPerRow, setSecondsPerRow] = useState(60);
  const [rowHeight, setRowHeight] = useState(88);
  const [detail, setDetail] = useState(50);
  const [gain, setGain] = useState(1);
  const [normalise, setNormalise] = useState(true);
  const [viewportHeight, setViewportHeight] = useState(520);

  const [playing, setPlaying] = useState(false);
  const [follow, setFollow] = useState(true);
  const [loopSection, setLoopSection] = useState(false);
  const [pendingStart, setPendingStart] = useState<number | null>(null);
  const [exporting, setExporting] = useState(false);
  const [busySectionId, setBusySectionId] = useState<string | null>(null);
  const [detecting, setDetecting] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const waveformRef = useRef<WaveformHandle>(null);
  const timeLabelRef = useRef<HTMLSpanElement>(null);
  const loopRef = useRef<{ enabled: boolean; section: AudioSection | null }>({
    enabled: false,
    section: null,
  });
  const followRef = useRef(true);

  const selectedSection = useMemo(
    () => sections.find((section) => section.id === selectedId) ?? null,
    [sections, selectedId],
  );

  useEffect(() => {
    loopRef.current = { enabled: loopSection, section: selectedSection };
  }, [loopSection, selectedSection]);

  useEffect(() => {
    followRef.current = follow;
  }, [follow]);

  useEffect(() => {
    const update = () =>
      setViewportHeight(Math.max(320, window.innerHeight - 430));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Restore any marks made in a previous visit to this recording.
  useEffect(() => {
    if (!workspace) return;
    try {
      const raw = window.localStorage.getItem(storageKey(workspace.id));
      setSections(raw ? (JSON.parse(raw) as AudioSection[]) : []);
    } catch {
      setSections([]);
    }
    setSelectedId(null);
  }, [workspace]);

  useEffect(() => {
    if (!workspace) return;
    window.localStorage.setItem(
      storageKey(workspace.id),
      JSON.stringify(sections),
    );
  }, [sections, workspace]);

  useEffect(() => {
    if (!workspace) return;
    let cancelled = false;

    const load = async () => {
      setAnalysing(true);
      setPeaks(null);
      try {
        const response = await fetch(
          `/api/dev/audio/peaks?id=${encodeURIComponent(workspace.id)}&pps=${detail}`,
        );
        if (!response.ok) {
          const data = (await response.json().catch(() => null)) as {
            details?: string;
          } | null;
          throw new Error(data?.details ?? "Failed to analyse audio");
        }
        const buffer = await response.arrayBuffer();
        if (cancelled) return;
        setPeaks(new Int16Array(buffer));
        setPeakMeta({
          peaksPerSecond: Number(
            response.headers.get("X-Peaks-Per-Second") ?? detail,
          ),
          maxAmplitude: Number(
            response.headers.get("X-Max-Amplitude") ?? 32768,
          ),
        });
      } catch (error) {
        if (!cancelled) {
          toast.error(
            error instanceof Error ? error.message : "Failed to analyse audio",
          );
        }
      } finally {
        if (!cancelled) setAnalysing(false);
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, [workspace, detail]);

  // Playback drives the playhead through a ref so React never re-renders here.
  useEffect(() => {
    if (!workspace) return;
    let frame = 0;

    const tick = () => {
      const audio = audioRef.current;
      if (audio) {
        const time = audio.currentTime;
        waveformRef.current?.setTime(time);
        if (timeLabelRef.current) {
          timeLabelRef.current.textContent = formatTime(time);
        }

        const loop = loopRef.current;
        if (loop.enabled && loop.section && !audio.paused) {
          if (time >= loop.section.end || time < loop.section.start - 0.25) {
            audio.currentTime = loop.section.start;
          }
        }
        if (followRef.current && !audio.paused) {
          waveformRef.current?.scrollToTime(time);
        }
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [workspace]);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, time);
    waveformRef.current?.setTime(time);
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      void audio.play();
    } else {
      audio.pause();
    }
  }, []);

  const addSection = useCallback(
    (start: number, end: number) => {
      const id =
        globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
      setSections((previous) => {
        const next = sortSections([
          ...previous,
          {
            id,
            name: `Section ${previous.length + 1}`,
            start: Math.max(0, start),
            end,
          },
        ]);
        return next;
      });
      setSelectedId(id);
    },
    [],
  );

  const resizeSection = useCallback((id: string, start: number, end: number) => {
    setSections((previous) =>
      sortSections(
        previous.map((section) =>
          section.id === id
            ? { ...section, start: Math.max(0, start), end }
            : section,
        ),
      ),
    );
  }, []);

  const deleteSection = useCallback((id: string) => {
    setSections((previous) => previous.filter((section) => section.id !== id));
    setSelectedId((current) => (current === id ? null : current));
  }, []);

  const markStart = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setPendingStart(audio.currentTime);
  }, []);

  const markEnd = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || pendingStart === null) return;
    const end = audio.currentTime;
    if (end <= pendingStart) {
      toast.error("End must come after the start mark");
      return;
    }
    addSection(pendingStart, end);
    setPendingStart(null);
  }, [addSection, pendingStart]);

  useEffect(() => {
    if (!workspace) return;

    const handler = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      const audio = audioRef.current;
      if (!audio) return;

      switch (event.key) {
        case " ":
          event.preventDefault();
          togglePlay();
          break;
        case "[":
          event.preventDefault();
          markStart();
          break;
        case "]":
          event.preventDefault();
          markEnd();
          break;
        case "ArrowLeft":
          event.preventDefault();
          seek(audio.currentTime - (event.shiftKey ? 30 : 5));
          break;
        case "ArrowRight":
          event.preventDefault();
          seek(audio.currentTime + (event.shiftKey ? 30 : 5));
          break;
        case "Delete":
        case "Backspace":
          if (selectedId) {
            event.preventDefault();
            deleteSection(selectedId);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [
    deleteSection,
    markEnd,
    markStart,
    seek,
    selectedId,
    togglePlay,
    workspace,
  ]);

  const download = useCallback(
    async (toExport: AudioSection[], sectionId?: string) => {
      if (!workspace || toExport.length === 0) return;
      if (sectionId) setBusySectionId(sectionId);
      else setExporting(true);

      try {
        const response = await fetch("/api/dev/audio/export", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: workspace.id,
            sections: toExport.map((section) => ({
              name: section.name,
              start: section.start,
              end: section.end,
            })),
          }),
        });

        if (!response.ok) {
          const data = (await response.json().catch(() => null)) as {
            details?: string;
            error?: string;
          } | null;
          throw new Error(data?.details ?? data?.error ?? "Export failed");
        }

        const disposition = response.headers.get("Content-Disposition") ?? "";
        const match = disposition.match(/filename\*=UTF-8''([^;]+)/);
        const fileName = match
          ? decodeURIComponent(match[1])
          : `sections.${toExport.length > 1 ? "zip" : workspace.ext}`;

        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = objectUrl;
        anchor.download = fileName;
        anchor.click();
        URL.revokeObjectURL(objectUrl);
        toast.success(`Downloaded ${fileName}`);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Export failed");
      } finally {
        setBusySectionId(null);
        setExporting(false);
      }
    },
    [workspace],
  );

  const detectSilence = useCallback(async () => {
    if (!workspace) return;
    setDetecting(true);
    try {
      const response = await fetch("/api/dev/audio/silence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: workspace.id }),
      });
      if (!response.ok) throw new Error("Silence detection failed");

      const data = (await response.json()) as {
        sections: Array<{ start: number; end: number }>;
      };
      if (data.sections.length === 0) {
        toast.info("No clear silence boundaries found");
        return;
      }

      setSections(
        data.sections.map((section, index) => ({
          id:
            globalThis.crypto?.randomUUID?.() ??
            `${Date.now()}-${index}-${Math.random()}`,
          name: `Section ${index + 1}`,
          start: section.start,
          end: section.end,
        })),
      );
      setSelectedId(null);
      toast.success(`Found ${data.sections.length} sections`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Detection failed");
    } finally {
      setDetecting(false);
    }
  }, [workspace]);

  if (!workspace) {
    return <SourcePicker onReady={setWorkspace} />;
  }

  const totalSectionSeconds = sections.reduce(
    (sum, section) => sum + (section.end - section.start),
    0,
  );

  return (
    <div className="space-y-4">
      <audio
        ref={audioRef}
        src={`/api/dev/audio/stream?id=${encodeURIComponent(workspace.id)}`}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                audioRef.current?.pause();
                setWorkspace(null);
              }}
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Change source
            </Button>
          </div>
          <h2 className="mt-1 truncate text-lg font-semibold">
            {workspace.title}
          </h2>
          <p className="text-xs text-muted-foreground">
            {formatTime(workspace.duration, false)} ·{" "}
            {formatBytes(workspace.size)} · {workspace.ext} · streamed from disk
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={detectSilence}
            disabled={detecting}
          >
            {detecting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-4 w-4" />
            )}
            Auto-split on silence
          </Button>
          <Button
            size="sm"
            onClick={() => download(sections)}
            disabled={exporting || sections.length === 0}
          >
            {exporting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Package className="mr-2 h-4 w-4" />
            )}
            Download all ({sections.length})
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="flex flex-wrap items-center gap-x-6 gap-y-3 p-3">
          <div className="flex items-center gap-1">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => seek((audioRef.current?.currentTime ?? 0) - 10)}
              title="Back 10s"
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button size="icon" onClick={togglePlay} title="Play/pause (space)">
              {playing ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => seek((audioRef.current?.currentTime ?? 0) + 10)}
              title="Forward 10s"
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          <span className="font-mono text-sm tabular-nums">
            <span ref={timeLabelRef}>0:00.000</span>
            <span className="text-muted-foreground">
              {" / "}
              {formatTime(workspace.duration, false)}
            </span>
          </span>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={markStart}>
              Mark in [
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={markEnd}
              disabled={pendingStart === null}
            >
              <Scissors className="mr-1 h-3.5 w-3.5" />
              Mark out ]
            </Button>
            {pendingStart !== null && (
              <span className="font-mono text-xs text-primary">
                in @ {formatTime(pendingStart)}
              </span>
            )}
          </div>

          <label className="flex items-center gap-2 text-sm">
            <Checkbox
              checked={follow}
              onCheckedChange={(value) => setFollow(value === true)}
            />
            Follow playhead
          </label>

          <label className="flex items-center gap-2 text-sm">
            <Checkbox
              checked={loopSection}
              onCheckedChange={(value) => setLoopSection(value === true)}
            />
            <Repeat className="h-3.5 w-3.5" />
            Loop selection
          </label>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-wrap items-end gap-x-6 gap-y-3 p-3">
          <div className="space-y-1">
            <Label className="text-xs">Seconds per line</Label>
            <Select
              value={String(secondsPerRow)}
              onValueChange={(value) => setSecondsPerRow(Number(value))}
            >
              <SelectTrigger className="h-8 w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ROW_LENGTH_OPTIONS.map((option) => (
                  <SelectItem key={option} value={String(option)}>
                    {option >= 60 ? `${option / 60} min` : `${option} s`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label className="text-xs">Line height</Label>
            <Select
              value={String(rowHeight)}
              onValueChange={(value) => setRowHeight(Number(value))}
            >
              <SelectTrigger className="h-8 w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ROW_HEIGHT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={String(option.value)}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label className="text-xs">Waveform detail</Label>
            <Select
              value={String(detail)}
              onValueChange={(value) => setDetail(Number(value))}
            >
              <SelectTrigger className="h-8 w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DETAIL_OPTIONS.map((option) => (
                  <SelectItem key={option} value={String(option)}>
                    {option} peaks/sec
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-48 space-y-1">
            <Label className="text-xs">Amplitude ×{gain.toFixed(1)}</Label>
            <Slider
              value={[gain]}
              min={0.5}
              max={8}
              step={0.1}
              onValueChange={(value) => setGain(value[0])}
            />
          </div>

          <label className="flex items-center gap-2 pb-1 text-sm">
            <Checkbox
              checked={normalise}
              onCheckedChange={(value) => setNormalise(value === true)}
            />
            Normalise
          </label>

          <p className="ml-auto pb-1 text-xs text-muted-foreground">
            Drag to mark · click to seek · drag edges to adjust
          </p>
        </CardContent>
      </Card>

      <WrappedWaveform
        ref={waveformRef}
        peaks={peaks}
        peaksPerSecond={peakMeta.peaksPerSecond}
        maxAmplitude={peakMeta.maxAmplitude}
        duration={workspace.duration}
        secondsPerRow={secondsPerRow}
        rowHeight={rowHeight}
        gain={gain}
        normalise={normalise}
        height={viewportHeight}
        sections={sections}
        selectedId={selectedId}
        loading={analysing}
        onSeek={seek}
        onSelect={setSelectedId}
        onCreateSection={addSection}
        onResizeSection={resizeSection}
      />

      <Card>
        <CardContent className="p-0">
          <div className="flex items-center justify-between border-b px-3 py-2">
            <h3 className="text-sm font-semibold">
              Sections
              {sections.length > 0 && (
                <span className="ml-2 font-normal text-muted-foreground">
                  {sections.length} · {formatTime(totalSectionSeconds, false)}{" "}
                  total
                </span>
              )}
            </h3>
            {sections.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSections([]);
                  setSelectedId(null);
                }}
              >
                Clear all
              </Button>
            )}
          </div>
          <SectionList
            sections={sections}
            selectedId={selectedId}
            duration={workspace.duration}
            busyId={busySectionId}
            onSelect={setSelectedId}
            onRename={(id, name) =>
              setSections((previous) =>
                previous.map((section) =>
                  section.id === id ? { ...section, name } : section,
                ),
              )
            }
            onRetime={resizeSection}
            onPlay={(id) => {
              const section = sections.find((item) => item.id === id);
              if (!section) return;
              setSelectedId(id);
              seek(section.start);
              waveformRef.current?.scrollToTime(section.start);
              void audioRef.current?.play();
            }}
            onDownload={(id) => {
              const section = sections.find((item) => item.id === id);
              if (section) void download([section], id);
            }}
            onDelete={deleteSection}
          />
        </CardContent>
      </Card>

      <div className="flex items-center gap-2 pb-8 text-xs text-muted-foreground">
        <Download className="h-3.5 w-3.5" />
        Cuts are made server-side with ffmpeg stream copy, so exporting from a
        3-hour source takes about a second per section.
      </div>
    </div>
  );
}
