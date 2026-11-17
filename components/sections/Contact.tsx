"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { RevealLines } from "@/components/ui/RevealLines";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { DrawLine } from "@/components/ui/DrawLine";
import { site } from "@/content/site";
import { graphemes } from "@/lib/segment";

/** Email link that leans toward the pointer (desktop micro-interaction). */
function MagneticEmail() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 18 });
  const sy = useSpring(y, { stiffness: 180, damping: 18 });

  return (
    <motion.a
      href={`mailto:${site.email}`}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.12);
        y.set((e.clientY - r.top - r.height / 2) * 0.25);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
      className="group inline-flex items-center gap-4 font-display text-[clamp(1.2rem,5.4vw,4.75rem)] font-light leading-none text-ivory transition-colors duration-500 hover:text-gold-soft"
    >
      <span className="relative whitespace-nowrap">
        {site.email}
        <span className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-700 ease-[var(--ease-cinematic)] group-hover:scale-x-100" />
      </span>
      <ArrowUpRight className="h-[0.6em] w-[0.6em] shrink-0 text-gold transition-transform duration-700 group-hover:-translate-y-1 group-hover:translate-x-1" strokeWidth={1} />
    </motion.a>
  );
}

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { t, locale } = useLanguage();
  const { scrollTo } = useSmoothScroll();

  // Closing animation: her name rises letter by letter and breathes apart.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const letters = gsap.utils.toArray<HTMLElement>("[data-closing] span");
        gsap.fromTo(
          letters,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            stagger: 0.08,
            ease: "none",
            scrollTrigger: { trigger: "[data-closing]", start: "top bottom", end: "bottom bottom", scrub: 0.8 },
          }
        );
        gsap.fromTo("[data-closing]", { columnGap: "0em" }, {
          columnGap: "0.035em",
          ease: "none",
          scrollTrigger: { trigger: "[data-closing]", start: "top bottom", end: "bottom bottom", scrub: 0.8 },
        });
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [locale], revertOnUpdate: true }
  );

  return (
    <footer ref={ref} id="contact" className="relative overflow-hidden bg-forest text-ivory">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_0%,rgba(177,139,82,0.16),transparent_55%)]" />

      <div className="container-edge relative pt-28 md:pt-44">
        <SectionLabel index="06" label={t.contact.label} className="mb-10" />
        <RevealLines key={locale} as="h2" lines={t.contact.heading} className="display-lg max-w-5xl" lineClassName={(i) => (i === 1 ? "italic text-gold-soft" : undefined)} />

        <Reveal className="mt-16 md:mt-24" deps={[locale]}>
          <p data-reveal className="eyebrow mb-6 text-ivory/50">{t.contact.emailLabel}</p>
          <div data-reveal>
            <MagneticEmail />
          </div>
          <p data-reveal className="mt-8 max-w-md text-ivory/60">{t.contact.text}</p>
        </Reveal>

        <DrawLine className="mt-20 md:mt-28" />

        <Reveal className="grid grid-cols-2 gap-x-6 gap-y-12 pt-14 pb-6 md:pt-16 lg:grid-cols-4" stagger={0.08} deps={[locale]}>
          <div data-reveal>
            <p className="eyebrow mb-5 text-ivory/45">{t.contact.based}</p>
            <p className="font-display text-3xl leading-none">{t.contact.location}</p>
          </div>
          <div data-reveal>
            <p className="eyebrow mb-5 text-ivory/45">{t.contact.follow}</p>
            <ul className="flex gap-3">
              {site.socials.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/20 text-ivory/80 transition-all duration-500 hover:-translate-y-0.5 hover:border-gold hover:bg-gold hover:text-ink"
                  >
                    <SocialIcon id={s.id} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <nav data-reveal aria-label="Footer">
            <p className="eyebrow mb-5 text-ivory/45">{t.nav.menu}</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              {(["about", "art", "journey", "gallery"] as const).map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={(e) => { e.preventDefault(); scrollTo(`#${id}`); }}
                    className="text-ivory/70 transition-colors duration-500 hover:text-gold"
                  >
                    {t.nav[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div data-reveal>
            <p className="eyebrow mb-5 text-ivory/45">{t.nav.language}</p>
            <LanguageSwitch id="footer-lang" />
          </div>
        </Reveal>
      </div>

      {/* Closing wordmark — letters rise and breathe apart as the page ends */}
      <div className="relative overflow-hidden pt-6 md:pt-10">
        <p
          data-closing
          aria-hidden
          className="flex select-none justify-center whitespace-nowrap font-display text-[17vw] font-light leading-[1.15] md:text-[15.5vw]"
        >
          {graphemes(t.name.first).map((c, i) => (
            <span
              key={i}
              className="inline-block bg-gradient-to-b from-gold/45 via-gold/20 to-gold/0 bg-clip-text pb-[0.14em] text-transparent"
            >
              {c}
            </span>
          ))}
        </p>
      </div>

      <div className="container-edge relative grid gap-4 border-t border-ivory/10 py-7 text-xs text-ivory/45 md:grid-cols-[1fr_auto] md:items-center md:gap-8">
        <div className="space-y-1.5">
          <p>© {new Date().getFullYear()} {t.name.full}. {t.contact.rights}</p>
        </div>
        <button
          type="button"
          onClick={() => scrollTo(0)}
          className="group inline-flex items-center gap-3 justify-self-start text-ivory/70 transition-colors hover:text-gold md:justify-self-end"
        >
          <span className="eyebrow">{t.contact.top}</span>
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/20 transition-all duration-500 group-hover:border-gold">
            <ArrowUp size={16} strokeWidth={1.3} className="transition-transform duration-500 group-hover:-translate-y-0.5" />
          </span>
        </button>
      </div>
    </footer>
  );
}
