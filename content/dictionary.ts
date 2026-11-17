/**
 * BILINGUAL CONTENT — English & Tamil.
 *
 * Text wrapped in [square brackets] is an EDITABLE PLACEHOLDER awaiting the
 * artist's real information. Nothing biographical has been invented: only the
 * facts provided (name, location, art form, style, Arangetram year) are stated.
 */

export type Locale = "en" | "ta";

export type ArtPanel = {
  key: "abhinaya" | "rhythm" | "mudra" | "costume" | "aesthetics";
  term: string;
  title: string;
  text: string;
};

export type Milestone = { year: string; title: string; text: string };

export type Dictionary = {
  meta: { description: string };
  /** alt text / caption for temporary stock photos (not the artist) */
  stockAlt: string;
  /** alt text for the artist's own photographs */
  artistAlt: string;
  stockNote: string;
  nav: {
    home: string; about: string; art: string; gallery: string; journey: string; contact: string;
    menu: string; close: string; skip: string; language: string;
  };
  hero: { eyebrow: string; tagline: string; scroll: string };
  about: {
    label: string;
    heading: string[];
    paragraphs: string[];
    facts: { label: string; value: string }[];
  };
  art: { label: string; heading: string[]; intro: string; panels: ArtPanel[]; drag: string };
  journey: { label: string; heading: string[]; intro: string; milestones: Milestone[] };
  gallery: {
    label: string; heading: string[]; note: string; alts: string[];
    open: string; close: string; next: string; prev: string;
  };
  arangetram: { label: string; title: string; year: string; text: string; soon: string; details: string };
  contact: {
    label: string; heading: string[]; text: string; emailLabel: string; follow: string;
    based: string; location: string; rights: string; top: string;
  };
};

const en: Dictionary = {
  stockAlt: "Bharatanatyam dancer — temporary stock photograph",
  artistAlt: "Kiruthigaah Ramesh performing Bharatanatyam",
  stockNote: "Temporary stock image",
  meta: {
    description:
      "Kiruthigaah Ramesh (KIRU) — Bharatanatyam artist in the Kalakshetra style, based in Malaysia. Where Tradition Becomes Expression.",
  },
  nav: {
    home: "Home", about: "About", art: "Art", gallery: "Gallery", journey: "Journey", contact: "Contact",
    menu: "Menu", close: "Close", skip: "Skip intro", language: "Language",
  },
  hero: {
    eyebrow: "Bharatanatyam · Kalakshetra style · Malaysia",
    tagline: "Where Tradition Becomes Expression.",
    scroll: "Scroll",
  },
  about: {
    label: "The Artist",
    heading: ["A life", "told in", "rhythm & grace"],
    paragraphs: [
      "Kiruthigaah Ramesh is a Bharatanatyam artist based in Malaysia, dancing in the Kalakshetra style — a tradition known for its clarity of line, precision and quiet intensity.",
      "[Artist introduction — editable placeholder. Add a few sentences in the artist's own voice: how dance began, what it means to her, and what she hopes audiences feel.]",
    ],
    facts: [
      { label: "Art form", value: "Bharatanatyam" },
      { label: "Style", value: "Kalakshetra" },
      { label: "Based in", value: "Malaysia" },
    ],
  },
  art: {
    label: "The Art of Bharatanatyam",
    heading: ["An ancient", "language of", "the body"],
    intro:
      "Born in the temples of Tamil Nadu, Bharatanatyam unites rhythm, gesture and emotion into a single, sculpted language. Five elements shape every performance.",
    drag: "Scroll to explore",
    panels: [
      { key: "abhinaya", term: "Abhinaya", title: "Expression",
        text: "The art of carrying meaning to the audience. Through the eyes, the face and the body, the dancer becomes the poem — devotion, longing and joy made visible." },
      { key: "rhythm", term: "Nritta", title: "Rhythm & Movement",
        text: "Pure dance built from adavus — precise units of movement — woven into rhythmic patterns in dialogue with the mridangam and the nattuvangam." },
      { key: "mudra", term: "Hasta", title: "Mudras",
        text: "Single and combined hand gestures form a vocabulary of their own, able to describe a lotus, a deer, a deity or a gathering storm." },
      { key: "costume", term: "Aharya", title: "Traditional Costume",
        text: "Pleated silk, temple jewellery, salangai ankle bells and reddened hands and feet complete the dancer's transformation for the stage." },
      { key: "aesthetics", term: "Araimandi", title: "Classical Aesthetics",
        text: "The half-seated araimandi, clean geometry and symmetry give Bharatanatyam its sculptural grace — as if temple stone had begun to move." },
    ],
  },
  journey: {
    label: "Artistic Journey",
    heading: ["Every step,", "a story"],
    intro: "[Editable placeholder timeline — replace each milestone with the artist's real journey.]",
    milestones: [
      { year: "[Year]", title: "[First steps]", text: "[Describe when and how the artist began learning Bharatanatyam.]" },
      { year: "[Year]", title: "[Training in the Kalakshetra style]", text: "[Describe the training, the guru (with permission) and the discipline of practice.]" },
      { year: "[Year]", title: "[Performances]", text: "[List notable performances, festivals or productions.]" },
      { year: "[Year]", title: "[Preparing for the stage]", text: "[Describe the preparation leading up to the Arangetram.]" },
      { year: "2027", title: "Arangetram", text: "The debut solo performance — details to be announced." },
    ],
  },
  gallery: {
    label: "Gallery",
    heading: ["Moments", "in motion"],
    note: "Selected moments — on stage, in rehearsal and in stillness.",
    alts: Array.from({ length: 8 }, (_, i) => `Bharatanatyam performance ${i + 1} — temporary stock photograph`),
    open: "Open image", close: "Close", next: "Next image", prev: "Previous image",
  },
  arangetram: {
    label: "Upcoming",
    title: "Arangetram",
    year: "2027",
    text: "The Arangetram — a dancer's first full solo performance — marks the culmination of years of devotion to the art. A new chapter is being prepared.",
    soon: "Coming Soon",
    details: "Date & venue to be announced",
  },
  contact: {
    label: "Contact",
    heading: ["Let's begin", "a conversation"],
    text: "For performances, collaborations and enquiries.",
    emailLabel: "Write to",
    follow: "Follow",
    based: "Based in",
    location: "Malaysia",
    rights: "All rights reserved.",
    top: "Back to top",
  },
};

