import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Enable service worker for production builds
  trailingSlash: true,
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
