/**
 * Mock collection: six pieces. Realistic sourcing, consistent with the brand:
 *   cotton from the United States, silk from Italy, organic hemp from Japan or Canada,
 *   wool from Italy, brass and shell buttons from Germany.
 *   Knitwear is made in Italy; most woven pieces are sewn in New York; everything ships from California.
 *
 * Only lib/data/catalog.ts reads this file. Pages never import it directly.
 * Images come from lib/images.ts.
 */

import { productMedia } from "@/lib/images";
import type { Colorway, Product } from "@/lib/types";

/** US sizes offered for every piece unless a product overrides them. */
export const DEFAULT_SIZES = ["0", "2", "4", "6", "8", "10", "12", "14"];

const colorwayNames: Record<string, string> = {
  bone: "Bone",
  oat: "Oat",
  sand: "Sand",
  moss: "Moss",
  clay: "Clay",
  ink: "Ink",
};

function colorways(slug: string, ids: string[]): Colorway[] {
  return ids.map((id) => ({
    id,
    name: colorwayNames[id],
    swatch: productMedia[slug].colorways[id].swatch,
    images: productMedia[slug].colorways[id].images,
  }));
}

export const products: Product[] = [
  {
    slug: "silk-slip-dress",
    name: "Silk Slip Dress",
    material: "Silk charmeuse",
    order: 1,
    description: [
      "A slip dress cut on the bias from a single length of silk charmeuse, so it follows the body rather than holding it.",
      "Fine adjustable straps, a low back and a hem that falls just below the calf. Worn alone in summer, or beneath a cardigan when the evenings cool.",
    ],
    fit: "Cut on the bias with gentle ease. Falls to mid-calf on most. If you are between sizes, choose the larger.",
    materials: ["100% mulberry silk charmeuse, 22 momme", "Woven in Como, Italy", "French seams throughout"],
    care: ["Hand wash cold with a gentle soap, or dry clean", "Lay flat to dry, away from direct sun", "Steam lightly on the reverse"],
    colorways: colorways("silk-slip-dress", ["bone", "sand", "ink"]),
    sizes: DEFAULT_SIZES,
    journey: [
      { label: "Silk", place: "Como, Italy" },
      { label: "Sewn", place: "New York" },
      { label: "Ships from", place: "California" },
    ],
    editorial: {
      line: "Silk that moves a moment after you do.",
      images: productMedia["silk-slip-dress"].editorial,
    },
  },
  {
    slug: "cardigan",
    name: "Cardigan",
    material: "Merino wool",
    order: 2,
    description: [
      "A long, unhurried cardigan in fine merino, knitted slowly so the wool keeps its softness and loft.",
      "It falls past the hip, with deep pockets and a row of shell buttons. Made to be worn open over silk, or closed and wrapped close on a cool morning.",
    ],
    fit: "Relaxed through the body, with sleeves that can be pushed up. Take your usual size.",
    materials: ["100% extra-fine merino wool", "Spun in Biella, Italy", "Mother-of-pearl shell buttons from Germany"],
    care: ["Hand wash cold, or dry clean", "Dry flat, reshaping while damp", "Fold, never hang"],
    colorways: colorways("cardigan", ["bone", "oat", "moss"]),
    sizes: DEFAULT_SIZES,
    journey: [
      { label: "Wool", place: "Biella, Italy" },
      { label: "Knitted", place: "Veneto, Italy" },
      { label: "Buttons", place: "Germany" },
      { label: "Ships from", place: "California" },
    ],
    editorial: {
      line: "Something to reach for when the light goes gold.",
      images: productMedia.cardigan.editorial,
    },
  },
  {
    slug: "pants",
    name: "Pants",
    material: "Organic hemp",
    order: 3,
    description: [
      "A high-waisted pant in organic hemp, with a long, straight leg and a single pleat at the front.",
      "Hemp begins with a quiet structure and softens with every wear and wash, until it feels entirely your own.",
    ],
    fit: "Sits at the natural waist. The leg is full-length; we can hem to your height on request.",
    materials: ["100% organic hemp, medium weight", "Grown and woven in Japan", "Brass button and hook closure from Germany"],
    care: ["Machine wash cold on a gentle cycle", "Line dry", "Iron while slightly damp"],
    colorways: colorways("pants", ["sand", "clay", "ink"]),
    sizes: DEFAULT_SIZES,
    journey: [
      { label: "Hemp", place: "Japan" },
      { label: "Buttons", place: "Germany" },
      { label: "Sewn", place: "New York" },
      { label: "Ships from", place: "California" },
    ],
    editorial: {
      line: "Made to soften with the years you give it.",
      images: productMedia.pants.editorial,
    },
  },
  {
    slug: "sun-dress",
    name: "Sun Dress",
    material: "Cotton voile",
    order: 4,
    description: [
      "A light cotton voile dress for long days. The bodice is softly gathered, and the skirt opens wide below it.",
      "Thin ties at the shoulder and a hem that brushes the ankle. The cotton is grown in Texas, so it is airy enough for the hottest afternoons.",
    ],
    fit: "Fitted at the bodice, full through the skirt. Shoulder ties adjust the length.",
    materials: ["100% organic cotton voile", "Grown in Texas, United States", "Lined at the bodice in cotton batiste"],
    care: ["Machine wash cold on a delicate cycle", "Line dry in the shade", "Iron on low"],
    colorways: colorways("sun-dress", ["bone", "clay"]),
    sizes: DEFAULT_SIZES,
    journey: [
      { label: "Cotton", place: "Texas, United States" },
      { label: "Sewn", place: "New York" },
      { label: "Ships from", place: "California" },
    ],
    editorial: {
      line: "For the hour when the heat finally lifts.",
      images: productMedia["sun-dress"].editorial,
    },
  },
  {
    slug: "blouse",
    name: "Blouse",
    material: "Silk crepe de chine",
    order: 5,
    description: [
      "A softly collared blouse in silk crepe de chine, with a matte hand and a gentle drape.",
      "Full sleeves gather at a narrow cuff, closed with small shell buttons. Tucked into hemp pants, or left loose.",
    ],
    fit: "Easy through the body, slightly longer at the back. Take your usual size.",
    materials: ["100% silk crepe de chine", "Woven in Como, Italy", "Shell buttons from Germany"],
    care: ["Hand wash cold, or dry clean", "Roll in a towel to dry, then hang", "Steam rather than iron"],
    colorways: colorways("blouse", ["bone", "oat", "moss"]),
    sizes: DEFAULT_SIZES,
    journey: [
      { label: "Silk", place: "Como, Italy" },
      { label: "Buttons", place: "Germany" },
      { label: "Sewn", place: "Germany" },
      { label: "Ships from", place: "California" },
    ],
    editorial: {
      line: "A quiet collar, and nothing more than it needs.",
      images: productMedia.blouse.editorial,
    },
  },
  {
    slug: "wool-sweater",
    name: "Wool Sweater",
    material: "Lambswool",
    order: 6,
    description: [
      "A crew-neck sweater in brushed lambswool, knitted in Italy on slow machines that keep the yarn soft and full.",
      "Ribbed at the neck, cuff and hem, with a shape that sits easily over a blouse or alone.",
    ],
    fit: "Slightly relaxed, ending at the hip. For a closer fit, size down.",
    materials: ["100% lambswool", "Spun in Biella, Italy", "Knitted in Veneto, Italy"],
    care: ["Hand wash cold with wool soap", "Dry flat, reshaping while damp", "Store folded with cedar"],
    colorways: colorways("wool-sweater", ["oat", "moss", "clay", "ink"]),
    sizes: DEFAULT_SIZES,
    journey: [
      { label: "Wool", place: "Biella, Italy" },
      { label: "Knitted", place: "Veneto, Italy" },
      { label: "Ships from", place: "California" },
    ],
    editorial: {
      line: "Warmth that keeps its shape, winter after winter.",
      images: productMedia["wool-sweater"].editorial,
    },
  },
];
