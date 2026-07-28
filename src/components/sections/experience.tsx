"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { GraduationCap, ShieldCheck } from "lucide-react";

import { certifications, education, roles } from "@/lib/data/career";
import { ease, inView } from "@/lib/motion";
import { Badge, Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/interaction/reveal";
import { LiveDot } from "@/components/ui/primitives";

export function Experience() {
  const rail = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: rail,
    offset: ["start 0.7", "end 0.6"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });
  const glowY = useTransform(progress, (v) => `${v * 100}%`);

  return (
    <Section id="experience" className="border-t border-white/[0.06]">
      <SectionHeading
        eyebrow="Career · 03"
        title={
          <>
            Associate to Senior in four years,{" "}
            <span className="font-display italic text-mint-soft">without changing stack</span>.
          </>
        }
        lede="Five years of React Native, deliberately. Depth in one platform has produced better results than breadth across five."
        className="mb-16"
      />

      <div ref={rail} className="relative">
        {/* Timeline rail — the fill tracks scroll position through the section. */}
        <div
          aria-hidden
          className="absolute left-[7px] top-2 hidden h-[calc(100%-2rem)] w-px bg-white/[0.08] sm:block"
        >
          <motion.div
            className="absolute inset-x-0 top-0 origin-top bg-gradient-to-b from-iris via-iris-soft to-mint"
            style={{ height: glowY }}
          />
          <motion.span
            className="absolute -left-[3px] h-[7px] w-[7px] -translate-y-1/2 rounded-full bg-mint shadow-[0_0_14px_3px_rgb(61_220_200/0.6)]"
            style={{ top: glowY }}
          />
        </div>

        <ol className="flex flex-col gap-4 sm:pl-12">
          {roles.map((role, i) => (
            <motion.li
              key={role.company}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inView}
              transition={{ duration: 0.6, ease: ease.out, delay: i * 0.06 }}
              className="relative"
            >
              {/* Node on the rail. */}
              <span
                aria-hidden
                className="absolute -left-12 top-7 hidden h-[15px] w-[15px] items-center justify-center rounded-full border border-white/15 bg-obsidian sm:flex"
              >
                <span
                  className={
                    role.current
                      ? "h-[5px] w-[5px] rounded-full bg-mint"
                      : "h-[5px] w-[5px] rounded-full bg-slate"
                  }
                />
              </span>

              <article className="group relative overflow-hidden rounded-2xl glass p-6 transition-all duration-500 ease-swift hover:border-white/[0.18] sm:p-8">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(100%_60%_at_0%_0%,rgb(124_107_255/0.12),transparent_55%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />

                <div className="relative mb-4 flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                  <div>
                    <h3 className="flex flex-wrap items-center gap-2.5 text-xl font-semibold tracking-tight sm:text-2xl">
                      {role.title}
                      {role.current && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-mint/25 bg-mint/10 px-2.5 py-0.5 text-[0.6875rem] font-normal text-mint-soft">
                          <LiveDot />
                          Current
                        </span>
                      )}
                    </h3>
                    <p className="mt-1.5 text-[0.9375rem] text-ash">
                      <span className="text-chalk">{role.company}</span>
                      <span className="mx-2 text-slate">·</span>
                      {role.location}
                    </p>
                  </div>
                  <p className="shrink-0 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-slate">
                    {role.period}
                  </p>
                </div>

                <p className="relative mb-5 max-w-2xl text-[0.9375rem] leading-relaxed text-ash text-pretty">
                  {role.summary}
                </p>

                <ul className="relative mb-6 flex flex-col gap-2.5">
                  {role.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-[0.875rem] leading-relaxed text-ash">
                      <span
                        aria-hidden
                        className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-iris/70"
                      />
                      <span className="text-pretty">{h}</span>
                    </li>
                  ))}
                </ul>

                <ul className="relative flex flex-wrap gap-1.5">
                  {role.stack.map((tech) => (
                    <li key={tech}>
                      <Badge>{tech}</Badge>
                    </li>
                  ))}
                </ul>
              </article>
            </motion.li>
          ))}
        </ol>
      </div>

      {/* ---- Education & credentials --------------------------------------- */}
      <div className="mt-16 grid gap-4 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <div className="h-full rounded-2xl glass p-6 sm:p-8">
            <div className="mb-5 flex items-center gap-2.5">
              <GraduationCap className="h-4 w-4 text-mint-soft" />
              <span className="eyebrow">Education</span>
            </div>
            {education.map((e) => (
              <div key={e.institution}>
                <h3 className="text-lg font-semibold tracking-tight">{e.credential}</h3>
                <p className="mt-1.5 text-[0.9375rem] text-ash">
                  <span className="text-chalk">{e.institution}</span>
                  <span className="mx-2 text-slate">·</span>
                  {e.location}
                </p>
                <p className="mt-1 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-slate">
                  {e.period}
                </p>
                <p className="mt-4 text-[0.875rem] leading-relaxed text-ash text-pretty">{e.note}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-7">
          <div className="h-full rounded-2xl glass p-6 sm:p-8">
            <div className="mb-5 flex items-center gap-2.5">
              <ShieldCheck className="h-4 w-4 text-iris-soft" />
              <span className="eyebrow">Proven in production</span>
            </div>
            <ul className="flex flex-col divide-y divide-white/[0.07]">
              {certifications.map((c) => (
                <li key={c.title} className="group flex flex-col gap-1 py-4 first:pt-0 last:pb-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h3 className="text-[0.9375rem] font-medium tracking-tight transition-colors duration-300 group-hover:text-iris-soft">
                      {c.title}
                    </h3>
                    <span className="font-mono text-[0.6875rem] text-slate">{c.issuer}</span>
                  </div>
                  <p className="text-[0.8125rem] leading-relaxed text-ash text-pretty">{c.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
