import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/lib/types";

/**
 * The collection as a gallery wall: portrait photos meet edge to edge with hairline gaps,
 * names centered beneath. Two columns on phones, three on desktop.
 */
export function CatalogGrid({ products }: { products: Product[] }) {
  return (
    <section aria-labelledby="pieces-title" className="pb-16 lg:pb-20">
      <h2 id="pieces-title" className="sr-only">
        The pieces
      </h2>
      <ul className="grid grid-cols-2 gap-x-px gap-y-12 lg:grid-cols-3 lg:gap-y-16">
        {products.map((product, i) => (
          <li key={product.slug} className="reveal [&_h3]:px-5 [&_p]:px-5 lg:[&_h3]:px-6 lg:[&_p]:px-6">
            <ProductCard product={product} lcp={i === 0} sizes="(min-width: 1024px) 33vw, 50vw" align="center" morph />
          </li>
        ))}
      </ul>
    </section>
  );
}
