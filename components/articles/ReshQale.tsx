"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ReshQala {
  num: number;
  name: string;
  nameSyr: string;
  nameMal: string;
  alsoKnownAs?: { latin: string; syr: string }[];
  malayalamCommonName?: { text: string; note?: string };
  structure: string;
  note?: string;
  syriacText?: {
    stanzas: { shuraya?: string; body: string }[];
    teni?: string;
  };
  link?: string;
  recordings?: {
    url: string;
    performer: string;
    hymnName?: string;
    hymnLink?: string;
  }[];
}

const Syr = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={`[font-family:'Idiqlat',serif] ${className}`}
    dir="rtl"
    style={{ fontWeight: 400, fontSynthesis: "none" }}
  >
    {children}
  </span>
);

const Mal = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={`[font-family:'Noto_Sans_Malayalam',sans-serif] ${className}`}
  >
    {children}
  </span>
);

const RETAINED: ReshQala[] = [
  {
    num: 1,
    name: "Mara d'Kolla",
    nameSyr: "ܡܵܪܵܐ ܕܟ݂ܠܵܐ",
    nameMal: "മാറാ ദ്‌കൊല്ലാ",
    alsoKnownAs: [{ latin: "Shlihe Keppa", syr: "ܫܠܝܼܚܹ̈ܐ ܟܹܐܦܵܐ" }],
    malayalamCommonName: {
      text: "മെത്തോൽ ദ്‌ഹൂയൂ / മറിയം ബ്‌സുൽത്താ",
      note: "named after a popular hymn from Wednesday Ramsha sung to this melody",
    },
    structure:
      "Each onitha has two stanzas of four lines each; seven syllables per line.",
    link: "/hymns/mara-dkolla",
    recordings: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fmara-dkolla%2Faudio%2F1767273479376.m4a?alt=media&token=7310d63b-8310-43fe-bb99-4177b8a02b78",
        performer: "Binu George",
        hymnName: "Mara d'Kolla",
      },
    ],
    syriacText: {
      stanzas: [
        {
          shuraya: "ܟܠܗܹܝܢ ܕܡ̣ܢ ܩܕ݂ܝܼܡ ܘܲܠܚܲܪܬ݂ܵܐ.",
          body: "ܡܵܪܵܐ ܕܟ݂ܠܵܐ ܠܵܟ݂ ܡܵܘ̈ܕܝܵܢ ܩܲܕ݁ܝܼ̈ܫܵܬ݂ܵܐ ܕܐܲܚܸܒ݂ ܫܡܵܟ݂. ܕܲܓ݂ܒܲܝܬ݁ ܠܡܲܪܝܲܡ ܡ̣ܢ ܓܸܢܣܗܹܝܢ. ܘܐ݇ܪܵܙ ܟܲܣܝܘܼܬ݂ܵܟ݂ ܐܲܫܪܝܼܬ݁ ܒܵܗ̇. ܕܲܒ݂ܚܹܝܠ ܪܘܼܚܵܐ ܡܸܢܵܗ̇ ܕܢܲܚ. ܡܫܝܼܚܵܐ ܦܵܪܘܿܩܹܗ ܕܥܵܠܡܵܐ. ܘܥܹܕܲܬ݂ ܩܘܼܕܫܵܐ ܗܵܐ ܡܙܲܝܚܵܐ. ܠܝܘܿܡ ܕܘܼܟ݂ܪܵܢܵܗ̇ ܕܲܒ݂ܬ݂ܘܼܠܬܵܐ",
        },
      ],
    },
  },
  {
    num: 2,
    name: "Sahde Brikhe",
    nameSyr: "ܣܵܗܕܹ̈ܐ ܒܪ̈ܝܼܟܹܐ",
    nameMal: "സഹദേ ബ്രീകേ",
    malayalamCommonName: {
      text: "ബ്രീകീത്തോൻ / സഹദേ ബ്രീകേ",
      note: "from the opening words of its shuraya",
    },
    structure:
      "Through-composed; the lines do not have a fixed syllable count, but the melody has well-defined cadential stops.",
    syriacText: {
      stanzas: [
        {
          shuraya: "ܒܪܝܼܟܼܝܼܬ̇ܘܿܢ ܠܡܵܪܝܵܐ.",
          body: "ܣܵܗܕܹ̈ܐ ܒܪ̈ܝܼܟܹܐ ܝܘܼܬ݂ܪܵܢܵܐ: ܣܲܓܝܼܐܵܐ ܚܲܫܒ̇ܘܼܗܝ ܠܡܵܘܬܵܐ. ܘܐܲܝܟ݂ ܐܝܼܩܵܪܹ̈ܐ ܘܡܵܘܗܲܒ݂ܬ݂ܵܐ: ܩܲܒܸ̇ܠܘ ܢܸܓ݂ܕܹ̈ܐ ܘܲܣܪ̈ܵܩܹܐ. ܘܗܵܫܵܐ ܒܵܬܲܪ ܡܵܘܬܲܝ̈ـܗܘܿܢ: ܠܥܵܠܡܵܐ ܡܦܲܠܓ݂ܝܼܢ ܛܵܒ݂̈ܵܬ݂ܵܐ: ܘܣܝܼܡܵܬ݂ܵܐ ܕܡܲܠ̈ܝܵܢ ܥܘܼܕ݂ܪ̈ܵܢܹܐ.",
        },
      ],
    },
    recordings: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fsahde-brikhe%2Faudio%2F1779124136877.m4a?alt=media&token=211c148b-1541-4cf1-b757-f986cfb6d093",
        performer: "Binu George",
      },
    ],
    link: "hymns/sahde-brikhe",
  },
  {
    num: 3,
    name: "Sahdaw Dawra",
    nameSyr: "ܣܵܗܕܵܘ̈ܗܝ ܕܲܒ݂ܪܵܐ",
    nameMal: "സഹദാവ് ദവ്‌റാ",
    alsoKnownAs: [{ latin: "B'endan Sapra", syr: "ܒܥܸܕܵܢ ܨܲܦܪܵܐ" }],
    malayalamCommonName: {
      text: "മറിയാ ബ്‌സപ്രാ / ബ്‌എന്ദാൻ സപ്രാ",
      note: "",
    },
    structure: "Six lines in a stanza; seven syllables per line.",
    syriacText: {
      stanzas: [
        {
          shuraya: "ܘܲܒܼܢܵܘ̈ܗܝ ܕܲܡܪܲܝܡܵܐ ܟܠܟܼܘܿܢ.",
          body: "ܣܵܗܕܵܘ̈ܗܝ ܕܲܒ݂ܪܵܐ ܩܲܕ̇ܝܼܫܵܐ: ܒܪܲܗܛܵܐ ܛܵܒ݂ܵܐ ܐܸܬ݂ܟܲܠܲܠܘ: ܒܟ݂ܵܪܘܿܙܘܼܬ݂ܵܐ ܕܲܫܪܵܪܵܐ: ܘܥܲܡ ܡܲܠܲܐܟܹ̈ܐ ܕܒܲܫܡܲܝܵܐ: ܚܵܕܹܝܢ ܘܲܡܫܲܒ̇ܚܝܼܢ ܠܐܲܠܵܗܵܐ: ܥܒ݂ܝܼܕ݂ܝܼܢ ܚܠܵܦܲܝܢ ܒܲܥܵܝܹ̈ܐ.",
        },
      ],
    },
    recordings: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fsahdaw-dawra%2Faudio%2F1779124369618.m4a?alt=media&token=b7048068-062f-4735-92b5-cb00ce15c2c8",
        performer: "Binu George",
      },
    ],
    link: "hymns/sahdaw-dawra",
  },
  {
    num: 4,
    name: "La Bahtinan",
    nameSyr: "ܠܵܐ ܒܵܗܬ݁ܝܼܢܲܢ",
    nameMal: "ലാ ബാഹ്‌ത്തീനൻ",
    alsoKnownAs: [{ latin: "Dawresh Kthawe / Kthawa Ramba", syr: "" }],
    malayalamCommonName: {
      text: "ദവ്‌റേശ് ക്സാവേ / ക്സാവാ റമ്പാ",
    },
    structure: "No fixed meter.",
    syriacText: {
      stanzas: [
        {
          shuraya: "ܒܵܟ݂ ܡܵܪܝܵܐ ܣܲܒ݁ܪܹܬ݂ ܠܵܐ ܐܸܒ݂ܪܹܬ݂ ܠܥܵܠܲܡ.",
          body: "ܠܵܐ ܒܵܗ̇ܬ݁ܝܼܢܲܢ ܝܼܫܘܿܥ ܒܲܨܠܝܼܒ݂ܵܟ݂. ܡܸܛܠ ܚܲܝܠܵܟ݂ ܪܲܒܵܐ ܕܲܟ݂ܣܸܐ ܒܹܗ. ܐܸܢ ܚܲܢܦܹ̈ܐ ܘܲܝܗܘܼܕ݂ܵܝܹ̈ܐ. ܡܒܲܙܚܝܼܢ ܒܵܗ̇ ܒܟ݂ܵܪܘܿܙܘܼܬ݂ܵܟ݂. ܐܸܠܵܐ ܠܲܡܒܲܛܵܠܘܼ ܫܪܵܪܵܐ ܡܬ݂ܘܿܡ ܠܵܐ ܡܸܫܟ݁ܚܝܼܢ. ܬܪ̈ܲܝܗܘܿܢ ܓܹܝܪ ܫܲܘܝܵܐܝܼܬ݂. ܗܵܐ ܩܵܥܹܝܢ ܥܲܠ ܙܵܟ݂ܘܼܬ݂ܵܟ݂. ܝܗ݇ܘܼܕ݂ܵܝܹ̈ܐ ܗܵܐ ܐܸܬ݂ܒܲܕܲܪܘ. ܘܝܘܼܠܦܵܢܵܐ ܕܚܲܢܦܹ̈ܐ ܐܸܫܬ݁ܪܝܼ. ܘܗܵܐ ܣܵܗ̇ܕܝܼܢ ܐܲܟܲܚ݇ܕ݂. ܕܪܲܒ݁ܘܼ ܚܲܝܠܵܟ݂ ܡܵܪܝܵܐ.",
        },
      ],
    },
    link: "hymns/la-bahtinan",
  },
  {
    num: 5,
    name: "Sahde Wayton",
    nameSyr: "ܣܵܗܕܹ̈ܐ ܗ̤ܘܲܝܬ݁ܘܿܢ",
    nameMal: "സഹദേ വൈത്തോൻ",
    structure: "Four lines in each stanza; seven syllables per line.",
    syriacText: {
      stanzas: [
        {
          shuraya: "ܫܲܒܲܚܘ ܙܲܕ̇ܝܼܩܹ̈ܐ ܠܡܵܪܝܵܐ.",
          body: "ܣܵܗܕܹ̈ܐ ܗ̤ܘܲܝܬ̇ܘܿܢ ܬܲܓܵܪܹ̈ܐ: ܘܗܵܐ ܣܝܼ̈ܡܵܬ݂ܟ݂ܘܿܢ ܒܲܫܡܲܝܵܐ. ܙܒܲܢܬ̇ܘܿܢܵܗ̇ ܠܡܲܪܓܵܢܝܼܬ݂ܵܐ: ܒܲܕ݂ܡܵܐ ܕܐܲܪܕܝܼܘ ܨܵܘܪ̈ܲܝܟ̇ܘܿܢ.",
        },
        {
          shuraya: "ܘܠܲܬ݂ܪ̈ܝܼܨܹܐ ܝܵܐܝܵܐ ܬܸܫܒ݁ܘܿܚܬܵܐ.",
          body: "ܣܵܗܕܹ̈ܐ ܕܐܸܬ݂ܥܲܠܝܼܘ ܘܲܡܛܵܘ: ܠܐܘܿܪܸܫܠܸܡ ܗܵܝ ܕܒܲܫܡܲܝܵܐ. ܘܙܲܒ݂ܢܘܼܗܝ ܒܲܕ݂ܡܵܐ ܕܨܵܘܪ̈ܲܝܗܘܿܢ: ܠܐܲܬ݂ܪܵܐ ܕܠܹܗ̤ܘ ܡܣܲܟܹ݁ܝܢ ܗ݇ܘ̣ܵܘ.",
        },
      ],
    },
    recordings: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fsahde-waython-thangare%2Faudio%2F1779125270060.m4a?alt=media&token=4ca08b23-0a1a-4bc2-a69c-d57a6a8d8bcb",
        performer: "Binu George",
      },
    ],
    link: "/hymns/sahde-waython-thangare",
  },
  {
    num: 6,
    name: "Estappanos",
    nameSyr: "ܐܸܣܛܲܦܵܢܘܿܣ",
    nameMal: "എസ്ത്തപ്പാനോസ്",
    structure: "Four lines in a stanza; seven syllables per line.",
    syriacText: {
      stanzas: [
        {
          shuraya: "ܕܘܼܟ݂ܪܵܢܵܐ ܠܥܵܠܲܡ ܢܸܗܘܹܐ ܠܙܲܕܝܼܩܵܐ.",
          body: "ܐܸܣܛܲܦܵܢܘܿܣ ܐܘܼܪܚܵܐ ܕܪܲܫ: ܘܲܒ݂ܥܸܩܒ݂ܵܬܹ̈ܗ ܪܕ݂ܵܘ ܣܵܗܕܹ̈ܐ. ܘܥܲܡܹܗ ܕܚܲܬ݂ܢܵܐ ܡܸܬ݂ܒܲܣܡܝܼܢ: ܒܲܓ݂ܢܘܿܢ ܢܘܼܗܪܵܐ ܕܠܵܐ ܡܸܫܬ݁ܪܸܐ.",
        },
        {
          shuraya: "ܘܡ̣ܢ ܛܸܒܵܐ ܒܝܼܫܵܐ ܠܵܐ ܢܸܕ݂ܚܲܠ.",
          body: "ܐܸܣܛܲܦܵܢܘܿܣ ܟܲܕ݂ ܐܸܬ݂ܪܓܸܡ: ܙܝܼܘܵܐ ܕܡܵܪܹܗ ܒܪܵܘܡܵܐ ܚܙܵܐ. ܘܲܠܪܘܼܚܩܘܼܕ݂ܫܵܐ ܟܲܕ݂ ܓܵܕ݂ܠܵܐ: ܟܠܝܼܠܵܐ ܠܪܹܫܵܐ ܕܲܡܗܲܝܡܢܹ̈ܐ.",
        },
      ],
    },
    recordings: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Festhapanos-urha-drash%2Faudio%2F1779125470261.m4a?alt=media&token=f753507e-05bf-4704-a3ac-292671f0961c",
        performer: "Binu George",
      },
    ],
    link: "/hymns/esthapanos-urha-drash",
  },
  {
    num: 7,
    name: "Yada'a Hushawe",
    nameSyr: "ܝܵܕܲܥ ܚܘܼܫܵܒܹ̈ܐ",
    nameMal: "യാദാ ഹൂശാവേ",
    malayalamCommonName: {
      text: "ബാഹർ ലെമ്പാ / യാദാ ഹൂശാവേ",
    },
    structure: "",
    syriacText: {
      stanzas: [
        {
          shuraya: "ܒܵܚܲܪ ܠܸܒܵܐ ܘܟ݂ܠ̈ܝܵܬ݂ܵܐ.",
          body: "ܝܵܕܲܥ ܚܘܼ̈ܫܵܒܹܐ ܕܟ݂ܠܗܘܿܢ ܒܢܲܝܢܵܫܵܐ. ܘܒܵܚܲܪ ܟܲܣ̈ܝܵܬ݂ܵܐ ܕܠܸܒܵܘ̈ܵܬ݂ܵܐ. ܐܲܢ݇ܬ݁ܘܼ ܝܵܕܲܥ ܡܚܝܼܠܘܼܬܲܢ. ܐܸܬ݂ܪܲܚܲܡ ܥܠܲܢ.",
        },
      ],
    },
    link: "/hymns/yadaa-hushawe",
  },
  {
    num: 8,
    name: "Thuwe l'Ruhak",
    nameSyr: "ܛܘܼܒܹܝܗ̇ ܠܪܘܼܚܵܟ݂",
    nameMal: "തൂവേ ല്റൂഹാക്",
    alsoKnownAs: [
      { latin: "Malka Mshiha Paroqan", syr: "ܡܲܠܟܵܐ ܡܫܝܼܚܵܐ ܦܵܪܘܿܩܲܢ" },
    ],
    malayalamCommonName: {
      text: "ഏറംറമ്മാക് / മൽക്കാ മ്ശിഹാ പാറോക്കൻ",
    },
    structure: "Four lines in a stanza; seven syllables per line.",
    syriacText: {
      stanzas: [
        {
          shuraya: "ܠܘܵܬ݂ܵܟ݂ ܡܵܪܝܵܐ ܢܲܦ̮ܫܝ ܐܲܪܝܼܡܹ̇ܬ݂.",
          body: "ܡܼܿܠܟܵܐ ܡܫܝܼܚܵܐ ܦܵܪܘܿܩܲܢ. ܒܝܘܿܡ ܡܹܐܬ݂ܝܼܬ݂ܵܟ݂ ܢܲܚܸܡܲܝܢܝ. ܘܐܲܩܝܼܡܲܝܢܝ ܡ̣ܢ ܝܲܡܝܼܢܵܟ݂. ܒܝܵܘܡܵܐ ܕܕܼܵܢ̇ܚܵܐ ܪܲܒ݁ܘܼܬ݂ܵܟ݂.",
        },
        {
          shuraya: "ܐܲܠܵܗܝ ܒܵܟ݂ ܣܲܒ݁ܪܹܬ݂ ܠܵܐ ܐܸܒ݂ܗܲܬ݂.",
          body: "ܣܲܓ݂ܕܝܼܢܲܢ ܡܵܪܝ ܠܲܨܠܝܼܒ݂ܵܟ݂. ܕܒܹܗ ܩܝܵܡܬܲܢ ܘܒܹܗ ܢܘܼܚܵܡܲܢ. ܘܒܹܗ ܡܸܬ݂ܢܲܚܡܝܼܢ ܥܲܢܝܼ̈ܕܲܝܢ. ܘܠܵܒ݂ܫ̇ܝܼܢ ܫܘܼܒ݂ܚܵܐ ܦܲܓ݂ܪ̈ܲܝܗܘܿܢ.",
        },
      ],
    },
    link: "/hymns/malka-mshiha-paroqan",
  },
  {
    num: 9,
    name: "Ithya Dawremze",
    nameSyr: "ܐܝܼܬ݂ܝܵܐ ܕܲܒ݂ܪܸܡܙܹܗ",
    nameMal: "ഇസ്‌യാ ദവ്‌റെംസേ",
    malayalamCommonName: {
      text: "ഹാവ് ദീസാവ് / ഇസ്‌യാ ദവ്‌റെംസേ",
    },
    structure: "Two stanzas of three lines each; five syllables per line.",
    syriacText: {
      stanzas: [
        {
          shuraya: "ܗ̇ܘ ܕܐܝܼܬ݂ܵܘܗܝ ܡ̣ܢ ܩܕ݂ܵܡ ܥܵܠܡܹ̈ܐ.",
          body: "ܐܝܼܬ݂ܝܵܐ ܕܲܒ݂ܪܸܡܙܹܗ: ܬܲܩܸܢ ܟܠ ܒܸܪ̈ܝܵܢ: ܢܲܛܲܪ ܠܲܟ݂ܝܵܢܲܢ. ܨܲܠܡܵܟ ܟܲܢܝܼܬܵܝܗܝ: ܘܒܲܕ݂ܡܘܼܬ݂ܵܟ ܒܪܲܝܬܵܝܗܝ: ܒܪ̈ܲܚܡܲܝܟ ܚܘܼܣ ܥܠܵܘܗܝ܀",
        },
      ],
    },
    link: "/hymns/ithya-dawremze",
  },
  {
    num: 10,
    name: "Push Bashlama",
    nameSyr: "ܦܘܼܫ ܒܲܫܠܵܡܵܐ",
    nameMal: "പൂശ് ബശ്‌ലാമാ",
    structure: "Four lines in a stanza; eight syllables per line.",
    syriacText: {
      stanzas: [
        {
          shuraya: "ܡܸܟܹ݁ܝܠ ܗܵܫܵܐ ܫܵܒܹܩ ܐ݇ܢܵܐ ܠܟ݂ܘܿܢ ܐܲܚܲܝ̈ ܨܲܠܵܘ ܥܠܲܝ.",
          body: "ܦܘܼܫ ܒܲܫܠܵܡܵܐ: ܥܘܼܡܪܵܐ ܕܙܲܒ݂ܢܵܐ: ܕܠܵܐ ܡܨܸܐ ܦܵܪܹܩ: ܠܲܕܩܵܢܹܝܢ ܠܹܗ. ܕܐܹܙܲܠ ܘܐܸܚܙܹܝܘܗܝ: ܠܐܲܬ݂ܪܵܐ ܕܢܘܼܗܪܵܐ: ܕܲܡܕܲܝܪܝܼܢ ܒܹܗ: ܟܹܐܢܹ̈ܐ ܕܲܥܡܲܠܘ܀",
        },
      ],
    },
    link: "/hymns/push-bashlama",
  },
  {
    num: 11,
    name: "Ha Shwan",
    nameSyr: "ܗܵܐ ܫܒ݂ܵܢܝ",
    nameMal: "ഹാ ശ്വാൻ",
    malayalamCommonName: {
      text: "എസ്ക്കർക്കൂൻ / മറിയാ കൊലഹോൻ; പ്രോക്ക് മറിയാ / ഹാ ഗ്‌മർ താവാ",
    },
    structure: "",
    syriacText: {
      stanzas: [
        {
          shuraya: "ܐܲܠܵܗܵܐ ܦܲܨܵܢܝ ܡ̣ܢ ܐܝܼܕܹܗ ܕܪܲܫܝܼܥܵܐ.",
          body: "ܡܵܪܝܵܐ ܗܵܐ ܫܒ݂ܵܢܝ ܒܝܼܫܵܐ ܡ̣ܢ ܡܲܪܥܝܼܬ݂ܵܟ݂ ܘܥܲܒ݂ܕܲܢܝ ܕܝܼܠܹܗ. ܒܝܲܕ ܪܲܦܝܘܼܬ݂ܵܐ ܕܚܘܼ̈ܫܵܒܲܝ. ܘܡܵܐ ܕܐܵܠܹܨ ܠܝܼ ܐܸܬ݂ܩܲܪܒܹܬ݂ ܠܵܟ݂. ܘܡܵܐ ܕܲܦܪܲܩܬܵܢܝ ܦܢܹܝܬ݂ ܥܲܠ ܚܵܘ̈ܒܲܝ ܩܲܕܡܵܝܹ̈ܐ. ܘܗܵܐ ܡܸܫܬܲܢܲܩ ܐ݇ܢܵܐ ܒܣܘܿܓ݂ܵܐܐ ܕܒ݂ܝܼ̈ܫܵܬ݂ܝ ܕܲܣܓ݂ܝܼ ܚܘܼܒܵܠܹܗ ܕܲܩܢܘܿܡܝ. ܘܠܵܐ ܥܵܢܵܐ ܠܝܼ ܟܹܐܢܘܼܬ݂ܵܟ݂. ܕܐܸܢܵܐ ܫܵܛܹܬ݂ ܦܘܼ̈ܩܕܵܢܲܝܟ ܛܵܒ݂ܵܐ ܕܓܲܒ݂ܠܲܢܝ ܡ̣ܢ ܥܲܦܪܵܐ ܣܝܼܡ ܠܵܗܿ ܥܨܵܒ݂ܵܐ ܠܲܟ݂ܪܝܼܗܘܼܬ݂ܝ. ܕܠܵܐ ܐܸܦܸܠ ܒܐܝܼܕܲܝ̈ ܒܝܼܫܵܐ. ܘܲܢܚܲܠܸܨ ܥܘܼܬ݂ܪܵܐ ܕܚܘܼ̈ܫܵܒܲܝ ܡܵܕ݂ܵܢ ܚܘܼܣ ܥܠܲܝ.",
        },
      ],
    },
    link: "/hymns/ha-shwan",
  },
  {
    num: 12,
    name: "Layka Maran",
    nameSyr: "ܠܐܲܝܟܵܐ ܡܵܪܲܢ",
    nameMal: "ലൈക്കാ മാറൻ",
    malayalamCommonName: {
      text: "ലൈക്കാ ഏസൽ / ലൈക്കാ മാറൻ",
    },
    structure: "",
    syriacText: {
      stanzas: [
        {
          shuraya: "ܠܐܲܝܟܵܐ ܐܹܙܲܠ ܡ̣ܢ ܪܘܼܚܵܟ.",
          body: "ܠܐܲܝܟܵܐ ܡܵܪܲܢ ܢܸܥܪܘܿܩ ܡܸܢܵܟ݂. ܘܒܲܐܝܢܵܐ ܐܲܬ݂ܪܵܐ ܢܸܬ݁ܛܫܸܐ ܡ̣ܢ ܩܘܼܕܡܲܝܟ: ܫܡܲܝܵܐ ܟܘܼܪܣܝܵܟ ܘܐܲܪܥܵܐ ܟܘܼܒ݂ܫܵܟ. ܒܝܲܡܵܐ ܐܘܼܪܚܵܟ ܘܒܲܫܝܘܿܠ ܫܘܼܠܛܵܢܵܟ: ܐܸܢܗܘܼ ܡܵܪܝ ܕܚܲܪܬܹܗ ܕܥܵܠܡܵܐ ܡܲܛܝܲܬ݀ ܠܵܗ̇. ܒܪ̈ܲܚܡܹܐ ܢܸܗܘܸܐ ܫܘܼܠܵܡܵܐ܀",
        },
      ],
    },
    link: "/hymns/layka-maran",
  },
  {
    num: 13,
    name: "Mshiha Paroqe d'Alma",
    nameSyr: "ܡܫܝܼܚܵܐ ܦܵܪܘܿܩܹܐ ܕܥܵܠܡܵܐ",
    nameMal: "മ്ശിഹാ പാറോക്കേ ദ്‌അൽമാ",
    malayalamCommonName: {
      text: "ഹാലേൻ കൊലഹേൻ / മ്ശിഹാ പാറോക്കേ",
    },
    structure: "Two stanzas, four lines each; seven syllables per line.",
    syriacText: {
      stanzas: [
        {
          shuraya: "ܗܵܠܹܝܢ ܟܠܗܹܝܢ ܓܕܲܫ̈ ܠܲܢ ܘܠܵܐ ܛܥܲܝܢܵܟܼ.",
          body: "ܡܫܝܼܚܵܐ ܦܵܪܘܿܩܹܗ ܕܥܵܠܡܵܐ: ܡܲܠܟܵܐ ܪܲܒܵܐ ܕܬܸܫܒ̇ܘܿܚܬܵܐ: ܣܵܗܕܹ̈ܐ ܕܪܲܚܡܘܼܗܝ ܘܗܲܝܡܸܢܘ ܒܹܗ: ܠܐܵܟܹܠܩܲܪܨܵܐ ܐܲܒ݂ܗܸܬ݂ܘ ܗ݇ܘ̣ܵܘ. ܘܥܲܡ ܡܲܠܲܐܟܹ̈ܐ ܚܵܕܹܝܢ ܒܲܡܪ̈ܵܘܡܹܐ: ܘܲܩܕ݂ܵܡ ܐܲܠܵܗܵܐ ܩܵܝܡܝܼܢ: ܘܲܠܒ݂ܥܸܠܕܲܪܵܐ ܘܲܠܚܲܝܠܹܗ: ܬܚܘܿܬ݂ ܪܸ̈ܓ݂ܠܲܝܗܘܿܢ ܫܲܥܒܸܕ݂ܘ ܗ݇ܘ̣ܵܘ.",
        },
      ],
    },
    recordings: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fmshiha-paroqe-dalma%2Faudio%2F1779124798989.m4a?alt=media&token=95ab823d-111f-430c-acda-26068f51abab",
        performer: "Binu George",
      },
    ],
    link: "/hymns/mshiha-paroqe-dalma",
  },
  {
    num: 14,
    name: "Awun d'washmayya",
    nameSyr: "ܐܲܒ݂ܘܼܢ ܕܒܲܫܡܲܝܵܐ",
    nameMal: "ആവൂൻ ദ്‌വശ്‌മയ്യാ",
    alsoKnownAs: [
      { latin: "Sahde Qandishe Sallaw", syr: "ܣܵܗܕܹ̈ܐ ܩܲܕܝܼܫܹ̈ܐ ܨܲܠܵܘ" },
    ],
    malayalamCommonName: {
      text: "അൽ മദ്‌ബഹ് കുദ്‌ശാ",
    },
    structure: "Four lines in a stanza; five syllables per line.",
    syriacText: {
      stanzas: [
        {
          shuraya: "ܗ̇ܘ ܕܐܝܬ݂ܵܘܗܝ ܡ̣ܢ ܩܕ݂ܵܡ ܥܵܠܡܹ̈ܐ.",
          body: "ܐܲܒ݂ܘܼܢ ܕܒܲܫܡܲܝܵܐ ܢܸܬ݂ܩܲܕܲܫ ܫܡܵܟ݂. ܬܹܐܬܸܐ ܡܲܠܟ݁ܘܼܬ݂ܵܟ݂ ܢܸܗܘܸܐ ܨܸܒ݂ܝܵܢܵܟ݂.",
        },
        {
          shuraya: "ܚܲܕ݂ܘܼ ܘܠܲܝܬ݁ ܐ݇ܚܪܹܝܢ ܠܲܒܲܪ ܡܸܢܸܗ.",
          body: "ܚܲܕ݂ܘܼ ܡܵܪܝܵܐ ܚܕ݂ܵܐ ܗܲܝܡܵܢܘܼܬ݂ܵܐ. ܚܕ݂ܵܐ ܡܲܥܡܘܿܕܝܼܬ݂ܵܐ ܠܫܘܼܒ݂ܩܵܢܵܐ ܕܚܵܘܒܹ̈ܐ.",
        },
      ],
    },
    recordings: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fsahde-qandishe-sallaw-al-shayna%2Faudio%2F1779123434625.m4a?alt=media&token=93ea705f-912c-44f0-b4e5-74334a8b62fa",
        performer: "Binu George",
        hymnName: "Sahde Qandishe Sallaw",
        hymnLink: "/hymns/sahde-qandishe-sallaw-al-shayna",
      },
    ],
    link: "/hymns/awun-dwashmayya-qyamta-onitha",
  },
  {
    num: 15,
    name: "Am Kolhon",
    nameSyr: "ܥܲܡ ܟܠܗܘܿܢ",
    nameMal: "അം കൊലഹോൻ",
    malayalamCommonName: {
      text: "ഹന്ദാ നവ്‌ശേ / അം കൊലഹോൻ",
    },
    structure: "",
    syriacText: {
      stanzas: [
        {
          shuraya: "ܚܲܕܵܐ ܢܲܦܫܹܗ ܕܥܲܒ݂ܕܵܟ.",
          body: "ܥܲܡ ܟܠܗܘܿܢ ܩܲܕܝܼܫܲܝ̈ܟ: ܐܲܢܝܼܚ ܡܲܠܟܵܐ ܡܫܝܼܚܵܐ: ܠܪܘܼܚܹܗ ܕܥܲܒ݂ܕܵܟ ܒܲܫܠܵܡܵܐ. ܐܲܝܟܵܐ ܕܠܵܐ ܡܲܡܠܸـܟ ܚܲܫܵܐ: ܘܠܵܐ ܥܵܩܬ݂ܵܐ ܘܠܵܐ ܟܲܪܝܘܼܬ݂ܵܐ: ܐܸܠܵܐ ܚܲܝܹ̈ܐ ܡܠܝܼܟܹ̈ܐ ܕܲܠܥܵܠܲܡ܀",
        },
      ],
    },
    link: "/hymns/am-kolhon-qandishayk",
  },
  {
    num: 16,
    name: "Hannana Dapthih",
    nameSyr: "ܚܲܢܵܢܵܐ ܕܲܦܬ݂ܝܼܚ",
    nameMal: "ഹന്നാനാ ദപ്‌സീഹ്",
    alsoKnownAs: [
      { latin: "Mshiha Ethiled", syr: "ܡܫܝܼܚܵܐ ܐܸܬ݂ܝܼܠܸܕ" },
      { latin: "Sliwa Dahwa Lan", syr: "ܨܠܝܼܒ݂ܵܐ ܕܲܗܘ̤ܵܐ ܠܲܢ" },
      { latin: "Nawsa d'Ruhqudsha", syr: "ܢܵܘܣܵܐ ܕܪܘܼܚܩܘܼܕܫܵܐ" },
    ],
    malayalamCommonName: {
      text: "ഉവേഹൂ നെഹ്‌ദേ / സ്ലീവാ ദഹ്‌വാ ലൻ",
    },
    structure: "Four lines in a stanza; five syllables per line.",
    syriacText: {
      stanzas: [
        {
          shuraya: "ܦܬܲܚܠܝܼ ܬܲܪ̈ܥܹܐ ܕܙܲܕ݁ܝܼܩܘܼܬ݂ܵܐ.",
          body: "ܚܲܢܵܢܵܐ ܕܲܦܬ݂ܝܼܚ ܬܲܪܥܹܗ ܠܬܲܝܵܒܹ̈ܐ. ܘܩܵܪܹܐ ܠܚܲܛܵܝܹ̈ܐ ܕܨܹܐܕ݂ܵܘܗܝ ܢܸܬ݂ܩܲܪܒ݂ܘܼܢ. ܦܬܲܚ ܠܲܢ ܡܵܪܝ ܬܲܪܥܵܐ ܕܪ̈ܲܚܡܹܐ ܕܢܸܥܘܿܠ ܒܹܗ. ܘܢܸܙܡܲܪ ܠܵܟ݂ ܫܘܼܒ݂ܚܵܐ ܒܠܸܠܝܵܐ ܘܒ݂ܐܝܼܡܵܡܵܐ.",
        },
      ],
    },
    link: "/hymns/hannana-dapthih",
  },
  {
    num: 17,
    name: "Nuhra w'war Nuhra",
    nameSyr: "ܢܘܼܗܪܵܐ ܘܒܲܪ ܢܘܼܗܪܵܐ",
    nameMal: "നുഹ്‌റാ ഉവർ നുഹ്‌റാ",
    malayalamCommonName: {
      text: "ശാമാ ഉലാ",
    },
    structure: "",
    syriacText: {
      stanzas: [
        {
          shuraya: "ܐܲܢܗܲܪ ܥܲܝ̈ܢܲܝ ܕܠܵܐ ܐܸܕ݂ܡܲܟ݂ ܠܡܵܘܬܵܐ.",
          body: "ܢܘܼܗܪܵܐ ܘܒܲܪ ܢܘܼܗܪܵܐ: ܫܪܸܐ ܒܢܘܼܗܪܵܐ ܘܥܵܡܲܪ ܒܢܘܼܗܪܵܐ: ܐܲܫܘܵܢܝ ܠܗܵܘ̇ ܢܘܼܗܪܵܐ: ܕܠܵܐ ܡܲܕܪܸܟ݂ ܠܹܗ ܚܸܫܘܿܟ݂ܵܐ.",
        },
      ],
    },
    link: "/hymns/nuhra-wwar-nuhra",
  },
  {
    num: 18,
    name: "Lakhu Qareynan",
    nameSyr: "ܠܵܟ݂ܘܼ ܩܵܪܹܝܢܲ",
    nameMal: "ലാകൂ കാറേനൻ",
    alsoKnownAs: [{ latin: "Brikhu Ramb Kumre", syr: "ܒܪܝܼܟ݂ܘܼ ܪܲܒ݁ܟ݁ܘܼܡܪܹ̈ܐ" }],
    structure: "",
    syriacText: {
      stanzas: [
        {
          shuraya: "ܩܪܹܝܬ݂ܵܟ݂ ܡܵܪܝܵܐ ܒܟ݂ܠܝܘܿܡ.",
          body: "ܠܵܟ݂ܘܼ ܩܵܪܹܝܢܲܢ ܐܸܬ݂ܪܲܚܲܡܥܠܲܝܢ ܡܫܝܼܚܵܐ ܦܵܪܘܿܩܲܢ",
        },
      ],
    },
    link: "/hymns/lakhu-qareynan",
  },
  {
    num: 19,
    name: "Maran Athe",
    nameSyr: "ܡܵܪܲܢ ܐܵܬܹܐ",
    nameMal: "മാറൻ ആസേ",
    structure: "",
    syriacText: {
      stanzas: [
        {
          shuraya: "ܚܕܝܼܬ݂ ܟܲܕ݂ ܐܲܡ̇ܪܝܼܢ ܗ݇ܘ̣ܵܘ ܠܝܼ.",
          body: "ܡܵܪܲܢ ܐܵܬܹ̇ܐ ܘܲܡܢܲܚܸܡ ܡܝܼ̈ܬܹܐ. ܘܥܵܒܹ̇ܕ݂ ܣܲܒ݂ܪܵܐ ܠܟ݂ܠܗܘܿܢ ܥܲܢܝܼ̈ܕܲܝܢ.",
        },
        {
          shuraya: "ܠܒܲܝܬܹܗ ܕܡܵܪܝܵܐ ܐܵܙܠَܝܼܢܲܢ.",
          body: "ܒܪܝܼܟ݂ܘܼ ܕܥܲܒ݂ܕܹܗ ܠܡܵܘܬܵܐ ܕܠܵܐ ܫܘܼܚܕܵܐ. ܕܛܵܒܹ̈ܐ ܘܒ݂ܝܼܫܹ̈ܐ ܕܵܒܲܪ ܫܲܘܝܵܐܝܼܬ݂.",
        },
      ],
    },
    link: "/hymns/maran-athe",
  },
  {
    num: 20,
    name: "Mambu Hayye",
    nameSyr: "ܡܲܒ݁ܘܼܥ ܚܲܝܹ̈ܐ",
    nameMal: "മമ്പൂ ഹയ്യേ",
    structure:
      "Opens with a free-verse section, followed by any number of metered lines of eight syllables each, and closes with a fixed concluding statement.",
    syriacText: {
      stanzas: [
        {
          shuraya: "ܬܵܘ ܫܡܲܥܘ ܘܐܸܫܬܲܥܸܐ ܠܟ݂ܘܿܢ.",
          body: "ܡܲܒ݁ܘܼܥ ܚܲܝܹ̈ܐ ܕܠܵܐ ܫܘܼܠܵܡܵܐ ܗܘܵ݀ܐ ܝܘܼܠܦܵܢܹܗ ܕܲܡܫܝܼܚܵܐ ܡܵܪܲܢ ܒܓ݂ܵܘ ܥܵܠܡܵܐ. ܘܐܲܝܟ݂ ܕܡ̣ܢ ܡܲܒ݁ܘܼܥ ܦܲܪܕܲܝܣܵܐ ܠܐܲܪܒ݁ܥܵܐ ܪܹ̈ܫܝܼܢ ܦܪܲܫܘ. ܘܟ݂ܠ ܚܲܕ݂ ܡܸܢܗܘܿܢ ܐܸܫܬܲܕܲܪܘ ܠܐܲܬ݂ܪܵܐ ܨܲܗܝܵܐ ܀ ܡܲܬܲܝ ܦܝܼܫܘܿܢ ܠܥܸܒ݂ܪ̈ܵܝܹܐ. ܐܼܿܪܕܝܼ ܚܲܝܹ̈ܐ ܕܠܵܐ ܫܘܼܠܵܡܵܐ: ܘܡܲܪܩܘܿܣ ܕܸܩܠܲܬ݂ ܠܪ̈ܗ݇ܘܿܡܵܝܹܐ. ܐܲܥܬܲܪ ܗ݇ܘ̣ܵܐ ܒܫܸܩܝܵܐ ܕܦܸܬ݂ܓ݂ܵܡܵܘ̈ܗܝ. ܘܠܘܼܩܵܐ ܓܝܼܚܘܿܢ ܠܡܸܨܪ̈ܵܝܹܐ. ܚܲܦܸܛ ܐܸܢܘܿܢ ܠܡܸܬܲܠ ܦܹܐܪܹ̈ܐ. ܘܝܘܿܚܲܢܵܢ ܐܲܝܟ݂ ܢܲܗܪܵܐ ܦܪܵܬ݂. ܠܐܵܦܸܣܵܝܹ̈ܐ ܐܸܫܬܲܕܲܪ ܗ݇ܘ̣ܵܐ ܀ ܘܐܲܟ݂ܪܸܙ ܘܐܲܠܸܦ ܥܲܠ ܡܸܠܬܹܗ ܕܐܲܒ݂ܵܐ. ܕܐܸܬ݂ܓ݁ܠܝܼ ܒܐ݇ܢܵܫܘܼܬܲܢ ܠܹܗ ܬܸܫܒ݁ܘܿܚܬܵܐ",
        },
      ],
    },
    link: "/hymns/mambua-hayye",
  },
];

