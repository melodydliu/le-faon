import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ path: "/" });

/** Home is one screen: the hero and its links. No footer, since the links already cover it. */
export default function HomePage() {
  return (
    <main id="main">
      <HomeHero />
    </main>
  );
}
