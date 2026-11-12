/**
 * Site-wide settings: name, navigation, contact details.
 * Reorder or remove pages here; the header, menu, footer and home links all read from it.
 */

export const site = {
  name: "Le Faon",
  description:
    "Made-to-order garments in natural materials: cotton, silk, hemp and wool, sewn in small factories in Italy, Germany and New York.",
  /** Canonical origin: NEXT_PUBLIC_SITE_URL, else Vercel's production domain, else lefaon.com. */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "") ||
    "https://lefaon.com",
  /** Shown as the fallback when a form can't be sent. Confirm with the brand. */
  contactEmail: "hello@lefaon.com",
} as const;

export type NavLink = { href: string; label: string };

/** Primary pages, in order. Inquiry is listed separately because it carries a count. */
export const primaryNav: NavLink[] = [
  { href: "/philosophy", label: "Philosophy" },
  { href: "/how-to-order", label: "How to Order" },
  { href: "/catalog", label: "Catalog" },
  { href: "/contact", label: "Contact" },
];

export const inquiryLink: NavLink = { href: "/inquiry", label: "Inquiry" };

/** The home page's row of links: Philosophy · How to Order · Catalog · Inquiry · Contact */
export const homeNav: NavLink[] = [
  primaryNav[0],
  primaryNav[1],
  primaryNav[2],
  inquiryLink,
  primaryNav[3],
];
