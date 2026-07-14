import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { ToolsShowcase } from "@/components/ToolsShowcase";
import { Principles } from "@/components/Principles";
import { WhatsNew } from "@/components/WhatsNew";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { CaricatureDefs } from "@/components/ToolCaricatures";

export default function Home() {
  return (
    <>
      <CaricatureDefs />
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <ToolsShowcase />
        <Principles />
        <WhatsNew />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
