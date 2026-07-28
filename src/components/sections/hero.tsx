"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download, Github, Linkedin, MapPin } from "lucide-react";

import { site, stats } from "@/lib/site";
import { techMarquee } from "@/lib/data/skills";
import { ease } from "@/lib/motion";
import { timeInOffset } from "@/lib/utils";
import { Aurora } from "@/components/visuals/aurora";
import { ParticleField } from "@/components/visuals/particles";
import { Button } from "@/components/ui/button";
import { LiveDot, Marquee } from "@/components/ui/primitives";
import { Magnetic } from "@/components/interaction/magnetic";
import { RotatingText, SplitText } from "@/components/interaction/text-reveal";
import { useSmoothScroll } from "@/components/providers/smooth-scroll";
import { useIsMobile, useReducedMotion } from "@/hooks/use-media";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const { scrollTo } = useSmoothScroll();
  const [titleIndex, setTitleIndex] = useState(0);
  const [localTime, setLocalTime] = useState<string | null>(null);

  /**
   * Depth parallax is a large-viewport effect. On a phone the hero content is
   * taller than the screen, so translating it would slide the portrait over
   * the ticker beneath it — and the whole section is scrolled past in one
   * gesture anyway, where the effect isn't even perceptible.
   */
  const flat = reduced || isMobile;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Content drifts up and dissolves as the hero scrolls away; the backdrop
  // moves slower, which is what sells the depth.
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const backdropY = useTransform(scrollYProgress, [0, 1], ["0%", "42%"]);
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);

  /**
   * Advance the rotating title, but only while the page is actually visible.
   *
   * Browsers throttle requestAnimationFrame in background tabs while leaving
   * setInterval running, so an unguarded timer keeps swapping the title with
   * no frames to animate it — exit transitions stall and stack up. Pausing on
   * hide also means a backgrounded tab does no work at all.
   */
  useEffect(() => {
    let id: number | undefined;

    const start = () => {
      if (id) return;
      id = window.setInterval(
        () => setTitleIndex((i) => (i + 1) % site.titles.length),
        2800,
      );
    };
    const stop = () => {
      window.clearInterval(id);
      id = undefined;
    };

    const onVisibility = () => (document.hidden ? stop() : start());

    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // Rendered client-side only — a server-rendered clock would hydrate stale.
  useEffect(() => {
    const update = () => setLocalTime(timeInOffset(site.utcOffset));
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    // Full-viewport framing only where the content actually fits: on a phone
    // the hero is naturally taller, and forcing 100svh just adds dead space.
    <section
      ref={ref}
      className="relative flex flex-col overflow-hidden pb-6 pt-24 sm:min-h-[100svh] sm:justify-between sm:pt-28"
    >
      <motion.div style={flat ? undefined : { y: backdropY }} className="absolute inset-0 -z-10">
        <Aurora className="opacity-[0.78]" />
        <ParticleField density={0.9} />
        {/*
          Scrim over the copy column only. The aurora peaks bright enough to
          push body text under 4.5:1, so the left third is damped while the
          right stays vivid behind the portrait.
        */}
        <div className="absolute inset-0 bg-gradient-to-r from-void/85 via-void/45 to-transparent lg:to-40%" />
        {/* Grounds the aurora so the section below doesn't start on a hard edge. */}
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-void via-void/70 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_0%,transparent,rgb(8_8_12/0.35))]" />
      </motion.div>

      <motion.div
        style={flat ? undefined : { y: contentY, opacity: contentOpacity }}
        className="container relative z-10 flex-1"
      >
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* ---- Statement ------------------------------------------------ */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: ease.out, delay: 0.15 }}
              className="mb-5 inline-flex items-center gap-2.5 rounded-full glass px-3.5 py-1.5"
            >
              <LiveDot />
              <span className="text-[0.75rem] text-chalk/90">{site.availability}</span>
            </motion.div>

            <h1 className="mb-5">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="mb-4 block font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-ash"
              >
                {site.name}
                <span className="mx-2 text-slate">/</span>
                <span className="text-iris-soft">Est. 2021</span>
              </motion.span>

              <span className="block text-display-lg font-semibold text-balance">
                <SplitText immediate by="word" delay={0.35} className="text-chalk">
                  I build mobile
                </SplitText>
                <span className="block">
                  <SplitText immediate by="word" delay={0.5} className="inline-block text-chalk">
                    products that feel
                  </SplitText>{" "}
                  <motion.span
                    initial={{ opacity: 0, filter: "blur(12px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1, ease: ease.out, delay: 0.95 }}
                    className="font-display italic text-gradient"
                  >
                    inevitable.
                  </motion.span>
                </span>
              </span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: ease.out, delay: 1.05 }}
              className="mb-3 flex items-center gap-3 font-mono text-sm text-iris-soft"
            >
              <span className="h-px w-6 bg-iris/60" />
              <RotatingText items={site.titles} index={titleIndex} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: ease.out, delay: 1.15 }}
              className="mb-7 max-w-xl text-[0.9375rem] leading-relaxed text-ash text-pretty sm:text-base"
            >
              Five years and 20+ production apps across iOS and Android — real-time video
              consultations, payment systems, and offline-tolerant architecture. I care about the
              details users never consciously notice, because those are the ones they feel.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: ease.out, delay: 1.25 }}
              className="flex flex-wrap items-center gap-3"
            >
              <Magnetic strength={0.3}>
                <Button size="lg" variant="primary" data-cursor="hover" asChild>
                  <a
                    href="#work"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo("#work", -70);
                    }}
                  >
                    View selected work
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </a>
                </Button>
              </Magnetic>

              <Magnetic strength={0.3}>
                <Button size="lg" variant="outline" data-cursor="hover" asChild>
                  <a href={site.resume} target="_blank" rel="noreferrer noopener" download>
                    <Download className="h-4 w-4" />
                    Résumé
                  </a>
                </Button>
              </Magnetic>

              <div className="ml-1 flex items-center gap-1.5">
                {[
                  { href: site.socials.github, Icon: Github, label: "GitHub" },
                  { href: site.socials.linkedin, Icon: Linkedin, label: "LinkedIn" },
                ].map(({ href, Icon, label }) => (
                  <Magnetic key={label} strength={0.4}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={label}
                      data-cursor="hover"
                      className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-ash transition-colors duration-300 hover:border-white/25 hover:text-chalk"
                    >
                      <Icon className="h-[1.05rem] w-[1.05rem]" />
                    </a>
                  </Magnetic>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ---- Portrait -------------------------------------------------- */}
          <motion.div
            style={flat ? undefined : { y: portraitY }}
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, ease: ease.out, delay: 0.5 }}
            className="relative mx-auto w-full max-w-[320px] lg:col-span-5 lg:ml-auto lg:mr-0 lg:max-w-[400px]"
          >
            <div className="group relative">
              {/* Accent halo behind the frame. */}
              <div
                aria-hidden
                className="absolute -inset-6 -z-10 animate-blob-morph opacity-50 blur-3xl"
                style={{
                  background:
                    "conic-gradient(from 140deg, rgb(124 107 255 / 0.55), rgb(61 220 200 / 0.4), rgb(255 138 91 / 0.28), rgb(124 107 255 / 0.55))",
                }}
              />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-graphite">
                <Image
                  src="/profile.webp"
                  alt={`${site.name}, ${site.role}`}
                  width={900}
                  height={1233}
                  priority
                  sizes="(max-width: 1024px) 340px, 460px"
                  className="w-full scale-[1.02] object-cover transition-transform ease-swift [transition-duration:1200ms] group-hover:scale-[1.06]"
                  style={{ filter: "contrast(1.08) brightness(0.86) saturate(0.92)" }}
                />

                {/* Blends the studio-grey backdrop into the page. */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-void via-void/35 to-transparent"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 mix-blend-color opacity-40"
                  style={{
                    background:
                      "linear-gradient(160deg, rgb(124 107 255 / 0.75), transparent 55%, rgb(61 220 200 / 0.55))",
                  }}
                />

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                  <div>
                    <p className="text-[0.9375rem] font-medium leading-tight">{site.name}</p>
                    <p className="mt-0.5 flex items-center gap-1.5 font-mono text-[0.6875rem] text-ash">
                      <MapPin className="h-3 w-3" />
                      {site.location}
                    </p>
                  </div>
                  <div className="text-right font-mono text-[0.6875rem] text-ash">
                    <p className="text-chalk">{localTime ?? "--:--"}</p>
                    <p>{site.timezone}</p>
                  </div>
                </div>
              </div>

              {/* Floating stat chip — counterweight to the portrait mass. */}
              <motion.div
                initial={{ opacity: 0, x: -20, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, ease: ease.out, delay: 1.35 }}
                className="absolute -left-3 top-10 hidden rounded-2xl glass glass-edge px-4 py-3 shadow-2xl sm:block lg:-left-8"
              >
                <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-ash">
                  Shipped
                </p>
                <p className="mt-0.5 text-2xl font-semibold leading-none">20+</p>
                <p className="mt-1 text-[0.6875rem] text-ash">iOS &amp; Android apps</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20, y: -10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, ease: ease.out, delay: 1.5 }}
                className="absolute -right-3 bottom-24 hidden rounded-2xl glass glass-edge px-4 py-3 shadow-2xl sm:block lg:-right-6"
              >
                <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-ash">
                  Core stack
                </p>
                <p className="mt-0.5 text-sm font-medium leading-none text-mint-soft">React Native</p>
                <p className="mt-1 text-[0.6875rem] text-ash">5 years, exclusively</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ---- Base rail ---------------------------------------------------- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="relative z-10 mt-8"
      >
        <div className="container mb-5 hidden items-end justify-between gap-8 sm:flex">
          {stats.map((s) => (
            <div key={s.label} className="flex-1">
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-slate">
                {s.detail}
              </p>
              <p className="mt-1 text-xl font-semibold leading-none tracking-tight lg:text-2xl">
                {s.value}
                {s.suffix}
              </p>
              <p className="mt-1 text-[0.75rem] text-ash">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="border-y border-white/[0.07] bg-white/[0.015] py-3">
          <Marquee speed={52}>
            {techMarquee.map((tech) => (
              <span key={tech} className="flex items-center gap-4">
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ash transition-colors duration-300 hover:text-chalk">
                  {tech}
                </span>
                <span className="h-1 w-1 rounded-full bg-iris/50" />
              </span>
            ))}
          </Marquee>
        </div>

        <button
          type="button"
          onClick={() => scrollTo("#work", -70)}
          className="group mx-auto mt-5 flex items-center gap-2.5 text-ash transition-colors hover:text-chalk"
          aria-label="Scroll to work"
        >
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.22em]">Scroll</span>
          <span className="relative grid h-7 w-[18px] place-items-start overflow-hidden rounded-full border border-white/15 pt-1">
            <ArrowDown className="h-2.5 w-2.5 animate-scroll-hint" />
          </span>
        </button>
      </motion.div>
    </section>
  );
}
