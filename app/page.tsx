import Hero     from "@/components/sections/Hero";
import Pillars  from "@/components/sections/Pillars";
import Process  from "@/components/sections/Process";
import Results  from "@/components/sections/Results";
import Services from "@/components/sections/Services";
import CTA      from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Pillars />
      <Process />
      <Results />
      <Services />
      <CTA />
    </main>
  );
}
