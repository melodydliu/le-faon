import type { Metadata } from "next";
import { PhilosophySplit } from "@/components/philosophy/PhilosophySplit";
import { getPhilosophy } from "@/lib/data/content";
import { pageMedia } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Philosophy",
  description:
    "Timeless garments in natural, earthen materials, made to order from mill to market. A capsule approach that honors what is essential.",
  path: "/philosophy",
});

export default async function PhilosophyPage() {
  const content = await getPhilosophy();
  return <PhilosophySplit content={content} image={pageMedia.philosophyImage} />;
}
