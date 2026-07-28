"use client";

import { ReactNode, createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import Lenis from "lenis";
import { MotionConfig } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-media";

type ScrollAPI = {
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement, offset?: number) => void;
  stop: () => void;
  start: () => void;
};

const ScrollContext = createContext<ScrollAPI>({
  lenis: null,
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
});

export const useSmoothScroll = () => useContext(ScrollContext);

/**
 * Owns the single Lenis instance and its rAF loop. Everything that needs to
 * drive or read scroll goes through this rather than instantiating its own —
 * two rAF loops on the same scroller is the classic source of jitter.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const raf = useRef<number>(0);

  useEffect(() => {
    // Reduced motion: leave the browser's native scrolling alone entirely.
    if (reduced) return;

    const instance = new Lenis({
      duration: 1.05,
      // Exponential ease-out: fast pickup, long quiet settle.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      // Native momentum on touch already feels right; overriding it makes
      // mobile feel laggy and disconnected from the finger.
      syncTouch: false,
      touchMultiplier: 1.6,
    });

    setLenis(instance);

    const loop = (time: number) => {
      instance.raf(time);
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf.current);
      instance.destroy();
      setLenis(null);
    };
  }, [reduced]);

  /**
   * Memoised so the identity is stable across renders. Consumers put these
   * functions in effect dependency arrays; an unstable value would tear those
   * effects down and rebuild them on every parent render.
   */
  const api = useMemo<ScrollAPI>(
    () => ({
      lenis,
      scrollTo: (target, offset = 0) => {
        if (lenis) {
          lenis.scrollTo(target, { offset, duration: 1.4 });
          return;
        }
        const el =
          typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
        if (el instanceof HTMLElement) {
          window.scrollTo({ top: el.offsetTop + offset, behavior: "smooth" });
        } else if (typeof target === "number") {
          window.scrollTo({ top: target + offset, behavior: "smooth" });
        }
      },
      stop: () => lenis?.stop(),
      start: () => lenis?.start(),
    }),
    [lenis],
  );

  return (
    /*
     * `reducedMotion="user"` makes Framer Motion drop transform and layout
     * animations when the OS asks for reduced motion, while still running
     * opacity — so scroll-revealed content fades in and is never left stuck
     * invisible at its `initial` state. The CSS media query in globals.css
     * only covers CSS animations; this covers the JS-driven ones.
     */
    <MotionConfig reducedMotion="user">
      <ScrollContext.Provider value={api}>{children}</ScrollContext.Provider>
    </MotionConfig>
  );
}
