import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { Toaster } from "@/components/ui/sonner";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Navbar } from "@/components/Navbar";
import { Marquee } from "@/components/Marquee";
import { CustomCursor } from "@/components/CustomCursor";
import { EmberField } from "@/components/EmberField";
import { ShurikenDivider } from "@/components/ShurikenDivider";
import { SakuraStormGate } from "@/components/SakuraStormGate";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Skills } from "@/sections/Skills";
import { Designer } from "@/sections/Designer";
import { Projects } from "@/sections/Projects";
import { Hackathons } from "@/sections/Hackathons";
import { Journey } from "@/sections/Journey";
import { DevMode } from "@/sections/DevMode";
import { Contact } from "@/sections/Contact";
import { useLenis, scrollToSection } from "@/hooks/useLenis";

export default function Home() {
  const [loading, setLoading] = useState(true);
  useLenis(!loading);

  return (
    <div className="relative min-h-screen bg-[#08060e] text-[#f3f0fc]">
      <div className="noise-overlay" />
      <CustomCursor />
      <EmberField />
      <SakuraStormGate />
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && <Navbar />}

      <main data-testid="portfolio-content">
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Designer />
        <ShurikenDivider />
        <Projects />
        <Hackathons />
        <Journey />
        <ShurikenDivider />
        <DevMode />
        <Contact />
      </main>

      <footer className="border-t border-purple-500/15 py-10">
        <div className="mx-auto flex w-[min(1240px,92vw)] flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="font-heading text-sm font-bold tracking-tight text-white">
            PK<span className="text-purple-400">://</span>EVOLVEX
          </p>
          <p className="font-mono text-[10px] tracking-[0.25em] text-purple-400/50 text-center">
            DESIGNED & BUILT BY PRIYANSHU KUMAR — © 2026
          </p>
          <button
            data-testid="back-to-top-button"
            onClick={() => scrollToSection("home")}
            className="font-mono text-[10px] tracking-[0.25em] text-purple-300/70 hover:text-cyan-300 transition-colors"
          >
            [ RETURN_TO_TOP ]
          </button>
        </div>
      </footer>

      <Toaster />
    </div>
  );
}
