import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * The artist's logo — Tamil calligraphy "கிரு" with a dancer, temple crown,
 * bells and lotus (white on transparent). Source: /images/logo.png, trimmed
 * and resized to /public/images/kiru/logo.png.
 */
export function BrandMark({ label, className }: { label: string; className?: string }) {
  return (
    <Image
      src="/images/kiru/logo.png"
      alt={label}
      width={358}
      height={288}
      priority
      className={cn("h-12 w-auto select-none md:h-16", className)}
    />
  );
}
