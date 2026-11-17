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

export const media = {
  // Home banner: IMG_6295, the multi-armed deity tableau
  hero: { ...tableau, position: "50% 16%" },
  /** e.g. "/video/hero.mp4" — muted, looping, ~6–10s, < 4 MB recommended */
  heroVideo: null as string | null,
  // About section ("A life told in rhythm & grace"): IMG_6293
  portrait: { ...expressive, position: "55% 22%" },
  arangetram: { ...stage, position: "50% 30%" },
  art: {
    // Expression (Abhinaya): IMG_6297, at the carved doorway
    abhinaya: { ...about, position: "50% 35%" },
    rhythm: stage,
    mudra: tableau,
    costume,
    aesthetics: pose,
  },
  gallery: [stage, tableau, about, costume, pose, expressive],
} as const;
