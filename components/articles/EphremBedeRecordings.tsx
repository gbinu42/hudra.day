/**
 * List of Hymns in the Recordings by Archbishop Ephrem Bede
 * (المطران أفرام بدي)
 *
 * Hymn lists for each cassette will be filled in later.
 */

import Link from "next/link";
import type { ReactNode } from "react";

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
      className={`[font-family:'Idiqlat',serif] inline-block ${className}`}
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
  { number: 2, title: "Cassette 2", hymns: [] },
  { number: 3, title: "Cassette 3", hymns: [] },
  { number: 4, title: "Cassette 4", hymns: [] },
  { number: 5, title: "Cassette 5", hymns: [] },
];

export default function EphremBedeRecordings() {
  return (
    <>
      <div className="not-prose mb-6 rounded-lg bg-yellow-50 border border-yellow-300 px-5 py-3 flex items-center gap-3 text-yellow-800">
        <span className="text-lg" aria-hidden="true">
          🚧
        </span>
        <p className="text-sm font-medium m-0">
          Work in progress - hymn lists for each cassette will be added shortly.
        </p>
      </div>

      <h2>Introduction</h2>
      <p>
        Archbishop Ephrem Bede (
        <span dir="rtl" lang="ar" className="font-[family-name:var(--font-lora)]">
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
        ), Iraq, in 1916, he entered the seminary of Mar Yohannan the Beloved
        in Mosul in 1929 and was ordained a priest on 15 May 1941, taking the
        name Ephrem. He served as a parish priest and teacher in Alqosh,
        founding a charitable society in 1947, before pastoral assignments in
        Syria (from 1951), study in Paris (1960-1962), ministry in Beirut
        (1962-1964), and long service in Egypt as patriarchal vicar
        (1964-1980) and bishop (1980-1984). He died in Cairo in 1984 and was
        buried, according to his wish, in the Church of the Virgin Mary in
        Alqosh.
      </p>
      <p>
        In addition to writings on Chaldean liturgy and spirituality - among
        them a study of the principal authors of the Chaldean rite (Beirut,
        1962) and two volumes of musical notation for the Chaldean Mass (Rome,
        1967) - he recorded a substantial body of liturgical chant. In Cairo
        in 1977, in collaboration with the German Institute of Tabor (a
        research institute devoted to musical recording and heritage), he sang
        the principal melodies of the Chaldean Church onto a set of cassette
        tapes. Those recordings remain an important reference for teaching and
        studying Chaldean liturgical music.
      </p>
      <p>
        What follows is a provisional catalogue of the hymns on five of those
        cassettes. Track lists will be supplied for each cassette below.
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
            {cassette.hymns.length > 0 ? (
              <ol className="list-decimal list-outside ms-5 space-y-1.5 text-sm text-slate-700 font-[family-name:var(--font-lora)]">
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
              <p className="text-sm italic text-muted-foreground m-0 font-[family-name:var(--font-lora)]">
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
      </ul>
    </>
  );
}
