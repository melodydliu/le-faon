import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlsoInCollection } from "@/components/product/AlsoInCollection";
import { ProductView } from "@/components/product/ProductView";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { getProduct, getSizeGuide, listProductSlugs, listRelatedProducts } from "@/lib/data/catalog";
import { pageMetadata } from "@/lib/seo";
import { productJsonLd } from "@/lib/structured-data";
import { PageTransition } from "@/components/layout/PageTransition";

export async function generateStaticParams() {
  return (await listProductSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/catalog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "The Collection", robots: { index: false } };
  return pageMetadata({ title: product.name, description: product.description[0], path: `/catalog/${slug}` });
}

export default async function PiecePage({ params }: PageProps<"/catalog/[slug]">) {
  const { slug } = await params;
  const [product, sizeGuide, related] = await Promise.all([
    getProduct(slug),
    getSizeGuide(),
    listRelatedProducts(slug, 3),
  ]);
  if (!product) notFound();

  return (
    <PageTransition>
      <article>
        <JsonLd data={productJsonLd(product)} />
        <ProductView product={product} sizeGuide={sizeGuide}>
          <Accordion>
            <AccordionItem title="Description" defaultOpen>
              <div className="flex flex-col gap-3">
                {product.description.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {product.fit && <p className="text-ink">{product.fit}</p>}
              </div>
            </AccordionItem>
            <AccordionItem title={product.kind === "garment" ? "Materials" : "Notes"}>
              <ul className="flex flex-col gap-1.5">
                {product.materials.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </AccordionItem>
            <AccordionItem title="Care">
              <ul className="flex flex-col gap-1.5">
                {product.care.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </AccordionItem>
            <AccordionItem title="How ordering works">
              <p>
                Each piece begins with an inquiry and moves through a one-to-one process. Add this piece to your
                inquiry{product.kind === "garment" && " with your size and colorway"}, and we will reply personally with pricing and the next steps.
              </p>
              <Link href="/how-to-order" className="link-quiet mt-3 inline-flex min-h-11 items-center text-ink">
                How to Order
              </Link>
            </AccordionItem>
          </Accordion>
        </ProductView>

        <AlsoInCollection products={related} />
      </article>
    </PageTransition>
  );
}
