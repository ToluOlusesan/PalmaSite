import { site } from "@/lib/content";
import { PalmaMark } from "./PalmaMark";

const footerLinks = [
  { href: "#tools", label: "Tools" },
  { href: "#why", label: "Why Palma" },
  { href: "#request", label: "Get notified" },
  { href: "mailto:hello@palma.design", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center px-6 py-16 sm:px-10 sm:py-20">
        <PalmaMark aria-hidden className="h-40 w-auto text-ink/10 sm:h-64" />

        <nav className="mt-12 flex flex-wrap items-center justify-center gap-x-7 gap-y-3" aria-label="Footer">
          {footerLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13.5px] text-muted transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <p className="mt-8 text-[12.5px] text-faint">
          © {site.year} {site.maker} · Free, forever.
        </p>
      </div>
    </footer>
  );
}
