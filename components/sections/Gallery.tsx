"use client";

import { useRef, useState } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Media } from "@/components/ui/Media";
import { RevealLines } from "@/components/ui/RevealLines";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Lightbox } from "@/components/ui/Lightbox";
import { frameRatio, media } from "@/content/media";
import { cn } from "@/lib/cn";

/** Asymmetric editorial composition — mobile classes first, then md+. */
const LAYOUT = [
  "col-span-6 md:col-span-5",
  "col-span-4 col-start-3 md:col-span-4 md:col-start-8 md:mt-40",
  "col-span-5 md:col-span-4 md:col-start-2 md:-mt-12",
  "col-span-4 col-start-3 md:col-span-3 md:col-start-8 md:-mt-6",
  "col-span-6 md:col-span-5 md:col-start-1 md:mt-10",
  "col-span-5 col-start-2 md:col-span-4 md:col-start-8 md:mt-32",
];

/** Wide (landscape) photos get a broad frame, alternating sides. */
const WIDE = [
  "col-span-6 md:col-span-7 md:col-start-1 md:mt-12",
  "col-span-6 md:col-span-7 md:col-start-6 md:mt-12",
];

function slot(asset: { width: number; height: number }, i: number, wideIndex: number) {
  return asset.width > asset.height ? WIDE[wideIndex % WIDE.length] : LAYOUT[i % LAYOUT.length];
}

export function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const { t, locale } = useLanguage();
  const [index, setIndex] = useState<number | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.utils.toArray<HTMLElement>("[data-item]").forEach((item, i) => {
          const frame = item.querySelector("[data-frame]");
          const img = item.querySelector("[data-img]");
          const tl = gsap.timeline({ scrollTrigger: { trigger: item, start: "top 90%", toggleActions: "play none none none" } });
          tl.fromTo(frame, { clipPath: i % 2 ? "inset(0% 0% 100% 0%)" : "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut" })
            .fromTo(img, { scale: 1.4 }, { scale: 1, duration: 2, ease: "expo.out" }, 0.1)
            .fromTo(item.querySelector("[data-cap]"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 1 }, 0.8);

          // gentle depth: alternate items drift at different speeds
          gsap.to(item, {
            yPercent: i % 3 === 0 ? -8 : i % 3 === 1 ? -3 : -12,
            ease: "none",
            scrollTrigger: { trigger: item, start: "top bottom", end: "bottom top", scrub: true },
          });
        });

        gsap.fromTo("[data-marquee]", { xPercent: 0 }, {
          xPercent: -35,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  const n = media.gallery.length;
  // running count of wide photos, so wide frames alternate left/right
  const wideBefore = media.gallery.map((_, i) => media.gallery.slice(0, i).filter((a) => a.width > a.height).length);
  const alts = media.gallery.map((a, i) => (a.stock ? t.gallery.alts[i] : `${t.artistAlt} — ${i + 1}`));

  return (
    <section ref={ref} id="gallery" className="relative overflow-hidden bg-charcoal py-28 text-ivory md:py-44">
      {/* oversized drifting word */}
      <p
        data-marquee
        aria-hidden
        className="pointer-events-none absolute left-0 top-16 whitespace-nowrap font-display text-[22vw] font-light italic leading-none text-transparent [-webkit-text-stroke:1px_rgba(238,232,220,0.06)] md:top-24"
      >
        Moments in motion — Moments in motion
      </p>

      <div className="container-edge relative">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index="04" label={t.gallery.label} className="mb-10" />
            <RevealLines key={locale} lines={t.gallery.heading} className="display-lg" lineClassName={(i) => (i === 1 ? "italic text-gold-soft" : undefined)} />
          </div>
          <p className="max-w-xs text-sm text-ivory/45">{t.gallery.note}</p>
        </div>

        <ul className="mt-20 grid grid-cols-6 gap-x-4 gap-y-10 md:mt-28 md:grid-cols-12 md:gap-x-6 md:gap-y-16">
          {media.gallery.map((asset, i) => (
            <li key={asset.src} data-item style={{ aspectRatio: frameRatio(asset, 0.58, 2.4) }} className={cn("relative self-start", slot(asset, i, wideBefore[i]))}>
              <button
                type="button"
                data-cursor={locale === "ta" ? "பார்" : "View"}
                onClick={() => setIndex(i)}
                aria-label={`${t.gallery.open}: ${alts[i]}`}
                className="group absolute inset-0 block h-full w-full text-left"
              >
                <span data-frame className="absolute inset-0 block overflow-hidden bg-ink">
                  <span data-img className="absolute inset-0 block">
                    <span className="absolute inset-0 block transition-transform duration-[1.6s] ease-[var(--ease-cinematic)] group-hover:scale-[1.07] group-focus-visible:scale-[1.07]">
                      <Media asset={asset} alt={alts[i]} sizes="(min-width: 768px) 45vw, 90vw" />
                    </span>
                  </span>
                  <span aria-hidden className="absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/25" />
                </span>
                <span data-cap className="absolute -bottom-7 left-0 flex w-full items-center justify-between text-[0.7rem] tracking-[0.25em] text-ivory/40">
                  <span className="tabular-nums">{String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
                  <span className="h-px w-0 bg-gold transition-all duration-700 group-hover:w-12" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Lightbox
        items={media.gallery}
        alts={alts}
        index={index}
        onChange={setIndex}
        labels={{ close: t.gallery.close, next: t.gallery.next, prev: t.gallery.prev }}
      />
    </section>
  );
}
