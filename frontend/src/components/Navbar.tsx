import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Volume2, VolumeX, X } from "lucide-react";
import { NAV_LINKS } from "@/data/portfolio";
import { scrollToSection } from "@/hooks/useLenis";
import { sfx, useSound } from "@/hooks/useSound";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const { on, toggle } = useSound();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const go = (id: string) => {
    sfx.click();
    setOpen(false);
    scrollToSection(id);
  };

  const logoClicks = useRef<number[]>([]);
  const onLogoClick = () => {
    const now = Date.now();
    logoClicks.current = [...logoClicks.current.filter((t) => now - t < 2000), now];
    if (logoClicks.current.length >= 5) {
      logoClicks.current = [];
      window.dispatchEvent(new Event("sakura-storm"));
    }
    go("home");
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-3 left-1/2 -translate-x-1/2 z-[80] transition-all duration-500 ${
          scrolled ? "glass-panel rounded-full px-4 py-2" : "px-4 py-3"
        }`}
        style={{ width: "min(1060px, calc(100vw - 24px))" }}
        data-testid="main-navbar"
      >
        <nav className="flex items-center justify-between gap-4">
          <button
            data-testid="nav-logo"
            onClick={onLogoClick}
            className="font-heading font-extrabold tracking-tight text-white text-sm sm:text-base"
          >
            PK<span className="text-purple-400">://</span>EVOLVEX
            <span className="ml-1.5 text-purple-500/50 text-xs align-middle">忍</span>
          </button>

          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ id, label, num }) => (
              <button
                key={id}
                data-testid={`nav-link-${id}`}
                onClick={() => go(id)}
                onMouseEnter={sfx.hover}
                className={`relative px-3 py-1.5 font-mono text-[11px] tracking-[0.15em] uppercase transition-colors rounded-full ${
                  active === id ? "text-white" : "text-purple-300/60 hover:text-purple-200"
                }`}
              >
                <span className="text-purple-500/70 mr-1">{num}</span>
                {label}
                {active === id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-purple-600/25 border border-purple-400/40 shadow-[0_0_18px_rgba(168,85,247,0.35)]"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden md:flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-emerald-300/90 mr-1">
              <span className="status-dot inline-block size-1.5 rounded-full bg-emerald-400" />
              OPEN TO WORK
            </span>
            <button
              data-testid="audio-toggle-btn"
              onClick={toggle}
              aria-label={on ? "Mute sound effects" : "Enable sound effects"}
              className="grid size-8 place-items-center rounded-full border border-purple-500/30 text-purple-300 hover:bg-purple-600/20 hover:shadow-[0_0_14px_rgba(168,85,247,0.4)] transition-all"
            >
              {on ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
            </button>
            <button
              data-testid="mobile-menu-button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="lg:hidden grid size-8 place-items-center rounded-full border border-purple-500/30 text-purple-200"
            >
              <Menu className="size-4" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-[#08060e]/95 backdrop-blur-xl flex flex-col"
            data-testid="mobile-menu"
          >
            <div className="flex justify-end p-5">
              <button
                data-testid="mobile-menu-close"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid size-10 place-items-center rounded-full border border-purple-500/40 text-purple-200"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="flex-1 flex flex-col items-start justify-center gap-2 px-10">
              {NAV_LINKS.map(({ id, label, num }, i) => (
                <motion.button
                  key={id}
                  data-testid={`mobile-nav-link-${id}`}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i }}
                  onClick={() => go(id)}
                  className="font-heading text-4xl font-extrabold uppercase tracking-tight text-white/80 hover:text-purple-300 transition-colors"
                >
                  <span className="font-mono text-sm text-purple-500 mr-3">{num}</span>
                  {label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
