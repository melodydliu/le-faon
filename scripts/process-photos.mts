/**
 * Reads every photo in /public/products/<Product>/ and /public/media/general/, shrinks any that are
 * larger than the site ever needs (in place), and writes lib/photo-manifest.ts (true pixel size + a tiny blurred preview for each), and makes a flat color chip
 * for each colorway (sampled from a crop of its cloth) in /public/products/swatches/.
 *
 * Run after adding, removing or replacing photos:  npm run photos
 *
 * Sharp ships with Next.js, so nothing extra needs installing.
 */
import { mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import sharp from "sharp";

const root = join(import.meta.dirname, "..");
const productsDir = join(root, "public", "products");
const swatchDir = join(productsDir, "swatches");
const generalDir = join(root, "public", "media", "general");

/**
 * One swatch per colorway: where to sample its cloth color. Pick a plain area of fabric.
 * cx/cy are the crop's center and w its width, all as fractions of the photo.
 * The crop is always 4:5.
 */
const swatches: Record<string, { from: string; cx: number; cy: number; w: number }> = {
  "blouse-ivory": { from: "Blouse/DSCF1049-2.jpg", cx: 0.45, cy: 0.42, w: 0.18 },
  "blouse-sage": { from: "Blouse/DSCF0067.jpg", cx: 0.55, cy: 0.3, w: 0.2 },
  "blouse-champagne": { from: "Blouse/Blouse 8, Pant 8.jpg", cx: 0.52, cy: 0.37, w: 0.1 },
  "cardigan-oatmeal": { from: "Cardigan/DSCF0067-2.jpg", cx: 0.62, cy: 0.62, w: 0.06 },
  "cardigan-powder-blue": { from: "Cardigan/DSCF0959-2.jpg", cx: 0.2, cy: 0.85, w: 0.2 },
  "cardigan-butter": { from: "Cardigan/DSCF1375.jpg", cx: 0.55, cy: 0.38, w: 0.05 },
  "duster-oatmeal": { from: "Duster/DSCF0380-2.jpg", cx: 0.7, cy: 0.55, w: 0.2 },
  "duster-mocha": { from: "Duster/DSCF1726.jpg", cx: 0.75, cy: 0.8, w: 0.15 },
  "midi-ivory": { from: "Midi/DSCF0267-2.jpg", cx: 0.48, cy: 0.5, w: 0.06 },
  "midi-champagne": { from: "Midi/DSCF1498.jpg", cx: 0.45, cy: 0.75, w: 0.15 },
  "midi-chocolate": { from: "Midi/DSCF2034.jpg", cx: 0.55, cy: 0.9, w: 0.16 },
  "pants-olive": { from: "Pants/Pant 7, Blouse.jpg", cx: 0.41, cy: 0.6, w: 0.08 },
  "sundress-black": { from: "Sundress/DSCF0758-2.jpg", cx: 0.38, cy: 0.78, w: 0.15 },
  "sundress-ivory": { from: "Sundress/DSCF1247-2.jpg", cx: 0.35, cy: 0.62, w: 0.15 },
};

const SWATCH_W = 480;
const SWATCH_H = 600;

async function orientedSize(file: string) {
  const meta = await sharp(file).metadata();
  const swap = (meta.orientation ?? 1) >= 5;
  return { width: swap ? meta.height! : meta.width!, height: swap ? meta.width! : meta.height! };
}

async function blur(file: string) {
  const buf = await sharp(file).rotate().resize(10).jpeg({ quality: 50 }).toBuffer();
  return `data:image/jpeg;base64,${buf.toString("base64")}`;
}

/**
 * The cloth's color in a crop: the per-channel median, then the average of the half of
 * pixels closest to it. Highlights, shadows and stray bits of skin or background drop out.
 */
async function clothColor(region: sharp.Sharp) {
  const { data, info } = await region.resize(48, 60, { fit: "fill" }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const px: [number, number, number][] = [];
  for (let i = 0; i < data.length; i += info.channels) px.push([data[i], data[i + 1], data[i + 2]]);
  const median = [0, 1, 2].map((c) => px.map((p) => p[c]).sort((a, b) => a - b)[px.length >> 1]);
  const dist = (p: number[]) => p.reduce((sum, v, c) => sum + (v - median[c]) ** 2, 0);
  const near = [...px].sort((a, b) => dist(a) - dist(b)).slice(0, px.length >> 1);
  const [r, g, b] = [0, 1, 2].map((c) => Math.round(near.reduce((sum, p) => sum + p[c], 0) / near.length));
  return { r, g, b };
}

// 0. Shrink: straight-off-camera files (~25 MP, ~2 MB) make every first, uncached request slow,
//    because Next's image optimizer has to decode the whole file to make each size. 3200px on the
//    long edge still covers the lightbox at 2x zoom. Photos already within bounds are left alone.
const MAX_EDGE = 3200;
const JPEG_QUALITY = 84;

function walkPhotos(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return name === "swatches" ? [] : walkPhotos(full);
    return /\.jpe?g$/i.test(name) ? [full] : [];
  });
}

