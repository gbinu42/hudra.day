# Sitemap Generation Documentation

This project uses Next.js's built-in sitemap generation feature with custom utilities to create a comprehensive sitemap for SEO optimization.

## Overview

The sitemap is automatically generated at build time and includes:

- **Static routes**: Core pages like home, about, contact, etc.
- **Dynamic routes**: Pages generated from Firebase collections (books, hymns, persons)
- **Nested routes**: Complex hierarchical routes (texts with church/category/text structure)

## Files

### `app/sitemap.ts`

The main sitemap file that Next.js uses to generate the sitemap at `/sitemap.xml`. This file:

- Fetches data from Firebase collections
- Generates routes for all pages
- Uses utility functions for cleaner code
- Includes error handling for Firebase failures

### `lib/sitemap-utils.ts`

Utility functions for sitemap generation:

#### Constants

- **`SITE_BASE_URL`**: The base URL for the application (`https://hudra.day`)

#### Core Functions

##### `createSitemapEntry(url, options?)`

Creates a single sitemap entry with default values.

```typescript
createSitemapEntry("https://hudra.day/about", {
  lastModified: new Date(),
  changeFrequency: "monthly",
  priority: 0.8,
});
```

**Parameters:**

- `url` (string): The full URL of the page
- `options` (object, optional):
  - `lastModified` (Date): Last modification date (default: now)
  - `changeFrequency` (string): How often the page changes (default: "monthly")
  - `priority` (number): Page priority 0-1 (default: 0.5)

##### `generateStaticRoutes(baseUrl?)`

Generates all static routes for the application.

```typescript
const staticRoutes = generateStaticRoutes(); // Uses default base URL
```

##### `generateDynamicRoutes(baseUrl, collectionPath, documents, options?)`

Generates dynamic routes for a collection of documents.

```typescript
const books = [
  { id: "book-1", updatedAt: new Date() },
  { id: "book-2", updatedAt: new Date() },
];

const bookRoutes = generateDynamicRoutes("https://hudra.day", "books", books, {
  changeFrequency: "weekly",
  priority: 0.8,
});
```

##### `mergeSitemaps(...sitemaps)`

Merges multiple sitemap arrays into one.

```typescript
const allRoutes = mergeSitemaps(staticRoutes, bookRoutes, hymnRoutes);
```

##### `deduplicateSitemap(sitemap)`

Removes duplicate URLs from the sitemap.

```typescript
const uniqueRoutes = deduplicateSitemap(allRoutes);
```

##### `sortSitemap(sitemap)`

Sorts sitemap entries by priority (descending) then URL (ascending).

```typescript
const sortedRoutes = sortSitemap(allRoutes);
```

##### `filterSitemap(sitemap, predicate)`

Filters sitemap entries based on a predicate function.

```typescript
const highPriorityRoutes = filterSitemap(
  allRoutes,
  (entry) => (entry.priority || 0) >= 0.8
);
```

##### `logSitemapStats(sitemap)`

Logs statistics about the sitemap (useful for debugging).

```typescript
logSitemapStats(finalSitemap);
// Output:
// Sitemap Statistics:
//   Total URLs: 150
//   High Priority (≥0.8): 25
//   Medium Priority (0.5-0.8): 75
//   Low Priority (<0.5): 50
```

## Usage Examples

### Adding a New Static Route

Edit `lib/sitemap-utils.ts` and add the route to the `generateStaticRoutes` function:

```typescript
createSitemapEntry(`${baseUrl}/new-page`, {
  changeFrequency: "monthly",
  priority: 0.7,
}),
```

### Adding a New Dynamic Collection

In `app/sitemap.ts`, add code to fetch and generate routes:

```typescript
// Fetch data
let myCollectionRoutes: MetadataRoute.Sitemap = [];
try {
  const snapshot = await myService.getAll();
  const items = snapshot.docs.map((doc) => ({
    id: doc.id,
    updatedAt: doc.data().updatedAt?.toDate(),
  }));
  myCollectionRoutes = generateDynamicRoutes(baseUrl, "my-collection", items, {
    changeFrequency: "weekly",
    priority: 0.7,
  });
} catch (error) {
  console.error("Error fetching my-collection for sitemap:", error);
}

// Add to the merge
const allRoutes = mergeSitemaps(
  staticRoutes,
  // ... other routes
  myCollectionRoutes
);
```

### Testing the Sitemap

1. **In Development**: The sitemap is available at `http://localhost:3000/sitemap.xml`

   - Statistics will be logged to the console when accessed

2. **In Production**: After building, the sitemap is generated at `out/sitemap.xml`

   ```bash
   npm run build
   ```

3. **Validate**: Use online tools like:
   - [Google Search Console](https://search.google.com/search-console)
   - [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)

## Priority Guidelines

Use these priority values as guidelines:

- **1.0**: Homepage only
- **0.8-0.9**: Main sections and important content pages
- **0.5-0.7**: Regular content pages
- **0.3-0.4**: User account pages, forms
- **0.2**: Utility pages (offline, legal)

## Change Frequency Guidelines

- **always**: Pages that change constantly (live feeds)
- **hourly**: News pages, frequently updated content
- **daily**: Main listing pages with daily updates
- **weekly**: Regular content pages
- **monthly**: Occasional content updates
- **yearly**: Rarely changing pages (legal, about)
- **never**: Archived content

## Best Practices

1. **Error Handling**: Always wrap Firebase calls in try-catch blocks
2. **Performance**: Use optimized queries (e.g., `getAllBooksWithoutPages`)
3. **Deduplication**: Always deduplicate the final sitemap
4. **Validation**: Test the sitemap after making changes
5. **Monitoring**: Check sitemap statistics in development

## Firebase Integration

The sitemap fetches data from these Firebase collections:

- **books**: Via `bookService.getAllBooksWithoutPages()`
- **hymns**: Via `hymnService.getAllHymns()`
- **persons**: Via `personService.getAllPersons()`
- **texts**: Static data from `@/app/data/texts`

## Troubleshooting

### Sitemap not updating

1. Delete the `.next` directory
2. Rebuild the project: `npm run build`
3. Check for errors in the console

### Missing routes

1. Check if the data is being fetched correctly
2. Verify Firebase permissions
3. Check for errors in try-catch blocks

### Duplicate URLs

1. Run `deduplicateSitemap()` on the final sitemap
2. Check for routes being added multiple times

## Related Resources

- [Next.js Sitemap Documentation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- [Sitemap Protocol](https://www.sitemaps.org/protocol.html)
- [Google Search Console](https://search.google.com/search-console)
