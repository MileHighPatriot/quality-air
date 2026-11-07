import type { Metadata } from "next";
import { site } from "@/data/site";

export const homeTitle = `${site.name} | Furnace and AC Repair in Aurora, CO`;

/** og.jpg is 1200x630 and carries a visible "Concept site by 5280 Web Solutions" line. */
export const ogImage = {
  url: "og.jpg",
  width: 1200,
  height: 630,
  alt: `${site.name} concept project card with a Concept site label`,
};

/**
 * Canonical, og:url and share tags for one page. `path` has a trailing slash and resolves against
 * metadataBase, so the build's base path (/quality-air/ on github.io) appears exactly once.
 * Next replaces a parent's whole openGraph/twitter object, so every field is set here.
 */
export function pageMeta({ title, description, path }: { title?: string; description?: string; path: string }): Metadata {
  const shareTitle = `${title ? `${title} | ${site.name}` : homeTitle} (concept)`;
  const shareDescription = description ?? site.description;
  return {
    ...(title && { title }),
    ...(description && { description }),
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: `${site.name} (concept)`,
      title: shareTitle,
      description: shareDescription,
      url: path,
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title: shareTitle, description: shareDescription, images: [ogImage.url] },
  };
}
