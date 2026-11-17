import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans, Noto_Sans_Tamil } from "next/font/google";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { IntroProvider } from "@/components/providers/IntroProvider";
import { ScrollRefresher } from "@/components/providers/ScrollRefresher";
import { Cursor } from "@/components/layout/Cursor";
import { site } from "@/content/site";
import { dictionaries } from "@/content/dictionary";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
const notoTamil = Noto_Sans_Tamil({
  subsets: ["tamil"],
  weight: ["300", "400", "500"],
  variable: "--font-noto-tamil",
  display: "swap",
  preload: false,
});

const title = `${site.name} — Bharatanatyam Artist | ${site.brand}`;
const description = dictionaries.en.meta.description;

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: { default: title, template: `%s | ${site.brand}` },
  description,
  applicationName: site.brand,
  authors: [{ name: site.name }],
  keywords: ["Bharatanatyam", "Kalakshetra style", "Indian classical dance", "Malaysia", "Kiruthigaah Ramesh", "KIRU", "Arangetram 2027", "பரதநாட்டியம்"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.brand,
    title,
    description,
    locale: "en_MY",
    alternateLocale: ["ta_MY"],
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#10130f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${cormorant.variable} ${dmSans.variable} ${notoTamil.variable}`}>
      <head>
        <noscript>
          <style>{"[data-intro]{display:none!important}"}</style>
        </noscript>
      </head>
      <body className="grain" suppressHydrationWarning>
        <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-gold focus:px-5 focus:py-3 focus:text-ink">
          Skip to content
        </a>
        <LanguageProvider>
          <SmoothScroll>
            <IntroProvider>
              <ScrollRefresher />
              {children}
              <Cursor />
            </IntroProvider>
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
