import { Reveal } from "./Reveal";
import { DownloadButton, GuideLink } from "./DownloadButton";
import { HeroShot } from "./HeroShot";

export function Hero() {
  return (
    <header
      id="top"
      className="relative overflow-hidden px-6 pb-16 pt-28 text-center sm:px-10 sm:pb-20 sm:pt-36"
    >
      <div className="paper-grain" aria-hidden />
      <div className="hero-wash" aria-hidden />
      <div
        className="bloom left-1/2 top-[24%] h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2"
        aria-hidden
      />

      <div className="relative z-[2] mx-auto max-w-[820px]">
        <Reveal delay={80}>
          <h1 className="font-serif text-[clamp(2.7rem,7vw,5.4rem)] font-normal leading-[1.04] tracking-[-1px] text-ink">
            Your reference board,
            <br className="hidden sm:block" /> finally{" "}
            <span className="font-script text-[1.5em] leading-[0.6] tracking-normal">
              alive
            </span>
            <span className="font-serif">.</span>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mx-auto mt-7 max-w-[520px] text-pretty text-[1.05rem] leading-[1.65] text-muted">
            Palma is a creative workspace and moodboarding tool for designers.
            Drop your references, make notes, curate the vibe. All local on
            your machine.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-9 flex flex-col items-center gap-4">
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <DownloadButton />
              <GuideLink />
            </div>
            <p className="text-[13px] text-faint">
              Windows · Free, forever · No account required · Runs entirely on your machine.
            </p>
          </div>
        </Reveal>
      </div>

      {/* the real app, framed as a floating window that tilts toward the pointer */}
      <Reveal delay={320} className="relative z-[2] mx-auto mt-14 max-w-[1440px] sm:mt-16">
        <HeroShot />
      </Reveal>
    </header>
  );
}
