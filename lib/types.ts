/**
 * Domain types. The UI depends on these, never on where the data comes from,
 * so a CMS or Shopify (as a catalog) can replace the mock data later.
 */

export type ImageAsset = {
  src: string;
  alt: string;
  /** Intrinsic size. Keeps every photo at its true aspect ratio (garments are never cropped). */
  width: number;
  height: number;
  /** Tiny blurred preview shown while the image loads. */
  blurDataURL: string;
};

/** One step of "The making of this piece", e.g. { label: "Silk", place: "Como, Italy" }. */
export type JourneyStep = {
  label: string;
  place: string;
};

export type Colorway = {
  /** URL-safe id, e.g. "bone". Stored in inquiries. */
  id: string;
  name: string;
  /** Small flat color chip, sampled from the cloth in the photos. */
  swatch: ImageAsset;
  /** Gallery photos for this colorway, in order. The first is the hero. */
  images: ImageAsset[];
};

export type Size = string;

export type Product = {
  slug: string;
  name: string;
  /** Short material line for the catalog grid, e.g. "Silk charmeuse". */
  material: string;
  /** Paragraphs. */
  description: string[];
  /** How it fits and falls; shown with the description. */
  fit: string;
  materials: string[];
  care: string[];
  colorways: Colorway[];
  sizes: Size[];
  journey: JourneyStep[];
  /** Below-the-fold continuation on the piece page. */
  editorial: {
    line: string;
    images: ImageAsset[];
  };
  /** Sort position in the collection. */
  order: number;
};

/** One piece in the visitor's inquiry. */
export type InquiryItem = {
  productSlug: string;
  /** Colorway id. */
  colorway: string;
  size: Size;
  note: string;
};

export type ShippingAddress = {
  line1: string;
  line2?: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
};

export type Inquiry = {
  items: InquiryItem[];
  name: string;
  email: string;
  phone: string;
  shipping: ShippingAddress;
  notes?: string;
  acknowledged: true;
  submittedAt: string;
};

export type ContactMessage = {
  name: string;
  email: string;
  message: string;
  submittedAt: string;
};

export type SizeGuide = {
  /** True while the measurements are placeholders awaiting the brand's numbers. */
  placeholder: boolean;
  unit: "in" | "cm";
  columns: string[];
  rows: { size: Size; values: string[] }[];
  note: string;
};
