import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/lib/types";

/** "Also in the collection": a quiet row of other pieces. Swipeable on phones. */
export function AlsoInCollection({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <section aria-labelledby="also-title" className="border-t border-line py-20 lg:py-28">
      <h2 id="also-title" className="reveal display-md px-gutter text-center">
        Also in the collection
      </h2>
      <ul className="reveal px-gutter mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-[var(--gutter)] [scrollbar-width:none] lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible [&::-webkit-scrollbar]:hidden">
        {products.map((p) => (
          <li key={p.slug} className="w-[68%] shrink-0 snap-start sm:w-[42%] lg:w-auto">
            <ProductCard product={p} sizes="(min-width: 1024px) 30vw, 70vw" />
          </li>
        ))}
      </ul>
    </section>
  );
}
