/**
 * The collection: six pieces.
 *
 * PLACEHOLDER COPY. Descriptions, fit, materials, care and journeys are best guesses
 * written from the photographs, to be replaced with the real details. Sourcing follows
 * the brand's stated story: cotton from the United States, silk from Italy, organic hemp
 * from Japan or Canada, wool from Italy, buttons from Germany; ships from California.
 *
 * Only lib/data/catalog.ts reads this file. Pages never import it directly.
 * Images and colorways come from lib/images.ts.
 */

import { productMedia } from "@/lib/images";
import type { Product } from "@/lib/types";

/** US sizes offered for every piece unless a product overrides them. */
export const DEFAULT_SIZES = ["0", "2", "4", "6", "8", "10", "12", "14"];

export const products: Product[] = [
  {
    slug: "midi",
    name: "Midi",
    material: "Silk satin",
    order: 1,
    description: [
      "A slip dress cut on the bias from silk satin, with a soft cowl at the neck and a hem that falls below the knee.",
      "Wide straps and a low, open back. Worn alone on warm evenings, or under the Duster when the air cools.",
    ],
    fit: "Cut on the bias, so it skims rather than clings. Falls to mid-calf on most. If you are between sizes, choose the larger.",
    materials: ["100% mulberry silk satin", "Woven in Como, Italy", "French seams throughout"],
    care: ["Hand wash cold with a gentle soap, or dry clean", "Lay flat to dry, away from direct sun", "Steam lightly on the reverse"],
    colorways: productMedia.midi.colorways,
    sizes: DEFAULT_SIZES,
    journey: [
      { label: "Silk", place: "Como, Italy" },
      { label: "Sewn", place: "New York" },
      { label: "Ships from", place: "California" },
    ],
    editorial: {
      line: "Silk that moves a moment after you do.",
      images: productMedia.midi.editorial,
    },
  },
  {
    slug: "duster",
    name: "Duster",
    material: "Wool knit",
    order: 2,
    description: [
      "A long, open knit that falls past the knee, with a wide shawl collar and a loose tie at the waist.",
      "Fine wool, knitted slowly so it stays soft and light. Worn open over silk, or tied close on a cool morning.",
    ],
    fit: "Generous and unstructured, made to drape. Take your usual size.",
    materials: ["Extra-fine merino wool", "Spun in Biella, Italy", "Knitted in Veneto, Italy"],
    care: ["Hand wash cold with wool soap, or dry clean", "Dry flat, reshaping while damp", "Fold, never hang"],
    colorways: productMedia.duster.colorways,
    sizes: DEFAULT_SIZES,
    journey: [
      { label: "Wool", place: "Biella, Italy" },
      { label: "Knitted", place: "Veneto, Italy" },
      { label: "Ships from", place: "California" },
    ],
    editorial: {
      line: "Something to reach for when the light goes gold.",
      images: productMedia.duster.editorial,
    },
  },
  {
    slug: "blouse",
    name: "Blouse",
    material: "Silk satin",
    order: 3,
    description: [
      "A collared blouse in silk satin, with a hidden placket and long cuffs that close with small shell buttons.",
      "Shaped at the back with soft darts, so it sits close without pulling. Tucked into the Pants, or worn loose.",
    ],
    fit: "Close through the body, with sleeves cut long to fold back at the cuff. Take your usual size.",
    materials: ["100% mulberry silk satin", "Woven in Como, Italy", "Shell buttons from Germany"],
    care: ["Hand wash cold, or dry clean", "Roll in a towel to dry, then hang", "Steam rather than iron"],
    colorways: productMedia.blouse.colorways,
    sizes: DEFAULT_SIZES,
    journey: [
      { label: "Silk", place: "Como, Italy" },
      { label: "Buttons", place: "Germany" },
      { label: "Sewn", place: "New York" },
      { label: "Ships from", place: "California" },
    ],
    editorial: {
      line: "A quiet collar, and nothing more than it needs.",
      images: productMedia.blouse.editorial,
    },
  },
  {
    slug: "pants",
    name: "Pants",
    material: "Organic hemp twill",
    order: 4,
    description: [
      "A high-waisted pant in organic hemp twill, with a long, wide leg that falls straight to the floor.",
      "Patch pockets at the back and a single button engraved with the fawn. Hemp starts out with quiet structure and softens with every wear.",
    ],
    fit: "Sits at the natural waist. The leg is cut long to wear with a heel; we can hem to your height on request.",
    materials: ["100% organic hemp twill, medium weight", "Grown and woven in Japan", "Engraved metal button from Germany"],
    care: ["Machine wash cold on a gentle cycle", "Line dry", "Iron while slightly damp"],
    colorways: productMedia.pants.colorways,
    sizes: DEFAULT_SIZES,
    journey: [
      { label: "Hemp", place: "Japan" },
      { label: "Button", place: "Germany" },
      { label: "Sewn", place: "New York" },
      { label: "Ships from", place: "California" },
    ],
    editorial: {
      line: "Made to soften with the years you give it.",
      images: productMedia.pants.editorial,
    },
  },
  {
    slug: "cardigan",
    name: "Cardigan",
    material: "Merino wool",
    order: 5,
    description: [
      "A close, crew-neck cardigan in fine merino, ending at the waist, with a row of shell buttons down the front.",
      "Ribbed at the cuff and hem. Light enough to layer over silk, or to wear buttoned on its own.",
    ],
    fit: "Neat through the body, sitting at the waist. For a looser fit, size up.",
    materials: ["100% extra-fine merino wool", "Spun in Biella, Italy", "Mother-of-pearl shell buttons from Germany"],
    care: ["Hand wash cold, or dry clean", "Dry flat, reshaping while damp", "Fold, never hang"],
    colorways: productMedia.cardigan.colorways,
    sizes: DEFAULT_SIZES,
    journey: [
      { label: "Wool", place: "Biella, Italy" },
      { label: "Knitted", place: "Veneto, Italy" },
      { label: "Buttons", place: "Germany" },
      { label: "Ships from", place: "California" },
    ],
    editorial: {
      line: "Warmth that keeps its shape, winter after winter.",
      images: productMedia.cardigan.editorial,
    },
  },
  {
    slug: "sundress",
    name: "Sundress",
    material: "Silk satin",
    order: 6,
    description: [
      "A short silk dress with ruffled straps, a tie at the neckline and a flounce at the hem.",
      "Seamed through the bodice so it follows the body, then opens into the flounce. Made for long summer days.",
    ],
    fit: "Fitted through the bodice, easy at the hem. Falls above the knee. Take your usual size.",
    materials: ["100% mulberry silk satin", "Woven in Como, Italy", "French seams throughout"],
    care: ["Hand wash cold with a gentle soap, or dry clean", "Lay flat to dry, away from direct sun", "Steam lightly on the reverse"],
    colorways: productMedia.sundress.colorways,
    sizes: DEFAULT_SIZES,
    journey: [
      { label: "Silk", place: "Como, Italy" },
      { label: "Sewn", place: "New York" },
      { label: "Ships from", place: "California" },
    ],
    editorial: {
      line: "For the hour when the heat finally lifts.",
      images: productMedia.sundress.editorial,
    },
  },
];
