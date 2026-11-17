/**
 * BILINGUAL CONTENT — English & Tamil.
 *
 * Facts used (confirmed by the family): born 2004; began Bharatanatyam at
 * age 6 (2010); learned two years, paused one year, returned at age 9 (2013);
 * Salangai Pooja in December 2016 (age 12); Shivarpanam (2024); International
 * Cultural Day at HWUM (Feb 2026); Arangetram in 2027 — 17 years after she
 * began. Kalakshetra style, Malaysia. No awards, teachers or venues have been
 * invented — add them here as they become available.
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
  /** the artist's name, shown in the hero, header and footer */
  name: { first: string; last: string; full: string };
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
  name: { first: "Kiruthigaah", last: "Ramesh", full: "Kiruthigaah Ramesh" },
  stockAlt: "Bharatanatyam dancer — temporary stock photograph",
  artistAlt: "Kiruthigaah Ramesh performing Bharatanatyam",
  stockNote: "Temporary stock image",
  meta: {
    description:
      "Kiruthigaah Ramesh — Bharatanatyam artist from Malaysia, trained in the Kalakshetra style and dancing since the age of six. Arangetram 2027. Where Tradition Becomes Expression.",
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
      "Kiruthigaah Ramesh is a Bharatanatyam artist from Malaysia, trained in the Kalakshetra style — a tradition known for its clarity of line, precision and quiet intensity.",
      "She took her first steps in Bharatanatyam at the age of six. After two years of learning and a short pause, she returned to the art at nine — and this time, it held her. At twelve she received her Salangai Pooja, the blessing of her ankle bells, and began dancing as a performer.",
      "What began as a child's fascination with rhythm has become a lifelong devotion: years of patient practice, of adavus repeated until they became instinct, and of learning how a single glance can carry an entire story.",
      "Today she is preparing for her Arangetram in 2027 — seventeen years after her very first step — the debut solo performance that marks a dancer's coming of age in the art.",
    ],
    facts: [
      { label: "Art form", value: "Bharatanatyam" },
      { label: "Style", value: "Kalakshetra" },
      { label: "Dancing since", value: "Age 6 · 2010" },
      { label: "Salangai Pooja", value: "December 2016" },
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
    intro: "Seventeen years — from a six-year-old's first step to the threshold of her Arangetram. A path of discipline, devotion and joy.",
    milestones: [
      { year: "2010", title: "Age 6 · The first step",
        text: "Kiruthigaah begins learning Bharatanatyam — the first namaskaram, the first adavus, and the start of a lifelong conversation with rhythm. She trains for two years before a one-year pause." },
      { year: "2013", title: "Age 9 · Returning to the rhythm",
        text: "She comes back to the art with renewed devotion. Steady training in the Kalakshetra style builds the foundation: precise adavus, the clean geometry of the araimandi, and the patient study of hastas and abhinaya." },
      { year: "2016", title: "Age 12 · Salangai Pooja",
        text: "In December, her salangai — the ankle bells — are blessed and tied for the first time. A sacred rite of passage: from student to performer, ready to dance before an audience." },
      { year: "2024", title: "Shivarpanam",
        text: "Performing alongside fellow dancers in the stage production Shivarpanam, she learns what the classroom cannot teach: stage presence, stamina, and the quiet joy of sharing the art." },
      { year: "2026", title: "International Cultural Day",
        text: "A solo performance under the night sky at International Cultural Day, HWUM, in February — her dance growing into storytelling, from the many-armed goddess to the poetry of a single gesture." },
      { year: "2027", title: "Arangetram",
        text: "Seventeen years after her first step, her debut solo performance — the culmination of her training, offered before her guru, family and audience. Date and venue to be announced." },
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
  name: { first: "கிருத்திகா", last: "ரமேஷ்", full: "கிருத்திகா ரமேஷ்" },
  stockAlt: "பரதநாட்டியக் கலைஞர் — தற்காலிகப் புகைப்படம்",
  artistAlt: "கிருத்திகா ரமேஷ் — பரதநாட்டிய நிகழ்ச்சி",
  stockNote: "தற்காலிகப் படம்",
  meta: {
    description:
      "கிருத்திகா ரமேஷ் — மலேசியாவைச் சேர்ந்த கலாக்ஷேத்ரா பாணி பரதநாட்டியக் கலைஞர்; ஆறு வயது முதல் நடனமாடுகிறார். அரங்கேற்றம் 2027. மரபு வெளிப்பாடாக மலரும் இடம்.",
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
      "கிருத்திகா ரமேஷ் மலேசியாவைச் சேர்ந்த பரதநாட்டியக் கலைஞர். கோடுகளின் தெளிவு, துல்லியம், அமைதியான தீவிரம் ஆகியவற்றுக்குப் பெயர் பெற்ற கலாக்ஷேத்ரா பாணியில் பயிற்சி பெற்றவர்.",
      "ஆறு வயதில் பரதநாட்டியத்தில் தனது முதல் அடியை எடுத்து வைத்தார். இரண்டு ஆண்டுகள் பயின்று, ஒரு சிறு இடைவேளைக்குப் பின், ஒன்பது வயதில் மீண்டும் கலைக்குத் திரும்பினார் — இம்முறை அது அவரை முழுமையாக ஆட்கொண்டது. பன்னிரண்டு வயதில் சலங்கை பூஜை பெற்று, மேடைக் கலைஞராக ஆடத் தொடங்கினார்.",
      "தாளத்தின் மீதான ஒரு சிறுமியின் ஈர்ப்பாகத் தொடங்கியது, வாழ்நாள் அர்ப்பணிப்பாக வளர்ந்தது — இயல்பாகும் வரை மீண்டும் மீண்டும் பயிலப்பட்ட அடவுகள், ஒரே பார்வையில் முழுக் கதையையும் சொல்லக் கற்றுக்கொண்ட ஆண்டுகள்.",
      "இன்று, தனது முதல் அடிக்குப் பதினேழு ஆண்டுகளுக்குப் பின், 2027-இல் நடைபெறவிருக்கும் அரங்கேற்றத்திற்குத் தயாராகி வருகிறார் — ஒரு நடனக் கலைஞர் கலையில் முழுமை பெறுவதைக் குறிக்கும் முதல் தனி நிகழ்ச்சி அது.",
    ],
    facts: [
      { label: "கலை வடிவம்", value: "பரதநாட்டியம்" },
      { label: "பாணி", value: "கலாக்ஷேத்ரா" },
      { label: "நடனம் தொடங்கியது", value: "6 வயதில் · 2010" },
      { label: "சலங்கை பூஜை", value: "டிசம்பர் 2016" },
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
    intro: "பதினேழு ஆண்டுகள் — ஆறு வயதுச் சிறுமியின் முதல் அடியிலிருந்து அரங்கேற்றத்தின் வாசல் வரை. ஒழுக்கம், அர்ப்பணிப்பு, மகிழ்ச்சி நிறைந்த ஒரு பயணம்.",
    milestones: [
      { year: "2010", title: "6 வயது · முதல் அடி",
        text: "கிருத்திகா பரதநாட்டியம் கற்கத் தொடங்குகிறார் — முதல் நமஸ்காரம், முதல் அடவுகள், தாளத்துடனான வாழ்நாள் உரையாடலின் தொடக்கம். இரண்டு ஆண்டுகள் பயின்ற பின் ஓராண்டு இடைவேளை." },
      { year: "2013", title: "9 வயது · தாளத்திற்குத் திரும்புதல்",
        text: "புதுப்பிக்கப்பட்ட அர்ப்பணிப்புடன் கலைக்குத் திரும்புகிறார். கலாக்ஷேத்ரா பாணியின் தொடர் பயிற்சி அடித்தளம் அமைக்கிறது: துல்லியமான அடவுகள், அரைமண்டியின் தெளிவான வடிவியல், ஹஸ்தங்கள் மற்றும் அபிநயத்தின் பொறுமையான கற்றல்." },
      { year: "2016", title: "12 வயது · சலங்கை பூஜை",
        text: "டிசம்பரில் அவரது சலங்கைகள் முதன்முறையாக ஆசீர்வதிக்கப்பட்டுக் கட்டப்படுகின்றன. மாணவியிலிருந்து மேடைக் கலைஞராக — ரசிகர்கள் முன் ஆடத் தயாராகும் ஒரு புனிதச் சடங்கு." },
      { year: "2024", title: "சிவார்ப்பணம்",
        text: "‘சிவார்ப்பணம்’ மேடைத் தயாரிப்பில் சக நடனக் கலைஞர்களுடன் ஆடுவதன் மூலம், வகுப்பறை கற்றுத்தர முடியாதவற்றைக் கற்கிறார்: மேடை ஆளுமை, உறுதி, கலையைப் பகிர்வதன் அமைதியான மகிழ்ச்சி." },
      { year: "2026", title: "சர்வதேச கலாச்சார தினம்",
        text: "பிப்ரவரியில் HWUM-இல் நடைபெற்ற சர்வதேச கலாச்சார தினத்தில், இரவு வானின் கீழ் ஒரு தனி நிகழ்ச்சி — பல கரங்கள் கொண்ட தேவியிலிருந்து ஒற்றை முத்திரையின் கவிதை வரை, கதைசொல்லலாக வளரும் அவரது நடனம்." },
      { year: "2027", title: "அரங்கேற்றம்",
        text: "முதல் அடிக்குப் பதினேழு ஆண்டுகளுக்குப் பின், அவரது முதல் தனி நடன நிகழ்ச்சி — பயிற்சியின் நிறைவு, குரு, குடும்பம், ரசிகர்கள் முன்னிலையில் அர்ப்பணிக்கப்படுகிறது. தேதியும் இடமும் விரைவில் அறிவிக்கப்படும்." },
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
