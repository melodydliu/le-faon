"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Photo } from "@/components/ui/Photo";
import type { ImageAsset } from "@/lib/types";

type Props = {
  images: ImageAsset[];
  /** Changes when the colorway changes; the gallery crossfades to the new set. */
  colorKey: string;
  onOpen: (index: number) => void;
};

/**
 * Mobile: a full-width swipeable row with dots. Desktop: a vertical stack beside the details.
 * Same elements in both, so nothing loads twice. Photos keep their true aspect ratio.
 */
export function Gallery({ images, colorKey, onOpen }: Props) {
  return (
    <div className="grid">
      <AnimatePresence initial={false}>
        <motion.div
          key={colorKey}
          className="[grid-area:1/1]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Track images={images} onOpen={onOpen} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Track({ images, onOpen }: { images: ImageAsset[]; onOpen: (i: number) => void }) {
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
              <Photo
                image={image}
                lcp={i === 0}
                sizes="(min-width: 1024px) 58vw, 100vw"
              />
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
