"use client";

import Link from "next/link";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { MenuIcon } from "@/components/ui/MenuIcon";
import { useInquiryCount } from "@/lib/inquiry/store";
import { inquiryLink } from "@/lib/site";

/**
 * Phones only: a quiet "Menu" at the top right of the home hero (with the inquiry once
 * something is in it), opening the same full-screen menu as the other pages.
 */
export function HomeMenu() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const count = useInquiryCount();
  const close = useCallback(() => {
    setOpen(false);
    button.current?.focus();
  }, []);

  // Next keeps a page mounted (hidden) after you leave it; close the menu then,
  // so coming back home never finds it still open.
  useLayoutEffect(() => () => setOpen(false), []);

  return (
    <div className="lg:hidden">
      {/* A faint fade at the top so the menu reads on a bright sky. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 bg-linear-to-b from-[rgb(42_37_20/0.35)] to-transparent"
      />
      <div className="absolute top-[max(0.75rem,env(safe-area-inset-top))] right-[max(var(--gutter),env(safe-area-inset-right))] flex items-center gap-1">
        {count > 0 && (
          <Link
            href={inquiryLink.href}
            aria-label={`${inquiryLink.label}, ${count} ${count === 1 ? "piece" : "pieces"}`}
            className="label inline-flex min-h-11 items-center px-3 text-on-inverted/90"
          >
            {inquiryLink.label}
            <span className="ml-1.5 tabular-nums opacity-80">({count})</span>
          </Link>
        )}
        <button
          ref={button}
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="label -mr-3 inline-flex min-h-11 min-w-11 items-center justify-center gap-2.5 px-3 text-on-inverted"
        >
          Menu
          <MenuIcon />
        </button>
      </div>
      <MobileMenu open={open} pathname="/" onClose={close} />
    </div>
  );
}
