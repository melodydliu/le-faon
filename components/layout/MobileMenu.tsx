"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { useInquiryCount } from "@/lib/inquiry/store";
import { inquiryLink, primaryNav, site } from "@/lib/site";

type Props = { open: boolean; pathname: string; onClose: () => void };

/** Full-screen overlay menu for small screens, set in large serif type. */
export function MobileMenu({ open, pathname, onClose }: Props) {
  const closeButton = useRef<HTMLButtonElement>(null);
  const count = useInquiryCount();

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    closeButton.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  // The inquiry link appears only once something has been added.
  const links = [...primaryNav.slice(0, 3), ...(count > 0 ? [inquiryLink] : []), primaryNav[3]];

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-50 flex flex-col bg-bg pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] animate-[fade-in_400ms_var(--ease-out)] lg:hidden"
    >
      <div className="px-gutter flex h-[var(--header-h)] items-center justify-between border-b border-line">
        <Link href="/" onClick={onClose} aria-label="Le Faon, home" className="py-2">
          <Logo />
        </Link>
        <button
          ref={closeButton}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="-mr-3 inline-flex min-h-11 min-w-11 items-center justify-center text-ink"
        >
          <X aria-hidden="true" size={22} strokeWidth={1} />
        </button>
      </div>

      <nav aria-label="Main" className="px-gutter flex flex-1 flex-col justify-center">
        <ul className="flex flex-col gap-2">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            const showCount = link.href === inquiryLink.href && count > 0;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  className={`display-lg inline-flex min-h-14 items-baseline gap-3 ${
                    active ? "text-ink italic" : "text-ink"
                  }`}
                >
                  {link.label}
                  {showCount && <span className="text-muted tabular-nums not-italic">({count})</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="px-gutter border-t border-line py-6">
        <p className="label text-muted">Made to order · Natural materials</p>
        <p className="mt-2 text-sm text-secondary select-all">{site.contactEmail}</p>
      </div>
    </div>
  );
}
