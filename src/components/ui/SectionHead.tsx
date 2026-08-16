import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/**
 * The heading block every band on every page opens with: eyebrow, display
 * line, one paragraph. It exists so the two product pages keep the same
 * vertical rhythm — sibling pages that set their own heading sizes stop
 * reading as one site within about two scrolls.
 */
export function SectionHead({
  eyebrow,
  title,
  children,
  align = "center",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  align?: "center" | "start";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <Reveal
      className={`max-w-[42rem] ${centered ? "mx-auto text-center" : ""} ${className}`}
    >
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2
        className={`display text-[clamp(2rem,4.6vw,3.25rem)] text-ink ${eyebrow ? "mt-4" : ""}`}
      >
        {title}
      </h2>
      {children ? (
        <p
          className={`mt-5 max-w-[34rem] text-pretty text-[1.02rem] leading-[1.65] text-muted ${centered ? "mx-auto" : ""}`}
        >
          {children}
        </p>
      ) : null}
    </Reveal>
  );
}

/** A page-width container. One value, one place. */
export function Shell({
  children,
  className = "",
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div
      className={`mx-auto w-full px-6 sm:px-10 ${wide ? "max-w-[80rem]" : "max-w-[70rem]"} ${className}`}
    >
      {children}
    </div>
  );
}
