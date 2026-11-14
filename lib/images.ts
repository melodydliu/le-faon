/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  Every image and media path on the site lives in this file.
 *
 *  Product photos live in /public/products/<Product>/. Refer to them by that path,
 *  e.g. shot("Midi/DSCF0267-2.jpg", "Midi in Ivory, front"). Their true size and
 *  blur preview come from lib/photo-manifest.ts, so after adding or replacing photos
 *  run `npm run photos` to refresh it (and to re-crop the colorway swatches, which
 *  are defined in scripts/process-photos.mts).
 *
 *  Colorway names are provisional until the final names are chosen. The `id` is
 *  stored with each inquiry, so rename `name` freely but keep `id` stable once live.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { photoManifest } from "./photo-manifest";
import type { Colorway, ImageAsset } from "./types";

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

/* ── Helpers ──────────────────────────────────────────────────────────────── */

/** A photo from /public/products, by its path inside that folder. */
export function shot(path: string, alt: string): ImageAsset {
  const meta = photoManifest[path];
  if (!meta) throw new Error(`Photo not in manifest: ${path}. Run \`npm run photos\`.`);
  return { src: `/products/${path}`, alt, width: meta.width, height: meta.height, blurDataURL: meta.blur };
}

type View = [file: string, view: string];

/** One colorway: its swatch (swatches/<slug>-<id>.png, a flat color chip) and gallery. The first photo is the hero. */
function colorway(product: string, slug: string, id: string, name: string, folder: string, views: View[]): Colorway {
  return {
    id,
    name,
    swatch: shot(`swatches/${slug}-${id}.png`, name),
    images: views.map(([file, view]) => shot(`${folder}/${file}`, `${product} in ${name}, ${view}`)),
  };
}

/* ── Product photography ──────────────────────────────────────────────────── */

type ProductMedia = {
  colorways: Colorway[];
  /** Below-the-fold images. These may be cropped, so any ratio works. */
  editorial: ImageAsset[];
};

