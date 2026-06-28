import type { NextRequest } from "next/server";

/**
 * Waitlist signup endpoint. Host-agnostic — runs on Vercel, Cloudflare, Node,
 * anywhere — because it only uses fetch. It forwards each email to whatever
 * provider you wire up via env vars, so no database lives here and the
 * local-first promise holds (we capture one launch email, nothing else).
 *
 * Configure ONE of these (checked in this order):
 *   WAITLIST_WEBHOOK_URL  — POST {email, ts, source} as JSON to any endpoint:
 *                           a Google Apps Script web app, Zapier/Make catch
 *                           hook, Formspree, n8n, etc. The simplest path.
 *   RESEND_API_KEY        — emails each signup to WAITLIST_NOTIFY_EMAIL via
 *     + WAITLIST_NOTIFY_EMAIL   Resend (https://resend.com). FROM defaults to
 *     [+ WAITLIST_FROM_EMAIL]   onboarding@resend.dev for quick testing.
 *
 * With neither set, dev logs the signup and succeeds (so the UI works locally);
 * production returns 503 so emails are never silently dropped.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  let email = "";
  let honeypot = "";

  // Accept JSON or form-encoded bodies so the endpoint is easy to hit.
  const type = request.headers.get("content-type") ?? "";
  try {
    if (type.includes("application/json")) {
      const body = await request.json();
      email = String(body?.email ?? "").trim();
      honeypot = String(body?.["bot-field"] ?? "");
    } else {
      const form = await request.formData();
      email = String(form.get("email") ?? "").trim();
      honeypot = String(form.get("bot-field") ?? "");
    }
  } catch {
    return Response.json({ ok: false, error: "Bad request." }, { status: 400 });
  }

  // Honeypot: a real user never fills this hidden field. Pretend success.
  if (honeypot) return Response.json({ ok: true });

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return Response.json({ ok: false, error: "Enter a valid email." }, { status: 422 });
  }

  const payload = { email, ts: new Date().toISOString(), source: "palma.design" };

  try {
    const webhook = process.env.WAITLIST_WEBHOOK_URL;
    if (webhook) {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        // Google Apps Script (and some others) answer a *successful* POST with a
        // 302 to a googleusercontent URL — the script has already run by then.
        // Following it re-POSTs with no body and 411s, so don't follow: treat a
        // redirect (3xx, or status 0 when the runtime opaques it) as success.
        redirect: "manual",
      });
      const ok = res.ok || res.status === 0 || (res.status >= 300 && res.status < 400);
      if (!ok) throw new Error(`webhook responded ${res.status}`);
      return Response.json({ ok: true });
    }

    const resendKey = process.env.RESEND_API_KEY;
    const notify = process.env.WAITLIST_NOTIFY_EMAIL;
    if (resendKey && notify) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.WAITLIST_FROM_EMAIL ?? "Palma <onboarding@resend.dev>",
          to: notify,
          subject: "New Palma waitlist signup",
          text: `${email}\n${payload.ts}`,
          reply_to: email,
        }),
      });
      if (!res.ok) throw new Error(`resend responded ${res.status}`);
      return Response.json({ ok: true });
    }

    // No provider configured.
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[waitlist] no provider configured — would have saved: ${email}`);
      return Response.json({ ok: true });
    }
    console.error("[waitlist] no provider configured; signup dropped");
    return Response.json({ ok: false, error: "Waitlist not configured." }, { status: 503 });
  } catch (err) {
    console.error("[waitlist] forward failed:", err);
    return Response.json({ ok: false, error: "Could not save right now." }, { status: 502 });
  }
}
