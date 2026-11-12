import { listProducts } from "@/lib/data/catalog";
import { sendEmail } from "@/lib/email/send";
import { renderInquiryEmail } from "@/lib/email/templates/inquiry";
import { resolveInquiry } from "@/lib/inquiry/resolve";
import { inquirySubmissionSchema, toFieldErrors } from "@/lib/inquiry/schema";
import type { SubmitResult } from "@/lib/data/submissions";

const json = (body: SubmitResult, status = 200) => Response.json(body, { status });

/** Receives an inquiry, validates it again, and emails it to the brand. */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, reason: "invalid", fieldErrors: { form: "Something went wrong reading your inquiry." } }, 400);
  }

  const submittedAt = new Date().toISOString();

  // Honeypot filled in: a bot. Answer as if it worked, send nothing.
  if (body && typeof body === "object" && "website" in body && (body as { website?: unknown }).website) {
    return json({ ok: true, submittedAt });
  }

  const parsed = inquirySubmissionSchema.safeParse(body);
  if (!parsed.success) {
    return json({ ok: false, reason: "invalid", fieldErrors: toFieldErrors(parsed.error) }, 400);
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
  const resolved = resolveInquiry(parsed.data, await listProducts(), submittedAt, baseUrl);
  if (!resolved.ok) {
    return json({ ok: false, reason: "invalid", fieldErrors: resolved.fieldErrors }, 400);
  }

  const sent = await sendEmail({ ...renderInquiryEmail(resolved.inquiry), replyTo: parsed.data.email });
  if (!sent.ok) return json({ ok: false, reason: "failed" }, 502);

  return json({ ok: true, submittedAt });
}
