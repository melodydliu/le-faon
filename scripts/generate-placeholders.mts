/**
 * Writes tonal SVG placeholders for every `ph(...)`, `sw(...)`, `ed(...)` and page image
 * declared in lib/images.ts. Run: npm run placeholders
 *
 * Delete /public/placeholders once real photography is in place.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { allPlaceholderSpecs, type Silhouette } from "../lib/images.ts";

const root = join(import.meta.dirname, "..", "public");

function hexToRgb(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function mix(hex: string, target: number, amount: number) {
  const [r, g, b] = hexToRgb(hex).map((c) => Math.round(c + (target - c) * amount));
  return `rgb(${r} ${g} ${b})`;
}
function isDark(hex: string) {
  const [r, g, b] = hexToRgb(hex);
  return 0.299 * r + 0.587 * g + 0.114 * b < 140;
}

/** Garment outlines drawn on a 1600×2000 canvas, then scaled to fit. */
const shapes: Record<Silhouette, string> = {
  slip: "M690 360 L720 560 L620 560 C600 900 560 1300 500 1760 L1100 1760 C1040 1300 1000 900 980 560 L880 560 L910 360 L895 360 L860 560 L740 560 L705 360 Z",
  dress: "M610 470 L990 470 L1010 880 C1100 1150 1170 1450 1200 1760 L400 1760 C430 1450 500 1150 590 880 Z",
  top: "M640 470 L720 440 C760 500 840 500 880 440 L960 470 L1220 560 L1260 1180 L1140 1190 L1080 720 L1060 1360 L540 1360 L520 720 L460 1190 L340 1180 L380 560 Z",
  knit: "M620 460 L700 430 C750 500 850 500 900 430 L980 460 L1230 570 L1290 1300 L1160 1310 L1090 780 L1100 1400 L500 1400 L510 780 L440 1310 L310 1300 L370 570 Z",
  pants: "M580 400 L1020 400 L1060 900 L1090 1780 L840 1780 L800 980 L760 1780 L510 1780 L540 900 Z",
  detail: "M0 1300 C300 1180 600 1420 900 1280 C1200 1140 1400 1260 1600 1180 L1600 2000 L0 2000 Z",
  swatch: "",
};

function svg(spec: ReturnType<typeof allPlaceholderSpecs>[number]) {
  const { width: w, height: h } = spec;
  const { tone, label, silhouette } = spec.placeholder;
  const light = mix(tone, 255, 0.28);
  const deep = mix(tone, 20, 0.22);
  const ink = isDark(tone) ? "rgb(246 243 238 / 0.82)" : "rgb(42 37 20 / 0.62)";
  const shapeFill = isDark(tone) ? mix(tone, 255, 0.12) : mix(tone, 40, 0.1);
  const scale = Math.min(w / 1600, h / 2000);
  const ox = (w - 1600 * scale) / 2;
  const oy = (h - 2000 * scale) / 2;
  const isSwatch = silhouette === "swatch";

  const weave = isSwatch
    ? Array.from({ length: Math.ceil(h / 6) }, (_, i) =>
        `<line x1="0" y1="${i * 6}" x2="${w}" y2="${i * 6 + 3}" stroke="${deep}" stroke-opacity="0.12" stroke-width="1"/>`,
      ).join("")
    : "";

  const shape = isSwatch
    ? ""
    : `<path d="${shapes[silhouette]}" transform="translate(${ox} ${oy}) scale(${scale})" fill="${shapeFill}" fill-opacity="${silhouette === "detail" ? 0.5 : 0.55}"/>`;

  const fontSize = isSwatch ? 0 : Math.round(Math.min(w, h) * 0.02);
  const text = isSwatch
    ? ""
    : `<text x="${w / 2}" y="${h - fontSize * 3}" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="${fontSize}" letter-spacing="${fontSize * 0.18}" fill="${ink}">${label
        .toUpperCase()
        .replace(/&/g, "&amp;")}</text>
  <text x="${w / 2}" y="${h - fontSize * 5}" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="${fontSize * 1.1}" fill="${ink}">Placeholder</text>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${light}"/>
      <stop offset="1" stop-color="${deep}"/>
    </linearGradient>
    <radialGradient id="sun" cx="0.78" cy="0.18" r="0.7">
      <stop offset="0" stop-color="rgb(255 236 200)" stop-opacity="0.45"/>
      <stop offset="1" stop-color="rgb(255 236 200)" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  ${weave}
  ${shape}
  <rect width="${w}" height="${h}" fill="url(#sun)"/>
  ${text}
</svg>
`;
}

const specs = allPlaceholderSpecs();
for (const spec of specs) {
  const file = join(root, spec.src);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, svg(spec));
}
console.log(`Wrote ${specs.length} placeholders to public/placeholders`);
