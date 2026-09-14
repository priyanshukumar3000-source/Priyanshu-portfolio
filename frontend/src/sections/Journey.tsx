import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { JOURNEY } from "@/data/portfolio";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

export function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="journey" data-testid="journey-section" className="relative py-28 md:py-36">
      <div className="mx-auto w-[min(1240px,92vw)]">
        <SectionHeading
          num="06"
          code="PROTAGONIST_PATH"
          title="The Evolution Arc"
          jp="旅"
          sub="Learn → Design → Build → Compete → Improve → Evolve. Every level unlocked, earned the hard way."
        />

        <div ref={ref} className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-purple-950 md:-translate-x-1/2" />
          <motion.div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 via-fuchsia-400 to-cyan-400 shadow-[0_0_12px_rgba(168,85,247,0.8)] origin-top md:-translate-x-1/2"
            style={{ scaleY: lineScale }}
          />

          <div className="space-y-14">
            {JOURNEY.map((stage, i) => {
              const left = i % 2 === 0;
              return (
                <Reveal key={stage.name} delay={0.05}>
                  <div
                    data-testid={`journey-stage-${stage.name.toLowerCase()}`}
                    className={`relative grid md:grid-cols-2 gap-6 md:gap-16 pl-12 md:pl-0 ${
                      left ? "" : "md:[&>*:first-child]:order-2"
                    }`}
                  >
                    <span className="absolute left-4 md:left-1/2 top-2 -translate-x-1/2 grid size-8 place-items-center rounded-full border border-purple-400/50 bg-[#120d24] shadow-[0_0_18px_rgba(168,85,247,0.5)]">
                      <span className="size-2 rounded-full bg-cyan-300" />
                    </span>
                    <div className={left ? "md:text-right" : ""}>
                      <p className="font-mono text-[10px] tracking-[0.3em] text-cyan-300/80">
                        {stage.phase} · {stage.years}
                      </p>
                      <h3 className="mt-1 font-heading text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white text-glow">
                        {stage.name}
                      </h3>
                    </div>
                    <div className="glass-panel rounded-xl p-5">
                      <p className="text-sm leading-relaxed text-purple-100/75">{stage.desc}</p>
                      <div className={`mt-4 flex flex-wrap gap-2 ${left ? "md:justify-start" : ""}`}>
                        {stage.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-purple-500/30 px-2.5 py-0.5 font-mono text-[10px] text-purple-200/80"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
