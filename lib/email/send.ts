/**
 * The one place that sends email. Swap the provider here and nothing else changes.
 *
 * Env:
 *   RESEND_API_KEY      If empty, emails are logged to the server console and treated as sent.
 *   INQUIRY_TO_EMAIL    Inbox for inquiries and contact messages (comma-separate for several).
 *   INQUIRY_FROM_EMAIL  Sender. onboarding@resend.dev until lefaon.com is verified in Resend.
 */

import { Resend } from "resend";

export type OutgoingEmail = {
  subject: string;
  html: string;
  text: string;
  /** The visitor's address, so the brand can simply hit reply. */
  replyTo?: string;
};

export type SendResult = { ok: true; id?: string; logged?: boolean } | { ok: false; error: string };

const SENDER_NAME = "Le Faon";

export async function sendEmail(email: OutgoingEmail): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.INQUIRY_TO_EMAIL?.trim();
  const from = process.env.INQUIRY_FROM_EMAIL?.trim();

  if (!apiKey) {
    logToConsole(email, to);
    return { ok: true, logged: true };
  }

  if (!to || !from) {
    console.error("[email] RESEND_API_KEY is set but INQUIRY_TO_EMAIL or INQUIRY_FROM_EMAIL is missing.");
    return { ok: false, error: "Email is not configured" };
  }

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: from.includes("<") ? from : `${SENDER_NAME} <${from}>`,
      to: to.split(",").map((s) => s.trim()).filter(Boolean),
      replyTo: email.replyTo,
      subject: email.subject,
      html: email.html,
      text: email.text,
    });
    if (error) {
      console.error("[email] Resend rejected the message:", error.name, error.message);
      return { ok: false, error: error.message };
    }
    return { ok: true, id: data?.id };
  } catch (err) {
    console.error("[email] Sending failed:", err);
    return { ok: false, error: "Sending failed" };
  }
}

function logToConsole(email: OutgoingEmail, to: string | undefined) {
  const rule = "─".repeat(64);
  console.info(
    [
      "",
      rule,
      "[email] RESEND_API_KEY not set — logging instead of sending.",
      `To:       ${to || "(INQUIRY_TO_EMAIL not set)"}`,
      `Reply-To: ${email.replyTo ?? "—"}`,
      `Subject:  ${email.subject}`,
      rule,
      email.text,
      rule,
      "",
    ].join("\n"),
  );
}
