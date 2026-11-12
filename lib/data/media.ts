/**
 * Which optional media files are actually present in /public.
 * Checked once at build time, so missing files fall back to a still image
 * instead of a broken player.
 */

import { existsSync } from "node:fs";
import { join } from "node:path";
import { cacheLife } from "next/cache";
import { homeMedia, pageMedia } from "@/lib/images";
import type { ImageAsset } from "@/lib/types";

function inPublic(src: string) {
  if (/^https?:\/\//.test(src)) return true;
  return existsSync(join(process.cwd(), "public", src));
}

export type HeroMedia = {
  /** Video URL, or null if the file is missing. */
  video: string | null;
  /** Poster frame URL, or null if missing. */
  poster: string | null;
  /** Still in the palette, shown when the poster is missing. */
  fallback: ImageAsset;
};

export async function getHeroMedia(): Promise<HeroMedia> {
  "use cache";
  cacheLife("max");
  return {
    video: inPublic(homeMedia.video) ? homeMedia.video : null,
    poster: inPublic(homeMedia.poster) ? homeMedia.poster : null,
    fallback: pageMedia.homeFallback,
  };
}
