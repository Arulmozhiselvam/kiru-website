"use client";

import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** direction the curtain opens from */
  from?: "bottom" | "left" | "right" | "top";
  /** parallax travel of the inner image in % (0 disables) */
  parallax?: number;
  delay?: number;
  style?: React.CSSProperties;
};

const clipFrom = {
  bottom: "inset(100% 0% 0% 0%)",
  top: "inset(0% 0% 100% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
};

/**
 * Cinematic image entrance: a clip-path curtain opens while the image settles
 * from a slight over-scale, then drifts with gentle parallax as you scroll.
 */
export function ImageReveal({ children, className, from = "bottom", parallax = 8, delay = 0, style }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const inner = ref.current!.querySelector("[data-inner]");
        gsap.fromTo(
          ref.current,
          { clipPath: clipFrom[from] },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.6,
            ease: "expo.inOut",
            delay,
            scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
          }
        );
        gsap.fromTo(inner, { scale: 1.35 }, {
          scale: 1.08,
          duration: 2.2,
          ease: "expo.out",
          delay,
          scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
        });
        if (parallax) {
          gsap.fromTo(
            inner,
            { yPercent: -parallax / 2 },
            {
              yPercent: parallax / 2,
              ease: "none",
              scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
            }
          );
        }
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={cn("relative overflow-hidden bg-charcoal", className)} style={style}>
      <div data-inner className="absolute inset-0 will-change-transform">
        {children}
      </div>
    </div>
  );
}
