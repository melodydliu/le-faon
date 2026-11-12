"use client";

import Link from "next/link";
import { useInquiryCount } from "@/lib/inquiry/store";
import { homeNav, inquiryLink } from "@/lib/site";

/**
 * The page links above the fold: a tracked row on desktop, a short serif list on mobile.
 * The inquiry link appears only once something has been added.
 */
export function HomeLinks() {
  const count = useInquiryCount();
  const links = count > 0 ? homeNav : homeNav.filter((link) => link.href !== inquiryLink.href);

  return (
    <nav aria-label="Main" className="hidden lg:block">
      <ul className="flex flex-col items-center gap-1 lg:flex-row lg:justify-center lg:gap-16">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="inline-flex min-h-11 items-center font-display text-[1.375rem] font-light text-on-inverted opacity-90 transition-opacity duration-500 hover:opacity-100 lg:font-sans lg:text-[11px] lg:font-medium lg:tracking-[0.2em] lg:uppercase"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
