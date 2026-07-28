"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { skillGroups, toolbelt, type Skill } from "@/lib/data/skills";
import { cn } from "@/lib/utils";
import { ease, inView } from "@/lib/motion";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/interaction/reveal";
import { Ambient } from "@/components/visuals/ambient";

export function Skills() {
  const [active, setActive] = useState(skillGroups[0].id);
  const group = skillGroups.find((g) => g.id === active) ?? skillGroups[0];

  return (
    <Section id="skills" className="relative overflow-hidden border-t border-white/[0.06]">
      <Ambient variant="mint" className="opacity-40" />

      <SectionHeading
        eyebrow="Capability · 04"
        title={
          <>
            A deep stack, not a{" "}
            <span className="font-display italic text-mint-soft">long list</span>.
          </>
        }
        lede="Rated on what I can own end to end under deadline — not on what I have read about."
        className="mb-12"
      />

      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        {/* ---- Group selector ---------------------------------------------- */}
        <div className="lg:col-span-4">
          <div
            role="tablist"
            aria-label="Skill categories"
            className="flex gap-2 overflow-x-auto no-scrollbar lg:flex-col lg:overflow-visible"
          >
            {skillGroups.map((g) => {
              const isActive = g.id === active;
              return (
                <button
                  key={g.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`skills-${g.id}`}
                  id={`tab-${g.id}`}
                  onClick={() => setActive(g.id)}
                  data-cursor="hover"
                  className={cn(
                    "group relative shrink-0 overflow-hidden rounded-2xl border px-4 py-3.5 text-left transition-colors duration-400 lg:w-full lg:px-5 lg:py-4",
                    isActive
                      ? "border-white/[0.16] bg-white/[0.055]"
                      : "border-white/[0.06] bg-transparent hover:border-white/[0.12] hover:bg-white/[0.03]",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="skill-tab-glow"
                      className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgb(124_107_255/0.16),transparent_60%)]"
                      transition={{ type: "spring", stiffness: 320, damping: 34 }}
                    />
                  )}
                  <span className="relative flex items-center gap-2.5">
                    <span
                      className={cn(
                        "h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-400",
                        isActive ? "bg-mint" : "bg-slate",
                      )}
                    />
                    <span
                      className={cn(
                        "whitespace-nowrap text-[0.9375rem] font-medium tracking-tight transition-colors duration-400",
                        isActive ? "text-chalk" : "text-ash",
                      )}
                    >
                      {g.label}
                    </span>
                  </span>
                  <span className="relative mt-1.5 hidden text-[0.8125rem] leading-snug text-ash lg:block">
                    {g.caption}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ---- Meters ------------------------------------------------------ */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={group.id}
              id={`skills-${group.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${group.id}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.38, ease: ease.out }}
              className="rounded-2xl glass p-5 sm:p-7"
            >
              <p className="mb-6 text-[0.875rem] text-ash lg:hidden">{group.caption}</p>
              <ul className="flex flex-col gap-5">
                {group.skills.map((skill, i) => (
                  <SkillMeter key={skill.name} skill={skill} index={i} />
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ---- Toolbelt ------------------------------------------------------ */}
      <div className="mt-16 border-t border-white/[0.07] pt-12">
        <Reveal>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-2">Toolbelt</p>
              <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Everything else I reach for
              </h3>
            </div>
          </div>
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={inView}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {toolbelt.map((cat) => (
            <motion.div
              key={cat.group}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: ease.out } },
              }}
              className="group rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 transition-colors duration-500 hover:border-white/[0.16] hover:bg-white/[0.04]"
            >
              <p className="eyebrow mb-3.5">{cat.group}</p>
              <ul className="flex flex-wrap gap-1.5">
                {cat.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-[0.75rem] text-ash transition-colors duration-300 hover:border-iris/30 hover:text-chalk"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

function SkillMeter({ skill, index }: { skill: Skill; index: number }) {
  return (
    <li className="group/skill">
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <span className="flex items-baseline gap-2.5">
          <span className="text-[0.9375rem] font-medium tracking-tight">{skill.name}</span>
          <span className="font-mono text-[0.6875rem] text-slate">
            {skill.years}
            {skill.years === 1 ? " yr" : " yrs"}
          </span>
        </span>
        <span className="font-mono text-[0.6875rem] tabular-nums text-ash">{skill.level}</span>
      </div>

      <div
        className="relative h-[3px] w-full overflow-hidden rounded-full bg-white/[0.07]"
        role="meter"
        aria-valuenow={skill.level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${skill.name} proficiency`}
      >
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: skill.level / 100 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1, ease: ease.out, delay: 0.08 + index * 0.07 }}
          className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-gradient-to-r from-iris via-iris-soft to-mint"
        />
      </div>

      {/* Note expands on hover — detail on demand, not clutter by default. */}
      <p className="mt-0 max-h-0 overflow-hidden text-[0.8125rem] leading-relaxed text-ash opacity-0 transition-all duration-500 ease-swift group-hover/skill:mt-2 group-hover/skill:max-h-16 group-hover/skill:opacity-100">
        {skill.note}
      </p>
    </li>
  );
}
