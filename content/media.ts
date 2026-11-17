/**
 * MEDIA REGISTRY — every image on the site is referenced from here.
 *
 * All photographs are the artist's own (public/images/kiru). Originals live in
 * /images at the project root.
 *
 * To add or swap a photo: put the file in /public/images/kiru/ and add/edit an
 * entry below. Keep `width` / `height` matching the file; `position` is the
 * CSS object-position used when the photo is cropped (e.g. "50% 30%" keeps
 * the upper-middle — usually the face — in frame).
 *
 * Optional: set `heroVideo` to an mp4/webm path for a hero video background
 * (the hero image becomes the poster frame).
 */

export type MediaAsset = {
  src: string;
  width: number;
  height: number;
  /** CSS object-position for cropping, e.g. "50% 30%" */
  position?: string;
  /** true for temporary stock imagery (shows a small note + neutral alt text) */
  stock?: boolean;
};

/** Aspect ratio for a frame that follows the photo's own shape, clamped. */
export const frameRatio = (a: MediaAsset, min = 0.6, max = 0.8) =>
  Math.min(max, Math.max(min, a.width / a.height));

const kiru = (name: string, width: number, height: number, position?: string): MediaAsset => ({
  src: `/images/kiru/${name}.jpg`,
  width,
  height,
  position,
});

// IMG_6293 — expressive pose, yellow & teal costume
const expressive = kiru("hero", 778, 1080, "50% 25%");
// IMG_6297 — at the carved wooden doorway
const about = kiru("about", 960, 1280, "50% 30%");
// IMG_6294 — on stage, in movement (purple & white)
const stage = kiru("gallery-01", 826, 1080, "40% 50%");
// IMG_6295 — multi-armed deity tableau (hastas)
const tableau = kiru("gallery-02", 675, 1080, "50% 30%");
// IMG_6296 — costume & temple jewellery
const costume = kiru("gallery-03", 463, 1080, "50% 14%");
// IMG_6298 — outdoor sculptural pose
const pose = kiru("gallery-04", 960, 1280, "45% 72%");
// IMG_6299 / 6300 — performing in a hall before a seated audience
const hall1 = kiru("hall-01", 960, 1280, "45% 40%");
const hall2 = kiru("hall-02", 960, 1280, "50% 40%");
// IMG_6301 — on stage with a live flautist (cropped from a print)
const musician = kiru("musician", 768, 1203, "50% 30%");
// IMG_6302 — in costume, holding a certificate (cropped from a collage)
const certificate = kiru("certificate-portrait", 679, 869, "50% 30%");
// IMG_6303 — Shivarpanam (2024), red-lit stage production
const shivarpanam = kiru("shivarpanam", 1177, 508, "50% 40%");
// IMG_6304 — anniversary production, three dancers
const anniversary = kiru("anniversary", 1178, 620, "50% 35%");
// IMG_6305 — International Cultural Day, night stage under spotlights
const spotlight = kiru("spotlight", 1178, 1224, "50% 60%");
// IMG_6306 — receiving a certificate on stage
const ceremony = kiru("ceremony", 1178, 1084, "50% 40%");
// Unsplash stock (free licence, no people): closed red stage curtain
// https://unsplash.com/photos/WW1jsInXgwM
const curtain = { src: "/images/kiru/curtain.jpg", width: 2400, height: 1602, position: "50% 60%" } as MediaAsset;
// New photos (screenshots 2026-11-17)
const moment1 = kiru("moment-01", 748, 770, "50% 35%");
const moment2 = kiru("moment-02", 726, 787, "50% 40%");
const moment3 = kiru("moment-03", 532, 666, "50% 30%");
const moment4 = kiru("moment-04", 400, 615, "50% 30%");
const moment5 = kiru("moment-05", 492, 706, "50% 30%");
// WhatsApp 2026-11-17 — feet in motion: salangai, alta, fanned pleats
const salangai = kiru("salangai", 1065, 810, "50% 80%");

export const media = {
  // Home banner: IMG_6297, at the carved wooden doorway
  hero: { ...about, position: "50% 30%" },
  /** e.g. "/video/hero.mp4" — muted, looping, ~6–10s, < 4 MB recommended */
  heroVideo: null as string | null,
  // About section ("A life told in rhythm & grace"): IMG_6293
  portrait: { ...expressive, position: "55% 22%" },
  // Arangetram background: closed stage curtain — the debut about to begin
  arangetram: curtain,
  art: {
    // Expression (Abhinaya): IMG_6301, with a live flautist
    abhinaya: { ...musician, position: "50% 22%" },
    rhythm: hall1,
    mudra: { ...hall2, position: "55% 35%" },
    costume,
    aesthetics: pose,
  },
  /** Photos beside Journey milestones, by index (null = text only) */
  // 2010 · 2013 · 2016 Salangai Pooja · 2024 Shivarpanam · 2026 Cultural Day · 2027
  journey: [null, hall1, salangai, shivarpanam, spotlight, null] as (MediaAsset | null)[],
  gallery: [
    musician, stage, shivarpanam, tableau, hall2, anniversary, about,
    certificate, ceremony, costume, spotlight, pose, hall1, expressive, salangai,
    moment1, moment2, moment3, moment4, moment5,
  ],
} as const;
