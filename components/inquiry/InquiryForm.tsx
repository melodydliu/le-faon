"use client";

import { useState, type FormEvent } from "react";
import { Checkbox, TextArea, TextField } from "@/components/ui/fields";
import { submitInquiry } from "@/lib/data/submissions";
import { inquirySubmissionSchema, toFieldErrors, type FieldErrors, type InquirySubmission } from "@/lib/inquiry/schema";
import { site } from "@/lib/site";
import type { ResolvedLine, SentInquiry } from "./types";

type FormState = {
  name: string;
  email: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  notes: string;
  acknowledged: boolean;
  website: string; // honeypot
};

const initial: FormState = {
  name: "",
  email: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  region: "",
  postalCode: "",
  country: "United States",
  notes: "",
  acknowledged: false,
  website: "",
};

/** Field paths from the schema → input ids, so errors land on the right field. */
const fieldIds: Record<string, string> = {
  name: "inq-name",
  email: "inq-email",
  phone: "inq-phone",
  "shipping.line1": "inq-line1",
  "shipping.line2": "inq-line2",
  "shipping.city": "inq-city",
  "shipping.region": "inq-region",
  "shipping.postalCode": "inq-postal",
  "shipping.country": "inq-country",
  notes: "inq-notes",
  acknowledged: "inq-ack",
};

type Props = {
  lines: ResolvedLine[];
  /** Errors for individual lines (keyed by index), shown in the list. */
  onLineErrors: (errors: Record<number, string>) => void;
  onSent: (sent: SentInquiry) => void;
};

