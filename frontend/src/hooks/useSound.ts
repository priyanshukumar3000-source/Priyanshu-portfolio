import { useCallback, useEffect, useRef, useState } from "react";

let ctx: AudioContext | null = null;
let enabled = false;
const listeners = new Set<(v: boolean) => void>();

function blip(freq: number, dur: number, type: OscillatorType, gain = 0.05) {
  if (!enabled) return;
  try {
    ctx = ctx ?? new AudioContext();
    if (ctx.state === "suspended") void ctx.resume();
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    g.gain.setValueAtTime(gain, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
    osc.connect(g).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + dur);
  } catch {
    /* audio unavailable */
  }
}

export const sfx = {
  hover: () => blip(880, 0.06, "sine", 0.02),
  click: () => blip(440, 0.12, "triangle", 0.045),
  type: () => blip(1200, 0.03, "square", 0.012),
  success: () => {
    blip(523, 0.12, "sine", 0.04);
    setTimeout(() => blip(784, 0.18, "sine", 0.04), 110);
  },
};

export function useSound() {
  const [on, setOn] = useState(enabled);

  useEffect(() => {
    const fn = (v: boolean) => setOn(v);
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  }, []);

  const toggle = useCallback(() => {
    enabled = !enabled;
    listeners.forEach((fn) => fn(enabled));
    if (enabled) sfx.success();
  }, []);

  return { on, toggle };
}
