"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { getYoutubeEmbedSrc } from "@/lib/youtube";

export default function RecordingEmbed({
  src,
  title,
  className,
}: {
  src: string;
  title: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const embedSrc = getYoutubeEmbedSrc(src) ?? src;

  return (
    <Accordion
      type="single"
      collapsible
      className={cn(
        "not-prose mt-4 overflow-hidden rounded-lg border border-slate-300 bg-white shadow-sm",
        className,
      )}
      onValueChange={(value) => setOpen(value === "recording")}
    >
      <AccordionItem value="recording" className="border-none">
        <AccordionTrigger className="mx-0 items-center gap-3 rounded-none px-4 py-2.5 hover:bg-slate-50 focus-visible:ring-inset data-[state=open]:bg-primary/5 [&>span:first-child]:hidden">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
            aria-hidden
          >
            <Play className="h-4 w-4 fill-current stroke-none translate-x-px" />
          </span>
          <span className="min-w-0 flex-1 font-[family-name:var(--font-lora)]">
            <span className="block text-base font-semibold text-slate-800 group-data-[state=open]/trigger:text-primary">
              Play
            </span>
            <span className="block truncate text-sm font-normal text-slate-500">
              {title}
            </span>
          </span>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          {open && (
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full rounded-lg border border-slate-200"
                src={embedSrc}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
