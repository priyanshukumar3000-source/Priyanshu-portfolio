import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

const BOOT_LINES = [
  "> mounting neural interface...",
  "> compiling shaders [OK]",
  "> loading design systems [OK]",
  "> calibrating protagonist aura...",
  "> rendering world",
];

const STAGES = ["DESIGN", "CODE", "CREATE", "EVOLVE"];

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [welcome, setWelcome] = useState(false);
  const done = useRef(false);

  useEffect(() => {
    const start = performance.now();
    const DURATION = 2600;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(100, ((now - start) / DURATION) * 100);
      setProgress(p);
      if (p < 100) raf = requestAnimationFrame(tick);
      else {
        setWelcome(true);
        setTimeout(() => {
          if (!done.current) {
            done.current = true;
            onComplete();
          }
        }, 900);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  const stageIdx = Math.min(STAGES.length - 1, Math.floor((progress / 100) * STAGES.length));
  const visibleLogs = Math.min(BOOT_LINES.length, Math.floor(progress / 18));

  return (
    <motion.div
      data-testid="loading-screen"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#08060e]"
      exit={{ y: "-100%", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="grid-overlay absolute inset-0" />
      <div className="relative w-[min(520px,88vw)]">
        {!welcome ? (
          <>
            <p className="font-mono text-xs tracking-[0.4em] text-purple-400/90 mb-6 text-center" data-testid="loading-status">
              INITIALIZING PORTFOLIO...
            </p>
            <div className="font-mono text-[11px] text-purple-300/50 h-24 mb-6 space-y-1">
              {BOOT_LINES.slice(0, visibleLogs).map((l) => (
                <motion.p key={l} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}>
                  {l}
                </motion.p>
              ))}
            </div>
            <div className="flex items-center justify-between mb-3">
              {STAGES.map((s, i) => (
                <span
                  key={s}
                  className={`font-heading text-[10px] sm:text-xs font-bold tracking-[0.3em] transition-colors duration-500 ${
                    i <= stageIdx ? "text-purple-300 text-glow" : "text-purple-900"
                  }`}
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="h-[3px] w-full bg-purple-950 overflow-hidden rounded-full">
              <div
                className="h-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-cyan-400 transition-[width] duration-100 shadow-[0_0_16px_rgba(168,85,247,0.8)]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-3 text-right font-mono text-xs text-cyan-300/80">{Math.floor(progress)}%</p>
            <button
              data-testid="loading-skip-button"
              onClick={() => {
                if (!done.current) {
                  done.current = true;
                  onComplete();
                }
              }}
              className="mt-8 mx-auto block font-mono text-[10px] tracking-[0.3em] text-purple-400/50 hover:text-purple-300 transition-colors"
            >
              [ SKIP SEQUENCE ]
            </button>
          </>
        ) : (
          <motion.p
            initial={{ opacity: 0, scale: 0.92, letterSpacing: "0.6em" }}
            animate={{ opacity: 1, scale: 1, letterSpacing: "0.25em" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center font-heading text-2xl sm:text-4xl font-extrabold uppercase text-white text-glow"
            data-testid="loading-welcome"
          >
            Welcome to my world.
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
