/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  Every image and media path on the site lives in this file.
 *
 *  To use real photography, replace a `ph(...)` call with `photo(...)`:
 *
 *    ph("silk-slip-dress", "bone", "front")
 *      →  photo("/products/silk-slip-dress/bone-1.jpg", "Silk Slip Dress in Bone, front", 1600, 2000)
 *
 *  Put the files in /public/products/... (or use a full https URL from an allowed host).
 *  Width and height must be the photo's real pixel size: the site never crops garments,
 *  so it uses them to keep the true aspect ratio.
 *
 *  Placeholders are tonal SVGs in /public/placeholders, generated from this file by
 *  `npm run placeholders`. They state what they stand for.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { ImageAsset } from "./types";

/* ── Brand and home ───────────────────────────────────────────────────────── */

export const brandMedia = {
  /** Black-on-transparent PNG of the fawn mark, used as a CSS mask (only its alpha matters). */
  fawn: "/brand/fawn.png",
  /** Open Graph / social share image (1200×630). Generated in Stage 5 if absent. */
  ogImage: "/brand/og.jpg",
} as const;

export const homeMedia = {
  /** Muted looping hero. Keep it small: 1080p, H.264, ideally under 6 MB. */
  video: "/media/hero.mp4",
  /** First frame of the video, shown immediately and with reduced motion. */
  poster: "/media/hero-poster.jpg",
} as const;

/* ── Placeholder system ───────────────────────────────────────────────────── */

/** Natural colorway tones. Used to tint placeholders and blur previews. */
export const colorwayTones: Record<string, string> = {
  bone: "#e9e1d4",
  oat: "#d6c7ae",
  sand: "#c9b597",
  moss: "#7b7d61",
  clay: "#a5806a",
  ink: "#3b3832",
};

/** Rough garment shape drawn in the placeholder, so layouts read like a lookbook. */
export type Silhouette = "dress" | "slip" | "top" | "knit" | "pants" | "detail" | "swatch";

export type PlaceholderSpec = ImageAsset & {
  placeholder: { tone: string; label: string; silhouette: Silhouette };
};

const productNames: Record<string, { name: string; silhouette: Silhouette }> = {
  cardigan: { name: "Cardigan", silhouette: "knit" },
  "silk-slip-dress": { name: "Silk Slip Dress", silhouette: "slip" },
  pants: { name: "Pants", silhouette: "pants" },
  "sun-dress": { name: "Sun Dress", silhouette: "dress" },
  blouse: { name: "Blouse", silhouette: "top" },
  "wool-sweater": { name: "Wool Sweater", silhouette: "knit" },
};

const PORTRAIT = { width: 1600, height: 2000 }; // 4:5
const SWATCH = { width: 480, height: 600 }; // 4:5
const LANDSCAPE = { width: 2000, height: 1400 };

function title(id: string) {
  return id.charAt(0).toUpperCase() + id.slice(1);
}

