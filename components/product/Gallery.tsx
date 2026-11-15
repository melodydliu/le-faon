"use client";

import { AnimatePresence, motion } from "motion/react";
import { ViewTransition, useState } from "react";
import { Photo } from "@/components/ui/Photo";
import { crossfadeLayer, preloadPhoto, useSettledSwap } from "@/lib/photo-swap";
import type { ImageAsset } from "@/lib/types";

/** The gallery photos' `sizes`. Shared with preloading so the browser picks the same file it will render. */
const GALLERY_SIZES = "(min-width: 1024px) 58vw, 100vw";

/** Starts loading a gallery photo at the size the gallery will request. */
export function preloadGalleryPhoto(image: ImageAsset) {
  return preloadPhoto(image, GALLERY_SIZES);
}

type Props = {
  images: ImageAsset[];
  /** Changes when the colorway changes; the gallery crossfades to the new set. */
  colorKey: string;
  /** Shared with the catalog card, so the photo glides in from the grid. */
  morphName?: string;
  /** The colorway whose first photo carries `morphName`. */
  morphKey?: string;
  onOpen: (index: number) => void;
};

/**
 * Mobile: a full-width swipeable row with dots. Desktop: a vertical stack beside the details.
 * Same elements in both, so nothing loads twice. Photos keep their true aspect ratio.
 *
 * On a colorway change the current photos stay put until the new first photo has decoded,
 * then the new set fades in over them, so the change never flashes a blur or the background.
 */
export function Gallery({ images, colorKey, morphName, morphKey, onOpen }: Props) {
  const shown = useSettledSwap(colorKey, images, images[0], GALLERY_SIZES);

  return (
    <div className="grid">
      <AnimatePresence initial={false}>
        <motion.div
          key={shown.key}
          className="[grid-area:1/1]"
          {...crossfadeLayer}
        >
          <Track
            images={shown.value}
            morphName={shown.key === morphKey ? morphName : undefined}
            onOpen={onOpen}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Track({
  images,
  morphName,
  onOpen,
}: {
  images: ImageAsset[];
  morphName?: string;
  onOpen: (i: number) => void;
}) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <ul
        aria-label="Photographs"
        onScroll={(e) => {
          const el = e.currentTarget;
          setActive(Math.round(el.scrollLeft / el.clientWidth));
        }}
        className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] lg:flex-col lg:gap-2 lg:overflow-visible [&::-webkit-scrollbar]:hidden"
      >
        {images.map((image, i) => (
          <li key={image.src} className="w-full shrink-0 snap-center bg-surface">
            <button
              type="button"
              onClick={() => onOpen(i)}
              aria-label={`View ${image.alt} full screen`}
              className="block w-full cursor-zoom-in"
            >
              <ViewTransition name={i === 0 ? morphName : undefined} share="morph" default="none">
                <Photo image={image} lcp={i === 0} sizes={GALLERY_SIZES} />
              </ViewTransition>
            </button>
          </li>
        ))}
      </ul>

      {images.length > 1 && (
        <div className="mt-4 flex justify-center gap-2 lg:hidden" aria-hidden="true">
          {images.map((image, i) => (
            <span
              key={image.src}
              className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${i === active ? "bg-ink" : "bg-line-strong"}`}
            />
          ))}
        </div>
      )}
      <p className="sr-only" aria-live="polite">
        Photograph {active + 1} of {images.length}
      </p>
    </div>
  );
}
