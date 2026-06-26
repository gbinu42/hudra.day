"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import RecordingEmbed from "@/components/articles/RecordingEmbed";
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
    english?: {
      stanzas: { shuraya?: string; lines: string[] }[];
    };
  };
  link?: string;
  recordings?: {
    url?: string;
    youtubeEmbedSrc?: string;
    performer?: string;
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
        hymnLink: "/hymns/mara-dkolla",
      },
      {
        youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/tJvcYae8W8o",
        hymnName: "Maryam B'thulta Qandishta",
        hymnLink: "/hymns/maryam-bsultha-qandishtha",
        performer: "Fr. Abel Periyappuram CMI",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fmaryam-bsultha-qandishtha%2Faudio%2F1781287597922.m4a?alt=media&token=81fb30c4-f61e-44bd-bbbd-2104a8aae5a1",
        performer: "Fr. Alexander Kattakayam CMI",
        hymnName: "Maryam B'thulta Qandishta",
        hymnLink: "/hymns/maryam-bsultha-qandishtha",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fmaryam-bsultha-qandishtha%2Faudio%2F1781291041451.m4a?alt=media&token=07ff4d2c-eddf-4fa9-af73-466b584095e1",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "Maryam B'thulta Qandishta",
        hymnLink: "/hymns/maryam-bsultha-qandishtha",
      },
    ],
    syriacText: {
      stanzas: [
        {
          shuraya: "ܟܠܗܹܝܢ ܕܡ̣ܢ ܩܕ݂ܝܼܡ ܘܲܠܚܲܪܬ݂ܵܐ.",
          body: "ܡܵܪܵܐ ܕܟ݂ܠܵܐ ܠܵܟ݂ ܡܵܘ̈ܕܝܵܢ ܩܲܕ݁ܝܼ̈ܫܵܬ݂ܵܐ ܕܐܲܚܸܒ݂ ܫܡܵܟ݂. ܕܲܓ݂ܒܲܝܬ݁ ܠܡܲܪܝܲܡ ܡ̣ܢ ܓܸܢܣܗܹܝܢ. ܘܐ݇ܪܵܙ ܟܲܣܝܘܼܬ݂ܵܟ݂ ܐܲܫܪܝܼܬ݁ ܒܵܗ̇. ܕܲܒ݂ܚܹܝܠ ܪܘܼܚܵܐ ܡܸܢܵܗ̇ ܕܢܲܚ. ܡܫܝܼܚܵܐ ܦܵܪܘܿܩܹܗ ܕܥܵܠܡܵܐ. ܘܥܹܕܲܬ݂ ܩܘܼܕܫܵܐ ܗܵܐ ܡܙܲܝܚܵܐ. ܠܝܘܿܡ ܕܘܼܟ݂ܪܵܢܵܗ̇ ܕܲܒ݂ܬ݂ܘܼܠܬܵܐ",
        },
      ],
      english: {
        stanzas: [
          {
            shuraya: "All those from the beginning and unto the end.",
            lines: [
              "Lord of all, they give You praise,",
              "Blest women who loved Your name.",
              "You chose Maryam from their line,",
              "Made Your myst-ry dwell in her.",
              "By the Ruha He shone forth:",
              "Mshiha Saviour of the world.",
              "See the holy Church rejoice,",
              "On the Virgin's holy feast.",
            ],
          },
        ],
      },
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
      english: {
        stanzas: [
          {
            shuraya: "Blessed are you of MarYah",
            lines: [
              "Blessed Sahde,",
              "As a mighty profit,",
              "They considered death,",
              "And like honours and a gift,",
              "They received the stripes and pain,",
              "And now even after death,",
              "To the world they share good things,",
              "And great treasures abounding with help.",
            ],
          },
        ],
      },
    },
    recordings: [
      {
        youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/_X07mX8_Wos",
        hymnName: "Sahde Brikhe",
        hymnLink: "/hymns/sahde-brikhe",
        performer: "Fr. Abel Periyappuram CMI",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fsahde-brikhe%2Faudio%2F1781287658916.m4a?alt=media&token=c8f2995f-2ce4-4d01-a687-a19be9c873e5",
        performer: "Fr. Alexander Kattakayam CMI",
        hymnName: "Sahde Brikhe",
        hymnLink: "/hymns/sahde-brikhe",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fsahde-brikhe%2Faudio%2F1781291328910.m4a?alt=media&token=0f1e9341-7cf6-49b9-9640-98c3af7f5aa3",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "Sahde Brikhe",
        hymnLink: "/hymns/sahde-brikhe",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fsahde-brikhe%2Faudio%2F1779124136877.m4a?alt=media&token=211c148b-1541-4cf1-b757-f986cfb6d093",
        performer: "Binu George",
        hymnLink: "/hymns/sahde-brikhe",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fmannu-netthel-li%2Faudio%2F1781297482055.m4a?alt=media&token=5565f7c6-8241-49b7-ad4e-45a33e11328f",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "Mannu Netthel Li",
        hymnLink: "/hymns/mannu-netthel-li",
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
      english: {
        stanzas: [
          {
            shuraya: "And all of you are sons of the Most High.",
            lines: [
              "Sahde of the Holy Son,",
              "Crowned by running the good race,",
              "In the preaching of the truth,",
              "And with angels in heaven,",
              "Joyfully praise Alaha,",
              "Made intercessors for us.",
            ],
          },
        ],
      },
    },
    recordings: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fsahdaw-dawra%2Faudio%2F1779124369618.m4a?alt=media&token=b7048068-062f-4735-92b5-cb00ce15c2c8",
        performer: "Binu George",
        hymnLink: "/hymns/sahdaw-dawra",
      },
      {
        youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/wNjBYWahg9M",
        hymnName: "B'endan Sapra",
        hymnLink: "/hymns/benda-sapra-methpathhin",
        performer: "Qambel Maran CD",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fbenda-sapra-methpathhin%2Faudio%2F1781286744439.m4a?alt=media&token=0ffe7dd6-3282-4157-910e-ff91c14373d8",
        performer: "Fr. Alexander Kattakayam CMI",
        hymnName: "B'endan Sapra",
        hymnLink: "/hymns/benda-sapra-methpathhin",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fbenda-sapra-methpathhin%2Faudio%2F1781299238739.m4a?alt=media&token=46c553e7-face-4472-9a17-7ef8eb5ef415",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "B'endan Sapra",
        hymnLink: "/hymns/benda-sapra-methpathhin",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fmin-beth-david%2Faudio%2F1781287362844.m4a?alt=media&token=902cf09b-1ae2-4500-929d-a3128f9f48b2",
        performer: "Fr. Alexander Kattakayam CMI",
        hymnName: "Min Beth David",
        hymnLink: "/hymns/min-beth-david",
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
          shuraya: "ܒܵܟ݂ ܡܵܪܝܵܐ ܣܲܒ݁ܪܹܬ݂ ܠܵܐ ܐܸܒ݂ܗܲܬ݂ ܠܥܵܠܲܡ.",
          body: "ܠܵܐ ܒܵܗ̇ܬ݁ܝܼܢܲܢ ܝܼܫܘܿܥ ܒܲܨܠܝܼܒ݂ܵܟ݂. ܡܸܛܠ ܚܲܝܠܵܟ݂ ܪܲܒܵܐ ܕܲܟ݂ܣܸܐ ܒܹܗ. ܐܸܢ ܚܲܢܦܹ̈ܐ ܘܲܝܗܘܼܕ݂ܵܝܹ̈ܐ. ܡܒܲܙܚܝܼܢ ܒܵܗ̇ ܒܟ݂ܵܪܘܿܙܘܼܬ݂ܵܟ݂. ܐܸܠܵܐ ܠܲܡܒܲܛܵܠܘܼ ܫܪܵܪܵܐ ܡܬ݂ܘܿܡ ܠܵܐ ܡܸܫܟ݁ܚܝܼܢ. ܬܪ̈ܲܝܗܘܿܢ ܓܹܝܪ ܫܲܘܝܵܐܝܼܬ݂. ܗܵܐ ܩܵܥܹܝܢ ܥܲܠ ܙܵܟ݂ܘܼܬ݂ܵܟ݂. ܝܗ݇ܘܼܕ݂ܵܝܹ̈ܐ ܗܵܐ ܐܸܬ݂ܒܲܕܲܪܘ. ܘܝܘܼܠܦܵܢܵܐ ܕܚܲܢܦܹ̈ܐ ܐܸܫܬ݁ܪܝܼ. ܘܗܵܐ ܣܵܗ̇ܕܝܼܢ ܐܲܟܲܚ݇ܕ݂. ܕܪܲܒ݁ܘܼ ܚܲܝܠܵܟ݂ ܡܵܪܝܵܐ.",
        },
      ],
      english: {
        stanzas: [
          {
            shuraya:
              "In You, MarYah, I have put my hope; may I never be ashamed.",
            lines: [
              "Not ashamed, Isho, of your cross",
              "For your great power hides within",
              "Though the pagans and the Jews",
              "Scoff at it in your preaching,",
              "Yet to bring it unto nought",
              "Truth they never are able.",
              "For see, both of them alike",
              "Cry out for your victory.",
              "Behold, the Jews were scattered,",
              "Gentile teaching is rejected.",
              "See, they testify as one",
              "Great is your power, MarYah.",
            ],
          },
        ],
      },
    },
    recordings: [
      {
        youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/xLMmQNVpk4I",
        hymnName: "Kthawa Ramba",
        hymnLink: "/hymns/kthawa-ramba",
        performer: "Fr. Probus Perumalil CMI",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fkad-bazkipa%2Faudio%2F1781288084350.m4a?alt=media&token=e7e96ae6-ed63-4e1d-9134-b263139586c5",
        performer: "Fr. Alexander Kattakayam CMI",
        hymnName: "Kad Bazkipa",
        hymnLink: "/hymns/kad-bazkipa",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fkad-bazkipa%2Faudio%2F1781292605894.m4a?alt=media&token=0409c815-ebf1-41d8-b0a6-243757d2d317",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "Kad Bazkipa",
        hymnLink: "/hymns/kad-bazkipa",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Flawre-dalaha-mrayma%2Faudio%2F1781290771894.m4a?alt=media&token=e5f4d8e3-cfb0-4963-854c-18f34be275ec",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "Lawre Dalaha M'rayma",
        hymnLink: "/hymns/lawre-dalaha-mrayma",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fmannu-sapeq-danthanne%2Faudio%2F1781291562918.m4a?alt=media&token=c42741c9-9d79-4f1c-b7e5-2944f6b21981",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "Mannu Sapeq Danthanne",
        hymnLink: "/hymns/mannu-sapeq-danthanne",
      },
    ],
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
      english: {
        stanzas: [
          {
            shuraya: "O you righteous, praise MarYah!",
            lines: [
              "O you Sahde, merchants wise,",
              "With your treasures stored on high,",
              "You have bought the precious pearl",
              "With the blood poured from your necks.",
            ],
          },
          {
            shuraya: "And to the upright, praise is fitting!",
            lines: [
              "Sahde who arose and reached",
              "The heavenly Ore'shlem,",
              "By the blood poured from their necks,",
              "Bought the home they waited for.",
            ],
          },
        ],
      },
    },
    recordings: [
      {
        youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/FrqfYn-sV40",
        hymnName: "Sahde Wayton",
        hymnLink: "/hymns/sahde-waython-thangare",
        performer: "Fr. Abel Periyappuram CMI",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fsahde-waython-thangare%2Faudio%2F1781287276602.m4a?alt=media&token=27be96cb-2020-41d1-915a-33544b41780d",
        performer: "Fr. Alexander Kattakayam CMI",
        hymnName: "Sahde Wayton",
        hymnLink: "/hymns/sahde-waython-thangare",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fsahde-waython-thangare%2Faudio%2F1781290299371.m4a?alt=media&token=9ec11f7c-62d5-4997-a035-da0526595b46",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "Sahde Wayton",
        hymnLink: "/hymns/sahde-waython-thangare",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fsahde-waython-thangare%2Faudio%2F1779125270060.m4a?alt=media&token=4ca08b23-0a1a-4bc2-a69c-d57a6a8d8bcb",
        performer: "Binu George",
        hymnLink: "/hymns/sahde-waython-thangare",
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
      english: {
        stanzas: [
          {
            shuraya: "The righteous shall be in everlasting remembrance.",
            lines: [
              "Estappanos paved the way,",
              "Sahde followed in his steps;",
              "With the Bridegroom they rejoice",
              "In the endless realm of light.",
            ],
          },
          {
            shuraya: "He shall not be afraid of evil tidings.",
            lines: [
              "As Estappanos was stoned,",
              "He beheld his Lord on high;",
              "And Ruha d'Qudsha wove",
              "Crowns to grace the faithful head.",
            ],
          },
        ],
      },
    },
    recordings: [
      {
        youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/O3rPM3e5H-A",
        hymnName: "Estappanos",
        hymnLink: "/hymns/esthapanos-urha-drash",
        performer: "Qambel Maran CD",
      },
      {
        youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/vQ0ClI-StYE",
        hymnName: "Estappanos",
        hymnLink: "/hymns/esthapanos-urha-drash",
        performer: "Fr. Abel Periyappuram CMI",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Festhapanos-urha-drash%2Faudio%2F1781286968229.m4a?alt=media&token=5efafc07-3b1b-4bf9-8d6a-b3b5e8ed94d2",
        performer: "Fr. Alexander Kattakayam CMI",
        hymnName: "Estappanos",
        hymnLink: "/hymns/esthapanos-urha-drash",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Festhapanos-urha-drash%2Faudio%2F1781290119454.m4a?alt=media&token=b799b904-40fa-415d-906a-804fe205b1d2",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "Estappanos",
        hymnLink: "/hymns/esthapanos-urha-drash",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Festhapanos-urha-drash%2Faudio%2F1779125470261.m4a?alt=media&token=f753507e-05bf-4704-a3ac-292671f0961c",
        performer: "Binu George",
        hymnLink: "/hymns/esthapanos-urha-drash",
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
      english: {
        stanzas: [
          {
            shuraya: "He searches the heart and the reins.",
            lines: [
              "He knows all the thoughts of all sons of men.",
              "And searches secrets within human hearts.",
              "You yourself know our weakness.",
              "Have mercy on us.",
            ],
          },
        ],
      },
    },
    recordings: [
      {
        youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/crQhB0QWQIU",
        hymnName: "Yada'a Hushawe",
        hymnLink: "/hymns/yadaa-hushawe",
        performer: "Fr. Abel Periyappuram CMI",
      },
      {
        youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/78zyzj33WEk",
        hymnName: "Yada'a Hushawe",
        hymnLink: "/hymns/yadaa-hushawe",
        performer: "Fr. Paul Kodamullil",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fyadaa-hushawe%2Faudio%2F1781288571400.m4a?alt=media&token=552ff157-5e3c-40d7-b858-5fffbf533aad",
        performer: "Fr. Alexander Kattakayam CMI",
        hymnName: "Yada'a Hushawe",
        hymnLink: "/hymns/yadaa-hushawe",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fyadaa-hushawe%2Faudio%2F1781303496010.m4a?alt=media&token=1b044818-28ee-4cfc-9713-ec24401b7961",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "Yada'a Hushawe",
        hymnLink: "/hymns/yadaa-hushawe",
      },
    ],
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
          shuraya: "ܐܹܪܲܡܪܡܵܟ݂ ܡܵܪܝ ܡܲܠܟܵܐ.",
          body: "ܡܼܿܠܟܵܐ ܡܫܝܼܚܵܐ ܦܵܪܘܿܩܲܢ. ܒܝܘܿܡ ܡܹܐܬ݂ܝܼܬ݂ܵܟ݂ ܢܲܚܸܡܲܝܢܝ. ܘܐܲܩܝܼܡܲܝܢܝ ܡ̣ܢ ܝܲܡܝܼܢܵܟ݂. ܒܝܵܘܡܵܐ ܕܕܼܵܢ̇ܚܵܐ ܪܲܒ݁ܘܼܬ݂ܵܟ݂.",
        },
        {
          shuraya: "ܐܲܠܵܗܝ ܒܵܟ݂ ܣܲܒ݁ܪܹܬ݂ ܠܵܐ ܐܸܒ݂ܗܲܬ݂.",
          body: "ܣܵܓ݂ܕܝܼܢܲܢ ܡܵܪܝ ܠܲܨܠܝܼܒ݂ܵܟ݂. ܕܒܹܗ ܩܝܵܡܬܲܢ ܘܒܹܗ ܢܘܼܚܵܡܲܢ. ܘܒܹܗ ܡܸܬ݂ܢܲܚܡܝܼܢ ܥܲܢܝܼ̈ܕܲܝܢ. ܘܠܵܒ݂ܫܝܼܢ ܫܘܼܒ݂ܚܵܐ ܦܲܓ݂ܪ̈ܲܝܗܘܿܢ.",
        },
      ],
      english: {
        stanzas: [
          {
            shuraya: "I will praise You, my Lord the King.",
            lines: [
              "Malka Mshiha our Saviour,",
              "On your coming, revive me,",
              "And raise me at your right hand,",
              "On the day your greatness dawns.",
            ],
          },
          {
            shuraya: "O my Alaha, I trust in You; let me not be ashamed.",
            lines: [
              "Lord, we worship your Sliwa,",
              "In it we rise and revive,",
              "And in it our dead awake,",
              "And their bodies wear glory.",
            ],
          },
        ],
      },
    },
    recordings: [
      {
        youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/aRKW_L4Fx6k",
        hymnName: "Malka Mshiha Paroqan",
        hymnLink: "/hymns/malka-mshiha-paroqan",
        performer: "Fr. Abel Periyappuram CMI",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fmalka-mshiha-paroqan%2Faudio%2F1781287968853.m4a?alt=media&token=a941ad37-e45b-4dbe-9250-ecdd278ceadf",
        performer: "Fr. Alexander Kattakayam CMI",
        hymnName: "Malka Mshiha Paroqan",
        hymnLink: "/hymns/malka-mshiha-paroqan",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fmalka-mshiha-paroqan%2Faudio%2F1781291601277.m4a?alt=media&token=064bf320-216f-497b-b7da-2775e0b6e4cc",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "Malka Mshiha Paroqan",
        hymnLink: "/hymns/malka-mshiha-paroqan",
      },
    ],
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
      english: {
        stanzas: [
          {
            shuraya: "He who is from before the ages.",
            lines: [
              "God, who by His will,",
              "Fashioned all creatures,",
              "Preserved our nature.",
              "Your image you named,",
              "In your likeness shaped,",
              "In mercy, spare him.",
            ],
          },
        ],
      },
    },
    recordings: [
      {
        youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/ONPnoPOxIHY",
        hymnName: "Ithya Dawremze",
        hymnLink: "/hymns/ithya-dawremze",
        performer: "Fr. Abel Periyappuram CMI",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fbaaruwta-brashith%2Faudio%2F1781287919956.m4a?alt=media&token=1292ef22-8eb9-492c-a72f-c15281252874",
        performer: "Fr. Alexander Kattakayam CMI",
        hymnName: "Ba'aruwta Brashith",
        hymnLink: "/hymns/baaruwta-brashith",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fbaaruwta-brashith%2Faudio%2F1781291497432.m4a?alt=media&token=18d5b515-7e9a-4933-888d-a0a908c52ee1",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "Ba'aruwta Brashith",
        hymnLink: "/hymns/baaruwta-brashith",
      },
    ],
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
      english: {
        stanzas: [
          {
            shuraya:
              "Therefore now I leave you, my brethren, pray for me.",
            lines: [
              "Farewell to thee,",
              "Abode of time,",
              "Which cannot save",
              "Those who own it.",
              "That I go see",
              "The place of light,",
              "Wherein abide",
              "The just who toiled.",
            ],
          },
        ],
      },
    },
    recordings: [
      {
        youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/TFS1M8NVUmg",
        hymnName: "Push Bashlama",
        hymnLink: "/hymns/push-bashlama",
        performer: "Fr. Abel Periyappuram CMI",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fbrikhu-yawmakh%2Faudio%2F1781287773155.m4a?alt=media&token=8c1882e3-9e08-4e34-9b49-8c239e44ad82",
        performer: "Fr. Alexander Kattakayam CMI",
        hymnName: "Brikhu Yawmakh",
        hymnLink: "/hymns/brikhu-yawmakh",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fbrikhu-yawmakh%2Faudio%2F1781291436987.m4a?alt=media&token=66442af2-2182-4b7d-b1f2-714b2614e851",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "Brikhu Yawmakh",
        hymnLink: "/hymns/brikhu-yawmakh",
      },
    ],
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
      english: {
        stanzas: [
          {
            shuraya: "O Alaha, save me from the hand of the wicked.",
            lines: [
              "MarYah, foe took",
              "Me from Your flock",
              "Made me his own.",
              "Through the weakness of my thoughts.",
              "Oppressed, I drew near unto You.",
              "When You saved me, I returned to my past sins.",
              "Now tormented",
              "By my evils",
              "Great is my qnoma's ruin.",
              "Your strict justice answers not.",
              "For I scorned all Your commands",
              "Good One who formed me from dust",
              "Place a salve for my sickness.",
              "Lest I fall in evil hands.",
              "Save the richness of my thoughts",
              "O Maran, spare me.",
            ],
          },
        ],
      },
    },
    recordings: [
      {
        youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/oyhRWnSbYYY",
        hymnName: "Marya Kolhon Hawbay",
        hymnLink: "/hymns/marya-kolhon-hawbay",
        performer: "Qambel Maran CD",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fmarya-kolhon-hawbay%2Faudio%2F1781287693877.m4a?alt=media&token=9241dcb1-5df0-406e-aadb-df2f71525eaa",
        performer: "Fr. Alexander Kattakayam CMI",
        hymnName: "Marya Kolhon Hawbay",
        hymnLink: "/hymns/marya-kolhon-hawbay",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fmarya-kolhon-hawbay%2Faudio%2F1781291347985.m4a?alt=media&token=530b2f31-2a8c-40fa-bb0b-5f581727b593",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "Marya Kolhon Hawbay",
        hymnLink: "/hymns/marya-kolhon-hawbay",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fha-gmar-tawa%2Faudio%2F1781286622106.m4a?alt=media&token=d4680bb3-bfc4-4640-879b-3fffc80112dc",
        performer: "Fr. Alexander Kattakayam CMI",
        hymnName: "Ha Gmar Tawa",
        hymnLink: "/hymns/ha-gmar-tawa",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fha-gmar-tawa%2Faudio%2F1781289878674.m4a?alt=media&token=c3fe7f0e-a1c7-4af5-8e9a-5102ada8cdcc",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "Ha Gmar Tawa",
        hymnLink: "/hymns/ha-gmar-tawa",
      },
      {
        youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/m2BWVVrbdOQ",
        hymnName: "Shlama w'shayna",
        performer: "Fr. Charles Payngot CMI",
      },
    ],
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
      english: {
        stanzas: [
          {
            shuraya: "Where can I go from Your Ruha?",
            lines: [
              "Where, Maran, shall I flee from You?",
              "In what place can I hide from Your presence?",
              "Heaven Your throne, earth Your footstool.",
              "Sea Your way, in Sheol Your might.",
              "If, my Lord, the world's end has now arrived,",
              "In Your mercy let the end be.",
            ],
          },
        ],
      },
    },
    recordings: [
      {
        youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/3XiChppYhJM",
        hymnName: "Layka Maran",
        hymnLink: "/hymns/layka-maran",
        performer: "Qambel Maran CD",
      },
      {
        youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/6Kl1Yywsk_0",
        hymnName: "Layka Maran",
        hymnLink: "/hymns/layka-maran",
        performer: "Fr. Abel Periyappuram CMI",
      },
    ],
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
      english: {
        stanzas: [
          {
            shuraya:
              "All these things have come upon us, yet we have not forgotten You.",
            lines: [
              "Mshiha, Saviour of the world,",
              "Great and glorified High King,",
              "Sahde loved Him and believed,",
              "They put Satan unto shame.",
              "With the angels they rejoice,",
              "Standing before Alaha;",
              "They subdued the enemy",
              "And his power 'neath their feet.",
            ],
          },
        ],
      },
    },
    recordings: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fmshiha-paroqe-dalma%2Faudio%2F1781287988490.m4a?alt=media&token=312e3f37-a720-4057-ae9b-0b87ab9edb30",
        performer: "Fr. Alexander Kattakayam CMI",
        hymnName: "Mshiha Paroqe d'Alma",
        hymnLink: "/hymns/mshiha-paroqe-dalma",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fmshiha-paroqe-dalma%2Faudio%2F1781291825883.m4a?alt=media&token=05025e3f-cf3e-4309-91fc-7aedc9b642c7",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "Mshiha Paroqe d'Alma",
        hymnLink: "/hymns/mshiha-paroqe-dalma",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fmshiha-paroqe-dalma%2Faudio%2F1779124798989.m4a?alt=media&token=95ab823d-111f-430c-acda-26068f51abab",
        performer: "Binu George",
        hymnLink: "/hymns/mshiha-paroqe-dalma",
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
      english: {
        stanzas: [
          {
            shuraya: "He who exists from before the ages.",
            lines: [
              "Father in heaven,",
              "Hallowed be Your name.",
              "May Your kingdom come,",
              "Let Your will be done.",
            ],
          },
          {
            shuraya: "He is One, and there is no other apart from Him.",
            lines: [
              "There is but one Lord,",
              "There is but one faith,",
              "Only one baptism,",
              "To forgive our sins.",
            ],
          },
        ],
      },
    },
    recordings: [
      {
        youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/QXTnyw86nDU",
        hymnName: "Sahde Qandishe Sallaw",
        hymnLink: "/hymns/sahde-qandishe-sallaw-al-shayna",
        performer: "Fr. Abel Periyappuram CMI",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fsahde-qandishe-sallaw-al-shayna%2Faudio%2F1781096167883.m4a?alt=media&token=e508b0e6-4fb5-418f-a5b1-9674d5b2fc25",
        performer: "Fr. Alexander Kattakayam CMI",
        hymnName: "Sahde Qandishe Sallaw",
        hymnLink: "/hymns/sahde-qandishe-sallaw-al-shayna",
      },
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
          shuraya: "ܚܲܕܵܐ ܢܲܦ̮ܫܹܗ ܕܥܲܒ݂ܕܵܟ.",
          body: "ܥܲܡ ܟܠܗܘܿܢ ܩܲܕܝܼܫܲܝ̈ܟ: ܐܲܢܝܼܚ ܡܲܠܟܵܐ ܡܫܝܼܚܵܐ: ܠܪܘܼܚܹܗ ܕܥܲܒ݂ܕܵܟ ܒܲܫܠܵܡܵܐ. ܐܲܝܟܵܐ ܕܠܵܐ ܡܲܡܠܸـܟ ܚܲܫܵܐ: ܘܠܵܐ ܥܵܩܬ݂ܵܐ ܘܠܵܐ ܟܲܪܝܘܼܬ݂ܵܐ: ܐܸܠܵܐ ܚܲܝܹ̈ܐ ܡܠܝܼܟܹ̈ܐ ܕܲܠܥܵܠܲܡ܀",
        },
      ],
      english: {
        stanzas: [
          {
            shuraya: "Give joy to your servant's soul.",
            lines: [
              "With all of your holy saints:",
              "Give rest, O Malka Mshiha:",
              "To your servant's spirit in peace;",
              "Where pain and anguish reign not:",
              "And neither distress nor grief:",
              "But the promised life forevermore.",
            ],
          },
        ],
      },
    },
    recordings: [
      {
        youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/Ou7rvO7WuiE",
        hymnName: "Am Kolhon",
        hymnLink: "/hymns/am-kolhon-qandishayk",
        performer: "Fr. Abel Periyappuram CMI",
      },
    ],
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
      english: {
        stanzas: [
          {
            shuraya: "Open to me the gates of righteousness.",
            lines: [
              "O Merciful, whose door is open wide",
              "To penitents, and calls the sinners near,",
              "Open to us the door of mercy, Lord,",
              "To enter, singing glory night and day.",
            ],
          },
        ],
      },
    },
    recordings: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fsliwa-dahwa-lan%2Faudio%2F1781292267393.m4a?alt=media&token=957c6c8c-a8c4-4e0f-a322-2e9effecaadb",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "Sliwa Dahwa Lan",
        hymnLink: "/hymns/sliwa-dahwa-lan",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Falaha-dshawzew%2Faudio%2F1781096386224.m4a?alt=media&token=60350a05-a81f-43eb-beae-9ff1f6014f8f",
        performer: "Fr. Alexander Kattakayam CMI",
        hymnName: "Alaha d'Shawzew",
        hymnLink: "/hymns/alaha-dshawzew",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Falaha-dshawzew%2Faudio%2F1781290072127.m4a?alt=media&token=157638c8-4dcf-49fa-957d-e9cc9357b44a",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "Alaha d'Shawzew",
        hymnLink: "/hymns/alaha-dshawzew",
      },
    ],
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
      english: {
        stanzas: [
          {
            shuraya: "Lighten my eyes, lest I sleep in death.",
            lines: [
              "Light and Son of Light,",
              "Dwells in light and lives in light,",
              "Make me worth that light,",
              "Darkness cannot comprehend.",
            ],
          },
        ],
      },
    },
    recordings: [
      {
        youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/bF9oz5PytYk",
        hymnName: "Shama w'la Mahme",
        hymnLink: "/hymns/shama-wla-mahme",
        performer: "Fr. Abel Periyappuram CMI",
      },
    ],
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
      english: {
        stanzas: [
          {
            shuraya: "I call You MarYah, each day.",
            lines: [
              "To You do we call,",
              "Have mercy on us,",
              "Mshiha, our Savior.",
            ],
          },
        ],
      },
    },
    recordings: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Flakhu-qareynan%2Faudio%2F1781288064966.m4a?alt=media&token=2878fd4a-dbae-43be-a410-03ceabb6b226",
        performer: "Fr. Alexander Kattakayam CMI",
        hymnName: "Lakhu Qareynan",
        hymnLink: "/hymns/lakhu-qareynan",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Flakhu-qareynan%2Faudio%2F1781292311970.m4a?alt=media&token=de0063ae-6337-469e-8910-829c911e17f5",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "Lakhu Qareynan",
        hymnLink: "/hymns/lakhu-qareynan",
      },
    ],
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
      english: {
        stanzas: [
          {
            shuraya: "I was glad when they said to me:",
            lines: [
              "Our Lord will come,",
              "And raise up the dead.",
              "Giving firm hope",
              "To all who have passed.",
            ],
          },
          {
            shuraya: "Let us go to the house of the Lord.",
            lines: [
              "Blessed is he,",
              "Who made death unbribed;",
              "Good folks and bad,",
              "It treats just the same.",
            ],
          },
        ],
      },
    },
    recordings: [
      {
        youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/Mq0W7eKybAQ",
        hymnName: "Maran Athe",
        hymnLink: "/hymns/maran-athe",
        performer: "Fr. Abel Periyappuram CMI",
      },
    ],
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
      english: {
        stanzas: [
          {
            shuraya: "Come and hear, I speak unto you.",
            lines: [
              "Spring of life without an ending,",
              "Was the teaching of Mshiha Maran in all the world.",
              "Just like the spring,",
              "Of Paradise split in four;",
              "And each one of them was sent,",
              "To a parched land.",
              "",
              "Mathai, Pishon to Hebrews,",
              "Flowing with unending true life.",
              "Markos, Deqlath to Romans,",
              "Made them rich with his flowing words.",
              "Luqa, Gihon to Egypt,",
              "Urging them all to yield good fruit.",
              "Yohannan the river Prath,",
              "To Ephesians he was sent forth.",
              "",
              "He taught and preached,",
              "Of the Father's Word,",
              "Shown in human form,",
              "To Him be praise!",
            ],
          },
        ],
      },
    },
    recordings: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fmambua-hayye%2Faudio%2F1769168953155.mp3?alt=media&token=dde98d54-2b1c-4282-b924-7d74fa76876f",
        performer: "Binu George",
        hymnName: "Mambu Hayye",
        hymnLink: "/hymns/mambua-hayye",
      },
      {
        youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/YcMrJULLpu8",
        hymnName: "Taw N'yaqar",
        hymnLink: "/hymns/taw-nyaqar",
        performer: "Qambel Maran CD",
      },
      {
        youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/Ls5iMKUYr9k",
        hymnName: "B'eda Shwiha D'yom Dukhrane",
        hymnLink: "/hymns/beda-shiwha-dyom-dukhrane",
        performer: "Fr. Charles Payngot CMI",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fman-meshkah-danthanne-taybutha%2Faudio%2F1781296340940.m4a?alt=media&token=82c2d8e2-7eba-4fe1-9e8b-fb839b1bab74",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "Man Meshkah",
        hymnLink: "/hymns/man-meshkah-danthanne-taybutha",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fyammin-rahmayk%2Faudio%2F1781475100467.wav?alt=media&token=b459b697-4451-43e2-a46f-0ea73a4a28b2",
        performer: "Rev. Dr. George Vavanikunnel",
        hymnName: "Yammin Rahmayk",
        hymnLink: "/hymns/yammin-rahmayk",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fyammin-rahmayk%2Faudio%2F1781475357403.wav?alt=media&token=cb9c3d50-c250-45a6-ad42-b70c18f80523",
        performer: "Fr. George Plathottam",
        hymnName: "Yammin Rahmayk",
        hymnLink: "/hymns/yammin-rahmayk",
      },
    ],
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
    recordings: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fbmadnahay-sapra%2Faudio%2F1781093406429.m4a?alt=media&token=e65c92c5-280b-4698-96cd-4af62cdfdc20",
        performer: "Fr. Alexander Kattakayam CMI",
        hymnName: "B'madnahay Sapra",
        hymnLink: "/hymns/bmadnahay-sapra",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fbmadnahay-sapra%2Faudio%2F1781289610969.m4a?alt=media&token=128bb83d-ef2a-44b5-a270-38b2c8ecd4e4",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "B'madnahay Sapra",
        hymnLink: "/hymns/bmadnahay-sapra",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fsahde-qandishe-malpane-dhaymanutha%2Faudio%2F1781291095188.m4a?alt=media&token=c3489efe-7779-4f20-9611-efa62147d4e4",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "Sahde Qandishe Malpane",
        hymnLink: "/hymns/sahde-qandishe-malpane-dhaymanutha",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fsliwakh-paroqan%2Faudio%2F1781292456789.m4a?alt=media&token=bd4717df-76ff-4dae-b3a3-2aaf956d0ff3",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "Sliwakh Paroqan",
        hymnLink: "/hymns/sliwakh-paroqan",
      },
    ],
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
    recordings: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fawda-leh%2Faudio%2F1781291412183.m4a?alt=media&token=910818d1-fb99-4fc1-8c95-f98db3c5e4a2",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "Awdaw Le",
        hymnLink: "/hymns/awda-leh",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Falaha-mrahmana%2Faudio%2F1781093380674.m4a?alt=media&token=1a4860f1-043f-4bed-ad10-38ff471288b5",
        performer: "Fr. Alexander Kattakayam CMI",
        hymnName: "Alaha M'rahmana",
        hymnLink: "/hymns/alaha-mrahmana",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Falaha-mrahmana%2Faudio%2F1781289775167.m4a?alt=media&token=386ed5d4-02ec-452d-8072-d9ec62b9eb52",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "Alaha M'rahmana",
        hymnLink: "/hymns/alaha-mrahmana",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fethgawas-hattaye%2Faudio%2F1781092312335.m4a?alt=media&token=dac513bc-b751-4218-9ece-cd0869af2443",
        performer: "Fr. Alexander Kattakayam CMI",
        hymnName: "Ethgawas Hattaye",
        hymnLink: "/hymns/ethgawas-hattaye",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fethgawas-hattaye%2Faudio%2F1781288592554.m4a?alt=media&token=0cbef4d3-c690-40e8-be10-72e25998eaa8",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "Ethgawas Hattaye",
        hymnLink: "/hymns/ethgawas-hattaye",
      },
    ],
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
    recordings: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fbaslotha-damwaraktha%2Faudio%2F1781093535519.m4a?alt=media&token=11f3e9f0-ac48-4d4a-9651-41e025dd1e75",
        performer: "Fr. Alexander Kattakayam CMI",
        hymnName: "Baslotha Damwarakhta",
        hymnLink: "/hymns/baslotha-damwaraktha",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fbaslotha-damwaraktha%2Faudio%2F1781291019059.m4a?alt=media&token=14a330e3-b0da-4d8b-8cec-6c297ed2b843",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "Baslotha Damwarakhta",
        hymnLink: "/hymns/baslotha-damwaraktha",
      },
    ],
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
    recordings: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fmlakh-weshtawdi%2Faudio%2F1781089831537.m4a?alt=media&token=cb8c0762-a708-42a9-bd9d-13bbd66b3ce2",
        performer: "Fr. Alexander Kattakayam CMI",
        hymnName: "M'lakh Weshtawdi",
        hymnLink: "/hymns/mlakh-weshtawdi",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fmlakh-weshtawdi%2Faudio%2F1781288370166.m4a?alt=media&token=5ef7b1b7-ea0b-4e71-b456-bda9b6dcbe69",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "M'lakh Weshtawdi",
        hymnLink: "/hymns/mlakh-weshtawdi",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fmaryam-bthulta%2Faudio%2F1781090665274.m4a?alt=media&token=1c431578-5799-4fa1-b6a3-a2f54587d685",
        performer: "Fr. Alexander Kattakayam CMI",
        hymnName: "Maryam B'thulta",
        hymnLink: "/hymns/maryam-bthulta",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fmaryam-bthulta%2Faudio%2F1781288425279.m4a?alt=media&token=3c540cac-a5a6-4fd8-bef4-e8104265bf0c",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "Maryam B'thulta",
        hymnLink: "/hymns/maryam-bthulta",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fswartha-dshayna-onitha%2Faudio%2F1781093620212.m4a?alt=media&token=823d0109-4f9e-4c0c-9292-724ba5b06a6c",
        performer: "Fr. Alexander Kattakayam CMI",
        hymnName: "Swartha d'Shayna",
        hymnLink: "/hymns/swartha-dshayna-onitha",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fswartha-dshayna-onitha%2Faudio%2F1781291680835.m4a?alt=media&token=59ad4d2c-4f2d-49e3-af81-ea5bbc024cf2",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "Swartha d'Shayna",
        hymnLink: "/hymns/swartha-dshayna-onitha",
      },
    ],
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
      english: {
        stanzas: [
          {
            shuraya: "Through all the earth their message went forth.",
            lines: [
              "Sahde, holy ones, clothed in bright light:",
              "To the corners of the earth they went out to proclaim.",
              "The glorious Trinity:",
              "Father, Son, and Ruhqudsha.",
            ],
          },
        ],
      },
    },
    recordings: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fsahde-qandishe-lwishay-nuhra%2Faudio%2F1781093648002.m4a?alt=media&token=663f2edc-17e0-4ff0-8a79-ed73140e38e6",
        performer: "Fr. Alexander Kattakayam CMI",
        hymnName: "Sahde Qandishe L'wishay Nuhra",
        hymnLink: "/hymns/sahde-qandishe-lwishay-nuhra",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fsahde-qandishe-lwishay-nuhra%2Faudio%2F1781292584786.m4a?alt=media&token=33b994dd-368c-416f-bd49-a8ebcad3dff0",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "Sahde Qandishe L'wishay Nuhra",
        hymnLink: "/hymns/sahde-qandishe-lwishay-nuhra",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fsahde-qandishe-lwishay-nuhra%2Faudio%2F1779124595627.m4a?alt=media&token=616becf6-d167-4e2b-b081-eac5e06068d0",
        performer: "Binu George",
        hymnName: "Sahde Qandishe L'wishay Nuhra",
        hymnLink: "/hymns/sahde-qandishe-lwishay-nuhra",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Ftaw-mayothe%2Faudio%2F1781287804561.m4a?alt=media&token=05842d2c-72a5-406c-9953-5a5084ed5157",
        performer: "Fr. Alexander Kattakayam CMI",
        hymnName: "Taw Mayothe",
        hymnLink: "/hymns/taw-mayothe",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Ftaw-mayothe%2Faudio%2F1781291475908.m4a?alt=media&token=7ef02776-5894-4f2d-b65f-379f616bdc37",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "Taw Mayothe",
        hymnLink: "/hymns/taw-mayothe",
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
    recordings: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fmshiha-la-tahme%2Faudio%2F1781095114882.m4a?alt=media&token=b1b29f54-91e1-4d5c-84cd-e8d3e3d2acd5",
        performer: "Fr. Alexander Kattakayam CMI",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fmshiha-la-tahme%2Faudio%2F1781289422188.m4a?alt=media&token=d618ad3f-ce54-46c3-a4b0-91e099ff5abf",
        performer: "Fr. Emmanuel Thelly CMI",
      },
    ],
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
    recordings: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Flhaw-sapra%2Faudio%2F1781095451052.m4a?alt=media&token=8e726d28-8543-4510-9698-b28841ef3cbc",
        performer: "Fr. Alexander Kattakayam CMI",
        hymnName: "L'haw Sapra",
        hymnLink: "/hymns/lhaw-sapra",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Flhaw-sapra%2Faudio%2F1781289590094.m4a?alt=media&token=eb5c15a8-b059-4815-b74a-bfb92a1510ef",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "L'haw Sapra",
        hymnLink: "/hymns/lhaw-sapra",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fmaryam-dyeldath%2Faudio%2F1781096494230.m4a?alt=media&token=7952a594-0c9d-471b-b847-2c694f5d7944",
        performer: "Fr. Alexander Kattakayam CMI",
        hymnName: "Maryam d'Yeldath",
        hymnLink: "/hymns/maryam-dyeldath",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fmaryam-dyeldath%2Faudio%2F1781290360077.m4a?alt=media&token=1e7b6081-a8d7-4344-afd1-714ea6c4ea6a",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "Maryam d'Yeldath",
        hymnLink: "/hymns/maryam-dyeldath",
      },
    ],
    link: "/hymns/kol-neshma",
  },
  {
    num: 8,
    name: "Mannu Sapeq",
    nameSyr: "ܡܲܢܘܼ ܣܵܦܹܩ",
    nameMal: "മന്നൂ സാപേക്ക്",
    alsoKnownAs: [
      { latin: "Pthahlan Maran", syr: "ܦܬܲܚܠܲܢ ܡܵܪܲܢ" },
      { latin: "Alaha Meltha", syr: "ܐܲܠܵܗܵܐ ܡܸܠܬ݂ܵܐ" },
    ],
    structure: "",
    syriacText: {
      stanzas: [
        {
          shuraya: "ܬܵܘ ܢܫܲܒܲܚ ܠܡܵܪܝܵܐ.",
          body: "ܡܲܢܘܼ ܣܵܦܹܩ ܥܵܒ݂ܘܿܕܲܢ ܕܢܵܘܕܸܐ ܚܠܵܦܲܝܢ ܠܲܡܪܲܚܡܵܢܘܼܬ݂ܵܟ݂. ܕܲܒ݂ܫܘܼܪܵܝܵܐ ܒܨܲܠܡܵܟ݂ ܝܲܩܝܼܪܵܐ ܐܲܬ݂ܩܸܬܵܢ. ܘܲܒ݂ܚܲܪܬ݂ܵܐ ܕܙܲܒ݂ܢܹ̈ܐ ܠܒܸܫܬܲܢ. ܘܐܲܦܢܝܼܬܵܢ ܠܝܼܕܲܥܬ݂ܵܟ݂. ܡܵܘܪܸܒ݂ ܓܸܢܣܲܢ ܫܘܼܒ݂ܚܵܐ ܠܵܟ݂.",
        },
      ],
    },
    recordings: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fmannu-sapeq%2Faudio%2F1781096282139.m4a?alt=media&token=745935d1-6d37-46ac-84c4-b9472426f903",
        performer: "Fr. Alexander Kattakayam CMI",
        hymnName: "Mannu Sapeq",
        hymnLink: "/hymns/mannu-sapeq",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fmannu-sapeq%2Faudio%2F1781290099288.m4a?alt=media&token=36241934-cd81-49ef-9d9c-4ed70cedb984",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "Mannu Sapeq",
        hymnLink: "/hymns/mannu-sapeq",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Flakh-mawdenan%2Faudio%2F1781291199637.m4a?alt=media&token=ba652344-1f5b-471a-ab36-b207a2ba16a8",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "Lakh Mawdenan",
        hymnLink: "/hymns/lakh-mawdenan",
      },
    ],
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
    recordings: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fbaeynan-mennakh-maran%2Faudio%2F1781096321830.m4a?alt=media&token=53733f2b-cd27-4f26-90ca-edd75ab50481",
        performer: "Fr. Alexander Kattakayam CMI",
        hymnName: "Ba'eynan Mennakh Maran",
        hymnLink: "/hymns/baeynan-mennakh-maran",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fbaeynan-mennakh-maran%2Faudio%2F1781289976226.m4a?alt=media&token=de1bb799-c186-4e80-9342-b5f700632a4c",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "Ba'eynan Mennakh Maran",
        hymnLink: "/hymns/baeynan-mennakh-maran",
      },
    ],
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
    recordings: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fudranan-dilan%2Faudio%2F1781096344317.m4a?alt=media&token=70b8218a-f409-4784-a977-9ef8eb6adfe3",
        performer: "Fr. Alexander Kattakayam CMI",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fudranan-dilan%2Faudio%2F1781289997529.m4a?alt=media&token=42352f9f-4731-4870-a0d6-1c55e659bc05",
        performer: "Fr. Emmanuel Thelly CMI",
      },
    ],
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
    recordings: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fhannana-wamle-rahme%2Faudio%2F1781096364086.m4a?alt=media&token=4abbf36c-ba91-4e26-97ab-c838a12c17a9",
        performer: "Fr. Alexander Kattakayam CMI",
        hymnName: "Hannana Wamle Rahme",
        hymnLink: "/hymns/hannana-wamle-rahme",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fhannana-wamle-rahme%2Faudio%2F1781290026522.m4a?alt=media&token=6affa316-9b93-4909-95e7-8d645f800156",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "Hannana Wamle Rahme",
        hymnLink: "/hymns/hannana-wamle-rahme",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fslotha-dawthultha-maryam%2Faudio%2F1781096465568.m4a?alt=media&token=0a937dc1-2d0b-463f-a3ae-d10470c1844a",
        performer: "Fr. Alexander Kattakayam CMI",
        hymnName: "Slotha Dawthulta Maryam",
        hymnLink: "/hymns/slotha-dawthultha-maryam",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fslotha-dawthultha-maryam%2Faudio%2F1781290335663.m4a?alt=media&token=53201f17-5391-4f98-afbb-4e23e36c6e7c",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "Slotha Dawthulta Maryam",
        hymnLink: "/hymns/slotha-dawthultha-maryam",
      },
    ],
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
      english: {
        stanzas: [
          {
            shuraya: "He executes justice for the oppressed.",
            lines: [
              "Your holy labours are not lost, O Sahde,",
              "Mshiha the King you loved will not pass by;",
              "For in the earth your triumphant bones rest,",
              "And in life's book your names, friends of the Son.",
            ],
          },
        ],
      },
    },
    recordings: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fla-metthalmin%2Faudio%2F1779217771190.m4a?alt=media&token=c8f3fc1b-7a45-4849-8770-dd653e821d62",
        performer: "Binu George",
        hymnName: "La Mettalmin",
        hymnLink: "/hymns/la-metthalmin",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Flakhu-qareyn-dallisin%2Faudio%2F1781096409514.m4a?alt=media&token=304626a0-b911-4aad-b81d-87f71b14625e",
        performer: "Fr. Alexander Kattakayam CMI",
        hymnName: "Lakhu Qareyn Dallisin",
        hymnLink: "/hymns/lakhu-qareyn-dallisin",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Flakhu-qareyn-dallisin%2Faudio%2F1781290264228.m4a?alt=media&token=c4cfdc67-0442-4d73-92b4-ae0142f35099",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "Lakhu Qareyn Dallisin",
        hymnLink: "/hymns/lakhu-qareyn-dallisin",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fo-maryam-emme%2Faudio%2F1781290822961.m4a?alt=media&token=001ca1ed-ae97-40ee-b2f9-1b7c2e3ff2ce",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "O Maryam Emme",
        hymnLink: "/hymns/o-maryam-emme",
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
      english: {
        stanzas: [
          {
            shuraya: "I will bless MarYah at all times.",
            lines: [
              "Blest, hidden power,",
              "Dwelling in the Sahdes' bones, laid to rest within their graves, driving demons from the world.",
              "Through their teaching they stopped all the error carved in stone; unseen, they visit all the earth, teaching all to worship You:",
              "For You Alone are MarYah.",
            ],
          },
        ],
      },
    },
    recordings: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fbrikh-hayla-kasya%2Faudio%2F1781292196786.m4a?alt=media&token=55541e88-bb43-4bc3-9454-c8123f91b69e",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "Brikh Hayla Kasya",
        hymnLink: "/hymns/brikh-hayla-kasya",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fbrikh-hayla-kasya%2Faudio%2F1779124703528.m4a?alt=media&token=b5d859b4-54fd-4eea-b77e-e6b30e44ce54",
        performer: "Binu George",
        hymnName: "Brikh Hayla Kasya",
        hymnLink: "/hymns/brikh-hayla-kasya",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fbrikhu-mshiha-detha%2Faudio%2F1780065921619.m4a?alt=media&token=7d091dfd-78bf-442a-b3b2-64ed6b4a4d8d",
        performer: "Binu George",
        hymnName: "Brikhu Mshiha Detha",
        hymnLink: "/hymns/brikhu-mshiha-detha",
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
    recordings: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Ftheth-kenpe%2Faudio%2F1781096537810.m4a?alt=media&token=4b3acbff-cb64-42f0-bc12-3bc6f9e3f6d6",
        performer: "Fr. Alexander Kattakayam CMI",
        hymnName: "Theth Kenpe",
        hymnLink: "/hymns/theth-kenpe",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Ftheth-kenpe%2Faudio%2F1781290856095.m4a?alt=media&token=fe509543-59b4-421d-9a8d-1b0362a87173",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "Theth Kenpe",
        hymnLink: "/hymns/theth-kenpe",
      },
    ],
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
      english: {
        stanzas: [
          {
            shuraya: "For Your sake we are killed all day long.",
            lines: [
              "Holy Sahde who were slain,",
              "For the love of the M'shiha,",
              "Pray for all of us, we beg,",
              "Ask for mercy from Alaha.",
            ],
          },
          {
            shuraya: "In heaven and on earth.",
            lines: [
              "Your triumphant labours shine,",
              "And your struggles bring us joy;",
              "For M'shiha you were slain,",
              "You shall reign with Him on high.",
            ],
          },
        ],
      },
    },
    recordings: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fsahde-qandishe-dethqathal%2Faudio%2F1781096553691.m4a?alt=media&token=dd39d0ed-91d9-4687-b1bc-5e0d37932232",
        performer: "Fr. Alexander Kattakayam CMI",
        hymnName: "Sahde Qandishe Dethqattal",
        hymnLink: "/hymns/sahde-qandishe-dethqathal",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fsahde-qandishe-dethqathal%2Faudio%2F1781290877921.m4a?alt=media&token=8cf604b5-105f-4a24-a2de-cf96a7d1048e",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "Sahde Qandishe Dethqattal",
        hymnLink: "/hymns/sahde-qandishe-dethqathal",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fsahde-qandishe-dethqathal%2Faudio%2F1779125122899.m4a?alt=media&token=294b86fd-99f3-421f-b341-3022fc8a8847",
        performer: "Binu George",
        hymnName: "Sahde Qandishe Dethqattal",
        hymnLink: "/hymns/sahde-qandishe-dethqathal",
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
    recordings: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fyathir-min-kol%2Faudio%2F1781096608897.m4a?alt=media&token=29b0cf6e-450b-4eec-b8c2-c4d9506c654c",
        performer: "Fr. Alexander Kattakayam CMI",
        hymnName: "Yathir Min Kol",
        hymnLink: "/hymns/yathir-min-kol",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fyathir-min-kol%2Faudio%2F1781291121145.m4a?alt=media&token=7b6dbdf4-55a6-43b6-8449-bc72cc57367d",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "Yathir Min Kol",
        hymnLink: "/hymns/yathir-min-kol",
      },
    ],
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
    recordings: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Flwathakh-arimeth-aynay%2Faudio%2F1781296703606.m4a?alt=media&token=90d939fd-24b1-481f-8643-036692738656",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "L'wathakh Arimeth Aynay",
        hymnLink: "/hymns/lwathakh-arimeth-aynay",
      },
    ],
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
    recordings: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fnettaiyaw%2Faudio%2F1781096141516.m4a?alt=media&token=2be02986-b8a0-4cc2-917d-6c9dd618318a",
        performer: "Fr. Alexander Kattakayam CMI",
        hymnName: "Nettayaw",
        hymnLink: "/hymns/nettaiyaw",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fnettaiyaw%2Faudio%2F1781296727154.m4a?alt=media&token=b8c0e7c7-8290-49b3-8047-911389302279",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "Nettayaw",
        hymnLink: "/hymns/nettaiyaw",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fqrew-zawna-dalma-hana%2Faudio%2F1781291633254.m4a?alt=media&token=2a82b67e-c5da-4898-b74a-cdace665d741",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "Qrew Zawna d'Alma Hana",
        hymnLink: "/hymns/qrew-zawna-dalma-hana",
      },
    ],
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
    recordings: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fshlama-nesge-lakh%2Faudio%2F1781293003500.m4a?alt=media&token=d085581c-5f75-4e55-845f-9b3c0ecfa223",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "Shlama Nesge Lakh",
        hymnLink: "/hymns/shlama-nesge-lakh",
      },
    ],
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
    recordings: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Flzandiqe-la-qrayt%2Faudio%2F1781291261841.m4a?alt=media&token=f46e39b9-93a9-400e-bb6a-22862cc630e1",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "L'zandiqe La Qrayt",
        hymnLink: "/hymns/lzandiqe-la-qrayt",
      },
    ],
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
    recordings: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fsagdinan-lakh-yaldaw-dadam%2Faudio%2F1781288033575.m4a?alt=media&token=eb8eba9b-a5a9-4d80-96e8-eb01129fdd27",
        performer: "Fr. Alexander Kattakayam CMI",
        hymnName: "Sagdin Lakh Yaldaw D'adam",
        hymnLink: "/hymns/sagdinan-lakh-yaldaw-dadam",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fsagdinan-lakh-yaldaw-dadam%2Faudio%2F1781292152033.m4a?alt=media&token=d3e6b8d6-d630-4e65-bc6b-cd7661a810eb",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "Sagdin Lakh Yaldaw D'adam",
        hymnLink: "/hymns/sagdinan-lakh-yaldaw-dadam",
      },
    ],
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
      english: {
        stanzas: [
          {
            shuraya:
              "He who speaks peace to His people and to His righteous ones.",
            lines: [
              "Peace to Sahde,",
              "And unto their bones honour,",
              "Glory to their Lord,",
              "And to us help through their prayers.",
            ],
          },
          {
            shuraya: "And in Your light we see light.",
            lines: [
              "Sahde in light,",
              "And Shlihe in light's chamber,",
              "And they sing His praise,",
              "To the One in splendid light.",
            ],
          },
        ],
      },
    },
    recordings: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fshlama-lsahde-walgarmayhon-iqara%2Faudio%2F1781287749793.m4a?alt=media&token=677a2ede-8995-44ea-9d9a-836891143854",
        performer: "Fr. Alexander Kattakayam CMI",
        hymnName: "Shlama L'sahde Walgarmayhon Iqara",
        hymnLink: "/hymns/shlama-lsahde-walgarmayhon-iqara",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fshlama-lsahde-walgarmayhon-iqara%2Faudio%2F1781291378796.m4a?alt=media&token=6b86baab-89ad-4a9e-ac3d-40811f6f383f",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "Shlama L'sahde Walgarmayhon Iqara",
        hymnLink: "/hymns/shlama-lsahde-walgarmayhon-iqara",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fshlama-lsahde-walgarmayhon-iqara%2Faudio%2F1779124294649.m4a?alt=media&token=35bc74d3-1b98-4b9f-b129-8cb4b8f8545d",
        performer: "Binu George",
        hymnName: "Shlama L'sahde Walgarmayhon Iqara",
        hymnLink: "/hymns/shlama-lsahde-walgarmayhon-iqara",
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
    recordings: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fresh-haylawathe%2Faudio%2F1772346813467.m4a?alt=media&token=81979307-7a00-48f7-a9d4-76a2da725674",
        performer: "Fr. Mathew Chellakandathil",
        hymnName: "Resh Haylawatha",
        hymnLink: "/hymns/resh-haylawathe",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fbrikhu-dawrew-dukhranhon-harka%2Faudio%2F1781095009925.m4a?alt=media&token=d3e165f0-bd1a-477a-82e5-40ad92cc3708",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "Brikhu Dawrew Dukhranhon Harka",
        hymnLink: "/hymns/brikhu-dawrew-dukhranhon-harka",
      },
    ],
    link: "/hymns/resh-haylawathe",
  },
  {
    num: 24,
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
    num: 25,
    name: "Qala Ramba",
    nameSyr: "ܩܵܠܵܐ ܪܲܒܵܐ",
    nameMal: "കാലാ റമ്പാ",
    structure: "",
    note: "Texts of this type can be longer; only a sample is given here.",
    syriacText: {
      stanzas: [
        {
          shuraya:
            "ܙܲܕܝܼܩܲܬ݁ ܡܵܪܝܵܐ ܘܛܵܒ݂ ܬܪܝܼܨܝܼܢ ܕܝܼܢܲܝ̈ܟ: ܡܪܲܚܡܵܢ ܐܲܢ݇ܬ݁ ܡܵܪܝܵܐ ܘܙܲܕܝܼܩ.",
          body: "ܡܵܪܝܵܐ ܐܸܢܗܘܼ ܕܥܲܠ ܙܲܕܝܼܩܹ̈ܐ ܬܪܲܚܸܡ. ܡ̣ܢ ܣܘܼܥܪܵܢܹ̈ܐ ܫܲܦܝܼܪܹ̈ܐ ܕܲܥܒܲܕܘ ܡܩܲܒ݁ܠܝܼܢ ܦܘܼܪܥܵܢܵܐ: ܘܠܝܼ ܕܠܲܝܬ݁ ܠܝܼ ܥܒ݂ܵܕܹ̈ܐ ܛܵܒܹ̈ܐ. ܘܐܸܢܵܐ ܠܵܐ ܫܵܘܹܐ ܐ݇ܢܵܐ ܠܪܲܚ̈ܡܹܐ: ܚܘܼܢܲܝܢܝ ܒܛܲܝܒ݁ܘܼܬ݂ܵܟ ܘܪܲܚܸܡܥܠܲܝܢ܀",
        },
      ],
    },
    recordings: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fmarya-enhu%2Faudio%2F1781292122442.m4a?alt=media&token=8fea3886-dee4-409a-89d7-3e4c7bc00566",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "Marya Enhu",
        hymnLink: "/hymns/marya-enhu",
      },
    ],
    link: "/hymns/marya-enhu",
  },
  {
    num: 26,
    name: "Kyanaya mode",
    nameSyr: "",
    nameMal: "ക്യാനായ രീതി",
    structure: "",
    syriacText: {
      stanzas: [
        {
          shuraya:
            "ܡ̣ܢ ܥܘܼܡܩܵܐ ܩܕܹܝܬ݂ܵܟ݂ ܡܵܪܝܵܐ ܘܲܫܡܲܥܬ݁ ܒܩܵܠܝ: ܪܢܹܝܬ݂ ܒܠܸܠܝܵܐ ܘܲܒ݂ܠܹܒ݁ܝ ܪܢܹܝܬ݂.",
          body: "ܒܟ݂ܘܼܪܣܲܝ ܕܝܼܢܵܟ݂ ܪܢܹܝܬ݂ ܡܫܝܼܚܵܐ ܘܲܒ݂ܕܸܚܠܵܐ ܘܙܵܘܥܵܐ ܗܘܵܘ ܟܠܗܘܿܢ ܗܲܕܵܡܲܝ̈. ܡܲܢܘܼ ܩܕ݂ܵܡ ܒܹܝܡ ܕܝܼܠܵܟ݂ ܢܸܗܘܸܐ ܒܥܘܼܕܪܵܢܝ ܡ̣ܢ ܓܸܢܣܲܢ ܘܡ̣ܢ ܐ݇ܢܵܫܘܼܬܲܢ: ܕܪܵܚ̈ܡܲܝ ܟܠܗܘܿܢ ܥܲܡ ܩܲܪ̈ܝܼܒܲܝ: ܡ̣ܢ ܪܘܼܚܩܵܐ ܢܩܘܼܡܘܼܢ ܘܲܢܚܘܼܪܘܼܢ ܒܝܼ. ܕܲܝܵܢܵܐ ܟܹܐܢܵܐ ܐܲܝܟ݂ ܣܘܿܓ݂ܵܐܐ ܕܪ̈ܲܚܡܲܝܟ ܚܘܼܢܲܝܢܝ ܡܪܲܚܡܵܢܵܐ. ܘܠܵܐ ܡܵܪܝ ܐܲܝܟ݂ ܣܘܿܓ݂ܵܐܐ ܕܚܵܘ̈ܒܹ݁ܐ ܕܣܸܥܪܹܬ݂܀",
        },
      ],
    },
    recordings: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fbkursay-dinakh%2Faudio%2F1781089763648.m4a?alt=media&token=a601f310-71cc-4c37-9eb9-810d331c9d49",
        performer: "Fr. Alexander Kattakayam CMI",
        hymnName: "B'kursay Dinakh",
        hymnLink: "/hymns/bkursay-dinakh",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hudra-d80ee.firebasestorage.app/o/hymns%2Fbkursay-dinakh%2Faudio%2F1781288340182.m4a?alt=media&token=1683834c-1c53-4ed1-83fd-d14d2cf8735d",
        performer: "Fr. Emmanuel Thelly CMI",
        hymnName: "B'kursay Dinakh",
        hymnLink: "/hymns/bkursay-dinakh",
      },
    ],
    link: "/hymns/bkursay-dinakh",
  },
];

