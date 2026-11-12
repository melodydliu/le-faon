"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { TextArea, TextField } from "@/components/ui/fields";
import { sendContact } from "@/lib/data/submissions";
import { contactSubmissionSchema, toFieldErrors, type FieldErrors } from "@/lib/inquiry/schema";
import { site } from "@/lib/site";

const ids: Record<string, string> = { name: "contact-name", email: "contact-email", message: "contact-message" };

/** Name, email, message. One button, a quiet confirmation. */
export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "", website: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  const set = (key: keyof typeof form) => (value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => {
      if (!(key in e)) return e;
      const next = { ...e };
      delete next[key];
      return next;
    });
  };

  function showErrors(fieldErrors: FieldErrors) {
    setErrors(fieldErrors);
    const first = Object.keys(ids).find((k) => k in fieldErrors);
    if (first) document.getElementById(ids[first])?.focus();
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    const check = contactSubmissionSchema.safeParse(form);
    if (!check.success) return showErrors(toFieldErrors(check.error));

    setStatus("sending");
    const result = await sendContact(form);
    if (result.ok) {
      setStatus("sent");
      return;
    }
    if (result.reason === "invalid") {
      setStatus("idle");
      showErrors(result.fieldErrors);
      return;
    }
    setStatus("failed");
  }

  const sending = status === "sending";

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "sent" ? (
        <motion.div
          key="sent"
          role="status"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-4 border-t border-line-strong pt-8"
        >
          <p className="display-md">Thank you, {form.name.split(/\s+/)[0]}</p>
          <p className="max-w-[40ch] text-secondary">
            Your message is with us. We reply personally, usually within a few days.
          </p>
          <button
            type="button"
            onClick={() => {
              setForm({ name: "", email: "", message: "", website: "" });
              setStatus("idle");
            }}
            className="label link-quiet mt-2 inline-flex min-h-11 items-center self-start"
          >
            Write another message
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          noValidate
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-7"
        >
          <TextField
            id="contact-name"
            label="Name"
            autoComplete="name"
            value={form.name}
            onChange={(e) => set("name")(e.target.value)}
            error={errors.name}
          />
          <TextField
            id="contact-email"
            label="Email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => set("email")(e.target.value)}
            error={errors.email}
          />
          <TextArea
            id="contact-message"
            label="Message"
            rows={5}
            value={form.message}
            onChange={(e) => set("message")(e.target.value)}
            error={errors.message}
          />

          <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label htmlFor="contact-website">Website</label>
            <input
              id="contact-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={(e) => set("website")(e.target.value)}
            />
          </div>

          {status === "failed" && (
            <div role="alert" className="border-l border-line-strong pl-4 text-[14px] text-secondary">
              <p className="text-ink">Your message didn’t reach us just now.</p>
              <p className="mt-1">
                Please try again in a moment, or write to us at{" "}
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
              "Send message"
            )}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
