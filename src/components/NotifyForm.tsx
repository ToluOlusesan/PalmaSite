"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "done" | "error";

/**
 * Launch-notify signup. Posts to /api/notify, a host-agnostic Route Handler
 * that forwards the email to whatever provider is configured (see that file).
 * It's a single launch email — not an account, not stored alongside any of your
 * work — so it stays true to the local-first promise.
 */
export function NotifyForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("submitting");
    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.get("email"),
          "bot-field": data.get("bot-field"),
        }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className="mt-9 inline-flex items-center gap-2.5 text-[15px] text-ink">
        <span className="grid h-5 w-5 place-items-center rounded-full bg-ink text-paper" aria-hidden>
          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none">
            <path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        You&apos;re on the list. We&apos;ll email you once, when it&apos;s ready.
      </p>
    );
  }

  return (
    <form
      name="notify"
      method="POST"
      onSubmit={onSubmit}
      className="mx-auto mt-9 w-full max-w-[440px]"
    >
      <p hidden>
        <label>
          Leave this empty: <input name="bot-field" />
        </label>
      </p>

      <div className="flex flex-col gap-2.5 sm:flex-row">
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@studio.com"
          aria-label="Email address"
          className="h-12 flex-1 rounded-full border border-line-2 bg-paper px-5 text-[15px] text-ink outline-none transition-colors placeholder:text-faint focus-visible:border-ink"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="h-12 shrink-0 rounded-full bg-ink px-6 text-[15px] font-medium text-paper transition-opacity hover:opacity-85 disabled:opacity-50"
        >
          {status === "submitting" ? "Adding…" : "Notify me"}
        </button>
      </div>

      <p className="mt-3 text-[12.5px] text-faint">
        {status === "error"
          ? "Something went wrong. Try again in a moment."
          : "One email at launch. No spam, no account, unsubscribe anytime."}
      </p>
    </form>
  );
}
