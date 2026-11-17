import Link from "next/link";
import { BrandMark } from "@/components/ui/BrandMark";
import { site } from "@/content/site";

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center gap-8 bg-ink px-6 text-center text-ivory">
      <BrandMark label={site.name} />
      <h1 className="display-lg">
        Lost in <span className="italic text-gold-soft">rhythm</span>
      </h1>
      <p className="max-w-sm text-ivory/60">The page you were looking for has moved off stage.</p>
      <Link href="/" className="eyebrow rounded-full border border-gold/60 px-6 py-3 text-gold transition-colors hover:bg-gold hover:text-ink">
        Return home
      </Link>
    </main>
  );
}