const NOT_RETAINED: ReshQala[] = [
  {
    num: 1,
    name: "M'ina d'tawatha",
    nameSyr: "ܡܥܝܼܢܵܐ ܕܛܵܒ݂̈ܵܬ݂ܵܐ",
    nameMal: "മ് ഈനാ ദ്‌ താവാസാ",
    alsoKnownAs: [{ latin: "B'madnahay sapra", syr: "ܒܡܲܕ݂ܢܵܚܲܝ̈ ܨܲܦܪܵܐ" }],
    structure: "",
    syriacText: {
      stanzas: [
        {
          shuraya: "ܡܸܛܠ ܕܡܲܒ݂ܘܼܥܵܐ ܕܚܲܝܹ̈ܐ ܥܲܡܵܟ݂ ܗ݇ܘ̣.",
          body: "ܡܥܝܼܢܵܐ ܕܛܵܒ݂̈ܵܬ݂ܵܐ ܘܲܠܡܹܐܢܵܐ ܕܟ݂ܠ ܥܘܼܕ݂ܪܵܢܝܼܢ. ܐܝܼܬܹܝܗ̇ ܡܲܪܝܲܡ ܠܓܸܢܣܵܐ ܕܡܵܝܘܿܬܹ̈ܐ. ܒܚܲܝܠܵܐ ܕܲܨܠܘܿܬ݂ܵܗ̇. ܢܸܬ݂ܢܛܲܪ ܡ̣ܢ ܢܸܟ݂ܝܵܢܹ̈ܐ. ܘܢܸܗܘܸܐ ܥܲܡܵܗ̇ ܝܵܪ̈ܬܹ݁ܐ ܒܡܲܠܟܘܼܬ݂ܵܐ.",
        },
      ],
    },
    link: "/hymns/mina-dtawatha",
  },
  {
    num: 2,
    name: "Talmidaw Damshiha",
    nameSyr: "ܬܲܠܡܝܼܕ݂ܵܘ̈ܗܝ ܕܲܡܫܝܼܚܵܐ",
    nameMal: "തൽമീദാവ് ദമ്ശിഹാ",
    alsoKnownAs: [{ latin: "Awdaw Le", syr: "ܐܵܘܕܵܘ ܠܹܗ" }],
    structure: "",
    syriacText: {
      stanzas: [
        {
          shuraya: "ܐܸܙܕܲܗ݇ܪܘ ܘܠܵܐ ܬܸܚܛܘܿܢ.",
          body: "ܬܲܠܡܝܼܕ݂ܵܘ̈ܗܝ ܕܲܡܫܝܼܚܵܐ ܘܲܒ݂ܢܲܝ̈ ܐ݇ܪܵܙܹܗ. ܐܸܙܕܲܗ݇ܪܘ ܡ̣ܢ ܚܘܼܠܛܵܢܵܐ ܕܥܲܡ ܚܲܢ̈ܦܹܐ ܘܥܲܡ ܟܵܦܘܿܪܹ̈ܐ. ܕܲܠܡܵܐ ܬܸܣܬܲܪܲܩ ܗܲܝܡܵܢܘܼܬ݂ܟ݂ܘܿܢ ܘܡܲܥܡܘܿܕܝܼܬ݂ܵܐ ܕܲܢܣܲܒ݂ܬ݁ܘܿܢ. ܒܲܥ̈ܝܵܕܹܐ ܕܩܵܢܹܝܬ݁ܘܿܢ ܡܸܢܗܘܿܢ. ܡܚܲܒ̈ܠܵܢܹܐ ܕܦܲܓ݂ܪܵܐ ܘܲܕܢܲܦ̮ܫܵܐ.",
        },
      ],
    },
    link: "/hymns/thalmidaw-damshiha",
  },
  {
    num: 3,
    name: "Haw d'withuthe",
    nameSyr: "ܗܵܘ̇ ܕܒ݂ܐܝܼܬ݂ܘܼܬܹܗ",
    nameMal: "ഹാവ് ദ്‌വീസൂസേ",
    alsoKnownAs: [{ latin: "Baslotha Damwarakhta", syr: "ܒܨܠܘܬܗ ܕܡܒܪܟܬܐ" }],
    structure: "",
    note: "This melody was probably adapted from the Chaldean tradition, as it is quite similar to the Chaldean version.",
    syriacText: {
      stanzas: [
        {
          shuraya: "ܗܵܘ̇ ܕܐܝܼܬ݂ܵܘܗܝ ܡ̣ܢ ܩܕܵܡ ܥܵܠܡܹ̈ܐ.",
          body: "ܗܵܘ̇ ܕܒ݂ܐܝܼܬ݂ܘܼܬܹܗ ܡܫܲܠܡܵܢܵܐ ܐܲܠܵܗܵܐ ܡܸܠܬ݂ܵܐ. ܐܲܣܓ݁ܝܼ ܚܢܵܢܹܗ ܠܘܵܬ݂ ܫܸܦܠܲܢ ܢܣܲܒ݂ ܠܲܟ݂ܝܵܢܲܢ ܘܚܲܝܕܹܗ ܒܲܩܢܘܿܡ ܐܲܠܵܗܘܼܬܹܗ ܀ ܘܲܣܒܲܠ ܚܲܫܹܗ ܕܲܙܩܝܼܦܵܐ. ܕܲܒ݂ܡܵܘܬܹ݁ܗ ܢܲܚܸܐ ܠܓܸܢܣܲܢ. ܘܲܣܠܸܩ ܘܝܼܬܸܒ݂ ܒܲܫܡܲܝܵܐ. ܠܥܸܠ ܡ̣ܢ ܐܲܪ̈ܟ݁ܘܿܣ ܘܫܘܼܠܛܵܢܹ̈ܐ. ܕܐܲܝܟ݂ ܕܒ݂ܵܐܕ݂ܵܡ ܩܲܕ݂ܡܵܐ ܐܸܬ݂ܚܲܝܲܒ݇ܢ. ܒܐܵܕ݂ܵܡ ܕܲܬ݂ܪܹܝܢ ܐܸܙܕܲܕܲܩ݇ܢ. ܘܲܠܕ݂ܵܪܹܗ ܡܫܲܒ݁ܚܵܐ ܡܲܢܘܼ ܡܸܫܟܲܚ ܕܢܸܫܬܲܥܸܐ ܀ ܗܵܟܲܢܵܐ ܡܫܲܒ݁ܚܝܼܢܲܢ. ܘܒ݂ܝܼܕܲܥܬܵܐ ܗܲܝܡܸܢܢܲܢ. ܘܲܒ݂ܬܸܕܡܘܼܪܬܵܐ ܡܵܘܕܹܝܢܲܢ. ܐܲܟ݂ܡܵܐ ܕܝܼܠܸܦ݂ܢܲܢ ܒܲܫܪܵܪܵܐ܀ ܐܵܦܠܵܐ ܓܹܝܪ ܡܲܠܲܐܟ݂ܵܐ ܡ̣ܢ ܪܵܘܡܵܐ. ܐܸܢܗܘ݀ ܕܢܹܐܬܸܐ ܘܢܹܐܡܲܪ ܠܲܢ. ܘܲܢܫܲܚܠܸܦ ܠܲܢ ܒܲܣܒܲܪܬܹܗ. ܠܒܲܪ ܡ̣ܢ ܡܵܐ ܕܐܸܣܬܲܒܲܪܢܲܢ : ܠܵܐ ܟܵܦܪܝܼܢܲܢ ܒܐ݇ܢܵܫܘܼܬܹܗ. ܘܠܵܐ ܡܲܚܫܝܼܢܲܢ ܠܐܲܠܵܗܘܼܬܹܗ.",
        },
      ],
    },
    link: "/hymns/haw-dwithuthe",
  },
  {
    num: 4,
    name: "Raza Ramba",
    nameSyr: "ܐ݇ܪܵܙܵܐ ܪܲܒܵܐ",
    nameMal: "റാസാ റമ്പാ",
    structure: "",
    syriacText: {
      stanzas: [
        {
          shuraya: "ܗܵܘ ܕܐܝܼܬ݂ܵܘܗܝ ܡ̣ܢ ܩܕ݂ܵܡ ܥܵܠܡܹ̈ܐ.",
          body: "ܐ݇ܪܵܙܵܐ ܪܲܒܵܐ ܕܲܟ݂ܣܸܐ ܗ݇ܘ̣ܵܐ ܡ̣ܢ ܕܵܪܹ̈ܐ ܘܡ̣ܢ ܫܲܪ̈ܒ݂ܵܬ݂ܵܐ. ܒܚܲܪܬ݂ܵܐ ܕܥܵܠܡܹ̈ܐ ܠܲܢ ܐܸܬ݂ܓ݁ܠܝܼ. ܝܼܚܝܼܕ݂ܵܝܵܐ ܓܹܝܪ ܗܵܘ̇ ܕܐܝܼܬ݂ܵܘܗܝ ܒܥܘܼܒܵܐ ܕܝܵܠܘܿܕܹܗ ܐܸܬ݂ܵܐ ܘܲܢܣܲܒ݂ ܕܡܘܼܬ݂ܵܐ ܕܥܲܒ݂ܕܵܐ ܒܛܲܝܒ݁ܘܼܬܹܗ. ܘܗܘ݀ ܐܸܫܬܲܥܝܼ ܘܲܓ݂ܠܵܐ ܠܲܢ ܥܲܠ ܗܲܝܡܵܢܘܼܬ݂ܵܐ ܓܡܝܼܪܬܵܐ ܕܲܬ݂ܠܝܼܬ݂ܵܝܘܼܬ݂ܵܐ.",
        },
      ],
    },
    link: "/hymns/raza-ramba",
  },
  {
    num: 5,
    name: "Sahde Qandishe L'wishay",
    nameSyr: "ܣܵܗܕܹ̈ܐ ܩܲܕܝܼܫܹ̈ܐ ܠܒ݂ܝܼܫܲܝ̈",
    nameMal: "സഹദേ കന്ദീശേ ല് വീശയ്",
    alsoKnownAs: [
      {
        latin: "Shlihe Qandishe L'wishay",
        syr: "ܫܠܝܼܚܹ̈ܐ ܩܲܕܝܼܫܹܐ ܠܒ݂ܝܼܫܲܝ̈",
      },
    ],
    structure: "",
    syriacText: {
      stanzas: [
        {
          shuraya: "ܒܟܼܠܵܗ̇ ܐܲܪܥܵܐ ܢܸܦܩܲܬ̤ ܣܒܲܪܬ̇ܗܘܿܢ.",
          body: "ܣܵܗܕܹ̈ܐ ܩܲܕܝܼܫܹ̈ܐ ܠܒܼܝܼܫܲܝ̈ ܢܘܼܗܪܵܐ: ܠܐܲܪܒܲܥܦܸܢܝܵܬܹ̈ܗ ܕܥܵܠܡܵܐ ܢܦܲܩܘ ܗ݇ܘ̣ܵܘ ܠܲܡܣܲܒܵܪܘܼ. ܬܠܝܼܬܼܵܝܘܼܬ݂ܵܐ ܡܫܲܒܲܚܬܵܐ: ܐܲܒ݂ܵܐ ܘܲܒ݂ܪܵܐ ܘܪܘܼܚܩܘܼܕ݂ܫܵܐ.",
        },
      ],
    },
    recordings: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fsahde-qandishe-lwishay-nuhra%2Faudio%2F1779124595627.m4a?alt=media&token=616becf6-d167-4e2b-b081-eac5e06068d0",
        performer: "Binu George",
      },
    ],
    link: "/hymns/sahde-qandishe-lwishay-nuhra",
  },
  {
    num: 6,
    name: "Mshiha La Tahme",
    nameSyr: "ܡܫܝܼܚܵܐ ܠܵܐ ܬܲܗܡܸܐ",
    nameMal: "മ്ശിഹാ ലാ തഹ്‌മേ",
    structure: "",
    syriacText: {
      stanzas: [
        {
          shuraya: "ܠܵܐ ܬܲܗܦܸܟܼ ܐܲܦܲܝ̈ܟ ܡܸܢܲܢ.",
          body: "ܡܫܝܼܚܵܐ ܠܵܐ ܬܲܗܡܸܐ ܡܸܢܲܢ. ܘܠܵܐ ܬܲܪܚܸܩ ܡ̣ܢ ܣܵܓܼܘܿܕܵܝ̈ܟ. ܕܒܼܵܟܼܘܼ ܡܵܪܝ ܐܸܬܼܓܵܘܲܣܢܲܢ. ܕܲܒܲܪܲܝܢ ܒܐܘܼܪܚܵܟܼ ܕܚܲܝܹ̈ܐ. ܕܲܢܙܲܡܲܪ ܠܵܟܼ ܟܠܲܢ ܬܸܫܒ̇ܘܿܚܬܵܐ ܡܵܪܝܵܐ ܐܲܠܵܗܵܐ.",
        },
      ],
    },
    link: "/hymns/mshiha-la-tahme",
  },
  {
    num: 7,
    name: "Kol Neshma",
    nameSyr: "ܟܠ ܢܸܫܡܵܐ",
    nameMal: "കോൽ നെശ്‌മാ",
    structure: "",
    syriacText: {
      stanzas: [
        {
          shuraya: "ܒܟ݂ܠ ܢܸܫܡܵܐ ܢܫܲܒܲܚ ܠܡܵܪܝܵܐ.",
          body: "ܟܠ ܢܸܫܡܵܐ ܘܟܠ ܒܸܪ̈ܝܵܬ݂ܵܐ ܠܵܟ݂ ܣܵـ̈ܓ݂ܕܵܢ. ܕܐܲܢَܬ݁ܘܼ ܠܗܹܝܢ ܢܘܼܗܪܵܐ ܓܲܐܝܵܐ ܘܲܡܚܲܕܬ݂ܵܢܵܐ.",
        },
      ],
    },
    link: "/hymns/kol-neshma",
  },
  {
    num: 8,
    name: "Mannu Sapeq",
    nameSyr: "ܡܲܢܘܼ ܣܵܦܹܩ",
    nameMal: "മന്നൂ സാപേക്ക്",
    alsoKnownAs: [{ latin: "Pthahlan Maran", syr: "ܦܬܲܚܠܲܢ ܡܵܪܲܢ" }],
    structure: "",
    syriacText: {
      stanzas: [
        {
          shuraya: "ܬܵܘ ܢܫܲܒܲܚ ܠܡܵܪܝܵܐ.",
          body: "ܡܲܢܘܼ ܣܵܦܹܩ ܥܵܒ݂ܘܿܕܲܢ ܕܢܵܘܕܸܐ ܚܠܵܦܲܝܢ ܠܲܡܪܲܚܡܵܢܘܼܬ݂ܵܟ݂. ܕܲܒ݂ܫܘܼܪܵܝܵܐ ܒܨܲܠܡܵܟ݂ ܝܲܩܝܼܪܵܐ ܐܲܬ݂ܩܸܬܵܢ. ܘܲܒ݂ܚܲܪܬ݂ܵܐ ܕܙܲܒ݂ܢܹ̈ܐ ܠܒܸܫܬܲܢ. ܘܐܲܦܢܝܼܬܵܢ ܠܝܼܕܲܥܬ݂ܵܟ݂. ܡܵܘܪܸܒ݂ ܓܸܢܣܲܢ ܫܘܼܒ݂ܚܵܐ ܠܵܟ݂.",
        },
      ],
    },
    link: "/hymns/mannu-sapeq",
  },
  {
    num: 9,
    name: "Lelya Mekkel",
    nameSyr: "ܠܸܠܝܵܐ ܡܸܟܹܝܠ",
    nameMal: "ലെലിയാ മെക്കേൽ",
    structure: "",
    syriacText: {
      stanzas: [
        {
          shuraya: "ܠܸܠܝܵܐ ܠܠܸܠܝܵܐ ܡܚܵܘܸܐ ܡܲܕ݁ܥܵܐ.",
          body: "ܠܸܠܝܵܐ ܡܸܟܹܝܠ ܥܵܒܲܪ ܠܹܗ؛ ܘܐܝܼܡܵܡܵܐ ܩܪܸܒ݂ ܘܲܡܛ̣ܵܐ ܠܹܗ. ܐܸܬ݁ܬ݁ܥܝܼܪܘ ܐܲܚܲܝ̈ ܘܩܘܼܡܘ ܨܲܠܵܘ: ܥܲܕ݂ ܐܝܼܬ݂ ܠܟ݂ܘܿܢ ܐܲܬ݂ܪܵܐ. ܕܡܵܪܲܢ ܐܸܡܲܪ ܒܲܣܒܲܪܬܹܗ: ܕܩܵܪܹܐ ܠܝܼ ܥܵܢܹܐ ܐ݇ܢܵܐ ܠܹܗ. ܘܲܕ݂ܢܵܩܹܫ ܦܵܬܲܚ ܐ݇ܢܵܐ ܠܹܗ: ܘܗܵܘܹ̇ܝܢ ܥܠܵܘܗܝ ܪ̈ܲܚܡܹܐ.",
        },
      ],
    },
    link: "/hymns/lelya-mekkel",
  },
  {
    num: 10,
    name: "Udranan Dilan",
    nameSyr: "ܥܘܼܕ݂ܪܵܢܲܢ ܕܝܼܠܲܢ",
    nameMal: "ഉദ്‌റാനൻ ദീലൻ",
    structure: "",
    syriacText: {
      stanzas: [
        {
          shuraya: "ܥܘܼܕ݂ܪܵܢܲܢ ܒܲܫܡܹܗ ܕܡܵܪܝܵܐ.",
          body: "ܥܘܼܕ݂ܪܵܢܲܢ ܕܝܼܠܲܢ ܐܝܼܬ݂ܵܘܗܝ ܡ̣ܢ ܠܘܵܬ݂ ܐܲܠܵܗܵܐ. ܗܵܘ̇ ܕܲܒ݂ܝܲܕ ܪ̈ܲܚܡܵܘܗܝ ܪܵܕܹܐ ܠܟ݂ܠܲܢ. ܟܲܕ ܗܘ݀ܝܘܼ ܝܵܗܘܿܒ݂ܵܐ ܕܚܲܝܲܝ̈ܢ. ܠܵܐ ܗܵܟܹܝܠ ܢܸܦܣܘܿܩ ܣܲܒ݂ܪܵܐ ܕܦܘܼܪܩܵܢܵܐ ܕܢܲܦ̮ܫ̈ܵܬܲܢ. ܐܸܠܵܐ ܢܸܩܥܸܐ ܘܢܹܐܡܲܪ. ܢܲܛܲܪ ܠܲܢ ܡܵܪܝ ܒܲܚܢܵܢܵܟ݂ ܘܪܲܚܸܡ ܥܠܲܝܢ.",
        },
      ],
    },
    link: "/hymns/udranan-dilan",
  },
  {
    num: 11,
    name: "Hannana Wamle Rahme",
    nameSyr: "ܚܲܢܵܢܵܐ ܘܲܡܠܸܐ ܪ̈ܲܚܡܹܐ",
    nameMal: "ഹന്നാനാ വമ് ലേ റഹ്‌മേ",
    alsoKnownAs: [{ latin: "Hedyath Maryam", syr: "ܚܸܕܝܲܬ݀ ܡܲܪܝܲܡ" }],
    structure: "",
    syriacText: {
      stanzas: [
        {
          shuraya: "ܐܲܢܗܲܪ ܐܲܦܲܝ̈ܟ ܘܢܸܬܼܦܪܸܩ.",
          body: "ܚܲܢܵܢܵܐ ܘܲܡܠܸܐ ܪ̈ܲܚܡܹܐ. ܠܵܐ ܬܲܗܡܸܐ ܚܝܵܪܵܟܼ ܡܸܢܲܢ. ܘܫܲܕܲܪ ܠܲܢ ܡ̣ܢ ܒܹܝܬܼ ܓܲܙܵܟܼ. ܚܢܵܢܵܐ ܘܪ̈ܲܚܡܹܐ ܘܦܘܼܪܩܵܢܵܐ.",
        },
      ],
    },
    link: "/hymns/hannana-wamle-rahme",
  },
  {
    num: 12,
    name: "La Mettalmin",
    nameSyr: "ܠܵܐ ܡܸܬ݁ܛܲܠܡܝܼܢ",
    nameMal: "ലാ മെത്തൽമീൻ",
    structure: "",
    syriacText: {
      stanzas: [
        {
          shuraya: "ܥܵܒܹܕ݂ ܕܝܼܢܵܐ ܠܲܛܠܝܼܡܹ̈ܐ.",
          body: "ܠܵܐ ܡܸܬ̇ܛܲܠܡܝܼܢ ܥܲܡܠܲܝ̈ܟ̇ܘܿܢ ܣܵܗܕܹ̈ܐ: ܘܠܵܐ ܥܵܒܲܪ ܡܲܠܟܵܐ ܡܫܝܼܚܵܐ ܕܲܪܚܸܡܬ̇ܘܿܢܵܝܗܝ. ܕܒܲܐܪܥܵܐ ܣܝܼܡܝܼܢ ܓܲܪ̈ܡܲܝܟ̇ܘܿܢ ܕܐܸܬ݂ܢܲܨܲܚܘ: ܘܒܲܣܦܲܪ ܚܲܝܹ̈ܐ ܫܡܵܗܲܝ̈ܟ̇ܘܿܢ ܪ̈ܵܚܡܵܘܗܝ ܕܲܒܼܪܵܐ.",
        },
      ],
    },
    recordings: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fla-metthalmin%2Faudio%2F1779217771190.m4a?alt=media&token=c8f3fc1b-7a45-4849-8770-dd653e821d62",
        performer: "Binu George",
      },
    ],
    link: "/hymns/la-metthalmin",
  },
  {
    num: 13,
    name: "Brikh Hayla",
    nameSyr: "ܒܪܝܼܟ݂ ܚܲܝܠܵܐ",
    nameMal: "ബ്രീക് ഹൕലാ",
    structure: "",
    syriacText: {
      stanzas: [
        {
          shuraya: "ܐܹܒܲܪܸܟܼ ܠܡܵܪܝܵܐ ܒܟܼܠܙܲܒܲܢ.",
          body: "ܒܪܝܼܟܼ ܚܲܝܠܵܐ ܟܲܣܝܵܐ ܕܲܫܪܸܐ ܒܓܲܪ̈ܡܲܝܗܘܿܢ ܕܣܵܗܕܹ̈ܐ: ܣܝܼܡܝܼܢ ܓܹܝܪ ܒܩܲܒ݂ܪ̈ܲܝܗܘܿܢ: ܘܪܵܕ݂ܦܝܼܢ ܫܹܐܕܹ̈ܐ ܡ̣ܢ ܥܵܠܡܵܐ. ܒܝܘܼܠܦܵܢܗܘܿܢ ܒܲܛܸܠܘ ܛܘܼܥܝܲܝ ܟܠܵܗ̇ ܕܲܓ݂ܠܝܼܦܹ̈ܐ: ܘܣܵܥܪܝܼܢ ܟܲܣܝܵܐܝܼܬ݂ ܠܲܒ݂ܪܝܼܬ݂ܵܐ ܘܡܲܠܦܝܼܢ ܠܡܸܣܓܲܕ݂ ܠܵܟܼ: ܡܵܪܝܵܐ ܕܐܲܢ݇ܬ̇ܘܼ ܒܲܠܚܘܿܕܲܝܟ.",
        },
      ],
    },
    recordings: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fbrikh-hayla-kasya%2Faudio%2F1779124703528.m4a?alt=media&token=b5d859b4-54fd-4eea-b77e-e6b30e44ce54",
        performer: "Binu George",
      },
    ],
    link: "/hymns/brikh-hayla-kasya",
  },
  {
    num: 14,
    name: "Lakh Dayyana",
    nameSyr: "ܠܵܟ݂ ܕܲܝܵܢܵܐ",
    nameMal: "ലാക് ദയ്യാനാ",
    structure: "",
    syriacText: {
      stanzas: [
        {
          shuraya: "ܙܲܕܝܼܩܲܬ̇ ܡܵܪܝܵܐ ܘܛܵܒܼ ܬܪܝܼܨܝܼܢ ܕܝܼܢܲܝ̈ܟ.",
          body: "ܠܵܟܼ ܕܲܝܵܢܵܐ ܡܙܲܕܸܩ ܡܲܓܵܢ. ܡܲܓܼܥܸܠ ܐَܢܵܐ ܠܵܟܼ ܡܘܼܡܵܘ̈ܗܝ ܕܲܩܢܘܿܡܝ. ܗܲܒ݂ܠܝܼ ܓܲܠܝܘܼܬܼ ܐܲܦܹ̈ܐ ܒܹܝܬܼ ܕܝܼܢܵܐ. ܒܪ̈ܲܚܡܹܐ ܕܫܲܠܚܘܼܟܼ ܨܹܝܕ ܓܸܢܣܲܢ ܘܪܲܚܸܡܥܠܲܝ.",
        },
      ],
    },
    link: "/hymns/lakh-dayyana",
  },
  {
    num: 15,
    name: "Sahde Qandishe Dethqattal",
    nameSyr: "ܣܵܗܕܹ̈ܐ ܩܲܕܝܼܫܹ̈ܐ ܕܐܸܬ݂ܩܲܛܲܠܘ",
    nameMal: "സഹദേ കന്ദീശേ ദെസ്‌ക്കത്തൽ",
    structure: "",
    syriacText: {
      stanzas: [
        {
          shuraya: "ܡܸܛܠܵܬܼܵܟܼ ܐܸܬ݂ܩܲܛܲܠܢ ܟܠܝܘܿܡ.",
          body: "ܣܵܗܕܹ̈ܐ ܩܲܕܝܼܫܹ̈ܐ ܕܐܸܬ݂ܩܲܛܲܠܘ: ܡܸܛܠ ܚܘܼܒܹ̇ܗ ܕܲܡܫܝܼܚܵܐ. ܡܦܝܼܣܝܼܢܲܢ ܥܲܠ ܟܠܲܢ: ܒܥܵܘ ܪ̈ܲܚܡܹܐ ܡ̣ܢ ܐܲܠܵܗܵܐ.",
        },
        {
          shuraya: "ܒܲܫܡܲܝܵܐ ܘܒܲܪܥܵܐ.",
          body: "ܢܵܨܚܝܼܢ ܥܲܡܠܲܝ̈ܟ݁ܘܿܢ ܘܲܡܚܲܕܸܐ ܠܲܢ: ܥܘܼܗܕܵܢܵܐ ܕܬܲܟ݂ܬ݁ܘܼܫܲܝ̈ܟ݁ܘܿܢ. ܕܲܚܠܵܦ ܡܫܝܼܚܵܐ ܐܸܬ݂ܩܲܛܲܠܬ݁ܘܿܢ: ܘܥܲܡܹܗ ܒܪܵܘܡܵܐ ܬܲܡܠ̱ܟ݂ܘܿܢ.",
        },
      ],
    },
    recordings: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fsahde-qandishe-dethqathal%2Faudio%2F1779125122899.m4a?alt=media&token=294b86fd-99f3-421f-b341-3022fc8a8847",
        performer: "Binu George",
      },
    ],
    link: "/hymns/sahde-qandishe-dethqathal",
  },
  {
    num: 16,
    name: "Attu Nuhra",
    nameSyr: "ܐܲܢ݇ܬ݁ܘܼ ܢܘܼܗܪܵܐ",
    nameMal: "അത്തൂ നുഹ്‌റാ",
    alsoKnownAs: [
      { latin: "L'kolhon Hattaye", syr: "ܠܟܠܗܘܿܢ ܚܲܛܵܝܹ̈ܐ" },
      { latin: "Madbhakh Marya", syr: "ܡܲܕܒܚܵܟ݂ ܡܵܪܝܱܵ" },
    ],
    structure: "",
    syriacText: {
      stanzas: [
        {
          shuraya: "ܫܲܒܲܚܘ.",
          body: "ܐܲܢ݇ܬ݁ܘܼ ܢܘܼܗܪܵܐ ܡܫܲܕܲܪ ܐܲܢ݇ܬ݁ ܠܥܵܠܡܵܐ ܟܠܹܗ ܡ̣ܢ ܣܵܟܹܗ. ܒܝܲܕ ܪܸܡܙܵܐ ܕܨܸܒ݂ܝܵܢܵܟ݂. ܘܲܠܚܸܫܘܿܟ݂ܵܐ ܕܠܸܠܝܵܐ ܡܲܥܒܲܪ ܦܘܼܩܕܵܢܵܟ݂ ܡܵܪܝܵܐ. ܡ̣ܢ ܥܲܡܵܐ ܕܡܵܘܕܸܐ ܠܵܟ݂. ܠܵܐ ܡܵܪܝ ܬܲܗܡܸܐ. ܐܸܠܵܐ ܦܪܘܿܩܲܝܢ ܘܪܲܚܸܡ ܥܠܲܝܢ.",
        },
      ],
    },
    link: "/hymns/attu-nuhra",
  },
  {
    num: 17,
    name: "Byad Shalama",
    nameSyr: "ܒܝܲܕ ܫܠܵܡܵܐ",
    nameMal: "ബ്യദ് ശ്‌ലാമാ",
    structure: "",
    syriacText: {
      stanzas: [
        {
          shuraya: "ܐܹܡܲܠܸܠ ܥܠܲܝܟ݁ܝ ܫܠܵܡܵܐ.",
          body: "ܒܝܲܕ݂ ܫܠܵܡܵܐ ܕܐܸܡܲܪ ܥܝܼܪܵܐ ܡܲܪܝܲܡ ܐܸܬ݂ܪܲܗܒܲܬ݀. ܒܗܵܝ ܕܠܵܐ ܚܟ݂ܝܼܡ ܗ݇ܘ̣ܵܐ ܠܵܗ̇ ܓܲܒ݂ܪܵܐ ܒܚܹܝܠ ܪܘܼܚܵܐ ܒܸܛܢܲܬ݀. ܫܠܵܡܵܐ ܒܐܲܪܥܵܐ ܘܫܘܼܒ݂ܚܵܐ ܒܲܫܡܲܝܵܐ. ܘܣܲܒ݂ܪܵܐ ܛܵܒ݂ܵܐ ܠܟ݂ܠܗܹܝܢ ܒܸܪ̈ܝܵܬ݂ܵܐ. ܒܪܝܼܟ݂ܘܼ ܝܼܚܝܼܕܵܝܹܗ ܕܐܲܒ݂ܵܐ ܕܲܒ݂ܐ݇ܢܵܫܘܼܬܲܢ ܕܢܲܚ. ܘܝܲܗ݇ܒ݂ ܠܘܼܒܵܒ݂ܵܐ ܠܓܸܢܣܵܐ ܕܡܵܝܘܿܬܹ̈ܐ.",
        },
      ],
    },
    link: "/hymns/byad-shlama",
  },
  {
    num: 18,
    name: "Nettayaw",
    nameSyr: "ܢܸܬ݁ܛܲܝܲܒ݂",
    nameMal: "നെത്തയ്യവ്",
    alsoKnownAs: [{ latin: "Bra Mshiha", syr: "" }],
    structure: "",
    syriacText: {
      stanzas: [
        {
          shuraya: "ܡܛܲܝܲܒ݂ ܗ݇ܘ̣ ܠܹܒ݁ܝ ܐܲܠܵܗܵܐ ܡܛܲܝܲܒ݂ ܗ݇ܘ̣ ܠܹܒܵܝ.",
          body: "ܢܸܬ݁ܛܲܝܲܒ݂ ܒܕܸܚ̣ܠܬ݂ܵܐ ܘܲܒ݂ܪܸܚܡܬ݂ܵܐ ܠܡܵܘܗܲܒ݂ܬܵܐ ܕܚܝܼܠܬܵܐ ܕܐ݇ܪܵܙܵܘܗܝ ܕܲܡܫܝܼܚܵܐ. ܘܲܠܢܲܦ̮ܫܵܬܲܢ ܒܲܥܒ݂ܵܕܹ̈ܐ ܢܨܲܒܸ݁ܬ݂. ܕܲܒ݂ܗܘܿܢ ܢܪܲܥܹܝܘܗܝ ܠܕܲܝܵܢܵܐ ܕܟ݂ܠܵܐ . ܕܲܢܚܘܼܣܥܠܲܝܢ ܡܵܐ ܕܕ݂ܵܐܹܢ ܫܲܪ̈ܒ݂ܵܬܹܗ ܕܥܵܠܡܵܐ.",
        },
      ],
    },
    link: "/hymns/nettaiyaw",
  },
  {
    num: 19,
    name: "Shlama Nesge Lakh",
    nameSyr: "ܫܠܵܡܵܐ ܢܸܣܓܸ݁ܐ ܠܵܟ݂",
    nameMal: "ശ്‌ലാമാ നെസ്‌ഗെ ലാക്",
    structure: "",
    syriacText: {
      stanzas: [
        {
          shuraya: "ܫܲܒܲܚܘ ܠܡܵܪܝܵܐ ܟܠܵܗ̇ ܐܲܪܥܵܐ.",
          body: "ܫܠܵܡܵܐ ܢܸܣܓܸܐ ܠܵܟ݂ ܥܲܡܹܗ ܕܐܲܠܵܗܵܐ. ܕܲܡܫܝܼܚܵܐ ܐܸܬ݂ܝܼܠܸܕ݂ ܢܘܼܗܪܹܗ ܕܥܵܠܡܵܐ.",
        },
      ],
    },
    link: "/hymns/shlama-nesge-lakh",
  },
  {
    num: 20,
    name: "L'zandiqe La Qrayt",
    nameSyr: "ܠܙܲܕ݁ܝܼܩܹ̈ܐ ܠܵܐ ܩܪܲܝܬ݁",
    nameMal: "ല് സന്ദീക്കേ ലാ ക്രൈത്ത്",
    structure: "",
    syriacText: {
      stanzas: [
        {
          shuraya: "ܙܲܕܝܼܩܲܬ݁ ܡܵܪܝܵܐ ܘܛܵܒ݂ ܬܪܝܼܨܝܼܢ ܕܝܼܢܲܝ̈ܟ.",
          body: "ܠܙܲܕܝܼ̈ܩܹܐ ܠܵܐ ܩ̣ܪܲܝܬ݁ ܠܲܬ݂ܝܵܒ݂ܘܼܬܵܐ. ܐܸܠܵܐ ܠܚܲܛܵܝܹ̈ܐ ܐܸܡܲܪܬ݁ ܕܲܢܬ݂ܘܼܒ݂ܘܼܢ. ܐܲܦܢܵܢ ܒܲܚܢܵܢܵܟ݂ ܡܫܝܼܚܵܐ ܦܵܪܘܿܩܲܢ. ܘܚܲܣܵܐ ܒܛܲܝܒ݁ܘܼܬ݂ܵܟ݂ ܚܵܘ̈ܒܲܝܢ ܘܲܚܛܵܗܲܝ̈ܢ.",
        },
      ],
    },
    link: "/hymns/lzandiqe-la-qrayt",
  },
  {
    num: 21,
    name: "Sagdin Lakh Yaldaw D'adam",
    nameSyr: "ܣܵܓ݂ܕܝܼܢ ܠܵܟ݂ ܝܲܠܕܵܘ̈ܗܝ ܕܐܵܕ݂ܵܡ",
    nameMal: "സാഗ്‌ദീൻ ലാക് യൽദാവ് ദാദം",
    structure: "",
    syriacText: {
      stanzas: [
        {
          shuraya: "ܡ̣ܢ ܡܲܕ݂ܢ̱ܚܵܐ ܘܡ̣ܢ ܡܲܥ̱ܪܒ݂ܵܐ.",
          body: "ܣܵܓ݂ܕܝܼܢ ܠܵܟ݂ ܝܲܠܕܵܘ̈ܗܝ ܕܐܵܕ݂ܵܡ. ܣܲܒ݂ܪܵܐ ܘܚܲܝܹ̈ܐ ܕܡܵܝܘܿܬܹ̈ܐ. ܕܲܩܝܵܡܬܵܐ ܕܡܝܼ̈ܬܹܐ ܒܲܢܒ݂ܝܹ̈ܐ ܘܫܠܝܼܚܹ̈ܐ ܡܠܲܟ݂ܬ݁. ܘܲܒ݂ܦܲܓ݂ܪܵܐ ܕܝܼܠܵܟ݂ ܡܵܪܵܐ ܕܟܹܐܢܹ̈ܐ. ܒܲܥ̇ܒ݂ܵܕ݂ܵܐ ܗܘ̤ܵܐ ܢܘܼܚܵܡܵܐ ܠܓܸܢܣܲܢ ܘܐܸܬ݂ܚܢܸܢ.",
        },
      ],
    },
    link: "/hymns/sagdinan-lakh-yaldaw-dadam",
  },
  {
    num: 22,
    name: "Shlama l'sahde",
    nameSyr: "ܫܠܵܡܵܐ ܠܣܵܗܕܹ̈ܐ",
    nameMal: "ശ്‌ലാമാ ല് സഹദേ",
    structure: "",
    syriacText: {
      stanzas: [
        {
          shuraya: "ܕܡܡܲܠܸܠ ܫܠܵܡܵܐ ܥܲܠ ܥܲܡܹܗ ܘܥܲܡ ܙܲܕܝܼܩܵܘ̈ܗܝ.",
          body: "ܫܠܵܡܵܐ ܠܣܵܗܕܹ̈ܐ ܘܲܠܓܲܪ̈ܡܲܝܗܘܿܢ ܐܝܼܩܵܪܵܐ: ܘܲܠܡܵܪܗܘܿܢ ܫܘܼܒܼܚܵܐ: ܘܠܲܢ ܒܲܨܠܘܿܬ݂ܗܘܿܢ ܥܘܼܕ݂ܪ̈ܵܢܹܐ.",
        },
        {
          shuraya: "ܘܲܒ݂ܢܘܼܗܪܵܟ݂ ܗ݇ܘ̣ ܚܵܙܹܝܢܲܢ ܢܘܼܗܪܵܐ.",
          body: "ܣܵܗܕܹ̈ܐ ܒܢܘܼܗܪܵܐ ܘܲܫܠܝܼܚܹ̈ܐ ܒܲܓ݂ܢܘܿܢ ܢܘܼܗܪܵܐ: ܘܗܵܐ ܙܵܡܪܝܼܢ ܫܘܼܒ݂ܚܵܐ: ܠܐܝܼܬ݂ܝܵܐ ܫܪܸܐ ܒܢܘܼܗܪܵܐ ܓܲܐܝܵܐ.",
        },
      ],
    },
    recordings: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fshlama-lsahde-walgarmayhon-iqara%2Faudio%2F1779124294649.m4a?alt=media&token=35bc74d3-1b98-4b9f-b129-8cb4b8f8545d",
        performer: "Binu George",
      },
    ],
    link: "/hymns/shlama-lsahde-walgarmayhon-iqara",
  },
  {
    num: 23,
    name: "Resh Haylawatha",
    nameSyr: "ܪܹܫ ܚܲܝܠܵܘ̈ܵܬ݂ܵܐ",
    nameMal: "റേശ് ഹൕലാവാസാ",
    structure: "",
    syriacText: {
      stanzas: [
        {
          shuraya: "ܫܲܕܲܪ ܐܲܠܵܗܵܐ ܛܲܝܒ݁ܘܼܬܹܗ ܘܩܘܼܫܬܹ݁ܗ.",
          body: "ܪܹܫ ܚܲܝܠܵܘ̈ܵܬ݂ܵܐ ܕܡܲܠܲܐܟܹ̈ܐ. ܐܸܫܬܲܕܲܪ ܗ݇ܘ̣ܵܐ ܓܲܒ݂ܪܝܹܠ. ܠܘܵܬ݂ ܒܪܝܼܟܲܬ݂ ܒܢܸܫܹ̈ܐ ܒܬ݂ܘܼܠܬܵܐ ܩܲܕ݁ܝܼܫܬܵܐ. ܘܟܲܕ݂ ܗ݀ܘ ܐܝܼܬ݂ܵܘܗܝ ܗ݇ܘ̣ܵܐ ܒܕܸܚܠܬ݂ܵܐ. ܕܠܵܐ ܫܲܠܘܵܐ ܡܣܲܒܲܪ ܗ݇ܘܵܐ ܠܵܗ̇ ܘܐܵܡܲܪ܀  ܿܫܠܵܡܠܹܟܝ ܐܲܢ݇ܬ݁ܬ݂ܵܐ ܡܲܠܝܲܬ݂ ܛܲܝܒ݁ܘܼܬ݂ܵܐ. ܫܠܵܡܠܹܟܝ ܐܸܡܹܗ ܕܦܵܪܘܿܩܵܐ ܕܒܸܪ̈ܝܵܬ݂ܵܐ. ܫܠܵܡ ܠܹܗ ܠܝܲܠܕܸܟ݂ܝ ܕܡ̣ܢ ܟܪ̈ܘܿܒܹܐ ܘܲܣܪ̈ܵܦܹܐ ܡܸܬ݂ܝܲܩܲܪ. ܫܠܵܡ ܠܹܗ ܠܲܒ݂ܪܹܟ݂ܝ ܕܡ̣ܢ ܡܓܘܼܫܹ̈ܐ ܘܡ̣ܢ ܪ̈ܵܥܵܘܵܬ݂ܵܐ ܡܸܣܬܓܸܕ܀ ܫܠܵܡܠܹܟ݂ܝ ܕܐܸܫܬ݁ܘܝܼܬ݁ܝ ܕܲܬ݂ܙܲܝܚܝܼܢ ܠܗܲܝܟ݁ܠܹܗ ܕܐܲܠܵܗܵܐ ܡܸܠܬ݂ܵܐ. ܫܠܵܡܠܹܟ݂ܝ ܕܲܗ݀ܘܲܝܬ݁ܝ ܠܡܹܐܢܵܐ. ܠܲܢܒ݂ܝܼܵܘ̈ܵܬ݂ܵܐ ܟܠܗܹܝܢ. ܫܠܵܡܠܹܟ݂ܝ ܝܵܠܕܲܬ݂ ܕܠܵܐ ܙܘܼܘܵܓ݂. ܐܲܝܟܲܢܵܐ ܕܐܸܡܲܪ ܐܹܫܲܥܝܵܐ ܀ ܫܠܵܡ ܠܹܗ ܠܟ݂ܵܘܟ݁ܒ݂ܵܐ ܕܲܡܝܲܬܲܪ ܛܵܒ݂ ܡ̣ܢ ܫܸܡܫܵܐ. ܫܠܵܡ ܠܹܟ݂ܝ ܡܥܝܼܢܵܐ ܕܩܲܒ݁ܠܲܬ݀ ܛܲܠܵܐ ܡ̣ܢ ܪܵܘܡܵܐ. ܫܠܵܡ ܠܗܘܿܢ ܠܚܲܝܹ̈ܐ ܕܐܸܬ݂ܝܲܒܲܠܘ ܠܘܵܬ݂ ܚܵܘܵܐ. ܫܠܵܡ ܠܹܟ݂ܝ ܕܡܸܢܹܟ݂ܝ ܡܸܬ݂ܝܼܠܸܕ ܡܲܠܟܵܐ ܡܫܝܼܚܵܐ ܗܲܠܸܠܘܼܝܵܐ.",
        },
      ],
    },
    link: "/hymns/resh-haylawathe",
  },
  {
    num: 24,
    name: "Alaha Meltha",
    nameSyr: "ܐܲܠܵܗܵܐ ܡܸܠܬ݂ܵܐ",
    nameMal: "ആലാഹാ മെൽസാ",
    structure: "",
    syriacText: {
      stanzas: [
        {
          shuraya: "ܪܥܝܹܗ ܕܝܼܣܪܝܹܠ ܨܘܼܬ.",
          body: "ܐܲܠܵܗܵܐ ܡܸܠܬ݂ܵܐ ܕܡ̣ܢ ܐܲܒܵܐ. ܠܵܘ ܡ̣ܢ ܡܲܠܲܐܟܹ̈ܐ ܢܸܣܲܒ݂ ܕܡܘܼܬ݂ܵܐ ܕܥܲܒ݂ܕܵܐ. ܐܸܠܵܐ ܡ̣ܢ ܙܲܪܥܹܗ ܕܐܲܒ݂ܪܵܗܵܡ. ܘܲܒ݂ܐ݇ܢܵܫܘܼܬ݂ܵܐ ܕܝܼܠܲܢ ܐܸܬܵ݀ܐ ܒܛܲܝܒ݁ܘܼܬܹܗ. ܕܢܸܦܪܘܿܩ ܠܓܸܢܣܲܢ ܡ̣ܢ ܛܘܼܥܝܲܝ.",
        },
      ],
    },
    link: "/hymns/alaha-meltha",
  },
  {
    num: 25,
    name: "Nawde w'nesgod le",
    nameSyr: "ܢܵܘܕܸܐ ܘܢܸܣܓ݁ܘܿܕ ܠܹܗ",
    nameMal: "നവ്‌ദേ ഉനെസ്ഗോദ് ലേ",
    structure: "",
    syriacText: {
      stanzas: [
        {
          shuraya: "ܬܵܘ ܢܸܒ݂ܪܘܿܟ݂ ܘܢܸܣܓܘܿܕ݂ ܠܹܗ.",
          body: "ܢܵܘܕܸܐ ܘܢܸܣܓܘܿܕ ܠܹܗ ܠܡܲܠܟܵܐ ܕܠܵܐ ܫܘܼܪܵܐ. ܕܲܒ݂ܢܘܼܗܪܹܗ ܒܪܵܐ ܠܲܢ ܢܘܼܗܪܵܐ.",
        },
      ],
    },
    link: "/hymns/nawde-wnesgod-le",
  },
  {
    num: 26,
    name: "Qala Ramba",
    nameSyr: "ܩܵܠܵܐ ܪܲܒܵܐ",
    nameMal: "കാലാ റമ്പാ",
    structure: "",
    link: "/hymns/qala-ramba",
  },
];

