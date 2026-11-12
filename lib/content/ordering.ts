/**
 * How to Order: the process as structured content, so it can be laid out several ways.
 *
 * `detail` lines are the brand's own sentences (unchanged).
 * Step titles, summaries and the questions are new, plain copy
 * written for clarity — confirm with the brand, especially anything about payment.
 */

export type OrderingStep = {
  title: string;
  /** One plain line: what happens. */
  summary: string;
  /** The brand's own sentence(s), for those who want more. */
  detail?: string;
  /** When it happens, e.g. "Within 1–3 business days". */
  when: string;
};

export type OrderingQuestion = { q: string; a: string[] };

export type OrderingContent = {
  eyebrow: string;
  title: string;
  /** The brand's opening lines. */
  intro: string[];
  steps: OrderingStep[];
  questions: OrderingQuestion[];
};

export const ordering: OrderingContent = {
  eyebrow: "Our Process",
  title: "How to Order",
  intro: [
    "Le Faon operates on an inquiry-based model rather than instant purchase.",
    "Each piece is made to order, allowing for a more intentional and considered experience.",
  ],
  steps: [
    {
      title: "Choose your pieces",
      summary: "Browse the catalog and add pieces to your inquiry, with a size and colorway for each.",
      detail: "As you explore the collection, you may add pieces to your inquiry, noting your preferred size and colorway.",
      when: "Today",
    },
    {
      title: "Send your inquiry",
      summary: "Add your contact and shipping details, and send. Nothing is charged at this stage.",
      detail: "Once submitted, your selections are sent directly to us for review.",
      when: "Today",
    },
    {
      title: "We reply personally",
      summary: "Within 1–3 business days, with pricing, timing and the next steps.",
      detail: "Because each garment is made-to-order, pricing reflects the care, sourcing, and craftsmanship involved.",
      when: "Within 1–3 business days",
    },
    {
      title: "Your piece is made",
      summary: "Once you confirm, your piece is made for you in one of our small factories.",
      detail:
        "Pieces manufactured in our New York studio typically arrive sooner, while select garments – such as our knitwear produced in Italy – require additional time.",
      when: "Once you confirm",
    },
    {
      title: "Delivered, and fitted if needed",
      summary: "If anything needs adjusting, we connect you with a trusted tailor near you, at no extra cost.",
      detail:
        "If alterations are needed, we will connect you with a trusted professional in your area. This service is included in the cost of your garment.",
      when: "On delivery",
    },
  ],
  questions: [
    {
      q: "How do I order?",
      a: [
        "Add pieces to your inquiry from the catalog, choosing a size and colorway for each, then send it with your contact and shipping details. We reply personally within 1–3 business days.",
      ],
    },
    {
      q: "How much does a piece cost?",
      a: [
        "We share pricing personally in our reply to your inquiry.",
        "Because each garment is made-to-order, pricing reflects the care, sourcing, and craftsmanship involved.",
      ],
    },
    {
      q: "Does sending an inquiry commit me to anything?",
      a: ["No. An inquiry is a request for pricing and timing. Nothing is charged, and you decide once you have our reply."],
    },
    {
      q: "How long will it take?",
      a: [
        "We reply within 1–3 business days, with timing for your pieces.",
        "Pieces manufactured in our New York studio typically arrive sooner, while select garments – such as our knitwear produced in Italy – require additional time.",
      ],
    },
    {
      q: "Can I return a piece?",
      a: [
        "We do not offer returns. However, we maintain relationships with skilled tailors and are able to assist in locating trusted alterations professionals within your area, should adjustments be needed.",
      ],
    },
    {
      q: "What if it doesn’t fit perfectly?",
      a: [
        "If you are between sizes, tell us in your inquiry and we will advise.",
        "If alterations are needed, we will connect you with a trusted professional in your area. This service is included in the cost of your garment.",
      ],
    },
    {
      q: "Where are the pieces made?",
      a: [
        "All garments are crafted from cotton sourced in the United States, silk from Italy, organic hemp from Japan or Canada, and our brass and shell buttons are sourced from Germany. Production takes place in Italy, Germany, or the United States in small factories that prioritize the wellbeing of their workers.",
      ],
    },
  ],
};
