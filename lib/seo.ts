/**
 * Page metadata in one shape: title, description, canonical URL and social cards.
 * Share images come from the opengraph-image files (site-wide, and per piece).
 */
import type { Metadata } from "next";
import { site } from "@/lib/site";

type PageMeta = { title?: string; description?: string; path: string };

export function pageMetadata({ title, description = site.description, path }: PageMeta): Metadata {
  const fullTitle = title ? `${title} · ${site.name}` : `${site.name} · Made to order`;
  return {
    ...(title ? { title } : { title: { absolute: fullTitle } }),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_US",
      url: path,
      title: fullTitle,
      description,
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}

/** Absolute URL for structured data and share cards. */
export function absoluteUrl(path: string) {
  return new URL(path, site.url).toString();
}
