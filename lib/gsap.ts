"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  gsap.defaults({ ease: "power3.out", duration: 1 });
}

/** Media-query conditions shared by every animated component. */
export const MQ = {
  motion: "(prefers-reduced-motion: no-preference)",
  reduced: "(prefers-reduced-motion: reduce)",
  desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  mobile: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
} as const;

/** Signature cinematic easing curve (used by GSAP via CustomEase-free cubic) */
export const EASE = {
  cinematic: "expo.out",
  silk: "power4.inOut",
} as const;

export { gsap, ScrollTrigger, useGSAP };
