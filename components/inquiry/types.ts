import type { ImageAsset, ShippingAddress } from "@/lib/types";
import type { InquiryLine } from "@/lib/inquiry/store";

/** The slice of a product the inquiry page needs. Built on the server from the catalog. */
export type InquiryProduct = {
  slug: string;
  name: string;
  sizes: string[];
  colorways: { id: string; name: string; thumb: ImageAsset }[];
};

/** A stored line matched to its product and colorway. */
export type ResolvedLine = {
  line: InquiryLine;
  product: InquiryProduct;
  colorway: InquiryProduct["colorways"][number];
};

/** What the visitor sent, kept for the confirmation view after the list is cleared. */
export type SentInquiry = {
  name: string;
  email: string;
  phone: string;
  shipping: ShippingAddress;
  notes: string;
  items: { slug: string; name: string; colorwayName: string; size: string; note: string; thumb: ImageAsset }[];
  submittedAt: string;
};
