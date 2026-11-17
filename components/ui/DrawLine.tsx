"use client";

import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

/** Hairline gold rule that draws itself when it enters the viewport. */
export function DrawLine({ className, vertical = false, delay = 0 }: { className?: string; vertical?: boolean; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          ref.current,
          vertical ? { scaleY: 0 } : { scaleX: 0 },
          {
            ...(vertical ? { scaleY: 1 } : { scaleX: 1 }),
            duration: 1.8,
            ease: "expo.inOut",
            delay,
            scrollTrigger: { trigger: ref.current, start: "top 92%", toggleActions: "play none none none" },
          }
        );
      });
      return () => mm.revert();
    },
    { scope: ref }
  );
  return (
    <span
      ref={ref}
      aria-hidden
      className={cn(
        "block bg-gold/50",
        vertical ? "w-px origin-top" : "h-px w-full origin-left",
        className
      )}
    />
  );
}
