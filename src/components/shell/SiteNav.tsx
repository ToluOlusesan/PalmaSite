"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { family, products, type ProductId } from "@/lib/content";
import { CanvasMark } from "@/components/marks/CanvasMark";
import { DownloadGlyph, BrowserGlyph } from "@/components/ui/Action";

function productFor(pathname: string): ProductId | null {
  if (pathname.startsWith("/canvas")) return "canvas";
  if (pathname.startsWith("/note")) return "note";
  return null;
}

export function SiteNav() {
  const active = productFor(usePathname());

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-4 sm:px-6" style={{ viewTransitionName: "site-nav" }}>
      <nav aria-label="Palmaboard" className="mx-auto flex h-[62px] max-w-[72rem] items-center gap-2 rounded-[10px] border border-line bg-paper/95 px-3 shadow-[0_8px_28px_rgba(16,27,20,0.05)] backdrop-blur-md sm:gap-5 sm:px-5">
        <Link href="/" transitionTypes={["nav-back"]} aria-label={`${family.name} home`} className="pressable flex shrink-0 items-center gap-2.5 rounded-md px-1.5 py-2 text-ink">
          <CanvasMark className="h-[22px] w-auto" title="" />
          <span className="hidden text-[18px] font-semibold tracking-[-0.045em] sm:inline">{family.name}</span>
        </Link>

        <div className="ml-auto flex items-center gap-0.5 sm:gap-1">
          {(["canvas", "note"] as const).map((id) => (
            <Link
              key={id}
              href={products[id].href}
              transitionTypes={["nav-forward"]}
              aria-current={active === id ? "page" : undefined}
              className={`rounded-md px-2.5 py-2 text-[13px] transition-colors sm:px-3.5 ${active === id ? "bg-panel font-medium text-ink" : "text-muted hover:bg-panel hover:text-ink"}`}
            >
              {products[id].short}
            </Link>
          ))}
        </div>

        <div className="mx-1 hidden h-5 w-px bg-line sm:block" aria-hidden />
        <NavAction active={active} />
      </nav>
    </header>
  );
}

function NavAction({ active }: { active: ProductId | null }) {
  const cls = "pressable inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-md bg-ink px-3.5 text-[12.5px] font-medium text-white hover:opacity-90 sm:px-4";

  if (!active) {
    return <Link href="/#get" className={cls}><span className="hidden sm:inline">Get the apps</span><span className="sm:hidden">Get</span></Link>;
  }

  const product = products[active];
  if (product.status === "coming-soon" && product.webUrl) {
    return <a href={product.webUrl} target="_blank" rel="noopener" className={cls}><BrowserGlyph /><span className="hidden sm:inline">Open in browser</span></a>;
  }
  if (product.status === "coming-soon") {
    return <span className="rounded-md border border-line px-3 py-2 text-[12px] text-faint">Coming soon</span>;
  }
  return <a href={product.downloadUrl} className={cls}><DownloadGlyph /><span className="hidden sm:inline">Download</span></a>;
}
