"use client";

import { motion } from "motion/react";
import Image from "next/image";
import type { Colorway } from "@/lib/types";

type Props = {
  colorways: Colorway[];
  value: string;
  onChange: (id: string) => void;
  /** Hover or focus on a swatch: a chance to start loading its photos. */
  onPreview?: (id: string) => void;
  name: string;
};

/** Colorways as small color chips. Native radios underneath, so keyboard and screen readers just work. */
export function ColorwaySwatches({ colorways, value, onChange, onPreview, name }: Props) {
  const selected = colorways.find((c) => c.id === value);
  return (
    <fieldset>
      <legend className="label text-secondary">
        Color <span aria-hidden="true">·</span>{" "}
        <motion.span
          key={selected?.id}
          className="inline-block text-ink"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {selected?.name}
        </motion.span>
      </legend>
      <div className="mt-4 flex flex-wrap gap-4">
        {colorways.map((c) => {
          const checked = c.id === value;
          return (
            <label
              key={c.id}
              className="group block cursor-pointer"
              onPointerEnter={() => onPreview?.(c.id)}
              onFocus={() => onPreview?.(c.id)}
            >
              <input
                type="radio"
                name={name}
                value={c.id}
                checked={checked}
                onChange={() => onChange(c.id)}
                aria-label={c.name}
                className="peer sr-only"
              />
              <span
                className={`block w-12 outline-1 outline-offset-[3px] transition-[outline-color] duration-500 peer-focus-visible:outline-ink ${
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
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
