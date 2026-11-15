import Link from "next/link";
import { ViewTransition, type ReactNode } from "react";
import { pieceTransitionName } from "@/components/layout/PageTransition";
import { Photo } from "@/components/ui/Photo";
import type { Product } from "@/lib/types";

/**
 * A photo cell that fills its row's full height: at least the photo's own 2:3, and
 * cropped a little at the sides when the panel's text runs taller (as it does on phones).
 */
function Frame({ children }: { children: ReactNode }) {
  return (
    <div className="relative bg-surface">
      <div aria-hidden="true" className="aspect-[2/3]" />
      {children}
    </div>
  );
}

/**
 * The fragrance closes the catalog as a triptych that keeps the grid's three tiles:
 * a portrait, a text panel where the middle photo would be, and the still life.
 * On phones the portrait drops out, leaving the panel beside the bottle.
 */
export function FragranceTriptych({ product, sizes }: { product: Product; sizes: string }) {
  const [still, portrait] = product.colorways[0].images;
  return (
    <Link href={`/catalog/${product.slug}`} className="group grid grid-cols-2 gap-x-px lg:grid-cols-3">
      <div className="hidden lg:block">
        <Frame>{portrait && <Photo image={portrait} sizes={sizes} fit="cover" />}</Frame>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 bg-surface px-6 py-10 text-center">
        <p className="label text-secondary">Fragrance</p>
        <h3 className="display-lg">{product.name}</h3>
        <div aria-hidden="true" className="h-px w-12 bg-line-strong" />
        <p className="max-w-[28ch] text-balance text-secondary">{product.description[0]}</p>
        <p className="label mt-2 text-ink underline-offset-4 group-hover:underline">{product.material}</p>
      </div>
      <ViewTransition name={pieceTransitionName(product.slug)} share="morph" default="none">
        <Frame>
          <Photo image={still} sizes={sizes} fit="cover" />
        </Frame>
      </ViewTransition>
    </Link>
  );
}
