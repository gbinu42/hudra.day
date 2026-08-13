"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Play, Trash2 } from "lucide-react";
import type { AudioSection } from "@/lib/dev/audio-sections-types";
import { formatTime, parseTime } from "@/lib/dev/format-time";

interface SectionListProps {
  sections: AudioSection[];
  selectedId: string | null;
  duration: number;
  busyId: string | null;
  onSelect: (id: string) => void;
  onRename: (id: string, name: string) => void;
  onRetime: (id: string, start: number, end: number) => void;
  onPlay: (id: string) => void;
  onDownload: (id: string) => void;
  onDelete: (id: string) => void;
}

export function SectionList({
  sections,
  selectedId,
  duration,
  busyId,
  onSelect,
  onRename,
  onRetime,
  onPlay,
  onDownload,
  onDelete,
}: SectionListProps) {
  if (sections.length === 0) {
    return (
      <p className="px-1 py-6 text-center text-sm text-muted-foreground">
        No sections yet. Drag across the waveform, or press{" "}
        <kbd className="rounded border px-1">[</kbd> and{" "}
        <kbd className="rounded border px-1">]</kbd> while playing.
      </p>
    );
  }

  return (
    <div className="divide-y">
      {sections.map((section, index) => (
        <SectionRow
          key={section.id}
          index={index}
          section={section}
          duration={duration}
          selected={section.id === selectedId}
          busy={busyId === section.id}
          onSelect={onSelect}
          onRename={onRename}
          onRetime={onRetime}
          onPlay={onPlay}
          onDownload={onDownload}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

interface SectionRowProps {
  index: number;
  section: AudioSection;
  duration: number;
  selected: boolean;
  busy: boolean;
  onSelect: (id: string) => void;
  onRename: (id: string, name: string) => void;
  onRetime: (id: string, start: number, end: number) => void;
  onPlay: (id: string) => void;
  onDownload: (id: string) => void;
  onDelete: (id: string) => void;
}

function SectionRow({
  index,
  section,
  duration,
  selected,
  busy,
  onSelect,
  onRename,
  onRetime,
  onPlay,
  onDownload,
  onDelete,
}: SectionRowProps) {
  const [startText, setStartText] = useState(() => formatTime(section.start));
  const [endText, setEndText] = useState(() => formatTime(section.end));

  // Dragging a boundary on the waveform must be reflected in the inputs.
  useEffect(() => setStartText(formatTime(section.start)), [section.start]);
  useEffect(() => setEndText(formatTime(section.end)), [section.end]);

  const commitStart = () => {
    const parsed = parseTime(startText);
    if (parsed === null || parsed >= section.end) {
      setStartText(formatTime(section.start));
      return;
    }
    onRetime(section.id, Math.max(0, parsed), section.end);
  };

  const commitEnd = () => {
    const parsed = parseTime(endText);
    if (parsed === null || parsed <= section.start) {
      setEndText(formatTime(section.end));
      return;
    }
    onRetime(section.id, section.start, Math.min(duration, parsed));
  };

  return (
    <div
      className={`flex flex-wrap items-center gap-2 px-2 py-2 text-sm ${
        selected ? "bg-amber-50" : "hover:bg-slate-50"
      }`}
      onClick={() => onSelect(section.id)}
    >
      <span className="w-6 shrink-0 text-xs text-muted-foreground">
        {index + 1}
      </span>

      <Input
        value={section.name}
        onChange={(event) => onRename(section.id, event.target.value)}
        className="h-8 min-w-[8rem] flex-1"
        aria-label={`Name of section ${index + 1}`}
      />

      <Input
        value={startText}
        onChange={(event) => setStartText(event.target.value)}
        onBlur={commitStart}
        onKeyDown={(event) => event.key === "Enter" && commitStart()}
        className="h-8 w-[7.5rem] font-mono text-xs"
        aria-label={`Start of section ${index + 1}`}
      />
      <Input
        value={endText}
        onChange={(event) => setEndText(event.target.value)}
        onBlur={commitEnd}
        onKeyDown={(event) => event.key === "Enter" && commitEnd()}
        className="h-8 w-[7.5rem] font-mono text-xs"
        aria-label={`End of section ${index + 1}`}
      />

      <span className="w-16 shrink-0 text-right font-mono text-xs text-muted-foreground">
        {formatTime(section.end - section.start, false)}
      </span>

      <div className="flex shrink-0 items-center gap-1">
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="h-8 w-8"
          onClick={() => onPlay(section.id)}
          title="Play section"
        >
          <Play className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="h-8 w-8"
          disabled={busy}
          onClick={() => onDownload(section.id)}
          title="Download section"
        >
          <Download className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="h-8 w-8 text-destructive"
          onClick={() => onDelete(section.id)}
          title="Delete section"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
