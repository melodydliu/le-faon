import type { ReactNode } from "react";

type AccordionItemProps = {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  /** "label" for short tracked headings (product details); "question" for sentence-case questions. */
  variant?: "label" | "question";
};

/** Thin hairline accordion built on <details>: accessible and works without JavaScript. */
export function AccordionItem({ title, children, defaultOpen = false, variant = "label" }: AccordionItemProps) {
  return (
    <details className="accordion group border-b border-line" open={defaultOpen}>
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden">
        <span className={variant === "question" ? "font-display text-[1.375rem] leading-snug text-ink" : "label text-ink"}>
          {title}
        </span>
        <span
          aria-hidden="true"
          className="relative h-3 w-3 shrink-0 before:absolute before:top-1/2 before:left-0 before:h-px before:w-3 before:bg-current after:absolute after:top-0 after:left-1/2 after:h-3 after:w-px after:bg-current after:transition-transform after:duration-500 after:ease-[var(--ease-out)] group-open:after:scale-y-0"
        />
      </summary>
      <div className="pb-6 text-[0.9375rem] text-secondary">{children}</div>
    </details>
  );
}

export function Accordion({ children }: { children: ReactNode }) {
  return <div className="border-t border-line">{children}</div>;
}
