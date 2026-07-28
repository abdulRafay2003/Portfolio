import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Clamp a number into a range. */
export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

/** Linear interpolation — the backbone of every frame-loop animation here. */
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Map a value from one range to another, clamped. */
export const mapRange = (v: number, inMin: number, inMax: number, outMin: number, outMax: number) =>
  outMin + (clamp((v - inMin) / (inMax - inMin)) * (outMax - outMin));

/** #rrggbb -> [r, g, b]. */
function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** #rrggbb -> "r g b" for use in rgb(var(--x) / alpha). */
export function hexToRgbChannels(hex: string) {
  return hexToRgb(hex).join(" ");
}

/**
 * Scale a colour toward black and return it as rgb channels.
 *
 * Needed because the project plates tint light screenshots with `multiply`,
 * and multiplying by a bright accent (an orange, say) barely darkens white —
 * the plate stays washed out. Pre-darkening the tint makes the treatment land
 * consistently regardless of how light the brand colour is.
 */
export function shadeChannels(hex: string, factor: number) {
  return hexToRgb(hex)
    .map((c) => Math.round(c * factor))
    .join(" ");
}

/**
 * Mix a colour toward white and return it as `rgb(...)`.
 *
 * Brand colours are chosen for plates and glows, where they sit against light
 * imagery. Several of them (the deep magentas especially) drop below 4.5:1 as
 * small text on the near-black background, so anything rendered at label size
 * uses this lightened variant instead of the raw accent.
 */
export function accentText(hex: string, whiteMix = 0.45) {
  const [r, g, b] = hexToRgb(hex);
  const mix = (c: number) => Math.round(c + (255 - c) * whiteMix);
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
}

/** Local time in a fixed UTC offset, formatted HH:MM. */
export function timeInOffset(offsetHours: number) {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60_000;
  const d = new Date(utc + offsetHours * 3_600_000);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}
