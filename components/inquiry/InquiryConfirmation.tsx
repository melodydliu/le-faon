"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import type { SentInquiry } from "./types";

/** Shown after a successful inquiry: thanks, when to expect a reply, and a summary of what was sent. */
export function InquiryConfirmation({ sent }: { sent: SentInquiry }) {
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    heading.current?.focus();
  }, []);

  const firstName = sent.name.split(/\s+/)[0];
  const s = sent.shipping;
  const address = [s.line1, s.line2, `${s.city}, ${s.region} ${s.postalCode}`, s.country].filter(Boolean);

  return (
    <section className="px-gutter mx-auto max-w-[44rem] py-20 lg:py-28">
      <div className="flex flex-col items-center gap-5 text-center">
        <h1 ref={heading} tabIndex={-1} className="display-lg outline-none">
          Thank you, {firstName}
        </h1>
        <p className="max-w-[56ch] text-pretty text-secondary">
          Your inquiry is with us. We will be in touch within 1–3 business days with pricing and the next steps.
        </p>
      </div>

      <div className="mt-16 flex flex-col gap-10">
        <div>
          <h2 className="label border-b border-line-strong pb-3 text-secondary">
            {sent.items.length === 1 ? "Your piece" : `Your ${sent.items.length} pieces`}
          </h2>
          <ul>
            {sent.items.map((item) => (
              <li key={`${item.slug}-${item.colorwayName}-${item.size}`} className="flex gap-4 border-b border-line py-5">
                <div className="w-16 shrink-0 bg-surface">
                  <Image
                    src={item.thumb.src}
                    alt=""
                    width={item.thumb.width}
                    height={item.thumb.height}
                    sizes="64px"
                    className="h-auto w-full"
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-display text-[1.25rem] leading-tight">{item.name}</p>
                  <p className="text-[14px] text-secondary">
                    {item.colorwayName} · US {item.size}
                  </p>
                  {item.note && <p className="mt-1 text-[14px] text-secondary italic">“{item.note}”</p>}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <dl className="grid gap-8 sm:grid-cols-2">
          <div>
            <dt className="label border-b border-line-strong pb-3 text-secondary">Contact</dt>
            <dd className="pt-3 text-[15px]">
              {sent.name}
              <br />
              {sent.email}
              <br />
              {sent.phone}
            </dd>
          </div>
          <div>
            <dt className="label border-b border-line-strong pb-3 text-secondary">Ship to</dt>
            <dd className="pt-3 text-[15px]">
              {address.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </dd>
          </div>
          {sent.notes && (
            <div className="sm:col-span-2">
              <dt className="label border-b border-line-strong pb-3 text-secondary">Notes</dt>
              <dd className="pt-3 text-[15px] whitespace-pre-line">{sent.notes}</dd>
            </div>
          )}
        </dl>

        <div className="text-center">
          <Link href="/catalog" className="label link-quiet inline-flex min-h-11 items-center">
            Return to the catalog
          </Link>
        </div>
      </div>
    </section>
  );
}
