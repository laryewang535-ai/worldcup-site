import type { MetadataRoute } from "next";

const ORIGIN = process.env.NEXT_PUBLIC_SITE_URL ?? "https://worldcup2026-hub.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${ORIGIN}/sitemap.xml`,
  };
}
