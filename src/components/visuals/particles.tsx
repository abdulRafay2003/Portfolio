"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useIsLowPower, useReducedMotion } from "@/hooks/use-media";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
  /** Phase offset so particles don't all twinkle in lockstep. */
  phase: number;
};

/**
 * Drifting particle field with pointer repulsion and proximity links.
 *
 * Sized off the viewport area rather than a fixed count, so a phone renders
 * ~30 and a desktop ~90 instead of one number that's wrong on both. Runs
 * entirely on canvas — no DOM nodes, no React renders per frame.
 */
export function ParticleField({
  className,
  density = 1,
  linked = true,
}: {
  className?: string;
  density?: number;
  linked?: boolean;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const lowPower = useIsLowPower();

  useEffect(() => {
    if (reduced) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let dpr = 1;
    let w = 0;
    let h = 0;
    let particles: Particle[] = [];

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const base = Math.round((w * h) / 16000) * density * (lowPower ? 0.45 : 1);
      const count = Math.max(14, Math.min(110, Math.round(base)));

      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: Math.random() * 1.5 + 0.5,
        a: Math.random() * 0.4 + 0.2,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    build();
    const ro = new ResizeObserver(build);
    ro.observe(canvas);

    const pointer = { x: -9999, y: -9999 };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    canvas.addEventListener("pointerleave", onLeave);

    let onScreen = true;
    const io = new IntersectionObserver(([e]) => (onScreen = e.isIntersecting), { threshold: 0 });
    io.observe(canvas);

    const REPEL = 118;
    const LINK = 124;
    let raf = 0;
    let t = 0;

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!onScreen || document.hidden) return;

      t += 0.012;
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap rather than bounce — bouncing creates visible edge clustering.
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // Pointer repulsion, falling off with the square of distance.
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < REPEL * REPEL) {
          const d = Math.sqrt(d2) || 1;
          const force = (1 - d / REPEL) * 0.9;
          p.x += (dx / d) * force;
          p.y += (dy / d) * force;
        }

        const twinkle = 0.65 + Math.sin(t + p.phase) * 0.35;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(169, 156, 255, ${p.a * twinkle})`;
        ctx.fill();
      }

      // Proximity links. O(n²) is fine at these counts and is skipped entirely
      // on low-power devices where the particle budget is already halved.
      if (linked && !lowPower) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i];
            const b = particles[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const d2 = dx * dx + dy * dy;
            if (d2 > LINK * LINK) continue;
            const alpha = (1 - Math.sqrt(d2) / LINK) * 0.13;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(124, 107, 255, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
    };

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced, lowPower, density, linked]);

  if (reduced) return null;

  return <canvas ref={ref} aria-hidden className={cn("pointer-events-none absolute inset-0 h-full w-full", className)} />;
}
