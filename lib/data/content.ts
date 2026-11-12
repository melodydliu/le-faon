/** Editorial page content. Local today; a CMS later, behind the same functions. */
import { ordering, type OrderingContent } from "@/lib/content/ordering";
import { philosophy } from "@/lib/content/philosophy";
import type { ProsePageContent } from "@/lib/content/types";

export async function getPhilosophy(): Promise<ProsePageContent> {
  return philosophy;
}

export async function getOrdering(): Promise<OrderingContent> {
  return ordering;
}
