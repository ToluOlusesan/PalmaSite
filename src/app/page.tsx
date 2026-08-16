import { FamilyHero } from "@/components/family/FamilyHero";
import { CompareBand } from "@/components/family/CompareBand";
import { SharedPrinciples } from "@/components/family/SharedPrinciples";
import { FamilyGet } from "@/components/family/FamilyGet";

/**
 * The family page. Name the family, present the choice, answer "which one",
 * state what they share, hand over a download.
 *
 * The chooser lives inside the hero rather than in a band below it, because a
 * page whose only job is a two-way choice should not make you scroll to find
 * the choice.
 */
export default function Home() {
  return (
    <>
      <FamilyHero />
      <CompareBand />
      <SharedPrinciples />
      <FamilyGet />
    </>
  );
}
