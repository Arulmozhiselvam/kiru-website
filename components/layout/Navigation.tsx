"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { useIntro } from "@/components/providers/IntroProvider";
import { BrandMark } from "@/components/ui/BrandMark";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

const SECTIONS = ["home", "about", "art", "journey", "gallery", "contact"] as const;
type SectionId = (typeof SECTIONS)[number];

const ease = [0.76, 0, 0.24, 1] as const;

export function Navigation() {
  const { t } = useLanguage();
  const { scrollTo, lock } = useSmoothScroll();
  const { introDone } = useIntro();
  const { scrollY } = useScroll();

  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<SectionId>("home");

  // Hide on scroll down, reveal on scroll up.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 60);
    if (y < window.innerHeight * 0.4) setActive("home");
    setHidden(y > prev && y > 400 && !open);
  });

  // Track the section in view for the active indicator.
  useEffect(() => {
    const els = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id as SectionId));
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    lock(open);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const go = (id: SectionId) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    // wait for the menu curtain to start closing before scrolling
    setTimeout(() => scrollTo(id === "home" ? 0 : `#${id}`), open ? 450 : 0);
  };

  const labels: Record<SectionId, string> = {
    home: t.nav.home, about: t.nav.about, art: t.nav.art,
    journey: t.nav.journey, gallery: t.nav.gallery, contact: t.nav.contact,
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={introDone ? { y: hidden ? -100 : 0, opacity: 1 } : { y: -100, opacity: 0 }}
        transition={{ duration: hidden ? 0.5 : 1, ease, delay: introDone && !scrolled ? 0.9 : 0 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/50 to-transparent transition-opacity duration-700",
            scrolled || open ? "opacity-100" : "opacity-0"
          )}
        />
        <nav aria-label="Primary" className="container-edge relative flex h-20 items-center justify-between md:h-24">
          <a href="#home" onClick={go("home")} className="relative z-10 text-ivory" aria-label="KIRU — home">
            <BrandMark />
          </a>

          <ul className="hidden items-center gap-9 lg:flex">
            {SECTIONS.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={go(id)}
                  aria-current={active === id ? "true" : undefined}
                  className={cn(
                    "group relative py-2 text-[0.8rem] tracking-[0.14em] uppercase transition-colors duration-500",
                    active === id ? "text-gold" : "text-ivory/75 hover:text-ivory"
                  )}
                >
                  {labels[id]}
                  <span
                    className={cn(
                      "absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-gold transition-transform duration-700 ease-[var(--ease-cinematic)] group-hover:origin-left group-hover:scale-x-100",
                      active === id && "origin-left scale-x-100"
                    )}
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="relative z-10 flex items-center gap-3">
            <LanguageSwitch className="hidden sm:inline-flex" id="nav-lang" />
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.nav.close : t.nav.menu}
              className="flex h-11 items-center gap-2 rounded-full border border-ivory/15 px-4 text-ivory transition-colors hover:border-gold/60 lg:hidden"
            >
              <span className="eyebrow !text-[0.62rem]">{open ? t.nav.close : t.nav.menu}</span>
              {open ? <X size={16} strokeWidth={1.4} /> : <Menu size={16} strokeWidth={1.4} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile / tablet full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t.nav.menu}
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.9, ease }}
            className="fixed inset-0 z-40 flex flex-col bg-forest lg:hidden"
          >
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_10%,rgba(177,139,82,0.18),transparent_55%)]" />
            <ul className="container-edge relative mt-28 flex flex-1 flex-col justify-center gap-1 pb-10">
              {SECTIONS.map((id, i) => (
                <li key={id} className="overflow-clip">
                  <motion.a
                    href={`#${id}`}
                    onClick={go(id)}
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%", transition: { duration: 0.4, ease } }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.25 + i * 0.06 }}
                    className={cn(
                      "flex items-baseline gap-4 py-1 font-display text-[clamp(2.6rem,11vw,4.5rem)] font-light leading-[1.1]",
                      active === id ? "text-gold" : "text-ivory"
                    )}
                  >
                    <span className="font-sans text-xs tracking-[0.2em] text-gold/80 tabular-nums">0{i + 1}</span>
                    {labels[id]}
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="container-edge relative flex flex-wrap items-center justify-between gap-4 border-t border-ivory/10 py-6"
            >
              <LanguageSwitch id="menu-lang" />
              <a href={`mailto:${site.email}`} className="text-sm text-ivory/70">
                {site.email}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
