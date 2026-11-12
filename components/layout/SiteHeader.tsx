"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useCallback, useLayoutEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { InquiryLink } from "@/components/layout/InquiryLink";
import { MenuIcon } from "@/components/ui/MenuIcon";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { primaryNav } from "@/lib/site";

export function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * The pathname is only known at request time on dynamic routes (e.g. /catalog/[slug]),
 * so the header streams in with its active state. The fallback is the same header without one.
 */
export function SiteHeader() {
  return (
    <Suspense fallback={<HeaderView pathname="" />}>
      <PathnameHeader />
    </Suspense>
  );
}

function PathnameHeader() {
  return <HeaderView pathname={usePathname()} />;
}

function HeaderView({ pathname }: { pathname: string }) {
  // The menu is open only on the page it was opened on, so any navigation closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const menuOpen = openOn === pathname;
  const menuButton = useRef<HTMLButtonElement>(null);
  const closeMenu = useCallback(() => {
    setOpenOn(null);
    menuButton.current?.focus();
  }, []);
  // Close it too when this page is hidden after navigating away (Next keeps it mounted).
  useLayoutEffect(() => () => setOpenOn(null), []);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg pt-[env(safe-area-inset-top)] [view-transition-name:site-header]">
      <div className="px-gutter grid h-[var(--header-h)] grid-cols-[1fr_auto] items-center lg:grid-cols-[1fr_auto_1fr]">
        <Link href="/" aria-label="Le Faon, home" className="justify-self-start py-2">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-10">
            {primaryNav.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`label inline-flex min-h-11 items-center transition-colors duration-300 ${
                      active ? "text-ink" : "text-secondary hover:text-ink"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center justify-self-end gap-1 lg:gap-0">
          <InquiryLink active={isActive(pathname, "/inquiry")} />
          <button
            ref={menuButton}
            type="button"
            onClick={() => setOpenOn(pathname)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label="Menu"
            className="-mr-3 inline-flex min-h-11 min-w-11 items-center justify-center px-3 text-ink lg:hidden"
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      <MobileMenu
        open={menuOpen}
        pathname={pathname}
        onClose={closeMenu}
      />
    </header>
  );
}
