"use client";

import { useEffect, useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { useIntro } from "@/components/providers/IntroProvider";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { SplitChars } from "@/components/ui/SplitChars";
import { Media } from "@/components/ui/Media";
import { media } from "@/content/media";
import { site } from "@/content/site";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const { introDone } = useIntro();
  const { t, locale } = useLanguage();
  const { scrollTo } = useSmoothScroll();
  const portrait = media.hero.height > media.hero.width;

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        // Entrance — built paused, played when the intro curtain lifts.
        tl.current = gsap
          .timeline({ paused: true })
          .fromTo(q("[data-bg]"), { scale: 1.3 }, { scale: 1.08, duration: 3.2, ease: "expo.out" }, 0)
          .fromTo(q("[data-veil]"), { opacity: 1 }, { opacity: 0, duration: 2, ease: "power2.out" }, 0)
          .fromTo(q("[data-tag]"), { yPercent: 110 }, { yPercent: 0, duration: 1.4, ease: "expo.out" }, 1.3)
          .fromTo(q("[data-rule]"), { scaleX: 0 }, { scaleX: 1, duration: 1.6, ease: "expo.inOut" }, 1.1)
          .fromTo(q("[data-fade]"), { opacity: 0 }, { opacity: 1, duration: 1.4, stagger: 0.15 }, 1.6);

        // Slow, continuous cinematic drift once settled.
        gsap.to(q("[data-drift]"), { scale: 1.06, xPercent: -1.5, duration: 18, ease: "sine.inOut", yoyo: true, repeat: -1 });

        // Scroll-out: image sinks (parallax), copy lifts and dissolves.
        const st = { trigger: ref.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to(q("[data-parallax]"), { yPercent: 22, ease: "none", scrollTrigger: st });
        gsap.to(q("[data-copy]"), { yPercent: -30, opacity: 0, ease: "none", scrollTrigger: { ...st, end: "70% top" } });
        gsap.to(q("[data-shade]"), { opacity: 0.85, ease: "none", scrollTrigger: st });
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  // The name has its own entrance so it can replay when the language changes
  // (English ↔ Tamil). Hidden until the intro curtain lifts.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const chars = ref.current!.querySelectorAll("[data-char]");
        if (!introDone) {
          gsap.set(chars, { yPercent: 115 });
          return;
        }
        gsap.fromTo(chars, { yPercent: 115 }, { yPercent: 0, duration: 1.5, ease: "expo.out", stagger: 0.035, delay: 0.6 });
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [locale, introDone], revertOnUpdate: true }
  );

  useEffect(() => {
    if (introDone) tl.current?.play();
  }, [introDone]);

  return (
    <section ref={ref} id="home" aria-label={t.name.full} className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-ink">
      {/* Background: image (or optional video) with parallax + drift */}
      <div data-parallax className="absolute inset-0 will-change-transform">
        <div data-bg className="absolute inset-0 will-change-transform">
          <div data-drift className="absolute inset-0">
            {media.heroVideo ? (
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src={media.heroVideo}
                poster={media.hero.src}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden
              />
            ) : portrait ? (
              <>
                {/* The portrait fills the screen on mobile, and the full-height right
                    half on desktop — bleeding to the top, bottom and right edges and
                    dissolving into darkness on the left, behind the name. */}
                <div className="absolute inset-0 md:left-auto md:w-[58vw] md:[mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.55)_16%,black_34%)]">
                  <Media asset={media.hero} alt={site.name} priority quality={95} sizes="(min-width: 768px) 58vw, 100vw" />
                </div>
              </>
            ) : (
              <Media asset={media.hero} alt="" priority sizes="100vw" />
            )}
          </div>
        </div>
      </div>

      {/* Readability overlays */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/70 to-transparent" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/20 to-transparent md:via-transparent" />
      <div data-shade aria-hidden className="absolute inset-0 bg-ink opacity-0" />
      <div data-veil aria-hidden className="absolute inset-0 bg-ink opacity-0" />

      {/* Copy */}
      <div data-copy className="container-edge relative flex h-full flex-col justify-end pb-24 pt-28 md:pb-28 md:pt-32">
        <h1 className="display-xl text-ivory [text-shadow:0_2px_24px_rgba(16,19,15,0.55),0_1px_3px_rgba(16,19,15,0.4)]">
          <SplitChars key={`f-${locale}`} text={t.name.first} className="block" />
          <span className="flex flex-wrap items-baseline gap-x-[0.25em]">
            <SplitChars key={`l-${locale}`} text={t.name.last} className="block italic text-gold-soft" />
          </span>
        </h1>

        <div className="mt-8 flex flex-col gap-8 md:mt-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <span data-rule aria-hidden className="mb-5 block h-px w-24 origin-left bg-gold" />
            <p className="line-mask font-display text-[clamp(1.35rem,2.4vw,2.1rem)] font-light italic leading-snug text-ivory/90">
              <span data-tag className="block">
                {t.hero.tagline}
              </span>
            </p>
          </div>

          <button
            data-fade
            type="button"
            onClick={() => scrollTo("#about")}
            className="group hidden items-center gap-4 self-start text-ivory/70 transition-colors hover:text-gold md:flex md:self-end"
            aria-label={t.hero.scroll}
          >
            <span className="eyebrow">{t.hero.scroll}</span>
            <span className="relative block h-14 w-px overflow-hidden bg-ivory/15">
              <span className="animate-scroll-line absolute inset-0 bg-gold" />
            </span>
          </button>
        </div>
      </div>

      {/* Vertical side caption (desktop) */}
      <p data-fade aria-hidden className={`eyebrow absolute right-6 top-1/2 hidden -translate-y-1/2 rotate-90 origin-center text-ivory/40 ${portrait ? "" : "xl:block"}`}>
        {site.location} — Bharatanatyam
      </p>

      {media.hero.stock && (
        <p data-fade className="absolute right-5 top-24 text-[0.62rem] tracking-[0.2em] uppercase text-ivory/35 md:bottom-8 md:right-10 md:top-auto">
          {t.stockNote}
        </p>
      )}

      {/* Mobile scroll hint */}
      <span data-fade aria-hidden className="absolute bottom-6 left-1/2 block h-10 w-px -translate-x-1/2 overflow-hidden bg-ivory/15 md:hidden">
        <span className="animate-scroll-line absolute inset-0 bg-gold" />
      </span>
    </section>
  );
}
