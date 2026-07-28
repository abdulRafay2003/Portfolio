"use client";

import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { nav, site } from "@/lib/site";
import { Magnetic } from "@/components/interaction/magnetic";
import { Marquee } from "@/components/ui/primitives";
import { useSmoothScroll } from "@/components/providers/smooth-scroll";

export function Footer() {
  const { scrollTo } = useSmoothScroll();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-obsidian">
      {/* Oversized wordmark bleeding off the baseline — signature closing beat. */}
      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <Marquee speed={70} pauseOnHover={false} className="opacity-[0.055]">
          <span className="whitespace-nowrap pr-8 text-[18vw] font-semibold leading-[0.8] tracking-tighter">
            ABDUL RAFAY · REACT NATIVE ·
          </span>
        </Marquee>
      </div>

      <div className="container relative z-10 -mt-4 pb-10">
        <div className="grid gap-10 border-t border-white/[0.07] pt-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="max-w-sm text-lg leading-snug tracking-tight text-chalk text-balance">
              Building mobile products that hold up under real users, real networks, and real
              deadlines.
            </p>
            <a
              href={site.socials.mail}
              data-cursor="hover"
              className="mt-5 inline-block font-mono text-sm text-ash underline-offset-4 transition-colors hover:text-chalk hover:underline"
            >
              {site.email}
            </a>
          </div>

          <nav className="md:col-span-3" aria-label="Footer">
            <p className="eyebrow mb-4">Navigate</p>
            <ul className="space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(item.href, -80);
                    }}
                    className="text-sm text-ash transition-colors hover:text-chalk"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="eyebrow mb-4">Elsewhere</p>
            <div className="flex flex-wrap gap-2">
              {[
                { href: site.socials.github, Icon: Github, label: "GitHub" },
                { href: site.socials.linkedin, Icon: Linkedin, label: "LinkedIn" },
                { href: site.socials.mail, Icon: Mail, label: "Email" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer noopener"
                  data-cursor="hover"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-[0.8125rem] text-ash transition-all duration-300 hover:border-white/25 hover:text-chalk"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </a>
              ))}
            </div>

            <a
              href={site.resume}
              target="_blank"
              rel="noreferrer noopener"
              download
              className="mt-3 inline-flex text-[0.8125rem] text-iris-soft underline-offset-4 hover:underline"
            >
              Download résumé (PDF)
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-5 border-t border-white/[0.07] pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[0.6875rem] text-slate">
            © {year} {site.name}. Designed &amp; built from scratch in Karachi.
          </p>

          <div className="flex items-center gap-5">
            <p className="hidden font-mono text-[0.6875rem] text-slate sm:block">
              Next.js · TypeScript · WebGL
            </p>
            <Magnetic strength={0.4}>
              <button
                type="button"
                onClick={() => scrollTo(0)}
                data-cursor="hover"
                aria-label="Back to top"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-ash transition-colors hover:border-white/25 hover:text-chalk"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
            </Magnetic>
          </div>
        </div>
      </div>
    </footer>
  );
}
