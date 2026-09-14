import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "motion/react";
import { Code2, Cpu, PenTool, Sparkles, Trophy } from "lucide-react";
import { IMAGES, OWNER, STATS } from "@/data/portfolio";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { TiltCard } from "@/components/TiltCard";

const ICONS: Record<string, typeof Code2> = {
  code: Code2,
  pen: PenTool,
  cpu: Cpu,
  trophy: Trophy,
  spark: Sparkles,
};

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => `${Math.round(v)}`);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, { duration: 1.8, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [inView, mv, value]);

  return (
    <span ref={ref} className="font-heading text-4xl md:text-5xl font-extrabold text-white text-glow">
      <motion.span>{rounded}</motion.span>
      <span className="text-purple-400">{suffix}</span>
    </span>
  );
}

export function About() {
  return (
    <section id="about" data-testid="about-section" className="relative py-28 md:py-36">
      <div className="mx-auto w-[min(1240px,92vw)]">
        <SectionHeading
          num="01"
          code="WHO_AM_I"
          title="Architect of Ideas"
          jp="自己紹介"
          sub="Not just a developer who designs, not just a designer who codes — the overlap is where I live."
        />

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-14 items-center">
          <Reveal className="relative mx-auto w-[min(380px,80vw)]">
            <TiltCard max={8} testId="about-portrait-main" className="relative z-10">
              <div className="corner-brackets overflow-hidden rounded-2xl border border-purple-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                <img
                  src={IMAGES.aboutAnime}
                  alt="Stylized anime portrait of Priyanshu Kumar"
                  className="w-full aspect-[3/4] object-cover"
                  loading="lazy"
                />
              </div>
            </TiltCard>
            <TiltCard max={10} className="absolute -bottom-10 -right-6 sm:-right-12 w-40 sm:w-48 z-20">
              <div className="overflow-hidden rounded-xl border border-cyan-400/30 shadow-[0_16px_40px_rgba(0,0,0,0.6)]">
                <img
                  src={IMAGES.aboutBW}
                  alt="Priyanshu Kumar, black and white portrait"
                  className="w-full aspect-square object-cover"
                  loading="lazy"
                />
              </div>
            </TiltCard>
            <div className="absolute -top-6 -left-6 glass-panel rounded-lg px-3 py-2 font-mono text-[10px] tracking-[0.2em] text-purple-200/80 z-20 animate-float">
              CSE STUDENT // BUILDER
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="text-base md:text-lg leading-relaxed text-purple-200/80" data-testid="about-intro">
                {OWNER.intro}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-base leading-relaxed text-purple-200/60">
                My loop is simple: <span className="text-purple-300 font-semibold">design it like an artist,
                build it like an engineer, ship it like it's a mission.</span> Every project is a level —
                and I don't stop until it's cleared.
              </p>
            </Reveal>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4" data-testid="about-stats-grid">
              {STATS.map((s, i) => {
                const Icon = ICONS[s.icon];
                return (
                  <Reveal key={s.label} delay={0.06 * i}>
                    <TiltCard
                      max={12}
                      testId={`stat-card-${s.label.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                      className="glass-panel rounded-xl p-5 h-full transition-shadow duration-300 hover:shadow-[0_0_35px_rgba(168,85,247,0.25)]"
                    >
                      <Icon className="size-5 text-cyan-300 mb-3" />
                      <Counter value={s.value} suffix={s.suffix} />
                      <p className="mt-2 font-heading text-xs font-bold uppercase tracking-[0.15em] text-purple-200/90">
                        {s.label}
                      </p>
                      <p className="font-mono text-[10px] tracking-[0.15em] text-purple-400/60 mt-1">{s.note}</p>
                    </TiltCard>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
