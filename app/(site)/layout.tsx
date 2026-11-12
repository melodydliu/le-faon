import { ViewTransition } from "react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

/**
 * Every page except home: header with navigation, content, footer.
 * The transition here only runs when arriving from or leaving for home; between these pages
 * the header holds still and each page's own PageTransition does the work.
 */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      <SiteHeader />
      <main id="main" className="min-h-[calc(100dvh-var(--header-h))]">
        {children}
      </main>
      <SiteFooter />
    </ViewTransition>
  );
}
