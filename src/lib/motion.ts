import type { Transition, Variants } from "framer-motion";

/**
 * One motion vocabulary for the whole site. Every component pulls its easing
 * and timing from here so nothing drifts out of sync with everything else.
 */
export const ease = {
  swift: [0.22, 1, 0.36, 1],
  glide: [0.65, 0, 0.35, 1],
  elastic: [0.34, 1.56, 0.64, 1],
  out: [0.16, 1, 0.3, 1],
} as const;

export const spring = {
  /** Cursor, magnets — needs to feel weightless. */
  snappy: { type: "spring", stiffness: 400, damping: 30, mass: 0.4 },
  /** Cards, panels — a little inertia reads as physical. */
  soft: { type: "spring", stiffness: 180, damping: 24, mass: 0.9 },
  /** Scroll progress bars — no overshoot. */
  scroll: { stiffness: 90, damping: 26, restDelta: 0.001 },
} satisfies Record<string, Transition | object>;

export const duration = {
  fast: 0.28,
  base: 0.55,
  slow: 0.9,
  reveal: 1.05,
} as const;

/** Standard section reveal: rise and fade, no scale (scale on text looks cheap). */
export const revealUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: ease.out },
  },
};

export const revealFade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: duration.slow, ease: ease.out } },
};

/** Parent that walks its children in. */
export const stagger = (staggerChildren = 0.07, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

/** Per-character mask reveal — the child of a SplitText line. */
export const charReveal: Variants = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { duration: 0.75, ease: ease.out },
  },
};

/** Viewport config shared by every scroll-triggered section. */
export const inView = { once: true, amount: 0.25, margin: "0px 0px -80px 0px" } as const;
