// lib/email.ts
import nodemailer from "nodemailer";

const host = process.env.SMTP_HOST;
const port = Number(process.env.SMTP_PORT || 587);
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;
const from = process.env.FROM_EMAIL || "TrueTrip <no-reply@truetrip.app>";

if (!host || !user || !pass) {
  console.warn("⚠ SMTP not fully configured; emails will be skipped.");
}

const transporter =
  host && user && pass
    ? nodemailer.createTransport({
        host,
        port,
        secure: false,
        auth: {
          user,
          pass,
        },
      })
    : null;

export async function sendMail(options: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!transporter) {
    console.log("Skipping email send (no SMTP config)");
    return;
  }

  await transporter.sendMail({
    from,
    to: options.to,
    subject: options.subject,
    html: options.html,
  });
}
