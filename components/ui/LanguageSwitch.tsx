"use client";

import { motion } from "motion/react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import type { Locale } from "@/content/dictionary";
import { cn } from "@/lib/cn";

const OPTIONS: { id: Locale; label: string; full: string }[] = [
  { id: "en", label: "EN", full: "English" },
  { id: "ta", label: "தமிழ்", full: "தமிழ் (Tamil)" },
];

/** EN / TA pill with a sliding gold indicator. */
export function LanguageSwitch({ className, id = "lang" }: { className?: string; id?: string }) {
  const { locale, setLocale, t } = useLanguage();
  return (
    <div role="group" aria-label={t.nav.language} className={cn("relative inline-flex items-center rounded-full border border-ivory/15 p-0.5", className)}>
      {OPTIONS.map((o) => {
        const active = locale === o.id;
        return (
          <button
            key={o.id}
            type="button"
            lang={o.id}
            aria-pressed={active}
            aria-label={o.full}
            onClick={() => setLocale(o.id)}
            className={cn(
              "relative z-10 min-w-11 rounded-full px-3 py-1.5 text-[0.7rem] font-medium tracking-[0.18em] transition-colors duration-500",
              o.id === "ta" && "tracking-normal font-[family-name:var(--font-tamil)]",
              active ? "text-ink" : "text-ivory/70 hover:text-ivory"
            )}
          >
            {active && (
              <motion.span
                layoutId={`${id}-pill`}
                className="absolute inset-0 -z-10 rounded-full bg-gold"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
