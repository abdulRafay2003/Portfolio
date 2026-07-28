"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { spring } from "@/lib/motion";

/** Hairline reading-progress indicator pinned to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, spring.scroll);

  return (
    <motion.div
      aria-hidden
      style={{ scaleX: width }}
      className="fixed inset-x-0 top-0 z-[95] h-[2px] origin-left bg-gradient-to-r from-iris via-iris-soft to-mint"
    />
  );
}
