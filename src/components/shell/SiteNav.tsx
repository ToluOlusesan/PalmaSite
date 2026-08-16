"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { family, productList, products, type ProductId } from "@/lib/content";
import { CanvasMark } from "@/components/marks/CanvasMark";
import { DownloadGlyph } from "@/components/ui/Action";

/**
 * The family chrome. One bar, on every page, whose middle is the whole idea of
 * the site: you are always one press away from either app, and the bar always
 * says which one you are in.
 *
 * It is a translucent material rather than an opaque strip — content scrolls
 * *under* it — and it gains a scroll edge instead of a hard 1px rule, so
 * nothing ever meets the chrome at a line.
 *
 * `viewTransitionName: "site-nav"` (with the matching CSS in globals.css) pins
 * it during a route slide. A nav that travels with the content takes away the
 * one fixed reference point the user has, and the whole viewport appears to
 * move instead of just the page.
 */

/** Which product a path belongs to, or null on the family page. */
function productFor(pathname: string): ProductId | null {
  if (pathname.startsWith("/canvas")) return "canvas";
  if (pathname.startsWith("/note")) return "note";
  return null;
}

export function SiteNav() {
  const pathname = usePathname();
  const active = productFor(pathname);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      // The nav floats above a scroll edge, so it needs to be the taller
      // stacking context — hence a z-index rather than relying on order.
      className="fixed inset-x-0 top-0 z-50"
      style={{ viewTransitionName: "site-nav" }}
    >
      <div
        className={`relative transition-[background-color,backdrop-filter] duration-300 ${
          scrolled ? "material scroll-edge" : ""
        }`}
      >
        <nav
          aria-label="Palmaboard"
          className="mx-auto flex h-16 max-w-[80rem] items-center gap-3 px-4 sm:h-[4.5rem] sm:gap-6 sm:px-10"
        >
          <Link
            href="/"
            transitionTypes={["nav-back"]}
            aria-label={`${family.name} home`}
            className="pressable -m-2 flex items-center gap-2.5 rounded-full p-2 text-ink"
          >
            {/* The family wears Canvas's island. Palmaboard is a name rather
                than a third product, and inventing a third mark for it left
                the nav showing a glyph that appears nowhere else on the site
                or in either app. */}
            <CanvasMark className="h-[22px] w-auto" title="" />
            <span className="hidden text-[1.0625rem] font-medium tracking-[-0.01em] sm:inline">
              {family.name}
            </span>
          </Link>

          <ProductSwitcher active={active} />

          <NavAction active={active} />
        </nav>
      </div>
    </header>
  );
}

/**
 * The app switcher. A segmented control whose selection is a single pill that
 * *travels* between the two options rather than one highlight turning off and
 * another turning on.
 *
 * The pill follows the pointer on hover and returns to the current page on
 * leave, so the control answers before you commit — the press only confirms
 * what the hover already showed you. On the family page nothing is selected
 * yet, so the pill sits out until you point at something: the site never
 * claims you are somewhere you aren't.
 */
