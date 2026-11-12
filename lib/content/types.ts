/** Long-form page content. Kept as data so a CMS can supply it later. */

export type ProseBlock =
  | { kind: "lead"; text: string } // larger serif opening
  | { kind: "paragraph"; text: string }
  | { kind: "quote"; text: string } // a single line set apart
  | { kind: "steps"; items: string[] }; // a short numbered sequence

export type ProseSection = {
  /** Quiet subhead. Omit for an untitled opening section. */
  title?: string;
  blocks: ProseBlock[];
};

export type ProsePageContent = {
  eyebrow: string;
  title: string;
  sections: ProseSection[];
  closing: { line?: string; links: { href: string; label: string }[] };
};
