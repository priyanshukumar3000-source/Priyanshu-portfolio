import { useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { SakuraStorm } from "./SakuraStorm";
import { useSakuraStorm } from "@/hooks/useSakuraStorm";
import { sfx } from "@/hooks/useSound";

export function SakuraStormGate() {
  const { active, stop } = useSakuraStorm();

  useEffect(() => {
    if (active) {
      sfx.success();
      toast.success("桜 Sakura Storm unleashed — ESC to disperse");
    }
  }, [active]);

  return <AnimatePresence>{active && <SakuraStorm onExit={stop} />}</AnimatePresence>;
}
