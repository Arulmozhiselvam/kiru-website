"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type Ctx = {
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement) => void;
  lock: (locked: boolean) => void;
};

const ScrollContext = createContext<Ctx>({ lenis: null, scrollTo: () => {}, lock: () => {} });

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const instance = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = instance;
    setLenis(instance);

    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo: Ctx["scrollTo"] = (target) => {
    const l = lenisRef.current;
    if (l) {
      l.scrollTo(target as never, { duration: 1.6, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
      return;
    }
    if (typeof target === "number") {
      window.scrollTo({ top: target });
      return;
    }
    const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
    el?.scrollIntoView({ behavior: "auto" });
  };

  const lock = (locked: boolean) => {
    const l = lenisRef.current;
    if (l) locked ? l.stop() : l.start();
    document.documentElement.style.overflow = locked ? "hidden" : "";
  };

  return <ScrollContext.Provider value={{ lenis, scrollTo, lock }}>{children}</ScrollContext.Provider>;
}

export const useSmoothScroll = () => useContext(ScrollContext);
