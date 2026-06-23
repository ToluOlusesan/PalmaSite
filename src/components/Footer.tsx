import { site } from "@/lib/content";
import { PalmaMark } from "./PalmaMark";

const columns: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Product",
    links: [
      { label: "Tools", href: "#tools" },
      { label: "The canvas", href: "#canvas" },
      { label: "Why Palma", href: "#why" },
      { label: "Request access", href: "#request" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto max-w-[1200px] px-6 py-16 sm:px-10">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <div className="max-w-[320px]">
            <PalmaMark className="h-10 w-[52px] text-ink" />
          </div>

          <div className="flex gap-16 sm:gap-24">
            {columns.map((col) => (
              <nav key={col.heading} aria-label={col.heading}>
                <p className="text-[12px] font-medium uppercase tracking-[1.5px] text-faint">
                  {col.heading}
                </p>
                <ul className="mt-4 flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[14px] text-muted transition-colors hover:text-ink"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <hr className="rule my-12" />

        <div className="flex flex-col items-center justify-between gap-3 text-[12.5px] text-faint sm:flex-row">
          <p>
            © {site.year} {site.maker} · Free, forever.
          </p>
          <p>Local-first. No cloud. No account.</p>
        </div>
      </div>
    </footer>
  );
}
