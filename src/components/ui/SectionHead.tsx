import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/** Shared heading scale and paragraph width for site sections. */
export function SectionHead({
  title,
  children,
  align = "start",
  className = "",
}: {
  title: ReactNode;
  children?: ReactNode;
  align?: "center" | "start";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <Reveal
      className={`max-w-[43rem] ${centered ? "mx-auto text-center" : ""} ${className}`}
    >
      <h2
        className="display text-[clamp(2.15rem,4.6vw,3.75rem)] font-semibold tracking-[-0.045em] text-ink"
      >
        {title}
      </h2>
      {children ? (
        <p
          className={`mt-5 max-w-[34rem] text-pretty text-[1.02rem] leading-[1.55] text-muted ${centered ? "mx-auto" : ""}`}
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
      className={`mx-auto w-full px-6 sm:px-10 ${wide ? "max-w-[76rem]" : "max-w-[72rem]"} ${className}`}
    >
      {children}
    </div>
  );
}