let shrunk = 0;
let saved = 0;
for (const file of [...walkPhotos(productsDir), ...walkPhotos(generalDir)]) {
  const { width, height } = await orientedSize(file);
  if (Math.max(width, height) <= MAX_EDGE) continue;
  const before = statSync(file).size;
  const buf = await sharp(file)
    .rotate()
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside" })
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    .toBuffer();
  writeFileSync(file, buf);
  shrunk++;
  saved += before - buf.length;
}
if (shrunk) console.log(`Shrank ${shrunk} photos, saved ${(saved / 1e6).toFixed(0)} MB`);

// 1. Swatches: a flat chip of each colorway's cloth color.
//    (Cleared first so renamed or removed colorways leave nothing behind.)
rmSync(swatchDir, { recursive: true, force: true });
mkdirSync(swatchDir, { recursive: true });
for (const [name, s] of Object.entries(swatches)) {
  const src = join(productsDir, s.from);
  const { width, height } = await orientedSize(src);
  const w = Math.round(width * s.w);
  const h = Math.round(w * (SWATCH_H / SWATCH_W));
  const left = Math.max(0, Math.min(width - w, Math.round(width * s.cx - w / 2)));
  const top = Math.max(0, Math.min(height - h, Math.round(height * s.cy - h / 2)));
  const color = await clothColor(sharp(src).rotate().extract({ left, top, width: w, height: h }));
  await sharp({ create: { width: SWATCH_W, height: SWATCH_H, channels: 3, background: color } })
    .png()
    .toFile(join(swatchDir, `${name}.png`));
  console.log(`${name.padEnd(22)} #${[color.r, color.g, color.b].map((v) => v.toString(16).padStart(2, "0")).join("")}`);
}

// 2. Manifest
function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return name === "sample" ? [] : walk(full);
    return /\.(jpe?g|png|webp)$/i.test(name) ? [full] : [];
  });
}

async function manifestEntries(dir: string) {
  const entries: string[] = [];
  for (const file of walk(dir).sort()) {
    const key = relative(dir, file).split("\\").join("/");
    const { width, height } = await orientedSize(file);
    entries.push(`  ${JSON.stringify(key)}: { width: ${width}, height: ${height}, blur: ${JSON.stringify(await blur(file))} },`);
  }
  return entries;
}

const entries = await manifestEntries(productsDir);
const generalEntries = await manifestEntries(generalDir);

writeFileSync(
  join(root, "lib", "photo-manifest.ts"),
  `/**
 * Generated by scripts/process-photos.mts (npm run photos). Do not edit by hand.
 */

type PhotoMeta = { width: number; height: number; blur: string };

/** Keys are paths under /public/products. */
export const photoManifest: Record<string, PhotoMeta> = {
${entries.join("\n")}
};

/** Keys are paths under /public/media/general. */
export const generalPhotoManifest: Record<string, PhotoMeta> = {
${generalEntries.join("\n")}
};
`,
);
console.log(`Wrote ${Object.keys(swatches).length} swatches, ${entries.length} product and ${generalEntries.length} general manifest entries`);
