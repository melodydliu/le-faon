import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
import { pageMetadata } from "@/lib/seo";
import { PageTransition } from "@/components/layout/PageTransition";

export const metadata: Metadata = pageMetadata({ path: "/" });

/** Home is one screen: the hero and its links. No footer, since the links already cover it. */
export default function HomePage() {
  return (
    <PageTransition exit="home-exit">
      <main id="main">
        <HomeHero />
      </main>
    </PageTransition>
  );
}
