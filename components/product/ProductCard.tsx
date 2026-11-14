"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, ViewTransition } from "react";
import { pieceTransitionName } from "@/components/layout/PageTransition";
import { Photo } from "@/components/ui/Photo";
import { getChosenColorway, setChosenColorway } from "@/lib/colorway-choice";
import type { Product } from "@/lib/types";

/**
 * A piece in a grid: portrait photo (never cropped), name, material and its colorways.
 * On hover the photo softly crossfades to a second view; nothing moves.
 * Choosing a swatch shows that colorway here, and the piece page opens on it.
 */
export function ProductCard({
  product,
  sizes,
  lcp = false,
  align = "start",
  morph = false,
}: {
  product: Product;
  sizes: string;
  lcp?: boolean;
  /** Caption alignment under the photo. */
  align?: "start" | "center";
  /** The photo glides into the piece page's gallery. Only for one grid per page, so names stay unique. */
  morph?: boolean;
}) {
  const [colorwayId, setColorwayId] = useState(() => getChosenColorway(product.slug, product.colorways));
  const colorway = product.colorways.find((c) => c.id === colorwayId) ?? product.colorways[0];
  const [first, second] = colorway.images;
  const centered = align === "center";

  function choose(id: string) {
    setColorwayId(id);
    setChosenColorway(product.slug, id);
  }

  return (
    <div>
      <Link href={`/catalog/${product.slug}`} className="group block">
        <ViewTransition name={morph ? pieceTransitionName(product.slug) : undefined} share="morph" default="none">
          <div className="relative bg-surface">
            <Photo key={first.src} image={first} sizes={sizes} lcp={lcp} />
            {second && (
              <div
                key={second.src}
                aria-hidden="true"
                className="absolute inset-0 opacity-0 transition-opacity duration-700 ease-[var(--ease-out)] group-hover:opacity-100"
              >
                <Photo image={second} sizes={sizes} alt="" />
              </div>
            )}
          </div>
        </ViewTransition>
        <div className={`mt-4 flex flex-col gap-1 ${centered ? "items-center text-center" : ""}`}>
          <h3 className="font-display text-[1.375rem] leading-tight font-light">{product.name}</h3>
          <p className="label text-secondary">{product.material}</p>
        </div>
      </Link>

      <div
        role="group"
        aria-label={`${product.name} colors`}
        className={`mt-1 flex flex-wrap ${centered ? "justify-center" : "-ml-2"}`}
      >
        {product.colorways.map((c) => {
          const selected = c.id === colorway.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => choose(c.id)}
              aria-pressed={selected}
              aria-label={c.name}
              title={c.name}
              className="group/swatch flex min-h-11 min-w-9 cursor-pointer items-center justify-center focus-visible:outline-none"
            >
              <span
                className={`block w-5 outline-1 outline-offset-2 transition-[outline-color] duration-300 group-focus-visible/swatch:outline-ink ${
                  selected ? "outline-accent" : "outline-transparent group-hover/swatch:outline-line-strong"
                }`}
                style={{ outlineStyle: "solid" }}
              >
                <Image
                  src={c.swatch.src}
                  alt=""
                  width={c.swatch.width}
                  height={c.swatch.height}
                  sizes="20px"
                  placeholder="blur"
                  blurDataURL={c.swatch.blurDataURL}
                  className="block h-auto w-full border border-line"
                />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
