"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, GitFork, Github, Star, Users } from "lucide-react";

import { site } from "@/lib/site";
import { achievements } from "@/lib/data/career";
import { cn } from "@/lib/utils";
import { ease, inView } from "@/lib/motion";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/interaction/reveal";

type Profile = {
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
};

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
};

type State =
  | { status: "loading" }
  | { status: "ready"; profile: Profile; repos: Repo[] }
  | { status: "error" };

export function Achievements() {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();

    // Unauthenticated GitHub API — fine for a public profile, and read
    // client-side so the page stays fully static. Any failure (rate limit,
    // offline, blocked) degrades to a plain link rather than an error state.
    async function load() {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${site.githubUser}`, { signal: controller.signal }),
          fetch(
            `https://api.github.com/users/${site.githubUser}/repos?sort=pushed&per_page=4`,
            { signal: controller.signal },
          ),
        ]);
        if (!profileRes.ok || !reposRes.ok) throw new Error("github unavailable");
        const profile: Profile = await profileRes.json();
        const repos: Repo[] = await reposRes.json();
        setState({ status: "ready", profile, repos: repos.slice(0, 4) });
      } catch (err) {
        if ((err as Error).name !== "AbortError") setState({ status: "error" });
      }
    }

    load();
    return () => controller.abort();
  }, []);

  return (
    <Section className="border-t border-white/[0.06]">
      <SectionHeading
        eyebrow="Track record"
        title={
          <>
            Numbers that came from{" "}
            <span className="font-display italic text-ember">shipping</span>
          </>
        }
        className="mb-12"
      />

      <motion.ul
        initial="hidden"
        whileInView="show"
        viewport={inView}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
      >
        {achievements.map((a) => (
          <motion.li
            key={a.title}
            variants={{
              hidden: { opacity: 0, y: 22 },
              show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: ease.out } },
            }}
            className="group relative overflow-hidden rounded-2xl glass p-6 transition-colors duration-500 hover:border-white/20"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_100%,rgb(255_138_91/0.12),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
            <p className="relative bg-gradient-to-br from-white to-white/45 bg-clip-text text-4xl font-semibold leading-none tracking-tight text-transparent">
              {a.metric}
            </p>
            <h3 className="relative mt-4 text-[0.9375rem] font-medium tracking-tight">{a.title}</h3>
            <p className="relative mt-2 text-[0.8125rem] leading-relaxed text-ash text-pretty">
              {a.body}
            </p>
          </motion.li>
        ))}
      </motion.ul>

      {/* ---- GitHub ------------------------------------------------------- */}
      <Reveal className="mt-4">
        <div className="overflow-hidden rounded-2xl glass">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.07] p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-white/[0.06]">
                <Github className="h-4 w-4" />
              </span>
              <div>
                <h3 className="text-[0.9375rem] font-medium tracking-tight">Open source activity</h3>
                <p className="font-mono text-[0.6875rem] text-slate">@{site.githubUser}</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <Stat
                label="Repos"
                value={state.status === "ready" ? state.profile.public_repos : null}
                loading={state.status === "loading"}
              />
              <Stat
                label="Followers"
                value={state.status === "ready" ? state.profile.followers : null}
                loading={state.status === "loading"}
                Icon={Users}
              />
              <a
                href={site.socials.github}
                target="_blank"
                rel="noreferrer noopener"
                data-cursor="hover"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-[0.8125rem] text-ash transition-colors hover:border-white/25 hover:text-chalk"
              >
                Profile
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div className="grid gap-px bg-white/[0.06] sm:grid-cols-2">
            {state.status === "loading" &&
              Array.from({ length: 4 }).map((_, i) => <RepoSkeleton key={i} />)}

            {state.status === "ready" &&
              state.repos.map((repo) => <RepoCard key={repo.id} repo={repo} />)}

            {state.status === "error" && (
              <div className="bg-obsidian p-6 sm:col-span-2">
                <p className="text-[0.875rem] text-ash">
                  Live repository data isn&rsquo;t loading right now.{" "}
                  <a
                    href={site.socials.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-iris-soft underline underline-offset-4"
                  >
                    Browse the profile on GitHub
                  </a>{" "}
                  instead.
                </p>
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

function Stat({
  label,
  value,
  loading,
  Icon,
}: {
  label: string;
  value: number | null;
  loading: boolean;
  Icon?: typeof Users;
}) {
  return (
    <div className="hidden text-right sm:block">
      <p className="flex items-center justify-end gap-1.5 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-slate">
        {Icon && <Icon className="h-3 w-3" />}
        {label}
      </p>
      {loading ? (
        <span className="mt-1 block h-5 w-10 animate-pulse rounded bg-white/10" />
      ) : (
        <p className="text-lg font-semibold leading-tight tabular-nums">{value ?? "—"}</p>
      )}
    </div>
  );
}

function RepoCard({ repo }: { repo: Repo }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer noopener"
      data-cursor="hover"
      className="group/repo relative flex flex-col bg-obsidian p-6 transition-colors duration-400 hover:bg-graphite"
    >
      <div className="mb-2 flex items-center gap-2">
        <h4 className="truncate font-mono text-[0.875rem] text-chalk">{repo.name}</h4>
        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-slate transition-all duration-300 group-hover/repo:translate-x-0.5 group-hover/repo:-translate-y-0.5 group-hover/repo:text-chalk" />
      </div>
      <p className="mb-4 line-clamp-2 text-[0.8125rem] leading-relaxed text-ash">
        {repo.description ?? "No description provided."}
      </p>
      <div className="mt-auto flex items-center gap-4 font-mono text-[0.6875rem] text-slate">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-iris" />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Star className="h-3 w-3" />
          {repo.stargazers_count}
        </span>
        <span className="flex items-center gap-1">
          <GitFork className="h-3 w-3" />
          {repo.forks_count}
        </span>
        <span className="ml-auto">
          {new Date(repo.pushed_at).toLocaleDateString("en-GB", {
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>
    </a>
  );
}

/** Matches RepoCard's exact geometry so the swap doesn't shift layout. */
function RepoSkeleton() {
  return (
    <div className="flex flex-col bg-obsidian p-6" aria-hidden>
      <div className="mb-3 h-4 w-1/3 animate-pulse rounded bg-white/[0.08]" />
      <div className="mb-2 h-3 w-full animate-pulse rounded bg-white/[0.05]" />
      <div className="mb-5 h-3 w-4/5 animate-pulse rounded bg-white/[0.05]" />
      <div className="mt-auto flex gap-4">
        <div className="h-3 w-16 animate-pulse rounded bg-white/[0.05]" />
        <div className="h-3 w-8 animate-pulse rounded bg-white/[0.05]" />
        <div className={cn("h-3 w-8 animate-pulse rounded bg-white/[0.05]")} />
      </div>
    </div>
  );
}