const ta: Dictionary = {
  stockAlt: "பரதநாட்டியக் கலைஞர் — தற்காலிகப் புகைப்படம்",
  artistAlt: "கிருத்திகா ரமேஷ் — பரதநாட்டிய நிகழ்ச்சி",
  stockNote: "தற்காலிகப் படம்",
  meta: {
    description:
      "கிருத்திகா ரமேஷ் (KIRU) — மலேசியாவைச் சேர்ந்த கலாக்ஷேத்ரா பாணி பரதநாட்டியக் கலைஞர். மரபு வெளிப்பாடாக மலரும் இடம்.",
  },
  nav: {
    home: "முகப்பு", about: "அறிமுகம்", art: "கலை", gallery: "படங்கள்", journey: "பயணம்", contact: "தொடர்பு",
    menu: "பட்டியல்", close: "மூடு", skip: "தவிர்", language: "மொழி",
  },
  hero: {
    eyebrow: "பரதநாட்டியம் · கலாக்ஷேத்ரா பாணி · மலேசியா",
    tagline: "மரபு வெளிப்பாடாக மலரும் இடம்.",
    scroll: "கீழே",
  },
  about: {
    label: "கலைஞர்",
    heading: ["தாளத்திலும்", "நளினத்திலும்", "சொல்லப்படும் வாழ்க்கை"],
    paragraphs: [
      "கிருத்திகா ரமேஷ் மலேசியாவைச் சேர்ந்த பரதநாட்டியக் கலைஞர். கோடுகளின் தெளிவு, துல்லியம், அமைதியான தீவிரம் ஆகியவற்றுக்குப் பெயர் பெற்ற கலாக்ஷேத்ரா பாணியில் ஆடுகிறார்.",
      "[கலைஞர் அறிமுகம் — திருத்தக்கூடிய இடம். நடனம் எப்படித் தொடங்கியது, அது அவருக்கு என்ன பொருள் தருகிறது என்பதை அவரது சொந்தக் குரலில் சேர்க்கவும்.]",
    ],
    facts: [
      { label: "கலை வடிவம்", value: "பரதநாட்டியம்" },
      { label: "பாணி", value: "கலாக்ஷேத்ரா" },
      { label: "இருப்பிடம்", value: "மலேசியா" },
    ],
  },
  art: {
    label: "பரதநாட்டியக் கலை",
    heading: ["உடலின்", "தொன்மையான", "மொழி"],
    intro:
      "தமிழ்நாட்டின் கோயில்களில் பிறந்த பரதநாட்டியம், தாளம், முத்திரை, உணர்வு ஆகியவற்றை ஒரே சிற்ப மொழியாக இணைக்கிறது. ஐந்து கூறுகள் ஒவ்வொரு நிகழ்ச்சியையும் வடிவமைக்கின்றன.",
    drag: "உருட்டி அறியவும்",
    panels: [
      { key: "abhinaya", term: "அபிநயம்", title: "வெளிப்பாடு",
        text: "பொருளைப் பார்வையாளரிடம் கொண்டு சேர்க்கும் கலை. கண்கள், முகம், உடல் வழியாக நடனக் கலைஞரே கவிதையாகிறார் — பக்தி, ஏக்கம், மகிழ்ச்சி கண்முன் தோன்றுகின்றன." },
      { key: "rhythm", term: "நிருத்தம்", title: "தாளமும் அசைவும்",
        text: "அடவுகள் எனும் துல்லியமான அசைவுகளால் ஆன தூய நடனம் — மிருதங்கத்துடனும் நட்டுவாங்கத்துடனும் உரையாடும் தாள அமைப்புகள்." },
      { key: "mudra", term: "ஹஸ்தம்", title: "முத்திரைகள்",
        text: "ஒற்றை மற்றும் இணைந்த கை முத்திரைகள் தனக்கென ஒரு மொழியை உருவாக்குகின்றன — தாமரை, மான், தெய்வம், புயல் என அனைத்தையும் சித்தரிக்கின்றன." },
      { key: "costume", term: "ஆஹார்யம்", title: "பாரம்பரிய உடை",
        text: "மடிப்புகள் கொண்ட பட்டு, கோயில் நகைகள், சலங்கை, சிவந்த கைகால்கள் — மேடைக்கான மாற்றத்தை நிறைவு செய்கின்றன." },
      { key: "aesthetics", term: "அரைமண்டி", title: "செவ்வியல் அழகியல்",
        text: "அரைமண்டி நிலை, தெளிவான வடிவியல், சமச்சீர் — கோயில் கல் அசையத் தொடங்கியது போன்ற சிற்ப நளினத்தை பரதநாட்டியத்திற்கு அளிக்கின்றன." },
    ],
  },
  journey: {
    label: "கலைப் பயணம்",
    heading: ["ஒவ்வொரு அடியும்", "ஒரு கதை"],
    intro: "[திருத்தக்கூடிய காலவரிசை — ஒவ்வொரு மைல்கல்லையும் கலைஞரின் உண்மையான பயணத்துடன் மாற்றவும்.]",
    milestones: [
      { year: "[ஆண்டு]", title: "[முதல் அடிகள்]", text: "[பரதநாட்டியம் கற்கத் தொடங்கிய காலம் மற்றும் விதம்.]" },
      { year: "[ஆண்டு]", title: "[கலாக்ஷேத்ரா பாணியில் பயிற்சி]", text: "[பயிற்சி, குரு (அனுமதியுடன்), பயிற்சியின் ஒழுக்கம் பற்றி.]" },
      { year: "[ஆண்டு]", title: "[நிகழ்ச்சிகள்]", text: "[குறிப்பிடத்தக்க நிகழ்ச்சிகள், விழாக்கள், தயாரிப்புகள்.]" },
      { year: "[ஆண்டு]", title: "[மேடைக்கான தயாரிப்பு]", text: "[அரங்கேற்றத்திற்கான தயாரிப்பு பற்றி.]" },
      { year: "2027", title: "அரங்கேற்றம்", text: "முதல் தனி நடன நிகழ்ச்சி — விவரங்கள் விரைவில் அறிவிக்கப்படும்." },
    ],
  },
  gallery: {
    label: "படங்கள்",
    heading: ["அசைவில்", "உறைந்த கணங்கள்"],
    note: "தேர்ந்தெடுக்கப்பட்ட கணங்கள் — மேடையில், பயிற்சியில், அமைதியில்.",
    alts: Array.from({ length: 8 }, (_, i) => `பரதநாட்டிய நிகழ்ச்சி ${i + 1} — தற்காலிகப் புகைப்படம்`),
    open: "படத்தைத் திற", close: "மூடு", next: "அடுத்த படம்", prev: "முந்தைய படம்",
  },
  arangetram: {
    label: "வரவிருக்கும்",
    title: "அரங்கேற்றம்",
    year: "2027",
    text: "அரங்கேற்றம் — ஒரு நடனக் கலைஞரின் முதல் முழுமையான தனி நிகழ்ச்சி — பல ஆண்டுகால அர்ப்பணிப்பின் நிறைவு. ஒரு புதிய அத்தியாயம் தயாராகிறது.",
    soon: "விரைவில்",
    details: "தேதியும் இடமும் பின்னர் அறிவிக்கப்படும்",
  },
  contact: {
    label: "தொடர்பு",
    heading: ["ஒரு உரையாடலைத்", "தொடங்குவோம்"],
    text: "நிகழ்ச்சிகள், கூட்டுப்பணிகள் மற்றும் விசாரணைகளுக்கு.",
    emailLabel: "மின்னஞ்சல்",
    follow: "பின்தொடர",
    based: "இருப்பிடம்",
    location: "மலேசியா",
    rights: "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
    top: "மேலே செல்",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, ta };
