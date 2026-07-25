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

const Gar = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={`font-east-syriac-adiabene ${className}`}
    dir="rtl"
    style={{ fontWeight: 400, fontSynthesis: "none" }}
  >
    {children}
  </span>
);

const LETTERS: { mal: string; gar: string }[] = [
  { mal: "ക", gar: "ܟ" },
  { mal: "ഖ", gar: "ܩ" },
  { mal: "ഗ", gar: "ܓ" },
  { mal: "ഘ", gar: "ܓ̃" },
  { mal: "ങ", gar: "ࡠ" },
  { mal: "ച", gar: "ܫ݁" },
  { mal: "ഛ", gar: "ܫ̃" },
  { mal: "ജ", gar: "ࡡ" },
  { mal: "ഝ", gar: "ࡡ̃" },
  { mal: "ഞ", gar: "ࡢ" },
  { mal: "ട", gar: "ࡣ" },
  { mal: "ഠ", gar: "ࡣ̃" },
  { mal: "ഡ", gar: "ܖ" },
  { mal: "ഢ", gar: "ܖ̃" },
  { mal: "ണ", gar: "ࡤ" },
  { mal: "ത", gar: "ܬ" },
  { mal: "ഥ", gar: "ܛ" },
  { mal: "ദ", gar: "ܕ" },
  { mal: "ധ", gar: "ܕ̃" },
  { mal: "ന", gar: "ܢ" },
  { mal: "പ", gar: "ܦ" },
  { mal: "ഫ", gar: "ܦ݂" },
  { mal: "ബ", gar: "ܒ" },
  { mal: "ഭ", gar: "ࡦ" },
  { mal: "മ", gar: "ܡ" },
  { mal: "യ", gar: "ܝ" },
  { mal: "ര", gar: "ࡧ" },
  { mal: "ല", gar: "ܠ" },
  { mal: "വ", gar: "ܒ݂" },
  { mal: "ശ", gar: "ܫ" },
  { mal: "ഷ", gar: "ࡪ" },
  { mal: "സ", gar: "ܣ" },
  { mal: "ഹ", gar: "ܗ" },
  { mal: "ള", gar: "ࡨ" },
  { mal: "ഴ", gar: "ࡩ" },
  { mal: "റ", gar: "ܪ" }
];

/** Unique Garshuni vowel spellings only (i/ii, u/uu, o/oo share one form each). */
const VOWEL_MARKS: { name: string; marks: string }[] = [
  { name: "a", marks: "ܲ" },
  { name: "aa", marks: "ܵ" },
  { name: "i", marks: "ܝܼ" },
  { name: "u", marks: "ܘܼ" },
  { name: "e", marks: "ܸ" },
  { name: "ee", marks: "ܹ" },
  { name: "ai", marks: "ܵܝ" },
  { name: "o", marks: "ܘܿ" },
  { name: "au", marks: "ܵܘ" }
];

