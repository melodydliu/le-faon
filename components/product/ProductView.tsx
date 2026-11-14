"use client";

import { useCallback, useRef, useState, type ReactNode } from "react";
import { AddedSheet, type AddedNotice } from "@/components/product/AddedSheet";
import { ColorwaySwatches } from "@/components/product/ColorwaySwatches";
import { Gallery } from "@/components/product/Gallery";
import { Lightbox } from "@/components/product/Lightbox";
import { pieceTransitionName } from "@/components/layout/PageTransition";
import { SizeGuideDialog } from "@/components/product/SizeGuideDialog";
import { SizeSelector } from "@/components/product/SizeSelector";
import { getChosenColorway, setChosenColorway } from "@/lib/colorway-choice";
import { addToInquiry } from "@/lib/inquiry/store";
import type { Product, SizeGuide } from "@/lib/types";

type Props = {
  product: Product;
  sizeGuide: SizeGuide;
  /** Server-rendered details below the action: provenance and accordions. */
  children: ReactNode;
};

/** The interactive top of a piece page: gallery, colorway, size and "Add to inquiry". */
export function ProductView({ product, sizeGuide, children }: Props) {
  // Opens on the colorway chosen on the catalog card, if any; that photo is the one that morphs in.
  const [initialColorwayId] = useState(() => getChosenColorway(product.slug, product.colorways));
  const [colorwayId, setColorwayId] = useState(initialColorwayId);
  const [size, setSize] = useState<string | null>(null);
  const [sizeMissing, setSizeMissing] = useState(false);
  const [lightboxAt, setLightboxAt] = useState<number | null>(null);
  const [notice, setNotice] = useState<AddedNotice | null>(null);
  const sizeRow = useRef<HTMLFieldSetElement>(null);

  const colorway = product.colorways.find((c) => c.id === colorwayId) ?? product.colorways[0];
  const dismiss = useCallback(() => setNotice(null), []);

  function handleAdd() {
    if (!size) {
      setSizeMissing(true);
      const row = sizeRow.current;
      if (row) {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        row.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
        row.querySelector<HTMLInputElement>("input")?.focus({ preventScroll: true });
      }
      return;
    }
    const result = addToInquiry({ productSlug: product.slug, colorway: colorway.id, size });
    setNotice({
      key: Date.now(),
      status: result.status,
      name: product.name,
      detail: `${colorway.name} · US ${size}`,
      thumb: colorway.images[0],
    });
  }

  const sizeGuideLink = <SizeGuideDialog guide={sizeGuide} />;

  return (
    <>
      <div className="lg:px-gutter grid gap-8 lg:grid-cols-12 lg:gap-12 lg:pt-10">
        <div className="lg:col-span-7">
          <Gallery
            images={colorway.images}
            colorKey={colorway.id}
            morphName={colorway.id === initialColorwayId ? pieceTransitionName(product.slug) : undefined}
            onOpen={setLightboxAt}
          />
        </div>

        <div className="px-gutter lg:col-span-5 lg:px-0">
          <div className="flex flex-col gap-8 lg:sticky lg:top-[calc(var(--header-h)+40px)] lg:max-w-[460px]">
            <header className="flex flex-col gap-3">
              <p className="label text-secondary">Made to order</p>
              <h1 className="display-lg">{product.name}</h1>
              <p className="font-display text-[1.125rem] text-secondary italic">Pricing upon inquiry</p>
            </header>

            <ColorwaySwatches
              name={`${product.slug}-colorway`}
              colorways={product.colorways}
              value={colorway.id}
              onChange={(id) => {
                setColorwayId(id);
                setChosenColorway(product.slug, id);
              }}
            />

            <SizeSelector
              ref={sizeRow}
              name={`${product.slug}-size`}
              sizes={product.sizes}
              value={size}
              invalid={sizeMissing && !size}
              onChange={(s) => {
                setSize(s);
                setSizeMissing(false);
              }}
              aside={sizeGuideLink}
            />

            <button
              type="button"
              onClick={handleAdd}
              className="label hidden min-h-13 items-center justify-center bg-inverted px-6 text-on-inverted transition-opacity duration-300 hover:opacity-90 lg:inline-flex"
            >
              Add to inquiry
            </button>

            {children}
          </div>
        </div>
      </div>

      {/* Mobile: the action sits within thumb reach. */}
      <div
        data-sticky-bar
        className="px-gutter fixed inset-x-0 bottom-0 z-30 flex items-center gap-4 border-t border-line bg-bg/95 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-sm lg:hidden"
      >
        <p className="min-w-0 flex-1 truncate text-[13px] text-secondary">
          {colorway.name}
          <span aria-hidden="true"> · </span>
          {size ? `US ${size}` : "Choose a size"}
        </p>
        <button
          type="button"
          onClick={handleAdd}
          className="label inline-flex min-h-12 shrink-0 items-center justify-center bg-inverted px-7 text-on-inverted"
        >
          Add to inquiry
        </button>
      </div>

      <AddedSheet notice={notice} onDismiss={dismiss} />
      <Lightbox images={colorway.images} openAt={lightboxAt} onClose={() => setLightboxAt(null)} />
    </>
  );
}
