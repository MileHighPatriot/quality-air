import type { MetadataRoute } from "next";
import { liveUrl } from "@/data/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${liveUrl}/sitemap.xml` };
}
