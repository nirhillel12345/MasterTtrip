import { Resend } from "resend";

type SendEmailInput = {
  to: string;
  subject: string;
  html: string;
  text?: string;
};

export async function sendEmail(input: SendEmailInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = "onboarding@resend.dev";

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
