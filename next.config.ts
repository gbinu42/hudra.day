import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Remove rewrites as they're not compatible with static export
  // async rewrites() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/index.html",
  //     },
  //     {
  //       source: "/about",
  //       destination: "/about.html",
  //     },
  //     {
  //       source: "/contact",
  //       destination: "/contact.html",
  //     },
  //     {
  //       source: "/type",
  //       destination: "/type.html",
  //     },
  //   ];
  // },
};

export default nextConfig;
