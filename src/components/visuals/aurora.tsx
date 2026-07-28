"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useIsLowPower, useReducedMotion } from "@/hooks/use-media";

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

/**
 * Domain-warped fractal noise, ramped through the site's accent palette.
 *
 * Two warp passes give the layered, folding look real aurora has; a single
 * pass reads as flat plasma. Everything is driven by uTime and a smoothed
 * pointer, so the field breathes on its own and leans toward the cursor.
 */
const FRAG = `
precision highp float;

uniform vec2  uRes;
uniform float uTime;
uniform vec2  uMouse;
uniform float uIntensity;

// Value noise — cheaper than simplex and indistinguishable once warped.
vec2 hash(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(dot(hash(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
        dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
    mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
        dot(hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
    u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.02 + vec2(31.4, 17.9);
    a *= 0.5;
  }
  return v;
}

void main() {
  // Aspect-corrected coords centred on the viewport.
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / min(uRes.x, uRes.y);

  float t = uTime * 0.045;
  vec2 m = uMouse * 0.35;

  // First warp: large slow folds.
  vec2 q = vec2(fbm(uv * 1.4 + vec2(0.0, t)), fbm(uv * 1.4 + vec2(4.2, -t * 0.8)));
  // Second warp: finer detail riding on the first, pulled toward the pointer.
  vec2 r = vec2(
    fbm(uv * 2.1 + q * 1.9 + vec2(1.7, 9.2) + t * 1.3 + m),
    fbm(uv * 2.1 + q * 1.9 + vec2(8.3, 2.8) - t * 1.1 + m)
  );

  float f = fbm(uv * 1.6 + r * 1.6);
  f = smoothstep(-0.55, 0.85, f);

  // Palette: void -> deep iris -> iris -> mint, with an ember kiss at the top.
  vec3 c0 = vec3(0.031, 0.031, 0.047);
  vec3 c1 = vec3(0.180, 0.125, 0.520);
  vec3 c2 = vec3(0.486, 0.420, 1.000);
  vec3 c3 = vec3(0.239, 0.863, 0.784);

  vec3 col = mix(c0, c1, smoothstep(0.10, 0.55, f));
  col = mix(col, c2, smoothstep(0.45, 0.85, f) * 0.85);
  col = mix(col, c3, smoothstep(0.72, 1.00, f) * (0.34 + 0.16 * sin(uTime * 0.22)));
  col += vec3(1.0, 0.541, 0.357) * smoothstep(0.88, 1.0, f) * 0.16;

  // Radial falloff so the effect sits in the frame instead of filling it.
  float vig = 1.0 - smoothstep(0.20, 1.15, length(uv * vec2(0.85, 1.25)));
  col *= 0.48 + vig * 0.95;

  // Ordered-ish dither: kills banding across the large flat gradients.
  float d = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  col += (d - 0.5) * 0.014;

  gl_FragColor = vec4(col * uIntensity, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    gl.deleteShader(s);
    return null;
  }
  return s;
}

/**
 * Full-bleed animated aurora. Falls back to a static CSS gradient when WebGL
 * is unavailable or the user asked for reduced motion — the fallback is always
 * rendered underneath, so there is never a blank frame.
 */
export function Aurora({ className, intensity = 1 }: { className?: string; intensity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const lowPower = useIsLowPower();
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "high-performance",
      desynchronized: true,
    } as WebGLContextAttributes);
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    // One full-screen triangle — cheaper than a quad, no diagonal seam.
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uMouse = gl.getUniformLocation(prog, "uMouse");
    const uIntensity = gl.getUniformLocation(prog, "uIntensity");

    // Noise is low-frequency, so half-resolution is visually free and roughly
    // quarters the fragment cost. Weaker devices drop further.
    const scale = lowPower ? 0.4 : 0.62;
    const resize = () => {
      const w = Math.max(1, Math.floor(canvas.clientWidth * scale));
      const h = Math.max(1, Math.floor(canvas.clientHeight * scale));
      if (canvas.width === w && canvas.height === h) return;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const mouse = { x: 0, y: 0 };
    const eased = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    // Pause when scrolled away — a hero shader has no business burning GPU
    // while the user is reading the footer.
    let onScreen = true;
    const io = new IntersectionObserver(([entry]) => (onScreen = entry.isIntersecting), {
      threshold: 0,
    });
    io.observe(canvas);

    let raf = 0;
    const t0 = performance.now();
    const render = (now: number) => {
      raf = requestAnimationFrame(render);
      if (!onScreen || document.hidden) return;

      eased.x += (mouse.x - eased.x) * 0.045;
      eased.y += (mouse.y - eased.y) * 0.045;

      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (now - t0) / 1000);
      gl.uniform2f(uMouse, eased.x, eased.y);
      gl.uniform1f(uIntensity, intensity);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    raf = requestAnimationFrame(render);
    setLive(true);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      setLive(false);
    };
  }, [reduced, lowPower, intensity]);

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      {/* Static fallback — also the first paint before WebGL initialises. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 20% 15%, rgb(74 56 199 / 0.42), transparent 58%)," +
            "radial-gradient(100% 70% at 82% 30%, rgb(18 165 148 / 0.30), transparent 60%)," +
            "radial-gradient(90% 60% at 50% 100%, rgb(124 107 255 / 0.22), transparent 65%)",
        }}
      />
      {/*
        Screen-blended over the gradient above rather than replacing it. The
        drawing buffer is opaque (alpha:false is measurably cheaper), so its
        black regions contribute nothing under `screen` and the static gradient
        stays the base layer — the shader only adds moving light on top. That
        also means a slow WebGL init never shows as a black flash.
      */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full mix-blend-screen transition-opacity duration-1000"
        style={{ opacity: live ? 1 : 0 }}
      />
    </div>
  );
}