type ReshQalaRecording = NonNullable<ReshQala["recordings"]>[number];

function groupRecordingsByHymn(
  recordings: NonNullable<ReshQala["recordings"]>,
  defaultName: string,
  defaultLink?: string,
) {
  const groups: {
    hymnName: string;
    hymnLink?: string;
    items: ReshQalaRecording[];
  }[] = [];

  for (const rec of recordings) {
    const hymnName = rec.hymnName ?? defaultName;
    const hymnLink = rec.hymnLink ?? (rec.hymnName ? undefined : defaultLink);
    const key = hymnLink ?? rec.hymnName ?? defaultLink ?? defaultName;

    const last = groups.at(-1);
    const lastKey = last ? (last.hymnLink ?? last.hymnName) : undefined;

    if (last && lastKey === key) {
      last.items.push(rec);
    } else {
      groups.push({ hymnName, hymnLink, items: [rec] });
    }
  }

  return groups;
}

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
              {r.nameSyr && (
                <Syr className="text-lg text-slate-600 text-right self-end w-full sm:w-auto sm:shrink-0">
                  {r.nameSyr}
                </Syr>
              )}
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
                  {r.syriacText.english && (
                    <div
                      className="mt-2 pt-2 border-t border-slate-200 leading-normal [font-family:'Idiqlat',serif] text-sm"
                      style={{ fontWeight: 400, fontSynthesis: "none" }}
                    >
                      {r.syriacText.english.stanzas.map((stanza, si, arr) => (
                        <div
                          key={si}
                          className={si < arr.length - 1 ? "mb-3" : ""}
                        >
                          <p className="m-0 leading-normal whitespace-pre-line">
                            {stanza.shuraya && (
                              <span className="text-red-700">
                                {stanza.shuraya}
                              </span>
                            )}
                            {stanza.lines.length > 0 && (
                              <>
                                {"\n"}
                                <span className="text-slate-600">
                                  {stanza.lines.join("\n")}
                                </span>
                              </>
                            )}
                          </p>
                        </div>
                      ))}
                    </div>
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
                    <> - {r.malayalamCommonName.note}.</>
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
              <Accordion
                type="single"
                collapsible
                className="pt-2 border-t border-slate-100"
              >
                <AccordionItem value="recordings" className="border-none">
                  <AccordionTrigger className="py-1 items-center [&>span:first-child]:mt-0">
                    <span className="flex w-full items-center gap-2 min-w-0">
                      <span className="font-semibold text-slate-500 m-0 flex-1 text-left">
                        Recordings
                        {r.recordings && r.recordings.length > 0 && (
                          <span className="text-xs text-slate-400 font-normal ml-1">
                            ({r.recordings.length})
                          </span>
                        )}
                      </span>
                      {r.link && (
                        <Link
                          href={r.link.startsWith("/") ? r.link : `/${r.link}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`${r.name} on Hudra`}
                          title="Hudra page"
                          className="shrink-0 flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      )}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="mt-3">
                    <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                      {r.recordings && r.recordings.length > 0 ? (
                        <div className="space-y-0">
                          {groupRecordingsByHymn(
                            r.recordings,
                            r.name,
                            r.link,
                          ).map((group, gi) => (
                            <div
                              key={gi}
                              className={
                                gi > 0
                                  ? "pt-2 mt-2 border-t border-slate-200"
                                  : undefined
                              }
                            >
                              <p className="text-xs font-medium text-slate-600 m-0 mb-1">
                                {group.hymnLink ? (
                                  <Link
                                    href={
                                      group.hymnLink.startsWith("/")
                                        ? group.hymnLink
                                        : `/${group.hymnLink}`
                                    }
                                    className="italic text-primary hover:underline"
                                  >
                                    {group.hymnName}
                                  </Link>
                                ) : (
                                  <span className="italic">
                                    {group.hymnName}
                                  </span>
                                )}
                              </p>
                              <div className="space-y-1.5">
                                {group.items.map((rec, i) => (
                                  <div key={i}>
                                    {rec.performer && (
                                      <p className="text-xs text-slate-500 m-0 mb-0.5">
                                        {rec.performer}
                                      </p>
                                    )}
                                    {rec.youtubeEmbedSrc ? (
                                      <RecordingEmbed
                                        src={rec.youtubeEmbedSrc}
                                        title={group.hymnName}
                                      />
                                    ) : (
                                      rec.url && (
                                        <audio
                                          controls
                                          controlsList="nodownload"
                                          preload="none"
                                          className="w-full h-9"
                                          src={rec.url}
                                        />
                                      )
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-slate-400 italic text-xs m-0">
                          Coming soon.
                        </p>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
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
  const [notRetainedOpen, setNotRetainedOpen] =
    useState<string[]>(notRetainedKeys);

  return (
    <>
      <div className="not-prose mb-6 rounded-lg bg-yellow-50 border border-yellow-300 px-5 py-3 flex items-center gap-3 text-yellow-800">
        <span className="text-lg" aria-hidden="true">
          🚧
        </span>
        <p className="text-sm font-medium m-0">
          Work in progress - this article is incomplete and may change
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
        <em>Onyatha</em> (<Syr>ܥܘܿܢܝܵܬ݂ܵܐ</Syr>, sing. <em>onitha</em> -
        &ldquo;antiphon&rdquo;) are sung during all liturgical services, most
        prominently in the Liturgy of the Hours. Each <em>onitha</em> is
        preceded by a psalm verse called a <em>shuraya</em> (<Syr>ܫܘܼܪܵܝܵܐ</Syr>
        , lit. &ldquo;beginning&rdquo;). The liturgical text will usually
        indicate which <em>resh qala</em> each <em>onitha</em> is to be sung to.
        The melody of the <em>resh qala</em> typically also prescribes a
        distinct way of singing the <em>shuraya</em> that precedes it.
      </p>
      <p>
        Hymns are known by the opening words of the <em>onitha</em> itself, not
        by those of the preceding <em>shuraya</em>. This is because different{" "}
        <em>onyatha</em> may share the same psalm verse, each sung to a
        different tune - so the <em>shuraya</em> alone does not uniquely
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
        monastic (<em>dayra</em>) culture of Malabar - a strong local community
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
      <p>
        Some of these <em>qale</em> might have two (or more) variants. According
        to Jarly Mathew Thalikasthanam, they represent the difference between
        the Cathedral system and the monastic system - the melodies used in the
        Liturgy of the Hours primarily being those of the monastic system, and
        the ones from the Qurbana being those of the cathedral system.
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
          Resh Qale omitted from the Malayalam translation
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
        But you may ask - where is <em>Thuyay</em>? Where is{" "}
        <em>Brikh Hannana</em>? Why are they not present in these lists? Those
        melodies, though part of the Malabar repertoire, are melodies of{" "}
        <em>Teshbhatha</em> (sing. <em>teshbohta</em> - &ldquo;praise&rdquo;),
        and not <em>onyatha</em>; they will be dealt with separately in another
        article.
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
