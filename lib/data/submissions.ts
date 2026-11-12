/**
 * Sending inquiries and contact messages from the browser.
 * The route handlers (app/api/inquiry, app/api/contact) validate again and send email.
 */

import type { ContactSubmission, FieldErrors, InquirySubmission } from "@/lib/inquiry/schema";

export type SubmitResult =
  | { ok: true; submittedAt: string }
  | { ok: false; reason: "invalid"; fieldErrors: FieldErrors }
  | { ok: false; reason: "failed" };

async function post(url: string, body: unknown): Promise<SubmitResult> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = (await res.json().catch(() => null)) as SubmitResult | null;
    if (data && typeof data === "object" && "ok" in data) return data;
    return { ok: false, reason: "failed" };
  } catch {
    return { ok: false, reason: "failed" };
  }
}

export function submitInquiry(inquiry: InquirySubmission): Promise<SubmitResult> {
  return post("/api/inquiry", inquiry);
}

export function sendContact(message: ContactSubmission): Promise<SubmitResult> {
  return post("/api/contact", message);
}
