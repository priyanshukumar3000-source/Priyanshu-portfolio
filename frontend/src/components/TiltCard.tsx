import { useRef, useState, type ReactNode, type CSSProperties } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  max?: number;
  testId?: string;
}

export function TiltCard({ children, className = "", max = 10, testId }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<CSSProperties>({});

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setStyle({
      transform: `perspective(900px) rotateY(${px * max}deg) rotateX(${-py * max}deg) translateZ(0)`,
      transition: "transform 0.08s linear",
    });
  };

  const onLeave = () =>
    setStyle({
      transform: "perspective(900px) rotateY(0deg) rotateX(0deg)",
      transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
    });

  return (
    <div
      ref={ref}
      data-testid={testId}
      className={className}
      style={{ transformStyle: "preserve-3d", ...style }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}
