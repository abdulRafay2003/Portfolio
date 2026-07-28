"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { cn, hexToRgbChannels, shadeChannels } from "@/lib/utils";
import { useHasPointer } from "@/hooks/use-media";

/**
 * Project preview that swaps a poster image for a silent looping video once
 * the pointer lands on it.
 *
 * The video element carries `preload="none"` and only gets its `src` on first
 * hover, so a page with six of these downloads no video until the visitor
 * actually shows interest.
 */
export function ProjectMedia({
  poster,
  video,
  title,
  accent,
  priority = false,
  className,
  sizes = "(max-width: 1024px) 100vw, 55vw",
}: {
  poster: string;
  video?: string;
  title: string;
  accent: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [armed, setArmed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const hasPointer = useHasPointer();

  const onEnter = useCallback(() => {
    if (!video || !hasPointer) return;
    setArmed(true);
  }, [video, hasPointer]);

  const onLeave = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    el.pause();
    setPlaying(false);
  }, []);

  // Once armed, the source is attached and playback starts. play() rejects if
  // the pointer leaves before the metadata lands — that is expected, not an error.
  useEffect(() => {
    if (!armed) return;
    const el = videoRef.current;
    if (!el) return;
    el.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, [armed]);

  const rgb = hexToRgbChannels(accent);
  // Pre-darkened so `multiply` lands the same on a pale orange as on a deep blue.
  const tint = shadeChannels(accent, 0.58);

  return (
    <div
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      className={cn(
        "group/media relative overflow-hidden rounded-2xl border border-white/10 bg-graphite",
        className,
      )}
      style={{ ["--accent" as string]: rgb }}
    >
      {/*
        These are light product mockups on a near-black page, which would
        otherwise read as glaring white rectangles. A multiply pass in the
        project's own brand colour turns each one into a duotone plate at rest,
        then clears on hover so the real interface is revealed in full colour.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 mix-blend-multiply transition-opacity duration-700 ease-swift group-hover/media:opacity-0"
        style={{
          background: `linear-gradient(150deg, rgb(${tint}) 0%, rgb(${tint}) 42%, #17132B 100%)`,
        }}
      />
      {/* Neutral scrim under the tint — keeps the plate from reading as a light box. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 bg-void/25 transition-opacity duration-700 group-hover/media:opacity-0"
      />
      {/* Lifts the darkest areas back up so the duotone doesn't crush to black. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 opacity-25 mix-blend-overlay transition-opacity duration-700 group-hover/media:opacity-0"
        style={{ background: `linear-gradient(150deg, rgb(${rgb}), transparent 70%)` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-void/50 via-transparent to-transparent"
      />

      <Image
        src={poster}
        alt={`${title} — product interface`}
        width={1600}
        height={1000}
        priority={priority}
        sizes={sizes}
        className={cn(
          "h-full w-full object-cover transition-[transform,opacity,filter] duration-700 ease-swift",
          "brightness-[0.96] contrast-[1.04] group-hover/media:brightness-100 group-hover/media:scale-[1.03]",
          playing && "opacity-0",
        )}
      />

      {video && (
        <video
          ref={videoRef}
          src={armed ? video : undefined}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
          tabIndex={-1}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
            playing ? "opacity-100" : "opacity-0",
          )}
        />
      )}

      {video && (
        <span
          aria-hidden
          className={cn(
            "absolute bottom-3 right-3 z-30 inline-flex items-center gap-1.5 rounded-full bg-void/70 px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-chalk backdrop-blur transition-opacity duration-500",
            playing ? "opacity-0" : "opacity-100",
          )}
        >
          <Play className="h-2.5 w-2.5 fill-current" />
          Preview
        </span>
      )}
    </div>
  );
}
