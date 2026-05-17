import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleTitle from "@/components/ArticleTitle";
import { articles, getArticleBySlug, getArticleFullTitle } from "@/lib/articles";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { CalendarDays, ArrowLeft } from "lucide-react";
import QaleDonyathaDsahde from "@/components/articles/QaleDonyathaDsahde";
import ReshQale from "@/components/articles/ReshQale";
import { ComponentType } from "react";

const articleContent: Record<string, ComponentType> = {
  "resh-qale": ReshQale,
  "qale-donyatha-dsahde": QaleDonyathaDsahde,
};

export const dynamic = "force-static";

export async function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: `${getArticleFullTitle(article)} – Hudra`,
    description: article.description,
    keywords: article.keywords,
    openGraph: {
      title: getArticleFullTitle(article),
      description: article.description,
      type: "article",
      publishedTime: article.date,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const Content = articleContent[slug];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <article className="container mx-auto px-4 py-16 max-w-3xl">
        {/* Back link */}
        <Link
          href="/articles"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          All articles
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-10 font-[family-name:var(--font-lora)]">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-4xl font-semibold text-primary mb-3 leading-tight font-[family-name:var(--font-eb-garamond)]">
            <ArticleTitle article={article} />
          </h1>
          {article.subtitle && (
            <p className="text-base text-muted-foreground mb-4 font-sans">
              {article.subtitle}
            </p>
          )}
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground font-sans">
            <CalendarDays className="h-4 w-4" />
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
        </header>

        <Separator className="mb-10" />

        {/* Article body */}
        <div className="prose prose-slate prose-sm max-w-none leading-relaxed text-justify hyphens-auto article-body">
          {Content ? <Content /> : (
            <p className="text-muted-foreground italic">Content coming soon.</p>
          )}
        </div>
        </div>
      </article>
      <Footer />
    </div>
  );
}
