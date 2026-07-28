"use client";

import { ReactNode, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { duration, ease, inView } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/use-media";

type Direction = "up" | "down" | "left" | "right" | "none";

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: 36, y: 0 },
  right: { x: -36, y: 0 },
  none: { x: 0, y: 0 },
};

/** Fade-and-rise on scroll into view. The default entrance for everything. */
export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  blur = false,
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  blur?: boolean;
}) {
  const o = offsets[direction];
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...o, filter: blur ? "blur(10px)" : undefined }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: blur ? "blur(0px)" : undefined }}
      viewport={inView}
      transition={{ duration: duration.base, ease: ease.out, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Staggers direct children in. Pair with `RevealItem`. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
}) {
  const o = offsets[direction];
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, ...o },
        show: { opacity: 1, x: 0, y: 0, transition: { duration: duration.base, ease: ease.out } },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Translates its child against the scroll direction. `speed` is the fraction
 * of the travelled distance to offset by — 0.2 is subtle, 0.6 is dramatic.
 */
export function Parallax({
  children,
  className,
  speed = 0.2,
  axis = "y",
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
  axis?: "x" | "y";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const distance = speed * 180;
  const raw = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const smooth = useSpring(raw, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduced ? undefined : axis === "y" ? { y: smooth } : { x: smooth }}>
        {children}
      </motion.div>
    </div>
  );
}

/**
 * 3D tilt toward the pointer. Uses CSS variables written outside React so the
 * transform updates without a render on every mouse move.
 */
export function Tilt({
  children,
  className,
  max = 8,
  scale = 1.015,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  scale?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const onMove = (e: React.PointerEvent) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${(0.5 - py) * max * 2}deg`);
    el.style.setProperty("--ry", `${(px - 0.5) * max * 2}deg`);
    el.style.setProperty("--pointer-x", `${px * 100}%`);
    el.style.setProperty("--pointer-y", `${py * 100}%`);
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div className={cn("[perspective:1200px]", className)}>
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={{ ["--tilt-scale" as string]: scale }}
        className="h-full transition-transform duration-500 ease-swift [transform-style:preserve-3d] [transform:rotateX(var(--rx,0))_rotateY(var(--ry,0))] hover:[transform:rotateX(var(--rx,0))_rotateY(var(--ry,0))_scale(var(--tilt-scale))]"
      >
        {children}
      </div>
    </div>
  );
}

/**
 * Number that counts up the first time it scrolls into view.
 *
 * The tween writes textContent directly rather than driving state, so a
 * counter animating at 60fps costs zero React renders. The final value is in
 * the initial markup, so it is correct for SSR, crawlers, and reduced motion.
 */
export function Counter({
  value,
  suffix = "",
  className,
  durationMs = 1600,
}: {
  value: number;
  suffix?: string;
  className?: string;
  durationMs?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!visible || reduced) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      // easeOutExpo — fast start, long settle, reads as "counting up".
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      el.textContent = `${Math.round(eased * value)}${suffix}`;
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [visible, reduced, value, suffix, durationMs]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}
