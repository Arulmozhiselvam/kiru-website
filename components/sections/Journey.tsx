"use client";

import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { RevealLines } from "@/components/ui/RevealLines";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/cn";

/** Editorial timeline with a gold thread that draws itself as you scroll. */
export function Journey() {
  const ref = useRef<HTMLElement>(null);
  const { t, locale } = useLanguage();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          "[data-thread]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: "[data-timeline]", start: "top 70%", end: "bottom 70%", scrub: 0.6 },
          }
        );
        gsap.utils.toArray<HTMLElement>("[data-milestone]").forEach((m) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: m, start: "top 72%", once: true } });
          tl.fromTo(m.querySelector("[data-node]"), { scale: 0 }, { scale: 1, duration: 0.8, ease: "back.out(2)" })
            .fromTo(m.querySelector("[data-year]"), { yPercent: 110 }, { yPercent: 0, duration: 1.2, ease: "expo.out" }, 0.05)
            .fromTo(m.querySelectorAll("[data-fade]"), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, stagger: 0.1, ease: "expo.out" }, 0.2)
            .fromTo(m.querySelector("[data-tick]"), { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "expo.inOut" }, 0.1);
        });
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [locale], revertOnUpdate: true }
  );

  return (
    <section ref={ref} id="journey" className="relative overflow-hidden bg-ink py-28 text-ivory md:py-44">
      <div className="container-edge">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <SectionLabel index="03" label={t.journey.label} className="mb-10" />
            <RevealLines key={locale} lines={t.journey.heading} className="display-lg" lineClassName={(i) => (i === 1 ? "italic text-gold-soft" : undefined)} />
          </div>
          <p className="self-end text-ivory/55 italic md:col-span-4 md:col-start-9">{t.journey.intro}</p>
        </div>

        <ol data-timeline className="relative mt-24 md:mt-32">
          {/* Thread */}
          <span aria-hidden className="absolute left-[7px] top-0 h-full w-px bg-ivory/10 md:left-1/2" />
          <span data-thread aria-hidden className="absolute left-[7px] top-0 h-full w-px origin-top bg-gradient-to-b from-gold via-gold to-terracotta md:left-1/2" />

          {t.journey.milestones.map((m, i) => {
            const right = i % 2 === 1;
            const isPlaceholder = m.year.startsWith("[");
            return (
              <li key={i} data-milestone className="relative grid pb-20 pl-10 last:pb-0 md:grid-cols-2 md:pl-0 md:pb-28">
                <span
                  data-node
                  aria-hidden
                  className="absolute left-0 top-3 flex h-[15px] w-[15px] items-center justify-center rounded-full border border-gold bg-ink md:left-1/2 md:-translate-x-1/2"
                >
                  <span className="h-[5px] w-[5px] rounded-full bg-gold" />
                </span>

                <div className={cn("relative md:px-16", right ? "md:col-start-2" : "md:text-right")}>
                  <span
                    data-tick
                    aria-hidden
                    className={cn("absolute top-[1.3rem] hidden h-px w-10 bg-gold/50 md:block", right ? "left-3 origin-left" : "right-3 origin-right")}
                  />
                  <p className="line-mask">
                    <span data-year className={cn("block font-display text-6xl font-light leading-none md:text-8xl", isPlaceholder ? "text-ivory/25" : "text-gold")}>
                      {m.year}
                    </span>
                  </p>
                  <h3 data-fade className="mt-5 font-display text-3xl text-ivory md:text-4xl">{m.title}</h3>
                  <p data-fade className={cn("mt-4 max-w-md leading-relaxed text-ivory/60", !right && "md:ml-auto", m.text.startsWith("[") && "italic text-ivory/45")}>
                    {m.text}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
