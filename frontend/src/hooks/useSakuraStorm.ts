import { useCallback, useEffect, useState } from "react";

const SEQ = [
  "arrowup", "arrowup", "arrowdown", "arrowdown",
  "arrowleft", "arrowright", "arrowleft", "arrowright",
  "b", "a",
];

export function useSakuraStorm() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    let idx = 0;
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      idx = k === SEQ[idx] ? idx + 1 : k === SEQ[0] ? 1 : 0;
      if (idx === SEQ.length) {
        idx = 0;
        setActive(true);
      }
    };
    const onEvent = () => setActive(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("sakura-storm", onEvent);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("sakura-storm", onEvent);
    };
  }, []);

  const stop = useCallback(() => setActive(false), []);
  return { active, stop };
}
