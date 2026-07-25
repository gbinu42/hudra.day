import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleTitle from "@/components/ArticleTitle";
import CommentsSectionWithStatic from "@/components/CommentsSectionWithStatic";
import { articles, getArticleBySlug, getArticleFullTitle } from "@/lib/articles";
import { commentService } from "@/lib/comment-services";
import { Comment } from "@/lib/types/comment";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { CalendarDays, ArrowLeft, Home, BookOpen } from "lucide-react";
import QaleDonyathaDsahde from "@/components/articles/QaleDonyathaDsahde";
import QambelMaranCD from "@/components/articles/QambelMaranCD";
import ReshQale from "@/components/articles/ReshQale";
import EphremBedeRecordings from "@/components/articles/EphremBedeRecordings";
import { ComponentType } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const articleContent: Record<string, ComponentType> = {
  "resh-qale": ReshQale,
  "qale-donyatha-dsahde": QaleDonyathaDsahde,
  "qambel-maran-cd": QambelMaranCD,
  "ephrem-bede-recordings": EphremBedeRecordings,
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

  const fullTitle = getArticleFullTitle(article);
  const canonical = `https://hudra.day/articles/${slug}`;
  const ogImage = article.image
    ? `https://hudra.day${article.image}`
    : "https://hudra.day/images/sliwa.png";
  const publishedIso = new Date(article.date).toISOString();

  return {
    title: `${fullTitle} - Hudra`,
    description: article.description,
    keywords: article.keywords,
    authors: article.author ? [{ name: article.author }] : undefined,
    category: "Articles",
    openGraph: {
      title: fullTitle,
      description: article.description,
      type: "article",
      url: canonical,
      siteName: "Hudra - East Syriac Liturgical Archive",
      publishedTime: publishedIso,
      modifiedTime: publishedIso,
      authors: article.author ? [article.author] : undefined,
      tags: article.keywords,
      locale: "en_US",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: article.imageAlt ?? fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: article.description,
      images: {
        url: ogImage,
        alt: article.imageAlt ?? fullTitle,
      },
    },
    alternates: {
      canonical,
    },
    other: {
      "article:published_time": publishedIso,
      "article:modified_time": publishedIso,
      ...(article.author && { "article:author": article.author }),
      "article:section": "Articles",
      ...(article.keywords.length > 0 && {
        "article:tag": article.keywords.join(", "),
      }),
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
  const fullTitle = getArticleFullTitle(article);
  const canonical = `https://hudra.day/articles/${slug}`;
  const ogImage = article.image
    ? `https://hudra.day${article.image}`
    : "https://hudra.day/images/sliwa.png";

  let comments: Comment[] = [];
  try {
    const commentsSnapshot = await commentService.getCommentsByResource(
      "article",
      slug,
      false
    );
    comments = commentsSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || new Date(),
        updatedAt: data.updatedAt?.toDate?.() || new Date(),
      } as Comment;
    });
  } catch (error) {
    console.error("Error fetching comments for article:", error);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: fullTitle,
        description: article.description,
        url: canonical,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": canonical,
        },
        datePublished: article.date,
        dateModified: article.date,
        inLanguage: "en",
        keywords: article.keywords.join(", "),
        image: [ogImage],
        author: article.author
          ? {
              "@type": "Person",
              name: article.author,
            }
          : undefined,
        publisher: {
          "@type": "Organization",
          name: "Hudra - East Syriac Liturgical Archive",
          url: "https://hudra.day",
          logo: {
            "@type": "ImageObject",
            url: "https://hudra.day/images/logo.png",
          },
        },
        isPartOf: {
          "@type": "WebSite",
          name: "Hudra - East Syriac Liturgical Archive",
          url: "https://hudra.day",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://hudra.day",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Articles",
            item: "https://hudra.day/articles",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: fullTitle,
            item: canonical,
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <article className="container mx-auto px-4 py-16 max-w-3xl">
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  <Home className="h-4 w-4" />
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/articles">
                  <BookOpen className="h-4 w-4" />
                  Articles
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1 max-w-[16rem] sm:max-w-md">
                  {fullTitle}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

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

        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-8 font-sans">
          <CommentsSectionWithStatic
            resourceType="article"
            resourceId={slug}
            initialComments={comments}
          />
        </div>
      </article>
      <Footer />
    </div>
  );
}
