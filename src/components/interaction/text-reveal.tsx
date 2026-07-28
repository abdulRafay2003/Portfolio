"use client";

import { ElementType, useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { charReveal, ease, inView } from "@/lib/motion";

type SplitTextProps = {
  children: string;
  className?: string;
  as?: ElementType;
  /** Split granularity. Words are cheaper and read better at large sizes. */
  by?: "char" | "word" | "line";
  delay?: number;
  stagger?: number;
  /** Play on mount rather than waiting for the viewport. */
  immediate?: boolean;
};

/**
 * Masked reveal: each unit sits inside an overflow-hidden box and slides up
 * from below the baseline. Split for animation only — the accessible string is
 * exposed once on the wrapper and the pieces are hidden from assistive tech.
 */
export function SplitText({
  children,
  className,
  as: Tag = "span",
  by = "char",
  delay = 0,
  stagger,
  immediate = false,
}: SplitTextProps) {
  const step = stagger ?? (by === "char" ? 0.022 : by === "word" ? 0.05 : 0.09);

  // Memoised because motion.create() returns a new component type on each
  // call — recreating it inline would remount the subtree every render and
  // restart the animation.
  const MotionTag = useMemo(() => motion.create(Tag as ElementType), [Tag]);

  const lines = useMemo(() => {
    if (by === "line") return children.split("\n");
    return [children];
  }, [children, by]);

  return (
    <MotionTag
      className={cn("block", className)}
      initial="hidden"
      {...(immediate ? { animate: "show" } : { whileInView: "show", viewport: inView })}
      transition={{ staggerChildren: step, delayChildren: delay }}
      aria-label={children}
    >
      {lines.map((line, li) => (
        <span key={li} className="block">
          {by === "line" ? (
            <Unit>{line}</Unit>
          ) : (
            splitLine(line, by).map((unit, i) =>
              unit === " " ? (
                <span key={i} aria-hidden className="inline-block whitespace-pre">
                  {" "}
                </span>
              ) : (
                <Unit key={i}>{unit}</Unit>
              ),
            )
          )}
        </span>
      ))}
    </MotionTag>
  );
}

/** Word-splitting keeps whole words intact so they never break mid-wrap. */
function splitLine(line: string, by: "char" | "word") {
  if (by === "word") return line.split(/(\s+)/).filter(Boolean);
  return line.split("");
}

function Unit({ children }: { children: string }) {
  return (
    <span aria-hidden className="inline-block overflow-hidden align-bottom">
      <motion.span variants={charReveal} className="inline-block will-transform">
        {children}
      </motion.span>
    </span>
  );
}

/**
 * Scroll-linked word-by-word brightening. Used for the manifesto paragraph —
 * the text literally lights up as you read through it.
 */
export function ScrollHighlightText({
  text,
  className,
  progress,
}: {
  text: string;
  className?: string;
  /** 0–1 read position supplied by the parent's scroll progress. */
  progress: number;
}) {
  const words = useMemo(() => text.split(" "), [text]);

  return (
    <p className={cn("text-pretty", className)}>
      {words.map((word, i) => {
        // Each word occupies a slice of the range and fades in across it.
        const start = i / words.length;
        const end = start + 1 / words.length;
        const local = Math.min(1, Math.max(0, (progress - start) / (end - start)));
        return (
          <span key={i} className="inline-block">
            <span
              style={{ opacity: 0.14 + local * 0.86 }}
              className="transition-opacity duration-100"
            >
              {word}
            </span>
            {i < words.length - 1 && <span>&nbsp;</span>}
          </span>
        );
      })}
    </p>
  );
}

/**
 * Vertical carousel of rotating titles, one visible at a time.
 *
 * The active index is owned by the caller rather than an internal timer, so a
 * page with several of these can drive them from one interval instead of N.
 */
export function RotatingText({
  items,
  className,
  index,
}: {
  items: readonly string[];
  className?: string;
  index: number;
}) {
  return (
    <span className={cn("relative inline-flex overflow-hidden align-bottom", className)}>
      {/* Invisible sizer keeps the layout from jumping between title lengths. */}
      <span className="invisible whitespace-nowrap" aria-hidden>
        {items.reduce((a, b) => (a.length > b.length ? a : b))}
      </span>
      {items.map((item, i) => (
        <motion.span
          key={item}
          aria-hidden={i !== index}
          className="absolute inset-0 whitespace-nowrap"
          initial={false}
          animate={{
            y: i === index ? "0%" : i < index ? "-110%" : "110%",
            opacity: i === index ? 1 : 0,
          }}
          transition={{ duration: 0.62, ease: ease.out }}
        >
          {item}
        </motion.span>
      ))}
    </span>
  );
}
