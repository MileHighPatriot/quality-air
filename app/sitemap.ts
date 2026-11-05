import type { MetadataRoute } from "next";
import { nav } from "@/data/nav";
import { liveUrl } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return nav.map((item) => ({ url: `${liveUrl}${item.href}`, changeFrequency: "monthly", priority: item.href === "/" ? 1 : 0.7 }));
}
