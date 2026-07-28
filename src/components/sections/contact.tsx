"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Copy, Check, Download, Linkedin, Mail, MessageCircle } from "lucide-react";

import { site } from "@/lib/site";
import { ease, inView } from "@/lib/motion";
import { timeInOffset } from "@/lib/utils";
import { Aurora } from "@/components/visuals/aurora";
import { ParticleField } from "@/components/visuals/particles";
import { Magnetic } from "@/components/interaction/magnetic";
import { SplitText } from "@/components/interaction/text-reveal";
import { LiveDot } from "@/components/ui/primitives";

const CHANNELS = [
  {
    label: "Email",
    value: site.email,
    href: site.socials.mail,
    Icon: Mail,
    note: "Best for role enquiries",
  },
  {
    label: "WhatsApp",
    value: site.phone,
    href: site.socials.whatsapp,
    Icon: MessageCircle,
    note: "Fastest response",
  },
  {
    label: "LinkedIn",
    value: "/in/abdul-rafay",
    href: site.socials.linkedin,
    Icon: Linkedin,
    note: "Full career history",
  },
  {
    label: "Résumé",
    value: "PDF · 1 page",
    href: site.resume,
    Icon: Download,
    note: "Everything, condensed",
  },
];

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [localTime, setLocalTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setLocalTime(timeInOffset(site.utcOffset));
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked by permissions; the mailto link still works.
      setCopied(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden border-t border-white/[0.06]">
      <div className="absolute inset-0 -z-10">
        <Aurora className="opacity-40" intensity={0.85} />
        <ParticleField density={0.7} linked={false} />
        <div className="absolute inset-0 bg-gradient-to-b from-void via-transparent to-void" />
      </div>

      <div className="container py-section">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 0.5, ease: ease.out }}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full glass px-4 py-2"
          >
            <LiveDot />
            <span className="text-[0.8125rem] text-chalk/90">{site.availability}</span>
          </motion.div>

          <h2 className="mb-7 text-display-md font-semibold text-balance">
            <SplitText by="word" className="text-chalk">
              Let&rsquo;s build something
            </SplitText>
            <span className="font-display italic text-gradient">worth keeping.</span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 0.6, ease: ease.out, delay: 0.15 }}
            className="mx-auto mb-11 max-w-xl text-base leading-relaxed text-ash text-pretty"
          >
            Hiring for a senior mobile role, rescuing a React Native codebase, or starting something
            from zero — tell me what you&rsquo;re working on. I reply to everything within a day.
          </motion.p>

          {/* The email itself is the primary call to action. */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={inView}
            transition={{ duration: 0.7, ease: ease.out, delay: 0.22 }}
            className="mb-6 flex flex-col items-center gap-4"
          >
            <Magnetic strength={0.22}>
              <a
                href={site.socials.mail}
                data-cursor-label="Email"
                className="group inline-flex items-baseline gap-2 text-[clamp(1.375rem,4.5vw,2.75rem)] font-medium tracking-tight text-chalk"
              >
                <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-600 ease-swift group-hover:bg-[length:100%_1px]">
                  {site.email}
                </span>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-slate transition-all duration-400 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-iris-soft sm:h-7 sm:w-7" />
              </a>
            </Magnetic>

            <button
              type="button"
              onClick={copyEmail}
              data-cursor="hover"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ash transition-colors hover:border-white/25 hover:text-chalk"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-mint" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  Copy address
                </>
              )}
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={inView}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-14 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-slate"
          >
            {site.location}
            <span className="mx-2.5">·</span>
            {localTime ?? "--:--"} {site.timezone}
            <span className="mx-2.5">·</span>
            Remote-first
          </motion.p>
        </div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={inView}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {CHANNELS.map(({ label, value, href, Icon, note }) => (
            <motion.li
              key={label}
              variants={{
                hidden: { opacity: 0, y: 22 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: ease.out } },
              }}
            >
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer noopener"
                data-cursor="hover"
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl glass p-5 transition-all duration-500 ease-swift hover:-translate-y-1 hover:border-white/25"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(110%_70%_at_50%_0%,rgb(124_107_255/0.16),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <span className="relative mb-5 flex items-center justify-between">
                  <Icon className="h-4 w-4 text-iris-soft" />
                  <ArrowUpRight className="h-3.5 w-3.5 text-slate transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-chalk" />
                </span>
                <span className="relative block text-[0.9375rem] font-medium tracking-tight">
                  {label}
                </span>
                <span className="relative mt-1 block truncate font-mono text-[0.75rem] text-ash">
                  {value}
                </span>
                <span className="relative mt-3 block text-[0.75rem] text-slate">{note}</span>
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
