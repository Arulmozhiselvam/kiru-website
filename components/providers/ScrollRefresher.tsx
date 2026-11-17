"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { useLanguage } from "./LanguageProvider";

/** Recalculate scroll-driven layouts after fonts load or the language changes. */
export function ScrollRefresher() {
  const { locale } = useLanguage();
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [locale]);
  return null;
}
