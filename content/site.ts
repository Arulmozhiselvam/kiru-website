/**
 * SITE CONFIG — editable placeholders.
 * ⚠ Replace the social URLs and siteUrl before launch.
 */
export const site = {
  name: "Kiruthigaah Ramesh",
  location: "Malaysia",
  /** Production URL — used for SEO, sitemap and Open Graph */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example.com",
  email: "kiruthigaahramesh11@gmail.com",
  /** ⚠ PLACEHOLDERS — set `href` to the real profile URLs (or remove entries) */
  socials: [
    { id: "instagram", label: "Instagram", href: "https://instagram.com/" },
    { id: "youtube", label: "YouTube", href: "https://youtube.com/" },
    { id: "facebook", label: "Facebook", href: "https://facebook.com/" },
  ],
} as const;

export type SocialId = (typeof site.socials)[number]["id"];
