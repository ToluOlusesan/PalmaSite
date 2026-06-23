import { site } from "@/lib/content";
import { PalmaMark } from "./PalmaMark";

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center px-6 py-20 sm:px-10">
        <PalmaMark
          aria-hidden
          className="h-48 w-auto text-ink/10 sm:h-64"
        />

        <p className="mt-12 text-[12.5px] text-faint">
          © {site.year} {site.maker} · Free, forever.
        </p>
      </div>
    </footer>
  );
}
