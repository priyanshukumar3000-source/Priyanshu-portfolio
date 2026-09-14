import { useEffect, useRef } from "react";
import { motion } from "motion/react";

interface Petal {
  x: number;
  y: number;
  s: number;
  vy: number;
  sway: number;
  phase: number;
  rot: number;
  vr: number;
  alpha: number;
  light: number;
}

export function SakuraStorm({ onExit }: { onExit: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const count = Math.min(170, Math.floor((w * h) / 8500));
    const petals: Petal[] = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h * 2 - h * 2,
      s: 6 + Math.random() * 9,
      vy: 0.9 + Math.random() * 1.9,
      sway: 0.6 + Math.random() * 1.5,
      phase: Math.random() * Math.PI * 2,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.07,
      alpha: 0.5 + Math.random() * 0.45,
      light: 70 + Math.random() * 16,
    }));

    let raf = 0;
    let t = 0;
    const draw = () => {
      t += 0.012;
      ctx.clearRect(0, 0, w, h);
      for (const p of petals) {
        p.y += p.vy;
        p.x += Math.sin(t * 2 + p.phase) * p.sway;
        p.rot += p.vr;
        if (p.y > h + 24) {
          p.y = -24;
          p.x = Math.random() * w;
        }
        if (p.x > w + 24) p.x = -24;
        else if (p.x < -24) p.x = w + 24;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        const s = p.s;
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.bezierCurveTo(s * 0.9, -s * 0.7, s * 0.8, s * 0.5, 0, s);
        ctx.bezierCurveTo(-s * 0.8, s * 0.5, -s * 0.9, -s * 0.7, 0, -s);
        ctx.fillStyle = `hsla(335, 88%, ${p.light}%, ${p.alpha})`;
        ctx.fill();
        ctx.restore();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onExit();
    };
    window.addEventListener("keydown", onKey);
    const timeout = setTimeout(onExit, 30000);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", onKey);
      clearTimeout(timeout);
    };
  }, [onExit]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
      className="pointer-events-none fixed inset-0 z-[85]"
      data-testid="sakura-storm"
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
      <motion.p
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: [0, 1, 1, 0], scale: 1 }}
        transition={{ duration: 3.6, times: [0, 0.15, 0.8, 1] }}
        className="absolute inset-0 grid place-items-center font-heading text-4xl md:text-6xl font-extrabold tracking-[0.25em] text-pink-200 text-glow text-center"
      >
        桜 SAKURA STORM 桜
      </motion.p>
      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.35em] text-pink-200/70">
        ESC TO DISPERSE
      </p>
    </motion.div>
  );
}
