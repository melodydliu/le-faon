"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { InlineSelect } from "@/components/ui/fields";
import { NOTE_MAX } from "@/lib/inquiry/schema";
import { removeFromInquiry, updateInquiryLine } from "@/lib/inquiry/store";
import { formatSize } from "@/lib/sizes";
import type { ResolvedLine } from "./types";

/**
 * One piece in the inquiry, shown as a quiet summary (name, color, size, note).
 * "Edit" opens the color, size and note fields in place; a line with an error opens itself.
 */
export function InquiryLineItem({ resolved, error }: { resolved: ResolvedLine; error?: string }) {
  const { line, product, colorway } = resolved;
  const base = `line-${line.id}`;
  const [editing, setEditing] = useState(false);
  const open = editing || Boolean(error);

  return (
    <li className="grid grid-cols-[64px_1fr] gap-x-4 border-b border-line py-5 sm:grid-cols-[72px_1fr] sm:gap-x-5">
      <Link href={`/catalog/${product.slug}`} className="block self-start bg-surface" tabIndex={-1} aria-hidden="true">
        <Image
          src={colorway.thumb.src}
          alt=""
          width={colorway.thumb.width}
          height={colorway.thumb.height}
          sizes="72px"
          placeholder="blur"
          blurDataURL={colorway.thumb.blurDataURL}
          className="h-auto w-full"
        />
      </Link>

      <div className="flex min-w-0 flex-col gap-1">
        <div className="flex items-start justify-between gap-3">
          <Link href={`/catalog/${product.slug}`} className="font-display text-[1.25rem] leading-tight">
            {product.name}
          </Link>
          <div className="-mt-2.5 -mr-1 flex shrink-0 gap-3 text-[13px] text-secondary">
            <button
              type="button"
              onClick={() => setEditing((v) => !v)}
              aria-expanded={open}
              aria-controls={`${base}-edit`}
              className="link-quiet inline-flex min-h-11 items-center px-1"
            >
              {open ? "Done" : "Edit"}
              <span className="sr-only"> {product.name}</span>
            </button>
            <button
              type="button"
              onClick={() => removeFromInquiry(line.id)}
              aria-label={`Remove ${product.name} from your inquiry`}
              className="link-quiet inline-flex min-h-11 items-center px-1"
            >
              Remove
            </button>
          </div>
        </div>

        {!open && (
          <>
            <p className="text-[14px] text-secondary">
              {colorway.name} <span aria-hidden="true">·</span> {formatSize(product.kind, line.size)}
            </p>
            {line.note && <p className="text-[14px] text-muted italic">“{line.note}”</p>}
          </>
        )}

        {open && (
          <div id={`${base}-edit`} className="mt-2 flex flex-col gap-3">
            {/* Only the choices this piece actually has: a fragrance has one bottle, so just the note. */}
            {(product.colorways.length > 1 || product.sizes.length > 1) && (
            <div className="grid grid-cols-2 gap-4">
              {product.colorways.length > 1 && (
              <InlineSelect
                id={`${base}-colorway`}
                label="Color"
                value={line.colorway}
                onChange={(e) => updateInquiryLine(line.id, { colorway: e.target.value })}
              >
                {product.colorways.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </InlineSelect>
              )}
              {product.sizes.length > 1 && (
              <InlineSelect
                id={`${base}-size`}
                label="Size"
                value={line.size}
                onChange={(e) => updateInquiryLine(line.id, { size: e.target.value })}
              >
                {product.sizes.map((s) => (
                  <option key={s} value={s}>
                    {formatSize(product.kind, s)}
                  </option>
                ))}
              </InlineSelect>
              )}
            </div>
            )}

            <div className="flex flex-col gap-0.5">
              <label htmlFor={`${base}-note`} className="text-[10px] tracking-[0.16em] text-muted uppercase">
                Note <span className="tracking-normal normal-case">(optional)</span>
              </label>
              <textarea
                id={`${base}-note`}
                rows={1}
                maxLength={NOTE_MAX}
                value={line.note}
                onChange={(e) => updateInquiryLine(line.id, { note: e.target.value })}
                placeholder="Anything we should know about this piece?"
                className="block min-h-11 w-full resize-y rounded-none border-0 border-b border-line-strong bg-transparent px-0 py-2.5 text-[15px] leading-relaxed text-ink placeholder:text-muted focus:border-ink focus:outline-none [field-sizing:content]"
              />
            </div>
          </div>
        )}

        {error && (
          <p className="text-[13px] text-ink">
            <span aria-hidden="true">— </span>
            {error}
          </p>
        )}
      </div>
    </li>
  );
}
