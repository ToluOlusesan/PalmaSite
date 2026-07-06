"use client";

import { useEffect, useState } from "react";
import { PalmaMark } from "./PalmaMark";

const links = [
  { href: "#tools", label: "Tools" },
  { href: "#why", label: "Why Palma" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on resize up to desktop.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const close = () => mq.matches && setOpen(false);
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, []);

  const opaque = scrolled || open;

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background,backdrop-filter,border-color] duration-300 ${
        opaque
          ? "border-line bg-paper/75 backdrop-blur-md backdrop-saturate-150"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 sm:px-10">
        <a
          href="#top"
          aria-label="Palma home"
          className="flex items-center gap-2.5 text-ink"
        >
          <PalmaMark className="h-[22px] w-7" />
          <span className="font-serif text-[21px] leading-none tracking-[0.1px]">Palma</span>
          <span className="hidden rounded-full border border-line-2 px-2.5 py-0.5 text-[10.5px] font-medium uppercase tracking-[1.5px] text-muted sm:inline-block">
            Beta
          </span>
        </a>

        <div className="flex items-center gap-1 sm:gap-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hidden rounded-full px-3.5 py-2 text-[13.5px] text-muted transition-colors hover:text-ink sm:inline-block"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#download"
            className="rounded-full bg-ink px-4 py-2 text-[13.5px] font-medium text-paper transition-opacity hover:opacity-85"
          >
            Download
          </a>

          {/* mobile menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="-mr-1.5 ml-0.5 grid h-9 w-9 place-items-center rounded-full text-ink transition-colors hover:bg-line sm:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              ) : (
                <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* mobile menu panel */}
      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-line transition-[max-height,opacity] duration-300 sm:hidden ${
          open ? "max-h-40 opacity-100" : "max-h-0 border-transparent opacity-0"
        }`}
      >
        <div className="flex flex-col px-6 py-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-3 text-[15px] text-ink transition-colors hover:bg-line"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
