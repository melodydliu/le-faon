"use client";

import type { ReactNode, Ref } from "react";

type Props = {
  sizes: string[];
  /** The sizing system, named in the legend, e.g. "US". */
  system?: string;
  value: string | null;
  onChange: (size: string) => void;
  name: string;
  /** Gently highlights the row when someone tries to add without a size. */
  invalid?: boolean;
  /** Slot for the "Size guide" link, top right. */
  aside?: ReactNode;
  ref?: Ref<HTMLFieldSetElement>;
};

/** US sizes as plain numerals; a hairline circle marks the chosen one. Each is a 44px target. */
export function SizeSelector({ sizes, system, value, onChange, name, invalid = false, aside, ref }: Props) {
  return (
    <fieldset
      ref={ref}
      aria-describedby={invalid ? `${name}-hint` : undefined}
      className={`relative -mx-3 scroll-mt-32 px-3 py-3 transition-colors duration-500 ${invalid ? "bg-surface" : "bg-transparent"}`}
    >
      <legend className="label float-left text-secondary">
        Size
        {system && (
          <>
            {" "}
            <span aria-hidden="true">·</span> {system}
          </>
        )}
      </legend>
      {aside && <div className="absolute top-3 right-3">{aside}</div>}

      <div className="clear-both -ml-3 flex flex-wrap pt-2">
        {sizes.map((size) => {
          const checked = size === value;
          return (
            <label key={size} className="group relative grid h-11 w-11 cursor-pointer place-items-center">
              <input
                type="radio"
                name={name}
                value={size}
                checked={checked}
                onChange={() => onChange(size)}
                className="peer sr-only"
              />
              <span
                aria-hidden="true"
                className={`absolute h-8 w-8 rounded-full border transition-colors duration-300 peer-focus-visible:border-accent ${
                  checked ? "border-ink" : "border-transparent group-hover:border-line-strong"
                }`}
              />
              <span className={`relative text-[13px] tabular-nums ${checked ? "text-ink" : "text-secondary"}`}>
                {size}
              </span>
            </label>
          );
        })}
      </div>
      <p
        id={`${name}-hint`}
        aria-live="polite"
        className={`text-[13px] text-ink transition-opacity duration-500 ${invalid ? "mt-1 opacity-100" : "h-0 overflow-hidden opacity-0"}`}
      >
        {invalid ? "Please choose a size first." : ""}
      </p>
    </fieldset>
  );
}
