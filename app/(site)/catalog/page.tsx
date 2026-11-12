import type { Metadata } from "next";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { CatalogIntro } from "@/components/catalog/CatalogIntro";
import { EmptyState } from "@/components/ui/EmptyState";
import { listProducts } from "@/lib/data/catalog";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Catalog",
  description: "The Le Faon collection: made-to-order pieces in cotton, silk, hemp and wool.",
  path: "/catalog",
});

export default async function CatalogPage() {
  const products = await listProducts();

  if (products.length === 0) {
    return (
      <EmptyState title="The collection is being photographed">
        <p>New pieces will be here shortly.</p>
      </EmptyState>
    );
  }

  return (
    <>
      <CatalogIntro count={products.length} />
      <CatalogGrid products={products} />
    </>
  );
}
