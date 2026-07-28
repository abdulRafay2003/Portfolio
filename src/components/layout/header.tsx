"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ease } from "@/lib/motion";
import { Magnetic } from "@/components/interaction/magnetic";
import { Button } from "@/components/ui/button";
import { LiveDot } from "@/components/ui/primitives";
import { useSmoothScroll } from "@/components/providers/smooth-scroll";

export function Header() {
  const { scrollY } = useScroll();
  const [condensed, setCondensed] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const { scrollTo, stop, start } = useSmoothScroll();

  // Condense past the hero; hide on scroll-down, reveal on scroll-up.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setCondensed(y > 40);
    setHidden(y > prev && y > 420 && !open);
  });

  // Highlight the section currently occupying the middle of the viewport.
  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Lock scrolling behind the mobile overlay.
  useEffect(() => {
    if (open) {
      stop();
      document.body.style.overflow = "hidden";
    } else {
      start();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, stop, start]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    // Wait for the overlay to release scroll before animating to the target.
    setTimeout(() => scrollTo(href, -80), open ? 420 : 0);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: ease.out }}
        className="fixed inset-x-0 top-0 z-[90] flex justify-center px-4 pt-4 sm:px-6"
      >
        <div
          className={cn(
            "flex w-full max-w-6xl items-center justify-between gap-4 rounded-full px-3 py-2 transition-all duration-500 ease-swift sm:px-4",
            condensed ? "glass glass-edge shadow-[0_20px_60px_-30px_rgb(0_0_0/0.9)]" : "bg-transparent",
          )}
        >
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              scrollTo(0);
            }}
            className="group flex shrink-0 items-center gap-2.5 rounded-full py-1 pl-1.5 pr-3"
            aria-label={`${site.name} — home`}
          >
            <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-iris to-mint-deep text-[0.8125rem] font-semibold text-white">
              AR
              <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-700 ease-swift group-hover:translate-x-full" />
            </span>
            <span className="hidden text-sm font-medium tracking-tight sm:block">{site.name}</span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Sections">
            {nav.map((item) => {
              const isActive = active === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    go(item.href);
                  }}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-[0.8125rem] transition-colors duration-300",
                    isActive ? "text-chalk" : "text-ash hover:text-chalk",
                  )}
                  aria-current={isActive ? "true" : undefined}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.08]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Magnetic strength={0.22} className="hidden sm:inline-flex">
              <Button
                size="sm"
                variant="accent"
                asChild
                data-cursor="hover"
                className="h-9"
              >
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    go("#contact");
                  }}
                >
                  Let&rsquo;s talk
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </Button>
            </Magnetic>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-chalk transition-colors hover:bg-white/[0.09] lg:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.35, ease: ease.out, delay: 0.15 } }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[85] lg:hidden"
          >
            <motion.div
              className="absolute inset-0 bg-void/92 backdrop-blur-2xl"
              initial={{ clipPath: "circle(0% at 92% 6%)" }}
              animate={{ clipPath: "circle(150% at 92% 6%)" }}
              exit={{ clipPath: "circle(0% at 92% 6%)" }}
              transition={{ duration: 0.62, ease: ease.out }}
            />

            <div className="relative flex h-full flex-col justify-between px-6 pb-10 pt-28">
              <nav className="flex flex-col" aria-label="Sections">
                {nav.map((item, i) => (
                  <div key={item.href} className="overflow-hidden border-b border-white/[0.07]">
                    <motion.a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        go(item.href);
                      }}
                      initial={{ y: "110%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      exit={{ y: "110%", opacity: 0 }}
                      transition={{ duration: 0.55, ease: ease.out, delay: 0.2 + i * 0.055 }}
                      className="flex items-baseline gap-4 py-4 active:opacity-60"
                    >
                      <span className="font-mono text-[0.625rem] text-slate">{item.index}</span>
                      <span className="text-[2rem] font-medium leading-none tracking-tight">
                        {item.label}
                      </span>
                    </motion.a>
                  </div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: ease.out, delay: 0.5 }}
                className="flex flex-col gap-5"
              >
                <div className="flex items-center gap-2.5 text-[0.8125rem] text-ash">
                  <LiveDot />
                  {site.availability}
                </div>
                <a
                  href={site.socials.mail}
                  className="text-lg font-medium tracking-tight text-chalk underline-offset-4 hover:underline"
                >
                  {site.email}
                </a>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild className="flex-1">
                    <a href={site.socials.github} target="_blank" rel="noreferrer noopener">
                      GitHub
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="flex-1">
                    <a href={site.socials.linkedin} target="_blank" rel="noreferrer noopener">
                      LinkedIn
                    </a>
                  </Button>
                  <Button variant="primary" size="sm" asChild className="flex-1">
                    <a href={site.resume} target="_blank" rel="noreferrer noopener">
                      Résumé
                    </a>
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
