import { useEffect } from "react";
import { createPortal } from "react-dom";

export interface SlashStrike {
  at: number;
  x: number;
  y: number;
  radius: number;
  angle: number;
}

export function KatanaSlash({ strike, reducedMotion }: { strike: SlashStrike; reducedMotion: boolean }) {
  useEffect(() => {
    if (reducedMotion) return;
    const content = document.querySelector<HTMLElement>('[data-testid="portfolio-content"]');
    const shake = content?.animate(
      [
        { translate: "0px 0px" }, { translate: "-6px 3px" },
        { translate: "5px -3px" }, { translate: "-4px 2px" },
        { translate: "3px -1px" }, { translate: "-1px 1px" },
        { translate: "0px 0px" },
      ],
      { duration: 260, delay: 90, easing: "ease-out" }
    );
    return () => shake?.cancel();
  }, [strike.at, reducedMotion]);

  if (reducedMotion) return null;
  const end = strike.angle + Math.PI * 7 / 6;
  const path = `M ${100 * Math.cos(strike.angle)} ${100 * Math.sin(strike.angle)} A 100 100 0 1 1 ${100 * Math.cos(end)} ${100 * Math.sin(end)}`;
  return createPortal(
    <svg
      data-testid="about-katana-slash"
      aria-hidden="true"
      className="katana-slash-overlay"
      viewBox="-120 -120 240 240"
      style={{ left: strike.x, top: strike.y, width: strike.radius * 2.4, height: strike.radius * 2.4 }}
    >
      <defs>
        <linearGradient id="katana-slash-color" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a855f7" />
          <stop offset="0.6" stopColor="#c084fc" />
          <stop offset="1" stopColor="#67e8f9" />
        </linearGradient>
      </defs>
      <g fill="none" strokeLinecap="round">
        <path d={path} pathLength="1" stroke="url(#katana-slash-color)" strokeWidth="14" className="katana-slash-stroke katana-slash-bloom" />
        <path d={path} pathLength="1" stroke="url(#katana-slash-color)" strokeWidth="5" className="katana-slash-stroke" />
        <path d={path} pathLength="1" stroke="#f5f3ff" strokeWidth="1.4" className="katana-slash-stroke" />
      </g>
    </svg>,
    document.body
  );
}
