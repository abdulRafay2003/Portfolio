"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Compass, Gauge, Layers, ShieldCheck } from "lucide-react";

import { site, stats } from "@/lib/site";
import { ease, inView } from "@/lib/motion";
import { Section } from "@/components/ui/primitives";
import { Counter, Reveal } from "@/components/interaction/reveal";
import { Ambient } from "@/components/visuals/ambient";

const MANIFESTO =
  "Most apps fail quietly. Not with a crash, but with a half-second of lag on a list, a form that loses your input, a spinner that never resolves on a weak connection. I have spent five years on the other side of those moments — profiling on mid-range Android hardware, breaking my own network on purpose, and rebuilding the parts that only reveal themselves under real conditions. Cross-platform is not a compromise when the work is done properly.";

const PRINCIPLES = [
  {
    Icon: Layers,
    title: "Architecture before features",
    body: "Module boundaries and data flow decided on purpose. The choices that are cheap now and expensive in month six.",
  },
  {
    Icon: Gauge,
    title: "60fps is a requirement",
    body: "Frame budget, list virtualisation, and memory profiled on the hardware users actually own — not a top-end simulator.",
  },
  {
    Icon: ShieldCheck,
    title: "Assume the network fails",
    body: "Offline queues, idempotent retries, and honest error states. The app should degrade, never dead-end.",
  },
  {
    Icon: Compass,
    title: "Ship, then hold",
    body: "Store submission, staged rollout, crash monitoring, and a fast first patch. Launch is the start of the work.",
  },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.55"],
  });

  const words = MANIFESTO.split(" ");

  return (
    <Section id="about" className="relative overflow-hidden border-t border-white/[0.06]">
      <Ambient variant="iris" grid={false} className="opacity-50" />

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-gradient-to-r from-iris to-transparent" />
                <span className="eyebrow">About · 02</span>
              </div>
              <h2 className="mb-6 text-display-sm font-semibold text-balance">
                The part that
                <br />
                <span className="font-display italic text-iris-soft">nobody sees</span>
              </h2>
              <p className="mb-8 max-w-sm text-[0.9375rem] leading-relaxed text-ash text-pretty">
                Based in {site.location}, working remote-first with teams across the world. Currently
                Senior React Native Engineer at Digital Gravity.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-7 border-t border-white/[0.07] pt-7">
                {stats.map((s) => (
                  <div key={s.label}>
                    <dt className="mb-1.5 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-slate">
                      {s.detail}
                    </dt>
                    <dd>
                      <span className="block text-3xl font-semibold leading-none tracking-tight">
                        <Counter value={s.value} suffix={s.suffix} />
                      </span>
                      <span className="mt-1.5 block text-[0.75rem] text-ash">{s.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-8">
          {/* Scroll-linked reading highlight: each word resolves as it is read. */}
          <div ref={ref} className="mb-14">
            <p className="text-[1.375rem] font-medium leading-[1.45] tracking-tight text-pretty sm:text-[1.75rem] lg:text-[2rem]">
              {words.map((word, i) => (
                <HighlightWord
                  key={`${word}-${i}`}
                  word={word}
                  index={i}
                  total={words.length}
                  progress={scrollYProgress}
                />
              ))}
            </p>
          </div>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={inView}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            className="grid gap-3 sm:grid-cols-2"
          >
            {PRINCIPLES.map(({ Icon, title, body }) => (
              <motion.li
                key={title}
                variants={{
                  hidden: { opacity: 0, y: 22 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: ease.out } },
                }}
                className="group relative overflow-hidden rounded-2xl glass p-5 transition-colors duration-500 hover:border-white/20"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_0%_0%,rgb(124_107_255/0.14),transparent_55%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <Icon className="relative mb-4 h-[1.15rem] w-[1.15rem] text-iris-soft transition-transform duration-500 group-hover:-translate-y-0.5" />
                <h3 className="relative mb-2 text-[0.9375rem] font-semibold tracking-tight">{title}</h3>
                <p className="relative text-[0.8125rem] leading-relaxed text-ash text-pretty">{body}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </Section>
  );
}

/**
 * One word of the manifesto. Opacity is driven straight off the shared scroll
 * MotionValue, so the whole paragraph animates without a single React render.
 */
function HighlightWord({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = index / total;
  const end = start + 1.4 / total;
  const opacity = useTransform(progress, [start, end], [0.16, 1]);

  return (
    <>
      <motion.span style={{ opacity }} className="inline">
        {word}
      </motion.span>{" "}
    </>
  );
}
