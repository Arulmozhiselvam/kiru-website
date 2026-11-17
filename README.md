# Kiruthigaah Ramesh · Bharatanatyam Portfolio

A cinematic single-page portfolio built with Next.js (App Router), React, TypeScript,
Tailwind CSS v4, GSAP + ScrollTrigger, Motion for React, Lenis smooth scrolling and Lucide icons.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Requires Node 20.9+. (`package.json` overrides `magic-string` so Tailwind builds on Node 20.18. On Node ≥ 20.19 you can remove the override.)

---

## ⚠ Before launch: replace placeholders

### 1. Photography — `content/media.ts`
Every image is listed in one registry. All photos are the artist's own (originals in
`/images`, web copies in `public/images/kiru/`). The home banner is IMG_6295; frames in the
Art section and gallery follow each photo's own shape (`frameRatio`), and `position` sets
the crop focus. To add more photos, copy them into `public/images/kiru/`, register them in
`content/media.ts`, and add them to `gallery` — the layout supports any number (it cycles
through 6 editorial positions).

| Key | Used in | Suggested photo | Ratio |
|---|---|---|---|
| `hero` | Hero background | Full-length performance shot, dark/stage-lit | 16:9 |
| `heroVideo` | Hero (optional) | Muted loop, 6–10 s, < 4 MB mp4 | 16:9 |
| `portrait` | About | Artist portrait | 4:5 |
| `art.abhinaya` | Art panel 1 | Expression / face close-up | 4:5 |
| `art.rhythm` | Art panel 2 | Movement / footwork | 4:5 |
| `art.mudra` | Art panel 3 | Hand gesture detail | 4:5 |
| `art.costume` | Art panel 4 | Costume & jewellery detail | 4:5 |
| `art.aesthetics` | Art panel 5 | Araimandi / classical posture | 4:5 |
| `gallery[]` | Gallery + lightbox | Any number of photos | any |
| `arangetram` | Arangetram background & "2027" text mask | Stage or rehearsal atmosphere | 16:9 |

Put the real files in `public/images/` (JPG/WebP, ~2400px on the long edge) and update each
`src`, `width`, `height` (and `position` to control cropping). Higher-resolution originals
(≥ 2000px on the long edge) will look noticeably sharper, especially in the hero.

### 2. Contact & social — `content/site.ts`
- `email` — set to the artist's contact address
- `socials[].href` — Instagram / YouTube / Facebook profile URLs (remove any not used)
- `siteUrl` — production domain (or set `NEXT_PUBLIC_SITE_URL`); used for SEO, sitemap, OG

### 3. Text — `content/dictionary.ts` (English + Tamil)
The About introduction and Journey timeline are written from the confirmed facts: name,
Malaysia, Bharatanatyam, Kalakshetra style, began dancing at age 8, Arangetram in 2027.
Journey stages use labels (Age 8 · Training · Stage · Today · 2027) rather than invented years.
No awards, teachers, venues or dates were invented — add real ones in `journey.milestones`
and `about.paragraphs` as they become available. The artist's name is localised via `name`
(English: Kiruthigaah Ramesh · Tamil: கிருத்திகா ரமேஷ்). **Please have a native speaker review the Tamil**, including
the Tamil spelling of the artist's name (கிருத்திகா ரமேஷ்) used in the Tamil copy.

### 4. Open Graph image
`app/opengraph-image.tsx` generates a typographic card. Once photography exists, consider
replacing it with a static `app/opengraph-image.jpg` (1200×630).

---

## Structure

```
app/                 layout (fonts, metadata, providers), page, template (route fade),
                     sitemap.ts, robots.ts, opengraph-image.tsx, icon.svg, not-found
components/
  layout/            Intro, Navigation, Cursor
  sections/          Hero, About, Art, Journey, Gallery, Arangetram, Contact (footer)
  ui/                SplitChars, RevealLines, Reveal, ImageReveal, DrawLine, SectionLabel,
                     Lightbox, LanguageSwitch, GoldParticles, BrandMark, Media, SocialIcon
  providers/         LanguageProvider (EN/TA), SmoothScroll (Lenis↔ScrollTrigger),
                     IntroProvider, ScrollRefresher
content/             dictionary.ts (all copy), media.ts (all images), site.ts (contact)
lib/                 gsap.ts (plugin registration + media queries), segment.ts, cn.ts
scripts/             generate-placeholders.mjs  (npm run placeholders)
```

## Motion system
- **Intro** — gold particle canvas, her name revealed letter by letter (English + Tamil), curtain lift; once per session; skippable.
- **Hero** — slow zoom-in, continuous drift, letter-by-letter name, masked tagline, scroll-out parallax.
- **About** — ink→ivory background transition, clip-path portrait reveal, masked heading lines.
- **Art** — pinned horizontal storytelling on desktop (≥1024px) with per-panel clip/parallax;
  vertical sequence on mobile.
- **Journey** — scrubbed gold thread drawing down the timeline; nodes and years reveal in turn.
- **Gallery** — asymmetric grid, curtain reveals, depth drift, hover zoom, full-screen lightbox
  (keyboard ←/→/Esc, swipe, focus trap).
- **Arangetram** — stage image glows through the "2027" numerals (text mask).
- **Footer** — magnetic email link, her first name rises letter by letter as a closing gesture.
- Custom cursor only on fine-pointer devices.

All GSAP animations are registered inside `gsap.matchMedia()`; with
`prefers-reduced-motion: reduce` content is shown statically, Lenis is disabled, the intro is
reduced to a short fade and the horizontal section becomes vertical. Tamil text is split by
grapheme (never mid-letter) and is never letter-spaced.
