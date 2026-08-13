"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { AudioSection } from "@/lib/dev/audio-sections-types";
import { formatTime } from "@/lib/dev/format-time";

/**
 * Renders a long recording as wrapped rows of waveform, like lines of text.
 *
 * Three things keep this usable on 3h+ material:
 *  - peaks are precomputed server-side, so nothing is decoded in the browser;
 *  - only the rows inside the viewport get a canvas (windowed rendering);
 *  - the playhead is moved imperatively, so playback never re-renders React.
 */

const TICK_BAND = 16;
const MIN_TICK_SPACING = 64;
const TICK_STEPS = [
  0.5, 1, 2, 5, 10, 15, 30, 60, 120, 300, 600, 900, 1800, 3600,
];
const EDGE_GRAB_PX = 7;
const DRAG_THRESHOLD_PX = 4;
const OVERSCAN_ROWS = 3;

export interface WaveformHandle {
  setTime: (time: number) => void;
  scrollToTime: (time: number) => void;
}

interface DragState {
  mode: "create" | "resize-start" | "resize-end";
  sectionId?: string;
  anchor: number;
  current: number;
  moved: boolean;
}

interface WrappedWaveformProps {
  peaks: Int16Array | null;
  peaksPerSecond: number;
  maxAmplitude: number;
  duration: number;
  secondsPerRow: number;
  rowHeight: number;
  gain: number;
  normalise: boolean;
  height: number;
  sections: AudioSection[];
  selectedId: string | null;
  loading?: boolean;
  onSeek: (time: number) => void;
  onSelect: (id: string | null) => void;
  onCreateSection: (start: number, end: number) => void;
  onResizeSection: (id: string, start: number, end: number) => void;
}

function pickTickInterval(pxPerSecond: number): number {
  for (const step of TICK_STEPS) {
    if (step * pxPerSecond >= MIN_TICK_SPACING) return step;
  }
  return TICK_STEPS[TICK_STEPS.length - 1];
}

