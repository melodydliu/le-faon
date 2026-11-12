import Link from "next/link";

/**
 * A quiet closing line and links on one centered row, for the end of a page.
 * Not in use for now (hidden on Catalog, Philosophy and How to Order); kept to bring back easily.
 */
export function ClosingLinks({ line, links }: { line?: string; links: { href: string; label: string }[] }) {
  return (
    <section className="px-gutter border-t border-line py-12 lg:py-14">
      <div className="flex flex-col items-center gap-x-10 gap-y-2 text-center lg:flex-row lg:justify-center">
        {line && <p className="font-display text-[1.25rem] leading-snug text-ink">{line}</p>}
        <ul className="flex flex-wrap justify-center gap-x-8">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="label link-quiet inline-flex min-h-11 items-center">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