export function InquiryForm({ lines, onLineErrors, onSent }: Props) {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "failed">("idle");

  const set =
    <K extends keyof FormState>(key: K) =>
    (value: FormState[K]) => {
      setForm((f) => ({ ...f, [key]: value }));
      setErrors((e) => {
        const path = Object.keys(fieldIds).find((p) => p === key || p === `shipping.${key}`) ?? key;
        if (!(path in e)) return e;
        const next = { ...e };
        delete next[path];
        return next;
      });
    };

  function payload(): InquirySubmission {
    return {
      items: lines.map(({ line }) => ({
        productSlug: line.productSlug,
        colorway: line.colorway,
        size: line.size,
        note: line.note,
      })),
      name: form.name,
      email: form.email,
      phone: form.phone,
      shipping: {
        line1: form.line1,
        line2: form.line2,
        city: form.city,
        region: form.region,
        postalCode: form.postalCode,
        country: form.country,
      },
      notes: form.notes,
      acknowledged: form.acknowledged as true,
      website: form.website,
    };
  }

  function showErrors(fieldErrors: FieldErrors) {
    setErrors(fieldErrors);
    const lineErrors: Record<number, string> = {};
    for (const [path, message] of Object.entries(fieldErrors)) {
      const m = path.match(/^items\.(\d+)/);
      if (m) lineErrors[Number(m[1])] ??= message;
    }
    onLineErrors(lineErrors);
    const first = Object.keys(fieldIds).find((p) => p in fieldErrors);
    if (first) document.getElementById(fieldIds[first])?.focus();
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "sending") return;

    const data = payload();
    const check = inquirySubmissionSchema.safeParse(data);
    if (!check.success) {
      showErrors(toFieldErrors(check.error));
      return;
    }

    setStatus("sending");
    const result = await submitInquiry(data);

    if (result.ok) {
      onLineErrors({});
      onSent({
        name: check.data.name,
        email: check.data.email,
        phone: check.data.phone,
        shipping: check.data.shipping,
        notes: check.data.notes,
        items: lines.map(({ line, product, colorway }) => ({
          slug: product.slug,
          name: product.name,
          colorwayName: colorway.name,
          size: line.size,
          note: line.note.trim(),
          thumb: colorway.thumb,
        })),
        submittedAt: result.submittedAt,
      });
      return;
    }

    if (result.reason === "invalid") {
      setStatus("idle");
      showErrors(result.fieldErrors);
      return;
    }
    setStatus("failed");
  }

  const hasErrors = Object.keys(errors).length > 0;
  const sending = status === "sending";

  return (
    <form onSubmit={handleSubmit} noValidate aria-labelledby="inquiry-form-title" className="flex flex-col gap-10">
      <h2 id="inquiry-form-title" className="sr-only">
        Your details
      </h2>

      <fieldset className="flex flex-col gap-6">
        <legend className="mb-4 w-full font-display text-[1.375rem] leading-tight text-ink">Your details</legend>
        <TextField
          id="inq-name"
          label="Name"
          autoComplete="name"
          value={form.name}
          onChange={(e) => set("name")(e.target.value)}
          error={errors.name}
        />
        <div className="grid gap-6 sm:grid-cols-2">
          <TextField
            id="inq-email"
            label="Email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => set("email")(e.target.value)}
            error={errors.email}
          />
          <TextField
            id="inq-phone"
            label="Phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => set("phone")(e.target.value)}
            error={errors.phone}
          />
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-6">
        <legend className="mb-4 w-full font-display text-[1.375rem] leading-tight text-ink">Shipping</legend>
        <TextField
          id="inq-line1"
          label="Address"
          autoComplete="address-line1"
          value={form.line1}
          onChange={(e) => set("line1")(e.target.value)}
          error={errors["shipping.line1"]}
        />
        <TextField
          id="inq-line2"
          label="Apartment, suite"
          optional
          autoComplete="address-line2"
          value={form.line2}
          onChange={(e) => set("line2")(e.target.value)}
          error={errors["shipping.line2"]}
        />
        <div className="grid gap-6 sm:grid-cols-2">
          <TextField
            id="inq-city"
            label="City"
            autoComplete="address-level2"
            value={form.city}
            onChange={(e) => set("city")(e.target.value)}
            error={errors["shipping.city"]}
          />
          <TextField
            id="inq-region"
            label="State / region"
            autoComplete="address-level1"
            value={form.region}
            onChange={(e) => set("region")(e.target.value)}
            error={errors["shipping.region"]}
          />
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <TextField
            id="inq-postal"
            label="Postal code"
            autoComplete="postal-code"
            value={form.postalCode}
            onChange={(e) => set("postalCode")(e.target.value)}
            error={errors["shipping.postalCode"]}
          />
          <TextField
            id="inq-country"
            label="Country"
            autoComplete="country-name"
            value={form.country}
            onChange={(e) => set("country")(e.target.value)}
            error={errors["shipping.country"]}
          />
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-6">
        <legend className="mb-4 w-full font-display text-[1.375rem] leading-tight text-ink">Anything else</legend>
        <TextArea
          id="inq-notes"
          label="Notes"
          optional
          rows={3}
          placeholder="Occasions, timing, questions about fit…"
          value={form.notes}
          onChange={(e) => set("notes")(e.target.value)}
          error={errors.notes}
        />
        <Checkbox
          id="inq-ack"
          checked={form.acknowledged}
          onChange={(e) => set("acknowledged")(e.target.checked)}
          error={errors.acknowledged}
        >
          I understand that each piece is made to order, and that pricing and turnaround time will vary.
        </Checkbox>

        {/* Honeypot: hidden from people and assistive tech; bots fill it in. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="inq-website">Website</label>
          <input
            id="inq-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(e) => set("website")(e.target.value)}
          />
        </div>
      </fieldset>

      <div className="flex flex-col gap-4">
        {hasErrors && (
          <p role="alert" className="text-[14px] text-ink">
            Please check the fields marked above.
          </p>
        )}
        {status === "failed" && (
          <div role="alert" className="border-l border-line-strong pl-4 text-[14px] text-secondary">
            <p className="text-ink">Your inquiry didn’t reach us just now.</p>
            <p className="mt-1">
              Everything you’ve written is still here. Please try again in a moment, or write to us at{" "}
              <span className="text-ink select-all">{site.contactEmail}</span>.
            </p>
          </div>
        )}
        <button
          type="submit"
          disabled={sending}
          aria-busy={sending}
          className="label inline-flex min-h-13 w-full items-center justify-center gap-3 bg-inverted px-8 text-on-inverted transition-opacity duration-300 hover:opacity-90 disabled:cursor-wait disabled:opacity-80 sm:w-auto sm:self-start"
        >
          {sending ? (
            <>
              <span aria-hidden="true" className="h-3 w-3 animate-spin rounded-full border border-on-inverted/40 border-t-on-inverted" />
              Sending
            </>
          ) : (
            "Submit inquiry"
          )}
        </button>
      </div>
    </form>
  );
}
