import Link from "next/link";
import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  children?: ReactNode;
  action?: { href: string; label: string };
  /** "page" fills the viewport below the header; "inline" sits inside a section. */
  size?: "page" | "inline";
};

/** A calm, centered placeholder. Every unbuilt or empty view uses this, never a blank screen. */
export function EmptyState({ title, children, action, size = "page" }: EmptyStateProps) {
  return (
    <section
      className={`px-gutter flex flex-col items-center justify-center text-center ${
        size === "page" ? "min-h-[calc(100dvh-var(--header-h)-1px)] py-24" : "py-20"
      }`}
    >
      <div className="flex max-w-[38rem] flex-col items-center gap-5">
        <h1 className="display-lg">{title}</h1>
        {children && <div className="max-w-[56ch] text-pretty text-secondary">{children}</div>}
        {action && (
          <Link
            href={action.href}
            className="label link-quiet mt-3 inline-flex min-h-11 items-center text-ink"
          >
            {action.label}
          </Link>
        )}
      </div>
    </section>
  );
}
