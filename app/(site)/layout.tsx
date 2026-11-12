import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

/** Every page except home: header with navigation, content, footer. */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <SiteHeader />
      <main id="main" className="min-h-[calc(100dvh-var(--header-h))]">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
