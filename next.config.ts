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
    // Source photos top out at 3200px (see scripts/process-photos.mts), so a 3840 variant is never sharper.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560],
    // Photos rarely change, so keep optimized copies for 31 days instead of re-making them every 4 hours.
    // Replacing a photo? Give the new file a new name, or it can serve the old version until this expires.
    minimumCacheTTL: 2678400,
  },
  async redirects() {
    return [
      // Keep links to the old French slug working.
      { source: "/philosophie", destination: "/philosophy", permanent: true },
    ];
  },
};

export default nextConfig;
