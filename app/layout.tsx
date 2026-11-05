import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Inter } from "next/font/google";
import type { ReactNode } from "react";
import CallBar from "@/components/CallBar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SeasonBanner from "@/components/SeasonBanner";
import { liveUrl, site } from "@/data/site";
import { asset } from "@/lib/asset";
import "./globals.css";

const display = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["800"],
  variable: "--font-hanken",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1f4d3a",
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(`${liveUrl}/`),
  title: {
    default: `${site.name} | Furnace and AC Repair in Aurora, CO`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  icons: { icon: { url: asset("/icon.svg"), type: "image/svg+xml" } },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: `${site.name} (concept)`,
    title: `${site.name} | Furnace and AC Repair in Aurora, CO`,
    description: site.description,
    images: [{ url: "og.jpg", width: 1200, height: 630, alt: `${site.name}: heat that shows up, cool that keeps up` }],
  },
  twitter: { card: "summary_large_image" },
};

/** Structured data for the fictional business, so the concept shows what a real client's site would include. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  name: site.name,
  description: `${site.description} Concept site by 5280 Web Solutions; not a real company.`,
  url: `${liveUrl}/`,
  telephone: site.phone,
  image: `${liveUrl}/og.jpg`,
  priceRange: "$$",
  address: { "@type": "PostalAddress", addressLocality: "Aurora", addressRegion: "CO", addressCountry: "US" },
  geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lon },
  areaServed: site.cities.map((c) => ({ "@type": "City", name: c.replace(/ \(.*\)/, "") })),
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: `${String(site.hours.open).padStart(2, "0")}:00`,
    closes: `${site.hours.close}:00`,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable} h-full antialiased`}>
      <body className="min-h-full bg-paper font-sans text-ink">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <aside aria-label="Concept project notice" className="border-b border-line bg-sand text-ink">
          <p className="wrap py-2 text-sm leading-5 text-pretty">
            Concept project: a sample site built by 5280 Web Solutions. {site.name} is not a real company.{" "}
            <a
              href="https://5280webs.com"
              className="tap font-bold whitespace-nowrap text-pine underline underline-offset-4 hover:text-ink"
            >
              See more at 5280webs.com
            </a>
          </p>
        </aside>
        <Header />
        <SeasonBanner />
        <main id="main">{children}</main>
        <Footer />
        <CallBar />
      </body>
    </html>
  );
}
