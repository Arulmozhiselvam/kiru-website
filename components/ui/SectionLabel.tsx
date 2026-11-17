import { cn } from "@/lib/cn";
import { DrawLine } from "./DrawLine";

/** Numbered editorial eyebrow: "02 ——— The Art of Bharatanatyam" */
export function SectionLabel({ index, label, className, tone = "gold" }: { index: string; label: string; className?: string; tone?: "gold" | "ivory" }) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span className={cn("eyebrow tabular-nums", tone === "gold" ? "text-gold" : "text-ivory/70")}>{index}</span>
      <DrawLine className="!w-12 md:!w-20" />
      <span className={cn("eyebrow", tone === "gold" ? "text-gold" : "text-ivory/70")}>{label}</span>
    </div>
  );
}
