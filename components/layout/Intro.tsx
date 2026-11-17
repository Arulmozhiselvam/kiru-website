"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useIntro } from "@/components/providers/IntroProvider";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { GoldParticles } from "@/components/ui/GoldParticles";

const SEEN_KEY = "kiru-intro-seen";
const MIN_MS = 1600; // the loader never flashes by faster than this
const MAX_MS = 7000; // ...and never blocks the page longer than this

/** Resolves when the hero photograph has actually loaded. */
function heroImageReady(): Promise<void> {
  return new Promise((resolve) => {
    const img = document.querySelector<HTMLImageElement>("#home img");
    if (!img || img.complete) return resolve();
    img.addEventListener("load", () => resolve(), { once: true });
    img.addEventListener("error", () => resolve(), { once: true });
  });
}

const pageLoaded = () =>
  new Promise<void>((resolve) => {
    if (document.readyState === "complete") return resolve();
    window.addEventListener("load", () => resolve(), { once: true });
  });

/**
 * Preloader: a gold lotus draws itself while the site genuinely loads
 * (hero photograph, fonts, page), with a counter and hairline progress.
 * When everything is ready the curtain splits open onto the hero.
 * No text — just light, line and number.
 */
export function Intro() {
  const ref = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const exitRef = useRef<gsap.core.Timeline | null>(null);
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
      const q = gsap.utils.selector(ref);
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let seen = false;
      try { seen = sessionStorage.getItem(SEEN_KEY) === "1"; } catch {}

      const done = () => {
        try { sessionStorage.setItem(SEEN_KEY, "1"); } catch {}
        lock(false);
        setGone(true);
      };

      // --- progress model ------------------------------------------------
      const progress = { v: 0 };
      const render = () => {
        const p = progress.v;
        if (countRef.current) countRef.current.textContent = String(Math.round(p)).padStart(3, "0");
        gsap.set(q("[data-bar]"), { scaleX: p / 100 });
        gsap.set(q("[data-petal]"), { strokeDashoffset: 1 - p / 100 });
      };
      render();

      const tasks: Promise<unknown>[] = [
        heroImageReady(),
        document.fonts?.ready ?? Promise.resolve(),
        pageLoaded(),
        new Promise((r) => setTimeout(r, seen || reduced ? 300 : MIN_MS)),
      ];
      let finished = 0;
      let exited = false;

      const exit = () => {
        if (exited) return;
        exited = true;
        gsap.killTweensOf(progress);
        const tl = gsap.timeline({ onComplete: done });
        exitRef.current = tl;
        if (reduced) {
          tl.add(finishIntro).to(ref.current, { autoAlpha: 0, duration: 0.4 });
          return;
        }
        tl.to(progress, { v: 100, duration: 0.35, ease: "power2.out", onUpdate: render })
          .to(q("[data-lotus]"), { scale: 1.12, rotate: 30, opacity: 0, duration: 0.9, ease: "power3.in" }, "+=0.15")
          .to(q("[data-count]"), { yPercent: -110, duration: 0.7, ease: "power3.in" }, "<")
          .to(q("[data-bar-wrap], [data-skip]"), { opacity: 0, duration: 0.4 }, "<")
          .to(q("[data-glow], canvas"), { opacity: 0, duration: 0.6 }, "<")
          .add(finishIntro, "-=0.2")
          .to(q("[data-panel-top]"), { yPercent: -100, duration: 1.15, ease: "expo.inOut" }, "-=0.25")
          .to(q("[data-panel-bottom]"), { yPercent: 100, duration: 1.15, ease: "expo.inOut" }, "<");
      };

      tasks.forEach((task) =>
        task.then(() => {
          if (exited) return;
          finished += 1;
          const target = (finished / tasks.length) * 100;
          gsap.to(progress, {
            v: target,
            duration: 0.9,
            ease: "power2.out",
            overwrite: true,
            onUpdate: render,
            onComplete: () => {
              if (finished === tasks.length) exit();
            },
          });
        })
      );
      const safety = setTimeout(exit, MAX_MS);

      // gentle idle motion while loading
      if (!reduced) {
        gsap.fromTo(q("[data-lotus]"), { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2, ease: "expo.out" });
        gsap.to(q("[data-lotus-spin]"), { rotate: 360, duration: 40, ease: "none", repeat: -1, transformOrigin: "50% 50%" });
        gsap.fromTo(q("[data-glow]"), { opacity: 0.5 }, { opacity: 1, duration: 2.4, ease: "sine.inOut", yoyo: true, repeat: -1 });
      }

      return () => clearTimeout(safety);
    },
    { scope: ref }
  );

  const skip = () => {
    const tl = exitRef.current;
    if (tl) tl.timeScale(4);
    else {
      finishIntro();
      lock(false);
      setGone(true);
    }
  };

  if (gone) return null;

  // 8-petal lotus; each petal is a normalised path (pathLength=1) so it can
  // be "drawn" by moving its dash offset from 1 → 0 with the progress.
  const petals = Array.from({ length: 8 }, (_, i) => i * 45);

  return (
    <div ref={ref} data-intro role="progressbar" aria-label="Loading" aria-busy="true" className="fixed inset-0 z-[90]">
      {/* split curtain */}
      <div data-panel-top className="absolute inset-x-0 top-0 h-1/2 bg-ink" />
      <div data-panel-bottom className="absolute inset-x-0 bottom-0 h-1/2 bg-ink" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div data-glow aria-hidden className="absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(177,139,82,0.2)_0%,rgba(177,139,82,0.05)_45%,transparent_70%)]" />
        <GoldParticles density={70} />

        {/* lotus ornament — draws itself with the progress */}
        <div data-lotus className="relative h-[34vmin] max-h-64 w-[34vmin] max-w-64">
          <svg data-lotus-spin viewBox="-50 -50 100 100" className="h-full w-full overflow-visible text-gold" aria-hidden>
            <circle r="46" fill="none" stroke="currentColor" strokeWidth="0.25" opacity="0.35" />
            <circle r="41" fill="none" stroke="currentColor" strokeWidth="0.2" opacity="0.3" strokeDasharray="0.6 2.4" />
            {petals.map((deg) => (
              <path
                key={deg}
                data-petal
                pathLength={1}
                d="M0 -6 C 9 -14, 9 -30, 0 -40 C -9 -30, -9 -14, 0 -6 Z"
                transform={`rotate(${deg})`}
                fill="none"
                stroke="currentColor"
                strokeWidth="0.6"
                strokeLinejoin="round"
                strokeDasharray="1 1"
                strokeDashoffset="1"
              />
            ))}
            {petals.map((deg) => (
              <path
                key={`i${deg}`}
                data-petal
                pathLength={1}
                d="M0 -6 C 5 -11, 5 -20, 0 -26 C -5 -20, -5 -11, 0 -6 Z"
                transform={`rotate(${deg + 22.5})`}
                fill="none"
                stroke="currentColor"
                strokeWidth="0.45"
                opacity="0.7"
                strokeDasharray="1 1"
                strokeDashoffset="1"
              />
            ))}
            <circle r="3.2" fill="currentColor" opacity="0.9" />
          </svg>
        </div>
      </div>

      {/* counter + hairline */}
      <div className="absolute inset-x-0 bottom-0 px-6 pb-8 md:px-10 md:pb-10">
        <div className="flex items-end justify-between">
          <span className="block overflow-clip">
            <span data-count className="block font-display text-[clamp(3.5rem,9vw,7rem)] font-light leading-none tabular-nums text-ivory/90">
              <span ref={countRef}>000</span>
            </span>
          </span>
          <button data-skip type="button" onClick={skip} className="eyebrow mb-3 text-ivory/50 transition-colors hover:text-gold">
            {t.nav.skip}
          </button>
        </div>
        <div data-bar-wrap className="mt-5 h-px w-full bg-ivory/10">
          <div data-bar className="h-full origin-left bg-gold" style={{ transform: "scaleX(0)" }} />
        </div>
      </div>
    </div>
  );
}
