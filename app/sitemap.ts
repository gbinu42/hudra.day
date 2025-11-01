import { MetadataRoute } from "next";
import { bookService } from "@/lib/firebase-services";
import { hymnService, personService } from "@/lib/hymn-services";
import {
  categoryData,
  textData,
  ChurchSlug,
  CategorySlug,
} from "@/app/data/texts";
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
      changeFrequency: "weekly",
      priority: 0.8,
    });
  } catch (error) {
    console.error("Error fetching hymns for sitemap:", error);
  }

  // Persons routes
  let personsRoutes: MetadataRoute.Sitemap = [
    createSitemapEntry(`${baseUrl}/persons/new`, {
      changeFrequency: "monthly",
      priority: 0.5,
    }),
  ];
  try {
    // Dynamic person routes
    const personsSnapshot = await personService.getAllPersons();
    const personDetailRoutes: MetadataRoute.Sitemap = personsSnapshot.docs.map(
      (doc) =>
        createSitemapEntry(`${baseUrl}/persons/${doc.id}/edit`, {
          lastModified: doc.data().updatedAt?.toDate() || new Date(),
          changeFrequency: "monthly",
          priority: 0.6,
        })
    );
    personsRoutes = [...personsRoutes, ...personDetailRoutes];
  } catch (error) {
    console.error("Error fetching persons for sitemap:", error);
  }

  // Texts routes
  const textsMainRoute: MetadataRoute.Sitemap = [
    createSitemapEntry(`${baseUrl}/texts`, {
      changeFrequency: "weekly",
      priority: 0.9,
    }),
  ];

  // Church routes (texts/[church])
  const churchRoutes: MetadataRoute.Sitemap = Object.keys(categoryData).map(
    (churchSlug) =>
      createSitemapEntry(`${baseUrl}/texts/${churchSlug}`, {
        changeFrequency: "weekly",
        priority: 0.7,
      })
  );

  // Category routes (texts/[church]/[category])
  const categoryRoutes: MetadataRoute.Sitemap = [];
  for (const churchSlug in categoryData) {
    const church = categoryData[churchSlug as ChurchSlug];
    for (const categorySlug in church.categories) {
      categoryRoutes.push(
        createSitemapEntry(`${baseUrl}/texts/${churchSlug}/${categorySlug}`, {
          changeFrequency: "weekly",
          priority: 0.6,
        })
      );
    }
  }

  // Individual text routes (texts/[church]/[category]/[text])
  const textRoutes: MetadataRoute.Sitemap = [];
  for (const churchSlug in textData) {
    const church = textData[churchSlug as ChurchSlug];
    for (const categorySlug in church) {
      const category = church[categorySlug as CategorySlug];
      for (const textSlug in category) {
        textRoutes.push(
          createSitemapEntry(
            `${baseUrl}/texts/${churchSlug}/${categorySlug}/${textSlug}`,
            {
              changeFrequency: "monthly",
              priority: 0.5,
            }
          )
        );
      }
    }
  }

  // Merge all sitemaps
  const allRoutes = mergeSitemaps(
    staticRoutes,
    booksRoutes,
    bookDetailRoutes,
    hymnsRoutes,
    hymnDetailRoutes,
    personsRoutes,
    textsMainRoute,
    churchRoutes,
    categoryRoutes,
    textRoutes
  );

  // Deduplicate and log stats
  const finalSitemap = deduplicateSitemap(allRoutes);

  // Log statistics in development
  if (process.env.NODE_ENV === "development") {
    logSitemapStats(finalSitemap);
  }

  return finalSitemap;
}
