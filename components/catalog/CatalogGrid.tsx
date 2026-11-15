import { FragranceTriptych } from "@/components/catalog/FragranceTriptych";
import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/lib/types";

const tileSizes = "(min-width: 1024px) 33vw, 50vw";

/**
 * The collection as a gallery wall: portrait photos meet edge to edge with hairline gaps,
 * names centered beneath. Two columns on phones, three on desktop. A fragrance closes the
 * wall as a full-width triptych, one row gap below the pieces and meeting the footer.
 */
export function CatalogGrid({ products }: { products: Product[] }) {
  const garments = products.filter((p) => p.kind === "garment");
  const fragrances = products.filter((p) => p.kind === "fragrance");

  return (
    <section aria-labelledby="pieces-title" className={fragrances.length > 0 ? "" : "pb-16 lg:pb-20"}>
      <h2 id="pieces-title" className="sr-only">
        The pieces
      </h2>
      <ul className="grid grid-cols-2 gap-x-px gap-y-12 lg:grid-cols-3 lg:gap-y-16">
        {garments.map((product, i) => (
          <li key={product.slug} className="reveal [&_h3]:px-5 [&_p]:px-5 lg:[&_h3]:px-6 lg:[&_p]:px-6">
            <ProductCard product={product} lcp={i === 0} sizes={tileSizes} align="center" morph />
          </li>
        ))}
        {fragrances.map((product) => (
          <li key={product.slug} className="reveal col-span-2 lg:col-span-3">
            <FragranceTriptych product={product} sizes={tileSizes} />
          </li>
        ))}
      </ul>
    </section>
  );
}
