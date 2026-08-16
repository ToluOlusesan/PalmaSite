import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/**
 * The one pressable primitive on the site.
 *
 * Two rules it exists to enforce everywhere at once: feedback lands on
 * pointer-*down* rather than on release (`.pressable`, see globals.css), and
 * the release is faster than the press — the system answering should never
 * take longer than the person deciding.
 *
 * `solid` takes the current product's accent, so the same component is a black
 * button on Canvas and a Cobalt→Violet one on PalmaNote without either page
 * naming a colour.
 */

type Variant = "solid" | "outline" | "quiet";

const base =
  "pressable inline-flex h-12 items-center justify-center gap-2.5 rounded-full px-6 text-[15px] font-medium whitespace-nowrap";

const variants: Record<Variant, string> = {
  solid: "text-[var(--accent-ink)] shadow-soft hover:shadow-lift",
  outline:
    "border border-line-2 text-ink hover:border-[var(--accent)] hover:text-[var(--accent)]",
  quiet: "text-muted hover:text-ink",
};

type Props = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

/** Internal navigation. Everything on this site that changes route. */
export function Action({
  variant = "solid",
  className = "",
  children,
  ...rest
}: Props & ComponentProps<typeof Link>) {
  return (
    <Link
      {...rest}
      className={`${base} ${variants[variant]} ${className}`}
      style={variant === "solid" ? { background: "var(--accent-grad)" } : undefined}
    >
      {children}
    </Link>
  );
}

/** External links and downloads — anything that leaves the app. */
export function ActionLink({
  variant = "solid",
  className = "",
  children,
  ...rest
}: Props & ComponentProps<"a">) {
  return (
    <a
      {...rest}
      className={`${base} ${variants[variant]} ${className}`}
      style={variant === "solid" ? { background: "var(--accent-grad)" } : undefined}
    >
      {children}
    </a>
  );
}

/** A non-interactive stand-in where a product has nothing to download yet.
 *  Shaped like the button it will become, so the layout doesn't jump on
 *  launch day — and visibly inert, so nobody clicks it hoping. */
export function ActionPending({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={`${base} cursor-default border border-dashed border-line-2 text-faint ${className}`}
    >
      {children}
    </span>
  );
}

export function DownloadGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden>
      <path
        d="M12 3v11m0 0l-4-4m4 4l4-4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ArrowGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-4 w-4 ${className}`} fill="none" aria-hidden>
      <path
        d="M5 12h13m0 0-5-5m5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
