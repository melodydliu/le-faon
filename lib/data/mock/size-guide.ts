/**
 * ⚠️  PLACEHOLDER MEASUREMENTS. These are typical US women's body measurements,
 *     not Le Faon's. The brand must confirm or replace every value before launch.
 *     While `placeholder` is true, the size guide shows a quiet note saying so.
 */

import type { SizeGuide } from "@/lib/types";

export const sizeGuide: SizeGuide = {
  placeholder: true,
  unit: "in",
  columns: ["Bust", "Waist", "Hip"],
  rows: [
    { size: "0", values: ["32", "24", "34"] },
    { size: "2", values: ["33", "25", "35"] },
    { size: "4", values: ["34", "26", "36"] },
    { size: "6", values: ["35", "27", "37"] },
    { size: "8", values: ["36", "28", "38"] },
    { size: "10", values: ["37½", "29½", "39½"] },
    { size: "12", values: ["39", "31", "41"] },
    { size: "14", values: ["40½", "32½", "42½"] },
  ],
  note: "Body measurements, in inches. If you are between sizes, or would like something adjusted, tell us in your inquiry and we will advise.",
};
