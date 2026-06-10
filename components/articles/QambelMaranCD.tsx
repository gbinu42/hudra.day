"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CMS_ENCYCLOPEDIA_BASE =
  "https://thecmsindia.org/encyclopedia-of-syriac-chants";

/** CMS India encyclopedia and Hudra hymn page links keyed by CD track number. */
const HYMN_RESOURCE_LINKS: Record<
  number,
  { cmsPath: string; hudraSlug?: string }
> = {
  1: {
    cmsPath: "a/awun-dwasmayya-our-father-in-heaven",
    hudraSlug: "awun-dwashmayya",
  },
  2: { cmsPath: "h/hallel-hallel-praise-praise" },
  3: {
    cmsPath: "i/iso-maran-m-siha-lord-jesus-christ",
    hudraSlug: "isho-maran-mshiha",
  },
  4: {
    cmsPath: "m/marya-kolhon-hawbay-lord-all-my-faults",
    hudraSlug: "marya-kolhon-hawbay",
  },
  5: {
    cmsPath: "b/bendan-sapra-in-the-morning",
    hudraSlug: "bendan-sapra-nawde",
  },
  6: {
    cmsPath: "e/esthappanos-stephen",
    hudraSlug: "esthapanos-urha-drash",
  },
  7: {
    cmsPath: "b/brik-hannana-blessed-is-the-merciful-one",
    hudraSlug: "brikh-hannana",
  },
  8: { cmsPath: "e/etpan-al-slota-turn-to-the-prayer" },
  9: { cmsPath: "t/taw-n-yaqar-come-let-us-honor" },
  10: {
    cmsPath: "s/sliwa-dahwa-lan-the-cross-that-became-for-us",
    hudraSlug: "sliwa-dahwa-lan",
  },
  11: {
    cmsPath: "o/o-desdamman-turgama-for-epistle",
    hudraSlug: "o-dezdamman",
  },
  12: {
    cmsPath: "k/k-tawa-ramba-dawrek-sawe",
    hudraSlug: "kthawa-ramba",
  },
  13: {
    cmsPath: "s/slam-lek-maryam-hail-to-you-mary",
    hudraSlug: "shlam-lekh-maryam",
  },
  14: {
    cmsPath: "q/qambel-maran-receive-o-our-lord",
    hudraSlug: "qambel-maran",
  },
  15: {
    cmsPath: "l/la-tekre-lak-dont-be-sorry",
    hudraSlug: "la-tekre-lakh",
  },
  16: { cmsPath: "l/layka-ezal-min-ruhak-res-qala" },
  17: {
    cmsPath: "b/bhad-min-yawmin-on-one-of-the-days",
    hudraSlug: "bhad-min-yawmin",
  },
  18: {
    cmsPath: "e/etha-pus-lek-farewell-o-church",
    hudraSlug: "eta-push-lekh",
  },
  19: { cmsPath: "q/quryelaison-lord-have-mercy" },
  20: { cmsPath: "h/ha-qes-sliwa-behold-the-wood-of-the-cross" },
  21: { cmsPath: "s/sambah-lesan-praise-my-tongue" },
  22: { cmsPath: "k/kollan-dasne-let-us-all-offer" },
  23: {
    cmsPath: "t/ta-lak-ruha-come-o-spirit",
    hudraSlug: "ta-lakh-ruha",
  },
  24: { cmsPath: "s/slam-lek-maryam-huthamma" },
  25: { cmsPath: "b/bar-maryam-son-of-mary" },
  26: {
    cmsPath: "l/lak-mar-yawsep-you-st-joseph",
    hudraSlug: "lakh-mar-yawsep",
  },
  27: {
    cmsPath: "s/sambah-l-marya-praise-the-lord",
    hudraSlug: "shambah-lmarya-teshbohta-hdata",
  },
  28: {
    cmsPath: "h/had-min-ire-one-from-the-angels",
    hudraSlug: "had-min-ire",
  },
  29: {
    cmsPath: "b/b-eda-d-yawman-on-this-festival-day",
    hudraSlug: "beda-dyawman",
  },
};

/** Titles from the corresponding YouTube videos (Qambel Maran CD recordings). */
const YOUTUBE_TITLES: Record<string, string> = {
  ARCxp_3J67g: "Awun D’wasmayya (Our Father in Heaven)",
  oHd2aH9qOYc: "Hallel Hallel (Praise, Praise)",
  OuEwf2kcZfs: "Iso Maran M’siha (Lord Jesus Christ)",
  oyhRWnSbYYY: "Marya Kolhon Hawbai (Lord, All My Faults)",
  wNjBYWahg9M: "B’endan Sapra (In the Morning)",
  "O3rPM3e5H-A": "Esthappanos (Stephen)",
  _QrOsr_x33g: "Brik Hannana (Blessed Is The Merciful One)",
  TIpIBzqZ03Q: "Etpan Al Slota (Turn to the Prayer)",
  YcMrJULLpu8: "Tow N'yaqar (Come Let Us Honor)",
  "0dHoZ5OhA8I": "Sliwa Dahwa Lan (The Cross That Became For Us)",
  QFHTJtcy5O0: "O Dezdamman Inja (O You Who Are Invited)",
  xLMmQNVpk4I: "K’tawa Ramba (The Great Book)",
  PVVuXMCpkJM: "Slam Lek Maryam (Hail Mary)",
  "5oRrn-RbcY4": "Qambel Maran (Receive O! Our Lord)",
  rdnaCf7XeJw: "La Tekre Lak (Don’t Be Sorry)",
  "3XiChppYhJM": "Laika Ezal Min Ruhak (Where Shall I Go From Your Spirit?)",
  KEWj2kWGRdg: "B’had Min Yawmin (On One of the Days)",
  KYsqpjlf0Mk: "Etta Pu Lek (Farewell, O Church)",
  "3CWBRgP7xO8": "Quryelaison (Lord Have Mercy)",
  nyJwbknChmM: "Ha Qes Sliwa (Behold the Wood of the Cross)",
  QJ12LUdj3mc: "Sanbah Lesan (Praise My Tongue)",
  jEqfppJt7AY: "Kollan Dasne (Let Us All Offer)",
  xkOvMznM_iM: "Ta Lak Ruha (Come, O Spirit)",
  "SVV-ZksRTHU": "Slam lLek (Hail to You)",
  Mm5P6g1KaE0: "Bar Maryam (Son of Mary)",
  i9Ft1iw58SM: "Lak Mar Yawsp (You, St. Joseph)",
  "-Y6O3rQmj1o": "Sanbah L’marya (Praise the Lord)",
  "-UYk5og0FBI": "Hadmin Ire (One from the Angels)",
  Ekz56gX_bkQ: "B’eda D’yawman (On This Festival Day)",
};

function getYoutubeTitle(embedSrc: string): string | undefined {
  const match = embedSrc.match(/embed\/([^?&]+)/);
  if (!match) return undefined;
  return YOUTUBE_TITLES[match[1]];
}

interface Segment {
  text: string;
  color?: "red";
  role?: boolean;
}

type Block = { segments: Segment[] } | { skipped: string };

interface Hymn {
  num: number;
  title: string;
  blocks: Block[];
  footnotes: string[];
  youtubeEmbedSrc?: string;
}

