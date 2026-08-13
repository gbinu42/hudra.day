/**
 * List of Hymns in the Recordings by Archbishop Mar Ephrem Bede
 * (المطران أفرام بدي)
 */

import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import RecordingEmbed from "@/components/articles/RecordingEmbed";

interface CassetteHymn {
  /** Liturgical genre / rubric, e.g. Qaltha */
  type?: string;
  /** Page reference in Syriac numerals (or Latin), when given */
  page?: string;
  title: string;
  /** Vocalized Syriac title / incipit */
  titleSyr?: string;
  /** Qala designation, e.g. "Marir Dina", "Resh Qala" */
  qala?: string;
  qalaSyr?: string;
  /**
   * When false, render the qala name without a "Qala:" prefix
   * (e.g. Resh Qala itself). Defaults to true.
   */
  qalaLabel?: boolean;
  /** Extra note shown after the main line */
  note?: string;
  /** Slug on this site under /hymns/ */
  hudraSlug?: string;
}

interface Cassette {
  number: number;
  title: string;
  hymns: CassetteHymn[];
  /** YouTube nocookie embed URL for this cassette */
  youtubeEmbedSrc?: string;
  youtubeTitle?: string;
}

function Syr({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      dir="rtl"
      className={`font-east-syriac-adiabene text-2xl text-slate-800 inline-block leading-none ${className}`}
      style={{ fontWeight: 400, fontSynthesis: "none" }}
    >
      {children}
    </span>
  );
}

