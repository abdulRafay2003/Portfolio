"use client";

import { useEffect, useState } from "react";

/** SSR-safe media query subscription. */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

export const useReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");

/** True on devices whose primary input can actually hover — gates cursor effects. */
export const useHasPointer = () => useMediaQuery("(hover: hover) and (pointer: fine)");

export const useIsMobile = () => useMediaQuery("(max-width: 767px)");

/**
 * Devices that will struggle with heavy compositing. Used to drop particle
 * counts and blur radii rather than shipping a janky experience.
 */
export function useIsLowPower() {
  const reduced = useReducedMotion();
  const [weak, setWeak] = useState(false);

  useEffect(() => {
    const cores = navigator.hardwareConcurrency ?? 8;
    const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
    setWeak(cores <= 4 || mem <= 4);
  }, []);

  return reduced || weak;
}
