import { ExternalLink, FileText, Github } from "lucide-react";
import { PROJECTS } from "@/data/portfolio";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { TiltCard } from "@/components/TiltCard";
import { sfx } from "@/hooks/useSound";

export function Projects() {
  return (
    <section id="projects" data-testid="projects-section" className="relative py-28 md:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(147,51,234,0.09),transparent_55%)]" />
      <div className="relative mx-auto w-[min(1240px,92vw)]">
        <SectionHeading
          num="04"
          code="DEPLOYED_WORLDS"
          title="Things I've Built"
          jp="プロジェクト"
          sub="Real products with real problems behind them — designed, engineered and shipped."
        />

        <div className="space-y-16">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.id} delay={0.05}>
              <article
                data-testid={`project-card-${p.id}`}
                className={`grid lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                <TiltCard max={6} testId={`project-visual-${p.id}`} className="group relative">
                  <div className="corner-brackets relative overflow-hidden rounded-2xl border border-purple-500/25 shadow-[0_24px_70px_rgba(0,0,0,0.6)]">
                    <img
                      src={p.image}
                      alt={`${p.title} interface preview`}
                      className="w-full aspect-[3/2] object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/30 via-transparent to-cyan-500/10 opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
                    <span className="absolute top-4 left-4 font-heading text-5xl font-extrabold text-white/15">
                      {p.index}
                    </span>
                  </div>
                  <div className="absolute -inset-6 -z-10 rounded-3xl bg-[radial-gradient(circle,rgba(147,51,234,0.18),transparent_70%)] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </TiltCard>

                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <p className="font-mono text-[11px] tracking-[0.3em] text-cyan-300/80">
                      [{p.index} // {p.kind}]
                    </p>
                    <span className="rounded-full border border-yellow-400/40 bg-yellow-400/10 px-2.5 py-0.5 font-mono text-[9px] tracking-[0.2em] text-yellow-300">
                      ★ TOP-RATED BUILD
                    </span>
                  </div>
                  <h3 className="font-heading text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-base text-purple-300/80 font-heading">{p.tagline}</p>

                  <div className="mt-6 space-y-4 text-sm leading-relaxed">
                    <div className="glass-panel rounded-xl p-4">
                      <p className="font-mono text-[10px] tracking-[0.25em] text-red-400/80 mb-1">// PROBLEM</p>
                      <p className="text-purple-100/75">{p.problem}</p>
                    </div>
                    <div className="glass-panel rounded-xl p-4">
                      <p className="font-mono text-[10px] tracking-[0.25em] text-emerald-400/80 mb-1">// SOLUTION</p>
                      <p className="text-purple-100/75">{p.solution}</p>
                    </div>
                  </div>

                  <ul className="mt-5 grid sm:grid-cols-2 gap-2">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-purple-200/70">
                        <span className="mt-1 size-1.5 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 font-mono text-[10px] tracking-[0.1em] text-purple-200/90"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-wrap gap-5">
                    <a
                      data-testid={`project-demo-${p.id}`}
                      href={p.demo}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={sfx.hover}
                      onClick={sfx.click}
                      className="group inline-flex items-center gap-1.5 font-heading text-sm font-bold uppercase tracking-[0.12em] text-purple-300 hover:text-white transition-colors"
                    >
                      Live Demo
                      <ExternalLink className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      <span className="absolute" />
                    </a>
                    <a
                      data-testid={`project-code-${p.id}`}
                      href={p.code}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={sfx.hover}
                      onClick={sfx.click}
                      className="inline-flex items-center gap-1.5 font-heading text-sm font-bold uppercase tracking-[0.12em] text-purple-300/70 hover:text-cyan-300 transition-colors"
                    >
                      View Code <Github className="size-4" />
                    </a>
                    <a
                      data-testid={`project-case-study-${p.id}`}
                      href={p.caseStudy}
                      onMouseEnter={sfx.hover}
                      onClick={(e) => {
                        if (p.caseStudy === "#") e.preventDefault();
                        sfx.click();
                      }}
                      className="inline-flex items-center gap-1.5 font-heading text-sm font-bold uppercase tracking-[0.12em] text-purple-300/70 hover:text-fuchsia-300 transition-colors"
                    >
                      Case Study <FileText className="size-4" />
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <p className="mt-14 text-center font-mono text-xs tracking-[0.25em] text-purple-400/50">
            + NEW QUESTS LOADING — MORE BUILDS IN THE LAB
          </p>
        </Reveal>
      </div>
    </section>
  );
}
