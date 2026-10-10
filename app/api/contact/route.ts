import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({})) as Record<string, unknown>;
  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const subject = String(body.subject || "Portfolio enquiry").trim();
  const message = String(body.message || "").trim();
  if (!name || !email.includes("@") || message.length < 20) return NextResponse.json({ error: "Please complete every field with a valid message." }, { status: 400 });
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return NextResponse.json({ mailto: true });
  const to = process.env.CONTACT_TO_EMAIL || "faizanahmedsyed1@gmail.com";
  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";
  const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ from, to: [to], reply_to: email, subject: `[Portfolio] ${subject}`, text: `From: ${name} <${email}>\n\n${message}` }) });
  if (!response.ok) return NextResponse.json({ error: "The message service is temporarily unavailable. Please email me directly." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
