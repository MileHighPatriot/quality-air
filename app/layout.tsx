import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SeasonBanner from "@/components/SeasonBanner";
import { site } from "@/data/site";
import { asset } from "@/lib/asset";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1f4d3a",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Furnace and AC Repair in Aurora, CO`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  icons: { icon: { url: asset("/icon.svg"), type: "image/svg+xml" } },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-paper font-sans text-ink">
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
      </body>
    </html>
  );
}
