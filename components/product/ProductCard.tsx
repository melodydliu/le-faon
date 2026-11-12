import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import type { Product } from "@/lib/types";

/**
 * A piece in a grid: portrait photo (never cropped), name and material.
 * On hover the photo softly crossfades to a second view; nothing moves.
 */
export function ProductCard({
  product,
  sizes,
  lcp = false,
  align = "start",
}: {
  product: Product;
  sizes: string;
  lcp?: boolean;
  /** Caption alignment under the photo. */
  align?: "start" | "center";
}) {
  const [first, second] = product.colorways[0].images;
  return (
    <Link href={`/catalog/${product.slug}`} className="group block">
      <div className="relative bg-surface">
        <Photo image={first} sizes={sizes} lcp={lcp} />
        {second && (
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-0 transition-opacity duration-700 ease-[var(--ease-out)] group-hover:opacity-100"
          >
            <Photo image={second} sizes={sizes} alt="" />
          </div>
        )}
      </div>
      <div className={`mt-4 flex flex-col gap-1 ${align === "center" ? "items-center text-center" : ""}`}>
        <h3 className="font-display text-[1.375rem] leading-tight font-light">{product.name}</h3>
        <p className="label text-secondary">{product.material}</p>
      </div>
    </Link>
  );
}
