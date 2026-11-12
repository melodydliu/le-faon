"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import type { ImageAsset } from "@/lib/types";

export type AddedNotice = {
  /** Changes on every add, so the sheet re-announces and its timer restarts. */
  key: number;
  status: "added" | "already-there";
  name: string;
  detail: string;
  thumb: ImageAsset;
};

const AUTO_DISMISS_MS = 9000;

/** Small confirmation after adding: thumbnail, a line of text, and two quiet choices. */
export function AddedSheet({ notice, onDismiss }: { notice: AddedNotice | null; onDismiss: () => void }) {
  useEffect(() => {
    if (!notice) return;
    const t = window.setTimeout(onDismiss, AUTO_DISMISS_MS);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onDismiss();
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [notice, onDismiss]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-[calc(76px+env(safe-area-inset-bottom))] z-40 flex justify-center px-3 lg:inset-x-auto lg:top-[calc(var(--header-h)+16px)] lg:right-[var(--gutter)] lg:bottom-auto lg:px-0"
    >
      <AnimatePresence>
        {notice && (
          <motion.div
            key={notice.key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto w-full max-w-[400px] border border-line bg-bg p-4 shadow-[0_12px_40px_-16px_rgb(42_37_20/0.25)]"
          >
            <div className="flex gap-4">
              <div className="w-14 shrink-0 bg-surface">
                <Image
                  src={notice.thumb.src}
                  alt=""
                  width={notice.thumb.width}
                  height={notice.thumb.height}
                  sizes="56px"
                  className="h-auto w-full"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="label text-secondary">
                  {notice.status === "added" ? "Added to your inquiry" : "Already in your inquiry"}
                </p>
                <p className="mt-1 font-display text-[1.25rem] leading-tight">{notice.name}</p>
                <p className="text-[13px] text-secondary">{notice.detail}</p>
              </div>
            </div>
            {/* Smaller, tighter labels so both actions sit comfortably inside their buttons. */}
            <div className="mt-4 grid grid-cols-2 gap-2 [--label-size:10.5px] [--label-tracking:0.14em]">
              <Link
                href="/inquiry"
                className="label inline-flex min-h-11 items-center justify-center bg-inverted text-on-inverted transition-opacity duration-300 hover:opacity-90"
              >
                View inquiry
              </Link>
              <button
                type="button"
                onClick={onDismiss}
                className="label inline-flex min-h-11 items-center justify-center border border-line-strong text-ink transition-colors duration-300 hover:bg-surface"
              >
                Keep browsing
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
