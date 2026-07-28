"use client";

import { ReactNode, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useHasPointer, useReducedMotion } from "@/hooks/use-media";
import { cn } from "@/lib/utils";
import { spring } from "@/lib/motion";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  /** How far the element is allowed to travel toward the pointer, in px. */
  strength?: number;
  /** Inner content lags slightly behind the shell — reads as depth. */
  innerStrength?: number;
  as?: "div" | "span";
};

/**
 * Pulls its child toward the pointer while hovered, then springs home.
 * Disabled on touch and under reduced-motion, where it has no meaning.
 */
export function Magnetic({
  children,
  className,
  strength = 0.35,
  innerStrength = 0.18,
  as = "div",
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const hasPointer = useHasPointer();
  const reduced = useReducedMotion();
  const active = hasPointer && !reduced;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, spring.snappy);
  const sy = useSpring(y, spring.snappy);

  // The inner layer moves a fraction of the shell, creating parallax.
  const ratio = innerStrength / strength;
  const ix = useTransform(sx, (v) => v * ratio);
  const iy = useTransform(sy, (v) => v * ratio);

  const onMove = (e: React.PointerEvent) => {
    if (!active) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const Tag = as === "span" ? motion.span : motion.div;

  return (
    <Tag
      ref={ref as never}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className={cn("relative inline-flex", className)}
    >
      <motion.span style={{ x: ix, y: iy }} className="inline-flex w-full items-center justify-center">
        {children}
      </motion.span>
    </Tag>
  );
}