export const productMedia = {
  midi: {
    colorways: [
      colorway("Midi", "midi", "ivory", "Ivory", "Midi", [
        ["DSCF0267-2.jpg", "front"],
        ["DSCF0311-2.jpg", "back"],
        ["DSCF0387-2.jpg", "worn with the Duster"],
        ["DSCF0380-2.jpg", "detail"],
      ]),
      colorway("Midi", "midi", "chocolate", "Chocolate", "Midi", [
        ["DSCF2042.jpg", "front"],
        ["DSCF2034.jpg", "neckline"],
      ]),
      colorway("Midi", "midi", "champagne", "Champagne", "Midi", [
        ["DSCF1498.jpg", "front"],
        ["DSCF1726.jpg", "worn with the Duster"],
        ["DSCF1775.jpg", "back"],
      ]),
    ],
    editorial: [
      shot("Midi/DSCF0613.jpg", "Two Midis, Champagne and Ivory, in an orchard at evening"),
      shot("Midi/DSCF1317.jpg", "The Midi by a window, in black and white"),
    ],
  },
  duster: {
    colorways: [
      colorway("Duster", "duster", "mocha", "Mocha", "Duster", [
        ["DSCF1775.jpg", "back"],
        ["DSCF1726.jpg", "front, open"],
        ["DSCF0418.jpg", "outdoors"],
      ]),
      colorway("Duster", "duster", "oatmeal", "Oatmeal", "Duster", [
        ["DSCF0391-2.jpg", "front"],
        ["DSCF0414-2.jpg", "full length"],
        ["DSCF0386-2.jpg", "side"],
        ["DSCF0486-2.jpg", "tied at the waist"],
        ["DSCF0505-2.jpg", "back"],
      ]),
    ],
    editorial: [
      shot("Duster/DSCF0380-2.jpg", "The Duster falling open over silk"),
      shot("Duster/DSCF0418.jpg", "The Duster on a rope swing, late light"),
    ],
  },
  blouse: {
    colorways: [
      colorway("Blouse", "blouse", "champagne", "Champagne", "Blouse", [
        ["Blouse 10, Pant 10.jpg", "front"],
        ["Blouse 8, Pant 8.jpg", "full length"],
      ]),
      colorway("Blouse", "blouse", "sage", "Sage", "Blouse", [
        ["DSCF0126.jpg", "front"],
        ["DSCF0080.jpg", "front"],
        ["DSCF0067.jpg", "placket and cuff"],
        ["DSCF0049.jpg", "back"],
      ]),
      colorway("Blouse", "blouse", "ivory", "Ivory", "Blouse", [
        ["DSCF1984.jpg", "front"],
        ["DSCF1046-2.jpg", "front"],
        ["DSCF1055-2.jpg", "buttoning"],
        ["DSCF1131-2.jpg", "tucked in"],
        ["DSCF1833.jpg", "full length"],
      ]),
    ],
    editorial: [
      shot("Blouse/DSCF0067.jpg", "The Blouse's long cuff and hidden placket"),
      shot("Blouse/DSCF1861.jpg", "The Blouse, worn loose"),
    ],
  },
  pants: {
    colorways: [
      colorway("Pants", "pants", "olive", "Olive", "Pants", [
        ["Pant 7, Blouse.jpg", "front"],
        ["Pant 8, Blouse.jpg", "front"],
        ["Pant 6.jpg", "back"],
        ["Pant 3.jpg", "back"],
        ["Pant.jpg", "waistband and button"],
      ]),
    ],
    editorial: [
      shot("Pants/Pant.jpg", "The Pants on a washing line, the fawn button in the sun"),
      shot("Pants/Pant 5.jpg", "The Pants from behind, arms open"),
    ],
  },
  cardigan: {
    colorways: [
      colorway("Cardigan", "cardigan", "powder-blue", "Powder Blue", "Cardigan", [
        ["DSCF0911-2.jpg", "full length"],
        ["DSCF0959-2.jpg", "buttoning"],
        ["DSCF0963-2.jpg", "worn open"],
        ["DSCF1003-2.jpg", "sleeve"],
      ]),
      colorway("Cardigan", "cardigan", "oatmeal", "Oatmeal", "Cardigan", [
        ["DSCF0067-2.jpg", "front"],
        ["DSCF0041-2.jpg", "front"],
        ["DSCF2157.jpg", "worn with the Blouse and Pants"],
      ]),
      colorway("Cardigan", "cardigan", "butter", "Butter", "Cardigan", [
        ["DSCF1375.jpg", "full length"],
        ["DSCF1374.jpg", "buttoning"],
      ]),
    ],
    editorial: [
      shot("Cardigan/DSCF0842.jpg", "The Cardigan drying on a line outdoors"),
      shot("Cardigan/DSCF2204.jpg", "The Cardigan in the studio, worn with the collection"),
    ],
  },
  sundress: {
    colorways: [
      colorway("Sundress", "sundress", "black", "Black", "Sundress", [
        ["DSCF0758-2.jpg", "front"],
        ["DSCF0730-2.jpg", "side"],
        ["DSCF0761-2.jpg", "front"],
        ["DSCF0827-2.jpg", "full length"],
      ]),
      colorway("Sundress", "sundress", "ivory", "Ivory", "Sundress", [
        ["DSCF1197-2.jpg", "front"],
        ["DSCF1200-2.jpg", "front"],
        ["DSCF1247-2.jpg", "bodice and tie"],
        ["DSCF1314-2.jpg", "back"],
        ["DSCF1299-2.jpg", "ruffled strap"],
      ]),
    ],
    editorial: [
      shot("Sundress/DSCF0869-2.jpg", "The Sundress turning, in black and white"),
      shot("Sundress/DSCF0855-2.jpg", "The flounce hem in motion, in black and white"),
    ],
  },
} satisfies Record<string, ProductMedia>;

/* ── Page imagery ─────────────────────────────────────────────────────────── */

export const pageMedia = {
  /** Philosophy: the photograph that holds the left half of the page. */
  philosophyImage: shot("Duster/DSCF0418.jpg", "The Duster in Mocha, on a rope swing under trees"),
  /** How to Order: the photograph beside the steps. */
  howToOrderImage: shot("Cardigan/DSCF0842.jpg", "A cardigan drying on a line"),
  /** Contact page image. */
  contact: shot("Midi/DSCF0626.jpg", "The Midi in Ivory under a knit duster, holding a pear"),
  /** Still shown on home if the hero video or poster is missing. */
  homeFallback: shot("Midi/DSCF0613.jpg", "Two women in the Midi, in an orchard at golden hour"),
} satisfies Record<string, ImageAsset>;
