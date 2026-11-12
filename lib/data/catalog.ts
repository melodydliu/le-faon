/**
 * Catalog data access. The only module that knows where product data comes from.
 * Today: local mock data. Later: a CMS, or Shopify as a catalog backend.
 * Replace the internals; keep these signatures and the UI won't change.
 */

import { cacheLife } from "next/cache";
import { products } from "@/lib/data/mock/products";
import { sizeGuide } from "@/lib/data/mock/size-guide";
import type { Product, SizeGuide } from "@/lib/types";

/** All pieces in the collection, in collection order. */
export async function listProducts(): Promise<Product[]> {
  "use cache";
  cacheLife("max");
  return [...products].sort((a, b) => a.order - b.order);
}

/** One piece by slug, or null if it doesn't exist. */
export async function getProduct(slug: string): Promise<Product | null> {
  "use cache";
  cacheLife("max");
  return products.find((p) => p.slug === slug) ?? null;
}

/** Every slug, for prerendering piece pages. */
export async function listProductSlugs(): Promise<string[]> {
  return (await listProducts()).map((p) => p.slug);
}

/** "Also in the collection": the next pieces after this one, wrapping around. */
export async function listRelatedProducts(slug: string, count = 3): Promise<Product[]> {
  const all = await listProducts();
  const index = all.findIndex((p) => p.slug === slug);
  if (index === -1) return all.slice(0, count);
  return Array.from({ length: Math.min(count, all.length - 1) }, (_, i) => all[(index + 1 + i) % all.length]);
}

export async function getSizeGuide(): Promise<SizeGuide> {
  return sizeGuide;
}
