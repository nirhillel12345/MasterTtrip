import { Resend } from "resend";

type SendEmailInput = {
  to: string;
  subject: string;
  html: string;
  text?: string;
};

/** Resend `from` must use your verified domain — not Gmail. */
const DEFAULT_FROM = "MasterTrip <noreply@mastertrip.online>";

function resolveResendFrom(): string {
  const raw = process.env.RESEND_FROM_EMAIL?.trim();
  if (!raw) return DEFAULT_FROM;
  if (raw.includes("<") && raw.includes(">")) return raw;
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw)) {
    return `MasterTrip <${raw}>`;
  }
  return raw;
}

export async function sendEmail(input: SendEmailInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = resolveResendFrom();

  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY");
  }

  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from,
    to: [input.to],
    subject: input.subject,
    html: input.html,
    text: input.text,
  });

  if (error) {
    console.error("RESEND API ERROR:", error);
    throw new Error(error.message);
  }

  if (!data) {
    console.error("RESEND API ERROR: data is null without explicit error");
    throw new Error("Resend returned no data.");
  }

  return { data };
}
