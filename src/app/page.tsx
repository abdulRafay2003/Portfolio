import { Hero } from "@/components/sections/hero";
import { Work } from "@/components/sections/work";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { Services } from "@/components/sections/services";
import { Achievements } from "@/components/sections/github";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Work />
      <About />
      <Experience />
      <Skills />
      <Services />
      <Achievements />
      <Contact />
    </>
  );
}
