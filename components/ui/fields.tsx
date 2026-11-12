"use client";

import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

/** Hairline-underlined form fields with calm inline errors. 16px text so phones don't zoom. */

const control =
  "block w-full appearance-none rounded-none border-0 border-b bg-transparent px-0 py-2.5 text-[16px] text-ink placeholder:text-muted transition-colors duration-300 focus:outline-none focus-visible:outline-none";

function lineColor(error?: string) {
  return error ? "border-ink" : "border-line-strong focus:border-ink";
}

type FieldShellProps = { id: string; label: string; optional?: boolean; error?: string; children: ReactNode; hint?: string };

function FieldShell({ id, label, optional, error, hint, children }: FieldShellProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="label text-secondary">
        {label}
        {optional && <span className="ml-2 tracking-normal normal-case text-muted">(optional)</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-[13px] text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-[13px] text-ink">
          <span aria-hidden="true">— </span>
          {error}
        </p>
      )}
    </div>
  );
}

function describedBy(id: string, error?: string, hint?: string) {
  return error ? `${id}-error` : hint ? `${id}-hint` : undefined;
}

type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id"> & {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  hint?: string;
};

export function TextField({ id, label, optional, error, hint, className = "", ...rest }: TextFieldProps) {
  return (
    <FieldShell id={id} label={label} optional={optional} error={error} hint={hint}>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={`${control} ${lineColor(error)} ${className}`}
        {...rest}
      />
    </FieldShell>
  );
}

type TextAreaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> & {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  hint?: string;
};

export function TextArea({ id, label, optional, error, hint, className = "", rows = 3, ...rest }: TextAreaProps) {
  return (
    <FieldShell id={id} label={label} optional={optional} error={error} hint={hint}>
      <textarea
        id={id}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={`${control} ${lineColor(error)} resize-y leading-relaxed ${className}`}
        {...rest}
      />
    </FieldShell>
  );
}

type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "id"> & { id: string; label: string };

/** Compact select used inside inquiry lines (colorway, size). */
export function InlineSelect({ id, label, children, className = "", ...rest }: SelectProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <label htmlFor={id} className="text-[10px] tracking-[0.16em] text-muted uppercase">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          className={`${control} min-h-11 border-line-strong pr-6 text-[15px] focus:border-ink ${className}`}
          {...rest}
        >
          {children}
        </select>
        <span aria-hidden="true" className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 text-[10px] text-secondary">
          ▾
        </span>
      </div>
    </div>
  );
}

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "type"> & {
  id: string;
  children: ReactNode;
  error?: string;
};

export function Checkbox({ id, children, error, ...rest }: CheckboxProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="flex cursor-pointer gap-3.5 py-2 text-[15px] text-secondary">
        <span className="relative mt-[3px] h-[18px] w-[18px] shrink-0">
          <input
            id={id}
            type="checkbox"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${id}-error` : undefined}
            className={`peer absolute inset-0 m-0 h-full w-full cursor-pointer appearance-none border bg-transparent transition-colors duration-300 checked:border-ink checked:bg-inverted focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              error ? "border-ink" : "border-line-strong"
            }`}
            {...rest}
          />
          <svg
            aria-hidden="true"
            viewBox="0 0 18 18"
            className="pointer-events-none absolute inset-0 h-full w-full opacity-0 transition-opacity duration-300 peer-checked:opacity-100"
          >
            <path d="M4.5 9.5l3 3 6-7" fill="none" stroke="var(--on-inverted)" strokeWidth="1.25" />
          </svg>
        </span>
        <span>{children}</span>
      </label>
      {error && (
        <p id={`${id}-error`} className="pl-8 text-[13px] text-ink">
          <span aria-hidden="true">— </span>
          {error}
        </p>
      )}
    </div>
  );
}
