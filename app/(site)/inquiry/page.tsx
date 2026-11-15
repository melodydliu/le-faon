import type { Metadata } from "next";
import { InquiryView } from "@/components/inquiry/InquiryView";
import type { InquiryProduct } from "@/components/inquiry/types";
import { listProducts } from "@/lib/data/catalog";
import { pageMetadata } from "@/lib/seo";
import { PageTransition } from "@/components/layout/PageTransition";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Inquiry",
    description: "Your selected pieces, and a short form to send them to Le Faon.",
    path: "/inquiry",
  }),
  robots: { index: false, follow: true },
};

export default async function InquiryPage() {
  // Only what the page needs: names, sizes and a thumbnail per colorway.
  const products: InquiryProduct[] = (await listProducts()).map((p) => ({
    slug: p.slug,
    name: p.name,
    kind: p.kind,
    sizes: p.sizes,
    colorways: p.colorways.map((c) => ({ id: c.id, name: c.name, thumb: c.images[0] })),
  }));

  return (
    <PageTransition>
      <InquiryView products={products} />
    </PageTransition>
  );
}
