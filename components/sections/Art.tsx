"use client";

import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Media } from "@/components/ui/Media";
import { RevealLines } from "@/components/ui/RevealLines";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { frameRatio, media } from "@/content/media";
import { cn } from "@/lib/cn";

/**
 * Horizontal storytelling: on desktop the section pins and the five elements
 * of Bharatanatyam glide past like frames of film. On mobile (and with
 * reduced motion) it becomes an elegant vertical sequence.
 */
export function Art() {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const { t, locale } = useLanguage();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.desktop, () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth;

        const scroll = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.to("[data-progress]", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top top", end: () => `+=${distance()}`, scrub: true },
        });

        // Per-panel motion tied to the horizontal movement.
        gsap.utils.toArray<HTMLElement>("[data-panel]").forEach((panel) => {
          const img = panel.querySelector("[data-img]");
          const copy = panel.querySelectorAll("[data-copy]");
          const num = panel.querySelector("[data-num]");
          gsap.fromTo(img, { xPercent: -12, scale: 1.25 }, {
            xPercent: 12, scale: 1.1, ease: "none",
            scrollTrigger: { trigger: panel, containerAnimation: scroll, start: "left right", end: "right left", scrub: true },
          });
          gsap.fromTo(panel.querySelector("[data-clip]"), { clipPath: "inset(12% 18% 12% 18%)" }, {
            clipPath: "inset(0% 0% 0% 0%)", ease: "none",
            scrollTrigger: { trigger: panel, containerAnimation: scroll, start: "left 95%", end: "left 35%", scrub: true },
          });
          gsap.fromTo(copy, { y: 50, opacity: 0 }, {
            y: 0, opacity: 1, stagger: 0.08, ease: "power2.out",
            scrollTrigger: { trigger: panel, containerAnimation: scroll, start: "left 75%", end: "left 35%", scrub: true },
          });
          gsap.fromTo(num, { xPercent: 40 }, {
            xPercent: -40, ease: "none",
            scrollTrigger: { trigger: panel, containerAnimation: scroll, start: "left right", end: "right left", scrub: true },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [locale], revertOnUpdate: true }
  );

  return (
    <section ref={ref} id="art" className="relative overflow-hidden bg-forest text-ivory" aria-label={t.art.label}>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_20%,rgba(177,139,82,0.14),transparent_55%)]" />

      <div
        ref={track}
        className="relative flex flex-col gap-24 py-28 will-change-transform md:py-40 lg:motion-safe:h-[100svh] lg:motion-safe:w-max lg:motion-safe:flex-row lg:motion-safe:items-center lg:motion-safe:gap-[8vw] lg:motion-safe:py-0 lg:motion-safe:pl-[6vw] lg:motion-safe:pr-[10vw]"
      >
        {/* Intro panel */}
        <div className="container-edge lg:motion-safe:mx-0 lg:motion-safe:w-[38vw] lg:motion-safe:max-w-none lg:motion-safe:shrink-0 lg:motion-safe:px-0">
          <SectionLabel index="02" label={t.art.label} className="mb-10" />
          <RevealLines key={locale} lines={t.art.heading} className="display-lg" lineClassName={(i) => (i === 1 ? "italic text-gold-soft" : undefined)} />
          <p className="mt-10 max-w-md text-[1.05rem] leading-relaxed text-ivory/75">{t.art.intro}</p>
          <p className="eyebrow mt-14 hidden items-center gap-4 text-gold lg:motion-safe:flex">
            {t.art.drag}
            <span aria-hidden className="block h-px w-16 bg-gold/60" />
          </p>
        </div>

        {t.art.panels.map((panel, i) => (
          <article
            key={panel.key}
            data-panel
            className={cn(
              "container-edge relative grid gap-8 md:grid-cols-2 md:items-end lg:motion-safe:mx-0 lg:motion-safe:flex lg:motion-safe:w-auto lg:motion-safe:max-w-none lg:motion-safe:shrink-0 lg:motion-safe:items-end lg:motion-safe:gap-12 lg:motion-safe:px-0",
              i % 2 === 1 && "lg:motion-safe:translate-y-[6vh]",
              i % 2 === 0 && "lg:motion-safe:-translate-y-[4vh]"
            )}
          >
            {/* Desktop horizontal frame */}
            <div data-clip style={{ aspectRatio: frameRatio(media.art[panel.key]) }} className="relative hidden overflow-hidden bg-charcoal lg:motion-safe:block lg:motion-safe:h-[64vh] lg:motion-safe:w-auto">
              <div data-img className="absolute inset-0">
                <Media asset={media.art[panel.key]} alt={`${panel.title} — ${media.art[panel.key].stock ? t.stockAlt : t.artistAlt}`} sizes="40vw" />
              </div>
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
            </div>

            {/* Mobile / reduced-motion frame */}
            <ImageReveal style={{ aspectRatio: frameRatio(media.art[panel.key]) }} className="w-full lg:motion-safe:hidden" from={i % 2 ? "left" : "right"}>
              <Media asset={media.art[panel.key]} alt={`${panel.title} — ${media.art[panel.key].stock ? t.stockAlt : t.artistAlt}`} sizes="(min-width: 768px) 50vw, 100vw" />
            </ImageReveal>

            <div className="relative pb-2 lg:motion-safe:w-[22vw] lg:motion-safe:min-w-[300px]">
              <span
                data-num
                aria-hidden
                className="pointer-events-none absolute -top-16 right-0 font-display text-[7rem] font-light leading-none text-transparent [-webkit-text-stroke:1px_rgba(177,139,82,0.45)] md:-top-28 md:text-[10rem]"
              >
                0{i + 1}
              </span>
              <p data-copy className="eyebrow relative text-gold">{panel.term}</p>
              <h3 data-copy className="display-md relative mt-4 text-ivory">{panel.title}</h3>
              <span data-copy aria-hidden className="relative mt-6 block h-px w-16 bg-gold/60" />
              <p data-copy className="relative mt-6 max-w-sm leading-relaxed text-ivory/75">{panel.text}</p>
            </div>
          </article>
        ))}
      </div>

      {/* Progress rail (desktop) */}
      <div aria-hidden className="absolute bottom-10 left-[6vw] right-[6vw] hidden h-px bg-ivory/10 lg:motion-safe:block">
        <span data-progress className="block h-full origin-left scale-x-0 bg-gold" />
      </div>
    </section>
  );
}
