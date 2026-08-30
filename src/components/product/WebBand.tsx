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
    title: "No installation",
    body: "Open a tab and start. There is no download, account or setup, and this is the full PalmaNote experience rather than a cut-down demo.",
  },
  {
    title: "Local in your browser",
    body: "Your pages are stored by this browser on this computer. Nothing is uploaded, and the app keeps working when the network is off.",
  },
  {
    title: "An exit is always available",
    body: "Export one page or the whole library as Word, Markdown, PDF or a folder of files. Your writing never has to stay inside the app.",
  },
];

export function WebBand({ product: p }: { product: Product }) {
  if (!p.webUrl) return null;

  return (
    <section id="browser" className="scroll-mt-24 border-y border-line bg-panel/60 py-16 sm:py-24">
      <Shell>
        <SectionHead eyebrow="In your browser" title="The full app, one tab away.">
          Open the same {p.name} in the browser you already have. It is the
          quickest route from a passing thought to a page.
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
            One thing worth knowing: clearing this browser&rsquo;s site data also
            clears its local PalmaNote library, and that library does not follow
            you to another computer. Keep an export of anything important, or use
            the Windows app for a library file on disk with nightly backups.
          </p>
        </Reveal>
      </Shell>
    </section>
  );
}
