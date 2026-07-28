"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ease, inView } from "@/lib/motion";

export function Badge({
  children,
  className,
  tone = "neutral",
}: {
  children: ReactNode;
  className?: string;
  tone?: "neutral" | "accent" | "mint";
}) {
  const tones = {
    neutral: "border-white/10 bg-white/[0.04] text-ash",
    accent: "border-iris/30 bg-iris/10 text-iris-soft",
    mint: "border-mint/30 bg-mint/10 text-mint-soft",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[0.6875rem] tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Pulsing dot used for the "available" indicator. */
export function LiveDot({ className }: { className?: string }) {
  return (
    <span className={cn("relative flex h-2 w-2", className)}>
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-70" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
    </span>
  );
}

/**
 * Section header: mono eyebrow, oversized title, optional lede. Consistent
 * across every section so the page reads as one document.
 */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  className,
  id,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  align?: "left" | "center";
  className?: string;
  id?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={inView}
        transition={{ duration: 0.5, ease: ease.out }}
        className="flex items-center gap-3"
      >
        <span className="h-px w-8 bg-gradient-to-r from-iris to-transparent" />
        <span className="eyebrow">{eyebrow}</span>
      </motion.div>

      <motion.h2
        id={id}
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={inView}
        transition={{ duration: 0.7, ease: ease.out, delay: 0.06 }}
        className="max-w-4xl text-display-sm font-semibold text-balance"
      >
        {title}
      </motion.h2>

      {lede && (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.7, ease: ease.out, delay: 0.14 }}
          className={cn("max-w-2xl text-base leading-relaxed text-ash text-pretty", align === "center" && "mx-auto")}
        >
          {lede}
        </motion.p>
      )}
    </div>
  );
}

/**
 * Seamless marquee. The track holds two identical copies and translates by
 * exactly -50%, so the loop point is invisible regardless of content width.
 */
export function Marquee({
  children,
  speed = 42,
  reverse = false,
  className,
  pauseOnHover = true,
}: {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
  pauseOnHover?: boolean;
}) {
  return (
    <div className={cn("edge-fade relative flex overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max shrink-0 animate-marquee items-center gap-4",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
        style={{ ["--marquee-duration" as string]: `${speed}s` }}
      >
        <div className="flex shrink-0 items-center gap-4">{children}</div>
        <div className="flex shrink-0 items-center gap-4" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}

/** Full-width section wrapper with consistent vertical rhythm. */
export function Section({
  id,
  children,
  className,
  contain = true,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  contain?: boolean;
}) {
  return (
    <section id={id} className={cn("relative py-section", className)}>
      {contain ? <div className="container relative z-10">{children}</div> : children}
    </section>
  );
}
