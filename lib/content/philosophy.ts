/**
 * Philosophy: the brand's own words (lefaon.com/philosophie), split into short sections.
 * Sentences are unchanged; only the subheads are new.
 */
import type { ProsePageContent } from "./types";

export const philosophy: ProsePageContent = {
  eyebrow: "Our Philosophy",
  title: "Philosophy",
  sections: [
    {
      blocks: [
        {
          kind: "lead",
          text: "There was once a time when simplicity was a way of life; not by choice, but because the alternative did not exist.",
        },
        {
          kind: "paragraph",
          text: "At Le Faon, we return to that simplicity through the integrity of our craftsmanship, from mill to market. Each garment is designed to be timeless, and our capsule approach is an intentional effort to minimize excess while honoring what is essential.",
        },
      ],
    },
    {
      title: "Natural materials",
      blocks: [
        {
          kind: "paragraph",
          text: "We work exclusively with natural, earthen materials - cotton, silk, and hemp - chosen not only for their quality, but for their ability to reconnect the wearer to something quieter, more grounded.",
        },
        { kind: "quote", text: "There is a certain modesty in nature that we seek to preserve in every piece." },
      ],
    },
    {
      title: "A slower rhythm",
      blocks: [
        {
          kind: "paragraph",
          text: "In contrast to the pace of modern fashion, Le Faon operates slowly and deliberately. All garments are made-to-order. We do not produce in bulk, nor do we offer immediate purchase. Each piece begins with an inquiry and moves through a one-to-one process, allowing for a more considered and personal experience.",
        },
        {
          kind: "quote",
          text: "We invite you into a different rhythm, one that values intention over urgency, and presence over excess.",
        },
      ],
    },
    {
      title: "From mill to market",
      blocks: [
        {
          kind: "paragraph",
          text: "All garments are crafted from cotton sourced in the United States, silk from Italy, organic hemp from Japan or Canada, and our brass and shell buttons are sourced from Germany. Production takes place in Italy, Germany, or the United States in small factories that prioritize the wellbeing of their workers.",
        },
        { kind: "quote", text: "Our supply chain is not incidental; it is a reflection of our values." },
      ],
    },
    {
      title: "Pricing & alterations",
      blocks: [
        {
          kind: "paragraph",
          text: "Because each garment is made-to-order, pricing reflects the care, sourcing, and craftsmanship involved. We do not offer returns. However, we maintain relationships with skilled tailors and are able to assist in locating trusted alterations professionals within your area, should adjustments be needed.",
        },
      ],
    },
  ],
  closing: {
    links: [
      { href: "/how-to-order", label: "Ordering: Our Process" },
      { href: "/catalog", label: "View the catalog" },
    ],
  },
};
