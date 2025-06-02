import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/index.html",
      },
      {
        source: "/about",
        destination: "/about.html",
      },
      {
        source: "/contact",
        destination: "/contact.html",
      },
      {
        source: "/type",
        destination: "/type.html",
      },
    ];
  },
};

export default nextConfig;
