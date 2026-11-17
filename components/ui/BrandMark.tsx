import { cn } from "@/lib/cn";

/** Name wordmark — refined small caps with a gold lotus-point accent. */
export function BrandMark({ label, className }: { label: string; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 leading-none", className)}>
      <svg aria-hidden viewBox="0 0 12 12" className="h-2.5 w-2.5 shrink-0 text-gold">
        <path d="M6 0 L7.4 4.6 L12 6 L7.4 7.4 L6 12 L4.6 7.4 L0 6 L4.6 4.6 Z" fill="currentColor" />
      </svg>
      <span className="brand-name whitespace-nowrap font-display text-[0.82rem] font-medium uppercase tracking-[0.16em] sm:text-[1.05rem] sm:tracking-[0.28em]">
        {label}
      </span>
    </span>
  );
}
