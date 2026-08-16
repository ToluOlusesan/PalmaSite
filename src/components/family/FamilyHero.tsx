import { family } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { Shell } from "@/components/ui/SectionHead";
import { ProductChooser } from "./ProductChooser";

/**
 * The family page opens by naming the family, saying the one true thing about
 * both apps, and then getting out of the way — the chooser starts within a
 * screen and a half, because the page's whole job is to hand you off.
 *
 * The headline stays in plain serif. The script flourish is the *products'*
 * voice, and spending it here would leave the two product pages with nothing
 * of their own to say.
 */
export function FamilyHero() {
  return (
    <header id="top" className="relative px-0 pb-6 pt-28 sm:pb-10 sm:pt-36">
      {/* The ground clips itself. `overflow-hidden` used to sit on the header,
          which also clipped the *card shadows* at the header's bottom edge —
          a soft shadow cut off by a dead-straight horizontal line. Only the
          background needs containing, so only the background gets it. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="dot-field" />
        <div className="bloom left-1/2 top-[18%] h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Not `wide`. The chooser, the comparison, the promises and the
          download band all sit on the same column edge, so the page reads as
          one object rather than four bands of drifting width. */}
      <Shell className="relative z-[2]">
        <div className="mx-auto max-w-[48rem] text-center">
          <Reveal delay={60}>
            <span className="eyebrow">{family.name}</span>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="display mt-5 text-[clamp(2.6rem,6.4vw,4.75rem)] text-ink">
              Two apps.
              <br className="hidden sm:block" /> One way of working.
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mx-auto mt-7 max-w-[34rem] text-pretty text-[1.0625rem] leading-[1.65] text-muted">
              One is for looking — references, images, video, the shape of a
              thing before you know what it is. One is for writing — pages,
              notes, lists, the words. Both keep everything on your machine.
            </p>
          </Reveal>

          <Reveal delay={260}>
            <p className="mt-7 text-[13px] text-faint">
              Windows · Free, forever · No account, no cloud, no AI
            </p>
          </Reveal>
        </div>

        <ProductChooser />
      </Shell>
    </header>
  );
}
