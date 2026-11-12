"use client";

import Link from "next/link";
import { useInquiryCount } from "@/lib/inquiry/store";
import { inquiryLink } from "@/lib/site";

/** "Inquiry (2)": hidden until something has been added, then shown with a quiet count. */
export function InquiryLink({ active, className = "" }: { active?: boolean; className?: string }) {
  const count = useInquiryCount();
  if (count === 0) return null;
  const label = `${inquiryLink.label}, ${count} ${count === 1 ? "piece" : "pieces"}`;

  return (
    <Link
      href={inquiryLink.href}
      aria-label={label}
      aria-current={active ? "page" : undefined}
      className={`label inline-flex min-h-11 items-center px-3 transition-colors duration-300 lg:px-0 ${
        active ? "text-ink" : "text-secondary hover:text-ink"
      } ${className}`}
    >
      {inquiryLink.label}
      <span className="ml-1.5 tabular-nums text-muted">({count})</span>
    </Link>
  );
}
