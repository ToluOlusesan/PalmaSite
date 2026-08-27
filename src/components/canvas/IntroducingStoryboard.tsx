import { Reveal } from "@/components/ui/Reveal";
import { SectionHead, Shell } from "@/components/ui/SectionHead";
import { ToolCaricature } from "./ToolCaricatures";

/**
 * The 1.3.0 headline: Storyboard gets its own band rather than a line in the
 * changelog, because it is a third place to put work rather than a refinement
 * of the two that existed.
 *
 * The caricature runs full width here — it is the same art the step card uses,
 * but at this size the toolbar, the numbering and the fields under each panel
 * are all legible, so the picture carries the explanation and the copy beside
 * it can stay short.
 */
const points = [
  {
    title: "Sent, not placed",
    body: "Ctrl B on the Dump Board and the shot lands as the next panel. A sequence already knows where a new shot goes.",
  },
  {
    title: "One frame shape",
    body: "Pick 16:9, 2.39:1, 9:16 — once, for the board. Dropping a picture into a fixed frame is a framing decision, so Ctrl-drag slides it inside.",
  },
  {
    title: "It knows how long it runs",
    body: "Action, camera move and duration under each panel. The durations add up to a runtime in the header.",
  },
];

export function IntroducingStoryboard() {
  return (
    <section id="storyboard" className="scroll-mt-24 py-16 sm:py-24">
      <Shell wide>
        <SectionHead eyebrow="New in 1.3.0" title="Now introducing Storyboard.">
          Plan a motion project end to end. Go straight from brainstorming on
          the board to a storyboard you can time — without your references ever
          leaving the app they were gathered in.
        </SectionHead>

        <Reveal>
          <div className="mt-12 overflow-hidden rounded-[1.25rem] border border-line bg-panel sm:mt-14">
            <div className="relative aspect-[16/9] border-b border-line bg-paper">
              <ToolCaricature id="storyboard" />
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {points.map((pt, i) => (
            <Reveal key={pt.title} delay={i * 90}>
              <h3 className="display-sm text-[1.15rem] text-ink">{pt.title}</h3>
              <p className="mt-2 text-pretty text-[0.94rem] leading-[1.6] text-muted">
                {pt.body}
              </p>
            </Reveal>
          ))}
        </div>
      </Shell>
    </section>
  );
}
