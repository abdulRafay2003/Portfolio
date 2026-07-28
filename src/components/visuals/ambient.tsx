"use client";

import { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * Morphing gradient blob. Two independent animations (border-radius morph and
 * positional drift) run at different periods so the loop never visibly repeats.
 */
export function Blob({
  className,
  color = "124 107 255",
  size = 520,
  delay = 0,
  opacity = 0.22,
  style,
}: {
  className?: string;
  color?: string;
  size?: number;
  delay?: number;
  opacity?: number;
  style?: CSSProperties;
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute gpu animate-blob-morph", className)}
      style={{
        width: size,
        height: size,
        opacity,
        background: `radial-gradient(circle at 34% 34%, rgb(${color} / 0.85), rgb(${color} / 0.10) 62%, transparent 74%)`,
        filter: "blur(56px)",
        animationDelay: `${delay}s`,
        ...style,
      }}
    >
      <div
        className="h-full w-full animate-aurora-drift"
        style={{ animationDelay: `${delay * 1.4}s` }}
      />
    </div>
  );
}

/**
 * Ambient layer sat behind a section: a couple of drifting blobs plus the
 * grid veil. Purely decorative, fully non-interactive.
 */
export function Ambient({
  className,
  variant = "iris",
  grid = true,
}: {
  className?: string;
  variant?: "iris" | "mint" | "dual" | "ember";
  grid?: boolean;
}) {
  const palettes = {
    iris: ["124 107 255", "74 56 199"],
    mint: ["61 220 200", "18 165 148"],
    dual: ["124 107 255", "61 220 200"],
    ember: ["255 138 91", "124 107 255"],
  } as const;

  const [a, b] = palettes[variant];

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {grid && <div className="absolute inset-0 grid-veil" />}
      <Blob color={a} size={640} opacity={0.2} className="-left-40 -top-32" />
      <Blob color={b} size={560} opacity={0.16} delay={-7} className="-right-32 top-1/3" />
    </div>
  );
}

/** Film grain + a soft top vignette. Sits above content, below the cursor. */
export function GrainOverlay() {
  return (
    <div aria-hidden className="grain pointer-events-none fixed inset-0 z-[55]">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-void/70 to-transparent" />
    </div>
  );
}

/** Thin animated hairline used to separate major sections. */
export function Divider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent",
        className,
      )}
    />
  );
}
