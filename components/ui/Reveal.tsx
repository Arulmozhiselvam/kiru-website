"use client";

import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** stagger children marked with data-reveal; otherwise animates the wrapper */
  stagger?: number;
  y?: number;
  delay?: number;
  start?: string;
  as?: "div" | "section" | "ul" | "footer";
  /** re-run when this key changes (e.g. locale) */
  deps?: unknown[];
};

/** Staggered scroll entrance. Content stays fully visible with reduced motion. */
export function Reveal({ children, className, stagger = 0.1, y = 40, delay = 0, start = "top 85%", as: Tag = "div", deps = [] }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const items = ref.current!.querySelectorAll("[data-reveal]");
        const targets = items.length ? items : ref.current;
        gsap.fromTo(
          targets,
          { y, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1.2,
            ease: "expo.out",
            stagger,
            delay,
            scrollTrigger: { trigger: ref.current, start, toggleActions: "play none none none" },
          }
        );
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: deps, revertOnUpdate: true }
  );

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className}>
      {children}
    </Tag>
  );
}
