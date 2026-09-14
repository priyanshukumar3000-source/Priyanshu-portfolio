import { Sparkles } from "lucide-react";
import { MARQUEE_ITEMS } from "@/data/portfolio";

export function Marquee() {
  const row = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div
      className="relative border-y border-purple-500/15 bg-[#0c091a]/80 py-5 overflow-hidden"
      aria-hidden="true"
    >
      <div className="animate-marquee flex w-max items-center gap-10">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center gap-10">
            {row.map((item, i) => (
              <span
                key={`${half}-${i}`}
                className="flex items-center gap-10 font-heading text-sm md:text-base font-semibold uppercase tracking-[0.35em] text-purple-200/50 whitespace-nowrap"
              >
                {item}
                <Sparkles className="size-3.5 text-purple-500/60" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
