import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Beta-access capture endpoint.
 *
 * Palma is free and local-first, so there's no user database to write to here.
 * This validates the request and acknowledges it — the single place to wire a
 * real provider (a mailing list, a webhook, a flat file) when one is chosen.
 */
export async function POST(request: Request) {
  let email: unknown;

  try {
    ({ email } = await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 422 },
    );
  }

  // TODO: forward `email.trim()` to the chosen list/provider.
  console.info(`[beta] access requested: ${email.trim()}`);

  return NextResponse.json(
    { ok: true, message: "You're on the list. We'll be in touch." },
    { status: 200 },
  );
}
