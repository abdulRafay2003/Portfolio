"use client";

import { useEffect, useRef, useState } from "react";
import { useHasPointer, useReducedMotion } from "@/hooks/use-media";
import { lerp } from "@/lib/utils";

type CursorMode = "default" | "hover" | "label" | "hidden";

/**
 * Custom cursor: an exact-tracking dot, a spring-lagged ring, and a short
 * comet trail on canvas.
 *
 * Everything runs in one rAF loop writing to transforms only — React state is
 * touched solely when the *mode* changes, which happens on hover, not on move.
 *
 * Opt an element in with `data-cursor="hover"` or `data-cursor-label="View"`.
 */
export function Cursor() {
  const hasPointer = useHasPointer();
  const reduced = useReducedMotion();
  const enabled = hasPointer && !reduced;

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const [mode, setMode] = useState<CursorMode>("hidden");

  useEffect(() => {
    if (!enabled) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const canvas = canvasRef.current;
    if (!dot || !ring || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const pointer = { x: innerWidth / 2, y: innerHeight / 2 };
    const ringPos = { ...pointer };
    // Fixed-length trail buffer — no allocation in the render loop.
    const TRAIL = 14;
    const trail = Array.from({ length: TRAIL }, () => ({ ...pointer }));
    let visible = false;
    let pressed = false;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      if (!visible) {
        visible = true;
        // Jump the trail to the entry point so it doesn't whip across screen.
        trail.forEach((p) => ((p.x = pointer.x), (p.y = pointer.y)));
        ringPos.x = pointer.x;
        ringPos.y = pointer.y;
        setMode((m) => (m === "hidden" ? "default" : m));
      }
    };

    const onLeave = () => {
      visible = false;
      setMode("hidden");
    };
    const onDown = () => (pressed = true);
    const onUp = () => (pressed = false);

    // Hover intent is delegated from the document, so dynamically rendered
    // elements get cursor behaviour without registering anything.
    const onOver = (e: PointerEvent) => {
      const el = (e.target as HTMLElement)?.closest<HTMLElement>(
        "[data-cursor], [data-cursor-label], a, button, [role='button'], input, textarea",
      );
      if (!el) {
        setMode("default");
        return;
      }
      const label = el.dataset.cursorLabel;
      if (label && labelRef.current) {
        labelRef.current.textContent = label;
        setMode("label");
      } else {
        setMode("hover");
      }
    };

    const render = () => {
      // Dot tracks 1:1 — any lag here reads as input latency.
      dot.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0) translate(-50%, -50%) scale(${pressed ? 0.6 : 1})`;

      // Ring lags behind, which is what makes it feel like a physical object.
      ringPos.x = lerp(ringPos.x, pointer.x, 0.16);
      ringPos.y = lerp(ringPos.y, pointer.y, 0.16);
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;

      // Trail: each node chases the one in front of it.
      trail[0].x = lerp(trail[0].x, pointer.x, 0.5);
      trail[0].y = lerp(trail[0].y, pointer.y, 0.5);
      for (let i = 1; i < TRAIL; i++) {
        trail[i].x = lerp(trail[i].x, trail[i - 1].x, 0.42);
        trail[i].y = lerp(trail[i].y, trail[i - 1].y, 0.42);
      }

      ctx.clearRect(0, 0, innerWidth, innerHeight);
      if (visible) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        for (let i = 1; i < TRAIL; i++) {
          const t = 1 - i / TRAIL;
          ctx.beginPath();
          ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
          ctx.lineTo(trail[i].x, trail[i].y);
          ctx.strokeStyle = `rgba(124, 107, 255, ${t * 0.3})`;
          ctx.lineWidth = t * 5;
          ctx.stroke();
        }
      }

      raf = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  const hidden = mode === "hidden";

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      <canvas ref={canvasRef} className="absolute inset-0" />

      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-white transition-[opacity] duration-200"
        style={{ opacity: hidden || mode === "label" ? 0 : 1 }}
      />

      <div
        ref={ringRef}
        className="absolute left-0 top-0 flex items-center justify-center rounded-full border border-white/40 transition-[width,height,background-color,border-color,opacity] duration-300 ease-swift"
        style={{
          width: mode === "label" ? 76 : mode === "hover" ? 46 : 30,
          height: mode === "label" ? 76 : mode === "hover" ? 46 : 30,
          opacity: hidden ? 0 : 1,
          backgroundColor:
            mode === "label"
              ? "rgb(124 107 255 / 0.9)"
              : mode === "hover"
                ? "rgb(255 255 255 / 0.1)"
                : "transparent",
          borderColor: mode === "label" ? "transparent" : "rgb(255 255 255 / 0.4)",
          mixBlendMode: mode === "label" ? "normal" : "difference",
        }}
      >
        <span
          ref={labelRef}
          className="font-mono text-[9px] uppercase tracking-[0.14em] text-white transition-opacity duration-200"
          style={{ opacity: mode === "label" ? 1 : 0 }}
        />
      </div>
    </div>
  );
}
