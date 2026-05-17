import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleTitle from "@/components/ArticleTitle";
import { articles } from "@/lib/articles";
import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { CalendarDays, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Articles – Hudra",
  description:
    "Scholarly articles on East Syriac liturgy, chant, manuscripts, and tradition.",
  keywords: [
    "East Syriac",
    "Church of the East",
    "liturgy",
    "Syriac chant",
    "articles",
    "scholarship",
  ],
  openGraph: {
    title: "Articles – Hudra",
    description:
      "Scholarly articles on East Syriac liturgy, chant, manuscripts, and tradition.",
    type: "website",
  },
};

export const dynamic = "force-static";

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Articles</h1>
          <p className="text-muted-foreground">
            Scholarly notes on East Syriac liturgy, chant, and tradition
          </p>
        </div>
        <Separator className="mb-10" />

        <ul className="space-y-8">
          {articles.map((article) => (
            <li key={article.slug}>
              <Link
                href={`/articles/${article.slug}`}
                className="group block rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-semibold text-foreground group-hover:text-primary transition-colors mb-1 font-[family-name:var(--font-eb-garamond)]">
                  <ArticleTitle
                    article={article}
                    syriacClassName="text-xl font-normal [font-family:'Idiqlat',serif]"
                  />
                </h2>
                {article.subtitle && (
                  <p className="text-sm text-muted-foreground mb-3 italic font-[family-name:var(--font-eb-garamond)]">
                    {article.subtitle}
                  </p>
                )}
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {article.description}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-xs text-muted-foreground">
                      <CalendarDays className="h-3.5 w-3.5" />
                      <time dateTime={article.date}>
                        {new Date(article.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                      {article.author && (
                        <>
                          <span className="mx-1">·</span>
                          <span>{article.author}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}
