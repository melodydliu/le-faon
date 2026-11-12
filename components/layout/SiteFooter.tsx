import { site } from "@/lib/site";

/** A single quiet line: the name and the contact address. The header carries the navigation. */
export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-bg pb-[env(safe-area-inset-bottom)]">
      <div className="px-gutter flex flex-col gap-2 py-10 sm:flex-row sm:items-center sm:justify-between lg:py-14">
        <p className="label text-muted">© Le Faon</p>
        <p className="text-sm text-secondary select-all">{site.contactEmail}</p>
      </div>
    </footer>
  );
}
