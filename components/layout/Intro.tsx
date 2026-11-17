"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useIntro } from "@/components/providers/IntroProvider";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { GoldParticles } from "@/components/ui/GoldParticles";
import { site } from "@/content/site";

const SEEN_KEY = "kiru-intro-seen";

/**
 * Opening sequence (~3.5s): gold dust, the artist's name drawn letter by letter, a hairline
 * rule, the art form — then the curtain lifts into the hero. Plays once per
 * session; skippable; near-instant with reduced motion.
 */
export function Intro() {
  const ref = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const { finishIntro } = useIntro();
  const { lock } = useSmoothScroll();
  const { t } = useLanguage();
  const [gone, setGone] = useState(false);

  useEffect(() => {
    lock(true);
    return () => lock(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useGSAP(
    () => {
      const done = () => {
        try { sessionStorage.setItem(SEEN_KEY, "1"); } catch {}
        lock(false);
        setGone(true);
      };

      let seen = false;
      try { seen = sessionStorage.getItem(SEEN_KEY) === "1"; } catch {}
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const q = gsap.utils.selector(ref);
      const timeline = gsap.timeline({ onComplete: done });
      tl.current = timeline;

      if (reduced || seen) {
        timeline
          .set(q("[data-char]"), { yPercent: 0, opacity: 1 })
          .add(finishIntro, seen ? 0 : 0.4)
          .to(ref.current, { autoAlpha: 0, duration: seen ? 0.5 : 0.6, ease: "power2.out" }, seen ? 0 : 0.4);
        return;
      }

      timeline
        .set(q("[data-char]"), { yPercent: 120, opacity: 0 })
        .fromTo(q("[data-glow]"), { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 2.4, ease: "power2.out" }, 0)
        .to(q("[data-char]"), { yPercent: 0, opacity: 1, duration: 1.2, ease: "expo.out", stagger: 0.045 }, 0.35)
        .fromTo(q("[data-rule]"), { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "expo.inOut" }, 0.9)
        .fromTo(q("[data-sub]"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, 1.3)
        .fromTo(q("[data-brand]"), { letterSpacing: "0em" }, { letterSpacing: "0.04em", duration: 2.4, ease: "power2.inOut" }, 0.4)
        // exit
        .to(q("[data-content]"), { opacity: 0, y: -30, duration: 0.8, ease: "power3.in" }, 2.8)
        .add(finishIntro, 3.15)
        .to(ref.current, { clipPath: "inset(0% 0% 100% 0%)", duration: 1.2, ease: "expo.inOut" }, 3.1);
    },
    { scope: ref }
  );

  const skip = () => {
    const timeline = tl.current;
    if (!timeline) return;
    timeline.timeScale(4);
  };

  if (gone) return null;

  return (
    <div
      ref={ref}
      data-intro
      role="dialog"
      aria-label={site.name}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-ink"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      <div data-glow aria-hidden className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(177,139,82,0.22)_0%,rgba(177,139,82,0.05)_45%,transparent_70%)]" />
      <GoldParticles density={80} />

      <div data-content className="relative flex flex-col items-center text-center">
        <p data-brand className="flex flex-wrap justify-center gap-x-[0.28em] px-6 font-display text-[clamp(2.75rem,8.5vw,7.5rem)] font-light leading-[1.05] text-ivory" aria-label={site.name}>
          {site.name.split(" ").map((word, w) => (
            <span key={w} aria-hidden className={`inline-flex ${w === 1 ? "italic text-gold-soft" : ""}`}>
              {word.split("").map((c, i) => (
                <span key={i} className="inline-block overflow-clip pb-[0.18em] -mb-[0.18em]">
                  <span data-char className="inline-block" style={{ opacity: 0 }}>{c}</span>
                </span>
              ))}
            </span>
          ))}
        </p>
        <span data-rule aria-hidden className="mt-7 block h-px w-40 origin-center bg-gold/70 md:w-64" />
        <p data-sub lang="ta" className="mt-6 font-[family-name:var(--font-tamil)] text-lg font-light text-ivory/80 md:text-xl">கிருத்திகா ரமேஷ்</p>
        <p data-sub className="eyebrow mt-3 text-gold">Bharatanatyam</p>
      </div>

      <button
        type="button"
        onClick={skip}
        className="eyebrow absolute bottom-8 right-6 text-ivory/60 transition-colors hover:text-gold md:right-10"
      >
        {t.nav.skip}
      </button>
    </div>
  );
}
