import type { CSSProperties } from "react";
import { brandMedia } from "@/lib/images";

type LogoProps = {
  /** "ink" on light pages, "light" over imagery. */
  tone?: "ink" | "light";
  /** Stacked (mark above wordmark) for the home hero; inline for the header. */
  layout?: "inline" | "stacked";
  /** Show the "Le Faon" wordmark beside or below the mark. */
  wordmark?: boolean;
  className?: string;
};

/** The fawn PNG is used as a mask, so the mark always takes the wordmark's exact color. */
const markStyle: CSSProperties = {
  maskImage: `url(${brandMedia.fawn})`,
  maskSize: "contain",
  maskRepeat: "no-repeat",
  maskPosition: "center",
};

/**
 * The fawn mark and "Le Faon" wordmark.
 * The source mark is small (57×91), so keep it at 48px tall or less to stay sharp.
 */
export function Logo({
  tone = "ink",
  layout = "inline",
  wordmark = true,
  className = "",
}: LogoProps) {
  const stacked = layout === "stacked";
  const color = tone === "light" ? "text-on-inverted" : "text-ink";

  return (
    <span
      className={`inline-flex items-center ${stacked ? "flex-col gap-5" : "gap-2.5"} ${color} ${className}`}
    >
      <span
        aria-hidden="true"
        style={markStyle}
        className={`block aspect-[57/91] bg-current ${stacked ? "h-11 lg:h-12" : "h-7"}`}
      />
      {wordmark && (
        <span
          className={`font-display font-light tracking-[0.06em] ${
            stacked
              ? "text-[2rem] lg:text-[2.5rem]"
              : "text-[1.375rem] lg:text-[1.5rem]"
          } leading-none`}
        >
          Le Faon
        </span>
      )}
    </span>
  );
}
