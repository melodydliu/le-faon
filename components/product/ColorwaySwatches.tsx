"use client";

import Image from "next/image";
import type { Colorway } from "@/lib/types";

type Props = {
  colorways: Colorway[];
  value: string;
  onChange: (id: string) => void;
  name: string;
};

/** Colorways as small color chips. Native radios underneath, so keyboard and screen readers just work. */
export function ColorwaySwatches({ colorways, value, onChange, name }: Props) {
  const selected = colorways.find((c) => c.id === value);
  return (
    <fieldset>
      <legend className="label text-secondary">
        Color <span aria-hidden="true">·</span> <span className="text-ink">{selected?.name}</span>
      </legend>
      <div className="mt-4 flex flex-wrap gap-4">
        {colorways.map((c) => {
          const checked = c.id === value;
          return (
            <label key={c.id} className="group flex cursor-pointer flex-col items-center gap-2">
              <input
                type="radio"
                name={name}
                value={c.id}
                checked={checked}
                onChange={() => onChange(c.id)}
                className="peer sr-only"
              />
              <span
                className={`block w-12 outline-1 outline-offset-[3px] transition-[outline-color] duration-300 peer-focus-visible:outline-ink ${
                  checked ? "outline-accent" : "outline-transparent group-hover:outline-line-strong"
                }`}
                style={{ outlineStyle: "solid" }}
              >
                <Image
                  src={c.swatch.src}
                  alt=""
                  width={c.swatch.width}
                  height={c.swatch.height}
                  sizes="48px"
                  placeholder="blur"
                  blurDataURL={c.swatch.blurDataURL}
                  className="block h-auto w-full border border-line"
                />
              </span>
              <span className={`text-[10px] tracking-[0.16em] uppercase ${checked ? "text-ink" : "text-secondary"}`}>
                {c.name}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
