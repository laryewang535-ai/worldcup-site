import type { MetadataRoute } from "next";
import { ARTICLES } from "@/lib/data/articles";
import { TEAMS } from "@/lib/data/teams";

const ORIGIN = process.env.NEXT_PUBLIC_SITE_URL ?? "https://worldcup-info-hub.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/schedule",
    "/scores",
    "/standings",
    "/teams",
    "/news",
    "/polls",
    "/gear",
    "/subscribe",
    "/privacy",
    "/disclaimer",
    "/contact",
  ].map((path) => ({
    url: `${ORIGIN}${path}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: path === "/" ? 1 : 0.7,
  }));

  const articles = ARTICLES.map((a) => ({
    url: `${ORIGIN}/news/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const teams = TEAMS.map((t) => ({
    url: `${ORIGIN}/teams/${t.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.55,
  }));

  return [...staticRoutes, ...articles, ...teams];
}
