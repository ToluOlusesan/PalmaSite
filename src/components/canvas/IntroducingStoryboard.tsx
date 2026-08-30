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
 * it stays to plain statements of what the thing does.
 */
const points = [
  {
    title: "Send references straight across",
    body: "Select references on the Dump Board and press Ctrl B. Each one lands at the end of the sequence.",
  },
  {
    title: "Set the frame once",
    body: "Choose 16:9, 2.39:1, 9:16 or another project ratio. Every panel follows it while each image stays repositionable inside.",
  },
  {
    title: "See the timing at a glance",
    body: "Add an action, camera move and duration to each panel. The running time adds up in the header.",
  },
];

export function IntroducingStoryboard() {
  return (
    <section id="storyboard" className="scroll-mt-24 py-16 sm:py-24">
      <Shell wide>
        <SectionHead eyebrow="Storyboard" title="Turn the direction into a sequence.">
          When order and timing matter, arrange the references you already
          collected into panels without rebuilding the project somewhere else.
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
