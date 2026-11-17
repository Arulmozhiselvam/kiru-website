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
const MIN_FULL_MS = 2900; // first visit: let all three poses be seen once

/** Preloader frames: the artist's own poses, prepared as gold-ready greyscale. */
const POSES = ["/images/kiru/loader/pose-1.webp", "/images/kiru/loader/pose-2.webp", "/images/kiru/loader/pose-3.webp"];

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
 * Preloader: three of the artist's own poses, tinted gold, flow into one
 * another like a dancer in motion while the site genuinely loads (hero
 * photograph, fonts, page), with a counter and hairline progress.
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
      };
      render();

      const tasks: Promise<unknown>[] = [
        heroImageReady(),
        document.fonts?.ready ?? Promise.resolve(),
        pageLoaded(),
        new Promise((r) => setTimeout(r, seen || reduced ? 300 : Math.max(MIN_MS, MIN_FULL_MS))),
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
          .to(q("[data-dancer]"), { scale: 1.08, opacity: 0, filter: "blur(6px)", duration: 0.9, ease: "power3.in" }, "+=0.15")
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
        gsap.fromTo(q("[data-dancer]"), { scale: 0.94, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: "expo.out" });
        // the three poses flow into one another, like a dancer moving
        const poses = q("[data-pose]");
        const cycle = gsap.timeline({ repeat: -1 });
        poses.forEach((pose, i) => {
          cycle
            .fromTo(pose, { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1, duration: 0.45, ease: "power2.out" }, i * 0.95)
            .to(pose, { opacity: 0, duration: 0.45, ease: "power2.in" }, i * 0.95 + 0.85);
        });
        // gentle sway
        gsap.fromTo(q("[data-dancer]"), { rotate: -1.6 }, { rotate: 1.6, duration: 1.4, ease: "sine.inOut", yoyo: true, repeat: -1 });
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

  return (
    <div ref={ref} data-intro role="progressbar" aria-label="Loading" aria-busy="true" className="fixed inset-0 z-[90]">
      {/* split curtain */}
      <div data-panel-top className="absolute inset-x-0 top-0 h-1/2 bg-ink" />
      <div data-panel-bottom className="absolute inset-x-0 bottom-0 h-1/2 bg-ink" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div data-glow aria-hidden className="absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(177,139,82,0.2)_0%,rgba(177,139,82,0.05)_45%,transparent_70%)]" />
        <GoldParticles density={70} />

        {/* dancer — three of her poses, tinted gold, cycling like movement */}
        <div data-dancer className="relative h-[284px] w-[184px] md:h-[340px] md:w-[220px]" aria-hidden>
          {POSES.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              data-pose
              src={src}
              alt=""
              decoding="async"
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-contain mix-blend-screen [filter:sepia(1)_saturate(2.6)_hue-rotate(-12deg)_brightness(1.08)_drop-shadow(0_0_22px_rgba(177,139,82,0.35))]"
              style={{ opacity: i === 0 ? 1 : 0 }}
            />
          ))}
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
