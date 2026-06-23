import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { ToolsShowcase } from "@/components/ToolsShowcase";
import { Spotlight } from "@/components/Spotlight";
import { Principles } from "@/components/Principles";
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
        <Spotlight />
        <ToolsShowcase />
        <Principles />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
