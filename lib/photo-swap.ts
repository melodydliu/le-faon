"use client";

import { getImageProps } from "next/image";
import { useEffect, useState } from "react";
import type { ImageAsset } from "@/lib/types";

/** Longest we hold the current photo while the next one loads. */
const WAIT_MS = 700;

/**
 * Fetches and decodes a photo ahead of time at the size it will be rendered (same `sizes`,
 * so the browser picks the same file). Resolves when it can paint, or quietly on failure.
 */
export function preloadPhoto(image: ImageAsset, sizes: string): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  const { props } = getImageProps({ src: image.src, alt: "", width: image.width, height: image.height, sizes });
  const img = new window.Image();
  if (props.sizes) img.sizes = props.sizes;
  if (props.srcSet) img.srcset = props.srcSet;
  img.src = props.src;
  return img.decode().catch(() => {});
}

/**
 * Holds on to the currently shown value until the next value's photo has loaded (or a short
 * wait passes), so a crossfade never reveals a blur or an empty box.
 */
export function useSettledSwap<T>(key: string, value: T, photo: ImageAsset | undefined, sizes: string) {
  const [shown, setShown] = useState({ key, value });

  useEffect(() => {
    if (key === shown.key) return;
    let cancelled = false;
    const wait = new Promise((resolve) => setTimeout(resolve, WAIT_MS));
    const ready = photo ? preloadPhoto(photo, sizes) : Promise.resolve();
    Promise.race([ready, wait]).then(() => {
      if (!cancelled) setShown({ key, value });
    });
    return () => {
      cancelled = true;
    };
  }, [key, value, photo, sizes, shown.key]);

  return shown;
}

/**
 * Motion props for a stacked crossfade: the incoming layer fades in on top while the outgoing
 * one stays opaque underneath, then drops away once it is covered.
 */
export const crossfadeLayer = {
  initial: { opacity: 0, zIndex: 1 },
  animate: { opacity: 1, zIndex: 1 },
  // A delayed drop rather than "stay at 1": an exit to a value it already has finishes instantly.
  exit: { opacity: 0, zIndex: 0, transition: { opacity: { delay: 0.7, duration: 0.01 } } },
  transition: { duration: 0.7, ease: [0.33, 0, 0.2, 1] },
} as const;
