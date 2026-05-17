import { Article } from "@/lib/articles";

export default function ArticleTitle({
  article,
  syriacClassName = "text-2xl font-normal [font-family:'Idiqlat',serif]",
}: {
  article: Article;
  syriacClassName?: string;
}) {
  const syriac = article.titleSyriac && (
    <span
      className={syriacClassName}
      dir="rtl"
      style={{ fontWeight: 400, fontSynthesis: "none" }}
    >
      {article.titleSyriac}
    </span>
  );

  return (
    <>
      {article.title}
      {syriac &&
        (article.titleSuffix ? (
          <>
            {" ("}
            {syriac}
            {")"}
          </>
        ) : (
          <>
            <span className="mx-3">–</span>
            {syriac}
          </>
        ))}
      {article.titleSuffix && (
        <span className="font-[family-name:var(--font-eb-garamond)]">
          {" "}
          {article.titleSuffix}
        </span>
      )}
    </>
  );
}
