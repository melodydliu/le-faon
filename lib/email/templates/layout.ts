/** Shared pieces for plain, well-behaved HTML email (tables, inline styles, no web fonts). */

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Escape, then keep the visitor's line breaks. */
export function escapeMultiline(value: string) {
  return escapeHtml(value).replace(/\r?\n/g, "<br>");
}

export const emailColors = {
  bg: "#f4efe4",
  paper: "#fbf8f1",
  ink: "#2a2514",
  secondary: "#51473f",
  line: "#ded5c6",
};

const serif = "Georgia, 'Times New Roman', serif";
const sans = "-apple-system, 'Helvetica Neue', Helvetica, Arial, sans-serif";

export const emailStyles = {
  label: `font-family:${sans};font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:${emailColors.secondary};`,
  body: `font-family:${sans};font-size:15px;line-height:1.6;color:${emailColors.ink};`,
  title: `font-family:${serif};font-size:26px;font-weight:normal;line-height:1.2;color:${emailColors.ink};margin:0;`,
  name: `font-family:${serif};font-size:20px;line-height:1.3;color:${emailColors.ink};`,
};

export function section(label: string, inner: string) {
  return `
  <tr><td style="padding:28px 0 0;">
    <div style="${emailStyles.label}padding-bottom:10px;border-bottom:1px solid ${emailColors.line};">${escapeHtml(label)}</div>
    <div style="${emailStyles.body}padding-top:12px;">${inner}</div>
  </td></tr>`;
}

export function emailDocument(title: string, inner: string) {
  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)}</title></head>
<body style="margin:0;padding:0;background:${emailColors.bg};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${emailColors.bg};">
    <tr><td align="center" style="padding:32px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:${emailColors.paper};border:1px solid ${emailColors.line};">
        <tr><td style="padding:32px 32px 36px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${inner}
          </table>
        </td></tr>
      </table>
      <div style="${emailStyles.label}padding-top:16px;">Le Faon</div>
    </td></tr>
  </table>
</body>
</html>`;
}

/** e.g. "Wednesday, November 11, 2026, 5:28 PM EST" */
export function formatTimestamp(iso: string, timeZone = "America/New_York") {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone,
  })
    .format(new Date(iso))
    .concat(` (${timeZone.split("/")[1]?.replace("_", " ") ?? timeZone} time)`);
}
