import Image from "next/image";
import type { MediaAsset } from "@/content/media";
import { cn } from "@/lib/cn";

type Props = {
  asset: MediaAsset;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  fill?: boolean;
  /** JPEG/WebP quality 1–100 (default 82) */
  quality?: number;
};

/** next/image wrapper — lazy by default, responsive sizes, blur-free dark backdrop. */
export function Media({ asset, alt, sizes, priority, className, fill = true, quality = 82 }: Props) {
  return fill ? (
    <Image
      src={asset.src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      quality={quality}
      unoptimized={asset.src.endsWith(".svg")}
      style={asset.position ? { objectPosition: asset.position } : undefined}
      className={cn("object-cover", className)}
    />
  ) : (
    <Image
      src={asset.src}
      alt={alt}
      width={asset.width}
      height={asset.height}
      sizes={sizes}
      priority={priority}
      quality={quality}
      unoptimized={asset.src.endsWith(".svg")}
      className={className}
    />
  );
}
