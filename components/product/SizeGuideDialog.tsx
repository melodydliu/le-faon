"use client";

import { useRef } from "react";
import { X } from "lucide-react";
import type { SizeGuide } from "@/lib/types";

/** "Size guide" link that opens a sheet (mobile) or dialog (desktop) with the chart. */
export function SizeGuideDialog({ guide }: { guide: SizeGuide }) {
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => dialog.current?.showModal()}
        className="link-quiet -my-3 inline-flex min-h-11 items-center text-[12px] text-secondary"
      >
        Size guide
      </button>

      <dialog
        ref={dialog}
        aria-labelledby="size-guide-title"
        onClick={(e) => {
          // Click on the backdrop closes.
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
        className="sheet m-0 mt-auto w-full max-w-none bg-bg p-0 text-ink backdrop:bg-[rgb(42_37_20/0.35)] lg:m-auto lg:max-w-xl"
      >
        <div className="px-gutter pt-6 pb-[max(2rem,env(safe-area-inset-bottom))] lg:px-10 lg:py-10">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h2 id="size-guide-title" className="display-md mt-1">
                Size guide
              </h2>
            </div>
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              aria-label="Close size guide"
              className="-mr-3 inline-flex min-h-11 min-w-11 items-center justify-center"
            >
              <X aria-hidden="true" size={20} strokeWidth={1} />
            </button>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[20rem] border-collapse text-[13px] tabular-nums">
              <caption className="sr-only">Body measurements by US size, in {guide.unit === "in" ? "inches" : "centimetres"}</caption>
              <thead>
                <tr className="border-b border-line-strong">
                  <th scope="col" className="label py-3 pr-4 text-left font-medium text-secondary">
                    US
                  </th>
                  {guide.columns.map((c) => (
                    <th key={c} scope="col" className="label py-3 pr-4 text-left font-medium text-secondary">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {guide.rows.map((row) => (
                  <tr key={row.size} className="border-b border-line">
                    <th scope="row" className="py-3 pr-4 text-left font-normal text-ink">
                      {row.size}
                    </th>
                    {row.values.map((v, i) => (
                      <td key={guide.columns[i]} className="py-3 pr-4 text-secondary">
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 max-w-[52ch] text-[13px] text-secondary">{guide.note}</p>
          {guide.placeholder && (
            <p className="mt-3 text-[12px] text-muted italic">These measurements are placeholders while we confirm our own.</p>
          )}
        </div>
      </dialog>
    </>
  );
}
