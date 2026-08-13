import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  // Static export is what ships to GitHub Pages, but applying it during `next
  // dev` also forbids GET route handlers, which the local audio tooling needs
  // for range-based streaming. The production build still enforces it.
  ...(isDev ? {} : { output: "export" as const }),
  images: {
    unoptimized: true,
  },
  // Files named `page.dev.tsx` / `route.dev.ts` are only routable while running
  // `next dev`, so local-only tooling is absent from the static export.
  pageExtensions: isDev
    ? ["tsx", "ts", "jsx", "js", "dev.tsx", "dev.ts"]
    : ["tsx", "ts", "jsx", "js"],
  // Enable service worker for production builds
  trailingSlash: false,
  assetPrefix: process.env.NODE_ENV === "production" ? "" : "",
};

// Only apply Serwist for production builds to avoid Turbopack conflicts
let finalConfig = nextConfig;

if (
  process.env.NODE_ENV === "production" ||
  process.env.NEXT_PHASE === "phase-production-build"
) {
  const withSerwistInit = require("@serwist/next").default;

  const withSerwist = withSerwistInit({
    swSrc: "app/sw.ts",
    swDest: "public/sw.js",
    additionalPrecacheEntries: [
      {
        url: "/",
        revision: "1",
      },
      {
        url: "/offline",
        revision: "1",
      },
    ],
  });

  finalConfig = withSerwist(nextConfig);
}

export default finalConfig;
