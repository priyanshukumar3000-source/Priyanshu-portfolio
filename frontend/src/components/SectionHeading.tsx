import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  num: string;
  code: string;
  title: string;
  sub?: string;
  jp?: string;
}

export function SectionHeading({ num, code, title, sub, jp }: SectionHeadingProps) {
  return (
    <div className="mb-14 md:mb-20" data-testid={`section-heading-${code.toLowerCase()}`}>
      <Reveal>
        <div className="flex items-center gap-4 mb-5">
          <span className="font-mono text-xs tracking-[0.3em] text-purple-400/90">
            [SEC_{num} // {code}]
          </span>
          <span className="neon-line flex-1 max-w-40" />
          {jp && (
            <span className="font-mono text-[10px] tracking-[0.2em] text-cyan-400/60">{jp}</span>
          )}
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight leading-none text-white">
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.16}>
          <p className="mt-5 max-w-2xl text-base md:text-lg leading-relaxed text-purple-200/70">{sub}</p>
        </Reveal>
      )}
    </div>
  );
}