const CASSETTES: Cassette[] = [
  {
    number: 1,
    title: "Cassette 1",
    youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/oSrE4WX906k",
    youtubeTitle: "The Chaldean Hymns by Bishop Ephrem Buddy, part 1",
    hymns: [
      {
        type: "Qaltha",
        page: "ܢܕ",
        title: "Aykan Masya",
        titleSyr: "ܐܲܝܟܲܢ ܡܲܨܝܵܐ",
        hudraSlug: "aykan-masya",
      },
      {
        type: "Mawtwa",
        title: "Yaldath Lalaha B'thulta",
        titleSyr: "ܝܵܠܕܲܬ݂ ܠܐܲܠܵܗܵܐ ܒܬ݂ܘܼܠܬܵܐ",
        qala: "Marir Dina",
        qalaSyr: "ܡܲܪܝܼܪ ܕܝܼܢܵܐ",
        hudraSlug: "yaldath-lamshiha-bsulta",
      },
      {
        title: "Resh Haylawatha",
        titleSyr: "ܪܹܫ ܚܲܝܠܵܘ̈ܵܬ݂ܵܐ",
        qala: "Resh Qala",
        qalaSyr: "ܪܹܫ ܩܵܠܵܐ",
        qalaLabel: false,
        hudraSlug: "resh-haylawathe",
      },
      {
        title: "Marya Maran",
        titleSyr: "ܡܵܪܝܵܐ ܡܵܪܲܢ",
        qala: "Mambu Hayye",
        qalaSyr: "ܡܲܒ݁ܘܼܥ ܚܲܝܹ̈ܐ",
        hudraSlug: "marya-maran",
      },
      {
        type: "Qanona",
        page: "ܢܙ",
        title: "Min Nugra Qdam Dare",
        titleSyr: "ܡ̣ܢ ܢܘܼܓܪܵܐ ܩܕܵܡ ܕܵܪܹ̈ܐ",
        qala: "Resh Si'ta",
        qalaSyr: "ܪܹܫ ܣܝܼܥܬܵܐ",
        hudraSlug: "min-nugra-qdam-dare",
      },
      {
        type: "Teshbohta",
        page: "ܢܙ",
        title: "Brikh Hannana",
        titleSyr: "ܒܪܝܼܟ݂ ܚܲܢܵܢܵܐ",
        hudraSlug: "brikh-hannana",
      },
      {
        type: "Madrasha",
        page: "ܢܚ",
        title: "Ire W'yallude",
        titleSyr: "ܥܝܼܪܹ̈ܐ ܘܝܲܠܘܼܕܹ̈ܐ",
        qala: "Rawme d'marekol",
        qalaSyr: "ܪܵܘܡܹܗ ܕܡܵܪܹܟܠ",
        hudraSlug: "ire-wyallude",
      },
      {
        type: "Qala d'Shahra",
        page: "ܢܚ",
        title: "Marya Amlekh",
        titleSyr: "ܡܵܪܝܵܐ ܐܲܡܠܸـܟ",
        note: "This is what is recited in the Monastery of Our Lady and in Alqosh.",
      },
      {
        page: "ܢܛ",
        title: "Izganda D'shayna Shandar",
        titleSyr: "ܐܝܼܙܓܲܕܵܐ ܕܫܲܝܢܵܐ ܫܲܕܲܪ",
        note: "Said before Tawdi l'tawa.",
        hudraSlug: "izganda-dshayna-sharar",
      },
      {
        title: "Tawdi L'tawa",
        titleSyr: "ܬܵܘܕ̇ܝܼ ܠܛܵܒ̣ܵܐ",
        hudraSlug: "tawdi-lthawa",
      },
      {
        type: "d'Sapra",
        page: "ܢܛ",
        title: "Nawde w'nesgod le",
        titleSyr: "ܢܵܘܕܸܐ ܘܢܸܣܓ݁ܘܿܕ ܠܹܗ",
        qala: "Resh Qala",
        qalaSyr: "ܪܹܫ ܩܵܠܵܐ",
        qalaLabel: false,
        hudraSlug: "nawde-wnesgod-le",
      },
      {
        page: "ܣܒ",
        title: "Semha D'min Awa",
        titleSyr: "ܨܸܡܵܚܵܐ ܕܡ̣ܢ ܐܲܒ݂ܵܐ",
        qala: "Qala Ramba",
        qalaSyr: "ܩܵܠܵܐ ܪܲܒܵܐ",
        qalaLabel: false,
        hudraSlug: "semha-dmin-awa",
      },
      {
        type: "d'Wasaliqe",
        page: "ܣܗ",
        title: "Raza Ramba",
        titleSyr: "ܐ݇ܪܵܙܵܐ ܪܲܒܵܐ",
        qala: "Resh Qala",
        qalaSyr: "ܪܹܫ ܩܵܠܵܐ",
        qalaLabel: false,
        hudraSlug: "raza-ramba",
      },
      {
        type: "Mawtwa",
        page: "ܣܘ",
        title: "M'lakh Weshtawdi",
        titleSyr: "ܡܠܲܟ݂ ܘܐܸܫܬܵܘܕܝܼ",
        qala: "Raza Ramba",
        qalaSyr: "ܐ݇ܪܵܙܵܐ ܪܲܒܵܐ",
        hudraSlug: "mlakh-weshtawdi",
      },
      {
        page: "ܣܙ",
        title: "Swarthe D'maran",
        titleSyr: "ܣܒܲܪܬܹܗ ܕܡܵܪܲܢ",
        qala: "Resh Qala",
        qalaSyr: "ܪܹܫ ܩܵܠܵܐ",
        qalaLabel: false,
        hudraSlug: "swarthe-dmaran",
      },
      {
        type: "Madrasha",
        page: "ܣܛ",
        title: "Lakh Teshbohta",
        titleSyr: "ܠܵܟ݂ ܬܸܫܒ݁ܘܿܚܬܵܐ",
        qala: "Resh Qala",
        qalaSyr: "ܪܹܫ ܩܵܠܵܐ",
        qalaLabel: false,
        hudraSlug: "lakh-teshbohta",
      },
      {
        type: "d'Lelya",
        page: "ܣܛ",
        title: "Alaha B'rahme",
        titleSyr: "ܐܲܠܵܗܵܐ ܒܪ̈ܲܚܡܹܐ",
        qala: "Resh Qala",
        qalaSyr: "ܪܹܫ ܩܵܠܵܐ",
        qalaLabel: false,
        hudraSlug: "alaha-brahme",
      },
      {
        type: "d'Qanke",
        page: "ܥ",
        title: "B'kanon Yarha",
        titleSyr: "ܒܟܵܢܘܿܢ ܝܲܪܚܵܐ",
        qala: "Byad Shlama",
        qalaSyr: "ܒܝܲܕ ܫܠܵܡܵܐ",
        hudraSlug: "bkanon-yarha",
      },
      {
        type: "Madrasha",
        page: "ܥܚ",
        title: "Shuwha L'haw D'shandar",
        titleSyr: "ܫܘܼܒ݂ܚܵܐ ܠܗܵܘ̇ ܕܫܲܕܲܪ",
        qala: "Rawme d'marekol",
        qalaSyr: "ܪܵܘܡܹܗ ܕܡܵܪܹܟܠ",
        hudraSlug: "shuwha-lhaw-dshandar",
      },
      {
        type: "Madrasha",
        page: "ܦܚ",
        title: "Shwih Subarakh",
        titleSyr: "ܫܒ݂ܝܼܚ ܣܘܼܒܵܪܵܟ݂",
        qala: "Resh Qala",
        qalaSyr: "ܪܹܫ ܩܵܠܵܐ",
        qalaLabel: false,
        hudraSlug: "shwih-subarakh",
      },
      {
        type: "Hymn of Yalda",
        page: "ܫܟܐ",
        title: "L'yalda Tmiha",
        titleSyr: "ܠܝܲܠܕܵܐ ܬܡܝܼܗܵܐ",
        qala: "Britha H'data",
        qalaSyr: "ܒܪܝܼܬܵܐ ܚܕܲܬܵܐ",
        note: "First Volume of the Hudra.",
        hudraSlug: "lyalda-thmiha",
      },
      {
        type: "Yalda",
        title: "Marya Qrethakh",
        titleSyr: "ܡܵܪܝܵܐ ܩܪܹܝܬ݂ܵܟ݂",
        hudraSlug: "marya-qrethakh",
      },
      {
        page: "ܫܟܓ",
        title: "Tedmurta Rabtha",
        titleSyr: "ܬܸܕܡܘܼܪܬܵܐ ܪܲܒ݁ܬ݂ܵܐ",
        qala: "Ma'modithakh Maran",
        qalaSyr: "ܡܲܥܡܘܿܕܝܼܬ݂ܵܟ݂ ܡܵܪܲܢ",
        hudraSlug: "thedmurta-rabtha",
      },
      {
        type: "Shuraya",
        page: "ܫܟܓ",
        title: "Shathessaw",
        titleSyr: "ܫܲܬ݂ܐܸܣܵܘ̈ܗܝ",
      },
      {
        type: "d'Wasaliqe",
        page: "ܫܟܓ",
        title: "Mshiha Ethiled",
        titleSyr: "ܡܫܝܼܚܵܐ ܐܸܬ݂ܝܼܠܸܕ",
        hudraSlug: "mshiha-ethiled",
      },
      {
        page: "ܫܟܘ",
        title: "Resha D'ire Ellaye",
        titleSyr: "ܪܹܫܵܐ ܕܥܝܼܪܹ̈ܐ ܥܸܠܵܝܹ̈ܐ",
        qala: "Resh Haylawatha",
        qalaSyr: "ܪܹܫ ܚܲܝܠܵܘ̈ܵܬ݂ܵܐ",
        hudraSlug: "resh-dire-ellaye",
      },
      {
        type: "Shambah d'Mawtwa",
        title: "Shrara Galya",
        titleSyr: "ܫܪܵܪܵܐ ܓܲܠܝܵܐ",
        qala: "B'dehlta w'Hadutha",
        qalaSyr: "ܒܕܸܚܠܬ݂ܵܐ ܘܲܒ݂ܚܲܕܘܼܬ݂ܵܐ",
        hudraSlug: "shrara-galya",
      },
    ],
  },
  {
    number: 2,
    title: "Cassette 2",
    youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/ZdiM3k_vao0",
    youtubeTitle: "The Chaldean Hymns by Bishop Ephrem Buddy, part 2",
    hymns: [
      {
        type: "Hymn to Al-adhra Maryam (Virgin Mary)",
        title: "B'thulta Yaldath",
        titleSyr: "ܒܬ݂ܘܼܠܬܵܐ ܝܵܠܕܲܬ݂",
        qala: "Ha Pathora",
        qalaSyr: "ܗܵܐ ܦܵܬ݂ܘܿܪܵܐ",
        hudraSlug: "bthulta-yaldath",
      },
      {
        type: "Hymn for Yalda",
        title: "Malke Bnay Malke",
        titleSyr: "ܡܲܠܟܹ̈ܐ ܒܢܲܝ ܡܲܠܟܹ̈ܐ",
        qala: "Tuwa L'yallude",
        qalaSyr: "ܛܘܼܒ݂ܵܐ ܠܝܲܠܘܼܕܹ̈ܐ",
        hudraSlug: "malke-bnay-malke",
      },
      {
        type: "Hymn for Yalda",
        title: "Malke Bnay Malke",
        titleSyr: "ܡܲܠܟܹ̈ܐ ܒܢܲܝ ܡܲܠܟܹ̈ܐ",
        qala: "Tuwa L'yallude",
        qalaSyr: "ܛܘܼܒ݂ܵܐ ܠܝܲܠܘܼܕܹ̈ܐ",
        note: "Another melody from the Chaldean Eparchy of Turkey.",
        hudraSlug: "malke-bnay-malke",
      },
      {
        type: "Hymn for Yalda",
        title: "Malke Bnay Malke",
        titleSyr: "ܡܲܠܟܹ̈ܐ ܒܢܲܝ ܡܲܠܟܹ̈ܐ",
        qala: "Tuwa L'yallude",
        qalaSyr: "ܛܘܼܒ݂ܵܐ ܠܝܲܠܘܼܕܹ̈ܐ",
        note: "Another melody from the Chaldean Eparchy of Turkey.",
        hudraSlug: "malke-bnay-malke",
      },
      {
        title: "Unidentified",
        note:
          "The fourth hymn is recited during the Ba'utha Fast and the Great Fast (Lent) in some Chaldean villages and monasteries. This hymn is unidentified - if you recognize it, please leave a comment below.",
      },
      {
        type: "Karozoutha",
        title: "N'qum Shapir",
        titleSyr: "ܢܩܘܼܡ ܫܲܦܝܼܪ",
        note:
          "The fifth hymn is from the Friday of Passion, from the second volume of the Hudra.",
        hudraSlug: "nqum-shapir-friday-of-passion",
      },
      {
        title: "O Gannana",
        titleSyr: "ܐܘܿ ܓܲܢܵܢܵܐ",
        note:
          "The sixth hymn is for Qyamta from the book of Turgame and Sogyatha.",
        hudraSlug: "brikh-bar-thawa-o-gannana",
      },
      {
        type: "Teshbohta",
        title: "Tas Wanheth",
        titleSyr: "ܛܵܣ ܘܲܢܚܸܬ݂",
        note: "Dalwakhta of the Sunday of Qyamta.",
        hudraSlug: "tas-wanheth-resh-malakhe",
      },
      {
        type: "Teshbohta",
        title: "Tas Wanheth",
        titleSyr: "ܛܵܣ ܘܲܢܚܸܬ݂",
        note: "Dalwakhta of the Sunday of Qyamta. Different melody.",
        hudraSlug: "tas-wanheth-resh-malakhe",
      },
      {
        type: "Hpakhtha",
        title: "Malkuth Rawma",
        titleSyr: "ܡܲܠܟܘܼܬ݂ ܪܵܘܡܵܐ",
        note:
          "The eighth hymn for the feast of Qyamta, sung before Tawdi l'tawa.",
        hudraSlug: "malkuth-rawma",
      },
      {
        title: "Tawdi L'tawa",
        titleSyr: "ܬܵܘܕ̇ܝܼ ܠܛܵܒ̣ܵܐ",
        note: "For Qyamta.",
        hudraSlug: "tawdi-lthawa",
      },
      {
        type: "Onyatha",
        title: "Qal Qinatha",
        titleSyr: "ܩܵܠ ܩܝܼ̈ܢܵܬ݂ܵܐ",
        note:
          "For the sixth Sunday of Summer, accompanying (or chanted to) Tawdi l'Tawa.",
        hudraSlug: "qal-qinatha",
      },
      {
        type: "Madrasha",
        title: "Malka Mshiha Dal'almin",
        titleSyr: "ܡܲܠܟܵܐ ܡܫܝܼܚܵܐ ܕܲܠܥܵܠܡܝܼܢ",
        note: "For the Feast of the Assumption of the Virgin Mary.",
        hudraSlug: "malka-mshiha-dalalmin",
      },
    ],
  },
  {
    number: 3,
    title: "Cassette 3",
    youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/M8XRuSa5I_s",
    youtubeTitle:
      "Hymns from the Chaldean liturgy by Bishop Ephram Baddy, part 3",
    hymns: [
      {
        type: "Shambah of Mawtwa",
        title: "Shrara Galya",
        titleSyr: "ܫܪܵܪܵܐ ܓܲܠܝܵܐ",
        qala: "B'dehltha Wawhadutha",
        qalaSyr: "ܒܕܸܚܠܬ݂ܵܐ ܘܲܒ݂ܚܲܕܘܼܬ݂ܵܐ",
        hudraSlug: "shrara-galya",
      },
      {
        type: "Madrasha",
        title: "Shuwha L'haw D'parqan",
        titleSyr: "ܫܘܼܒ݂ܚܵܐ ܠܗ̇ܘ ܕܦ݂ܲܪܩܲܢ",
        qala: "Resh Qala",
        qalaSyr: "ܪܹܫ ܩܵܠܵܐ",
        qalaLabel: false,
        hudraSlug: "shuwha-lhaw-parqan",
      },
      {
        type: "Madrasha",
        title: "Shuwha L'haw Yalda",
        titleSyr: "ܫܘܼܒ݂ܚܵܐ ܠܗܵܘ ܝܲܠܕܵܐ",
        qala: "Zel Laqritha / Arba'apenyan",
        hudraSlug: "shuwha-lhaw-yalda",
      },
      {
        type: "Qanona of Yalda",
        title: "Brikh Dethgli Bapartha",
        titleSyr: "ܒܪܝܼܟ݂ ܕܐܸܬ݂ܓ݁ܠܝܼ ܒܐܵܦܲܪܬ݂ܵܐ",
        hudraSlug: "brikh-dethgli-bapartha",
      },
      {
        type: "Onyatha d'Yalda",
        title: "Malke Bnay Malke",
        titleSyr: "ܡܲܠܟܹ̈ܐ ܒܢܲܝ ܡܲܠܟܹ̈ܐ",
        qala: "Tuwa L'yallude",
        qalaSyr: "ܛܘܼܒ݂ܵܐ ܠܝܲܠܘܼܕܹ̈ܐ",
        hudraSlug: "malke-bnay-malke",
      },
      {
        type: "Hpakhtha of Yalda",
        title: "Ew Yalluda",
        titleSyr: "ܐܹܝܘ ܠܝܲܠܘܼܕܵܐ",
        hudraSlug: "ew-yallud",
      },
      {
        type: "Karozoutha of Yalda",
        title: "N'qum Shapir",
        titleSyr: "ܢܩܘܼܡ ܫܲܦܝܼܪ",
        hudraSlug: "nqum-shapir-yalda",
      },
      {
        type: "Slotha",
        title: "Lakh Yalda Gniza",
        titleSyr: "ܠܵܟ݂ ܝܲܠܕܵܐ ܓܢܝܼܙܵܐ",
        note: "Of the Yalda Sapra.",
        hudraSlug: "lakh-yalda-gniza",
      },
      {
        title: "Brashith",
        titleSyr: "ܒܪܵܫܝܼܬ݂",
        note: "Of the Yalda Sapra.",
        hudraSlug: "brashith",
      },
      {
        type: "Shuraya",
        title: "Gawra Gambara",
        titleSyr: "ܓܲܒ݂ܪܵܐ ܓܲܢ݇ܒܵܪܵܐ",
        note: "Of the Christmas Qurbana.",
        hudraSlug: "gawra-gambara",
      },
      {
        title: "Dhilat Alaha",
      },
      {
        title: "Pagrakh Wadmakh",
        titleSyr: "ܦܲܓ݂ܪܵܟ݂ ܘܲܕ݂ܡܵܟ݂",
        note: "For Yalda.",
        hudraSlug: "pagrakh-wadmakh",
      },
      {
        type: "Teshbohta",
        title: "Hayyel Maran",
        titleSyr: "ܚܲܝܸܠ ܡܵܪܲܢ",
        note: "For Maranaye feasts.",
        hudraSlug: "hayyel-maran",
      },
      {
        type: "Madrasha",
        title: "Brikhu Pera",
        titleSyr: "ܒܪܝܼܟ݂ܘܼ ܦܹܐܪܵܐ",
        qala: "Lakh Teshbohta",
        qalaSyr: "ܠܵܟ݂ ܬܸܫܒ݁ܘܿܚܬܵܐ",
        note: "Of the Dukhrana of Mart Maryam Yaldath Alaha.",
        hudraSlug: "brikhu-pera",
      },
      {
        type: "Madrasha",
        title: "Brikhu Dawrew Dukhrankhon Sahde",
        titleSyr: "ܒܪܝܼܟ݂ܘܼ ܕܐܵܘܪܸܒ݂ ܕܘܼܟ݂ܪܵܢܟ݂ܘܿܢ. ܣܵܗܕܹ̈ܐ",
        qala: "Mannu Kay",
        qalaSyr: "ܡܲܢܘܼ ܟܲܝ",
        note: "For the feast of the Holy Innocents (the Massacre of the Infants).",
        hudraSlug: "brikhu-dawrew-dukhrankhon-sahde",
      },
      {
        type: "d'Wasaliqe",
        title: "B'yawma T'minaya",
        titleSyr: "ܒܝܵܘܡܵܐ ܬܡܝܼܢܵܝܵܐ",
        qala: "Tuwa L'yallude",
        qalaSyr: "ܛܘܼܒ݂ܵܐ ܠܝܲܠܘܼܕܹ̈ܐ",
        note: "Of the Feast of the Circumcision of our Lord.",
        hudraSlug: "byawma-tminaya",
      },
      {
        type: "Onyatha d'Qdam",
        title: "Ma'modithakh Maran",
        titleSyr: "ܡܲܥܡܘܿܕܝܼܬ݂ܵܟ݂ ܡܵܪܲܢ",
        qala: "Lwesh La Methhablanutha",
        qalaSyr: "ܠܒܸܫܘ ܠܵܐ ܡܸܬ݂ܚܲܒ݁ܠܵܢܘܼܬ݂ܵܐ",
        note: "Of Denha Ramsha.",
        hudraSlug: "mamodithakh-maran",
      },
      {
        type: "Onyatha d'Wathar",
        title: "Britha H'data",
        titleSyr: "ܒܪܝܼܬ݂ܵܐ ܚܕܲܬܵܐ",
        qala: "Resh Qala",
        qalaSyr: "ܪܹܫ ܩܵܠܵܐ",
        qalaLabel: false,
        note: "Of Denha Ramsha (also of the first Sunday of Lent).",
        hudraSlug: "britha-hdata",
      },
      {
        type: "Madrasha",
        title: "Shmayya W'ar'a Shuwha Zmar",
        titleSyr: "ܫܡܲܝܵܐ ܘܐܲܪܥܵܐ ܫܘܼܒ݂ܚܵܐ ܙܡܲܪܘ",
        qala: "Menne W'le",
        qalaSyr: "ܡܸܢܹܗ ܘܠܹܗ",
        note: "Of Denha (Epiphany).",
        hudraSlug: "shmayya-wara-shuwha-zmar",
      },
      {
        type: "Madrasha",
        title: "Brikh Dethrken Wa'mad",
        titleSyr: "ܒܪܝܼܟ݂ ܕܐܸܬ݂ܪܟܸܢ ܘܲܥܡܲܪ",
        qala: "Rawme d'marekol",
        qalaSyr: "ܪܵܘܡܹܗ ܕܡܵܪܹܟܠ",
        note: "Of Denha (and of the second Sunday of Denha).",
        hudraSlug: "brikh-dethrken-wamad",
      },
      {
        type: "Qanona",
        title: "Hus W'hassa",
        titleSyr: "ܚܘܼܣ ܘܚܲܣܵܐ",
        qala: "Resh Qala",
        qalaSyr: "ܪܹܫ ܩܵܠܵܐ",
        qalaLabel: false,
        note: "Resh Qala of the Dukhrana of the Malpane Suryaye and Romaye.",
        hudraSlug: "hus-whassa",
      },
      {
        type: "Qaltha",
        title: "Hzaw La Tehton",
        titleSyr: "ܚܙܵܘ ܠܵܐ ܬܸܚܛܘܿܢ",
        note: "Of the Ba'utha d'Ninwaye (Monday).",
        hudraSlug: "hzaw-la-tehton",
      },
      {
        type: "Qanona",
        title: "En Awlan",
        titleSyr: "ܐܸܢ ܥܵܘ̣ܠܲܢ",
        qala: "Resh Qala",
        qalaSyr: "ܪܹܫ ܩܵܠܵܐ",
        qalaLabel: false,
        note: "Of the Ba'utha (Monday).",
        hudraSlug: "en-awlan",
      },
      {
        type: "Teshbohta",
        title: "B'hasha w'dem'e Wawthahnanta",
        titleSyr: "ܒܚܲܫܵܐ ܘܕܸܡܥܹ̈ܐ ܘܲܒܬܲܚܢܲܢܬܵܐ",
        note:
          "Of the Ba'utha (Monday), and of Fridays (Qadmaye) of Lent; also used for Passion Friday.",
        hudraSlug: "bhasha-wdime",
      },
      {
        type: "Karozoutha",
        title: "N'qum Shapir",
        titleSyr: "ܢܩܘܼܡ ܫܲܦܝܼܪ",
        note: "Of the Ba'utha (Monday).",
        hudraSlug: "nqum-shapir-bautha-monday",
      },
    ],
  },
  {
    number: 4,
    title: "Cassette 4",
    youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/ruRoLgz-QQQ",
    youtubeTitle:
      "الحان الطقس الكلداني بصوت المطران افرام بدي، الجزء الرابع",
    hymns: [
      {
        type: "Hpakhtha",
        title: "Zawna W Ger",
        titleSyr: "ܙܲܒ݂ܢܵܐ ܗ݇ܘ̣ ܓܹܝܪ",
        note: "Of the Ba'utha (Monday).",
        hudraSlug: "zawna-w-ger",
      },
      {
        type: "Qeryana",
        title: "Ayna Dathe L'ba'utha",
        titleSyr: "ܐܲܝܢܵܐ ܕܐܵܬܹ݁ܐ ܠܒ݂ܵܥܘܼܬ݂ܵܐ",
        note: "Of the first mawtwa of Ba'utha (Monday).",
        hudraSlug: "ayna-dathe-lbautha",
      },
      {
        type: "Madrasha",
        title: "Taw Nettwe L'harka",
        titleSyr: "ܬܵܘ ܢܸܬ݁ܬ݁ܘܸܐ ܠܗܵܪܟܵܐ",
        note: "Of the Ba'utha (Monday).",
        hudraSlug: "taw-nettwe-lharka",
      },
      {
        type: "Madrasha",
        title: "B'aw Ba'aye",
        titleSyr: "ܒܥܵܘ ܒܲܥܵܝܹ̈ܐ",
        note: "Of the Ba'utha (Monday).",
        hudraSlug: "baw-baaye",
      },
      {
        type: "Burkatha",
        title: "Tawa D'hawi",
        titleSyr: "ܛܵܒ݂ܵܐ ܕܚܵܘܝܼ",
        note: "Of the Ba'utha (Monday).",
        hudraSlug: "thawa-dhawi",
      },
      {
        type: "Hpakhtha",
        title: "Alahan Sangi Rahme",
        titleSyr: "ܐܲܠܵܗܲܢ ܣܲܓܝܼ ܪ̈ܲܚܡܹܐ",
        note: "Of the second mawtwa of the Ba'utha (Monday).",
        hudraSlug: "alahan-sangi-rahme",
      },
      {
        type: "Madrasha",
        title: "Basloth Kene",
        titleSyr: "ܒܲܨܠܘܿܬ݂ ܟܹܐܢܹ̈ܐ",
        qala: "Resh Qala",
        qalaSyr: "ܪܹܫ ܩܵܠܵܐ",
        qalaLabel: false,
        note: "Of the sixth Sunday of Sawma.",
        hudraSlug: "basloth-kene",
      },
      {
        type: "Burkatha",
        title: "Yamma Ramba",
        titleSyr: "ܝܲܡܵܐ ܪܲܒܵܐ",
        note: "Of the Ba'utha (Monday).",
        hudraSlug: "yamma-ramba",
      },
      {
        type: "Hpakhtha",
        title: "B'kespakh Nehwe Thangare",
        titleSyr: "ܒܟܸܣܦܵܟ݂ ܢܸܗܘܸܐ ܬܲܓܵܪܹ̈ܐ",
        note: "Of the first mawtwa of the Ba'utha (Tuesday).",
        hudraSlug: "bkespakh-nehwe-thangare",
      },
      {
        type: "Qeryana",
        title: "Ha B'ninwe Yawnan Akrez",
        titleSyr: "ܗܵܐ ܒܢܝܼܢܘܹܐ ܝܵܘܢܵܢ ܐܟ݂ܪܸܙ",
        note: "First Qeryana of the Ba'utha (Tuesday).",
        hudraSlug: "ha-bninwe-yawnan-akrez",
      },
      {
        type: "Hpakhtha",
        title: "Alaha Hus Al Ammakh",
        titleSyr: "ܐܲܠܵܗܵܐ ܚܘܼܣ ܥܲܠ ܥܲܡܵܟ݂",
        note: "Of the second mawtwa of the Ba'utha (Tuesday).",
        hudraSlug: "alaha-hus-al-ammakh",
      },
      {
        type: "Qeryana",
        title: "Malka D'ninwe Qaem Wa",
        titleSyr: "ܡܲܠܟܵܐ ܕܢܝܼܢܘܹܐ ܩܵܐܹܡ ܗ݇ܘ̣ܵܐ",
        note: "Second Qeryana of the Ba'utha (Tuesday).",
        hudraSlug: "malka-dninwe-qaem-wa",
      },
      {
        type: "Madrasha",
        title: "El Alaha",
        titleSyr: "ܐܹܝܠ ܐܲܠܵܗܵܐ",
        note: "First Madrasha of the Ba'utha (Wednesday).",
        hudraSlug: "el-alaha",
      },
      {
        type: "Qeryana",
        title: "Saar Tewel",
        titleSyr: "ܨܵܐܲܪ ܬܹܒܹܝܠ",
        note: "Of the Ba'utha (Wednesday).",
        hudraSlug: "saar-tewel",
      },
      {
        type: "Qeryana",
        title: "B'qenta Zara'a",
        titleSyr: "ܒܩܸܢܛܵܐ ܙܵܪܲܥ",
        note: "Second Qeryana of the Ba'utha (Wednesday).",
        hudraSlug: "bqenta-zaraa",
      },
      {
        type: "Madrasha",
        title: "Nethon Rahmayk",
        titleSyr: "ܢܹܐܬ݂ܘܿܢ ܪ̈ܲܚܡܲܝܟ",
        note: "Third Madrasha of the Ba'utha (Wednesday).",
        hudraSlug: "nethon-rahmayk",
      },
      {
        type: "Madrasha",
        title: "En Mar Neshwe",
        titleSyr: "ܐܸܢ ܡܵܪܝ ܢܸܫܘܸܐ",
        note: "Fifth Madrasha of the Ba'utha (Wednesday).",
        hudraSlug: "en-mar-neshwe",
      },
      {
        type: "Madrasha",
        title: "Maran B'rahmayk",
        titleSyr: "ܡܵܪܲܢ ܒܪ̈ܲܚܡܲܝܟ",
        qala: "Etta Push Lekh",
        qalaSyr: "ܥܹܕܬܵܐ ܦܘܼܫܝ ܠܹܟ݂ܝ",
        note: "Sixth Madrasha of the Ba'utha (Wednesday).",
        hudraSlug: "maran-brahmayk",
      },
      {
        type: "Madrasha",
        title: "B'thar'akh Maran Naqshinan",
        titleSyr: "ܒܬܲܪܥܵܟ݂ ܡܵܪܲܢ ܢܵܩܫܝܼܢܲܢ",
        qala: "Brikhu Mshiha Detha",
        qalaSyr: "ܒܪܝܼܟ݂ܘܼ ܡܫܝܼܚܵܐ ܕܐܸܬ݂ܵܐ",
        note: "Of the Ba'utha d'Ninwaye (Wednesday).",
        hudraSlug: "btharakh-marna-naqshinan",
      },
      {
        type: "Qanona",
        title: "Yae W'zadeq",
        titleSyr: "ܝܵܐܹܐ ܘܙܵܕܹܩ",
        note: "Of the Lelya of the first Monday of Sawma.",
        hudraSlug: "yaye-wzadeq",
      },
      {
        type: "Madrasha",
        title: "Brikh Dawsawme",
        titleSyr: "ܒܪܝܼܟ݂ ܕܲܒ݂ܨܵܘܡܹܗ",
        note: "Of the first Monday of the Lent.",
        hudraSlug: "brikh-dawsawm",
      },
      {
        title: "Marya B'sapra",
        note: "Of the first Monday of Sawma.",
      },
      {
        type: "d'Wasaliqe",
        title: "Marya Ettakh",
        titleSyr: "ܡܵܪܝܵܐ ܥܹܕܬܵܟ݂",
        qala: "Marya Lakhu Tawde",
        qalaSyr: "ܡܵܪܝܵܐ ܠܵܟܼܘܼ ܬܵܘܕܹ݁ܐ",
        note: "Of the feast of Oshane.",
        hudraSlug: "marya-ettakh",
      },
      {
        type: "Shuraya",
        title: "Amen Amen Aman Na L'khon",
        titleSyr: "ܐܵܡܹܝܢ ܐܵܡܹܝܢ ܐܵܡܲܪ ܐ݇ܢܵܐ ܠܟܼܘܿܢ",
        note: "Of the Sunday of Oshane.",
        hudraSlug: "thuwa-lyalude",
      },
      {
        type: "d'qanke",
        title: "Tuwa L'yallude",
        titleSyr: "ܛܘܼܒ݂ܵܐ ܠܝܲܠܘܼܕܹ̈ܐ",
        qala: "Resh Qala",
        qalaLabel: false,
        note: "Of the Sunday of Oshane.",
        hudraSlug: "thuwa-lyalude",
      },
      {
        type: "Shuraya",
        title: "Hayden Shabhon",
      },
      {
        type: "d'raze",
        title: "Uhdane D'hashakh",
        titleSyr: "ܥܘܼܗܕܵܢܹܗ ܕܚܲܫܵܟ݂",
        qala: "Resh Qala",
        qalaLabel: false,
        note: "Partial. Of the feast of Pes'ha.",
        hudraSlug: "uhdane-dhashakh",
      },
    ],
  },
  {
    number: 5,
    title: "Cassette 5",
    youtubeEmbedSrc: "https://www.youtube-nocookie.com/embed/CSHQ19YK7EQ",
    youtubeTitle: "The Chaldean Hymns by Bishop Ephrem Buddy, part 5",
    hymns: [
      {
        type: "d'raze",
        title: "Uhdane D'hashakh",
        titleSyr: "ܥܘܼܗܕܵܢܹܗ ܕܚܲܫܵܟ݂",
        qala: "Resh Qala",
        qalaLabel: false,
        note: "Of the feast of Pes'ha.",
        hudraSlug: "uhdane-dhashakh",
      },
      {
        type: "Madrasha",
        title: "Ett'ir Shahre Zmar",
        titleSyr: "ܐܸܬ݁ܬ݁ܥܝܼܪܘ ܫܵܗܪܹ̈ܐ ܙܡܲܪܘ",
        note: "Of the Friday of Passion.",
        hudraSlug: "ethir-shahr-zmar",
      },
      {
        type: "Mawtwa",
        title: "Nettayaw B'dehltha",
        titleSyr: "ܢܸܬ݁ܛܲܝܲܒ݂ ܒܕܸܚܠܬ݂ܵܐ",
        qala: "Resh Qala",
        qalaLabel: false,
        note: "Of the Friday of Passion.",
        hudraSlug: "nettaiyaw",
      },
      {
        type: "Madrasha",
        title: "Ett'ir Zandiqe Wahzaw Hasha",
        titleSyr: "ܐܸܬ݁ܬ݁ܥܝܼܪܘ ܙܲܕܝܼܩܹ̈ܐ ܘܲܚܙܵܘ ܚܲܫܵܐ",
        note: "Of the Friday of Passion.",
        hudraSlug: "ettir-zandiqe-wahzaw-hasha",
      },
      {
        type: "Shambah",
        title: "Wayli Dahteth",
        titleSyr: "ܘܵܝܠܝܼ ܕܲܚܛܸܝܬ݂",
        qala: "Taw Baytaye",
        qalaSyr: "ܬܵܘ ܒܲܝ̈ܬܵܝܹܐ",
        note: "Of the Friday of Passion.",
        hudraSlug: "wayli-dahteth",
      },
      {
        type: "Onyatha",
        title: "B'han Lelya Qsa Wa",
        titleSyr: "ܒܗܵܢ ܠܸܠܝܵܐ ܩ̣ܨܵܐ ܗ݇ܘ̣ܵܐ",
        note: "Of the Friday of Passion.",
        hudraSlug: "bhan-lelya-qsa-wa",
      },
      {
        type: "Qanona",
        title: "Mshiha Malkan Taqipa",
        titleSyr: "ܡܫܝܼܚܵܐ ܡܲܠܟܲܢ ܬܲܩܝܼܦܵܐ",
        qala: "En Awlan",
        qalaSyr: "ܐܸܢ ܥܵܘ̣ܠܲܢ",
        note: "Of Pesha.",
        hudraSlug: "mshiha-malkan-taqipa",
      },
      {
        type: "Teshbohta",
        title: "Za'ath Ar'a",
        titleSyr: "ܙܵܥܲܬ݀ ܐܲܪܥܵܐ",
        note: "Of the Friday of Passion.",
        hudraSlug: "zaath-ara",
      },
      {
        type: "Madrasha",
        title: "Hunayn Hannana",
        titleSyr: "ܚܘܼܢܲܝܢ ܚܲܢܵܢܵܐ",
        note: "Of the Friday of Passion.",
        hudraSlug: "hunayn-hannana",
      },
      {
        type: "Karozoutha of Qyamta",
        title: "N'qum Shapir",
        titleSyr: "ܢܩܘܼܡ ܫܲܦܝܼܪ",
        hudraSlug: "nqum-shapir-qyamta",
      },
      {
        type: "Karozoutha of Qyamta",
        title: "N'qum Shapir",
        titleSyr: "ܢܩܘܼܡ ܫܲܦܝܼܪ",
        note: "Another melody.",
        hudraSlug: "nqum-shapir-qyamta",
      },
      {
        type: "d'ewangelion",
        title: "Neshe Dethay",
        titleSyr: "ܢܸܫܹ̈ܐ ܕܐܸܬܲܝ̈",
        qala: "Qala Ramba",
        qalaLabel: false,
        note: "Of Qyamta.",
        hudraSlug: "neshe-dethay",
      },
      {
        type: "Karozoutha d'hugaya daqyamta",
        title: "N'qum Shapir",
        titleSyr: "ܢܩܘܼܡ ܫܲܦܝܼܪ",
        note: "Of the Qyamta procession.",
        hudraSlug: "nqum-shapir-qyamta-procession",
      },
      {
        type: "d'ewangelion",
        title: "Neshe Dethay",
        titleSyr: "ܢܸܫܹ̈ܐ ܕܐܸܬܲܝ̈",
        qala: "Qala Ramba",
        qalaLabel: false,
        note: "Of Qyamta. Repeated; better voice quality.",
        hudraSlug: "neshe-dethay",
      },
      {
        type: "Karozoutha d'hugaya daqyamta",
        title: "N'qum Shapir",
        titleSyr: "ܢܩܘܼܡ ܫܲܦܝܼܪ",
        note: "Of the Qyamta procession. Repeated; better voice quality.",
        hudraSlug: "nqum-shapir-qyamta-procession",
      },
      {
        type: "Onyatha d'mawtwa",
        title: "Kahnutha D'weth Ahron",
        titleSyr: "ܟܵܗܢܘܼܬ݂ܵܐ ܕܒܹܬ݂ ܐܲܗܪܘܿܢ",
        qala: "Qala Ramba",
        qalaLabel: false,
        note: "Of the Sunday of Pantequste.",
        hudraSlug: "kahnutha-dweth-ahron",
      },
      {
        type: "d'wasaliqe",
        title: "Ruha Qandisha Deshtandar",
        titleSyr: "ܪܘܼܚܵܐ ܩܕܝܼܫܵܐ ܕܐܸܫܬܲܕܲܪ",
        qala: "Qala Ramba",
        qalaLabel: false,
        note: "Of the fifth Sunday of Shlihe.",
        hudraSlug: "ruha-qandisha-deshtandar",
      },
      {
        type: "Madrasha",
        title: "Brikhu Dawpagran",
        titleSyr: "ܒܪܝܼܟ݂ܘܼ ܕܲܒ݂ܦܲܓܪܲܢ",
        qala: "Zel Laqritha / Arba'apenyan",
        note: "Second Madrasha of the Feast of the Gelyana of our Lord.",
        hudraSlug: "brikhu-dawpagran",
      },
      {
        type: "d'wasaliqe",
        title: "O Emma Atipath Nuhra",
        titleSyr: "ܐܘܿ ܐܸܡܵܐ ܥܛܝܼܦܲܬ݂ ܢܘܼܗܪܵܐ",
        qala: "Resh Haylawatha",
        qalaSyr: "ܪܹܫ ܚܲܝܠܵܘ̈ܵܬ݂ܵܐ",
        note: "Of the Feast of Shunaya of Mart Maryam.",
        hudraSlug: "o-emma-atipath-nuhra",
      },
      {
        type: "Shuwha",
        title: "O Emma Atipath Nuhra",
        titleSyr: "ܐܘܿ ܐܸܡܵܐ ܥܛܝܼܦܲܬ݂ ܢܘܼܗܪܵܐ",
        qala: "Harka La Taweth",
        qalaSyr: "ܗܵܪܟܵܐ ܠܵܐ ܬܵܒܹܬ݂",
        note: "Of the Feast of Shunaya of Mart Maryam.",
        hudraSlug: "o-emma-atipath-nuhra",
      },
      {
        type: "d'wasaliqe",
        title: "Sliwakh Amlekh",
        titleSyr: "ܨܠܝܼܒ݂ܵܟ݂ ܐܲܡܠܸܟ݂",
        qala: "Resh Qala",
        qalaLabel: false,
        note: "Of the Feast of the Cross (Eda dasliwa).",
        hudraSlug: "sliwakh-amlekh",
      },
    ],
  },
];

