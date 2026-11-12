"use client";

import { useMemo, useState } from "react";
import { EmptyState } from "@/components/ui/EmptyState";
import { clearInquiry, useInquiryLines, useInquiryReady } from "@/lib/inquiry/store";
import { InquiryConfirmation } from "./InquiryConfirmation";
import { InquiryForm } from "./InquiryForm";
import { InquiryLineItem } from "./InquiryLineItem";
import type { InquiryProduct, ResolvedLine, SentInquiry } from "./types";

/** The whole /inquiry page: empty state, list and form, or the confirmation. */
export function InquiryView({ products }: { products: InquiryProduct[] }) {
  const ready = useInquiryReady();
  const lines = useInquiryLines();
  const [sent, setSent] = useState<SentInquiry | null>(null);
  const [lineErrors, setLineErrors] = useState<Record<number, string>>({});

  const resolved = useMemo<ResolvedLine[]>(() => {
    const bySlug = new Map(products.map((p) => [p.slug, p]));
    // Lines for pieces no longer in the collection are left out quietly.
    return lines.flatMap((line) => {
      const product = bySlug.get(line.productSlug);
      const colorway = product?.colorways.find((c) => c.id === line.colorway);
      return product && colorway ? [{ line, product, colorway }] : [];
    });
  }, [lines, products]);

  // After sending, the confirmation stays until something new is added.
  if (sent && resolved.length === 0) return <InquiryConfirmation sent={sent} />;

  // Wait for localStorage before choosing between "empty" and "list", so neither flashes.
  if (!ready) return <div aria-busy="true" className="min-h-[70vh]" />;

  if (resolved.length === 0) {
    return (
      <EmptyState title="Nothing here yet" action={{ href: "/catalog", label: "View the catalog" }}>
        <p>
          Choose pieces from the catalog, noting your size and colorway, then send us your inquiry. We reply personally
          with pricing and the next steps.
        </p>
      </EmptyState>
    );
  }

  const count = resolved.length;

  return (
    <div className="px-gutter mx-auto max-w-[1280px] py-14 lg:py-20">
      <header className="flex flex-col gap-3 border-b border-line pb-10 lg:pb-12">
        <h1 className="display-lg">Your inquiry</h1>
        <p className="max-w-[64ch] text-pretty text-secondary">
          Review your pieces, then tell us where to reach you. We reply personally with pricing and the next steps.
        </p>
      </header>

      <div className="mt-10 grid gap-12 lg:mt-12 lg:grid-cols-12 lg:gap-16">
        {/* The pieces: a summary panel on linen. First on phones, beside the form on desktop. */}
        <aside aria-labelledby="inquiry-list-title" className="lg:order-2 lg:col-span-5">
          <div className="bg-surface px-5 py-6 sm:px-7 sm:py-7 lg:sticky lg:top-[calc(var(--header-h)+32px)]">
            <div className="flex items-baseline justify-between border-b border-line-strong pb-3">
              <h2 id="inquiry-list-title" className="font-display text-[1.375rem] leading-tight text-ink">
                Your pieces
              </h2>
              <p className="label text-muted tabular-nums">
                {count} {count === 1 ? "piece" : "pieces"}
              </p>
            </div>
            <ul className="[&>li:last-child]:border-b-0 [&>li:last-child]:pb-0">
              {resolved.map((r, i) => (
                <InquiryLineItem key={r.line.id} resolved={r} error={lineErrors[i]} />
              ))}
            </ul>
          </div>
        </aside>

        {/* The form: the main task, on the left. */}
        <div className="lg:order-1 lg:col-span-7">
          <InquiryForm
            lines={resolved}
            onLineErrors={setLineErrors}
            onSent={(s) => {
              setSent(s);
              clearInquiry();
            }}
          />
        </div>
      </div>
    </div>
  );
}
