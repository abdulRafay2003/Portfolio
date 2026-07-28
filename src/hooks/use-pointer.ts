"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number };

/**
 * Subscribes to pointer position without causing React re-renders — the
 * callback runs inside a single shared rAF loop. Every mouse-reactive effect
 * on the page reads from this rather than attaching its own listener.
 */
export function usePointerFrame(onFrame: (p: Point, velocity: Point) => void, enabled = true) {
  const cb = useRef(onFrame);
  cb.current = onFrame;

  useEffect(() => {
    if (!enabled) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const prev = { ...target };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const tick = () => {
      const velocity = { x: target.x - prev.x, y: target.y - prev.y };
      prev.x = target.x;
      prev.y = target.y;
      cb.current(target, velocity);
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);
}

/**
 * Writes normalised pointer coordinates onto an element as CSS custom
 * properties, so hover lighting is pure CSS and costs no React renders.
 */
export function usePointerSpotlight<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--pointer-x", `${e.clientX - r.left}px`);
        el.style.setProperty("--pointer-y", `${e.clientY - r.top}px`);
        raf = 0;
      });
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      el.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return ref;
}
