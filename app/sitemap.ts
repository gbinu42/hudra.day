import { MetadataRoute } from "next";
import { bookService } from "@/lib/firebase-services";
import {
  categoryData,
  textData,
  ChurchSlug,
  CategorySlug,
} from "@/app/data/texts";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://hudra.day";

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/books`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/texts`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/editor`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/signin`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/signup`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/dashboard`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/admin`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  // Dynamic book routes
  let bookRoutes: MetadataRoute.Sitemap = [];
  try {
    const booksSnapshot = await bookService.getAllBooksWithoutPages();
    bookRoutes = booksSnapshot.docs.map((doc) => ({
      url: `${baseUrl}/books/${doc.id}`,
      lastModified: doc.data().updatedAt?.toDate() || new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Error fetching books for sitemap:", error);
  }

  // Church routes (texts/[church])
  const churchRoutes: MetadataRoute.Sitemap = Object.keys(categoryData).map(
    (churchSlug) => ({
      url: `${baseUrl}/texts/${churchSlug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    })
  );

  // Category routes (texts/[church]/[category])
  const categoryRoutes: MetadataRoute.Sitemap = [];
  for (const churchSlug in categoryData) {
    const church = categoryData[churchSlug as ChurchSlug];
    for (const categorySlug in church.categories) {
      categoryRoutes.push({
        url: `${baseUrl}/texts/${churchSlug}/${categorySlug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  }

  // Individual text routes (texts/[church]/[category]/[text])
  const textRoutes: MetadataRoute.Sitemap = [];
  for (const churchSlug in textData) {
    const church = textData[churchSlug as ChurchSlug];
    for (const categorySlug in church) {
      const category = church[categorySlug as CategorySlug];
      for (const textSlug in category) {
        textRoutes.push({
          url: `${baseUrl}/texts/${churchSlug}/${categorySlug}/${textSlug}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.5,
        });
      }
    }
  }

  return [
    ...staticRoutes,
    ...bookRoutes,
    ...churchRoutes,
    ...categoryRoutes,
    ...textRoutes,
  ];
}
