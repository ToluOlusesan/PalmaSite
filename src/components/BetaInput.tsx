"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "done" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Props = {
  /** "hero" is the large pill; "cta" is the same, slightly tighter. */
  variant?: "hero" | "cta";
  /** Helper line under the field. */
  hint?: string;
};

export function BetaInput({ variant = "hero", hint }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = email.trim();

    if (!EMAIL_RE.test(value)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      const res = await fetch("/api/beta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value }),
      });
      const data = (await res.json()) as { message?: string; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setStatus("done");
      setMessage(data.message ?? "You're on the list. We'll be in touch.");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "done") {
    return (
      <p
        className="mx-auto max-w-[520px] font-serif text-[1.35rem] italic text-ink"
        role="status"
      >
        {message}
      </p>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[480px]">
      <form
        onSubmit={onSubmit}
        noValidate
        className={`flex items-center gap-2 rounded-full border border-line-2 bg-panel shadow-soft transition-colors focus-within:border-ink/40 ${
          variant === "hero" ? "p-2 pl-6" : "p-1.5 pl-5"
        }`}
      >
        <label htmlFor={`beta-${variant}`} className="sr-only">
          Email address
        </label>
        <input
          id={`beta-${variant}`}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@studio.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          aria-invalid={status === "error"}
          disabled={status === "submitting"}
          className="min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-faint"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          aria-label="Request access"
          className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-full bg-ink text-paper transition-transform hover:scale-[1.04] active:scale-95 disabled:opacity-60"
        >
          {status === "submitting" ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-paper/40 border-t-paper" />
          ) : (
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden>
              <path
                d="M5 12h13M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </form>

      <p className="mt-4 text-center text-[13px] text-faint" role={status === "error" ? "alert" : undefined}>
        {status === "error" ? (
          <span className="text-ink/70">{message}</span>
        ) : (
          hint
        )}
      </p>
    </div>
  );
}
