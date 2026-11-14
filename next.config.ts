import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    // 75 is the default; the home hero uses 80 and the full-screen lightbox 90.
    qualities: [75, 80, 90],
  },
  async redirects() {
    return [
      // Keep links to the old French slug working.
      { source: "/philosophie", destination: "/philosophy", permanent: true },
    ];
  },
};

export default nextConfig;
