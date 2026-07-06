import { Reveal } from "./Reveal";
import { DownloadButton, GuideLink } from "./DownloadButton";
import { site } from "@/lib/content";

export function CTA() {
  return (
    <section id="download" className="relative overflow-hidden py-16 text-center sm:py-24">
      <div
        className="bloom left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2"
        aria-hidden
      />

      <div className="relative z-[1] mx-auto max-w-[760px] px-6 sm:px-10">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-line-2 px-3 py-1 text-[11.5px] font-medium uppercase tracking-[0.14em] text-muted">
            Windows · v{site.version}
          </span>
          <p className="mx-auto mt-6 max-w-[600px] text-balance font-serif text-[clamp(1.6rem,3.6vw,2.4rem)] leading-[1.18] tracking-[-0.3px] text-ink">
            Download Palma. It&apos;s free, forever.
          </p>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <DownloadButton />
            <GuideLink />
          </div>
          <p className="mt-6 inline-flex items-center gap-2 text-[13px] text-muted">
            <span className="relative flex h-1.5 w-1.5" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
            </span>
            A browser extension to clip references straight from the web is coming.
          </p>
          <p className="mt-4 text-[13px] text-faint">
            No account required · Runs entirely on your machine.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
