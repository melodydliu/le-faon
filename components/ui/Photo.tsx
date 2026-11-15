"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import type { ImageAsset } from "@/lib/types";

type PhotoProps = {
  image: ImageAsset;
  /** Responsive `sizes` hint, e.g. "(min-width: 1024px) 50vw, 100vw". */
  sizes: string;
  /** The page's LCP image: preloaded with high priority. Use once per page. */
  lcp?: boolean;
  /**
   * "contain" keeps the photo's true aspect ratio (garments are never cropped).
   * "cover" fills its box and may crop; only for editorial and the home still.
   */
  fit?: "contain" | "cover";
  className?: string;
  alt?: string;
};

/**
 * All photography goes through here: blur preview, lazy loading, correct sizing.
 *
 * The photo stays hidden until it has fully loaded, then dissolves in over a soft blur.
 * Browsers otherwise paint a photo in blocky strips as it downloads, which looks jarring.
 * A photo that is already cached shows at once, with no fade.
 */
export function Photo({ image, sizes, lcp = false, fit = "contain", className = "", alt }: PhotoProps) {
  // "instant": already loaded when it mounted (cached), so skip the fade.
  const [state, setState] = useState<"loading" | "fading" | "instant">("loading");

  const ref = useCallback((img: HTMLImageElement | null) => {
    if (img?.complete && img.naturalWidth > 0) setState("instant");
  }, []);

  const shown = state !== "loading";
  const imgClass = [
    fit === "cover" ? "object-cover" : "h-auto w-full",
    fit === "cover" ? "" : "relative",
    "transition-opacity duration-[var(--dur-image)] ease-[var(--ease-out)] motion-reduce:transition-none",
    shown ? "opacity-100" : "opacity-0",
    state === "instant" ? "transition-none" : "",
    className,
  ].join(" ");

  const common = {
    ref,
    src: image.src,
    sizes,
    preload: lcp,
    fetchPriority: lcp ? ("high" as const) : undefined,
    onLoad: () => setState((s) => (s === "loading" ? "fading" : s)),
    className: imgClass,
  };

  // The blur sits behind the photo as its own layer, so it stays visible while the photo fades in.
  // Scaled up slightly so the blurred edges don't show a pale rim.
  const blur = (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 scale-110 bg-cover bg-center blur-2xl"
        style={{ backgroundImage: `url("${image.blurDataURL}")` }}
      />
    </div>
  );

  if (fit === "cover") {
    return (
      <>
        {blur}
        <Image {...common} alt={alt ?? image.alt} fill />
      </>
    );
  }

  return (
    <div className="relative">
      {blur}
      <Image {...common} alt={alt ?? image.alt} width={image.width} height={image.height} />
    </div>
  );
}
