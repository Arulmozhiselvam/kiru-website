"use client";

import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Media } from "@/components/ui/Media";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitChars } from "@/components/ui/SplitChars";
import { media } from "@/content/media";

/** Coming-soon preview: the stage image glows through the year itself. */
export function Arangetram() {
  const ref = useRef<HTMLElement>(null);
  const { t, locale } = useLanguage();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const q = gsap.utils.selector(ref);
        gsap.fromTo(q("[data-bg]"), { scale: 1.35, yPercent: -8 }, {
          scale: 1, yPercent: 8, ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
        });
        gsap.fromTo(q("[data-year]"), { backgroundPosition: "50% 0%", letterSpacing: "0.12em" }, {
          backgroundPosition: "50% 100%", letterSpacing: "-0.02em", ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
        });

        const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 55%", once: true } });
        tl.fromTo(q("[data-char]"), { yPercent: 115 }, { yPercent: 0, duration: 1.4, ease: "expo.out", stagger: 0.05 })
          .fromTo(q("[data-year]"), { clipPath: "inset(0% 50% 0% 50%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.8, ease: "expo.inOut" }, 0.2)
          .fromTo(q("[data-fade]"), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.12, ease: "expo.out" }, 0.9);
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [locale], revertOnUpdate: true }
  );

  return (
    <section ref={ref} id="arangetram" className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink py-32 text-ivory">
      <div data-bg className="absolute inset-0 will-change-transform">
        <Media asset={media.arangetram} alt="" sizes="100vw" />
      </div>
      <div aria-hidden className="absolute inset-0 bg-ink/70" />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,rgba(16,19,15,0.9)_75%)]" />

      <div className="container-edge relative flex flex-col items-center text-center">
        <SectionLabel index="05" label={t.arangetram.label} className="mb-12" />

        <h2 className="display-lg text-ivory">
          <SplitChars text={t.arangetram.title} />
        </h2>

        <p
          data-year
          aria-label={t.arangetram.year}
          className="mt-2 bg-cover bg-clip-text font-display text-[clamp(7rem,30vw,26rem)] font-light leading-[0.85] text-transparent [-webkit-text-stroke:1px_rgba(177,139,82,0.55)]"
          style={{ backgroundImage: `linear-gradient(180deg, rgba(222,196,150,0.95) 10%, rgba(177,139,82,0.85) 55%, rgba(141,62,45,0.9)), url(${media.arangetram.src})`, backgroundBlendMode: "screen" }}
        >
          {t.arangetram.year}
        </p>

        <p data-fade className="mt-10 max-w-xl text-[1.05rem] leading-relaxed text-ivory/75">{t.arangetram.text}</p>

        <div data-fade className="mt-12 flex items-center gap-4">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gold" />
          </span>
          <span className="eyebrow text-gold">{t.arangetram.soon}</span>
        </div>
        <p data-fade className="eyebrow mt-5 text-ivory/45">{t.arangetram.details}</p>
      </div>
    </section>
  );
}
