import type { ValidContactSubmission } from "@/lib/inquiry/schema";
import { emailDocument, emailStyles, escapeHtml, escapeMultiline, formatTimestamp, section } from "./layout";

/** A contact-form message for the brand's inbox. */
export function renderContactEmail(msg: ValidContactSubmission, submittedAt: string) {
  const subject = `Message from ${msg.name}`;
  const when = formatTimestamp(submittedAt);

  const html = emailDocument(
    subject,
    `
    <tr><td>
      <div style="${emailStyles.label}">Contact form</div>
      <h1 style="${emailStyles.title}padding-top:8px;">${escapeHtml(msg.name)}</h1>
      <div style="${emailStyles.body}padding-top:4px;">${escapeHtml(msg.email)}</div>
    </td></tr>
    ${section("Message", escapeMultiline(msg.message))}
    ${section("Received", escapeHtml(when))}
    `,
  );

  const text = [
    `MESSAGE FROM ${msg.name} <${msg.email}>`,
    "",
    msg.message,
    "",
    `RECEIVED ${when}`,
    "",
    `Reply to this email to write to ${msg.name} directly.`,
  ].join("\n");

  return { subject, html, text };
}
