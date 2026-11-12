import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageTransition } from "@/components/layout/PageTransition";

/** Unmatched URLs anywhere on the site. */
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageTransition>
          <EmptyState
            title="This page has wandered off"
            action={{ href: "/catalog", label: "View the catalog" }}
          >
            <p>The page you were looking for isn’t here. The collection is.</p>
          </EmptyState>
        </PageTransition>
      </main>
      <SiteFooter />
    </>
  );
}