/** A solid-tone blur preview. Real photos can pass their own via `photo(..., blur)`. */
export function toneBlur(hex: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="4" height="5"><rect width="4" height="5" fill="${hex}"/></svg>`;
  return `data:image/svg+xml;base64,${typeof btoa === "function" ? btoa(svg) : Buffer.from(svg).toString("base64")}`;
}

/** A real photograph. */
export function photo(src: string, alt: string, width: number, height: number, blurDataURL?: string): ImageAsset {
  return { src, alt, width, height, blurDataURL: blurDataURL ?? toneBlur(colorwayTones.bone) };
}

/* ── Sample photography (temporary) ──────────────────────────────────────────
 *  Real photos from another label, used only so the layouts can be judged with
 *  photography. NOT for a public deployment: set USE_SAMPLE_PHOTOS to false (or
 *  replace them with Le Faon's own) and delete /public/products/sample.
 *  Colorway swatches stay tonal so colorways remain distinguishable.
 * ───────────────────────────────────────────────────────────────────────── */

export const USE_SAMPLE_PHOTOS = true;

const SAMPLE_SIZE = { width: 1800, height: 2459 };

const sampleBlur: Record<string, string> = {
  "camisole-back": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QDURXhpZgAATU0AKgAAAAgABwESAAMAAAABAAEAAAEaAAUAAAABAAAAYgEbAAUAAAABAAAAagEoAAMAAAABAAIAAAFCAAQAAAABAAAHCAFDAAQAAAABAAAJm4dpAAQAAAABAAAAcgAAAAAAAABIAAAAAQAAAEgAAAABAAeQAAAHAAAABDAyMjGRAQAHAAAABAECAwCgAAAHAAAABDAxMDCgAQADAAAAAQABAACgAgAEAAAAAQAAAAugAwAEAAAAAQAAABCkBgADAAAAAQAAAAAAAAAA/8AAEQgAEAALAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMABgYGBgYGCgYGCg4KCgoOEg4ODg4SFxISEhISFxwXFxcXFxccHBwcHBwcHCIiIiIiIicnJycnLCwsLCwsLCwsLP/bAEMBBwcHCwoLEwoKEy4fGh8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLv/dAAQAAf/aAAwDAQACEQMRAD8A9w157lJ7WaAyBUf5gh+VgeMOO4rVRgVB9ajvEdkGFLfSmKHAAxUrdg3of//Z",
  "camisole-front": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QDURXhpZgAATU0AKgAAAAgABwESAAMAAAABAAEAAAEaAAUAAAABAAAAYgEbAAUAAAABAAAAagEoAAMAAAABAAIAAAFCAAQAAAABAAAHCAFDAAQAAAABAAAJm4dpAAQAAAABAAAAcgAAAAAAAABIAAAAAQAAAEgAAAABAAeQAAAHAAAABDAyMjGRAQAHAAAABAECAwCgAAAHAAAABDAxMDCgAQADAAAAAQABAACgAgAEAAAAAQAAAAugAwAEAAAAAQAAABCkBgADAAAAAQAAAAAAAAAA/8AAEQgAEAALAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMABgYGBgYGCgYGCg4KCgoOEg4ODg4SFxISEhISFxwXFxcXFxccHBwcHBwcHCIiIiIiIicnJycnLCwsLCwsLCwsLP/bAEMBBwcHCwoLEwoKEy4fGh8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLv/dAAQAAf/aAAwDAQACEQMRAD8A9Y8VTX0d9ay2lz5SW58ySPcQJATjBwOfpXSJIHQOD1Gapatp1pfNvmLBtuPlPYc+lSQELEq+grON+Z3Klaysf//Z",
  "cardigan-front": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QDURXhpZgAATU0AKgAAAAgABwESAAMAAAABAAEAAAEaAAUAAAABAAAAYgEbAAUAAAABAAAAagEoAAMAAAABAAIAAAFCAAQAAAABAAAHCAFDAAQAAAABAAAJm4dpAAQAAAABAAAAcgAAAAAAAABIAAAAAQAAAEgAAAABAAeQAAAHAAAABDAyMjGRAQAHAAAABAECAwCgAAAHAAAABDAxMDCgAQADAAAAAQABAACgAgAEAAAAAQAAAAugAwAEAAAAAQAAABCkBgADAAAAAQAAAAAAAAAA/8AAEQgAEAALAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMABgYGBgYGCgYGCg4KCgoOEg4ODg4SFxISEhISFxwXFxcXFxccHBwcHBwcHCIiIiIiIicnJycnLCwsLCwsLCwsLP/bAEMBBwcHCwoLEwoKEy4fGh8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLv/dAAQAAf/aAAwDAQACEQMRAD8A9R8V6w1pqNtHFN5fkne4yRuz244PHrxXUxypNGsqHIYAj8a8N+KOrHTfE9pCF/dTR75CByeSor1qxcrZxKeyis43UncuVnFWP//Z",
  "slip-detail": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QDURXhpZgAATU0AKgAAAAgABwESAAMAAAABAAEAAAEaAAUAAAABAAAAYgEbAAUAAAABAAAAagEoAAMAAAABAAIAAAFCAAQAAAABAAAHCAFDAAQAAAABAAAJm4dpAAQAAAABAAAAcgAAAAAAAABIAAAAAQAAAEgAAAABAAeQAAAHAAAABDAyMjGRAQAHAAAABAECAwCgAAAHAAAABDAxMDCgAQADAAAAAQABAACgAgAEAAAAAQAAAAugAwAEAAAAAQAAABCkBgADAAAAAQAAAAAAAAAA/8AAEQgAEAALAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMABgYGBgYGCgYGCg4KCgoOEg4ODg4SFxISEhISFxwXFxcXFxccHBwcHBwcHCIiIiIiIicnJycnLCwsLCwsLCwsLP/bAEMBBwcHCwoLEwoKEy4fGh8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLv/dAAQAAf/aAAwDAQACEQMRAD8Aj1ifRNc1a/vNXlIk8gRpGTgBAT0A681qaJr8thpNtZlmPlIFG4c47fpXnviE+Xrl1p2ELRBY8jkHb9fWvTNMvri7sIbiC1h2Moxufnjj+lcHI+7udiqJuzSsf//Z",
  "slip-front": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QDURXhpZgAATU0AKgAAAAgABwESAAMAAAABAAEAAAEaAAUAAAABAAAAYgEbAAUAAAABAAAAagEoAAMAAAABAAIAAAFCAAQAAAABAAAHCAFDAAQAAAABAAAJm4dpAAQAAAABAAAAcgAAAAAAAABIAAAAAQAAAEgAAAABAAeQAAAHAAAABDAyMjGRAQAHAAAABAECAwCgAAAHAAAABDAxMDCgAQADAAAAAQABAACgAgAEAAAAAQAAAAugAwAEAAAAAQAAABCkBgADAAAAAQAAAAAAAAAA/8AAEQgAEAALAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMABgYGBgYGCgYGCg4KCgoOEg4ODg4SFxISEhISFxwXFxcXFxccHBwcHBwcHCIiIiIiIicnJycnLCwsLCwsLCwsLP/bAEMBBwcHCwoLEwoKEy4fGh8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLv/dAAQAAf/aAAwDAQACEQMRAD8A9K8careafeWTWtyIFiJkdSxUSDONpABz9K7GKZZo1mQ5VwCPxrxn4l3XmeIrOyLceUrY9y9eu2wSO3jjjGFVQAKyje7uXK1lY//Z",
  "slip-side": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QDURXhpZgAATU0AKgAAAAgABwESAAMAAAABAAEAAAEaAAUAAAABAAAAYgEbAAUAAAABAAAAagEoAAMAAAABAAIAAAFCAAQAAAABAAAHCAFDAAQAAAABAAAJm4dpAAQAAAABAAAAcgAAAAAAAABIAAAAAQAAAEgAAAABAAeQAAAHAAAABDAyMjGRAQAHAAAABAECAwCgAAAHAAAABDAxMDCgAQADAAAAAQABAACgAgAEAAAAAQAAAAugAwAEAAAAAQAAABCkBgADAAAAAQAAAAAAAAAA/8AAEQgAEAALAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMABgYGBgYGCgYGCg4KCgoOEg4ODg4SFxISEhISFxwXFxcXFxccHBwcHBwcHCIiIiIiIicnJycnLCwsLCwsLCwsLP/bAEMBBwcHCwoLEwoKEy4fGh8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLv/dAAQAAf/aAAwDAQACEQMRAD8A9j8ZXs9ta2v2V3jle5jVSrbQeeQ3qCO1dHGdyBj3FcJ4y03VNRvtMayVmjgm3yYxge5yR/I12Cu4UDFStwP/2Q==",
};

type SampleShot = { file: string; view: string };

/** Which sample shots stand in for each piece (repeats are fine). */
const sampleShots: Record<string, SampleShot[]> = {
  "silk-slip-dress": [
    { file: "slip-front", view: "front" },
    { file: "slip-side", view: "side" },
    { file: "slip-detail", view: "detail" },
  ],
  "sun-dress": [
    { file: "slip-side", view: "side" },
    { file: "slip-front", view: "front" },
    { file: "slip-detail", view: "detail" },
  ],
  blouse: [
    { file: "camisole-front", view: "front" },
    { file: "camisole-back", view: "back" },
  ],
  pants: [
    { file: "camisole-back", view: "back" },
    { file: "camisole-front", view: "front" },
  ],
  cardigan: [
    { file: "cardigan-front", view: "front" },
    { file: "slip-detail", view: "detail" },
  ],
  "wool-sweater": [
    { file: "cardigan-front", view: "front" },
    { file: "camisole-front", view: "front" },
  ],
};

function sample(file: string, alt: string): ImageAsset {
  return photo(`/products/sample/${file}.jpg`, alt, SAMPLE_SIZE.width, SAMPLE_SIZE.height, sampleBlur[file]);
}

function sampleGallery(slug: string, colorway: string): ImageAsset[] | null {
  const shots = USE_SAMPLE_PHOTOS ? sampleShots[slug] : undefined;
  if (!shots) return null;
  const { name } = productNames[slug];
  return shots.map((s) => sample(s.file, `${name} in ${title(colorway)}, ${s.view}`));
}

function sampleEditorial(slug: string, n: number, subject: string): ImageAsset | null {
  const shots = USE_SAMPLE_PHOTOS ? sampleShots[slug] : undefined;
  if (!shots) return null;
  // Editorial images may be cropped: prefer the close-up, then the last view.
  const shot = n === 1 ? (shots.find((s) => s.view === "detail") ?? shots[shots.length - 1]) : shots[0];
  return sample(shot.file, `${productNames[slug].name}: ${subject}`);
}

/** Product placeholder: a portrait view of one colorway, e.g. ph("pants", "clay", "back"). */
function ph(slug: string, colorway: string, view: "front" | "side" | "back" | "detail"): PlaceholderSpec {
  const { name, silhouette } = productNames[slug];
  const tone = colorwayTones[colorway];
  return {
    src: `/placeholders/${slug}/${colorway}-${view}.svg`,
    alt: `${name} in ${title(colorway)}, ${view}`,
    ...PORTRAIT,
    blurDataURL: toneBlur(tone),
    placeholder: {
      tone,
      label: `${name} — ${title(colorway)} — ${view}`,
      silhouette: view === "detail" ? "detail" : silhouette,
    },
  };
}

/** Colorway swatch placeholder: a small close-up of the cloth. */
function sw(slug: string, colorway: string): PlaceholderSpec {
  const { name } = productNames[slug];
  const tone = colorwayTones[colorway];
  return {
    src: `/placeholders/${slug}/${colorway}-swatch.svg`,
    alt: `${title(colorway)}`,
    ...SWATCH,
    blurDataURL: toneBlur(tone),
    placeholder: { tone, label: `${name} — ${title(colorway)}`, silhouette: "swatch" },
  };
}

/** Editorial detail image below the fold. These may be cropped, so any ratio works. */
function ed(slug: string, n: number, colorway: string, ratio: "portrait" | "landscape", subject: string): ImageAsset {
  const real = sampleEditorial(slug, n, subject);
  if (real) return real;
  const { name } = productNames[slug];
  const tone = colorwayTones[colorway];
  const spec: PlaceholderSpec = {
    src: `/placeholders/${slug}/editorial-${n}.svg`,
    alt: `${name}: ${subject}`,
    ...(ratio === "portrait" ? PORTRAIT : LANDSCAPE),
    blurDataURL: toneBlur(tone),
    placeholder: { tone, label: `${name} — editorial — ${subject}`, silhouette: "detail" },
  };
  return spec;
}

/** Full gallery for one colorway. */
function gallery(slug: string, colorway: string): { swatch: ImageAsset; images: ImageAsset[] } {
  return {
    swatch: sw(slug, colorway),
    images: sampleGallery(slug, colorway) ?? [
      ph(slug, colorway, "front"),
      ph(slug, colorway, "side"),
      ph(slug, colorway, "back"),
      ph(slug, colorway, "detail"),
    ],
  };
}

/* ── Product photography ──────────────────────────────────────────────────── */

type ProductMedia = {
  colorways: Record<string, { swatch: ImageAsset; images: ImageAsset[] }>;
  editorial: ImageAsset[];
};

export const productMedia: Record<string, ProductMedia> = {
  cardigan: {
    colorways: {
      bone: gallery("cardigan", "bone"),
      oat: gallery("cardigan", "oat"),
      moss: gallery("cardigan", "moss"),
    },
    editorial: [
      ed("cardigan", 1, "bone", "portrait", "shell buttons, close"),
      ed("cardigan", 2, "bone", "landscape", "worn open, late light"),
    ],
  },
  "silk-slip-dress": {
    colorways: {
      bone: gallery("silk-slip-dress", "bone"),
      sand: gallery("silk-slip-dress", "sand"),
      ink: gallery("silk-slip-dress", "ink"),
    },
    editorial: [
      ed("silk-slip-dress", 1, "bone", "portrait", "bias-cut hem in motion"),
      ed("silk-slip-dress", 2, "sand", "landscape", "silk strap at the shoulder"),
    ],
  },
  pants: {
    colorways: {
      sand: gallery("pants", "sand"),
      clay: gallery("pants", "clay"),
      ink: gallery("pants", "ink"),
    },
    editorial: [
      ed("pants", 1, "sand", "portrait", "hemp weave and brass button"),
      ed("pants", 2, "clay", "landscape", "walking, the leg in movement"),
    ],
  },
  "sun-dress": {
    colorways: {
      bone: gallery("sun-dress", "bone"),
      clay: gallery("sun-dress", "clay"),
    },
    editorial: [
      ed("sun-dress", 1, "bone", "portrait", "gathered bodice, close"),
      ed("sun-dress", 2, "clay", "landscape", "in a field at evening"),
    ],
  },
  blouse: {
    colorways: {
      bone: gallery("blouse", "bone"),
      oat: gallery("blouse", "oat"),
      moss: gallery("blouse", "moss"),
    },
    editorial: [
      ed("blouse", 1, "bone", "portrait", "the soft collar"),
      ed("blouse", 2, "oat", "landscape", "a sleeve in window light"),
    ],
  },
  "wool-sweater": {
    colorways: {
      oat: gallery("wool-sweater", "oat"),
      moss: gallery("wool-sweater", "moss"),
      clay: gallery("wool-sweater", "clay"),
      ink: gallery("wool-sweater", "ink"),
    },
    editorial: [
      ed("wool-sweater", 1, "oat", "portrait", "the rib at the cuff"),
      ed("wool-sweater", 2, "moss", "landscape", "folded on linen"),
    ],
  },
};

/* ── Page imagery ─────────────────────────────────────────────────────────── */

function pagePh(file: string, tone: string, label: string, ratio: "portrait" | "landscape" | "wide"): PlaceholderSpec {
  const size = ratio === "portrait" ? PORTRAIT : ratio === "landscape" ? LANDSCAPE : { width: 2400, height: 1000 };
  return {
    src: `/placeholders/pages/${file}.svg`,
    alt: label,
    ...size,
    blurDataURL: toneBlur(tone),
    placeholder: { tone, label, silhouette: "detail" },
  };
}

export const pageMedia = {
  /** Philosophy: the photograph that holds the left half of the page. */
  philosophyImage: USE_SAMPLE_PHOTOS
    ? sample("cardigan-front", "Wool, worn open")
    : pagePh("philosophy", colorwayTones.oat, "Philosophy — portrait — linen in afternoon light", "portrait"),
  /** How to Order: the photograph beside the steps. */
  howToOrderImage: USE_SAMPLE_PHOTOS
    ? sample("camisole-back", "A garment, from behind")
    : pagePh("how-to-order", colorwayTones.bone, "How to Order — portrait — soft light", "portrait"),
  /** Contact page image. */
  contact: USE_SAMPLE_PHOTOS
    ? sample("slip-side", "Silk, in profile")
    : pagePh("contact", colorwayTones.sand, "Contact — portrait — quiet interior", "portrait"),
  /** Still shown on home if the hero video or poster is missing. */
  homeFallback: pagePh("home-fallback", colorwayTones.moss, "Home — still — golden hour", "landscape"),
} satisfies Record<string, ImageAsset>;

/* ── For the placeholder generator ───────────────────────────────────────── */

/** Every placeholder image referenced above. Used by scripts/generate-placeholders.ts. */
export function allPlaceholderSpecs(): PlaceholderSpec[] {
  const all: ImageAsset[] = [
    ...Object.values(pageMedia),
    ...Object.values(productMedia).flatMap((p) => [
      ...p.editorial,
      ...Object.values(p.colorways).flatMap((c) => [c.swatch, ...c.images]),
    ]),
  ];
  return all.filter((a): a is PlaceholderSpec => "placeholder" in a);
}
