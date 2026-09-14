import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ChevronRight, TerminalSquare } from "lucide-react";
import { TERMINAL_COMMANDS } from "@/data/portfolio";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { sfx } from "@/hooks/useSound";

interface Line {
  kind: "cmd" | "out";
  text: string;
}

const BOOT: Line[] = [
  { kind: "out", text: "PK-OS v9.9 — developer mode engaged" },
  { kind: "out", text: 'type "help" to list available commands' },
];

const QUICK = ["whoami", "skills", "mission", "sudo hire"];

export function DevMode() {
  const [history, setHistory] = useState<Line[]>(BOOT);
  const [input, setInput] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [history]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    sfx.click();
    if (cmd === "clear") {
      setHistory([]);
      return;
    }
    const output = TERMINAL_COMMANDS[cmd] ?? [`command not found: ${cmd} — try "help"`];
    setHistory((h) => [...h, { kind: "cmd", text: cmd }, ...output.map((t) => ({ kind: "out" as const, text: t }))]);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    run(input);
    setInput("");
  };

  return (
    <section id="terminal" data-testid="terminal-section" className="relative py-28 md:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_60%,rgba(34,211,238,0.05),transparent_50%)]" />
      <div className="relative mx-auto w-[min(980px,92vw)]">
        <SectionHeading
          num="07"
          code="SHELL_ACCESS"
          title="My Developer Mode"
          jp="ターミナル"
          sub="Every protagonist has a command line. Mine answers back."
        />

        <Reveal>
          <div
            className="glass-panel scanlines relative rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.65)]"
            onClick={() => inputRef.current?.focus()}
            data-testid="terminal-window"
          >
            <div className="flex items-center justify-between border-b border-purple-500/20 bg-[#0c091a]/90 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-red-500/80" />
                <span className="size-3 rounded-full bg-yellow-500/80" />
                <span className="size-3 rounded-full bg-emerald-500/80" />
              </div>
              <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-purple-300/70">
                <TerminalSquare className="size-3.5" />
                priyanshu@evolve:~
              </p>
            </div>

            <div ref={bodyRef} className="h-80 overflow-y-auto p-5 font-mono text-sm leading-relaxed">
              {history.map((line, i) =>
                line.kind === "cmd" ? (
                  <motion.p key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-pink-400">
                    <span className="text-cyan-300">$</span> {line.text}
                  </motion.p>
                ) : (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-purple-100/80 whitespace-pre-wrap"
                  >
                    {line.text}
                  </motion.p>
                )
              )}
              <form onSubmit={onSubmit} className="flex items-center gap-2 mt-1">
                <ChevronRight className="size-4 text-cyan-300 shrink-0" />
                <input
                  ref={inputRef}
                  data-testid="terminal-input"
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    sfx.type();
                  }}
                  className="w-full bg-transparent font-mono text-sm text-emerald-200 outline-none placeholder:text-purple-400/40 caret-transparent"
                  placeholder="type a command..."
                  aria-label="Terminal command input"
                  autoComplete="off"
                  spellCheck={false}
                />
                <span className="caret-blink -ml-2 h-4 w-2 bg-emerald-300/80" />
              </form>
            </div>

            <div className="flex flex-wrap gap-2 border-t border-purple-500/20 bg-[#0c091a]/90 px-4 py-3">
              {QUICK.map((q) => (
                <button
                  key={q}
                  data-testid={`terminal-quick-${q.replace(/\s+/g, "-")}`}
                  onClick={() => run(q)}
                  onMouseEnter={sfx.hover}
                  className="rounded-full border border-purple-500/30 px-3 py-1 font-mono text-[10px] tracking-[0.15em] text-purple-200/80 transition-all hover:border-cyan-400/60 hover:text-cyan-200 hover:shadow-[0_0_14px_rgba(34,211,238,0.3)]"
                >
                  $ {q}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
