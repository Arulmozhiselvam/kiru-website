"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { MediaAsset } from "@/content/media";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";

type Props = {
  items: readonly MediaAsset[];
  alts: string[];
  index: number | null;
  onChange: (i: number | null) => void;
  labels: { close: string; next: string; prev: string };
};

const ease = [0.16, 1, 0.3, 1] as const;

/** Full-screen lightbox: keyboard, swipe, focus-managed, scroll-locked. */
export function Lightbox({ items, alts, index, onChange, labels }: Props) {
  const [mounted, setMounted] = useState(false);
  const [dir, setDir] = useState(1);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const { lock } = useSmoothScroll();
  const open = index !== null;
  const n = items.length;

  useEffect(() => setMounted(true), []);

  const step = (d: number) => {
    if (index === null) return;
    setDir(d);
    onChange((index + d + n) % n);
  };

  // Lock scroll + manage focus once per open/close.
  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement as HTMLElement;
    lock(true);
    requestAnimationFrame(() => closeRef.current?.focus());
    return () => {
      lock(false);
      lastFocus.current?.focus({ preventScroll: true });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "Tab") {
        // simple focus trap
        const nodes = document.querySelectorAll<HTMLElement>("[data-lightbox] button");
        const first = nodes[0], last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, index]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && index !== null && (
        <motion.div
          data-lightbox
          role="dialog"
          aria-modal="true"
          aria-label={alts[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.1 } }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/[0.97]"
          onClick={() => onChange(null)}
        >
          <AnimatePresence initial custom={dir} mode="popLayout">
            <motion.div
              key={index}
              custom={dir}
              variants={{
                enter: (d: number) => ({ opacity: 0, x: d * 80, scale: 0.96, clipPath: "inset(6% 6% 6% 6%)" }),
                center: { opacity: 1, x: 0, scale: 1, clipPath: "inset(0% 0% 0% 0%)" },
                exit: (d: number) => ({ opacity: 0, x: d * -80, scale: 0.98 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.9, ease }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) step(1);
                else if (info.offset.x > 80) step(-1);
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative h-[78svh] w-[92vw] touch-pan-y md:w-[80vw]"
            >
              <Image
                src={items[index].src}
                alt={alts[index]}
                fill
                sizes="90vw"
                unoptimized={items[index].src.endsWith(".svg")}
                className="pointer-events-none object-contain"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-5 md:p-8">
            <span className="eyebrow tabular-nums text-ivory/60">
              {String(index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={(e) => { e.stopPropagation(); onChange(null); }}
              aria-label={labels.close}
              className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-ivory/20 text-ivory transition-colors hover:border-gold hover:text-gold"
            >
              <X size={18} strokeWidth={1.3} />
            </button>
          </div>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); step(-1); }}
            aria-label={labels.prev}
            className="absolute bottom-6 left-5 flex h-12 w-12 items-center justify-center rounded-full border border-ivory/20 text-ivory transition-colors hover:border-gold hover:text-gold md:bottom-auto md:left-8 md:top-1/2 md:-translate-y-1/2"
          >
            <ChevronLeft size={20} strokeWidth={1.3} />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); step(1); }}
            aria-label={labels.next}
            className="absolute bottom-6 right-5 flex h-12 w-12 items-center justify-center rounded-full border border-ivory/20 text-ivory transition-colors hover:border-gold hover:text-gold md:bottom-auto md:right-8 md:top-1/2 md:-translate-y-1/2"
          >
            <ChevronRight size={20} strokeWidth={1.3} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
