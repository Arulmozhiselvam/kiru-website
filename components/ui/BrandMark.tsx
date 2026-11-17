import { cn } from "@/lib/cn";

/** KIRU wordmark — Cormorant with a small gold lotus-point accent. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-display text-[1.35rem] font-medium tracking-[0.42em] leading-none", className)}>
      <svg aria-hidden viewBox="0 0 12 12" className="h-2.5 w-2.5 text-gold">
        <path d="M6 0 L7.4 4.6 L12 6 L7.4 7.4 L6 12 L4.6 7.4 L0 6 L4.6 4.6 Z" fill="currentColor" />
      </svg>
      <span className="-mr-[0.42em]">KIRU</span>
    </span>
  );
}
