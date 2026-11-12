"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ImageAsset } from "@/lib/types";

type Props = {
  images: ImageAsset[];
  /** Index to open at, or null when closed. */
  openAt: number | null;
  onClose: () => void;
};

/**
 * Full-screen view. Swipe between photos; pinch to zoom on phones (native zoom is left enabled).
 * On desktop, click a photo to zoom in where you clicked, and use the arrows or arrow keys.
 */
export function Lightbox({ images, openAt, onClose }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const [current, setCurrent] = useState(0);
  const [zoom, setZoom] = useState<{ index: number; x: number; y: number } | null>(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (openAt === null) {
      if (d.open) d.close();
      return;
    }
    if (!d.open) d.showModal();
    const t = track.current;
    if (t) t.scrollTo({ left: openAt * t.clientWidth, behavior: "instant" });
  }, [openAt]);

  const go = (delta: number) => {
    const t = track.current;
    if (!t) return;
    const next = Math.min(images.length - 1, Math.max(0, current + delta));
    t.scrollTo({ left: next * t.clientWidth, behavior: "smooth" });
  };

  return (
    <dialog
      ref={dialog}
      aria-label="Photographs, full screen"
      onClose={() => {
        setZoom(null);
        onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-bg p-0 text-ink backdrop:bg-bg"
    >
      <div className="relative flex h-full flex-col">
        <div className="px-gutter flex items-center justify-between pt-[env(safe-area-inset-top)]">
          <p className="label tabular-nums text-secondary" aria-live="polite">
            {current + 1} / {images.length}
          </p>
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            aria-label="Close"
            className="-mr-3 inline-flex min-h-12 min-w-12 items-center justify-center"
          >
            <X aria-hidden="true" size={22} strokeWidth={1} />
          </button>
        </div>

        <ul
          ref={track}
          onScroll={(e) => {
            const el = e.currentTarget;
            const i = Math.round(el.scrollLeft / el.clientWidth);
            if (i !== current) {
              setCurrent(i);
              setZoom(null);
            }
          }}
          className="flex min-h-0 flex-1 snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [touch-action:pan-x_pinch-zoom] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((image, i) => {
            const zoomed = zoom?.index === i;
            return (
              <li key={image.src} className="relative h-full w-full shrink-0 snap-center overflow-hidden">
                <button
                  type="button"
                  aria-label={zoomed ? "Zoom out" : "Zoom in"}
                  onClick={(e) => {
                    if (zoomed) return setZoom(null);
                    const r = e.currentTarget.getBoundingClientRect();
                    setZoom({ index: i, x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
                  }}
                  className={`relative block h-full w-full ${zoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="100vw"
                    quality={90}
                    placeholder="blur"
                    blurDataURL={image.blurDataURL}
                    className="object-contain transition-transform duration-700 ease-[var(--ease-out)]"
                    style={{
                      transform: zoomed ? "scale(2)" : "scale(1)",
                      transformOrigin: zoomed ? `${zoom.x}% ${zoom.y}%` : "center",
                    }}
                  />
                </button>
              </li>
            );
          })}
        </ul>

        {images.length > 1 && (
          <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-1/2 justify-between px-4 lg:flex">
            <button
              type="button"
              onClick={() => go(-1)}
              disabled={current === 0}
              aria-label="Previous photograph"
              className="pointer-events-auto inline-flex h-12 w-12 items-center justify-center text-ink transition-opacity duration-300 disabled:opacity-0"
            >
              <ChevronLeft aria-hidden="true" size={26} strokeWidth={1} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              disabled={current === images.length - 1}
              aria-label="Next photograph"
              className="pointer-events-auto inline-flex h-12 w-12 items-center justify-center text-ink transition-opacity duration-300 disabled:opacity-0"
            >
              <ChevronRight aria-hidden="true" size={26} strokeWidth={1} />
            </button>
          </div>
        )}
        <div className="h-[max(1.5rem,env(safe-area-inset-bottom))]" />
      </div>
    </dialog>
  );
}