export const WrappedWaveform = forwardRef<WaveformHandle, WrappedWaveformProps>(
  function WrappedWaveform(
    {
      peaks,
      peaksPerSecond,
      maxAmplitude,
      duration,
      secondsPerRow,
      rowHeight,
      gain,
      normalise,
      height,
      sections,
      selectedId,
      loading,
      onSeek,
      onSelect,
      onCreateSection,
      onResizeSection,
    },
    ref,
  ) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const playheadRef = useRef<HTMLDivElement>(null);
    const dragRef = useRef<DragState | null>(null);
    const pointerStartRef = useRef<{ x: number; y: number } | null>(null);

    const [width, setWidth] = useState(0);
    const [scrollTop, setScrollTop] = useState(0);
    const [draft, setDraft] = useState<{ start: number; end: number } | null>(
      null,
    );

    const rowCount = Math.max(1, Math.ceil(duration / secondsPerRow));
    const waveHeight = rowHeight - TICK_BAND;
    const pxPerSecond = width > 0 ? width / secondsPerRow : 0;
    const totalPeaks = peaks ? peaks.length / 2 : 0;

    const amplitudeScale = useMemo(() => {
      const reference = normalise && maxAmplitude > 0 ? maxAmplitude : 32768;
      return gain / reference;
    }, [gain, maxAmplitude, normalise]);

    useLayoutEffect(() => {
      const element = scrollRef.current;
      if (!element) return;
      const observer = new ResizeObserver((entries) => {
        setWidth(entries[0].contentRect.width);
      });
      observer.observe(element);
      setWidth(element.clientWidth);
      return () => observer.disconnect();
    }, []);

    const timeAtPointer = useCallback(
      (clientX: number, clientY: number): number => {
        const element = scrollRef.current;
        if (!element || width === 0) return 0;
        const rect = element.getBoundingClientRect();
        const y = clientY - rect.top + element.scrollTop;
        const x = clientX - rect.left;
        const row = Math.min(rowCount - 1, Math.max(0, Math.floor(y / rowHeight)));
        const ratio = Math.min(1, Math.max(0, x / width));
        return Math.min(duration, Math.max(0, (row + ratio) * secondsPerRow));
      },
      [duration, rowCount, rowHeight, secondsPerRow, width],
    );

    useImperativeHandle(
      ref,
      () => ({
        setTime(time: number) {
          const node = playheadRef.current;
          if (!node || width === 0) return;
          const clamped = Math.min(duration, Math.max(0, time));
          const row = Math.min(rowCount - 1, Math.floor(clamped / secondsPerRow));
          const x = ((clamped - row * secondsPerRow) / secondsPerRow) * width;
          node.style.transform = `translate3d(${x}px, ${row * rowHeight}px, 0)`;
        },
        scrollToTime(time: number) {
          const element = scrollRef.current;
          if (!element) return;
          const row = Math.floor(time / secondsPerRow);
          const target = row * rowHeight;
          const viewTop = element.scrollTop;
          const viewBottom = viewTop + element.clientHeight;
          if (target < viewTop || target + rowHeight > viewBottom) {
            element.scrollTop = Math.max(
              0,
              target - element.clientHeight / 2 + rowHeight / 2,
            );
          }
        },
      }),
      [duration, rowCount, rowHeight, secondsPerRow, width],
    );

    const visibleRange = useMemo(() => {
      const viewportHeight = height;
      const first = Math.max(
        0,
        Math.floor(scrollTop / rowHeight) - OVERSCAN_ROWS,
      );
      const last = Math.min(
        rowCount - 1,
        Math.ceil((scrollTop + viewportHeight) / rowHeight) + OVERSCAN_ROWS,
      );
      return { first, last };
    }, [height, rowCount, rowHeight, scrollTop]);

    const handlePointerDown = useCallback(
      (event: React.PointerEvent<HTMLDivElement>) => {
        if (event.button !== 0 || width === 0) return;
        const time = timeAtPointer(event.clientX, event.clientY);
        const grabSeconds = pxPerSecond > 0 ? EDGE_GRAB_PX / pxPerSecond : 0;

        let state: DragState = {
          mode: "create",
          anchor: time,
          current: time,
          moved: false,
        };

        // Grabbing near a boundary resizes instead of starting a new section.
        for (const section of sections) {
          if (Math.abs(section.start - time) <= grabSeconds) {
            state = {
              mode: "resize-start",
              sectionId: section.id,
              anchor: section.end,
              current: section.start,
              moved: false,
            };
            break;
          }
          if (Math.abs(section.end - time) <= grabSeconds) {
            state = {
              mode: "resize-end",
              sectionId: section.id,
              anchor: section.start,
              current: section.end,
              moved: false,
            };
            break;
          }
        }

        dragRef.current = state;
        pointerStartRef.current = { x: event.clientX, y: event.clientY };
        try {
          event.currentTarget.setPointerCapture(event.pointerId);
        } catch {
          // Capture is an optimisation; dragging still works without it.
        }
      },
      [pxPerSecond, sections, timeAtPointer, width],
    );

    const handlePointerMove = useCallback(
      (event: React.PointerEvent<HTMLDivElement>) => {
        const state = dragRef.current;
        const origin = pointerStartRef.current;
        if (!state || !origin) return;

        if (!state.moved) {
          const dx = Math.abs(event.clientX - origin.x);
          const dy = Math.abs(event.clientY - origin.y);
          if (dx < DRAG_THRESHOLD_PX && dy < DRAG_THRESHOLD_PX) return;
          state.moved = true;
        }

        state.current = timeAtPointer(event.clientX, event.clientY);
        const start = Math.min(state.anchor, state.current);
        const end = Math.max(state.anchor, state.current);

        if (state.mode === "create") {
          setDraft({ start, end });
        } else if (state.sectionId) {
          onResizeSection(state.sectionId, start, end);
        }
      },
      [onResizeSection, timeAtPointer],
    );

    const endDrag = useCallback(
      (event: React.PointerEvent<HTMLDivElement>) => {
        const state = dragRef.current;
        dragRef.current = null;
        pointerStartRef.current = null;
        try {
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }
        } catch {
          // Nothing to release.
        }
        if (!state) return;

        if (!state.moved) {
          const time = state.anchor;
          const hit = sections.find(
            (section) => time >= section.start && time <= section.end,
          );
          onSelect(hit ? hit.id : null);
          onSeek(time);
          setDraft(null);
          return;
        }

        if (state.mode === "create") {
          const start = Math.min(state.anchor, state.current);
          const end = Math.max(state.anchor, state.current);
          if (end - start > 0.05) onCreateSection(start, end);
        }
        setDraft(null);
      },
      [onCreateSection, onSeek, onSelect, sections],
    );

    const rows = [];
    for (let row = visibleRange.first; row <= visibleRange.last; row += 1) {
      rows.push(row);
    }

    return (
      <div
        ref={scrollRef}
        className="relative w-full select-none overflow-y-auto overscroll-contain rounded-md border bg-white"
        style={{ height }}
        onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div
          className="relative"
          style={{ height: rowCount * rowHeight, cursor: "text" }}
        >
          {width > 0 &&
            rows.map((row) => (
              <WaveformRow
                key={row}
                row={row}
                width={width}
                rowHeight={rowHeight}
                waveHeight={waveHeight}
                secondsPerRow={secondsPerRow}
                duration={duration}
                peaks={peaks}
                totalPeaks={totalPeaks}
                peaksPerSecond={peaksPerSecond}
                amplitudeScale={amplitudeScale}
                pxPerSecond={pxPerSecond}
                sections={sections}
                selectedId={selectedId}
                draft={draft}
              />
            ))}

          <div
            ref={playheadRef}
            className="pointer-events-none absolute left-0 top-0 z-20 w-0.5 bg-red-600"
            style={{ height: rowHeight, willChange: "transform" }}
          >
            <div className="absolute -left-[3px] top-0 h-2 w-2 rounded-full bg-red-600" />
          </div>
        </div>

        {loading && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-white/70 text-sm text-muted-foreground">
            Analysing waveform…
          </div>
        )}
      </div>
    );
  },
);

