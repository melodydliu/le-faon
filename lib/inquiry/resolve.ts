/**
 * Checks a validated inquiry against the catalog (does each piece, colorway and size exist?)
 * and adds the readable names and links the email needs. Server only.
 */

import type { FieldErrors, ValidInquirySubmission } from "@/lib/inquiry/schema";
import { formatSize } from "@/lib/sizes";
import type { Product, ShippingAddress } from "@/lib/types";

export type ResolvedItem = {
  productSlug: string;
  name: string;
  colorway: string;
  colorwayName: string;
  size: string;
  /** As people read it, e.g. "US 4" or "50 ml". */
  sizeLabel: string;
  note: string;
  url: string;
};

export type ResolvedInquiry = {
  items: ResolvedItem[];
  name: string;
  email: string;
  phone: string;
  shipping: ShippingAddress;
  notes: string;
  acknowledged: true;
  submittedAt: string;
};

export function resolveInquiry(
  input: ValidInquirySubmission,
  products: Product[],
  submittedAt: string,
  /** Origin the inquiry came from, so links in the email point at this deployment. */
  baseUrl: string,
): { ok: true; inquiry: ResolvedInquiry } | { ok: false; fieldErrors: FieldErrors } {
  const fieldErrors: FieldErrors = {};
  const items: ResolvedItem[] = [];

  input.items.forEach((item, i) => {
    const product = products.find((p) => p.slug === item.productSlug);
    const colorway = product?.colorways.find((c) => c.id === item.colorway);
    if (!product || !colorway || !product.sizes.includes(item.size)) {
      fieldErrors[`items.${i}`] = "This piece is no longer available as chosen. Please remove it or choose again.";
      return;
    }
    items.push({
      productSlug: product.slug,
      name: product.name,
      colorway: colorway.id,
      colorwayName: colorway.name,
      size: item.size,
      sizeLabel: formatSize(product.kind, item.size),
      note: item.note,
      url: new URL(`/catalog/${product.slug}`, baseUrl).toString(),
    });
  });

  if (Object.keys(fieldErrors).length > 0) return { ok: false, fieldErrors };

  return {
    ok: true,
    inquiry: {
      items,
      name: input.name,
      email: input.email,
      phone: input.phone,
      shipping: input.shipping,
      notes: input.notes,
      acknowledged: true,
      submittedAt,
    },
  };
}
