import { useRef } from "react";
import { motion, useInView, useScroll } from "motion/react";
import { Hexagon } from "lucide-react";
import { OrbitStarScene } from "@/components/three/WeaponRain";
import { SKILL_GROUPS } from "@/data/portfolio";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { TiltCard } from "@/components/TiltCard";

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { margin: "100px" });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  return (
    <section ref={sectionRef} id="skills" data-testid="skills-section" className="relative py-28 md:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(147,51,234,0.08),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 z-20" data-testid="orbit-star-canvas">
        <OrbitStarScene progress={scrollYProgress} active={inView} />
      </div>
      <div className="relative z-10 mx-auto w-[min(1240px,92vw)]">
        <SectionHeading
          num="02"
          code="SKILL_MATRIX"
          title="Neural Skill Constellation"
          jp="スキル"
          sub="Every node is a weapon in the arsenal. Hover to inspect its charge level."
        />

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {SKILL_GROUPS.map((group, gi) => (
            <Reveal key={group.name} delay={0.07 * gi}>
              <TiltCard
                max={9}
                testId={`skill-group-${group.name.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                className="glass-panel corner-brackets rounded-2xl p-6 h-full group transition-shadow duration-300 hover:shadow-[0_0_45px_rgba(147,51,234,0.3)]"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-heading text-lg font-bold uppercase tracking-[0.15em] text-white">
                    {group.name}
                  </h3>
                  <span className="font-mono text-[10px] tracking-[0.25em] text-cyan-300/70">
                    [{group.code}]
                  </span>
                </div>
                <div className="space-y-4">
                  {group.skills.map((skill, si) => (
                    <div key={skill.name} className="group/skill" data-testid={`skill-${skill.name.toLowerCase().replace(/[^a-z]+/g, "-")}`}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="flex items-center gap-2 text-sm text-purple-100/90 transition-colors group-hover/skill:text-white">
                          <Hexagon className="size-3 text-purple-400 transition-all duration-300 group-hover/skill:text-cyan-300 group-hover/skill:rotate-90" />
                          {skill.name}
                        </span>
                        <span className="font-mono text-[10px] text-purple-400/70">{skill.level}%</span>
                      </div>
                      <div className="h-1 rounded-full bg-purple-950/80 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-cyan-400 shadow-[0_0_10px_rgba(168,85,247,0.7)]"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true, margin: "-40px" }}
                          transition={{ duration: 1.2, delay: 0.08 * si, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
