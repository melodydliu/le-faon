import Image from "next/image";
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

/** All photography goes through here: blur preview, lazy loading, correct sizing. */
export function Photo({ image, sizes, lcp = false, fit = "contain", className = "", alt }: PhotoProps) {
  if (fit === "cover") {
    return (
      <Image
        src={image.src}
        alt={alt ?? image.alt}
        fill
        sizes={sizes}
        preload={lcp}
        fetchPriority={lcp ? "high" : undefined}
        placeholder="blur"
        blurDataURL={image.blurDataURL}
        className={`object-cover ${className}`}
      />
    );
  }

  return (
    <Image
      src={image.src}
      alt={alt ?? image.alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      preload={lcp}
      fetchPriority={lcp ? "high" : undefined}
      placeholder="blur"
      blurDataURL={image.blurDataURL}
      className={`h-auto w-full ${className}`}
    />
  );
}
