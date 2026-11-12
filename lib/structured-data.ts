/** schema.org data: the brand (Organization) and each piece (Product, with no price or offer). */
import { brandMedia } from "@/lib/images";
import { absoluteUrl } from "@/lib/seo";
import { site } from "@/lib/site";
import type { Product } from "@/lib/types";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: site.name,
    url: absoluteUrl("/"),
    logo: absoluteUrl(brandMedia.fawn),
    description: site.description,
    email: site.contactEmail,
  };
}

export function productJsonLd(product: Product) {
  const images = product.colorways.flatMap((c) => c.images.slice(0, 1)).map((i) => absoluteUrl(i.src));
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": absoluteUrl(`/catalog/${product.slug}#product`),
    name: product.name,
    description: product.description.join(" "),
    url: absoluteUrl(`/catalog/${product.slug}`),
    image: [...new Set(images)],
    material: product.material,
    color: product.colorways.map((c) => c.name).join(", "),
    size: product.sizes.map((s) => `US ${s}`).join(", "),
    brand: { "@type": "Brand", name: site.name },
    manufacturer: { "@id": absoluteUrl("/#organization") },
    // No price or offer: every piece is made to order and priced upon inquiry.
  };
}
