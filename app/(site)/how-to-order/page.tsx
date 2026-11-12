import type { Metadata } from "next";
import { OrderingSteps } from "@/components/ordering/OrderingSteps";
import { getOrdering } from "@/lib/data/content";
import { pageMedia } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "How to Order",
  description:
    "Every Le Faon garment is made to order. Add pieces to your inquiry with your size and colorway, and we reply personally with pricing and the next steps.",
  path: "/how-to-order",
});

export default async function HowToOrderPage() {
  const content = await getOrdering();
  return <OrderingSteps content={content} image={pageMedia.howToOrderImage} />;
}