function ReshQalaList({
  items,
  openItems,
  onOpenChange,
}: {
  items: ReshQala[];
  openItems: string[];
  onOpenChange: (value: string[]) => void;
}) {
  return (
    <Accordion
      type="multiple"
      value={openItems}
      onValueChange={onOpenChange}
      className="not-prose"
    >
      {items.map((r) => (
        <AccordionItem
          key={r.num}
          value={String(r.num)}
          className="mb-2 border-none"
        >
          <AccordionTrigger className="font-[family-name:var(--font-lora)]">
            <span className="flex flex-col sm:flex-row sm:justify-between sm:items-start w-full gap-0.5 sm:gap-2">
              <span>
                <span className="text-base font-semibold text-slate-800 block group-data-[state=open]/trigger:text-primary transition-colors">
                  {r.num}. {r.name}
                </span>
                <Mal className="text-sm text-slate-500 block mt-0.5">
                  {r.nameMal}
                </Mal>
              </span>
              <Syr className="text-lg text-slate-600 text-right self-end w-full sm:w-auto sm:shrink-0">
                {r.nameSyr}
              </Syr>
            </span>
          </AccordionTrigger>
          <AccordionContent className="mt-3 ml-6 pb-2">
            <div className="space-y-2 text-sm font-[family-name:var(--font-lora)] text-slate-600">
              {r.syriacText && (
                <div className="mb-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 space-y-3">
                  {r.syriacText.stanzas.map((stanza, si) => (
                    <p
                      key={si}
                      className="leading-loose [font-family:'Idiqlat',serif] text-base m-0"
                      dir="rtl"
                      style={{ fontWeight: 400, fontSynthesis: "none" }}
                    >
                      {stanza.shuraya && (
                        <>
                          <span className="text-red-700">
                            {stanza.shuraya}
                          </span>{" "}
                        </>
                      )}
                      {stanza.body.split("܀").map((part, i, arr) => (
                        <span key={i}>
                          {part}
                          {i < arr.length - 1 && (
                            <span className="text-red-700">܀</span>
                          )}
                        </span>
                      ))}
                    </p>
                  ))}
                  {r.syriacText.teni && (
                    <p
                      className="leading-loose [font-family:'Idiqlat',serif] text-base m-0 text-red-700"
                      dir="rtl"
                      style={{ fontWeight: 400, fontSynthesis: "none" }}
                    >
                      {r.syriacText.teni}
                    </p>
                  )}
                </div>
              )}
              {r.alsoKnownAs && (
                <div className="m-0">
                  <span className="font-semibold text-slate-500">
                    Also known as:
                  </span>{" "}
                  {r.alsoKnownAs.map((aka, i) => (
                    <span key={i}>
                      {i > 0 && "; "}
                      {aka.latin}{" "}
                      {aka.syr && <Syr className="text-base">{aka.syr}</Syr>}
                    </span>
                  ))}
                </div>
              )}
              {r.malayalamCommonName && (
                <p className="m-0">
                  <span className="font-semibold text-slate-500">
                    Malayalam name:
                  </span>{" "}
                  <Mal>{r.malayalamCommonName.text}</Mal>
                  {r.malayalamCommonName.note && (
                    <> — {r.malayalamCommonName.note}.</>
                  )}
                </p>
              )}
              {r.structure && (
                <p className="m-0">
                  <span className="font-semibold text-slate-500">
                    Structure:
                  </span>{" "}
                  {r.structure}
                </p>
              )}
              {r.note && (
                <p className="m-0">
                  <span className="font-semibold text-slate-500">Note:</span>{" "}
                  {r.note}
                </p>
              )}
              <div className="pt-2 border-t border-slate-100">
                <p className="font-semibold text-slate-500 m-0 mb-3">
                  Recordings
                </p>
                <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                  {r.recordings && r.recordings.length > 0 ? (
                    <div className="space-y-3">
                      {r.recordings.map((rec, i) => (
                        <div key={i}>
                          <p className="text-xs text-slate-500 m-0 mb-3">
                            <span className="italic">
                              {rec.hymnLink ? (
                                <Link
                                  href={rec.hymnLink}
                                  className="text-primary hover:underline"
                                >
                                  {rec.hymnName ?? r.name}
                                </Link>
                              ) : (
                                rec.hymnName ?? r.name
                              )}
                            </span>
                            {rec.performer && (
                              <>
                                {" · "}
                                {rec.performer}
                              </>
                            )}
                          </p>
                          <audio
                            controls
                            controlsList="nodownload"
                            preload="none"
                            className="w-full h-9"
                            src={rec.url}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-400 italic text-xs m-0">
                      Coming soon.
                    </p>
                  )}
                </div>
              </div>
              {r.link && (
                <Link
                  href={r.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm text-primary hover:underline"
                >
                  For more details, view hymn page →
                </Link>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default function ReshQale() {
  const retainedKeys = RETAINED.map((r) => String(r.num));
  const notRetainedKeys = NOT_RETAINED.map((r) => String(r.num));
  const [retainedOpen, setRetainedOpen] = useState<string[]>(retainedKeys);
  const [notRetainedOpen, setNotRetainedOpen] = useState<string[]>(
    notRetainedKeys,
  );

  return (
    <>
      <div className="not-prose mb-6 rounded-lg bg-yellow-50 border border-yellow-300 px-5 py-3 flex items-center gap-3 text-yellow-800">
        <span className="text-lg" aria-hidden="true">
          🚧
        </span>
        <p className="text-sm font-medium m-0">
          Work in progress — this article is incomplete and may change
          significantly.
        </p>
      </div>

      <div className="not-prose mb-8 rounded-lg bg-amber-50 border border-amber-200 px-6 py-5 flex flex-col sm:flex-row items-center gap-5">
        <Image
          src="/images/thoma-kathanar.png"
          alt="Very Rev. Malpan Koonammakkal Thoma Kathanar"
          width={256}
          height={256}
          className="w-48 h-48 sm:w-64 sm:h-64 rounded-full object-cover object-top shrink-0 border-2 border-amber-200"
        />
        <div>
          <p className="text-base text-amber-900/70 italic font-[family-name:var(--font-lora)] leading-relaxed text-center sm:text-left">
            This article is dedicated to the memory of the Very Rev. Malpan
            Koonammakkal Thoma Kathanar, without whose work in preserving them,
            many of these melodies of the Malabar tradition would have been lost
            forever.
          </p>
        </div>
      </div>

      <div className="not-prose mt-10 mb-4">
        <h2 className="text-xl font-semibold font-[family-name:var(--font-lora)] text-slate-700 m-0">
          Introduction
        </h2>
      </div>
      <p>
        The <em>Resh Qale</em> (<Syr>ܪܹܫ ܩܵܠܹ̈ܐ</Syr>, literally &ldquo;head
        melodies&rdquo;) are the canonical modal archetypes of East Syriac
        liturgical chant. Each <em>resh qala</em> is a named melody that serves
        as the template for an entire family of hymns sung to the same tune.
        Knowing the <em>resh qale</em> is therefore prerequisite to learning the
        broader repertoire of East Syriac liturgical music.
      </p>
      <p>
        The tradition recognises more than a hundred <em>resh qale</em>, many of
        which have been lost to history. In the Malabar tradition these melodies
        have been handed down orally across the centuries, preserved in the
        liturgical practice of the Syro-Malabar Church.
      </p>
      <p>
        The Malabar pronunciation of Syriac will be used throughout this
        article.
      </p>

      <div className="not-prose mt-10 mb-4">
        <h2 className="text-xl font-semibold font-[family-name:var(--font-lora)] text-slate-700 m-0">
          Resh Qale d&apos;Onyatha{" "}
          <span
            className="text-base font-normal [font-family:'Idiqlat',serif]"
            dir="rtl"
          >
            ܪܹܫ ܩܵܠܹ̈ܐ ܕܥܘܿܢܝܵܬ݂ܵܐ
          </span>
        </h2>
      </div>
      <p>
        <em>Onyatha</em> (<Syr>ܥܘܿܢܝܵܬ݂ܵܐ</Syr>, singular <em>onitha</em>) are
        antiphons sung during all liturgical services, most prominently in the
        Liturgy of the Hours. Each <em>onitha</em> is preceded by a psalm verse
        called a <em>shuraya</em> (<Syr>ܫܘܼܪܵܝܵܐ</Syr>, lit.
        &ldquo;beginning&rdquo;). The liturgical text will usually indicate
        which <em>resh qala</em> each <em>onitha</em> is to be sung to. The
        melody of the <em>resh qala</em> typically also prescribes a distinct
        way of singing the <em>shuraya</em> that precedes it.
      </p>
      <p>
        Hymns are known by the opening words of the <em>onitha</em> itself, not
        by those of the preceding <em>shuraya</em>. This is because different{" "}
        <em>onyatha</em> may share the same psalm verse, each sung to a
        different tune — so the <em>shuraya</em> alone does not uniquely
        identify a hymn.
      </p>
      <p>
        This article will only deal with <em>Resh Qale d&apos;Onyatha</em>, and
        not with those of Madrashe, Sogyatha etc.
      </p>

      <div className="not-prose mt-10 mb-4">
        <h2 className="text-xl font-semibold font-[family-name:var(--font-lora)] text-slate-700 m-0">
          Resh Qale in the Malabar Tradition
        </h2>
      </div>
      <p>
        The Malabar transmission of the <em>resh qale</em> reflects both the
        shared textual heritage of the Church of the East and the particular
        developments that took place in the Indian context over more than
        fifteen centuries. This section will examine each melody as it is
        preserved and sung in the Syro-Malabar Church today.
      </p>
      <p>
        Strikingly, almost all of these melodies differ from those currently in
        use in the East Syriac churches of the Middle East. This divergence
        points to an independent musical tradition rooted in the ancient
        monastic (<em>dayra</em>) culture of Malabar — a strong local community
        of learning and liturgical practice that shaped these melodies into a
        distinctly Indian expression of the East Syriac heritage.
      </p>
      <p>
        A few melodies, however, were possibly adopted from the practice of the
        Chaldean Church by Fr. Emmanuel Thelly CMI in the second half of the
        twentieth century; these will be mentioned below.
      </p>
      <p>
        When Fr. Abel Periyappuram CMI translated the Canonical Hours into
        Malayalam, only those <em>resh qale</em> with a regular, metered rhythm
        were retained, since the more freely flowing melodies do not lend
        themselves well to Malayalam text.
      </p>

      <div className="not-prose flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-3 mt-10 mb-4">
        <h3 className="text-lg font-semibold font-[family-name:var(--font-lora)] text-slate-700 m-0">
          Resh Qale retained in the Malayalam translation
        </h3>
        <button
          onClick={() =>
            setRetainedOpen(retainedOpen.length > 0 ? [] : retainedKeys)
          }
          className="text-xs text-gray-400 hover:text-gray-600 transition-colors cursor-pointer self-start sm:self-auto"
        >
          {retainedOpen.length > 0 ? "Collapse all" : "Expand all"}
        </button>
      </div>

      <ReshQalaList
        items={RETAINED}
        openItems={retainedOpen}
        onOpenChange={setRetainedOpen}
      />

      <div className="not-prose flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-3 mt-10 mb-4">
        <h3 className="text-lg font-semibold font-[family-name:var(--font-lora)] text-slate-700 m-0">
          Resh Qale not in the Malayalam translation
        </h3>
        <button
          onClick={() =>
            setNotRetainedOpen(
              notRetainedOpen.length > 0 ? [] : notRetainedKeys,
            )
          }
          className="text-xs text-gray-400 hover:text-gray-600 transition-colors cursor-pointer self-start sm:self-auto"
        >
          {notRetainedOpen.length > 0 ? "Collapse all" : "Expand all"}
        </button>
      </div>

      <ReshQalaList
        items={NOT_RETAINED}
        openItems={notRetainedOpen}
        onOpenChange={setNotRetainedOpen}
      />

      <div className="not-prose mt-10 mb-4">
        <h2 className="text-xl font-semibold font-[family-name:var(--font-lora)] text-slate-700 m-0">
          Conclusion
        </h2>
      </div>
      <p>
        The lists above catalogue the tunes of the <em>resh qale</em> of the
        Malabar tradition that have been identified to date. It is hoped that
        further research will continue, and that more melodies will yet be
        brought to light.
      </p>
      <p>
        But you may ask — where is <em>Thuyay</em>? Where is{" "}
        <em>Brikh Hannana</em>? Why are they not present in these lists? Those
        melodies, though part of the Malabar repertoire, are melodies of{" "}
        <em>Teshbohyatha</em>, and not <em>onyatha</em>; they will be dealt with
        separately in another article.
      </p>
      <p>
        The survival of most of these tunes owes a great debt to recordings left
        behind by Fr. Emmanuel Thelly CMI, Fr. Alexander Kattakayam CMI, and Fr.
        Abel Periyappuram CMI. Much is likewise owed to Fr. Thomas Koonammakkal
        and Fr. Joseph Palackal CMI, through whose efforts those recordings have
        been preserved.
      </p>
      <p>
        The recordings linked in this article were made possible by Beth Aprem
        Nasrani Dayra, which provided access to the audio library assembled by
        Fr. Thomas Koonammakkal.
      </p>

      <p
        className="not-prose text-center mt-12 mb-8 [font-family:'Idiqlat',serif] text-2xl text-slate-700 m-0"
        dir="rtl"
        style={{ fontWeight: 400, fontSynthesis: "none" }}
      >
        ܫܠܡ
      </p>
    </>
  );
}
