"use client";

import { useRef, useState } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Media } from "@/components/ui/Media";
import { RevealLines } from "@/components/ui/RevealLines";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Lightbox } from "@/components/ui/Lightbox";
import { media } from "@/content/media";

type Sized = { width: number; height: number };

/** Places each photo (keeping its index) into the currently shortest column. */
function balance<T extends Sized>(items: readonly T[], cols: number) {
  const columns: { i: number; item: T }[][] = Array.from({ length: cols }, () => []);
  const heights = new Array(cols).fill(0);
  items.forEach((item, i) => {
    const c = heights.indexOf(Math.min(...heights));
    columns[c].push({ i, item });
    heights[c] += item.height / item.width + 0.04; // + gap, in column-width units
  });
  return columns;
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
          const tl = gsap.timeline({ scrollTrigger: { trigger: item, start: "top 92%", toggleActions: "play none none none" } });
          tl.fromTo(frame, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut", delay: (i % 3) * 0.08 })
            .fromTo(img, { scale: 1.3 }, { scale: 1, duration: 1.8, ease: "expo.out" }, "<0.1");
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

        {/* Masonry: every photo at its natural shape, balanced so the columns
            end level — 2 columns on phones, 3 from tablet up */}
        {([
          [2, "flex md:hidden gap-3", "gap-3"],
          [3, "hidden md:flex gap-6", "gap-6"],
        ] as const).map(([cols, rowCls, colCls]) => (
          <div key={cols} className={`mt-16 items-start md:mt-24 ${rowCls}`}>
            {balance(media.gallery, cols).map((column, c) => (
              <ul key={c} className={`flex min-w-0 flex-1 flex-col ${colCls}`}>
                {column.map(({ i, item: asset }) => (
            <li
              key={asset.src}
              data-item
              style={{ aspectRatio: `${asset.width} / ${asset.height}` }}
              className="relative block w-full"
            >
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
                      <Media asset={asset} alt={alts[i]} sizes="(min-width: 768px) 32vw, 50vw" />
                    </span>
                  </span>
                  <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-ink/0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-focus-visible:opacity-100" />
                  <span className="absolute inset-x-4 bottom-4 flex translate-y-2 items-center gap-3 text-[0.7rem] tracking-[0.25em] text-ivory/90 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                    <span className="tabular-nums">{String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
                    <span className="h-px flex-1 bg-gold/70" />
                  </span>
                </span>
              </button>
            </li>
                ))}
              </ul>
            ))}
          </div>
        ))}
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
