"use client";

import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

type Props = {
  lines: string[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  lineClassName?: (i: number) => string | undefined;
  delay?: number;
  /** start position for ScrollTrigger */
  start?: string;
};

/** Text-mask reveal: each line rises out of its own clipped band. */
export function RevealLines({ lines, as: Tag = "h2", className, lineClassName, delay = 0, start = "top 82%" }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const inner = ref.current!.querySelectorAll("[data-line]");
        gsap.fromTo(
          inner,
          { yPercent: 115, rotate: 2.5 },
          {
            yPercent: 0,
            rotate: 0,
            duration: 1.4,
            ease: "expo.out",
            stagger: 0.11,
            delay,
            scrollTrigger: { trigger: ref.current, start, once: true },
          }
        );
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [lines.join("|")], revertOnUpdate: true }
  );

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="line-mask">
          <span data-line className={cn("block origin-top-left", lineClassName?.(i))}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
