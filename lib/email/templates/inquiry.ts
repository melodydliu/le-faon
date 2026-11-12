import type { ResolvedInquiry } from "@/lib/inquiry/resolve";
import { emailColors, emailDocument, emailStyles, escapeHtml, escapeMultiline, formatTimestamp, section } from "./layout";

/** The email the brand receives for each inquiry: HTML plus a plain-text version. */
export function renderInquiryEmail(inq: ResolvedInquiry) {
  const count = inq.items.length;
  const subject = `New inquiry: ${inq.name} · ${count} ${count === 1 ? "piece" : "pieces"}`;
  const when = formatTimestamp(inq.submittedAt);
  const s = inq.shipping;
  const addressLines = [s.line1, s.line2, `${s.city}, ${s.region} ${s.postalCode}`, s.country].filter(Boolean) as string[];

  const pieces = inq.items
    .map(
      (item, i) => `
      <tr><td style="padding:${i === 0 ? "0" : "16px"} 0 16px;${i < count - 1 ? `border-bottom:1px solid ${emailColors.line};` : ""}">
        <a href="${escapeHtml(item.url)}" style="${emailStyles.name}text-decoration:none;">${escapeHtml(item.name)}</a>
        <div style="${emailStyles.body}color:${emailColors.secondary};">${escapeHtml(item.colorwayName)} · US ${escapeHtml(item.size)}</div>
        ${item.note ? `<div style="${emailStyles.body}padding-top:6px;">“${escapeMultiline(item.note)}”</div>` : ""}
      </td></tr>`,
    )
    .join("");

  const html = emailDocument(
    subject,
    `
    <tr><td>
      <div style="${emailStyles.label}">New inquiry</div>
      <h1 style="${emailStyles.title}padding-top:8px;">${escapeHtml(inq.name)}, ${count} ${count === 1 ? "piece" : "pieces"}</h1>
      <div style="${emailStyles.body}color:${emailColors.secondary};padding-top:6px;">Reply to this email to write to ${escapeHtml(inq.name)} directly.</div>
    </td></tr>
    ${section("Pieces", `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${pieces}</table>`)}
    ${section(
      "Contact",
      `${escapeHtml(inq.name)}<br>
       <a href="mailto:${escapeHtml(inq.email)}" style="color:${emailColors.ink};">${escapeHtml(inq.email)}</a><br>
       <a href="tel:${escapeHtml(inq.phone.replace(/[^\d+]/g, ""))}" style="color:${emailColors.ink};">${escapeHtml(inq.phone)}</a>`,
    )}
    ${section("Ship to", addressLines.map(escapeHtml).join("<br>"))}
    ${section("Notes", inq.notes ? escapeMultiline(inq.notes) : `<span style="color:${emailColors.secondary};">None</span>`)}
    ${section(
      "Acknowledgment",
      "✓ Understands that each piece is made to order, and that pricing and turnaround time will vary.",
    )}
    ${section("Received", escapeHtml(when))}
    `,
  );

  const text = [
    `NEW INQUIRY: ${inq.name} · ${count} ${count === 1 ? "piece" : "pieces"}`,
    "",
    "PIECES",
    ...inq.items.flatMap((item, i) => [
      `${i + 1}. ${item.name} — ${item.colorwayName} · US ${item.size}`,
      ...(item.note ? [`   Note: ${item.note.replace(/\n/g, "\n   ")}`] : []),
      `   ${item.url}`,
    ]),
    "",
    "CONTACT",
    inq.name,
    inq.email,
    inq.phone,
    "",
    "SHIP TO",
    ...addressLines,
    "",
    "NOTES",
    inq.notes || "None",
    "",
    "ACKNOWLEDGMENT",
    "Yes: understands that each piece is made to order, and that pricing and turnaround time will vary.",
    "",
    `RECEIVED ${when}`,
    "",
    `Reply to this email to write to ${inq.name} directly.`,
  ].join("\n");

  return { subject, html, text };
}
