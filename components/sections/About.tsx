"use client";

import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { Media } from "@/components/ui/Media";
import { RevealLines } from "@/components/ui/RevealLines";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { DrawLine } from "@/components/ui/DrawLine";
import { media } from "@/content/media";

export function About() {
  const ref = useRef<HTMLElement>(null);
  const { t, locale } = useLanguage();

  // Subtle background transition: ink dissolves into warm ivory as the
  // section arrives, then back again as it leaves.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          ref.current,
          { backgroundColor: "#10130f" },
          {
            backgroundColor: "#eee8dc",
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top 85%", end: "top 25%", scrub: true },
          }
        );
        gsap.fromTo(
          "[data-frame]",
          { opacity: 0, x: -24, y: 24 },
          { opacity: 1, x: 0, y: 0, duration: 1.6, ease: "expo.out", delay: 0.6, scrollTrigger: { trigger: ref.current, start: "top 60%", toggleActions: "play none none none" } }
        );
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="about" className="relative overflow-hidden bg-ivory py-28 text-charcoal md:py-40">
      <div className="container-edge grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        {/* Portrait */}
        <div className="relative lg:col-span-5 lg:col-start-1">
          <span data-frame aria-hidden className="absolute -left-3 -top-3 h-full w-full border border-gold/60 md:-left-5 md:-top-5" />
          <ImageReveal from="bottom" className="aspect-[4/5] w-full" parallax={10}>
            <Media asset={media.portrait} alt={media.portrait.stock ? t.stockAlt : t.artistAlt} sizes="(min-width: 1024px) 40vw, 100vw" />
          </ImageReveal>
          <p className="eyebrow mt-5 flex items-center justify-between text-charcoal/50">
            <span>{media.portrait.stock ? t.stockNote : t.name.full}</span>
            <span>{t.about.facts[2].value}</span>
          </p>
        </div>

        {/* Text */}
        <div className="lg:col-span-6 lg:col-start-7">
          <SectionLabel index="01" label={t.about.label} className="mb-10 [&_.eyebrow]:text-terracotta" />
          <RevealLines
            key={locale}
            lines={t.about.heading}
            className="display-lg text-forest"
            lineClassName={(i) => (i === t.about.heading.length - 1 ? "italic text-terracotta" : undefined)}
          />

          <Reveal className="mt-12 max-w-xl space-y-6 text-[1.05rem] leading-relaxed text-charcoal/80" deps={[locale]}>
            {t.about.paragraphs.map((p, i) => (
              <p key={i} data-reveal className={p.startsWith("[") ? "border-l border-gold/60 pl-5 italic text-charcoal/55" : undefined}>
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal as="div" className="mt-14 max-w-xl" stagger={0.12} deps={[locale]}>
            <dl>
              {t.about.facts.map((f) => (
                <div key={f.label} data-reveal>
                  <DrawLine className="!bg-charcoal/15" />
                  <div className="flex items-baseline justify-between py-4">
                    <dt className="eyebrow text-charcoal/50">{f.label}</dt>
                    <dd className="font-display text-2xl text-forest">{f.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