const SAMPLE_TEXT: string[] = [
  'ܦܲࡧܝܼܫܘܼܕ̃ܵܐܬܡܵܒ݂ܹܐ ࡥܝܼ ܐܸࡩܘܼࡥ̱ܲࡨ̱ܝܼ',
  'ࡧܲܫ݁ܲܢܲܐ: ܦ݂ܵܕܲܪ ܐܵܒܹܠ ',
  'ܦܲࡧܝܼܫܘܼܕ̃ܵܐܬܡܵܒ݂ܹܐ ࡥܝܼ ܐܸࡩܘܼࡥ̱ܲࡨ̱ܝܼ ܒ݂ܲࡧܲࡤܲܡܹܐ ܐܸܢܪ̱ܸܐ ܗܪܕܲܝܲܬ̱ܝܼܠ܀',
  'ܕܝܼܒ݂ܝܲܕܵܢܲࡠ̱ܲࡨ ܫ݁ܝܼࡥܬܝܼ ܐܸܢ̱ܘܼࡨ̱ܝܼܠ ܕܲܝܒ݂ܲܣܢܹܗܲܡ ࡥܝܼܪܲܝܟ̱ܲࡤܹܐ܀',
  'ܣܒ݂ܲܪܓܲܒ݂ܵܬܝܼܠ ܬܘܼܪܲࡥ̱ܘܼ ࡦܘܼܡܝܼܝܼܠ ࡥܝܼܪܓܲࡨܝܼܟ̱ܘܼܡ ܦܪܲܟܵܫܲܡܹܐ܀',
  'ܐܲࡥܕ̃ܲܟܵࡧܲܐܒ݂ܝܼࡧܝܼܦ̱ܘܼ ܡܵܪ̱ܝܼࡣܘܼܡ ܫ݁ܲࡥܬܲܡܹܪܘܼࡥ̱ܲܐ ܕܝܼܦܲܡܹܐ܀',
  'ܟܹࡩܘܼܡܵܬܡܵܒ݂ܝܼܠ ܐܵܫܲܒ݂ܝܼܫܘܼࡥ̱ܲܐ ܡܘܿܗܲܢܲܐ ܕܝܼܒ݂ܝܲܐ ܓܵܢܲܡܹܐ܀',
  'ܒ݂ܝܼࡤࡣܘܼࡤܲࡠ̱ܝܼܒ݂ܲࡧܲࡤࡣܲܐ ܡܵܢܲܣܲܡ ܟܲࡤࡣܲܐ ܒ݂ܝܼࡤ̱ܝܼܢ ܬܲࡣܵܟܲܡܹܐ܀',
  'ܡܲࡥܕܲܡܵܝ ܒ݂ܲࡥ̱ܘܼ ܒ݂ܝܼܫܝܼ ܐܵܢܲࡥܕܲܡ ܬܲࡥ̱ܲܐ ܦܘܿܢ̱ܝܼࡨܲܡ ܬܸܢ̱ܲܠܹܐ܀',
  'ࡧܲܟܬܲܣܵܟ̱ࡪܝܼܟܲࡨ ܐܵࡢ̱ܘܼܦܘܼܠܟܝܼܝܲܐ ܦܘܼࡤܝܲࡡܝܼܒ݂ܝܼܬܲܐ ܦܵܬܲܐ ࡥܝܼ܀',
];

export default function MalayalamGarshuni() {
  return (
    <div className="max-w-none">
      <p className="mb-4 text-sm text-stone-600">
        Each Malayalam letter with its Garshuni forms across the vowels.
      </p>

      <div className="mb-8 overflow-x-auto">
        <table className="w-full min-w-[36rem] border-collapse text-center">
          <thead>
            <tr className="border-b border-stone-200 text-[10px] uppercase tracking-wide text-stone-400">
              <th className="w-8 px-0.5 py-1 text-left font-medium" />
              {VOWEL_MARKS.map((v) => (
                <th key={v.name} className="px-0.5 py-1 font-medium">
                  {v.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {LETTERS.map((letter) => (
              <tr key={letter.mal} className="border-b border-stone-100">
                <td className="px-0.5 py-0.5 text-left">
                  <Mal className="text-xl leading-none">{letter.mal}</Mal>
                </td>
                {VOWEL_MARKS.map((v) => (
                  <td key={v.name} className="px-0.5 py-0.5">
                    <Gar className="text-[1.75rem] leading-none sm:text-[2rem]">
                      {letter.gar + v.marks}
                    </Gar>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mb-3 text-xl font-semibold text-stone-900">Text</h2>
      <div className="space-y-3 rounded border border-stone-200 bg-stone-50 px-4 py-5">
        {SAMPLE_TEXT.map((line, i) => (
          <p
            key={i}
            className="m-0 text-right text-3xl leading-relaxed sm:text-4xl"
          >
            <Gar>{line}</Gar>
          </p>
        ))}
      </div>
    </div>
  );
}
