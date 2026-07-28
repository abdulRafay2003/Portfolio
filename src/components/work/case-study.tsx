"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Check, Target, Wrench } from "lucide-react";

import type { Project } from "@/lib/data/projects";
import { accentText, hexToRgbChannels, shadeChannels } from "@/lib/utils";
import { ease } from "@/lib/motion";
import { Badge } from "@/components/ui/primitives";
import { Parallax, Reveal, RevealGroup, RevealItem } from "@/components/interaction/reveal";
import { SplitText } from "@/components/interaction/text-reveal";
import { Magnetic } from "@/components/interaction/magnetic";
import { Button } from "@/components/ui/button";
import { ProjectMedia } from "@/components/work/project-media";
import { Ambient } from "@/components/visuals/ambient";

export function CaseStudy({ project, next }: { project: Project; next: Project }) {
  const rgb = hexToRgbChannels(project.accent);
  const tint = shadeChannels(project.accent, 0.58);

  return (
    // The project's brand colour is scoped here, so every accent below is
    // per-project without a single inline style repeated down the tree.
    // `--tint` is the pre-darkened variant the multiply plates blend with.
    <article style={{ ["--brand" as string]: rgb, ["--tint" as string]: tint }}>
      {/* ---- Masthead ----------------------------------------------------- */}
      <header className="relative overflow-hidden pb-16 pt-32 sm:pt-40">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute -top-1/3 left-1/2 h-[46rem] w-[46rem] -translate-x-1/2 animate-blob-morph opacity-40 blur-[110px]"
            style={{ background: `radial-gradient(circle, rgb(var(--brand) / 0.75), transparent 68%)` }}
          />
          <div className="absolute inset-0 grid-veil" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-void to-transparent" />
        </div>

        <div className="container">
          <Link
            href="/#work"
            data-cursor="hover"
            className="group mb-10 inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ash transition-colors hover:text-chalk"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
            All work
          </Link>

          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[0.6875rem]"
              style={{
                borderColor: `rgb(var(--brand) / 0.35)`,
                backgroundColor: `rgb(var(--brand) / 0.12)`,
                color: accentText(project.accent),
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: project.accent }} />
              {project.domain}
            </span>
            <span className="font-mono text-[0.6875rem] text-slate">{project.year}</span>
            <span className="text-slate">·</span>
            <span className="font-mono text-[0.6875rem] text-slate">
              {project.platforms.join(" · ")}
            </span>
          </div>

          <h1 className="mb-6 max-w-4xl text-display-lg font-semibold text-balance">
            <SplitText immediate by="char" delay={0.1}>
              {project.title}
            </SplitText>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: ease.out, delay: 0.4 }}
            className="max-w-2xl text-lg leading-relaxed text-ash text-pretty sm:text-xl"
          >
            {project.tagline}
          </motion.p>
        </div>
      </header>

      {/* ---- Lead media --------------------------------------------------- */}
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: ease.out, delay: 0.25 }}
          className="relative"
        >
          <div
            aria-hidden
            className="absolute -inset-10 -z-10 rounded-[4rem] opacity-50 blur-[80px]"
            style={{ background: `radial-gradient(circle at 50% 40%, rgb(var(--brand) / 0.45), transparent 70%)` }}
          />
          <ProjectMedia
            poster={project.images[0]}
            video={project.video}
            title={project.title}
            accent={project.accent}
            priority
            sizes="(max-width: 1360px) 100vw, 1360px"
            className="aspect-[16/10] shadow-[0_50px_140px_-50px_rgb(0_0_0/0.95)]"
          />
        </motion.div>
      </div>

      {/* ---- Facts -------------------------------------------------------- */}
      <section className="container py-16 sm:py-24">
        <RevealGroup className="grid gap-8 border-y border-white/[0.07] py-10 sm:grid-cols-2 lg:grid-cols-4">
          <RevealItem>
            <p className="eyebrow mb-2.5">Role</p>
            <p className="text-[0.9375rem] text-chalk">{project.role}</p>
          </RevealItem>
          <RevealItem>
            <p className="eyebrow mb-2.5">Timeline</p>
            <p className="text-[0.9375rem] text-chalk">{project.year}</p>
          </RevealItem>
          <RevealItem>
            <p className="eyebrow mb-2.5">Platforms</p>
            <p className="text-[0.9375rem] text-chalk">{project.platforms.join(", ")}</p>
          </RevealItem>
          <RevealItem>
            <p className="eyebrow mb-2.5">Stack</p>
            <ul className="flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <li key={tech}>
                  <Badge>{tech}</Badge>
                </li>
              ))}
            </ul>
          </RevealItem>
        </RevealGroup>

        <Reveal className="mt-14">
          <p className="max-w-4xl text-[1.375rem] font-medium leading-[1.5] tracking-tight text-pretty sm:text-[1.625rem]">
            {project.overview}
          </p>
        </Reveal>
      </section>

      {/* ---- Problem / Solution -------------------------------------------- */}
      <section className="relative overflow-hidden border-y border-white/[0.06] py-20 sm:py-28">
        <Ambient variant="iris" grid={false} className="opacity-40" />
        <div className="container grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal direction="left">
            <div className="mb-5 flex items-center gap-3">
              <Target className="h-4 w-4 text-ember" />
              <span className="eyebrow">The problem</span>
            </div>
            <p className="text-[1.0625rem] leading-relaxed text-ash text-pretty sm:text-lg">
              {project.problem}
            </p>
          </Reveal>

          <Reveal direction="right" delay={0.08}>
            <div className="mb-5 flex items-center gap-3">
              <Wrench className="h-4 w-4" style={{ color: project.accent }} />
              <span className="eyebrow">The solution</span>
            </div>
            <p className="text-[1.0625rem] leading-relaxed text-chalk text-pretty sm:text-lg">
              {project.solution}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---- Contribution --------------------------------------------------- */}
      <section className="container py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <div className="mb-5 flex items-center gap-3">
                  <span
                    className="h-px w-8"
                    style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }}
                  />
                  <span className="eyebrow">My contribution</span>
                </div>
                <h2 className="text-display-sm font-semibold text-balance">
                  What I actually{" "}
                  <span className="font-display italic" style={{ color: project.accent }}>
                    owned
                  </span>
                </h2>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-8">
            <RevealGroup className="flex flex-col">
              {project.contribution.map((item, i) => (
                <RevealItem key={item}>
                  <div className="group flex gap-5 border-b border-white/[0.07] py-6 first:pt-0 sm:gap-8">
                    <span className="shrink-0 pt-1 font-mono text-[0.6875rem] tracking-[0.14em] text-slate transition-colors duration-400 group-hover:text-chalk">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[0.9375rem] leading-relaxed text-ash text-pretty sm:text-base">
                      {item}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* ---- Gallery -------------------------------------------------------- */}
      {project.images.length > 1 && (
        <section className="border-y border-white/[0.06] py-20 sm:py-28">
          <div className="container mb-10">
            <Reveal>
              <p className="eyebrow mb-2.5">Interface</p>
              <h2 className="text-display-sm font-semibold">Inside the product</h2>
            </Reveal>
          </div>

          <div className="container grid gap-4 sm:grid-cols-2">
            {project.images.slice(1).map((src, i) => (
              <Parallax
                key={src}
                speed={i % 2 === 0 ? 0.1 : 0.18}
                className={project.images.length === 2 ? "sm:col-span-2" : undefined}
              >
                <Reveal blur>
                  <figure className="group relative overflow-hidden rounded-2xl border border-white/10 bg-graphite">
                    <Image
                      src={src}
                      alt={`${project.title} interface, view ${i + 2}`}
                      width={1600}
                      height={1000}
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="w-full object-cover transition-transform duration-700 ease-swift group-hover:scale-[1.02]"
                    />
                    {/* Same duotone-at-rest treatment as the lead media, so the
                        gallery reads as one surface rather than raw screenshots. */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-0"
                      style={{
                        background: `linear-gradient(150deg, rgb(var(--tint)) 0%, rgb(var(--tint)) 42%, #17132B 100%)`,
                      }}
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-void/25 transition-opacity duration-700 group-hover:opacity-0"
                    />
                  </figure>
                </Reveal>
              </Parallax>
            ))}
          </div>
        </section>
      )}

      {/* ---- Outcomes & challenges ------------------------------------------- */}
      <section className="container py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <p className="eyebrow mb-2.5">Outcome</p>
              <h2 className="mb-8 text-display-sm font-semibold text-balance">
                What it{" "}
                <span className="font-display italic" style={{ color: project.accent }}>
                  changed
                </span>
              </h2>
            </Reveal>
            <RevealGroup className="flex flex-col gap-3">
              {project.achievements.map((a) => (
                <RevealItem key={a}>
                  <div className="group flex gap-4 rounded-2xl glass p-5 transition-colors duration-500 hover:border-white/20">
                    <span
                      className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full"
                      style={{ backgroundColor: `rgb(var(--brand) / 0.18)` }}
                    >
                      <Check className="h-3 w-3" style={{ color: project.accent }} />
                    </span>
                    <p className="text-[0.9375rem] leading-relaxed text-ash text-pretty">{a}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <div>
            <Reveal>
              <p className="eyebrow mb-2.5">Engineering</p>
              <h2 className="mb-8 text-display-sm font-semibold text-balance">
                Problems worth{" "}
                <span className="font-display italic text-mint-soft">solving</span>
              </h2>
            </Reveal>
            <RevealGroup className="flex flex-col gap-3">
              {project.challenges.map((c, i) => (
                <RevealItem key={c.title}>
                  <div className="group relative overflow-hidden rounded-2xl glass p-6 transition-colors duration-500 hover:border-white/20">
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background: `radial-gradient(110% 70% at 0% 0%, rgb(var(--brand) / 0.14), transparent 58%)`,
                      }}
                    />
                    <div className="relative mb-2.5 flex items-baseline gap-3">
                      <span className="font-mono text-[0.6875rem] text-slate">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-[0.9375rem] font-semibold tracking-tight">{c.title}</h3>
                    </div>
                    <p className="relative text-[0.875rem] leading-relaxed text-ash text-pretty">
                      {c.body}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* ---- Next -------------------------------------------------------- */}
      <section className="relative overflow-hidden border-t border-white/[0.06]">
        <Link
          href={`/work/${next.slug}`}
          data-cursor-label="Next"
          className="group block py-20 transition-colors duration-500 sm:py-28"
          style={{ ["--brand" as string]: hexToRgbChannels(next.accent) }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            style={{
              background: `radial-gradient(80% 100% at 50% 100%, rgb(var(--brand) / 0.22), transparent 70%)`,
            }}
          />
          <div className="container relative flex flex-col items-center text-center">
            <p className="eyebrow mb-4">Next case study</p>
            <h2 className="flex flex-wrap items-center justify-center gap-4 text-display-md font-semibold tracking-tight">
              <span className="transition-transform duration-600 ease-swift group-hover:-translate-y-1">
                {next.title}
              </span>
              <ArrowUpRight className="h-8 w-8 text-slate transition-all duration-500 group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:text-chalk sm:h-12 sm:w-12" />
            </h2>
            <p className="mt-5 max-w-md text-[0.9375rem] text-ash text-pretty">{next.tagline}</p>
          </div>
        </Link>
      </section>

      <section className="container flex flex-col items-center gap-5 border-t border-white/[0.06] py-14 sm:flex-row sm:justify-between">
        <p className="text-[0.9375rem] text-ash">Want this level of detail on your product?</p>
        <div className="flex gap-2">
          <Magnetic strength={0.25}>
            <Button variant="outline" asChild data-cursor="hover">
              <Link href="/#work">
                <ArrowLeft className="h-4 w-4" />
                All work
              </Link>
            </Button>
          </Magnetic>
          <Magnetic strength={0.25}>
            <Button variant="accent" asChild data-cursor="hover">
              <Link href="/#contact">
                Start a conversation
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </Magnetic>
        </div>
      </section>
    </article>
  );
}