function ProductSwitcher({ active }: { active: ProductId | null }) {
  const listRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const itemRefs = useRef<Partial<Record<ProductId, HTMLAnchorElement | null>>>({});
  /** What the pill is currently showing — hover wins over the current route. */
  const shownRef = useRef<ProductId | null>(null);
  const placedRef = useRef(false);

  /**
   * The pill is written straight to the DOM rather than held in state.
   *
   * Two reasons. It follows the pointer, and re-rendering the nav on every
   * pointerenter to move one box is work nobody asked for. And the "don't
   * animate on first paint" rule needs the element's transition suppressed
   * *between* two style writes in the same frame, which a render pass can't
   * express — as state it becomes a setState-inside-an-effect and a cascading
   * render.
   */
  const place = useCallback((id: ProductId | null, animate: boolean) => {
    const list = listRef.current;
    const pill = pillRef.current;
    if (!list || !pill) return;
    shownRef.current = id;

    const item = id ? itemRefs.current[id] : null;
    if (!item) {
      pill.style.opacity = "0";
      return;
    }

    const x = item.offsetLeft - list.clientLeft;
    if (!animate) {
      pill.style.transition = "none";
      // Flush the suppressed transition before the new position lands, or the
      // browser coalesces both writes and animates anyway.
      void pill.offsetWidth;
    }
    pill.style.transform = `translateX(${x}px)`;
    pill.style.width = `${item.offsetWidth}px`;
    pill.style.opacity = "1";
    if (!animate) {
      void pill.offsetWidth;
      pill.style.transition = "";
    }
  }, []);

  // Layout effect, not effect: measuring after paint shows one frame of the
  // pill in its old position. The first placement never animates — otherwise
  // the pill slides in from the left edge on every page load — but a later
  // route change does, so navigating by any route glides the selection.
  useLayoutEffect(() => {
    place(active, placedRef.current);
    placedRef.current = true;
  }, [active, place]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    // Web fonts land after first paint and change the label widths under the
    // pill, so re-measure on resize *and* on the elements' own boxes changing.
    const ro = new ResizeObserver(() => place(shownRef.current, false));
    ro.observe(list);
    for (const el of Object.values(itemRefs.current)) if (el) ro.observe(el);
    return () => ro.disconnect();
  }, [place]);

  return (
    <div
      ref={listRef}
      onPointerLeave={() => place(active, true)}
      className="relative flex items-center gap-0.5 rounded-full border border-line bg-panel/70 p-1"
    >
      {/* The travelling selection. Sits under the labels, animates transform
          and width only, and is hidden entirely when nothing is selected —
          which is the state of the family page, where you haven't picked yet. */}
      <span
        ref={pillRef}
        aria-hidden
        className="pointer-events-none absolute bottom-1 left-0 top-1 w-0 rounded-full bg-paper opacity-0 shadow-soft transition-[transform,width,opacity] duration-[260ms] ease-[var(--ease-out)]"
      />

      {productList.map((p) => {
        const isActive = active === p.id;
        return (
          <Link
            key={p.id}
            href={p.href}
            ref={(el) => {
              itemRefs.current[p.id] = el;
            }}
            aria-current={isActive ? "page" : undefined}
            transitionTypes={[isActive ? "nav-back" : "nav-forward"]}
            onPointerEnter={() => place(p.id, true)}
            onFocus={() => place(p.id, true)}
            onBlur={() => place(active, true)}
            className={`relative z-[1] rounded-full px-3.5 py-1.5 text-[13.5px] transition-colors duration-200 sm:px-4 ${
              isActive ? "font-medium text-ink" : "text-muted hover:text-ink"
            }`}
          >
            {p.short}
          </Link>
        );
      })}
    </div>
  );
}

/**
 * The right-hand slot, which always offers the next step for wherever you
 * currently are: the family page points at its own get-it band, a product page
 * offers that product directly, and an unreleased product says so plainly
 * rather than dangling a dead button.
 */
function NavAction({ active }: { active: ProductId | null }) {
  const shared =
    "pressable ml-auto inline-flex h-9 items-center gap-2 rounded-full px-3.5 text-[13.5px] font-medium sm:h-10 sm:px-4";

  if (!active) {
    return (
      <Link href="/#get" className={`${shared} bg-ink text-paper hover:opacity-90`}>
        <span className="hidden sm:inline">Get the apps</span>
        <span className="sm:hidden">Get</span>
      </Link>
    );
  }

  const product = products[active];

  if (product.status === "coming-soon") {
    return (
      <span
        className={`${shared} cursor-default border border-dashed border-line-2 text-faint`}
      >
        Coming soon
      </span>
    );
  }

  return (
    <a
      href={product.downloadUrl}
      data-product={active}
      className={`${shared} text-[var(--accent-ink)] hover:opacity-90`}
      style={{ background: "var(--accent-grad)" }}
    >
      <DownloadGlyph />
      <span className="hidden sm:inline">Download</span>
    </a>
  );
}
