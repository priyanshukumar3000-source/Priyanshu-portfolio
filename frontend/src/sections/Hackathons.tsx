import { motion } from "motion/react";
import { Medal, Swords, Trophy, Users } from "lucide-react";
import { HACKATHONS } from "@/data/portfolio";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { TiltCard } from "@/components/TiltCard";

const RANK_STYLE: Record<string, { icon: typeof Trophy; color: string }> = {
  FINALIST: { icon: Trophy, color: "text-yellow-300" },
  "TOP 10": { icon: Medal, color: "text-cyan-300" },
  PARTICIPANT: { icon: Swords, color: "text-purple-300" },
};

export function Hackathons() {
  return (
    <section id="hackathons" data-testid="hackathons-section" className="relative py-28 md:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_70%,rgba(147,51,234,0.08),transparent_50%)]" />
      <div className="relative mx-auto w-[min(1240px,92vw)]">
        <SectionHeading
          num="05"
          code="PRESSURE_MODE"
          title="Built Under Pressure."
          jp="ハッカソン"
          sub="48-hour arenas. No sleep, no excuses — just missions, teamwork and shipped demos."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {HACKATHONS.map((h, i) => {
            const rank = RANK_STYLE[h.rank] ?? RANK_STYLE.PARTICIPANT;
            const Icon = rank.icon;
            return (
              <Reveal key={h.event} delay={0.08 * i}>
                <TiltCard
                  max={10}
                  testId={`hackathon-card-${i}`}
                  className="glass-panel corner-brackets relative rounded-2xl p-6 h-full overflow-hidden transition-shadow duration-300 hover:shadow-[0_0_45px_rgba(168,85,247,0.3)]"
                >
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <p className={`flex items-center gap-2 font-heading text-sm font-extrabold uppercase tracking-[0.15em] ${rank.color}`}>
                        <Icon className="size-4" />
                        {h.rank}
                      </p>
                      <h3 className="mt-2 font-heading text-xl font-bold text-white">{h.event}</h3>
                      <p className="font-mono text-[10px] tracking-[0.25em] text-purple-400/70 mt-1">
                        SEASON {h.year}
                      </p>
                    </div>
                    <span className="font-heading text-4xl font-extrabold text-purple-500/20">
                      0{i + 1}
                    </span>
                  </div>

                  <div className="rounded-xl border border-purple-500/20 bg-[#090514]/80 p-4 mb-4">
                    <p className="font-mono text-[10px] tracking-[0.25em] text-fuchsia-400/80 mb-1.5">
                      // MISSION
                    </p>
                    <p className="text-sm text-purple-100/75 leading-relaxed">{h.mission}</p>
                  </div>

                  <p className="text-sm text-purple-200/70 leading-relaxed mb-4">{h.achievement}</p>

                  <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.15em] text-cyan-300/70 mb-4">
                    <Users className="size-3.5" />
                    {h.team.toUpperCase()} · BUILD: {h.project.toUpperCase()}
                  </p>

                  <div>
                    <div className="flex justify-between font-mono text-[10px] tracking-[0.2em] text-purple-400/70 mb-1.5">
                      <span>XP GAINED</span>
                      <span>{h.level}/100</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-purple-950/80 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-yellow-300 shadow-[0_0_12px_rgba(217,180,84,0.5)]"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${h.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