function HymnResourceLinks({ num }: { num: number }) {
  const links = HYMN_RESOURCE_LINKS[num];
  if (!links) return null;

  return (
    <div className="not-prose mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm font-[family-name:var(--font-lora)]">
      <a
        href={`${CMS_ENCYCLOPEDIA_BASE}/${links.cmsPath}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline underline-offset-2 hover:text-primary/80"
      >
        Encyclopedia entry (CMS India)
      </a>
      {links.hudraSlug && (
        <Link
          href={`/hymns/${links.hudraSlug}`}
          className="text-primary underline underline-offset-2 hover:text-primary/80"
        >
          View on Hudra
        </Link>
      )}
    </div>
  );
}

function RecordingEmbed({ src, title }: { src: string; title: string }) {
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

function segmentClass(color?: Segment["color"]): string {
  if (color === "red") return "text-red-700";
  return "text-slate-800";
}

function formatSkippedNote(text: string): string {
  const normalized = text.trim().replace(/^\[+/, "[").replace(/\]+$/, "");
  if (/remaining verses (?:skipped|omitted)/i.test(normalized)) {
    return "[remaining verses omitted]";
  }
  if (/verses (?:skipped|omitted)/i.test(normalized)) {
    return "[verses omitted]";
  }
  return text.trim();
}

function FootnoteItem({ text }: { text: string }) {
  return (
    <p
      dir="auto"
      className="text-sm text-slate-600 leading-relaxed m-0"
      style={{
        fontFamily: "var(--font-lora), 'Idiqlat', serif",
        fontWeight: 400,
        fontSynthesis: "none",
      }}
    >
      {text}
    </p>
  );
}

function SyriacBlock({
  segments,
  groups,
}: {
  segments?: Segment[];
  groups?: Segment[][];
}) {
  const segmentGroups = groups ?? (segments ? [segments] : []);
  return (
    <p
      className="leading-loose [font-family:'Idiqlat',serif] text-base text-justify m-0"
      dir="rtl"
      style={{ fontWeight: 400, fontSynthesis: "none" }}
    >
      {segmentGroups.map((group, gi) => (
        <Fragment key={gi}>
          {gi > 0 && <br />}
          {group.map((seg, i) => {
            const needsBreak = i > 0 && seg.role;
            return (
              <Fragment key={i}>
                {needsBreak && <br />}
                <span className={segmentClass(seg.color)}>{seg.text}</span>
              </Fragment>
            );
          })}
        </Fragment>
      ))}
    </p>
  );
}

const LINE_BREAK_HYMNS = new Set([1, 3, 7, 8, 15, 20, 21, 23, 26, 29]);

function SkippedNote({ text }: { text: string }) {
  return (
    <p
      dir="ltr"
      className="text-sm italic text-muted-foreground m-0 text-right font-[family-name:var(--font-lora)]"
    >
      {formatSkippedNote(text)}
    </p>
  );
}

function HymnBlocks({ hymn }: { hymn: Hymn }) {
  if (!LINE_BREAK_HYMNS.has(hymn.num)) {
    return hymn.blocks.map((block, i) =>
      "skipped" in block ? (
        <SkippedNote key={i} text={block.skipped} />
      ) : (
        <SyriacBlock key={i} segments={block.segments} />
      ),
    );
  }

  const items: React.ReactNode[] = [];
  let segmentGroups: Segment[][] = [];

  const flushSyriac = () => {
    if (segmentGroups.length === 0) return;
    items.push(<SyriacBlock key={items.length} groups={segmentGroups} />);
    segmentGroups = [];
  };

  for (const block of hymn.blocks) {
    if ("skipped" in block) {
      flushSyriac();
      items.push(<SkippedNote key={items.length} text={block.skipped} />);
    } else {
      segmentGroups.push(block.segments);
    }
  }
  flushSyriac();

  return items;
}

const HYMNS: Hymn[] = [
  {
    num: 1,
    title: "Awun d’washmayya",
    blocks: [
      {
        segments: [
          { text: "ܟܵܗܢܵܐ ܘܡܫܲܡܫܵܢܵܘ̈ܗܝ: ", color: "red" },
          {
            text: "ܘܥܲܠ ܐܲܪܥܵܐ ܫܠܵܡܵܐ ܘܣܲܒ݂ܪܵܐ ܛܵܒ݂ܵܐ ܠܲܒ݂ܢܲܝܢܵܫܵܐ ܒܟ݂ܠ ܥܸܕܵܢ ܠܥܵܠܡܝܼܢ ܐܵܡܹܝܢ. ܐܲܒ݂ܘܼܢ ܕܒܲܫܡܲܝܵܐ!",
          },
        ],
      },
      {
        segments: [
          { text: "ܥܵܢܹܝܢ:", color: "red", role: true },
          { text: " ", color: "red" },
          { text: "ܢܸـܬ݂ܩܲܕܲܫ ܫܡܵـܟ݂ ܬܹܐܬܸܐ ܡܲܠܟܘܼܬ݂ܵܟ݂: " },
          {
            text: "ܩܲܕܝܼܫ ܩܲܕܝܼܫ ܩܲܕܝܼܫܲܬ ܐܲܒ݂ܘܼܢ ܕܒ݂ܲܫܡܲܝܵܐ!",
          },
        ],
      },
      {
        segments: [
          { text: "ܟܵܗܢܵܐ ܘܡܫܲܡܫܵܢܵܘ̈ܗܝ: ", color: "red" },
          {
            text: "ܕܲܡܠܹܝܢ ܫܡܲܝܵܐ ܘܐܲܪܥܵܐ ܪܲܒ݁ܘܼܬ݂ ܫܘܼܒ݂ܚܵـܟ݂ ܥܝܼـܪܹ̈ܐ ܘܐ݇ܢܵܫܵܐ ܩܵܥܹܝܢ ܠܵـܟ݂ ܩܲܕܝܼܫ ܩܲܕܝܼܫ ܩܲܕܝܼܫܲܬ ",
          },
          { text: "ܐܲܒ݂ܘܼܢ ܕܒܲܫܡܲܝܵܐ!" },
        ],
      },
      {
        segments: [
          { text: "ܥܵܢܹܝܢ:", color: "red", role: true },
          { text: " ", color: "red" },
          {
            text: "ܢܸـܬ݂ܩܲܕܲܫ ܫܡܵـܟ݂ ܬܹܐܬܸܐ ܡܲܠܟܘܼܬ݂ܵܟ݂: ܢܸܗܘܸܐ ܨܸܒ݂ܝܵـܢܵـܟ݂ ܐܲܝܟܲـܢܵܐ ܕܒܲܫܡܲܝܵܐ ܐܵܦ ܒܐܲܪܥܵܐ: ܗܲܒ݂ ܠܲܢ ܠܲܚܡܵܐ ܕܣܘܼܢܩܵܢܲܢ ܝܵܘܡܵܢܵܐ ܘܲܫܒ݂ܘܿܩ ܠܲܢ.",
          },
        ],
      },
      {
        segments: [
          { text: "ܟܵܗܢܵܐ ܘܡܫܲܡܫܵܢܵܘ̈ܗܝ: ", color: "red" },
          {
            text: "ܚܵܘ̈ܒܲܝܢ ܘܲܚܛܵܗܲܝ̈ܢ: ܐܲܝܟܲܢܵܐ ܕܐܵܦ ܚܢܲܢ ܫܒܲܩܢ ܠܚܲܝܵـܒܲܝ̈ܢ: ܘܠܵܐ ܬܲܥܠܲܢ ܠܢܸܣܝܘܿܢܵܐ ܐܸܠܵܐ ܦܲـܨܵܢ ܡ̣ܢ ܒܝܼܫܵܐ: ܡܸܛܠ ܕܕ݂ܝܼܠܵܟ݂ ܗ݇ܝܼ ܡܲܠܟܘܼܬ݂ܵܐ ܘܚܲܝܠܵܐ ܘܬܸܫܒܘܿܚܬܵܐ ܠܥܵܠܲܡ ܥܵܠܡܝܼܢ ܐܵܡܹܝܢ.",
          },
        ],
      },
      {
        segments: [
          { text: "ܟܵܗܢܵܐ:", color: "red", role: true },
          { text: " ܫܘܼܒ݂ܚܵܐ ܠܐܲܒ݂ܵܐ ܘܠܲܒ݂ܪܵܐ ܘܲܠܪܘܼܚܵܐ ܕܩܘܼܕ݂ܫܵܐ." },
          { text: "ܥܵܢܹܝܢ:", color: "red", role: true },
          {
            text: " ܡ̣ܢ ܥܵܠܲܡ ܘܲܥܕܲܡܵܐ ܠܥܵܠܲܡ ܐܵܡܹܝܢ ܘܐܵܡܹܝܢ. ܐܲܒ݂ܘܼܢ ܕܒ݂ܲܫܡܲܝܵܐ! ",
          },
        ],
      },
      {
        segments: [
          { text: "ܟܵܗܢܵܐ ܘܡܫܲܡܫܵܢܵܘ̈ܗܝ: ", color: "red" },
          { text: "ܢܸـܬ݂ܩܲܕܲܫ ܫܡܵـܟ݂ ܬܹܐܬܸܐ ܡܲܠܟܘܼܬ݂ܵܟ݂ " },
          {
            text: "ܩܲܕܝܼܫ ܩܲܕܝܼܫ ܩܲܕܝܼܫܲܬ ܐܲܒ݂ܘܼܢ ܕܒ݂ܲܫܡܲܝܵܐ! ",
          },
        ],
      },
      {
        segments: [
          { text: "ܥܵܢܹܝܢ", color: "red" },
          {
            text: ": ܕܲܡܠܹܝܢ ܫܡܲܝܵܐ ܘܐܲܪܥܵܐ ܪܲܒܘܼܬ݂ ܫܘܼܒ݂ܚܵـܟ݂ ܥܝܼـܪܹ̈ܐ ܘܐ݇ܢܵܫܵܐ ܩܵܥܹܝܢ ܠܵـܟ݂ ܩܲܕܝܼܫ ܩܲܕܝܼܫ ܩܲܕܝܼܫܲܬ. ",
          },
        ],
      },
      {
        segments: [
          { text: "ܡܫܲܡܫܵܢܵܐ:", color: "red", role: true },
          { text: " ", color: "red" },
          { text: "ܢܨܲܠܸܐ ܫܠܵܡܵܐ ܥܲܡܲܢ." },
        ],
      },
    ],
    footnotes: [
      "Text from Methodus Officiorum Pro Diebus Festivis Collecta by Kalappurakal Andreyos Malpan, 1909, reprinted in 1959, page 30. This way of chanting Awun d’washmayya, with verses alternating between the celebrant and the choir, is unique to the Malabar tradition.",
      "After the word ܚܵܘ̈ܒܲܝܢ (our debts), the Chaldean and Syro-Malabar Churches add the phrase ܘܲܚܛܵܗܲܝ̈ܢ (and our sins) as found in Luke 11:3. The Assyrian and Ancient Churches of the East use what is found in Mathew 6:9-13, without ܘܲܚܛܵܗܲܝ̈ܢ",
    ],
    youtubeEmbedSrc:
      "https://www.youtube-nocookie.com/embed/ARCxp_3J67g?si=vjAWkMzcm8LMpHhS",
  },
  {
    num: 2,
    title: "Hallel Hallel",
    blocks: [
      {
        segments: [
          { text: "ܬܵܘ ܢܫܲܒܲܚ ܠܡܵܪܝܵܐ. " },
          {
            text: "ܗܲܠܸܠܘ ܗܲܠܸܠܘ. ܗܲܠܸܠܘ ܥܝܼܪܹ̈ܐ. ܒܡܵܘܠܵܕܹܗ ܕܡܲܠܟܵܐ ܡܫܝܼܚܵܐ. ",
            color: "red",
          },
          { text: "ܘܢܸܙܡܲܪ ܠܐܲܠܵܗܲܢ ܦܵܪܘܿܩܵܐ." },
          {
            text: " ܗܲܠܸܠܘ ܗܲܠܸܠܘ. ܗܲܠܸܠܘ ܥܝܼܪܹ̈ܐ. ܒܡܵܘܠܵܕܹܗ ܕܡܲܠܟܵܐ ܡܫܝܼܚܵܐ.",
            color: "red",
          },
          { text: " ܢܩܲܕܸܡ ܐܲܦܵܘ̈ܗܝ ܒܬ݂ܵܘܕܝܼܬ݂ܵܐ." },
          {
            text: " ܗܲܠܸܠܘ ܗܲܠܸܠܘ. ܗܲܠܸܠܘ ܥܝܼܪܹ̈ܐ. ܒܡܵܘܠܵܕܹܗ ܕܡܲܠܟܵܐ ܡܫܝܼܚܵܐ.",
            color: "red",
          },
          { text: " ܘܒܲܙܡܝܼܪܵܬ݂ܵܐ ܢܫܲܒ݁ܚܝܼܘܗܝ." },
          {
            text: " ܗܲܠܸܠܘ ܗܲܠܸܠܘ. ܗܲܠܸܠܘ ܥܝܼܪܹ̈ܐ. ܒܡܵܘܠܵܕܹܗ ܕܡܲܠܟܵܐ ܡܫܝܼܚܵܐ.",
            color: "red",
          },
          { text: " ܡܸܛܠ ܕܐܲܠܵܗܵܐ ܗ݇ܘ̣ ܪܲܒܵܐ ܡܵܪܝܵܐ." },
          {
            text: " ܗܲܠܸܠܘ ܗܲܠܸܠܘ. ܗܲܠܸܠܘ ܥܝܼܪܹ̈ܐ. ܒܡܵܘܠܵܕܹܗ ܕܡܲܠܟܵܐ ܡܫܝܼܚܵܐ.",
            color: "red",
          },
          { text: " ܡܲܠܟܵܐ ܕܪܲܒ݁ ܥܲܠ  ܟܠܗܘܿܢ ܐܲܠܵܗܹ̈ܐ. " },
          { text: "ܐܝܼܬ݂ܝܵܐ ܕܐܝܼܬ݂ܵܘܗܝ ܡ̣ܢ ܥܵܠܲܡ. ", color: "red" },
          { text: "ܕܒ݂ܐܝܼܕ݂ܵܘ̈ܗܝ ܐܸܢܹܝܢ ܫܲܬ݂ܐܣܹܝ̈ܗ̇ ܕܐܲܪܥܵܐ ܘܪܵܘܡܵܐ ܕܛܘܼܪܹ̈ܐ." },
          { text: " ܐܝܼܬ݂ܝܵܐ ܕܐܝܼܬ݂ܵܘܗܝ ܡ̣ܢ ܥܵܠܲܡ.", color: "red" },
          { text: " ܕܝܼܠܹܗ ܗ݇ܘ̣ ܝܲܡܵܐ ܘܗ݀ܘ ܥܲܒ݂ܕ݂ܹܗ." },
          { text: " ܐܝܼܬ݂ܝܵܐ ܕܐܝܼܬ݂ܵܘܗܝ ܡ̣ܢ ܥܵܠܲܡ.", color: "red" },
          { text: " ܘܝܲܒ݁ܝܼܫܬܵܐ ܐܝܼܕ݂ܵܘ̈ܗܝ ܓܒܲܠܝ̈." },
          { text: " ܐܝܼܬ݂ܝܵܐ ܕܐܝܼܬ݂ܵܘܗܝ ܡ̣ܢ ܥܵܠܲܡ.", color: "red" },
          { text: " ܬܵܘ ܢܸܒ݂ܪܘܿܟ݂ ܘܢܸܣܓ݁ܘܿܕ݂ ܠܹܗ." },
          { text: " ܐܝܼܬ݂ܝܵܐ ܕܐܝܼܬ݂ܵܘܗܝ ܡ̣ܢ ܥܵܠܲܡ. ", color: "red" },
          { text: "ܘܲܢܒܲܪܟ݂ܝܼܘܗܝ ܠܡܵܪܝܵܐ ܕܥܲܒ݂ܕܲܢ." },
          {
            text: " ܗܲܠܸܠܘ ܗܲܠܸܠܘ. ܗܲܠܸܠܘ ܥܝܼܪܹ̈ܐ. ܒܡܵܘܠܵܕܹܗ ܕܡܲܠܟܵܐ ܡܫܝܼܚܵܐ.",
            color: "red",
          },
          { text: "  ܡܸܛܠ ܕܗܘ݀ܝܘܼ ܐܲܠܵܗܲܢ." },
          {
            text: " ܗܲܠܸܠܘ ܗܲܠܸܠܘ. ܗܲܠܸܠܘ ܥܝܼܪܹ̈ܐ. ܒܡܵܘܠܵܕܹܗ ܕܡܲܠܟܵܐ ܡܫܝܼܚܵܐ.",
            color: "red",
          },
          { text: " ܘܲܚܢܲܢ ܥܲܡܵܐ ܕܝܼܠܹܗ ܘܥܵܢܵܐ ܕܡܲܪܥܝܼܬܹܗ. " },
          {
            text: "ܗܲܠܸܠܘ ܗܲܠܸܠܘ. ܗܲܠܸܠܘ ܥܝܼܪܹ̈ܐ. ܒܡܵܘܠܵܕܹܗ ܕܡܲܠܟܵܐ ܡܫܝܼܚܵܐ.",
            color: "red",
          },
          { text: " ܝܵܘܡܵܢܵܐ ܐܸܢ ܒܩܵܠܹܗ ܬܸܫܡܥܘܼܢ. " },
          {
            text: "ܗܲܠܸܠܘ ܗܲܠܸܠܘ. ܗܲܠܸܠܘ ܥܝܼܪܹ̈ܐ. ܒܡܵܘܠܵܕܹܗ ܕܡܲܠܟܵܐ ܡܫܝܼܚܵܐ.",
            color: "red",
          },
          { text: " ܠܵܐ ܬܩܲܫܘܿܢ ܠܸܒܵܘ̈ܵܬ݂ܟ݂ܘܿܢ ܠܡܲܪܓܵܙܘܼܬܹܗ. " },
          {
            text: "ܗܲܠܸܠܘ ܗܲܠܸܠܘ. ܗܲܠܸܠܘ ܥܝܼܪܹ̈ܐ. ܒܡܵܘܠܵܕܹܗ ܕܡܲܠܟܵܐ ܡܫܝܼܚܵܐ.",
            color: "red",
          },
          { text: " ܫܘܼܒ݂ܚܵܐ ܠܐܲܒ݂ܵܐ ܘܠܲܒ݂ܪܵܐ ܘܲܠܪܘܼܚܵܐ ܕܩܘܼܕ݂ܫܵܐ." },
          {
            text: " ܗܲܠܸܠܘ ܗܲܠܸܠܘ. ܗܲܠܸܠܘ ܥܝܼܪܹ̈ܐ. ܒܡܵܘܠܵܕܹܗ ܕܡܲܠܟܵܐ ܡܫܝܼܚܵܐ.",
            color: "red",
          },
          { text: " ܡ̣ܢ ܥܵܠܲܡ ܘܲܥܕܲܡܵܐ ܠܥܵܠܲܡ ܐܵܡܹܝܢ ܘܐܵܡܹܝܢ. " },
          {
            text: "ܗܲܠܸܠܘ ܗܲܠܸܠܘ. ܗܲܠܸܠܘ ܥܝܼܪܹ̈ܐ. ܒܡܵܘܠܵܕܹܗ ܕܡܲܠܟܵܐ ܡܫܝܼܚܵܐ.",
            color: "red",
          },
        ],
      },
    ],
    footnotes: [
      "Psalm 95 - ܡܙܡܘܪܐ ܨܗ. This is a farced Psalm, with various farcings used as refrain throughout. The Assyrian/Chaldean texts use a different Psalm farced with Hallel Hallel, see Darmo 1961, Vol I, p. ܬܩܣܙ, 388",
    ],
    youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/oHd2aH9qOYc",
  },
  {
    num: 3,
    title: "Isho Maran M’shiha (Nuhra d’nah)",
    blocks: [
      {
        segments: [
          { text: "ܢܢ.", color: "red" },
          { text: " ܢܘܼܗܪܵܐ ܕܢܲܚ ܠܙܲܕ݁ܝܼܩܹ̈ܐ: ܘܠܲܬ݂ܪ̈ܝܼܨܲܝ ܠܸܒܵܐ ܚܲܕ݂ܘܼܬ݂ܵܐ" },
          { text: "܀", color: "red" },
        ],
      },
      {
        segments: [
          { text: "ܝ: ", color: "red" },
          {
            text: "ܝܼܫܘܿܥ ܡܵܪܲܢ ܡܫܝܼܚܵܐ: ܕܢܲܚ ܠܲܢ ܡ̣ܢ ܥܘܼܒܵܐ ܕܐܲܒ݂ܘܼܗܝ. ܐܸܬ݂ܵܐ ܘܐܲܦܩܲܢ ܡ̣ܢ ܚܸܫܘܿܟ݂ܵܐ: ܘܐܲܢܗܲܪ ܠܲܢ ܒܢܘܼܗܪܹܗ ܓܲܐܝܵܐ",
          },
          { text: "܀", color: "red" },
        ],
      },
      {
        segments: [
          { text: "ܐ:", color: "red" },
          {
            text: " ܐܝܼܡܵܡܵܐ ܕܢܲܚ ܥܲܠ ܒܢܲܝ̈ـܢܵܫܵܐ: ܘܲܥܪܲܩ ܫܘܼܠܛܵܢܹܗ ܕܚܸܫܘܿܟ݂ܵܐ. ܢܘܼܗܪܵܐ ܕܢܲܚ ܠܲܢ ܡ̣ܢ ܢܘܼܗܪܹܗ: ܘܐܲܢܗܲܪ ܥܲܝܢܲܝ̈ܢ ܚܸܫܘܿܟ݂ܵܬ݂ܵܐ",
          },
          { text: "܀", color: "red" },
        ],
      },
      {
        segments: [
          { text: "ܫ:", color: "red" },
          {
            text: " ܫܘܼܒ݂ܚܹܗ ܐܲܕ݂ܢܲܚ ܒܓ݂ܵܘ ܬܹܒܹܝܠ: ܘܐܲܢܗܲܪ ܠܲܬ݂ܗܘܿܡܹ̈ܐ ܬܲܚܬܵܝܹ̈ܐ. ܕܥܸـܟ݂ ܡܵܘܬܵܐ ܘܲܥܪܲܩ ܚܸܫܘܿܟ݂ܵܐ: ܘܐܸܬ݁ܬܲܒܲܪܘ ܬܲܪ̈ܥܹܐ ܕܲܫܝܘܿܠ",
          },
          { text: "܀", color: "red" },
        ],
      },
      {
        segments: [
          { text: "ܘ:", color: "red" },
          {
            text: " ܘܐܲܢܗܲܪ ܠܟ݂ܠܗܹܝܢ ܒܸܪ̈ܝܵܬ݂ܵܐ: ܕܡ̣ܢ ܩܕ݂ܝܼܡ ܚܸܫ̈ܘܿܟ݂ܵܢ ܗ݇ܘܲܝ̈: ܩܵܡܘ ܡܝܼ̈ܬܹܐ ܫܵܟ݂ܒܲܝ̈ ܥܲܦܪܵܐ: ܘܫܲܒܲܚܘ ܕܲܗܘ̤ܵܐ ܠܗܘܿܢ ܦܘܼܪܩܵܢܵܐ",
          },
          { text: "܀", color: "red" },
        ],
      },
      {
        segments: [
          { text: "ܥ:", color: "red" },
          {
            text: " ܥܒܲܕ݂ ܦܘܼܪܩܵܢܵܐ ܘܝܲܗ݇ܒ݂ ܠܲܢ ܚܲܝܹ̈ܐ: ܘܐܸܬ݂ܥܲܠܝܼ ܠܘܵܬ݂ ܐܲܒ݂ܘܼܗܝ ܠܪܵܘܡܵܐ. ܘܬܘܼܒ݂ ܐܵܬܹܐ ܒܫܘܼܒ݂ܚܹܗ ܪܲܒܵܐ: ܘܡܲܢܗܲܪ ܥܲܝܢܹ̈ܐ ܕܟ݂ܠ ܕܣܲܟ݁ܝܼܘ ܠܹܗ",
          },
          { text: "܀", color: "red" },
        ],
      },
      {
        segments: [
          { text: "ܡ:", color: "red" },
          {
            text: " ܡܲܠܟܲܢ ܐܵܬܹܐ ܒܫܘܼܒ݂ܚܹܗ ܪܲܒܵܐ: ܢܲܢܗܲܪ ܫܪ̈ܵܓܲܝܢ ܘܢܸܦܘܿܩ ܠܐܘܼܪܥܹܗ. ܘܢܸܚܕܸ݁ܐ ܒܹܗ ܐܲܝـܟ݂ ܕܲܚܕ݂ܝܼ ܒܲܢ: ܘܲܡܚܲܕܸ݁ܐ ܠܲܢ ܒܢܘܼܗܪܹܗ ܓܲܐܝܵܐ",
          },
          { text: "܀", color: "red" },
        ],
      },
      {
        segments: [
          { text: "ܫ:", color: "red" },
          {
            text: " ܫܘܼܒ݂ܚܵܐ ܢܲܣܸܩ ܠܪܲܒ݁ܘܼܬܹܗ: ܘܟ݂ܠܲܢ ܢܵܘܕܹ݁ܐ ܠܐܲܒ݂ܘܼܗܝ ܪܵܡܵܐ. ܕܲܣܓ݂ܝܼܘ ܪ̈ܲܚܡܵܘܗܝ ܘܫܲܠܚܹܗ ܨܹܐܕܲܝܢ: ܘܲܥܒܲܕ݂ ܠܲܢ ܣܲܒ݂ܪܵܐ ܘܦܘܼܪܩܵܢܵܐ",
          },
          { text: "܀", color: "red" },
        ],
      },
      {
        segments: [
          { text: "ܝ:", color: "red" },
          {
            text: " ܝܵܘܡܹܗ ܕܵܢܲܚ ܡ̣ܢ ܫܸܠܝܵܐ: ܘܢܵܦܩܝܼܢ ܠܐܘܼܪܥܹܗ ܩܲܕ݁ܝܼ̈ܫܵܘܗܝ. ܘܡܲܢܗ̱ܪܝܼܢ ܠܲܡܦܹܝܕܲܝ̈ܗܘܿܢ: ܟܠ ܕܲܥܡܲܠܘ ܘܲܠܐܝܼܘ ܘܐܸܬ݁ܛܲܝܲܒ݂ܘ",
          },
          { text: "܀", color: "red" },
        ],
      },
      {
        segments: [
          { text: "ܚ:", color: "red" },
          {
            text: " ܚܵܕܹܝܢ ܡܲܠܲܐܟܹ̈ܐ ܘܥܝܼܪ̈ܲܝ ܫܡܲܝܵܐ: ܒܫܘܼܒ݂ܚܵܐ ܕܟܹܐܢܹ̈ܐ ܘܲܕ݂ܙܲܕ݁ܝܼܩܹ̈ܐ. ܘܣܵܝܡܝܼܢ ܟܠܝܼܠܹ̈ܐ ܒܪܹ̈ܫܲܝܗܘܿܢ: ܘܐܲܟܲܚ݇ܕ݂ ܡܝܲܒ݁ܒ݂ܝܼܢ ܘܲܡܗܲܠܠܝܼܢ",
          },
          { text: "܀", color: "red" },
        ],
      },
      {
        segments: [
          { text: "ܐ:", color: "red" },
          {
            text: " ܐܲܚܲܝ̈ ܩܘܼܡܘ ܘܐܸܬ݁ܛܲܝܲܒ݂ܘ: ܕܢܵܘܕܸ݁ܐ ܠܡܲܠܟܲܢ ܘܲܠܦܵܪܘܿܩܲܢ. ܕܐܵܬܹܐ ܒܫܘܼܒ݂ܚܹܗ ܘܲܡܚܲܕܸ݁ܐ ܠܲܢ: ܒܢܘܼܗܪܹܗ ܓܲܐܝܵܐ ܒܹܝܬ݂ ܡܲܠܟ݁ܘܼܬ݂ܵܐ",
          },
          { text: "܀", color: "red" },
        ],
      },
    ],
    footnotes: [
      "Text from Kthawa Daslotha Kanonaita, St. Joseph’s Press, Mannanam, 1932. The text in the Assyrian/Chaldean Hudre is the same as this.",
    ],
    youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/OuEwf2kcZfs",
  },
  {
    num: 4,
    title: "Marya Kolhon Hawbay",
    blocks: [
      {
        segments: [
          { text: "ܐܸܬ݂ܟܲܪܟ݁ܘܼܢ ܘܚܲܕܪܘܼܢܝ. ", color: "red" },
          {
            text: "ܡܵܪܝܵܐ ܟܠܗܘܿܢ ܚܵܘܒܲܝ̈ ܩܵܡܘ ܡ̣ܢ ܫܸܠܝܵܐ ܠܡܵܘܒܵܕܘܼܬܲܢܝ ܡ̣ܢ ܡܸܢܝܵܢܵܐ ܕܲܓ݂ܙܵܪ̈ܲܝܟ݂: ܘܠܲܝܬ݁ ܦܵܪܘܿܩܵܐ ܕܢܸܦܪܘܿܩ ܚܲܝܲܝ̈ ܐܸܠܵܐ ܐܸܢ ܐܲܢ݇ܬ݁. ܛܵܒ݂ܵܐ ܕܐܲܪܦܝܼܬ݂ ܦܘܼܩܕܵܢܲܝ̈ܟ. ܠܵܟ݂ܘܼ ܩܵܪܹܢܵܐ ܚܘܼܣ ܥܲܠ ܚܘܼܒܵܠܝ ܘܦܘܿܩ ܒܲܒ݂ܥܵܬ݂ܵܗ̇ ܕܐܲܒ݁ܝܼܕ݂ܘܼܬ݂ܝ. ܒܛܲܝܒܘܼܬ݂ܵܟ݂ ܡܵܪܝ ܐܸܬ݂ܓܲܒ݂ܠܹܬ݂ ܠܵܐ ܬܲܪܦܹܝܢܝ ܒܐܝܼܕܲܝ̈ ܒܝܼܫܵܐ. ܫܒ݂ܘܿܩ ܚܵܘܒܲܝ̈ ܐܲܝܟ݂ ܕܲܡܥܵܕ݂ܲܬ݁. ܘܚܼܿܣܵܐ ܟܠܗܹܝܢ ܣܲܟ݂̈ܠܘܵܬ݂ܝ. ܐܘܿ ܚܲܢܵܢܵܐ ܚܵܐܹܢ ܟܠ. ܒܪܝܼܟ݂ܵܐ ܗ݇‍ܝܼ ܡܹܐܬ݂ܝܬ݂ܵܟ݂ ܕܲܠܘܵܬܲܢ. ܡܵܪܲܢ ܚܘܼܣܥܠܲܝ.",
          },
        ],
      },
      {
        segments: [
          { text: "ܢܸܫܩܠܘܼܢ ܛܘܼܪܹ̈ܐ ܫܠܵܡܵܐ ܠܥܲܡܵܟ݂. ", color: "red" },
          {
            text: "ܫܠܵܡܵܐ ܘܫܲܝܢܵܐ ܢܸܣܓܸܐ ܠܥܲܡܵܟ݂ ܫܲܝܢܹܗ ܕܥܵܠܡܵܐ. ܡܫܝܼܚܵܐ ܕܐܸܬ̣ܵܐ ܠܦܘܼܪܩܵܢܲܢ. ܙܪܘܿܥ ܐܵܘܝܘܼܬ݂ܵܐ ܒܲܒ݂ܢܹ̈ܝܗ̇ ܕܥܹܕܬܵܐ. ܕܢܸܗܘܘܿܢ ܙܵܡܪܝܼܢ ܥܲܡ ܥܝܼܪܹ̈ܐ ܫܘܼܒ݂ܚܵܐ ܠܲܫܡܵܟ݂. ܘܩܲܝܸܡ ܟܵܗܢܹ̈ܐ ܘܫܲܝܸܢ ܡܲܠܟܹ̈ܐ. ܘܒܲܛܸܠ ܩܪܵܒܹܐ ܡ̣ܢ ܣܵܘ̈ܦܹܝܗ̇ ܕܐܲܪܥܵܐ. ܘܢܲܛܲܪ ܠܟܸܢܫܵܐ ܕܣܵܓ݂ܘܿܕܲܝ̈ܟ. ܕܠܵܟ݂ܘܼ ܩܵܪܹܝܢ ܒܟ݂ܠܥܸܕܵܢ. ܘܲܣܥܘܿܪ ܡܲܪ̈ܥܹܐ ܒܛܲܝܒ݁ܘܼܬ݂ܵܟ݂. ܘܐܲܚܠܸܡ ܟܪ̈ܝܼܗܹܐ ܒܲܚܢܵܢܵܟ݂. ܘܐܵܘܫܸܛ ܐܝܼܕܵܐ ܕܥܘܼܕ݂ܪ̈ܵܢܹܐ. ܠܟ݂ܠܗܘܿܢ ܐܲܝܠܹܝܢ ܕܐܲܠܝܼܨܝܼܢ. ܡܵܪܲܢ ܚܘܼܣܥܠܲܝܢ.",
          },
        ],
      },
    ],
    footnotes: [
      "Text from Kthawa Daslotha Kanonaita, St. Joseph’s Press, Mannanam, 1932, p. 599. The text in the Assyrian/Chaldean Hudre differs only in the shuraya (preceding psalm verse). See Darmo 1961, Vol III Page ܬܩܡܓ",
    ],
    youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/oyhRWnSbYYY",
  },
  {
    num: 5,
    title: "B'endan Sapra",
    blocks: [
      {
        segments: [
          { text: "ܡܵܪܝܵܐ ܒܨܲܦܪܵܐ ܬܸܫܡܲܥ ܩܵܠܝ. ", color: "red" },
          {
            text: "ܒܥܸܕܵܢ ܨܲܦܪܵܐ ܕܡܸܬ݂ܦܲܬ݂ܚܝܼܢ: ܬܲܪ̈ܥܲܝ ܪܵܘܡܵܐ ܠܲܨܠܘܿܬ݂ܵܐ: ܩܲܒܸ݁ܠ ܡܵܪܲܢ ܒܵܥܘܼܬܲܢ. ܘܦܲܢܵܐ ܒܪ̈ܲܚܡܲܝܟ ܫܹܐ̈ܠܵܬܲܢ: ܘܲܥܒܸܕ݂ ܣܲܒ݂ܪܵܐ ܘܦܘܼܪܩܵܢܵܐ: ܠܢܲܦ̮ܫ̈ܵܬ݂ܵܐ ܕܲܡܣܲܟ݁ܝܵܢ ܠܵܟ݂. ",
          },
        ],
      },
      {
        segments: [
          { text: "ܘܲܒ݂ܨܲܦܪܵܐ ܐܸܬ݁ܛܲܝܲܒ݂ ܘܐܸܬ݂ܚܙܸܐ ܠܵܟ݂. ", color: "red" },
          {
            text: "ܨܲܦܪܹܗ ܕܡܵܪܲܢ ܡܲܛܝܼ ܠܹܗ: ܘܡ̣ܢ ܫܹܠܝ ܕܵܢܲܚ ܦܵܪܘܿܩܲܢ: ܘܲܠܟܹܐܢܹ̈ܐ ܝܵܗܹܒ݂ ܐܲܓ݂ܪܵܐ. ܘܛܘܼܒ݂ܵܘܗܝ ܠܐܲܝܢܵܐ ܕܐܸܬ݂ܟܲܫܲܪ: ܘܲܦܠܲܚ ܒܟܲܪܡܹܗ ܕܲܡܫܝܼܚܵܐ: ܘܲܢܣܲܒ݂ ܐܲܓ݂ܪܹܗ ܡܲܠܝܵܐܝܼܬ݂.",
          },
        ],
      },
      { skipped: "[verses omitted]" },
      {
        segments: [
          {
            text: "ܫܘܼܒ݂ܚܵܐ ܠܐܲܒ݂ܵܐ ܘܠܲܒ݂ܪܵܐ ܘܲܠܪܘܼܚܵܐ ܕܩܘܼܕ݂ܫܵܐ. ",
            color: "red",
          },
          {
            text: "ܒܥܸܕܵܢ ܨܲܦܪܵܐ ܫܘܼܒ݂ܚܵܐ ܠܵܟ݂: ܡ̣ܢ ܥܸܠܵܝܹ̈ܐ ܘܬܲܚܬܵܝܹ̈ܐ: ܒܪܵܐ ܕܝܵܬܹܒ݂ ܡ̣ܢ ܝܲܡܝܼܢܵܐ. ܕܲܠܩܵܠ ܩܲܪܢܵܐ ܡܸܬ݁ܬ݁ܥܝܼܪܝܼܢ: ܣܵܒܹ̈ܐ ܥܠܲܝܡܹ̈ܐ ܘܝܲܠܘܼ̈ܕܸܐ: ܕܲܠܬܸܫܒ̇ܘܿܚܬܵܟ݂ ܒܪܲܝܬ݁ ܐܸܢܘܿܢ.  ",
          },
        ],
      },
      {
        segments: [
          {
            text: "ܡ̣ܢ ܥܵܠܲܡ ܘܲܥܕܲܡܵܐ ܠܥܵܠܲܡ ܐܵܡܹܝܢ ܘܐܵܡܹܝܢ. ",
            color: "red",
          },
          {
            text: "ܛܘܼܒ݂ܵܘܗܝ ܠܐܲܝܢܵܐ ܕܐܸܬ݁ܬܲܓܲܪ: ܐܲܝܟ݂ ܬܹܐܓ݂ܘܼܪܬܵܟ݂ ܐܘܿ ܐܲܒ݂ܘܼܢ: ܘܟܲܢܸܫ ܥܘܼܬ݂ܪܵܐ ܪܘܼܚܵܢܵܐ. ܘܲܡܠܵܐ ܐܸܠܦܹܗ ܟܠ ܛܘܼܒ݂ܝܼ̈ܢ: ܘܲܬ݂ܪܲܨ ܘܲܢܦܲܩ ܠܲܠܡܹܐܢܵܐ: ܠܒܹܝܬ݂ ܘܲܥܕܵܐ ܕܟ݂ܠܗܘܿܢ ܟܹܐܢܹ̈ܐ. ",
          },
        ],
      },
      {
        segments: [
          { text: "ܢܹܐܡܲܪ ܟܠܹܗ ܥܲܡܵܐ ܐܵܡܹܝܢ ܘܐܵܡܹܝܢ. ", color: "red" },
          {
            text: "ܡܵܪܲܢ ܬܹܐܬܸܐ ܡܲܠܟܘܼܬ݂ܵܟ݂: ܘܢܸܗܘܸܐ ܒܐܲܪܥܵܐ ܨܸܒ݂ܝܵܢܵܟ݂: ܐܲܟ݂ܡܵܐ ܕܐܝܼܬ݂ܵܘܗܝ ܒܲܫܡܲܝܵܐ. ܗܲܒ݂ܠܲܢ ܠܲܚܡܵܐ ܕܣܘܼܢܩܵܢܲܢ: ܘܠܵܐ ܬܲܥܸܠܲܝܢ ܠܢܸܣܝܘܿܢܵܐ: ܐܸܠܵܐ ܦܲܨܵܢ ܡ̣ܢ ܒܝܼܫܵܐ",
          },
          { text: "܀", color: "red" },
          { text: " " },
        ],
      },
    ],
    footnotes: [
      "Text from Kthawa Daslotha Kanonaita, St. Joseph’s Press, Mannanam, 1932. Assyrian/Chaldean Hudre have the same text.",
    ],
    youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/wNjBYWahg9M",
  },
  {
    num: 6,
    title: "Estapanos Urha",
    blocks: [
      {
        segments: [
          { text: "ܕܘܼܟ݂ܪܵܢܵܐ ܠܥܵܠܲܡ ܢܸܗܘܸܐ ܠܙܲܕܝܼܩܵܐ. ", color: "red" },
          {
            text: "ܐܸܣܛܲܦܵܢܘܿܣ ܐܘܼܪܚܵܐ ܕܪܲܫ: ܘܲܒ݂ܥܸܩܒ݂ܵܬܹ̈ܗ ܪܕܵܘ ܣܵܗܕܹ̈ܐ. ܘܥܲܡܹܗ ܕܚܲܬ݂ܢܵܐ ܡܸܬ݂ܒܲܣܡܝܼܢ: ܒܲܓ݂ܢܘܿܢ ܢܘܼܗܪܵܐ ܕܠܵܐ ܡܸܫܬ݁ܪܸܐ. ",
          },
        ],
      },
      {
        segments: [
          { text: "ܘܡ̣ܢ ܛܸܒܵܐ ܒܝܼܫܵܐ ܠܵܐ ܢܸܕ݂ܚܲܠ. ", color: "red" },
          {
            text: "ܐܸܣܛܲܦܵܢܘܿܣ ܟܲܕ݂ ܐܸܬ݂ܪܓܸܡ: ܙܝܼܘܵܐ ܕܡܵܪܹܗ ܒܪܵܘܡܵܐ ܚܙܵܐ. ܘܲܠܪܘܼܚܩܘܼܕ݂ܫܵܐ ܟܲܕ݂ ܓܵܕܠܵܐ: ܟܠܝܼܠܵܐ ܠܪܹܫܵܐ ܕܲܡܗܲܝܡܢܹ̈ܐ. ",
          },
        ],
      },
      {
        segments: [
          { text: "ܚܲܝܹ̈ܐ ܫܲܐܠܵܟ݂ ܘܝܲܗ݇ܒ݂ܬ݁ ܠܹܗ.", color: "red" },
          {
            text: " ܐܸܣܛܲܦܵܢܘܿܣ ܪ̈ܲܚܡܹܐ ܫܐܸܠ: ܠܥܲܡܵܐ ܕܲܩܪܸܒ݂ ܠܲܪܓ݂ܘܼܡܝܹܗ. ܚܲܣܵܐ ܡܵܪܲܢ ܘܲܫܒ݂ܘܿܩ ܠܗܘܿܢ: ܕܠܵܐ ܓܹܝܪ ܝܵܕ݂ܥܝܼܢ ܡܵܢ ܥܵܒ݂ܕܝܼܢ. ",
          },
        ],
      },
      {
        segments: [
          { text: "ܡ̣ܢ ܥܲܡܵܐ ܕܠܵܐ ܡܪܲܚܡܵܢ. ", color: "red" },
          {
            text: "ܐܸܣܛܲܦܵܢܘܿܣ ܟܲܕ ܐܸܬ݂ܩܛܸܠ: ܥܲܠ ܩܵܛܘܿܠܵܘ̈ܗܝ ܪ̈ܲܚܡܹܐ ܫܐܸܠ. ܒܲܕ݂ܡܘܼܬ݂ ܡܵܪܹܗ ܟܲܕ ܐܸܙܕܩܸܦ: ܡ̣ܢ ܝܗ݇ܘܼܕܵܝܹ̈ܐ ܛܵܠܘܿܡܹ̈ܐ.",
          },
        ],
      },
      { skipped: "[remaining verses omitted]" },
    ],
    footnotes: [
      "Text from Kthawa Daslotha Kanonaita, St. Joseph’s Press, Mannanam, 1932. Assyrian/Chaldean Hudre have the same text.",
    ],
    youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/O3rPM3e5H-A",
  },
  {
    num: 7,
    title: "Brikh Hannana",
    blocks: [
      {
        segments: [
          {
            text: "ܒܪܝܼـܟ݂ ܚܲܢܵܢܵܐ: ܕܲܒ݂ܛܲܝܒܘܼܬܹܗ. ܦܲܪܢܸܣ ܚܲܝܲܝ̈ܢ: ܒܲܢܒ݂ܝܼܘܼܬ݂ܵܐ",
          },
          { text: "܀", color: "red" },
        ],
      },
      {
        segments: [
          {
            text: "ܒܥܲܝܢܵܐ ܕܪܘܼܚܵܐ: ܚ̣ܙܵܐ ܐܹܫܲܥܝܵܐ. ܠܝܲܠܕܵܐ ܬܡܝܼܗܵܐ: ܕܲܒ݂ܬ݂ܘܼܠܘܼܬ݂ܵܐ",
          },
          { text: "܀", color: "red" },
        ],
      },
      {
        segments: [
          {
            text: "ܕܠܵܐ ܙܘܼܘܵܓ݂ܵܐ: ܝܸܠܕܲܬ̤ ܡܲܪܝܲܡ. ܠܥܲܡܲܢܘܼܐܹܝܠ ܐ݇ܠܵܗܵܐ ܡܸܠܬ݂ܵܐ",
          },
          { text: "܀", color: "red" },
        ],
      },
      {
        segments: [
          {
            text: "ܕܡܸܢܵܗ̇ ܓܲܒ݂ܠܹܗ: ܪܘܼܚܵܐ ܕܩܘܼܕܫܵܐ. ܠܦܲܓ݂ܪܹܗ ܕܲܟ݂ܝܵܐ: ܐܲܟ݂ܡܵܐ ܕܲܟ݂ܬ݂ܝܼܒ݂",
          },
          { text: "܀", color: "red" },
        ],
      },
      {
        segments: [
          {
            text: "ܘܲܗܘܵܐ ܡܚܲܝܕܵܐ: ܒܢܲܦ̮ܫܹܗ ܙܗܝܼܬ݂ܵܐ. ܒܛܵܘܚܵܐ ܕܒܲܛܢܹܗ: ܠܲܩܢܘܿܡ ܡܸܠܬ݂ܵܐ",
          },
          { text: "܀", color: "red" },
        ],
      },
      {
        segments: [
          {
            text: "ܒܲܚܕܵܝܘܼܬ݂ܵܐ: ܕܠܵܐ ܡܸܬ݂ܦܲܪܫܵܐ. ܘܲܩܢܘܿܡܵܝܬܵܐ: ܒܲܕܡܝܼܪܘܼܬ݂ܵܐ",
          },
          { text: "܀", color: "red" },
        ],
      },
      {
        segments: [
          {
            text: "ܕܲܢܡܲܠܸܐ ܒܹܗ: ܟܠܗܹܝ̈ܢ ܕܝܼܠܹܗ. ܠܦܘܼܪܩܵܢ ܓܵܘܵܐ: ܐܲܝܟ݂ ܕܲܫܦܲܪ ܠܹܗ",
          },
          { text: "܀", color: "red" },
        ],
      },
      {
        segments: [
          { text: "ܒܝܘܿܡ ܣܘܼܒܵܪܹܗ" },
          { text: " " },
          { text: "ܫܲܒ݁ܚܘܼܗܝ ܥܝܼܪܹ̈ܐ.  ܒܗܘܼܠܵܠܲܝ̈ܗܘܿܢ: ܒܪܵܘܡܵܐ ܕܲܠܥܸܠ" },
          { text: "܀", color: "red" },
        ],
      },
      { skipped: "[remaining verses omitted]" },
    ],
    footnotes: [
      "Text from Kthawa Daslotha Kanonaita, St. Joseph’s Press, Mannanam, 1932, page 369. This hymn has been heavily edited after Diamper, see Darmo 1961, Vol I p. ܩܝܚ for the original.",
    ],
    youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/_QrOsr_x33g",
  },
  {
    num: 8,
    title: "Ethpan Al Slotha",
    blocks: [
      {
        segments: [
          {
            text: "ܐܸܬ݂ܦܲܢ ܥܲܠ ܨܠܘܿܬ݂ܵܐ ܕܥܲܒ݂ܕܲܝ̈ܟ݂ ܦܵܪܘܿܩܲܢ: ܘܩܲܒܸ݁ܠ ܒܵܥܘܼܬܲܢ ܘܦܲܢܵܐ ܫܹ̈ܐܠܵܬܲܢ",
          },
          { text: "܀", color: "red" },
        ],
      },
      {
        segments: [
          {
            text: "ܕܐܲܢ݇ܬ݁ܘܼ ܒܹܝܬ݂ ܓܵܘܣܵܐ ܘܣܲܒ݂ܪܵܐ ܕܲܡܚܝܼܠܹ̈ܐ: ܒܥܘܼܕ݂ܪܵܢܵܟ݂ ܢܸܙܟܸ݁ܐ ܠܨܸܢܥܵܬܹ̈ܗ ܕܒ݂ܝܼܫܵܐ",
          },
          { text: "܀", color: "red" },
        ],
      },
      {
        segments: [
          {
            text: "ܕܗܵܐ ܨܵܠܹܐ ܟܠܫܵܥ ܦܲܚܹ̈ܐ ܠܢܲܦ̮ܫ̈ܵܬܲܢ: ܘܨܵܒܹܐ ܢܵܟ݂ܘܿܠܵܐ ܕܲܢܟܲܬ݁ܡܲܢ ܒܥܵܘܼܠܹܗ",
          },
          { text: "܀", color: "red" },
        ],
      },
      {
        segments: [
          {
            text: "ܫܲܕܲܪ ܡܵܪܝ ܚܲܝܠܵܟ݂ ܘܲܢܦܲܣܸܩܝ ܢܸܫܒܵܘ̈ܗܝ: ܕܠܵܐ ܢܨܘܼܕܲܢ ܘܢܸܦܸܠ ܒܗܵܘܬ݂ܵܐ ܕܲܚܛܝܼܬ݂ܵܐ",
          },
          { text: "܀", color: "red" },
        ],
      },
      {
        segments: [
          {
            text: "ܚܲܝܠܵܐ ܕܛܲܝܒܘܼܬ݂ܵܟ ܢܚܲܝܸܠ ܡܚܝܼܠܘܼܬܲܢ: ܕܢܸܫܦܲܪ ܒܲܥܒ݂ܵܕܲܝ̈ܢ ܩܕ݂ܵܡܲܝܟ ܚܲܢܵܢܵܐ",
          },
          { text: "܀", color: "red" },
        ],
      },
      {
        segments: [
          {
            text: "ܘܐܲܫܘܵܢ ܕܢܸܙܡܲܪ ܠܵܟ݂ ܒܝܵܘܡܵܐ ܕܡܹܐܬ݂ܝܼܬ݂ܵܟ݂: ܫܘܼܒ݂ܚܵܐ ܕܠܵܐ ܦܵܛܲܪ ܠܥܵܠܲܡ ܥܵܠܡܝܼܢ ܐܵܡܹܝܢ",
          },
          { text: "܀", color: "red" },
        ],
      },
    ],
    footnotes: [
      "Text from Kthawa Daslotha Kanonaita, St. Joseph’s Press, Mannanam, 1932. Assyrian/Chaldean Hudre have the same text.",
    ],
    youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/TIpIBzqZ03Q",
  },
  {
    num: 9,
    title: "Taw n’yaqar",
    blocks: [
      {
        segments: [
          { text: "ܐܲܝܠܹܝܢ ܕܩܵܝܡܝܼܢ ܒܒܲܝܬܹ݁ܗ ܕܡܵܪܢܵܐ: ", color: "red" },
          {
            text: "ܬܵܘ ܢܩܲܪ ܟܠܲܢ ܒܲܚܦܝܼܛܘܼܬ݂ܵܐ ܠܝܘܿܡ ܕܘܼܟ݂ܪܵܢܵܗ̇ ܕܲܒ݂ܬ݂ܘܼܠܬܵܐ ܟܲܠܬܹܗ ܕܡܫܝܼܚܵܐ. ܕܒ݂ܵܐܓ݂ܘܿܢܵܐ ܕܙܲܕܝܼܩܘܼܬ݂ܵܐ ܫܸܦܪܲܬ݀ ܠܡܵܪܝܵܐ. ܘܐܸܙܕܲܗܝܲܬ݀ ܒܥܲܡ̈ܠܹܐ ܥܡܝܼ̈ܠܹܐ ܕܲܡܝܲܬ݁ܪܘܼܬ݂ܵܐ",
          },
          { text: "܀", color: "red" },
          {
            text: " ܐܲܝܟܲܢ ܢܸܓ݂ܕܘܿܠ ܢܸܨ̈ܚܵܢܹܝܗ̇. ܕܲܙܗܝܼܬ݂ܵܐ ܕܐܲܚܒܲܬ݀ ܠܲܡܫܝܼܚܵܐ. ܐܲܝܟܲܢ ܢܹܡܲܪ ܩܘܼܠܵܣܹܝ̈ܗ̇. ܕܲܡܝܲܬܲܪܬܵܐ ܡܲܠܝܲܬ݂ ܛܘܼ̈ܒܹܐ. ܐܲܝܟܲܢ ܢܸܬ݂ܢܸܐ ܕܘܼܒܵܪܹ̈ܝܗ̇. ܕܲܡܩܲܣܡܲܣܬܵܐ ܒܗܲܝܡܵܢܘܼܬ݂ܵܐ. ܐܲܝܟܲܢ ܢܹܐܡܲܪ ܬܲܫܥܝܼܬ݂ܵܗ̇. ܕܪܵܡܲܬ݂ ܒܲܙܢܵܐ ܕܡܲܟ݁ܝܼܟ݂ܘܼܬ݂ܵܐ. ܐܲܝܟܲܢ ܢܸܓܬܹ‍ܐ ܥܲܠ ܛܘܼ̈ܒܹܐ. ܕܝܵܪܬܵܐ ܢܲܦ̮ܫܵܗ̇ ܒܲܓ݂ܢܘܿܢ ܚܲܝܹ̈ܐ. ܐܲܝܟܲܢ ܢܹܐܡܲܪ ܥܲܠ ܫܲܪܒܵܗ̇. ܕܪܵܡ ܕܘܼܒܵܪܵܗ̇ ܡ̣ܢ ܟܠ ܪ̈ܵܘܡܝܼܢ. ܐܲܝܟܲܢ ܢܩܲܠܸܣ ܢܲܟ݂ܦܘܼܬ݂ܵܗ̇. ܕܐܲܢ݇ܬ݁ܬ݂ܵܐ ܕܟ݂ܝܼܬ݂ܵܐ ܕܲܟ݂ܝܲܬ݂ ܡܼܢ ܟܠ",
          },
          { text: "܀", color: "red" },
          {
            text: " ܨܠܘܿܬ݂ܵܗ̇ ܬܢܲܛܲܪ ܢܲܦ̮ܫܵܬܲܢ. ܡ̣ܢ ܢܸܟ݂̈ܝܵܢܹܐ ܘܣܲܩܘܼ̈ܒ݂ܠܹܐ ܥܕܲܡܵܐ ܠܥܵܠܲܡ.",
          },
        ],
      },
    ],
    footnotes: [
      "Text from Kthawa Daslotha Kanonaita d’Yawmatha d’Ede, Mannanam 1930. The Chaldean/Assyrian Hudre also have a similar hymn, found in the mawtwa of the Lelya on the Dukhrana of Mart Shmoni and her sons. (Bedjan Vol II p. ܬܩܦ, Darmo Vol III p. ܫܠ)",
    ],
    youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/YcMrJULLpu8",
  },
  {
    num: 10,
    title: "Sliwa Dahwa Lan",
    blocks: [
      {
        segments: [
          { text: "ܘܒܹܗ݀ܘ ܢܸܚܕܸܐ ܠܸܒܲܢ. ", color: "red" },
          {
            text: "ܨܠܝܼܒ݂ܵܐ ܕܲܗܘܵ݀ܐ ܠܲܢ ܥܸܠܲܬ݂ ܛܵܒ݂̈ܵܬ݂ܵܐ: ܘܒܹܗ݀ܘ ܐܸܬ݂ܚܲܪܲܪ ܓܸܢܣܲܢ ܡܵܝܘܿܬ݂ܵܐ. ܗܘ݀ ܡܵܪܝ ܢܸܗܘܸܐ ܠܲܢ ܫܘܼܪܵܐ ܚܲܣܝܼܢܵܐ: ܘܒܹܗ ܢܸܙܬܹܿܝܘܗܝ ܠܒ̣ܝܼܫܵܐ ܘܟ݂ܠܗܹܝܢ ܨܸܢܥܵܬܹ̈ܗ.",
          },
        ],
      },
      {
        segments: [
          { text: "ܕܪܲܫܡܹܗ ܩܲܕܝܼܫܵܐ ܣܲܒܲܪܢ.", color: "red" },
          {
            text: " ܨܠܝܼܒ݂ܵܐ ܕܲܗܘܵ݀ܐ ܠܲܢ ܥܸܠܲܬ݂ ܛܵܒ݂̈ܵܬ݂ܵܐ: ܘܒܹܗ݀ܘ ܐܸܬܼܚܲܪܲܪ ܓܸܢܣܲܢ ܡܵܝܘܿܬ݂ܵܐ. ܗܘ݀ ܡܵܪܝ ܢܸܗܘܸܐ ܠܲܢ ܫܘܼܪܵܐ ܚܲܣܝܼܢܵܐ: ܘܒܹܗ ܢܸܙܬܹܿܝܘܗܝ ܠܒ̣ܝܼܫܵܐ ܘܟ݂ܠܗܹܝܢ ܨܸܢܥܵܬܹ̈ܗ.",
          },
        ],
      },
    ],
    footnotes: [],
    youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/0dHoZ5OhA8I",
  },
  {
    num: 11,
    title: "O Dezdamman",
    blocks: [
      {
        segments: [
          { text: "ܐ", color: "red" },
          {
            text: " ܐܘܿ ܕܐܸܙܕܲܡܲܢܘ ܒܪܸܡܙܵܐ ܪܲܒܵܐ ܠܲܚܠܘܿܠ ܚܲܝܹ̈ܐ: ܕܡܸܫܬ݁ܘܼܬ݂ ܡܲܠܟܵܐ ܕܲܫܡܲܝܵܢܹ̈ܐ ܘܕܸ݁ܐܪ̈ܥܵܢܵܝܸܐ",
          },
          { text: "܀", color: "red" },
        ],
      },
      {
        segments: [
          { text: "ܒ", color: "red" },
          {
            text: " ܒܚܘܿܪܘ ܒܢܘܼܪ ܣܒܲܪܬ݂ܵܐ ܘܲܡܪܘܿܩܘ ܒܟ݂ܘܼܪܸ̈ܐ ܐܲܠܵܗܵܝܹ̈ܐ: ܡ̣ܢ ܪܸܥܝܵܢܟ݂ܘܿܢ ܟܠܝ ܚܘܼܫܵܒܹ̈ܝܐ ܥܵܠܡܵܢܵܝܹ̈ܐ",
          },
          { text: "܀", color: "red" },
        ],
      },
      {
        segments: [
          { text: "ܓ", color: "red" },
          {
            text: " ܓܲܙܵܐ ܕܛܘܼܒܹ̈ܐ ܦܲܬ݂ܚܹܗ ܡܵܪܝܵܐ ܩܕ݂ܵܡ ܒܲܥܵܝܹ̈ܐ: ܘܐܸܡܲܪ ܕܬ݂ܵܘ ܣܲܒ݂ܘ ܐ݇ܫܛܵܪ ܚܵܘܒܲܝ̈ܟ݁ܘܿܢ ܐܘܿ ܚܲܛܵܝܹ̈ܐ",
          },
          { text: "܀", color: "red" },
        ],
      },
      {
        segments: [
          { text: "ܕ", color: "red" },
          {
            text: " ܕܲܟܵܘ ܠܸܒܵܐ ܘܐܸܬ݂ܗܲܦܲܟ݂ܘ ܠܲܡ ܒܲܕ݂ܡܘܼܬ݂ ܛܠܵܝܹ̈ܐ: ܕܬܸܗܘܘܿܢ ܝܵܪ̈ܬܹܐ ܕܡܲܠܟܘܼܬ݂ ܪܵܘܡܵܐ ܐܵܦ ܒܲܝܬܵܝܹ̈ܐ",
          },
          { text: "܀", color: "red" },
        ],
      },
      { skipped: "[remaining verses omitted]" },
    ],
    footnotes: [
      "From Taksa d’Raze, Editio Typica, Kakkanad, 2012. This Turgama can also be found in Assyrian/Chaldean books, see Assyrian Kthawa d'Turgame, 1997, p. 78",
    ],
    youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/QFHTJtcy5O0",
  },
  {
    num: 12,
    title: "Kthawa Ramba",
    blocks: [
      {
        segments: [
          { text: "ܕܲܒ݂ܪܹܫ ܟܬ݂ܵܒܹ̈ܐ ܟܬ݂ܝܼܒ݂ ܥܠܲܝ: ܬܢܝܼ. ", color: "red" },
          {
            text: "ܟܬ݂ܵܒ݂ܵܐ ܪܲܒܵܐ ܕܲܣܒܲܪܬܹܗ: ܕܡܲܠܟܵܐ ܡܫܝܼܚܵܐ ܦܵܪܘܿܩܲܢ: ܐܲܪܒ݁ܥܵܐ ܣܵܦܪܹ̈ܐ ܕܬܸܕ݂ܡܘܼܪܬܵܐ. ܒܚܹܝܠ ܪܘܼܚܵܐ ܩܒ݂ܵܥܘ ܣܸܦܪ̈ܲܝܗܘܿܢ: ܡܲܬܲܝ ܠܲܡܗܲܝܡܢܹ̈ܐ ܕܒܲܝܗܘܼܕ݂: ܘܡܲܪܩܘܿܣ ܠܗܵܢܘܿܢ ܕܲܒ݂ܪܗ݇ܘܿܡܹܝ. ܘܠܘܼܩܵܐ ܠܲܒ݂ܢܲܝ̈ ܐܵܓܸܒ݂ܛܘܿܣ: ܘܝܘܿܚܲܢܵܢ ܠܐܲܦܸܣܵܝܹ̈ܐ: ܘܗܵܫܵܐ ܒܐܲܪܒܲܥܦܸܢ̈ܝܵܬ݂ܵܐ: ܒܣܸܦܪ̈ܲܝܗܘܿܢ ܗܵܐ ܡܸܬ݂ܗܲܓܹ݁ܝܢ: ܟܲܕ ܡܲܣܩܝܼܢ ܫܘܼܒ݂ܚܵܐ ܠܚܲܝܠܵܟ݂ ܪܲܒܵܐ ܡܵܪܝܵܐ.",
          },
        ],
      },
      {
        segments: [
          { text: "ܠܡܸܥܒܲܕ݂ ܨܸܒ݂ܝܵܢܵܟ݂ ܐܲܠܵܗܵܐ ܨܒܹܝܬ݂: ", color: "red" },
          {
            text: "ܟܬ݂ܵܒ݂ܵܐ ܪܲܒܵܐ ܕܲܣܒܲܪܬܹܗ: ܕܡܲܠܟܵܐ ܡܫܝܼܚܵܐ ܦܵܪܘܿܩܲܢ: ܐܲܪܒ݁ܥܵܐ ܣܵܦܪܹ̈ܐ ܕܬܸܕ݂ܡܘܼܪܬܵܐ. ܒܚܹܝܠ ܪܘܼܚܵܐ ܩܒ݂ܵܥܘ ܣܸܦܪ̈ܲܝܗܘܿܢ: ܡܲܬܲܝ ܠܲܡܗܲܝܡܢܹ̈ܐ ܕܒܲܝܗܘܼܕ݂: ܘܡܲܪܩܘܿܣ ܠܗܵܢܘܿܢ ܕܲܒ݂ܪܗ݇ܘܿܡܹܝ. ܘܠܘܼܩܵܐ ܠܲܒ݂ܢܲܝ̈ ܐܵܓܸܒ݂ܛܘܿܣ: ܘܝܘܿܚܲܢܵܢ ܠܐܲܦܸܣܵܝܹ̈ܐ: ܘܗܵܫܵܐ ܒܐܲܪܒܲܥܦܸܢ̈ܝܵܬ݂ܵܐ: ܒܣܸܦܪ̈ܲܝܗܘܿܢ ܗܵܐ ܡܸܬ݂ܗܲܓܹ݁ܝܢ: ܟܲܕ ܡܲܣܩܝܼܢ ܫܘܼܒ݂ܚܵܐ ܠܚܲܝܠܵܟ݂ ܪܲܒܵܐ ܡܵܪܝܵܐ.",
          },
        ],
      },
    ],
    footnotes: [
      "Text from Taksa d'Raze Editio Typica, Rome 2003. This is hymn is used during the Qurbana only in the Malabar tradition. The Assyrian/Chaldean Hudre contain this hymn, but the last line is different. See Darmo 1961, Vol II Page ܫܕ",
    ],
    youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/xLMmQNVpk4I",
  },
  {
    num: 13,
    title: "Shlam Lekh Maryam",
    blocks: [
      {
        segments: [
          {
            text: "ܫܠܵܡ ܠܹܟ݂ܝ ܡܲܪܝܲܡ! ܕܲܗܘܲܝܬ݁ܝ ܐܸܡܵܐ ܒܲܒ݂ܬ݂ܘܼܠܘܼܬܹܟ݂ܝ: ܠܗܵܘ̇ ܓܲܢ݇ܒܵܪܵܐ ܕܲܡܠܹܝܢ ܡܸܢܹܗ ܫܡܲܝܵܐ ܘܐܲܪܥܵܐ. ",
          },
        ],
      },
      {
        segments: [
          {
            text: "ܫܠܵܡ ܠܹܟ݂ܝ ܡܲܪܝܲܡ! ܕܲܗܘܲܝܬ݁ܝ ܐܸܡܵܐ ܒܲܒ݂ܬ݂ܘܼܠܘܼܬܹܟ݂ܝ: ܠܗܵܘ̇ ܥܲܬ݁ܝܼܩܵܐ ܕܲܩܕܵܡ ܫܸܡܫܵܐ ܫܡܹܗ ܐܝܼܬ݂ܵܘܗܝ ܗ݇ܘ̣ܵܐ",
          },
          { text: "܀", color: "red" },
        ],
      },
      {
        segments: [
          {
            text: "ܫܠܵܡ ܠܹܟ݂ܝ ܡܲܪܝܲܡ! ܕܲܗܘܲܝܬ݁ܝ ܐܸܡܵܐ ܒܲܒ݂ܬ݂ܘܼܠܘܼܬܹܟ݂ܝ: ܠܗܵܘ̇ ܓܵܒ݂ܘܿܠܵܐ ܕܲܓ݂ܒܲܠ ܐܵܕܵܡ ܡ̣ܢ ܐܵܕܡܬ݂ܵܐ",
          },
        ],
      },
      {
        segments: [
          {
            text: "ܫܠܵܡ ܠܹܟ݂ܝ ܡܲܪܝܲܡ! ܕܲܗܘܲܝܬ݁ܝ ܐܸܡܵܐ ܒܲܒ݂ܬ݂ܘܼܠܘܼܬܹܟ݂ܝ: ܠܗܵܘ̇ ܨܲܝܵܪܵܐ ܕܨܵܪܵܗ̇ ܠܚܵܘܵܐ ܘܝܲܗ݇ܒ݂ܵܗ̇ ܠܐܵܕܵܡ ",
          },
          { text: "܀", color: "red" },
        ],
      },
      { skipped: "[verses omitted]" },
      {
        segments: [
          {
            text: "ܫܘܼܒ݂ܚܵܐ ܠܵܟ݂ ܡܵܪܝ! ܕܲܕܢܲܚܬ݁ ܡܸܢܵܗ̇ ܘܲܗ݀ܘܲܝܬ݁ ܐ݇ܢܵܫܵܐ: ܒܲܬ݂ܪܹܝܢ ܟܝܵܢ̈ܝܼܢ ܐܵܦ ܨܸܒ݂̈ܝܵܢܝܼܢ ܩܢܲܝܬ݁ ܒܚܲܕ ܩܢܘܿܡܵܐ. ",
          },
        ],
      },
      {
        segments: [
          {
            text: "ܬܵܘܕܝܼܬ݂ܵܐ ܠܵܟ݂ ܘܠܲܐܒ݂ܘܼܟ݂ ܥܲܡܵܟ݂ ܘܲܠܪܘܼܚ ܩܘܼܕܫܵܐ: ܬܠܵܬ݂ܵܐ ܩܢܘܼܡܹ̈ܐ ܚܲܕ ܐܲܠܵܗܵܐ ܕܠܵܐ ܦܘܼܠܵܓ݂ܵܐ. ܗܵܫܵܐ ܘܲܒ݂ܟܠܙܒܲܢ ܘܲܠܥܵܠܲܡ ܥܵܠܡܝܼܢ",
          },
          { text: "܀", color: "red" },
        ],
      },
    ],
    footnotes: [
      "Text from Pareparambil, Aloysius, ed. Ordo Missae Syro-Chaldaeo-Malabaricae cum Translatione Latina. Puthenpally: M. T. S. Press, 1912., page ܣܘ. I was unable to find this hymn in the books of the Assyrian or Chaldean Churches - however, some Maronite texts seem to contain certain verses found in this one - needs more investigation.",
      "The Christology of the Church of the East propounds that in the M’shiha are two Kyane (Human and Divine natures), and two Qnome (their individuated essences), in one Parsopa (person). This hutama, if it is of eastern origin, must have been modified after the Synod of Diamper to fit the Roman Catholic understanding of Qnoma as “person” - since only one Qnoma in Christ is mentioned here.",
    ],
    youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/PVVuXMCpkJM",
  },
  {
    num: 14,
    title: "Qambel Maran",
    blocks: [
      {
        segments: [
          { text: "ܥܘܼܢܵܝܵܐ:", color: "red", role: true },
          { text: " ", color: "red" },
          {
            text: "ܩܲܒܸ݁ܠ ܡܵܪܲܢ ܗܵܢ ܩܘܼܪܒܵܢܵܐ ܠܥܸܠ ܒܲܫܡܲܝܵܐ:",
          },
          { text: " " },
          {
            text: "ܕܩܲܪܸܒ݂ܘ ܥܲܒ݂ܕܲܝ̈ܟ ܒܗܲܝܡܵܢܘܼܬܵܐ ܘܠܸܒܵܐ ܕܲܟ݂ܝܵܐ",
          },
          { text: "܀", color: "red" },
          { text: " " },
        ],
      },
      {
        segments: [
          { text: "ܒܵܬܹ̈‍ܐ:", color: "red", role: true },
          { text: " ", color: "red" },
          {
            text: "ܐܲܝܟ݂ ܩܘܼܪܒܵܢܵܐ ܕܐܲܒ݂ܵـ̈ܗܵܬ݂ܵܐ ܟܹܐܢܹ̈ܐ ܓܒܲܝ̈ܵܐ:",
          },
          { text: " " },
          {
            text: "ܢܘܿܚ ܘܐܲܒ݂ܪܵܗܵܡ ܘܐܝܼܣܚܵܩ ܘܝܲܥܩܘܿܒ݂ ܘܝܵܘܣܸܦ ܕܟܲܝ̈ܵܐ",
          },
          { text: "܀", color: "red" },
        ],
      },
      {
        segments: [
          {
            text: "ܐܲܝܟ݂ ܩܘܼܪܒܵܢܵܐ ܕܩܲܪܸܒ݂ܘ ܫܠܝܼܚܹ̈ܐ ܒܓܵܘ ܥܸܠܝܼܬ݂ܵܐ:",
          },
          { text: " " },
          {
            text: "ܢܸܥܘܿܠ ܩܕ݂ܵܡܲܝܟ ܘܢܸܗܘܸܐ ܡܩܲܒ݁ܠܵܐ ܒܹܝܬ݂ ܡܲܠܟ݁ܘܼܬ݂ܵܐ",
          },
          { text: "܀", color: "red" },
        ],
      },
    ],
    footnotes: [
      "Text from Kthawa D’theshmeshta Dahlap Annide, St. Joseph’s Press, Mannanam 1921. This hymn is also found in two editions of the Assyrian Annida text - In Ktawa d'qurastha d'annide bnay alma w'bnay edtha akhad, Baghdad, Iraq 1985, p. 365, and in Service of the Qurbana of the Dead, Mar Narsai Press, Trichur, 1984, p. ܝܓ",
      "The Assyrian text uses ܚܢܘܟ (Enoch) instead of ܢܘܚ (Noah) here. I was unable to find the Chaldean funeral text to compare.",
    ],
    youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/5oRrn-RbcY4",
  },
  {
    num: 15,
    title: "La Tekre Lakh",
    blocks: [
      {
        segments: [
          {
            text: "ܠܵܐ ܬܸܟ݂ܪܸܐ ܠܵܟ: ܟܝܵܢܵܐ ܕܲܒ݂ܠܝܼ: ܒܡܵܝܘܿܬ݂ܘܼܬ݂ܵܐ: ܘܠܵܐ ܬܸܬ݂ܦܲܠܲܓ݂: ܥܲܠ ܚܘܼܕܵܬ݂ܵܐ: ܕܦܲܓ݂ܪܵܐ ܘܢܲܦ̮ܫܵܐ",
          },
          { text: "܀", color: "red" },
        ],
      },
      {
        segments: [
          {
            text: "ܩܘܼܡ ܨܘܼܬ݂ ܩܵܠܹ̈ܐ: ܕܲܡܣܲܒ݁ܪܝܼܢ ܠܵܟ݂: ܥܲܠ ܢܘܼܚܵܡܵܐ: ܘܲܩܢܝܼ ܣܲܒ݂ܪܵܐ: ܕܗܵܘܹܐ ܣܲܒ݂ܪܵܐ: ܠܡܵܝܘܿܬ݂ܘܼܬ݂ܵܐ",
          },
          { text: "܀", color: "red" },
        ],
      },
      {
        segments: [
          {
            text: "ܫܡܲܥ ܠܲܢܒ݂ܝܵܐ: ܕܩܵܥܹܐ ܒܪܘܼܚܵܐ: ܠܓܲܪ̈ܡܹܐ ܡܝܼܬܹ̈ܐ: ܘܡܲܟ݂ܪܸܙ ܩܵܠܹܗ: ܣܒܲܪܬ݂ܵܐ ܚܕܲܬܵܐ: ܒܹܝܬ݂ ܡܵܝܘܿܬ݂ܵܐ",
          },
          { text: "܀", color: "red" },
        ],
      },
      {
        segments: [
          {
            text: "ܫܡܲܥ ܟܲܕ ܩܵܥܹܐ: ܐܲܝܟ݂ ܫܝܼܦܘܿܪܵܐ: ܨܹܝܕ ܫܲܬ݁ܝܼܩܹ̈ܐ: ܘܲܡܟܲܢܸܫ ܠܹܗ: ܠܟ݂ܠܹܗ ܦܲܓ݂ܪܵܐ: ܠܘܵܬ݂ ܚܘܼܕܵܬ݂ܵܐ",
          },
          { text: "܀", color: "red" },
        ],
      },
      {
        segments: [
          {
            text: "ܚܲܕ ܚܘܼܕܵܬ݂ܵܐ: ܐܲܟ݂ܪܸܙ ܩܵܠܹܗ: ܠܦܲܓ݂ܪܵܐ ܘܢܲܦ̮ܫܵܐ: ܘܐܲܫܩܝܼ ܐܸܢܘܿܢ: ܟܵܣ ܒܘܼܝܵܐܵܐ: ܕܚܵܝܬ݂ ܡܝܼܬܹ̈ܐ",
          },
          { text: "܀", color: "red" },
          { text: " " },
        ],
      },
      {
        segments: [
          {
            text: "ܨܘܼܬ݂ ܬܘܼܒ݂ ܩܵܠܹܗ: ܕܲܡܚܲܕܬ݂ܵܢܵܗ̇: ܕܡܵܝܘܿܬ݂ܘܼܬ݂ܵܐ: ܕܲܡܚܵܘܸܐ ܠܹܗ: ܐܲܝܟ݂ ܕܲܒ݂ܨܸܒ݂ܥܵܐ: ܠܚܘ݂ܕܵܬ݂ ܐ݇ܢܵܫܵܐ",
          },
          { text: "܀", color: "red" },
        ],
      },
      { skipped: "[remaining verses omitted]" },
    ],
    footnotes: [
      "Text from Kthawa D’theshmeshta Dahlap Annide, St. Joseph’s Press, Mannanam 1921. The text is the same in the Assyrian funeral order, where it is titled ܦܣܘܩܐ (Pasoqa). It is arranged as multiple H’paktha, with each H’paktha consisting of pairs of verses shown here. There is an ‘unaya mentioned before the body of the hymn as well, which is missing in the Malabar version (the unaya interestingly shows up in the Malayalam translation)",
    ],
    youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/rdnaCf7XeJw",
  },
  {
    num: 16,
    title: "Laika Ezal Min Ruhak (Layka Maran)",
    blocks: [
      {
        segments: [
          { text: "ܠܐܲܝܟܵܐ ܐܹܙܲܠ ܡ̣ܢ ܪܘܼܚܵܟ: ", color: "red" },
          {
            text: "ܠܐܲܝܟܵܐ ܡܵܪܲܢ ܢܸܥܪܘܿܩ ܡܸܢܵܟ. ܘܒ݂ܐܲܝܢܵܐ ܐܲܬ݂ܪܵܐ ܢܸܬ݁ܛܫܸܐ ܡ̣ܢ ܩܘܼܕ݂ܡܲܝܟ: ܫܡܲܝܵܐ ܟܘܼܪܣܝܵܟ ܘܐܲܪܥܵܐ ܟܘܼܒ݂ܫܵܟ. ܒܝܲܡܵܐ ܐܘܼܪܚܵܟ ܘܒܲܫܝܘܿܠ ܫܘܼܠܛܵܢܵܟ݂: ܐܸܢܗܘܼ ܡܵܪܝ ܕܚܲܪܬܹܗ ܕܥܵܠܡܵܐ ܡܲܛܝܲܬ݀ ܠܵܗ̇. ܒܪ̈ܲܚܡܹܐ ܢܸܗܘܸܐ ܫܘܼܠܵܡܵܐ",
          },
          { text: "܀", color: "red" },
        ],
      },
      {
        segments: [
          { text: "ܐܲܢ݇ܬ݁ ܝܵܕܲܥ ܐܲܢ݇ܬ݁ ܡܵܘܬܲܒ݂ܝ ܘܲܡܩܵܡܝ: ", color: "red" },
          {
            text: "ܝܵܕܥܲܬ݁ ܐܘܿ ܡܵܪܝ ܕܣܲܓ݁ܝܼ ܥܵܘܠܲܢ. ܘܝܵܕ݂ܥܝܼܢܲܢ ܡܵܪܝ ܕܣܲܓ݁ܝܼܐܝܼܢ ܪ̈ܲܚܡܲܝܟ: ܘܐܸܢܗܘܼ ܕܪ̈ܲܚܡܲܝܟ ܠܵܐ ܢܦܝܼܣܘܼܢܵܟ. ܟܒܲܪ ܕܹܝܢ ܣܵܦܢܲܢ ܡܸܛܠ ܒܝܼ̈ܫܵܬܲܢ. ܠܵܐ ܡܵܪܝ ܠܵܐ ܡܵܪܝ ܠܵܐ ܬܲܪܦܸܐ ܒܲܢ ܐܝܼܕܲܝ̈ܵܐ. ܕܦܲܓ݂ܪܵܟ ܘܲܕ݂ܡܵܟ ܐܵܘܟܸ݁ܠܬܵܢ",
          },
          { text: "܀", color: "red" },
        ],
      },
      {
        segments: [
          { text: "ܓܒܲܠܬܵܢܝ ܘܣܵܡܬ݁ ܥܠܲܝ ܐܝܼܕ݂ܵܟ: ", color: "red" },
          {
            text: "ܒܪܵܫܝܼܬ݂ ܒܪܲܝܬܵܢ ܘܲܒ݂ܛܲܝܒ݁ܘܼܬ݂ܵܟ. ܩܪܲܝܬܵܢ ܒܲܫܡܵܟ ܘܨܲܠܡܵܐ ܕܐܝܼܬ݂ܘܼܬ݂ܵܟ: ܠܵܐ ܢܸܬ݁ܕܲܓܲܠ ܫܘܼܘܕܵܝ ܡܸܠܲܝ̈ܟ. ܒܥܸܠܲܬ݂ ܥܵܘ̣ܠܲܢ ܕܲܣܬܲܪܢ ܬܘܼܩܵܢܵܟ: ܐܸܠܵܐ ܡܵܪܝ ܐܲܫܦܲܥ ܪ̈ܲܚܡܲܝܟ ܥܲܠ ܟܠܲܢ. ܐܲܝܟ݂ ܕܲܡܥܵܕ݂ܵܐ ܗ݇ܝܼ ܛܲܝܒ݁ܘܼܬ݂ܵܟ",
          },
          { text: "܀", color: "red" },
        ],
      },
      {
        segments: [
          { text: "ܒܲܪ݇ܬ݂ ܡܲܠܟܵܐ ܒܫܘܼܒ݂ܚܵܐ ܩܵܡܲܬ݀: ", color: "red" },
          {
            text: "ܕܵܡܝܵܐ ܥܹܕܬܵܐ ܠܝܵܘܢܵܐ ܫܒܲܪܬ݂ܵܐ. ܕܲܒ݂ܢܵܬ݀ ܩܸܢܵܗ̇ ܥܲܠ ܡܲܕ݂ܒܲܚ ܩܘܼܕ݂ܫܵܐ: ܘܲܓ݂ܙܲܡ ܥܠܹܝܗ̇ ܚܸܘܝܵܐ ܠܝܼܛܵܐ. ܕܢܸܥܩܘܿܪ ܩܸܢܵܗ̇ ܘܢܵܘܒܸ݁ܕ ܦܲܪ̈ܘܼܓܹܝܗ̇: ܠܵܐ ܡܵܪܝ ܠܵܐ ܡܵܪܝ ܠܵܐ ܬܲܪܦܸܐ ܒܵܗ̇ ܐܝܼ̈ܕܲܝܵܐ. ܕܒܲܕ݂ܡܵܟ݂ ܚܲܝܵܐ ܐܸܙܕܲܒ݂ܢܲܬ݀",
          },
          { text: "܀", color: "red" },
        ],
      },
      { skipped: "[verses omitted]" },
    ],
    footnotes: [
      "Text from Kthawa D’theshmeshta Dahlap Annide, St. Joseph’s Press, Mannanam 1921. The text in the Assyrian and Chaldean funeral texts is the same as this.",
    ],
    youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/3XiChppYhJM",
  },
  {
    num: 17,
    title: "B’had min yawmin",
    blocks: [
      {
        segments: [
          { text: "ܥܘܼܢܵܝܵܐ:", color: "red", role: true },
          { text: " ", color: "red" },
          {
            text: "ܒܚܲܕ ܡ̣ܢ ܝܵܘܡܝܼ̈ܢ ܟܲܕ ܥܵܒܲܪ ܗ݇ܘܹܝܬ݂. ܥܲܠ ܒܹܝܬ݂ ܥܲܢܝܵܐ. ܘܲܚܙܹܝܬ݂ ܬܲܡܵܢ ܡܵܪܬܵܐ ܘܡܲܪܝܲܡ ܟܲܕ ܒܲܟ݂ܝ̈ܵܢ ܗ݇ܘܲܝ̈",
          },
          { text: "܀ ", color: "red" },
          { text: "ܒܚܲܕ ܡ̣ܢ." },
        ],
      },
      {
        segments: [
          { text: "ܒܵܬܹ̈‍ܐ:", color: "red", role: true },
          { text: " ", color: "red" },
          {
            text: "ܒܵܟ݂ܝ̈ܵܢ ܗ݇ܘܲܝ̈ ܓܹܝܪ ܒܸܟܝܵܐ ܚܢܝܼܓܵܐ ܡܲܪܝܼܪܵܐܝܼܬ݂. ܐܲܝܟ ܣܝܼܪܵܢܵܣ ܕܲܒܓܵܘ ܝܲܡܡܹ̈ܐ ܘܢܲܗܪ̈ܵܘܵܬ݂ܵܐ",
          },
          { text: "܀", color: "red" },
          { text: " ܒܚܲܕ ܡ̣ܢ." },
        ],
      },
      {
        segments: [
          {
            text: "ܢܵܗ̈ܡܵܢ ܗ݇ܘܲܝ̈ ܓܹܝܪ ܒܲܕܡܘܼܬ݂ ܝܵܘܢܵܐ. ܥܲܠ ܦܲܪ̈ܘܼܓܹܝܗ̇. ܐܲܝܟ݂ ܗܵܘ ܓܲܒ݂ܪܵܐ ܕܲܫܩܝܼܠ ܡܸܢܹܗ ܒܲܪ ܣܲܝܒܘܼܬ݂ܵܐ",
          },
          { text: "܀", color: "red" },
          { text: " ܒܚܲܕ ܡ̣ܢ." },
        ],
      },
    ],
    footnotes: [
      "Text from Kthawa D’theshmeshta Dahlap Annide, St. Joseph’s Press, Mannanam 1921, p.36. This Madrasha is not present in the Assyrian funeral text. I was unable to consult the Chaldean funeral text.",
    ],
    youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/KEWj2kWGRdg",
  },
  {
    num: 18,
    title: "Etta Push Lekh",
    blocks: [
      {
        segments: [
          { text: "ܥܘܼܢܵܝܵܐ:", color: "red", role: true },
          { text: " ", color: "red" },
          {
            text: "ܥܹܕܬܵܐ ܦܘܼܫܝ ܠܹܟ݂ܝ ܒܲܫܠܵܡܵܐ ܕܐܵܙܹܠ ܐ݇ܢܵܐ ܠܝܼ. ܘܥܵܡܘܿܪ̈ܲܝܟ݁ܝ ܒܙܲܕܝܼܩܘܼܬ݂ܵܐ ܨܲܠܵܘ ܥܠܲܝ.",
          },
        ],
      },
      {
        segments: [
          { text: "ܒܵܬܹ̈‍ܐ:", color: "red", role: true },
          { text: " ", color: "red" },
          {
            text: "ܐܲܚܲܝ̈ ܘܚܲܒ݂ܪ̈ܲܝ ܘܚܲܒ݁ܝܼܒܲܝ̈ ܥܘܼܒ݂ܕ݂ܘܗܝ ܠܕ݂ܘܼܟ݂ܪܵܢܝ. ܕܦܸܪܫܹܬ݂ ܡܸܢܟ݂ܘܿܢ ܘܲܠܥܵܠܲܡ ܨܲܠܵܘ ܥܠܲܝ",
          },
          { text: "܀", color: "red" },
        ],
      },
      { skipped: "[remaining verses omitted]" },
    ],
    footnotes: [
      "Text from Kthawa D’theshmeshta Dahlap Annide, St. Joseph’s Press, Mannanam 1921. The text in the Assyrian and Chaldean funeral texts is the same as this.",
    ],
    youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/KYsqpjlf0Mk",
  },
  {
    num: 19,
    title: "Quryelaison",
    blocks: [],
    footnotes: [],
    youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/3CWBRgP7xO8",
  },
  {
    num: 20,
    title: "Ha Qes Sliwa",
    blocks: [
      {
        segments: [{ text: "ܗܵܐ ܩܹܝܣ ܨܠܝܼܒ݂ܵܐ" }],
      },
      {
        segments: [{ text: "ܕܒܹܗ ܬܠܹܐ ܦܘܼܪܩܵܢ ܥܵܠܡܵܐ" }],
      },
      {
        segments: [{ text: "ܬܵܘ ܢܸܣܓܕܝܼܘܗܝ" }],
      },
    ],
    footnotes: [
      "Text from the manuscript APSTCH MANN 00018 from Mannanam Library  folio 38r",
    ],
    youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/nyJwbknChmM",
  },
  {
    num: 21,
    title: "Shambah Leshan",
    blocks: [
      {
        segments: [
          { text: "ܫܲܒܲܚ ܠܸܫܵܢܝ ܚܲܠܵܫܵܐ: ܐ݇ܪܵܙܵܐ ܕܦܲܓܪܵܐ ܕܠܵܐ ܡܘܼܡܵܐ." },
        ],
      },
      {
        segments: [
          {
            text: "ܘܲܕܟܵܣ ܕܸܡ ܕܘܼܟܵܝ ܢܲܦ̮ܫܵܐ. ܡܚܲܕܝܵܢܵܐ ܕܟܠܹܗ ܥܵܠܡܵܐ.",
          },
        ],
      },
      { skipped: "[remaining verses omitted]" },
    ],
    footnotes: [
      "Text from manuscript APSTCH MANN 00031 folio 10r at Mannanam.",
      "This is not a word-for-word translation of Pange Lingua; each line has seven syllables.",
    ],
    youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/QJ12LUdj3mc",
  },
  {
    num: 22,
    title: "Kollan Dasne",
    blocks: [],
    footnotes: [],
    youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/jEqfppJt7AY",
  },
  {
    num: 23,
    title: "Ta Lak Ruha",
    blocks: [
      {
        segments: [
          {
            text: "ܬܵܐ ܠܵܟ ܪܘܼܚܵܐ ܒܵܪܘܿܝܵܐ ܕܟ݂ܠ: ܘܲܣܥܘܿܪ ܡܲܕܥܹ̈ܐ ܕܐܲܝܠܹܝܢ ܕܕܝܼܠܵܟ",
          },
          { text: "܀", color: "red" },
        ],
      },
      {
        segments: [
          {
            text: "ܘܲܡܠܝܼ ܛܲܝܒ݁ܘܼܬ݂ܵܐ ܥܸܠܵܝܬܵܐ: ܠܸܒܵܘ̈ܵܬ݂ܵܐ ܕܲܒ݂ܪܲܝܬ݁ ܐܸܢܘܿܢ",
          },
          { text: "܀", color: "red" },
        ],
      },
      {
        segments: [
          {
            text: "ܕܡܸܬ݂ܐܡܲܪ ܐܢ݇ܬ݁ ܦܵܪܲܩܠܹܝܛܵܐ: ܡܵܘܗܲܒ݂ܬ݂ܵܐ ܕܐܲܠܵܗܵܐ ܡܪܲܝܡܵܐ",
          },
          { text: "܀", color: "red" },
        ],
      },
      {
        segments: [
          {
            text: "ܢܸܒ݂ܥܵܐ ܚܲܝܵܐ ܢܘܼܪܵܐ ܚܘܼܒܵܐ: ܘܲܡܫܝܼܚܘܼܬ݂ܵܐ ܪܘܼܚܵܢܵܝܬܵܐ",
          },
          { text: "܀", color: "red" },
        ],
      },
      {
        segments: [
          {
            text: "ܐܢ݇ܬ݁ ܫܒ݂ܝܼܥ ܐܸܣܟܹ݁ܡܵܐ ܒܫܘܼܟܵܢܵܐ: ܨܒ݂ܥܵܐ ܕܹܝܢ ܕܝܲܡܝܼܢܵܐ ܕܐܲܒ݂ܵܐ",
          },
          { text: "܀", color: "red" },
        ],
      },
      {
        segments: [
          {
            text: "ܐܲܢ݇ܬ݁ ܛܲܟ݂ܣܵܐܝܼܬ݂ ܫܘܼܘܕܵܝ ܐܲܒ݂ܵܐ: ܕܡܲܥܬܲܪ ܒܡܹܐܡܪܵܐ ܓܲܓܲܪܬܵܐ",
          },
          { text: "܀", color: "red" },
        ],
      },
      { skipped: "[verses omitted]" },
      {
        segments: [
          {
            text: "ܢܸܗܘܸܐ ܫܘܼܒ݂ܚܵܐ ܠܐܲܠܵܗ ܐܲܒ݂ܵܐ: ܘܠܲܒ݂ܪܵܐ ܕܝܼܠܹܗ ܕܩܵܡ ܡ̣ܢ ܡܝܼ̈ܬܹܐ",
          },
          { text: "܀", color: "red" },
        ],
      },
      {
        segments: [
          {
            text: "ܘܲܠܪܘܼܚ ܩܘܼܕܫܵܐ ܦܵܪܲܩܠܹܝܛܵܐ: ܒܟ݂ܠܗܘܿܢ ܥܵܠܡܲܝ̈ ܥܵܠܡܝܼܢ ܐܵܡܹܝܢ",
          },
          { text: "܀", color: "red" },
        ],
      },
      {
        segments: [{ text: "ܩܘܼܪܝܹܠܲܝܣܘܿܢ" }, { text: ".", color: "red" }],
      },
      {
        segments: [{ text: "ܟܪܸܣܛܹܠܲܝܣܘܿܢ" }, { text: ".", color: "red" }],
      },
      {
        segments: [{ text: "ܩܘܼܪܝܹܠܲܝܣܘܿܢ" }, { text: ".", color: "red" }],
      },
    ],
    footnotes: [],
    youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/xkOvMznM_iM",
  },
  {
    num: 24,
    title: "Slam Lek",
    blocks: [],
    footnotes: [],
    youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/SVV-ZksRTHU",
  },
  {
    num: 25,
    title: "Bar Maryam",
    blocks: [],
    footnotes: [],
    youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/Mm5P6g1KaE0",
  },
  {
    num: 26,
    title: "Lakh Mar Yawsep",
    blocks: [
      {
        segments: [
          {
            text: "ܠܵܟ ܡܵܪܝ ܝܵܘܣܸܦ ܡܙܲܝܚܝܼܢ ܟܸܢܫܹ̈ܐ ܕܲܫܡܲܝܵܢܹ̈ܐ",
          },
          { text: "܀", color: "red" },
        ],
      },
      {
        segments: [
          {
            text: "ܠܵܟ݂ܘܼ ܡܙܲܡܪܝܼܢ ܬܸܓܡܹܐ ܟܠܗܘܿܢ ܕܟܪܸܝ̈ܣܛܝܵܢܹܐ",
          },
          { text: "܀", color: "red" },
        ],
      },
      {
        segments: [
          {
            text: "ܕܒܲܡܝܲܬ݁ܪ̈ܬܵܐ ܕܙܲܕܝܼܩܘܼܬ݂ܵܐ ܗܘܲܝܬ݁ ܢܲܨܝܼܚܵܐ",
          },
          { text: "܀", color: "red" },
        ],
      },
      {
        segments: [
          {
            text: "ܢܲܟ݂ܦܵܐܝܼܬ݂ ܠܵܟ ܐܸܬ݂ܡܲܟ݂ܪܲܬܸ ܗ݇ܘܵܬ݀ ܒܬ݂ܘܼܠܬܵܐ ܪܵܡܬ݂ܵܐ",
          },
          { text: "܀", color: "red" },
        ],
      },
      { skipped: "[remaining verses omitted]" },
    ],
    footnotes: [
      "Text from Methodus Officiorum Pro Diebus Festivis Collecta by Kalappurakal Andrayos Malpan, 1909, reprinted in 1959, page 177.",
    ],
    youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/i9Ft1iw58SM",
  },
  {
    num: 27,
    title: "Shambah L’marya",
    blocks: [
      {
        segments: [
          { text: "ܫܲܒܲܚܘ ܠܡܵܪܝܵܐ ܟܠܟ݂ܘܿܢ ܥܲܡܹ̈ܐ. " },
          { text: "ܗܲܠܹܠܘܼܝܵܐ ܗܲܠܹܠܘܼܝܵܐ ܗܲܠܹܠܘܼܝܵܐ. ", color: "red" },
          { text: "ܫܲܒܚܵܝܗܝ ܟܠܗܹܝܢ ܐܸܡܘܵܬ݂ܵܐ." },
          { text: " ܗܲܠܹܠܘܼܝܵܐ ܗܲܠܹܠܘܼܝܵܐ ܗܲܠܹܠܘܼܝܵܐ. ", color: "red" },
          { text: "ܫܘܼܒ݂ܚܵܐ ܠܐܲܒ݂ܵܐ ܘܠܲܒ݂ܪܵܐ ܘܲܠܪܘܼܚܵܐ ܕܩܘܼܕ݂ܫܵܐ." },
          { text: " ܗܲܠܹܠܘܼܝܵܐ ܗܲܠܹܠܘܼܝܵܐ ܗܲܠܹܠܘܼܝܵܐ. ", color: "red" },
          { text: "ܡ̣ܢ ܥܵܠܲܡ ܘܲܥܕܲܡܵܐ ܠܥܵܠܲܡ ܐܵܡܹܝܢ ܘܐܵܡܹܝܢ. " },
          { text: "ܗܲܠܹܠܘܼܝܵܐ ܗܲܠܹܠܘܼܝܵܐ ܗܲܠܹܠܘܼܝܵܐ.", color: "red" },
        ],
      },
    ],
    footnotes: ["A farced Psalm probably used as a Shuraya."],
    youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/-Y6O3rQmj1o",
  },
  {
    num: 28,
    title: "Had Min Ire",
    blocks: [
      {
        segments: [
          { text: "ܗܦܵܟ݂ܬܵܐ. ", color: "red" },
          {
            text: "ܚܲܕ ܡ̣ܢ ܥܝܼܪܹ̈ܐ ܛܥܝܼܢ ܗ݇ܘ̣ܵܐ ܐܵܬ݀ܵܐ ܕܝܲܗ݇ܒ݂ ܠܹܗ ܟܲܣܝܵܐ: ܘܡܲܨܡܲܚ ܗ݇ܘ̣ܵܐ ܒܵܗ̇ ܠܥܹܝܢ ܪ̈ܘܼܚܵܢܹܐ ܘܦܲܓ݂ܪܵܢܵܝܹܐ",
          },
          { text: "܀", color: "red" },
          { text: " " },
        ],
      },
      {
        segments: [
          {
            text: "ܚܲܕ ܪܘܼܚܵܢܵܐ ܗܘܵ݀ܐ ܐܝܼܙܓܲܕܵܐ ܒܣܘܼܒܵܪ ܒܲܛܢܹܗ: ܘܲܒ݂ܝܘܿܡ ܝܲܠܕܹܗ ܢܚܸܬ݂ܘ ܣܲܓ݁ܝܼ̈ܐܹܐ ܘܲܙܼܡܲܪܘ ܫܘܼܒܼܚܵܐ",
          },
          { text: "܀", color: "red" },
        ],
      },
    ],
    footnotes: [
      "Text from Methodus Officiorum Pro Diebus Festivis Collecta by Kalappurakal Andrayos Malpan, 1909, reprinted in 1959, page 177. Also found in Assyrian/Chaldean Hudre - See Darmo, 1961, Vol I p. ܬܩܨܛ",
    ],
    youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/-UYk5og0FBI",
  },
  {
    num: 29,
    title: "B'eda d'yawman",
    blocks: [
      {
        segments: [
          { text: "ܒܥܹܐܕܵܐ ܕܝܵܘܡܵܢ ܢܸܓܕܘܿܠ ܟܠܝܼܠܵܐ" },
          { text: ".", color: "red" },
          { text: " ܕܲܙܡܝܼܪ̈ܵܬ݂ܵܐ ܠܐܝܼܩܵܪ ܡܲܪܝܲܡ" },
          { text: "܀", color: "red" },
        ],
      },
      {
        segments: [
          {
            text: "ܠܒ݂ܝܼܫܲܬ݂ ܫܸܡܫܵܐ ܣܐܝܼܢܲܬ݂ ܣܲܗܪܵܐ ܘܐܸܣܛܪܘܿܣ ܟܠܝܼܠܵܐ ܥܲܠ ܪܹܫ ܡܲܪܝܲܡ",
          },
          { text: "܀", color: "red" },
        ],
      },
      {
        segments: [
          {
            text: "ܚܵܘܵܐ ܒܬ݂ܘܼܠܬܵܐ ܐܲܥܠܲܬ݀ ܡܵܘܬܐܵ ܚܲܝܹ̈ܐ ܝܸܗ݇ܒܲܬ݀ ܒܬ݂ܘܼܠܬܵܐ ܡܲܪܝܲܡ",
          },
          { text: "܀", color: "red" },
        ],
      },
      {
        segments: [
          { text: "ܙܠܵܦܬ݂ܵܐ ܕܟܝܼܬ݂ܵܐ ܡܣܲܬ݁ܪܲܬ݂ ܠܡܸܠܬ݂ܵܐ" },
          { text: ".", color: "red" },
          { text: " ܡܲܪܓܵܢܝܼܬ݂ܵܐ ܡܵܪܬܵܐ ܡܲܪܝܲܡ" },
          { text: "܀", color: "red" },
        ],
      },
      { skipped: "[remaining verses omitted]" },
    ],
    footnotes: [],
    youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/Ekz56gX_bkQ",
  },
];

export default function QambelMaranCD() {
  return (
    <>
      <div className="not-prose mb-8 flex justify-center">
        <Image
          src="/images/qambel-maran-cd.jpg"
          alt="Qambel Maran CD cover"
          width={320}
          height={320}
          className="rounded-lg shadow-md border border-slate-200 w-full max-w-xs h-auto"
          priority
        />
      </div>

      <h2>Introduction</h2>
      <p>
        The hymn texts from the <em>Qambel Maran</em> CD are available in
        English transliteration and translation in the CD booklet, and on the{" "}
        <a
          href="https://thecmsindia.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Christian Musicological Society of India
        </a>{" "}
        /{" "}
        <a
          href="https://aramaicproject.com/qambel-maran-syriac-chants"
          target="_blank"
          rel="noopener noreferrer"
        >
          Aramaic Project
        </a>{" "}
        website&mdash;but not in Syriac script. This article is an attempt to
        remedy that omission, presenting the texts in the original East Syriac.
      </p>
      <p>
        The Syriac text has been assembled from various sources. Liturgical
        rubrics and refrains are shown in red. Where a source omits verses,
        those gaps are noted inline. Text for hymns 19&ndash;26 is not yet
        transcribed.
      </p>

      <h2 className="not-prose text-xl font-semibold font-[family-name:var(--font-lora)] text-slate-700 mt-10 mb-6">
        Hymn texts
      </h2>

      <div className="not-prose space-y-10">
        {HYMNS.map((hymn) => (
          <section key={hymn.num}>
            <h3 className="text-lg font-semibold font-[family-name:var(--font-lora)] text-slate-800 mb-2">
              {hymn.num}. {hymn.title}
            </h3>
            <div className="ml-4">
              <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 space-y-0.5">
                {hymn.blocks.length === 0 ? (
                  <p className="text-sm italic text-muted-foreground m-0 font-[family-name:var(--font-lora)]">
                    Text to be added.
                  </p>
                ) : (
                  <HymnBlocks hymn={hymn} />
                )}
                {hymn.footnotes.length > 0 && (
                  <div className="mt-3 mb-0 border-t border-slate-200 pt-3 space-y-2">
                    {hymn.footnotes.map((fn, i) => (
                      <FootnoteItem key={i} text={fn} />
                    ))}
                  </div>
                )}
              </div>
              {hymn.youtubeEmbedSrc && (
                <RecordingEmbed
                  src={hymn.youtubeEmbedSrc}
                  title={
                    getYoutubeTitle(hymn.youtubeEmbedSrc) ??
                    `${hymn.num}. ${hymn.title}`
                  }
                />
              )}
              <HymnResourceLinks num={hymn.num} />
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
