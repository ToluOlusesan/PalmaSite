import type { Product } from "@/lib/content";
import { ActionLink, BrowserGlyph } from "@/components/ui/Action";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead, Shell } from "@/components/ui/SectionHead";

/**
 * The band that explains the browser build.
 *
 * It exists because "open it in your browser" invites two questions the button
 * itself cannot answer — is this the real app or a demo, and where does my
 * writing go — and a product that keeps everything local has to answer the
 * second one before anybody starts rather than after.
 *
 * The last line is the awkward one, and it stays. A browser's storage is the
 * writer's own machine, which is the promise; it is also something a browser
 * is entitled to clear, which the desktop build's nightly copies into
 * Documents are not. Saying so is what makes the rest of the page believable.
 */

const points = [
  {
    title: "Nothing to install",
    body: "One press and you are in it — no download, no account, no setup, no email address. It is the quick and easy way to use PalmaNote, and it is the whole app, not a preview of one.",
  },
  {
    title: "Saved on your own machine",
    body: "Your pages go into your browser's own storage, on this computer. Nothing is uploaded, there is no server on the other end, and it keeps working with the network off.",
  },
  {
    title: "Everything comes back out",
    body: "Export a page or the entire library — Word, markdown, PDF, or one folder holding all of it. The way out is built in, so nothing you write is ever stuck in here.",
  },
];

export function WebBand({ product: p }: { product: Product }) {
  if (!p.webUrl) return null;

  return (
    <section id="browser" className="scroll-mt-24 border-y border-line bg-panel/60 py-16 sm:py-24">
      <Shell>
        <SectionHead eyebrow="In your browser" title="Or just open it in a tab.">
          The same {p.name}, running in the browser you already have. Made for the
          moment you want to write something down now rather than install
          something first.
        </SectionHead>

        <div className="mt-12 grid gap-x-10 gap-y-9 sm:mt-14 sm:grid-cols-3">
          {points.map((point, i) => (
            <Reveal key={point.title} delay={i * 70}>
              <h3 className="text-[1.0125rem] font-semibold leading-[1.3] tracking-[-0.012em] text-ink">
                {point.title}
              </h3>
              <p className="mt-2 text-pretty text-[0.925rem] leading-[1.6] text-muted">
                {point.body}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={220} className="mt-12 flex flex-col items-center gap-4 text-center">
          <ActionLink href={p.webUrl} target="_blank" rel="noopener" variant="solid">
            <BrowserGlyph />
            Open {p.name} in your browser
          </ActionLink>
          <p className="max-w-[38rem] text-pretty text-[13px] leading-[1.6] text-faint">
            One thing worth knowing: because your pages live in this browser, clearing
            your browsing data clears them too, and they do not follow you to another
            computer. Keep an export somewhere of your own — and when the Windows app
            lands it will hold a real file on your disk, backed up nightly.
          </p>
        </Reveal>
      </Shell>
    </section>
  );
}
