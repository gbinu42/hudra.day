"use client";

import { ReactNode, useState } from "react";

interface Stanza {
  psalm: string;
  antiphon: string;
  // For stanzas with a ܕܨܘܼܪܬܵܐ rubric and split antiphon colouring
  dzuwrta?: boolean;
  antiphonRedPart?: string; // shown in red before antiphon
}

interface TraditionNote {
  label: string;
  note?: string;
  tunes?: number;
}

interface Antiphon {
  num: number;
  titleEn: string;
  titleSyr: string;
  subtitle: string;
  subtitleSyr: string;
  stanzas: Stanza[];
  description?: string;
  traditions: TraditionNote[];
  hudraLink?: string;
}

const ANTIPHONS: Antiphon[] = [
  {
    num: 1,
    titleEn: "Sahde Qandishe Sallaw",
    titleSyr: "ܣܵܗܕܹ̈ܐ ܩܲܕܝܼܫܹ̈ܐ ܨܲܠܵܘ",
    subtitle: "Monday Ramsha",
    subtitleSyr: "ܕܪܲܡܫܵܐ ܕܲܬ݂ܪܹܝܢܒ݁ܫܲܒܵܐ",
    stanzas: [
      {
        psalm: "ܫܲܒܲܚܘ ܙܲܕ̇ܝܼܩܹ̈ܐ ܠܡܵܪܝܵܐ.",
        antiphon:
          "ܣܵܗܕܹ̈ܐ ܩܲܕܝܼܫܹ̈ܐ ܨܲܠܵܘ ܥܲܠ ܫܲܝܢܵܐ: ܕܲܒ݂ܚܲܕ݂ܘܵܬ݂ܵܐ ܢܸܥܒܸ݁ܕ݂ ܥܹܐܕܲܝ̈ܟ̇ܘܿܢ.",
      },
      {
        psalm: "ܘܠܲܬ݂ܪ̈ܝܼܨܹ̈ܐ ܝܵܐܝܵܐ ܬܸܫܒ݁ܘܿܚܬܵܐ.",
        antiphon:
          "ܣܵܗܕܹ̈ܐ ܕܐܸܬ݂ܪܲܓ݂ܪܲܓ݂ܘ ܕܢܸܚܙܘܿܢ ܠܲܡܫܝܼܚܵܐ: ܒܣܲܝܦܵܐ ܩܢܵܘ ܓܸܦܹ̈ܐ ܘܲܦܪܲܚܘ ܠܲܫܡܲܝܵܐ.",
      },
    ],
    traditions: [
      { label: "Syro-Malabar" },
      { label: "Chaldean" },
      { label: "Assyrian", tunes: 2 },
    ],
    description:
      "The martyrs are asked to pray for peace so that their feast may be celebrated with joy. The second verse recalls their longing for Christ: by the sword they gained wings and flew to heaven.",
    hudraLink: "/hymns/sahde-qandishe-sallaw-al-shayna",
  },
  {
    num: 2,
    titleEn: "B'endan Sapra",
    titleSyr: "ܒܥܸܕܵܢ ܨܲܦܪܵܐ",
    subtitle: "Monday Sapra",
    subtitleSyr: "ܕܨܲܦܪܵܐ ܕܲܬܼܪܹܝܢܒ̇ܫܲܒܵܐ",
    stanzas: [
      {
        psalm: "ܡܵܪܝܵܐ ܒܨܲܦܪܵܐ ܬܸܫܡܲܥ ܩܵܠܝ.",
        antiphon:
          "ܒܥܸܕܵܢ ܨܲܦܪܵܐ ܕܡܸܬ݂ܦܲܬ݂ܚܝܼܢ: ܬܲܪ̈ܥܲܝ ܪܵܘܡܵܐ ܠܲܨܠܘܿܬܼܵܐ: ܩܲܒܸ̇ܠ ܡܵܪܲܢ ܒܵܥܘܼܬܲܢ. ܘܦܲܢܵܐ ܒܪ̈ܲܚܡܲܝܟ ܫܹ̈ܐܠܵܬܲܢ: ܘܲܥܒܸܕ݂ ܣܲܒ݂ܪܵܐ ܘܦܘܼܪܩܵܢܵܐ: ܠܢܲܦ̮ܫܵܬ݂ܵܐ ܕܲܡܣܲܟ̇ܝ̈ܵܢ ܠܵܟ݂.",
      },
    ],
    traditions: [
      { label: "Syro-Malabar" },
      { label: "Chaldean" },
      { label: "Assyrian" },
    ],
    description:
      "At the morning hour when the gates of heaven open for prayer, the faithful ask the Lord to receive their petitions, grant hope and salvation to the souls that await him.",
    hudraLink: "/hymns/benda-sapra-methpathhin",
  },
  {
    num: 3,
    titleEn: "Estappanos",
    titleSyr: "ܐܸܣܛܲܦܵܢܘܿܣ",
    subtitle: "Tuesday Ramsha",
    subtitleSyr: "ܕܪܲܡܫܵܐ ܕܲܬܼܠܵܬܼܒ̇ܫܲܒܵܐ",
    stanzas: [
      {
        psalm: "ܕܘܼܟ݂ܪܵܢܵܐ ܠܥܵܠܲܡ ܢܸܗܘܹܐ ܠܙܲܕܝܼܩܵܐ.",
        antiphon:
          "ܐܸܣܛܲܦܵܢܘܿܣ ܐܘܼܪܚܵܐ ܕܪܲܫ: ܘܲܒ݂ܥܸܩܒ݂ܵܬܹ̈ܗ ܪܕ݂ܵܘ ܣܵܗܕܹ̈ܐ. ܘܥܲܡܹܗ ܕܚܲܬ݂ܢܵܐ ܡܸܬ݂ܒܲܣܡܝܼܢ: ܒܲܓ݂ܢܘܿܢ ܢܘܼܗܪܵܐ ܕܠܵܐ ܡܸܫܬ݁ܪܸܐ.",
      },
      {
        psalm: "ܘܡ̣ܢ ܛܸܒܵܐ ܒܝܼܫܵܐ ܠܵܐ ܢܸܕ݂ܚܲܠ.",
        antiphon:
          "ܐܸܣܛܲܦܵܢܘܿܣ ܟܲܕ݂ ܐܸܬ݂ܪܓܸܡ: ܙܝܼܘܵܐ ܕܡܵܪܹܗ ܒܪܵܘܡܵܐ ܚܙܵܐ. ܘܲܠܪܘܼܚܩܘܼܕ݂ܫܵܐ ܟܲܕ݂ ܓܵܕ݂ܠܵܐ: ܟܠܝܼܠܵܐ ܠܪܹܫܵܐ ܕܲܡܗܲܝܡܢܹ̈ܐ.",
      },
    ],
    traditions: [
      { label: "Syro-Malabar" },
      { label: "Chaldean", note: "Melody same as one of the Assyrian tunes" },
      { label: "Assyrian", tunes: 2 },
    ],
    description:
      "Stephen blazed the trail and the martyrs ran in his footsteps. Stoned for his faith, he saw the glory of his Lord on high; now the Holy Spirit weaves a crown for the head of the faithful.",
    hudraLink: "/hymns/esthapanos-urha-drash",
  },
  {
    num: 4,
    titleEn: "Sahde Wayton",
    titleSyr: "ܣܵܗܕܹ̈ܐ ܗ̤ܘܲܝܬ̇ܘܿܢ",
    subtitle: "Tuesday Sapra",
    subtitleSyr: "ܕܨܲܦܪܵܐ ܕܲܬ݂ܠܵܬ݂ܒ̇ܫܲܒܵܐ",
    stanzas: [
      {
        psalm: "ܫܲܒܲܚܘ ܙܲܕ̇ܝܼܩܹ̈ܐ ܠܡܵܪܝܵܐ.",
        antiphon:
          "ܣܵܗܕܹ̈ܐ ܗ̤ܘܲܝܬ̇ܘܿܢ ܬܲܓܵܪܹ̈ܐ: ܘܗܵܐ ܣܝܼ̈ܡܵܬ݂ܟ݂ܘܿܢ ܒܲܫܡܲܝܵܐ. ܙܒܲܢܬ̇ܘܿܢܵܗ̇ ܠܡܲܪܓܵܢܝܼܬ݂ܵܐ: ܒܲܕ݂ܡܵܐ ܕܐܲܪܕܝܼܘ ܨܵܘܪ̈ܲܝܟ̇ܘܿܢ.",
      },
      {
        psalm: "ܘܠܲܬ݂ܪ̈ܝܼܨܹܐ ܝܵܐܝܵܐ ܬܸܫܒ݁ܘܿܚܬܵܐ.",
        antiphon:
          "ܣܵܗܕܹ̈ܐ ܕܐܸܬ݂ܥܲܠܝܼܘ ܘܲܡܛܵܘ: ܠܐܘܿܪܸܫܠܸܡ ܗܵܝ ܕܒܲܫܡܲܝܵܐ. ܘܙܲܒ݂ܢܘܼܗܝ ܒܲܕ݂ܡܵܐ ܕܨܵܘܪ̈ܲܝܗܘܿܢ: ܠܐܲܬ݂ܪܵܐ ܕܠܹܗ̤ܘ ܡܣܲܟܹ݁ܝܢ ܗ݇ܘ̣ܵܘ.",
      },
    ],
    traditions: [
      { label: "Syro-Malabar" },
      { label: "Chaldean", note: "Tune has differences from Assyrian" },
      { label: "Assyrian", tunes: 2 },
    ],
    description:
      "The martyrs are compared to merchants who laid up their treasure in heaven, purchasing the pearl of great price with their own blood, and now dwell in the heavenly Jerusalem.",
    hudraLink: "/hymns/sahde-waython-thangare",
  },
  {
    num: 5,
    titleEn: "Sahde Qandishe Dethqattal",
    titleSyr: "ܣܵܗܕܹ̈ܐ ܩܲܕܝܼܫܹ̈ܐ ܕܐܸܬ݂ܩܲܛܲܠܘ",
    subtitle: "Wednesday Ramsha",
    subtitleSyr: "ܕܪܲܡܫܵܐ ܕܐܲܪܒܲܥܒ̇ܫܲܒܵܐ",
    stanzas: [
      {
        psalm: "ܡܸܛܠܵܬܼܵܟܼ ܐܸܬ݂ܩܲܛܲܠܢ ܟܠܝܘܿܡ.",
        antiphon:
          "ܣܵܗܕܹ̈ܐ ܩܲܕܝܼܫܹ̈ܐ ܕܐܸܬ݂ܩܲܛܲܠܘ: ܡܸܛܠ ܚܘܼܒܹ̇ܗ ܕܲܡܫܝܼܚܵܐ. ܡܦܝܼܣܝܼܢܲܢ ܥܲܠ ܟܠܲܢ: ܒܥܵܘ ܪ̈ܲܚܡܹܐ ܡ̣ܢ ܐܲܠܵܗܵܐ.",
      },
      {
        psalm: "ܒܲܫܡܲܝܵܐ ܘܒܲܪܥܵܐ.",
        antiphon:
          "ܢܵܨܚܝܼܢ ܥܲܡܠܲܝ̈ܟ݁ܘܿܢ ܘܲܡܚܲܕܸܐ ܠܲܢ: ܥܘܼܗܕܵܢܵܐ ܕܬܲܟ݂ܬ݁ܘܼܫܲܝ̈ܟ݁ܘܿܢ. ܕܲܚܠܵܦ ܡܫܝܼܚܵܐ ܐܸܬ݂ܩܲܛܲܠܬ݁ܘܿܢ: ܘܥܲܡܹܗ ܒܪܵܘܡܵܐ ܬܲܡܠ̱ܟ݂ܘܿܢ.",
      },
    ],
    traditions: [
      { label: "Syro-Malabar" },
      { label: "Chaldean" },
      { label: "Assyrian" },
    ],
    description:
      "The holy martyrs slain for the love of Christ are asked to intercede for all. The memory of their struggles is recalled as a source of joy, for they were slain for Christ and shall reign with him on high.",
    hudraLink: "/hymns/sahde-qandishe-dethqathal",
  },
  {
    num: 6,
    titleEn: "Sahde Qandishe Malpane",
    titleSyr: "ܣܵܗܕܹ̈ܐ ܩܲܕܝܼܫܹ̈ܐ ܡܲܠܦܵܢܹ̈ܐ",
    subtitle: "Wednesday Sapra",
    subtitleSyr: "ܕܨܲܦܪܵܐ ܕܐܲܪܒܲܥܒ̇ܫܲܒܵܐ",
    stanzas: [
      {
        psalm: "ܢܵܘܕ̇ܘܿܢ ܠܵܟܼ ܡܵܪܝܵܐ ܥܲܒܼܕܲܝ̈ܟ.",
        antiphon:
          "ܣܵܗܕܹ̈ܐ ܩܲܕܝܼܫܹ̈ܐ ܡܲܠܦܵܢܹ̈ܐ ܕܗܲܝܡܵܢܘܼܬ݂ܵܐ: ܨܲܠܵܘ ܕܢܸܗܘܹܐ ܫܲܝܢܵܐ ܒܲܒܼܪܝܼܬ݂ܵܐ. ܩܪܵܒܹܐ ܢܸܬ݂ܒܲܛܠܘܿܢ ܘܚܸܪ̈ܝܵܢܹܐ ܢܸܫܠܘܿܢ ܡܸܢܲܢ: ܘܥܹܕܬܵܐ ܬܸܙܡܲܪ ܫܘܼܒ݂ܚܵܐ ܒܦܘܼܡ ܝܲܠܕܹܝ̈ـܗ̇.",
      },
    ],
    traditions: [
      { label: "Syro-Malabar" },
      {
        label: "Chaldean",
        note: "Same tune as Assyrian (tune of B'madnahay Sapra)",
      },
      { label: "Assyrian", note: "Tune of B'madnahay Sapra" },
    ],
    description:
      "The holy martyr-teachers of the faith are implored to pray that peace may come to creation, that wars and disputes may cease, and that the Church may be free to sing glory through the mouths of her children.",
    hudraLink: "/hymns/sahde-qandishe-malpane-dhaymanutha",
  },
  {
    num: 7,
    titleEn: "Sahde Brikhe",
    titleSyr: "ܣܵܗܕܹ̈ܐ ܒܪ̈ܝܼܟܹܐ",
    subtitle: "Thursday Ramsha",
    subtitleSyr: "ܕܪܲܡܫܵܐ ܕܚܲܡܫܵܒ̇ܫܲܒܵܐ",
    stanzas: [
      {
        psalm: "ܒܪܝܼܟܼܝܼܬ̇ܘܿܢ ܠܡܵܪܝܵܐ.",
        antiphon:
          "ܣܵܗܕܹ̈ܐ ܒܪ̈ܝܼܟܹܐ ܝܘܼܬ݂ܪܵܢܵܐ: ܣܲܓܝܼܐܵܐ ܚܲܫܒ̇ܘܼܗܝ ܠܡܵܘܬܵܐ. ܘܐܲܝܟ݂ ܐܝܼܩܵܪܹ̈ܐ ܘܡܵܘܗܲܒ݂ܬ݂ܵܐ: ܩܲܒܸ̇ܠܘ ܢܸܓ݂ܕܹ̈ܐ ܘܲܣܪ̈ܵܩܹܐ. ܘܗܵܫܵܐ ܒܵܬܲܪ ܡܵܘܬܲܝ̈ـܗܘܿܢ: ܠܥܵܠܡܵܐ ܡܦܲܠܓ݂ܝܼܢ ܛܵܒ݂̈ܵܬ݂ܵܐ: ܘܣܝܼܡܵܬ݂ܵܐ ܕܡܲܠ̈ܝܵܢ ܥܘܼܕ݂ܪ̈ܵܢܹܐ.",
      },
    ],
    traditions: [
      { label: "Syro-Malabar" },
      { label: "Chaldean", note: "Uses the Dayra Ellayta tune" },
      { label: "Assyrian", tunes: 2 },
    ],
    description:
      "The blessed martyrs reckoned death as great gain and received stripes and wounds as if they were honours and gifts. Now after their deaths they distribute to the world good things and treasures full of help.",
    hudraLink: "/hymns/sahde-brikhe",
  },
  {
    num: 8,
    titleEn: "Shlama l'Sahde",
    titleSyr: "ܫܠܵܡܵܐ ܠܣܵܗܕܹ̈ܐ",
    subtitle: "Thursday Sapra",
    subtitleSyr: "ܕܨܲܦܪܵܐ ܕܚܲܡܫܵܒ̇ܫܲܒܵܐ",
    stanzas: [
      {
        psalm: "ܕܡܡܲܠܸܠ ܫܠܵܡܵܐ ܥܲܠ ܥܲܡܹܗ ܘܥܲܡ ܙܲܕܝܼܩܵܘ̈ܗܝ.",
        antiphon:
          "ܫܠܵܡܵܐ ܠܣܵܗܕܹ̈ܐ ܘܲܠܓܲܪ̈ܡܲܝܗܘܿܢ ܐܝܼܩܵܪܵܐ: ܘܲܠܡܵܪܗܘܿܢ ܫܘܼܒܼܚܵܐ: ܘܠܲܢ ܒܲܨܠܘܿܬ݂ܗܘܿܢ ܥܘܼܕ݂ܪ̈ܵܢܹܐ.",
      },
      {
        psalm: "ܘܲܒ݂ܢܘܼܗܪܵܟ݂ ܗ݇ܘ̣ ܚܵܙܹܝܢܲܢ ܢܘܼܗܪܵܐ.",
        antiphon:
          "ܣܵܗܕܹ̈ܐ ܒܢܘܼܗܪܵܐ ܘܲܫܠܝܼܚܹ̈ܐ ܒܲܓ݂ܢܘܿܢ ܢܘܼܗܪܵܐ: ܘܗܵܐ ܙܵܡܪܝܼܢ ܫܘܼܒ݂ܚܵܐ: ܠܐܝܼܬ݂ܝܵܐ ܫܪܸܐ ܒܢܘܼܗܪܵܐ ܓܲܐܝܵܐ.",
      },
    ],
    traditions: [
      { label: "Syro-Malabar" },
      { label: "Chaldean" },
      { label: "Assyrian" },
    ],
    description:
      "Peace is offered to the martyrs and honour to their bones, glory to their Lord, and help to us through their prayer. Together with the apostles they shine in light, singing glory to the eternal God.",
    hudraLink: "/hymns/shlama-lsahde-walgarmayhon-iqara",
  },
  {
    num: 9,
    titleEn: "Mshiha Paroqe d'Alma",
    titleSyr: "ܡܫܝܼܚܵܐ ܦܵܪܘܿܩܹܗ ܕܥܵܠܡܵܐ",
    subtitle: "Friday Ramsha",
    subtitleSyr: "ܕܪܲܡܫܵܐ ܕܲܥܪܘܼܒ݂ܬܵܐ",
    stanzas: [
      {
        psalm: "ܗܵܠܹܝܢ ܟܠܗܹܝܢ ܓܕܲܫ̈ ܠܲܢ ܘܠܵܐ ܛܥܲܝܢܵܟܼ.",
        antiphon:
          "ܡܫܝܼܚܵܐ ܦܵܪܘܿܩܹܗ ܕܥܵܠܡܵܐ: ܡܲܠܟܵܐ ܪܲܒܵܐ ܕܬܸܫܒ̇ܘܿܚܬܵܐ: ܣܵܗܕܹ̈ܐ ܕܪܲܚܡܘܼܗܝ ܘܗܲܝܡܸܢܘ ܒܹܗ: ܠܐܵܟܹܠܩܲܪܨܵܐ ܐܲܒ݂ܗܸܬ݂ܘ ܗ݇ܘ̣ܵܘ. ܘܥܲܡ ܡܲܠܲܐܟܹ̈ܐ ܚܵܕܹܝܢ ܒܲܡܪ̈ܵܘܡܹܐ: ܘܲܩܕ݂ܵܡ ܐܲܠܵܗܵܐ ܩܵܝܡܝܼܢ: ܘܠܲܒ݂ܥܸܠܕܲܪܵܐ ܘܲܠܚܲܝܠܹܗ: ܬܚܘܿܬ݂ ܪܸ̈ܓ݂ܠܲܝܗܘܿܢ ܫܲܥܒܸܕ݂ܘ ܗ݇ܘ̣ܵܘ.",
      },
    ],
    traditions: [
      { label: "Syro-Malabar" },
      { label: "Chaldean" },
      { label: "Assyrian" },
    ],
    description:
      "Christ the great king of glory and Saviour of the world is praised. The martyrs who loved and believed in him put the adversary to shame; they now stand before God with the angels, the enemy subdued beneath their feet.",
    hudraLink: "/hymns/mshiha-paroqe-dalma",
  },
  {
    num: 10,
    titleEn: "Brikh Hayla Kasya",
    titleSyr: "ܒܪܝܼܟܼ ܚܲܝܠܵܐ ܟܲܣܝܵܐ",
    subtitle: "Friday Sapra",
    subtitleSyr: "ܕܨܲܦܪܵܐ ܕܲܥܪܘܼܒܼܬܵܐ",
    stanzas: [
      {
        psalm: "ܐܹܒܲܪܸܟܼ ܠܡܵܪܝܵܐ ܒܟܼܠܙܒܲܢ.",
        antiphon:
          "ܒܪܝܼܟܼ ܚܲܝܠܵܐ ܟܲܣܝܵܐ ܕܲܫܪܸܐ ܒܓܲܪ̈ܡܲܝܗܘܿܢ ܕܣܵܗܕܹ̈ܐ: ܣܝܼܡܝܼܢ ܓܹܝܪ ܒܩܲܒ݂ܪ̈ܲܝܗܘܿܢ: ܘܪܵܕ݂ܦܝܼܢ ܫܹܐܕܹ̈ܐ ܡ̣ܢ ܥܵܠܡܵܐ. ܒܝܘܼܠܦܵܢܗܘܿܢ ܒܲܛܸܠܘ ܛܘܼܥܝܲܝ ܟܠܵܗ̇ ܕܲܓ݂ܠܝܼܦܹ̈ܐ: ܘܣܵܥܪܝܼܢ ܟܲܣܝܵܐܝܼܬ݂ ܠܲܒ݂ܪܝܼܬ݂ܵܐ ܘܡܲܠܦܝܼܢ ܠܡܸܣܓܲܕ݂ ܠܵܟܼ: ܡܵܪܝܵܐ ܕܐܲܢ݇ܬ̇ܘܼ ܒܲܠܚܘܿܕܲܝܟ.",
      },
    ],
    traditions: [
      { label: "Syro-Malabar" },
      { label: "Chaldean" },
      { label: "Assyrian" },
    ],
    description:
      "The hidden power dwelling in the bones of the martyrs is blessed; lying in their tombs they still drive out demons. Through their teaching they abolished the error of idolatry and secretly work through creation to teach worship of God alone.",
    hudraLink: "/hymns/brikh-hayla-kasya",
  },
  {
    num: 11,
    titleEn: "Sahde Qandishe Lwishay Nuhra",
    titleSyr: "ܣܵܗܕܹ̈ܐ ܩܲܕܝܼܫܹ̈ܐ ܠܒܼܝܼܫܲܝ̈ ܢܘܼܗܪܵܐ",
    subtitle: "Saturday Ramsha",
    subtitleSyr: "ܕܪܲܡܫܵܐ ܕܫܲܒ̇ܬ݂ܵܐ",
    stanzas: [
      {
        psalm: "ܒܟܼܠܵܗ̇ ܐܲܪܥܵܐ ܢܸܦܩܲܬ̤ ܣܒܲܪܬ̇ܗܘܿܢ.",
        antiphon:
          "ܣܵܗܕܹ̈ܐ ܩܲܕܝܼܫܹ̈ܐ ܠܒܼܝܼܫܲܝ̈ ܢܘܼܗܪܵܐ: ܠܐܲܒܲܥܦܸܢܝܵܬܹ̈ܗ ܕܥܵܠܡܵܐ ܢܦܲܩܘ ܗ݇ܘ̣ܵܘ ܠܲܡܣܲܒܵܪܘܼ. ܬܠܝܼܬܼܵܝܘܼܬ݂ܵܐ ܡܫܲܒܲܚܬܵܐ: ܐܲܒ݂ܵܐ ܘܲܒ݂ܪܵܐ ܘܪܘܼܚܩܘܼܕ݂ܫܵܐ.",
      },
    ],
    traditions: [
      { label: "Syro-Malabar" },
      { label: "Chaldean" },
      { label: "Assyrian" },
    ],
    description:
      "The holy martyrs clothed in light went out to the four corners of the world to proclaim the glorified Trinity — Father, Son, and Holy Spirit.",
    hudraLink: "/hymns/sahde-qandishe-lwishay-nuhra",
  },
  {
    num: 12,
    titleEn: "B'sapra Sahde",
    titleSyr: "ܒܨܲܦܪܵܐ ܣܵܗܕܹ̈ܐ",
    subtitle: "Saturday Sapra",
    subtitleSyr: "ܕܨܲܦܪܵܐ ܕܫܲܒ̇ܬ݂ܵܐ",
    stanzas: [
      {
        psalm: "ܡܵܪܝܵܐ ܒܨܲܦܪܵܐ ܬܸܫܡܲܥ ܩܵܠܝ.",
        antiphon:
          "ܒܨܲܦܪܵܐ ܣܵܗܕܹ̈ܐ ܠܩܸܛܠܵܐ ܐܸܙܕܲܡܲܢܘ: ܘܝܲܡܝܼܢ ܡܵܪܲܢ ܓܵܕܼܠܵܐ ܟܠܝܼܠܲܝ̈ܗܘܿܢ.",
      },
      {
        psalm: "ܘܲܒ݂ܨܲܦܪܵܐ ܐܸܬ݁ܛܲܝܲܒ݂ ܘܐܸܬ݂ܚܙܸܐ ܠܵܟ݂.",
        antiphon:
          "ܒܨܲܦܪܵܐ ܣܵܗ̈ܕܹܐ ܪܵܗܛܝܼܢ ܠܐܵܓ݂ܘܿܢܵܐ: ܠܡܸܣܲܒ݂ ܐܲܓ݂ܪܵܐ ܥܦܝܼܦܵܐ ܕܥܲܡܠܲܝ̈ܗܘܿܢ.",
      },
    ],
    traditions: [
      { label: "Syro-Malabar" },
      { label: "Chaldean" },
      { label: "Assyrian" },
    ],
    description:
      "At the morning hour the martyrs were summoned to their deaths and the right hand of the Lord wove their crowns. They ran eagerly to the contest to receive the abundant reward of all their labours.",
    hudraLink: "/hymns/bsapra-sahde",
  },
  {
    num: 13,
    titleEn: "Sahdaw Dawra",
    titleSyr: "ܣܵܗܕܵܘ̈ܗܝ ܕܲܒ݂ܪܵܐ",
    subtitle: "Sunday Sapra (qadmaye)",
    subtitleSyr: "ܕܨܲܦܪܵܐ ܕܚܲܕܼܒ̇ܫܲܒܹ̈ܐ ܕܩܲܕܼܡܵܝܹ̈ܐ",
    stanzas: [
      {
        psalm: "ܘܲܒܼܢܵܘ̈ܗܝ ܕܲܡܪܲܝܡܵܐ ܟܠܟܼܘܿܢ.",
        dzuwrta: true,
        antiphonRedPart:
          "ܐܲܢ݇ܬ݁ܘܿܢ ܐܸܢܘܿܢ ܣܵܗܕܵܘ̈ܗܝ ܕܲܒܼܪܵܐ ܘܲܓܼܒܲـ̈ـܝܵܐ ܕܝܼܠܹܗ.",
        antiphon:
          "ܣܵܗܕܵܘ̈ܗܝ ܕܲܒ݂ܪܵܐ ܩܲܕ̇ܝܼܫܵܐ: ܒܪܲܗܛܵܐ ܛܵܒ݂ܵܐ ܐܸܬ݂ܟܲܠܲܠܘ: ܒܟ݂ܵܪܘܿܙܘܼܬ݂ܵܐ ܕܲܫܪܵܪܵܐ: ܘܥܲܡ ܡܲܠܲܐܟܹ̈ܐ ܕܒܲܫܡܲܝܵܐ: ܚܵܕܹܝܢ ܘܲܡܫܲܒ̇ܚܝܼܢ ܠܐܲܠܵܗܵܐ: ܥܒ݂ܝܼܕ݂ܝܼܢ ܚܠܵܦܲܝܢ ܒܲܥܵܝܹ̈ܐ.",
      },
    ],
    traditions: [
      { label: "Syro-Malabar" },
      { label: "Chaldean" },
      { label: "Assyrian" },
    ],
    description:
      "The witnesses of the Son are crowned through their good race in the proclamation of truth. Now rejoicing with the angels of heaven, praising God, they intercede on behalf of the faithful.",
    hudraLink: "/hymns/sahdaw-dawra",
  },
  {
    num: 14,
    titleEn: "La Mettalmin",
    titleSyr: "ܠܵܐ ܡܸܬ̇ܛܲܠܡܝܼܢ",
    subtitle: "Sunday Sapra (dahraye)",
    subtitleSyr: "ܕܨܲܦܪܵܐ ܕܚܲܕܼܒ̇ܫܲܒܹ̈ܐ ܕܲܐ݇ܚܪ̈ܵܝܹܐ",
    stanzas: [
      {
        psalm: "ܥܵܒܹܕ݂ ܕܝܼܢܵܐ ܠܲܛܠܝܼܡܹ̈ܐ.",
        dzuwrta: true,
        antiphonRedPart:
          "ܐܵܡܹܝܢ ܐܵܡܹܝܢ ܐܵܡܲܪ ܐ݇ܢܵܐ ܠܟܼܘܿܢ: ܕܡ̇ܢ ܕܲܠܟܼܘܿܢ ܫܵܡܲܥ ܠܝܼ ܫܵܡܲܥ: ܘܡ̇ܢ ܕܲܠܟܼܘܿܢ ܛܵܠܹܡ ܠܝܼ ܛܵܠܹܡ: ܘܡ̇ܢ ܕܠܝܼ ܛܵܠܹܡ: ܛܵܠܹܡ ܠܡ̇ܢ ܕܫܲܠܚܲܢܝ.",
        antiphon:
          "ܠܵܐ ܡܸܬ̇ܛܲܠܡܝܼܢ ܥܲܡܠܲܝ̈ܟ̇ܘܿܢ ܣܵܗܕܹ̈ܐ: ܘܠܵܐ ܥܵܒܲܪ ܡܲܠܟܵܐ ܡܫܝܼܚܵܐ ܕܲܪܚܸܡܬ̇ܘܿܢܵܝܗܝ. ܕܒܲܐܪܥܵܐ ܣܝܼܡܝܼܢ ܓܲܪ̈ܡܲܝܟ̇ܘܿܢ ܕܐܸܬ݂ܢܲܨܲܚܘ: ܘܒܲܣܦܲܪ ܚܲܝܹ̈ܐ ܫܡܵܗܲܝ̈ܟ̇ܘܿܢ ܪ̈ܵܚܡܵܘܗܝ ܕܲܒܼܪܵܐ.",
      },
    ],
    traditions: [
      { label: "Syro-Malabar" },
      { label: "Chaldean" },
      { label: "Assyrian" },
    ],
    description:
      "The labours of the martyrs are not in vain, nor does Christ whom they loved pass them by. Their triumphant bones lie in the earth, and their names — as beloved ones of the Son — are written in the Book of Life.",
    hudraLink: "/hymns/la-metthalmin",
  },
];

