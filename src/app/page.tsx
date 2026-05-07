import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Research } from "@/components/sections/Research";
import { Skills } from "@/components/sections/Skills";
import { Instagram } from "@/components/sections/Instagram";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative flex-1">
      <Hero />
      <About />
      <Education />
      <Experience />
      <Research />
      <Skills />
      <Instagram />
      <Contact />
      <Footer />
    </main>
  );
}
