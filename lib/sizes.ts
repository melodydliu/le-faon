import type { ProductKind, Size } from "@/lib/types";

/** A size as people read it: "US 4" for a garment, "50 ml" as written for a fragrance. */
export function formatSize(kind: ProductKind, size: Size): string {
  return kind === "garment" ? `US ${size}` : size;
}