interface WaveformRowProps {
  row: number;
  width: number;
  rowHeight: number;
  waveHeight: number;
  secondsPerRow: number;
  duration: number;
  peaks: Int16Array | null;
  totalPeaks: number;
  peaksPerSecond: number;
  amplitudeScale: number;
  pxPerSecond: number;
  sections: AudioSection[];
  selectedId: string | null;
  draft: { start: number; end: number } | null;
}

function WaveformRow({
  row,
  width,
  rowHeight,
  waveHeight,
  secondsPerRow,
  duration,
  peaks,
  totalPeaks,
  peaksPerSecond,
  amplitudeScale,
  pxPerSecond,
  sections,
  selectedId,
  draft,
}: WaveformRowProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rowStart = row * secondsPerRow;
  const rowEnd = Math.min(duration, rowStart + secondsPerRow);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || width === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const cssWidth = Math.floor(width);
    const cssHeight = rowHeight;

    if (canvas.width !== cssWidth * dpr || canvas.height !== cssHeight * dpr) {
      canvas.width = Math.floor(cssWidth * dpr);
      canvas.height = Math.floor(cssHeight * dpr);
    }

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, cssWidth, cssHeight);

    // Time ruler
    const tickInterval = pickTickInterval(pxPerSecond);
    ctx.fillStyle = "#94a3b8";
    ctx.font = "10px ui-sans-serif, system-ui, sans-serif";
    ctx.textBaseline = "top";

    const firstTick = Math.ceil(rowStart / tickInterval) * tickInterval;
    for (let t = firstTick; t < rowEnd; t += tickInterval) {
      const x = Math.round((t - rowStart) * pxPerSecond);
      ctx.fillStyle = "#e2e8f0";
      ctx.fillRect(x, TICK_BAND - 4, 1, cssHeight - TICK_BAND + 4);
      ctx.fillStyle = "#94a3b8";
      ctx.fillText(formatTime(t, false), x + 3, 2);
    }

    const centerY = TICK_BAND + waveHeight / 2;
    ctx.fillStyle = "#e2e8f0";
    ctx.fillRect(0, Math.round(centerY), cssWidth, 1);

    if (!peaks || totalPeaks === 0 || pxPerSecond === 0) return;

    const half = waveHeight / 2 - 1;
    const peaksPerPixel = peaksPerSecond / pxPerSecond;
    const startPeak = rowStart * peaksPerSecond;
    const usableWidth = Math.ceil((rowEnd - rowStart) * pxPerSecond);

    ctx.fillStyle = "#8A1538";

    for (let x = 0; x < usableWidth; x += 1) {
      let from = Math.floor(startPeak + x * peaksPerPixel);
      let to = Math.floor(startPeak + (x + 1) * peaksPerPixel);
      if (to <= from) to = from + 1;
      if (from >= totalPeaks) break;
      if (from < 0) from = 0;
      if (to > totalPeaks) to = totalPeaks;

      let min = 0;
      let max = 0;
      for (let p = from; p < to; p += 1) {
        const lo = peaks[p * 2];
        const hi = peaks[p * 2 + 1];
        if (lo < min) min = lo;
        if (hi > max) max = hi;
      }

      let top = centerY - Math.min(1, max * amplitudeScale) * half;
      let bottom = centerY - Math.max(-1, min * amplitudeScale) * half;
      if (bottom - top < 1) {
        top = centerY - 0.5;
        bottom = centerY + 0.5;
      }
      ctx.fillRect(x, top, 1, bottom - top);
    }
  }, [
    amplitudeScale,
    peaks,
    peaksPerSecond,
    pxPerSecond,
    rowEnd,
    rowHeight,
    rowStart,
    totalPeaks,
    waveHeight,
    width,
  ]);

  const overlays = useMemo(() => {
    const items: Array<{
      key: string;
      left: number;
      widthPct: number;
      selected: boolean;
      label?: string;
      showStart: boolean;
      showEnd: boolean;
      draft?: boolean;
    }> = [];

    const addOverlay = (
      key: string,
      start: number,
      end: number,
      selected: boolean,
      label?: string,
      isDraft?: boolean,
    ) => {
      if (end <= rowStart || start >= rowEnd) return;
      const clampedStart = Math.max(start, rowStart);
      const clampedEnd = Math.min(end, rowEnd);
      items.push({
        key,
        left: ((clampedStart - rowStart) / secondsPerRow) * 100,
        widthPct: ((clampedEnd - clampedStart) / secondsPerRow) * 100,
        selected,
        label: start >= rowStart ? label : undefined,
        showStart: start >= rowStart && start < rowEnd,
        showEnd: end > rowStart && end <= rowEnd,
        draft: isDraft,
      });
    };

    for (const section of sections) {
      addOverlay(
        section.id,
        section.start,
        section.end,
        section.id === selectedId,
        section.name,
      );
    }
    if (draft) {
      addOverlay("__draft", draft.start, draft.end, true, undefined, true);
    }
    return items;
  }, [draft, rowEnd, rowStart, sections, secondsPerRow, selectedId]);

  return (
    <div
      className="absolute left-0 right-0 border-b border-slate-100"
      style={{ top: row * rowHeight, height: rowHeight }}
    >
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
        style={{ width: "100%", height: rowHeight }}
      />
      {overlays.map((overlay) => (
        <div
          key={overlay.key}
          className={`pointer-events-none absolute ${
            overlay.draft
              ? "border-x border-dashed border-primary bg-primary/20"
              : overlay.selected
                ? "border-x-2 border-amber-500 bg-amber-400/25"
                : "border-x border-emerald-500/70 bg-emerald-400/15"
          }`}
          style={{
            left: `${overlay.left}%`,
            width: `${overlay.widthPct}%`,
            top: TICK_BAND,
            height: rowHeight - TICK_BAND,
          }}
        >
          {overlay.label && (
            <span className="absolute left-1 top-0 max-w-full truncate text-[10px] font-medium text-emerald-900">
              {overlay.label}
            </span>
          )}
          {overlay.showStart && (
            <span className="pointer-events-auto absolute -left-1 top-0 h-full w-2 cursor-ew-resize" />
          )}
          {overlay.showEnd && (
            <span className="pointer-events-auto absolute -right-1 top-0 h-full w-2 cursor-ew-resize" />
          )}
        </div>
      ))}
    </div>
  );
}
