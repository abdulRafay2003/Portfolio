"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { process, services } from "@/lib/data/services";
import { cn } from "@/lib/utils";
import { ease, inView } from "@/lib/motion";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { useIsMobile, useReducedMotion } from "@/hooks/use-media";

export function Services() {
  return (
    <>
      <Section id="services" className="border-t border-white/[0.06]">
        <SectionHeading
          eyebrow="Services · 05"
          title={
            <>
              What I&rsquo;m brought in{" "}
              <span className="font-display italic text-ember">to do</span>
            </>
          }
          lede="Six things I do repeatedly and well. Everything else, I'll tell you honestly that someone else is a better fit."
          className="mb-14"
        />

        <ul className="border-t border-white/[0.07]">
          {services.map((service, i) => (
            <ServiceRow key={service.id} service={service} index={i} />
          ))}
        </ul>
      </Section>

      <Process />
    </>
  );
}

function ServiceRow({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.li
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inView}
      transition={{ duration: 0.5, ease: ease.out, delay: index * 0.05 }}
      onPointerEnter={() => setOpen(true)}
      onPointerLeave={() => setOpen(false)}
      className="group relative border-b border-white/[0.07]"
    >
      {/* Accent wash sweeps in from the left on hover. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-[linear-gradient(90deg,rgb(124_107_255/0.10),transparent_70%)] transition-transform duration-600 ease-swift group-hover:scale-x-100"
      />

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="relative flex w-full items-start gap-5 py-7 text-left sm:gap-8 sm:py-8"
      >
        <span className="mt-1 shrink-0 font-mono text-[0.6875rem] tracking-[0.14em] text-slate transition-colors duration-400 group-hover:text-iris-soft">
          {service.id}
        </span>

        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <span className="text-xl font-semibold tracking-tight transition-transform duration-500 ease-swift group-hover:translate-x-1 sm:text-2xl lg:text-[1.75rem]">
              {service.title}
            </span>
          </span>

          {/* Grid-rows trick: animates height to auto without measuring. */}
          <span
            className={cn(
              "grid transition-[grid-template-rows,opacity] duration-500 ease-swift",
              open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
            )}
          >
            <span className="overflow-hidden">
              <span className="block max-w-2xl pt-4 text-[0.9375rem] leading-relaxed text-ash text-pretty">
                {service.body}
              </span>
              <span className="mt-4 flex flex-wrap gap-1.5">
                {service.deliverables.map((d) => (
                  <span
                    key={d}
                    className="rounded-full border border-iris/25 bg-iris/[0.08] px-2.5 py-1 font-mono text-[0.6875rem] text-iris-soft"
                  >
                    {d}
                  </span>
                ))}
              </span>
            </span>
          </span>
        </span>

        <span
          aria-hidden
          className="mt-1 shrink-0 text-slate transition-all duration-500 ease-swift group-hover:rotate-45 group-hover:text-chalk"
        >
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </button>
    </motion.li>
  );
}

/**
 * Scroll-driven horizontal sequence. The section is tall; a sticky viewport
 * inside it translates the rail sideways as you scroll down, so vertical
 * scroll input reads as horizontal progress through the process.
 */
function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLOListElement>(null);
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();

  // Travel is measured rather than guessed: a fixed percentage either leaves
  // the last card off-screen or drags the rail past it, depending on viewport.
  const [travel, setTravel] = useState(0);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const measure = () => {
      // Right-hand breathing room so the final card doesn't kiss the edge.
      const gutter = Math.max(20, (window.innerWidth - 1360) / 2 + 64);
      const overflow = rail.scrollWidth - window.innerWidth + gutter;
      setTravel(Math.max(0, overflow));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(rail);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [isMobile]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 26, restDelta: 0.001 });

  const x = useTransform(smooth, [0, 1], [0, -travel]);
  const railProgress = useTransform(smooth, [0, 1], ["0%", "100%"]);

  // Horizontal-on-scroll is a desktop affordance; on mobile it fights the
  // natural gesture, so the same content becomes a plain vertical stack.
  if (isMobile || reduced) {
    return (
      <Section className="border-t border-white/[0.06]">
        <ProcessHeading />
        <ol className="mt-10 flex flex-col gap-3">
          {process.map((step, i) => (
            <motion.li
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inView}
              transition={{ duration: 0.5, ease: ease.out, delay: i * 0.06 }}
            >
              <ProcessCard step={step} />
            </motion.li>
          ))}
        </ol>
      </Section>
    );
  }

  return (
    <section ref={ref} className="relative h-[320vh] border-t border-white/[0.06]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-16">
        <div className="container">
          <ProcessHeading />
        </div>

        <motion.ol
          ref={railRef}
          style={{ x }}
          className="mt-12 flex w-max gap-5 pl-[max(1.25rem,calc((100vw-1360px)/2+4rem))]"
        >
          {process.map((step) => (
            <li key={step.step} className="w-[min(78vw,26rem)] shrink-0">
              <ProcessCard step={step} tall />
            </li>
          ))}
        </motion.ol>

        <div className="container mt-10">
          <div className="relative h-px w-full max-w-sm bg-white/10">
            <motion.div
              style={{ width: railProgress }}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-iris to-mint"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessHeading() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-gradient-to-r from-mint to-transparent" />
        <span className="eyebrow">How I work</span>
      </div>
      <h2 className="max-w-2xl text-display-sm font-semibold text-balance">
        Five stages, and none of them are{" "}
        <span className="font-display italic text-mint-soft">a surprise</span>.
      </h2>
    </div>
  );
}

function ProcessCard({ step, tall = false }: { step: (typeof process)[number]; tall?: boolean }) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl glass p-7 transition-colors duration-500 hover:border-white/20",
        tall && "min-h-[19rem]",
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(110%_70%_at_100%_0%,rgb(61_220_200/0.14),transparent_58%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <span
        aria-hidden
        className="relative mb-auto font-display text-6xl italic leading-none text-white/[0.09] transition-colors duration-500 group-hover:text-white/[0.16]"
      >
        {step.step}
      </span>
      <h3 className="relative mt-8 text-xl font-semibold tracking-tight">{step.title}</h3>
      <p className="relative mt-2.5 text-[0.875rem] leading-relaxed text-ash text-pretty">
        {step.body}
      </p>
    </article>
  );
}