export default function EphremBedeRecordings() {
  return (
    <>
      <div className="not-prose mb-8 flex justify-center">
        <Image
          src="/images/Bede.png"
          alt="Archbishop Mar Ephrem Bede (المطران أفرام بدي)"
          width={320}
          height={400}
          className="rounded-lg shadow-md border border-slate-200 w-full max-w-xs h-auto"
          priority
        />
      </div>

      <h2>Introduction</h2>
      <p>
        Archbishop Mar Ephrem Bede (
        <span
          dir="rtl"
          lang="ar"
          className="font-[family-name:var(--font-lora)]"
        >
          المطران أفرام بدي
        </span>
        ; also spelled Afram Beddi / Aphrem Bedi) was a Chaldean Catholic
        prelate, liturgist, and cantor, celebrated for his melodious voice and
        for preserving the traditional melodies of the Chaldean rite.
      </p>
      <p>
        Born Elias, son of Yusuf Oraha Audisho Hanna Bedi, in Alqosh (
        <span dir="rtl" lang="ar">
          ألقوش
        </span>
        ), Iraq, in 1916, he entered the seminary of Mar Yohannan the Beloved in
        Mosul in 1929 and was ordained a priest on 15 May 1941, taking the name
        Ephrem. He served as a parish priest and teacher in Alqosh, founding a
        charitable society in 1947, before pastoral assignments in Syria (from
        1951), study in Paris (1960-1962), ministry in Beirut (1962-1964), and
        long service in Egypt as patriarchal vicar (1964-1980) and bishop
        (1980-1984). He died in Cairo in 1984 and was buried, according to his
        wish, in the Church of the Virgin Mary in Alqosh.
      </p>
      <p>
        In addition to writings on Chaldean liturgy and spirituality - among
        them a study of the principal authors of the Chaldean rite (Beirut,
        1962) and two volumes of musical notation for the Chaldean Mass (Rome,
        1967) - he recorded a substantial body of liturgical chant. In Cairo in
        1977, in collaboration with the German Institute of Tabor (a research
        institute devoted to musical recording and heritage), he sang the
        principal melodies of the Chaldean Church onto a set of cassette tapes.
        Those recordings remain an important reference for teaching and studying
        Chaldean liturgical music.
      </p>
      <p>
        What follows is a provisional catalogue of the hymns on five of those
        cassettes. Track lists will be supplied for each cassette below.
      </p>
      <p>
        Courtesy is due to Archbishop Habib Hormiz Jajou (
        <span dir="rtl" lang="ar">
          المطران حبيب هرمز ججو
        </span>
        ; also Habib Hormiz Jajou Al-Nawfali), Archbishop of Basra and Southern
        Iraq since 2014 and Apostolic Visitator for Chaldean faithful in Europe,
        for uploading these cassette recordings to{" "}
        <a
          href="https://www.youtube.com/@abhabibjajou3972"
          target="_blank"
          rel="noopener noreferrer"
        >
          YouTube
        </a>
        , where they remain freely accessible.
      </p>

      <h2 className="not-prose text-xl font-semibold font-[family-name:var(--font-lora)] text-slate-700 mt-10 mb-6">
        Cassette contents
      </h2>

      <div className="not-prose space-y-10">
        {CASSETTES.map((cassette) => (
          <section key={cassette.number}>
            <h3 className="text-base font-semibold font-[family-name:var(--font-lora)] text-slate-600 border-b border-slate-200 pb-2 mb-4">
              {cassette.title}
            </h3>
            {cassette.youtubeEmbedSrc && (
              <RecordingEmbed
                src={cassette.youtubeEmbedSrc}
                title={
                  cassette.youtubeTitle ??
                  `${cassette.title} - Mar Ephrem Bede`
                }
              />
            )}
            {cassette.hymns.length > 0 ? (
              <ol className="list-decimal list-outside ms-5 mt-4 space-y-1.5 text-sm text-slate-700 font-[family-name:var(--font-lora)]">
                {cassette.hymns.map((hymn, i) => (
                  <li key={i}>
                    {hymn.hudraSlug ? (
                      <Link
                        href={`/hymns/${hymn.hudraSlug}`}
                        className="text-primary hover:underline"
                      >
                        {hymn.title}
                      </Link>
                    ) : (
                      <span>{hymn.title}</span>
                    )}
                    {hymn.titleSyr && (
                      <>
                        {" "}
                        (<Syr>{hymn.titleSyr}</Syr>)
                      </>
                    )}
                    {(hymn.type || hymn.page || hymn.qala) && (
                      <span className="text-muted-foreground">
                        {" - "}
                        {hymn.type}
                        {hymn.page && (
                          <>
                            {hymn.type ? " - " : ""}
                            {"Page "}
                            <Syr>{hymn.page}</Syr>
                          </>
                        )}
                        {hymn.qala && (
                          <>
                            {(hymn.type || hymn.page) && ", "}
                            {hymn.qalaLabel !== false && "Qala: "}
                            {hymn.qala}
                            {hymn.qalaSyr && (
                              <>
                                {" "}
                                (<Syr>{hymn.qalaSyr}</Syr>)
                              </>
                            )}
                          </>
                        )}
                      </span>
                    )}
                    {hymn.note && (
                      <span className="block text-muted-foreground italic mt-0.5">
                        {hymn.note}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-sm italic text-muted-foreground mt-4 mb-0 font-[family-name:var(--font-lora)]">
                Hymn list to be added.
              </p>
            )}
          </section>
        ))}
      </div>

      <h2 className="mt-12">Sources</h2>
      <ul>
        <li>
          <a
            href="https://www.qenshrin.com/archives/qen/%d8%a7%d9%84%d9%85%d8%b7%d8%b1%d8%a7%d9%86-%d8%a7%d9%81%d8%b1%d8%a7%d9%85-%d8%a8%d8%af%d9%8a"
            target="_blank"
            rel="noopener noreferrer"
          >
            المطران افرام بدي
          </a>{" "}
          - Qenshrin
        </li>
        <li>
          <a
            href="https://syriacmuseum.com/en/afram-beddi/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Afram Beddi
          </a>{" "}
          - Syriac Heritage Museum
        </li>
        <li>
          <a
            href="https://en.wikipedia.org/wiki/Habib_Al-Naufali"
            target="_blank"
            rel="noopener noreferrer"
          >
            Habib Al-Naufali
          </a>{" "}
          - Wikipedia
        </li>
        <li>
          <a
            href="https://www.youtube.com/@abhabibjajou3972"
            target="_blank"
            rel="noopener noreferrer"
          >
            AB Habib Jajou
          </a>{" "}
          - YouTube channel (cassette uploads)
        </li>
      </ul>
    </>
  );
}
