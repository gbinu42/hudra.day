import { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
import { bookService } from "@/lib/firebase-services";
import { hymnService } from "@/lib/hymn-services";
import {
  SITE_BASE_URL,
  generateStaticRoutes,
  generateDynamicRoutes,
  createSitemapEntry,
  mergeSitemaps,
  deduplicateSitemap,
  logSitemapStats,
} from "@/lib/sitemap-utils";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_BASE_URL;

  // Static routes - using utility function
  const staticRoutes = generateStaticRoutes(baseUrl);

  // Books routes
  const booksRoutes: MetadataRoute.Sitemap = [
    createSitemapEntry(`${baseUrl}/books`, {
      changeFrequency: "daily",
      priority: 0.9,
    }),
  ];

  // Dynamic book routes
  let bookDetailRoutes: MetadataRoute.Sitemap = [];
  try {
    const booksSnapshot = await bookService.getAllBooksWithoutPages();
    const books = booksSnapshot.docs.map((doc) => ({
      id: doc.id,
      updatedAt: doc.data().updatedAt?.toDate(),
    }));
    bookDetailRoutes = generateDynamicRoutes(baseUrl, "books", books, {
      changeFrequency: "weekly",
      priority: 0.8,
    });
  } catch (error) {
    console.error("Error fetching books for sitemap:", error);
  }

  // Hymns routes
  const hymnsRoutes: MetadataRoute.Sitemap = [
    createSitemapEntry(`${baseUrl}/hymns`, {
      changeFrequency: "daily",
      priority: 0.9,
    }),
    createSitemapEntry(`${baseUrl}/hymns/new`, {
      changeFrequency: "monthly",
      priority: 0.5,
    }),
  ];

  // Dynamic hymn routes
  let hymnDetailRoutes: MetadataRoute.Sitemap = [];
  try {
    const hymnsSnapshot = await hymnService.getAllHymns();
    const hymns = hymnsSnapshot.docs.map((doc) => ({
      id: doc.id,
      updatedAt: doc.data().updatedAt?.toDate(),
    }));
    hymnDetailRoutes = generateDynamicRoutes(baseUrl, "hymns", hymns, {
      changeFrequency: "daily",
      priority: 0.8,
    });
  } catch (error) {
    console.error("Error fetching hymns for sitemap:", error);
  }

  // Persons routes - only the new person form
  const personsRoutes: MetadataRoute.Sitemap = [
    createSitemapEntry(`${baseUrl}/persons/new`, {
      changeFrequency: "monthly",
      priority: 0.5,
    }),
  ];

  // Articles routes
  const articlesRoutes: MetadataRoute.Sitemap = [
    createSitemapEntry(`${baseUrl}/articles`, {
      changeFrequency: "weekly",
      priority: 0.8,
    }),
    ...articles.map((article) =>
      createSitemapEntry(`${baseUrl}/articles/${article.slug}`, {
        lastModified: new Date(article.date),
        changeFrequency: "monthly",
        priority: 0.7,
      }),
    ),
  ];

  // Texts routes - removed from sitemap per user request

  // Merge all sitemaps
  const allRoutes = mergeSitemaps(
    staticRoutes,
    booksRoutes,
    bookDetailRoutes,
    hymnsRoutes,
    hymnDetailRoutes,
    personsRoutes,
    articlesRoutes,
  );

  // Deduplicate and log stats
  const finalSitemap = deduplicateSitemap(allRoutes);

  // Log statistics in development
  if (process.env.NODE_ENV === "development") {
    logSitemapStats(finalSitemap);
  }

  return finalSitemap;
}
