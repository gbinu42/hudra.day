"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function RecordingEmbed({
  src,
  title,
}: {
  src: string;
  title: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Accordion
      type="single"
      collapsible
      className="not-prose mt-2 overflow-hidden rounded-lg border border-slate-300 bg-white shadow-sm"
      onValueChange={(value) => setOpen(value === "recording")}
    >
      <AccordionItem value="recording" className="border-none">
        <AccordionTrigger className="mx-0 items-center gap-3 rounded-none px-4 py-2.5 hover:bg-slate-50 focus-visible:ring-inset data-[state=open]:bg-primary/5 [&>span:first-child]:hidden">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm shadow-sm"
            aria-hidden
          >
            ▶
          </span>
          <span className="min-w-0 flex-1 font-[family-name:var(--font-lora)]">
            <span className="block text-base font-semibold text-slate-800 group-data-[state=open]/trigger:text-primary">
              Listen to recording
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
                src={src}
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
