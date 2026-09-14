import { useState } from "react";
import { motion } from "motion/react";
import { ArrowDown, ArrowRight, Terminal } from "lucide-react";
import { IMAGES, OWNER } from "@/data/portfolio";
import { HeroScene } from "@/components/three/HeroScene";
import { scrollToSection } from "@/hooks/useLenis";
import { sfx } from "@/hooks/useSound";

const HUD_CHIPS = [
  { text: "const passion = Infinity;", pos: "top-[8%] -left-4 lg:-left-10", delay: "0s" },
  { text: "<DesignSystem />", pos: "top-[38%] -right-3 lg:-right-8", delay: "1.4s" },
  { text: "await ship(product)", pos: "bottom-[16%] -left-2 lg:-left-6", delay: "2.6s" },
];

export function Hero() {
  const [isDesktop] = useState(() => window.matchMedia("(min-width: 768px)").matches);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setTilt({
      x: ((e.clientX - r.left) / r.width - 0.5) * 2,
      y: ((e.clientY - r.top) / r.height - 0.5) * 2,
    });
  };

  return (
    <section
      id="home"
      data-testid="hero-section"
      onMouseMove={onMouseMove}
      className="relative min-h-screen flex items-center overflow-hidden scanlines"
    >
      {/* environment layers */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_25%,rgba(147,51,234,0.16),transparent_60%),radial-gradient(circle_at_15%_80%,rgba(34,211,238,0.07),transparent_55%)]" />
      <div className="grid-overlay absolute inset-0" />
      {isDesktop && (
        <div className="absolute inset-0 opacity-90">
          <HeroScene />
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#08060e] to-transparent z-10" />

      <div className="relative z-20 mx-auto w-[min(1240px,92vw)] grid lg:grid-cols-[1.15fr_1fr] gap-12 items-center pt-28 pb-20">
        {/* left — copy */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="font-mono text-xs tracking-[0.35em] text-cyan-300/80 mb-6"
            data-testid="hero-overline"
          >
            [ PLAYER_ONE // クリエイティブ・テクノロジスト ]
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="font-heading text-base md:text-lg font-semibold uppercase tracking-[0.2em] text-purple-300/90 mb-4"
            data-testid="hero-name"
          >
            {OWNER.name} — {OWNER.roles.join(" • ")}
          </motion.h2>

          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase leading-[0.95] tracking-tight text-white">
            {OWNER.headline.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-1">
                <motion.span
                  className={`block ${i === 2 ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-300 text-glow" : ""}`}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.5 + i * 0.14, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  data-testid={`hero-headline-line-${i}`}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.7 }}
            className="mt-7 max-w-xl text-base md:text-lg leading-relaxed text-purple-200/70"
            data-testid="hero-tagline"
          >
            {OWNER.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <button
              data-testid="hero-cta-projects"
              onClick={() => {
                sfx.click();
                scrollToSection("projects");
              }}
              onMouseEnter={sfx.hover}
              className="group relative inline-flex items-center gap-2 rounded-full bg-purple-600 px-7 py-3.5 font-heading text-sm font-bold uppercase tracking-[0.15em] text-white shadow-[0_0_30px_rgba(147,51,234,0.5)] transition-all duration-300 hover:bg-purple-500 hover:shadow-[0_0_50px_rgba(168,85,247,0.8)] hover:-translate-y-0.5"
            >
              Explore My Work
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button
              data-testid="hero-cta-contact"
              onClick={() => {
                sfx.click();
                scrollToSection("contact");
              }}
              onMouseEnter={sfx.hover}
              className="group inline-flex items-center gap-2 rounded-full border border-purple-400/40 bg-purple-500/5 px-7 py-3.5 font-heading text-sm font-bold uppercase tracking-[0.15em] text-purple-200 backdrop-blur transition-all duration-300 hover:border-cyan-300/60 hover:text-cyan-200 hover:shadow-[0_0_30px_rgba(34,211,238,0.25)] hover:-translate-y-0.5"
            >
              <Terminal className="size-4" />
              Let's Connect
            </button>
          </motion.div>
        </div>

        {/* right — protagonist */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-[min(420px,80vw)]"
          style={{
            transform: `perspective(1000px) rotateY(${tilt.x * 4}deg) rotateX(${-tilt.y * 3}deg)`,
            transition: "transform 0.3s ease-out",
          }}
          data-testid="hero-character"
        >
          <div className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.3),transparent_65%)] blur-2xl" />
          <div className="animate-spin-slow absolute -inset-5 rounded-full border border-dashed border-purple-500/30" />
          <div className="absolute -inset-12 rounded-full border border-purple-500/10" />
          <div className="corner-brackets relative overflow-hidden rounded-2xl border border-purple-500/30 shadow-[0_0_60px_rgba(147,51,234,0.35)]">
            <img
              src={IMAGES.heroCharacter}
              alt="Priyanshu Kumar in a neon-outlined blazer taking a mirror selfie"
              className="w-full aspect-[3/4] object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08060e]/70 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-purple-200/80">
              <span>LVL.99 // DEV_CLASS</span>
              <span className="text-cyan-300">SYNC: 100%</span>
            </div>
          </div>
          {HUD_CHIPS.map((chip) => (
            <div
              key={chip.text}
              className={`animate-float absolute ${chip.pos} glass-panel rounded-lg px-3 py-1.5 font-mono text-[10px] sm:text-xs text-purple-200/90 whitespace-nowrap`}
              style={{ animationDelay: chip.delay }}
            >
              {chip.text}
            </div>
          ))}
        </motion.div>
      </div>

      <motion.button
        data-testid="hero-scroll-hint"
        onClick={() => scrollToSection("about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-purple-300/60 hover:text-purple-200 transition-colors"
        aria-label="Scroll to about section"
      >
        <span className="font-mono text-[10px] tracking-[0.3em]">SCROLL</span>
        <ArrowDown className="size-4 animate-bounce" />
      </motion.button>
    </section>
  );
}
