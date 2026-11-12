import type { SubmitResult } from "@/lib/data/submissions";
import { sendEmail } from "@/lib/email/send";
import { renderContactEmail } from "@/lib/email/templates/contact";
import { contactSubmissionSchema, toFieldErrors } from "@/lib/inquiry/schema";

const json = (body: SubmitResult, status = 200) => Response.json(body, { status });

/** Receives a contact message, validates it again, and emails it to the brand. */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, reason: "invalid", fieldErrors: { form: "Something went wrong reading your message." } }, 400);
  }

  const submittedAt = new Date().toISOString();

  if (body && typeof body === "object" && "website" in body && (body as { website?: unknown }).website) {
    return json({ ok: true, submittedAt });
  }

  const parsed = contactSubmissionSchema.safeParse(body);
  if (!parsed.success) {
    return json({ ok: false, reason: "invalid", fieldErrors: toFieldErrors(parsed.error) }, 400);
  }

  const sent = await sendEmail({ ...renderContactEmail(parsed.data, submittedAt), replyTo: parsed.data.email });
  if (!sent.ok) return json({ ok: false, reason: "failed" }, 502);

  return json({ ok: true, submittedAt });
}
