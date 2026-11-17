import type { SocialId } from "@/content/site";

/** Minimal line icons for social platforms (brand icons aren't in Lucide). */
export function SocialIcon({ id, className = "h-4 w-4" }: { id: SocialId; className?: string }) {
  const common = { className, fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, viewBox: "0 0 24 24", "aria-hidden": true };
  switch (id) {
    case "instagram":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...common}>
          <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
          <path d="M10 9.5v5l4.5-2.5z" fill="currentColor" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...common}>
          <path d="M14.5 8H16V4.5h-2.2C11.5 4.5 10 6 10 8.4V11H8v3.3h2V20h3.3v-5.7h2.3l.4-3.3h-2.7V8.9c0-.6.4-.9 1.2-.9z" />
        </svg>
      );
  }
}
