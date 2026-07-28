"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/site";
import { ease } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/use-media";
import { useSmoothScroll } from "@/components/providers/smooth-scroll";

const WORDS = ["Mobile", "Architecture", "Craft"];

/**
 * First-visit loading curtain.
 *
 * Deliberately short and self-terminating — it runs on a fixed timeline rather
 * than waiting on real load events, so a slow third-party asset can never trap
 * a visitor behind it. Skipped entirely for reduced motion and on repeat
 * navigations within the session.
 */
export function Preloader() {
  const reduced = useReducedMotion();
  const scroll = useSmoothScroll();
  const [done, setDone] = useState(true);
  const [pct, setPct] = useState(0);

  // Lenis attaches asynchronously, so the scroll API identity changes once
  // after mount. Reading it through a ref keeps that out of the dependency
  // array — otherwise the effect tears down mid-animation and the counter
  // freezes wherever it happened to be.
  const scrollRef = useRef(scroll);
  scrollRef.current = scroll;

  useEffect(() => {
    // Only the first view in a session gets the curtain.
    if (sessionStorage.getItem("intro-seen") || reduced) {
      setDone(true);
      return;
    }

    setDone(false);
    document.body.style.overflow = "hidden";
    scrollRef.current.stop();

    const DURATION = 1900;
    const t0 = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / DURATION);
      const eased = 1 - Math.pow(1 - t, 3);
      setPct(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const finish = window.setTimeout(() => {
      sessionStorage.setItem("intro-seen", "1");
      setDone(true);
      document.body.style.overflow = "";
      scrollRef.current.start();
      // Land at the top rather than wherever the browser restored to.
      window.scrollTo(0, 0);
    }, DURATION + 220);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(finish);
      document.body.style.overflow = "";
    };
  }, [reduced]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[150] flex flex-col justify-between bg-void px-6 py-8 sm:px-10 sm:py-12"
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: 1, ease: ease.out },
          }}
        >
          <div className="flex items-start justify-between">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: ease.out }}
              className="font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-ash"
            >
              {site.name}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: ease.out, delay: 0.08 }}
              className="font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-ash"
            >
              {site.location}
            </motion.span>
          </div>

          <div className="flex flex-col items-start gap-2">
            {WORDS.map((word, i) => (
              <span key={word} className="block overflow-hidden">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.85, ease: ease.out, delay: 0.12 + i * 0.11 }}
                  className="block text-display-sm font-semibold leading-[0.95] text-chalk"
                >
                  {i === WORDS.length - 1 ? (
                    <span className="font-display italic text-iris-soft">{word}</span>
                  ) : (
                    word
                  )}
                </motion.span>
              </span>
            ))}
          </div>

          <div className="flex items-end justify-between gap-6">
            <div className="relative h-px w-full max-w-md overflow-hidden bg-white/10">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-iris to-mint"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="font-mono text-4xl tabular-nums leading-none text-chalk sm:text-6xl">
              {String(pct).padStart(3, "0")}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
