import { Intro } from "@/components/layout/Intro";
import { Navigation } from "@/components/layout/Navigation";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Art } from "@/components/sections/Art";
import { Journey } from "@/components/sections/Journey";
import { Gallery } from "@/components/sections/Gallery";
import { Arangetram } from "@/components/sections/Arangetram";
import { Contact } from "@/components/sections/Contact";
import { site } from "@/content/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: site.brand,
  url: site.siteUrl,
  jobTitle: "Bharatanatyam Artist",
  homeLocation: { "@type": "Country", name: site.location },
  knowsAbout: ["Bharatanatyam", "Indian classical dance"],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Intro />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Art />
        <Journey />
        <Gallery />
        <Arangetram />
      </main>
      <Contact />
    </>
  );
}
