"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { archiveProjects, featuredProjects, type Project } from "@/lib/data/projects";
import { accentText, cn, hexToRgbChannels } from "@/lib/utils";
import { ease, inView } from "@/lib/motion";
import { Section, SectionHeading, Badge } from "@/components/ui/primitives";
import { Parallax, Reveal, Tilt } from "@/components/interaction/reveal";
import { Magnetic } from "@/components/interaction/magnetic";
import { Button } from "@/components/ui/button";
import { ProjectMedia } from "@/components/work/project-media";
import { Ambient } from "@/components/visuals/ambient";

export function Work() {
  return (
    <Section id="work" className="overflow-hidden">
      <Ambient variant="dual" className="opacity-60" />

      <SectionHeading
        eyebrow="Selected work · 01"
        title={
          <>
            Products shipped, not{" "}
            <span className="font-display italic text-iris-soft">mockups</span> polished.
          </>
        }
        lede="Six case studies from twenty-plus production apps. Each one covers the actual problem, the architecture decisions behind it, and what I owned."
        className="mb-16 sm:mb-24"
      />

      <div className="flex flex-col gap-24 sm:gap-36">
        {featuredProjects.map((project, i) => (
          <FeaturedProject key={project.slug} project={project} index={i} />
        ))}
      </div>

      <Archive />
    </Section>
  );
}

function FeaturedProject({ project, index }: { project: Project; index: number }) {
  const flipped = index % 2 === 1;
  const rgb = hexToRgbChannels(project.accent);

  return (
    <article className="group relative">
      <div
        className={cn(
          "grid items-center gap-8 lg:grid-cols-12 lg:gap-14",
          flipped && "lg:[direction:rtl]",
        )}
      >
        {/* ---- Media ------------------------------------------------------ */}
        <div className={cn("lg:col-span-7 lg:[direction:ltr]")}>
          <Parallax speed={0.14}>
            <Tilt max={5}>
              <Link
                href={`/work/${project.slug}`}
                data-cursor-label="Case study"
                aria-label={`Read the ${project.title} case study`}
                className="relative block"
              >
                {/* Accent bloom behind the frame. */}
                <div
                  aria-hidden
                  className="absolute -inset-8 -z-10 rounded-[3rem] opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-70"
                  style={{ background: `radial-gradient(circle at 50% 50%, rgb(${rgb} / 0.45), transparent 70%)` }}
                />
                <ProjectMedia
                  poster={project.images[0]}
                  video={project.video}
                  title={project.title}
                  accent={project.accent}
                  priority={index === 0}
                  className="aspect-[16/10] shadow-[0_40px_120px_-40px_rgb(0_0_0/0.9)]"
                />
              </Link>
            </Tilt>
          </Parallax>
        </div>

        {/* ---- Detail ----------------------------------------------------- */}
        <div className="lg:col-span-5 lg:[direction:ltr]">
          <Reveal direction={flipped ? "right" : "left"}>
            <div className="mb-4 flex items-center gap-3">
              <span
                className="font-mono text-[0.6875rem] tracking-[0.18em]"
                style={{ color: accentText(project.accent) }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="h-px w-6" style={{ backgroundColor: `rgb(${rgb} / 0.5)` }} />
              <span className="eyebrow">{project.domain}</span>
              <span className="text-slate">·</span>
              <span className="font-mono text-[0.6875rem] text-slate">{project.year}</span>
            </div>

            <h3 className="mb-3 text-[2rem] font-semibold leading-none tracking-tight sm:text-[2.5rem]">
              <Link
                href={`/work/${project.slug}`}
                className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 ease-swift hover:bg-[length:100%_1px]"
              >
                {project.title}
              </Link>
            </h3>

            <p className="mb-6 max-w-md text-[0.9375rem] leading-relaxed text-ash text-pretty">
              {project.tagline}
            </p>

            <ul className="mb-6 flex flex-wrap gap-1.5">
              {project.stack.slice(0, 5).map((tech) => (
                <li key={tech}>
                  <Badge>{tech}</Badge>
                </li>
              ))}
              {project.stack.length > 5 && (
                <li>
                  <Badge>+{project.stack.length - 5}</Badge>
                </li>
              )}
            </ul>

            <dl className="mb-7 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/[0.07] pt-5">
              <div>
                <dt className="eyebrow mb-1.5">Role</dt>
                <dd className="text-[0.8125rem] text-chalk">{project.role}</dd>
              </div>
              <div>
                <dt className="eyebrow mb-1.5">Platforms</dt>
                <dd className="text-[0.8125rem] text-chalk">{project.platforms.join(" · ")}</dd>
              </div>
            </dl>

            <Magnetic strength={0.25}>
              <Button variant="outline" asChild data-cursor="hover">
                <Link href={`/work/${project.slug}`}>
                  Read case study
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </Link>
              </Button>
            </Magnetic>
          </Reveal>
        </div>
      </div>
    </article>
  );
}

/** Compact grid for the projects that don't get the full showcase treatment. */
function Archive() {
  return (
    <div className="mt-28 sm:mt-40">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-t border-white/[0.07] pt-10">
        <div>
          <p className="eyebrow mb-2">Archive</p>
          <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Six more, briefly
          </h3>
        </div>
        <p className="max-w-sm text-sm text-ash text-pretty">
          Earlier products across health, faith, social, and education — same standard, less
          space to talk about them.
        </p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={inView}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {archiveProjects.map((project) => (
          <motion.div
            key={project.slug}
            variants={{
              hidden: { opacity: 0, y: 24 },
              show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: ease.out } },
            }}
          >
            <ArchiveCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

function ArchiveCard({ project }: { project: Project }) {
  const rgb = hexToRgbChannels(project.accent);

  return (
    <Link
      href={`/work/${project.slug}`}
      data-cursor-label="Open"
      className="group/card relative flex h-full flex-col overflow-hidden rounded-2xl glass p-3 transition-all duration-500 ease-swift hover:-translate-y-1.5 hover:border-white/20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
        style={{ background: `radial-gradient(120% 80% at 50% 0%, rgb(${rgb} / 0.18), transparent 60%)` }}
      />

      <ProjectMedia
        poster={project.images[0]}
        video={project.video}
        title={project.title}
        accent={project.accent}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="aspect-[16/11] rounded-xl"
      />

      <div className="relative z-10 flex flex-1 flex-col p-3 pt-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: project.accent }} />
          <span className="eyebrow">{project.domain}</span>
          <span className="ml-auto font-mono text-[0.6875rem] text-slate">{project.year}</span>
        </div>

        <h4 className="mb-1.5 flex items-center gap-1.5 text-lg font-semibold tracking-tight">
          {project.title}
          <ArrowUpRight className="h-3.5 w-3.5 text-slate transition-all duration-300 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 group-hover/card:text-chalk" />
        </h4>

        <p className="mb-4 line-clamp-2 text-[0.8125rem] leading-relaxed text-ash">
          {project.tagline}
        </p>

        <div className="mt-auto flex flex-wrap gap-1.5">
          {project.stack.slice(0, 3).map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
      </div>
    </Link>
  );
}
