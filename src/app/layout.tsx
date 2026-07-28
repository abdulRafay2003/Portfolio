import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { site } from "@/lib/site";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { Cursor } from "@/components/interaction/cursor";
import { GrainOverlay } from "@/components/visuals/ambient";
import { Preloader } from "@/components/layout/preloader";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/layout/scroll-progress";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  axes: ["opsz"],
});

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const description =
  "Abdul Rafay is a Senior React Native Engineer and mobile architect with 5+ years shipping production iOS and Android products — real-time video, payments, and offline-tolerant apps used worldwide.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Senior React Native Engineer & Mobile Architect`,
    template: `%s — ${site.name}`,
  },
  description,
  keywords: [
    "React Native Developer",
    "Senior Mobile Engineer",
    "Mobile Architect",
    "iOS Developer",
    "Android Developer",
    "TypeScript",
    "WebRTC",
    "Abdul Rafay",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Senior React Native Engineer`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Senior React Native Engineer`,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#08080C",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/** Rich result for the person behind the site. */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  email: site.email,
  url: site.url,
  image: `${site.url}/profile.webp`,
  address: { "@type": "PostalAddress", addressLocality: "Karachi", addressCountry: "PK" },
  sameAs: [site.socials.github, site.socials.linkedin],
  alumniOf: { "@type": "CollegeOrUniversity", name: "University of Karachi" },
  knowsAbout: ["React Native", "TypeScript", "Mobile Architecture", "iOS", "Android", "WebRTC"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // Static, author-controlled object — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-chalk focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-void"
        >
          Skip to content
        </a>

        <SmoothScrollProvider>
          <Preloader />
          <Cursor />
          <GrainOverlay />
          <ScrollProgress />
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
