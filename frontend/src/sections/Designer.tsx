import { ArrowUpRight } from "lucide-react";
import { DESIGN_WORKS } from "@/data/portfolio";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { TiltCard } from "@/components/TiltCard";

export function Designer() {
  return (
    <section id="design" data-testid="designer-section" className="relative py-28 md:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_30%,rgba(34,211,238,0.05),transparent_50%)]" />
      <div className="relative mx-auto w-[min(1240px,92vw)]">
        <SectionHeading
          num="03"
          code="DESIGN_FIRST"
          title="Designing Before I Develop."
          jp="デザイン"
          sub="Engineering without design is cold logic. Design without engineering is an illusion. I refuse to choose."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {DESIGN_WORKS.map((work, i) => (
            <Reveal key={work.title} delay={0.08 * i} className={work.wide ? "md:col-span-1" : ""}>
              <TiltCard
                max={7}
                testId={`design-card-${i}`}
                className="group relative overflow-hidden rounded-2xl border border-purple-500/20 bg-[#0c091a] h-full transition-all duration-500 hover:border-purple-400/60 hover:shadow-[0_0_50px_rgba(168,85,247,0.35)]"
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={work.image}
                    alt={`${work.title} — ${work.category}`}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08060e] via-[#08060e]/20 to-transparent" />
                  <span className="absolute top-4 left-4 glass-panel rounded-full px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-cyan-300 uppercase">
                    {work.category}
                  </span>
                </div>
                <div className="relative p-6 translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-heading text-xl font-bold text-white">{work.title}</h3>
                    <ArrowUpRight className="size-5 shrink-0 text-purple-400 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-purple-200/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    {work.desc}
                  </p>
                </div>
                <span className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-inset ring-purple-400/0 transition-all duration-500 group-hover:ring-purple-400/40" />
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-10 text-center font-mono text-xs tracking-[0.25em] text-purple-400/50" data-testid="design-note">
            FIGMA // DESIGN SYSTEMS // PROTOTYPES // BRANDING — FULL CASE STUDIES ON REQUEST
          </p>
        </Reveal>
      </div>
    </section>
  );
}
