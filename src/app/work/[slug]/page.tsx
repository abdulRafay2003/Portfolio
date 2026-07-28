import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProject, projects } from "@/lib/data/projects";
import { site } from "@/lib/site";
import { CaseStudy } from "@/components/work/case-study";

type Params = { params: Promise<{ slug: string }> };

/** Every case study is known at build time, so all of them prerender. */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const title = `${project.title} — ${project.domain} case study`;

  return {
    title,
    description: project.tagline,
    openGraph: {
      title: `${title} | ${site.name}`,
      description: project.tagline,
      images: [{ url: project.images[0], width: 1600, height: 1000, alt: project.title }],
      type: "article",
    },
    alternates: { canonical: `/work/${slug}` },
  };
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return <CaseStudy project={project} next={next} />;
}