function SyriacText({ children }: { children: ReactNode }) {
  return (
    <span
      className="[font-family:'Idiqlat',serif]"
      dir="rtl"
      style={{ fontWeight: 400, fontSynthesis: "none" }}
    >
      {children}
    </span>
  );
}

function AntiphonEntry({ a, open }: { a: Antiphon; open: boolean }) {
  return (
    <details open={open} className="not-prose group mb-2">
      <summary className="flex cursor-pointer list-none py-2 font-[family-name:var(--font-lora)] select-none">
        <span className="shrink-0 text-xs text-gray-400 transition-transform group-open:rotate-90 mt-1.5 mr-2">
          ▶
        </span>
        <span className="flex flex-col sm:flex-row sm:justify-between sm:items-start w-full gap-0.5 sm:gap-2">
          <span>
            <span className="text-lg font-semibold text-slate-800 block">
              {a.num}. {a.titleEn}
            </span>
            <span className="text-sm text-gray-500 block mt-1">
              {a.subtitle}
            </span>
          </span>
          <span className="sm:text-right">
            <SyriacText>
              <span className="text-lg font-normal text-slate-600 block mb-1">
                {a.titleSyr}
              </span>
            </SyriacText>
            <SyriacText>
              <span className="text-sm text-gray-500 block">{a.subtitleSyr}</span>
            </SyriacText>
          </span>
        </span>
      </summary>

      <div className="mt-3 ml-4">
        {/* Syriac text */}
        <div className="mb-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
          <div
            className="leading-loose [font-family:'Idiqlat',serif] text-base text-justify"
            dir="rtl"
            style={{ fontWeight: 400, fontSynthesis: "none" }}
          >
            {a.stanzas.map((s, i) => (
              <p key={i} className={i < a.stanzas.length - 1 ? "mb-3" : ""}>
                <span className="text-red-700">{s.psalm}</span>
                {s.dzuwrta && <> ܕܨܘܼܪܬܵܐ.</>}
                {s.antiphonRedPart && (
                  <>
                    {" "}
                    <span className="text-red-700">{s.antiphonRedPart}</span>
                  </>
                )}{" "}
                <span className="text-slate-600">{s.antiphon}</span>
              </p>
            ))}
          </div>
        </div>

        {/* Traditions */}
        <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 space-y-4">
          {a.traditions.map((t) => (
            <div key={t.label}>
              <p className="font-[family-name:var(--font-lora)] text-sm font-semibold text-slate-600 mb-1">
                {t.label}
              </p>
              {t.note && (
                <p className="text-xs text-gray-400 italic ml-3 mb-1">
                  {t.note}
                </p>
              )}
              {t.tunes ? (
                <div className="ml-3 space-y-1">
                  {Array.from({ length: t.tunes }, (_, i) => (
                    <p key={i} className="text-sm text-gray-400 italic">
                      Tune {i + 1} — Recording coming soon.
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic ml-3">
                  Recording coming soon.
                </p>
              )}
            </div>
          ))}
        </div>
        {a.description && (
          <p className="font-[family-name:var(--font-lora)] text-sm text-gray-700 mt-3">
            {a.description}
          </p>
        )}
        {a.hudraLink && (
          <p className="text-xs text-gray-400 mt-2">
            For more recordings, see the{" "}
            <a
              href={a.hudraLink}
              className="text-primary underline underline-offset-2 hover:text-primary/80"
            >
              hymn page on Hudra
            </a>
            .
          </p>
        )}
      </div>
    </details>
  );
}

export default function QaleDonyathaDsahde() {
  const [allOpen, setAllOpen] = useState(true);

  return (
    <>
      <div className="not-prose mb-6 rounded-lg bg-yellow-50 border border-yellow-300 px-5 py-3 flex items-center gap-3 text-yellow-800">
        <span className="text-lg" aria-hidden="true">🚧</span>
        <p className="text-sm font-medium m-0">
          Work in progress — this article is incomplete and may change
          significantly.
        </p>
      </div>

      <div className="not-prose mb-8 rounded-lg bg-amber-50 border border-amber-200 px-6 py-5 flex flex-col sm:flex-row items-center gap-5">
        <img
          src="/images/thoma-kathanar.png"
          alt="Very Rev. Malpan Koonammakkal Thoma Kathanar"
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

      <h2>Introduction</h2>
      <p>
        The <em>Onyatha d&apos;Sahde</em> are a series of antiphons sung in
        honour of the martyrs, found in the <em>Hudra</em>, the breviary of the
        Church of the East. They are sung during <em>Ramsha</em> (vespers) and{" "}
        <em>Sapra</em> (matins) on ordinary weekdays, each antiphon preceded by
        a psalm verse. They are not sung on Sundays, on feast days, or during
        Lent.
      </p>
      <p>
        The <em>Hudra</em> attributes these antiphons to Mar Marutha, bishop of
        Martyropolis (Syriac: Maipharqat, modern-day Silvan in Turkey), who died
        around 420. Marutha travelled through the Persian territories after the
        great persecutions of the fourth century, collecting the relics of the
        martyrs and recording their stories. The antiphons are said to have been
        composed in the course of this work. Though they appear to honour the
        martyrs, they are understood as hymns directed ultimately to God.
        <sup>
          <a href="#fn1" id="ref1" className="footnote-ref">
            1
          </a>
        </sup>
      </p>
      <p>
        The Assyrian Church of the East, the Chaldean Catholic Church, and the
        Syro-Malabar Church all share this tradition, though each has passed it
        down in its own way. This article looks at how the{" "}
        <em>onyatha d&apos;sahde</em> are preserved and used across these three
        communities.
      </p>

      <p>
        The Malabar pronunciation of East Syriac will be used throughout this
        article.
      </p>

      <p>
        The tunes of the Malabar tradition presented here were learned from the
        recordings left behind by Fr. Emmanuel Thelly CMI, Fr. Alexander
        Kattakayam CMI, and Fr. Abel Periyappuram CMI. The sources for the other
        traditions are given in the links below each hymn.
      </p>

      <div className="not-prose flex items-baseline gap-3 mt-10 mb-4">
        <h2 className="text-xl font-semibold font-[family-name:var(--font-lora)] text-slate-700 m-0">
          Qale d&apos;Onyatha d&apos;Sahde
        </h2>
        <button
          onClick={() => setAllOpen((prev) => !prev)}
          className="text-xs text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        >
          {allOpen ? "Collapse all" : "Expand all"}
        </button>
      </div>

      {ANTIPHONS.map((a) => (
        <AntiphonEntry key={a.num} a={a} open={allOpen} />
      ))}

      <h2>Conclusion</h2>
      <p></p>

      <ol className="footnotes">
        <li id="fn1">
          Mar Awa Royel, &ldquo;Singing Hymns to the Martyrs: the
          &lsquo;Antiphons of the Sāhdē&rsquo; in the Assyrian Church of the
          East,&rdquo;{" "}
          <em>Journal of the Canadian Society for Syriac Studies</em> 12 (2012),
          3–11.{" "}
          <a href="#ref1" className="footnote-ref">
            ↩
          </a>
        </li>
      </ol>
    </>
  );
}
