import { MetadataRoute } from "next";

export type SitemapEntry = MetadataRoute.Sitemap[0];

/**
 * Base URL for the application
 */
export const SITE_BASE_URL = "https://hudra.day";

/**
 * Helper function to create a sitemap entry with default values
 */
export function createSitemapEntry(
  url: string,
  options?: {
    lastModified?: Date;
    changeFrequency?:
      | "always"
      | "hourly"
      | "daily"
      | "weekly"
      | "monthly"
      | "yearly"
      | "never";
    priority?: number;
  }
): SitemapEntry {
  return {
    url,
    lastModified: options?.lastModified || new Date(),
    changeFrequency: options?.changeFrequency || "monthly",
    priority: options?.priority || 0.5,
  };
}

/**
 * Generate static route entries for the sitemap
 */
export function generateStaticRoutes(
  baseUrl: string = SITE_BASE_URL
): MetadataRoute.Sitemap {
  return [
    createSitemapEntry(baseUrl, {
      changeFrequency: "daily",
      priority: 1,
    }),
    createSitemapEntry(`${baseUrl}/about`, {
      changeFrequency: "monthly",
      priority: 0.8,
    }),
    createSitemapEntry(`${baseUrl}/contact`, {
      changeFrequency: "monthly",
      priority: 0.6,
    }),
    createSitemapEntry(`${baseUrl}/editor`, {
      changeFrequency: "monthly",
      priority: 0.7,
    }),
    createSitemapEntry(`${baseUrl}/privacy`, {
      changeFrequency: "yearly",
      priority: 0.3,
    }),
    createSitemapEntry(`${baseUrl}/terms`, {
      changeFrequency: "yearly",
      priority: 0.3,
    }),
    createSitemapEntry(`${baseUrl}/signin`, {
      changeFrequency: "monthly",
      priority: 0.4,
    }),
    createSitemapEntry(`${baseUrl}/signup`, {
      changeFrequency: "monthly",
      priority: 0.4,
    }),
    createSitemapEntry(`${baseUrl}/forgot-password`, {
      changeFrequency: "monthly",
      priority: 0.3,
    }),
    createSitemapEntry(`${baseUrl}/dashboard`, {
      changeFrequency: "weekly",
      priority: 0.5,
    }),
    createSitemapEntry(`${baseUrl}/profile`, {
      changeFrequency: "monthly",
      priority: 0.4,
    }),
    createSitemapEntry(`${baseUrl}/offline`, {
      changeFrequency: "monthly",
      priority: 0.2,
    }),
  ];
}

/**
 * Generate dynamic routes for a collection
 * @param baseUrl - Base URL for the application
 * @param collectionPath - Path segment for the collection (e.g., "books", "hymns")
 * @param documents - Array of documents with id and optional updatedAt
 * @param options - Configuration options
 */
export function generateDynamicRoutes(
  baseUrl: string,
  collectionPath: string,
  documents: Array<{
    id: string;
    updatedAt?: Date;
  }>,
  options?: {
    changeFrequency?:
      | "always"
      | "hourly"
      | "daily"
      | "weekly"
      | "monthly"
      | "yearly"
      | "never";
    priority?: number;
  }
): MetadataRoute.Sitemap {
  return documents.map((doc) =>
    createSitemapEntry(`${baseUrl}/${collectionPath}/${doc.id}`, {
      lastModified: doc.updatedAt || new Date(),
      changeFrequency: options?.changeFrequency || "weekly",
      priority: options?.priority || 0.8,
    })
  );
}

/**
 * Generate nested dynamic routes for a collection with subcollections
 * @param baseUrl - Base URL for the application
 * @param collectionPath - Path segment for the collection (e.g., "texts")
 * @param nestedStructure - Nested structure of routes
 * @param options - Configuration options
 */
export function generateNestedRoutes(
  baseUrl: string,
  collectionPath: string,
  nestedStructure: Record<string, Record<string, string[]>>,
  options?: {
    changeFrequency?:
      | "always"
      | "hourly"
      | "daily"
      | "weekly"
      | "monthly"
      | "yearly"
      | "never";
    priority?: number;
  }
): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  for (const level1 in nestedStructure) {
    for (const level2 in nestedStructure[level1]) {
      const level3Items = nestedStructure[level1][level2];
      for (const level3 of level3Items) {
        routes.push(
          createSitemapEntry(
            `${baseUrl}/${collectionPath}/${level1}/${level2}/${level3}`,
            {
              changeFrequency: options?.changeFrequency || "monthly",
              priority: options?.priority || 0.5,
            }
          )
        );
      }
    }
  }

  return routes;
}

/**
 * Merge multiple sitemap arrays into one
 */
export function mergeSitemaps(
  ...sitemaps: MetadataRoute.Sitemap[]
): MetadataRoute.Sitemap {
  return sitemaps.flat();
}

/**
 * Filter sitemap entries based on a predicate function
 */
export function filterSitemap(
  sitemap: MetadataRoute.Sitemap,
  predicate: (entry: SitemapEntry) => boolean
): MetadataRoute.Sitemap {
  return sitemap.filter(predicate);
}

/**
 * Sort sitemap entries by priority (descending) and then by URL (ascending)
 */
export function sortSitemap(
  sitemap: MetadataRoute.Sitemap
): MetadataRoute.Sitemap {
  return sitemap.sort((a, b) => {
    // First sort by priority (descending)
    const priorityDiff = (b.priority || 0) - (a.priority || 0);
    if (priorityDiff !== 0) return priorityDiff;

    // Then sort by URL (ascending)
    return a.url.localeCompare(b.url);
  });
}

/**
 * Remove duplicate URLs from sitemap
 */
export function deduplicateSitemap(
  sitemap: MetadataRoute.Sitemap
): MetadataRoute.Sitemap {
  const seen = new Set<string>();
  return sitemap.filter((entry) => {
    if (seen.has(entry.url)) {
      return false;
    }
    seen.add(entry.url);
    return true;
  });
}

/**
 * Get total count of URLs in sitemap
 */
export function getSitemapCount(sitemap: MetadataRoute.Sitemap): number {
  return sitemap.length;
}

/**
 * Log sitemap statistics (useful for debugging)
 */
export function logSitemapStats(sitemap: MetadataRoute.Sitemap): void {
  const count = getSitemapCount(sitemap);
  const priorities = sitemap.reduce(
    (acc, entry) => {
      const priority = entry.priority || 0;
      if (priority >= 0.8) acc.high++;
      else if (priority >= 0.5) acc.medium++;
      else acc.low++;
      return acc;
    },
    { high: 0, medium: 0, low: 0 }
  );

  console.log("Sitemap Statistics:");
  console.log(`  Total URLs: ${count}`);
  console.log(`  High Priority (≥0.8): ${priorities.high}`);
  console.log(`  Medium Priority (0.5-0.8): ${priorities.medium}`);
  console.log(`  Low Priority (<0.5): ${priorities.low}`);
}
