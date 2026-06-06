import { AxiosError } from "axios";
import type { ArticleRecord, MatchRecord } from "@/lib/types";
import { ARTICLES } from "@/lib/data/articles";
import { getStandingsByGroup } from "@/lib/data/standings";
import { TEAMS } from "@/lib/data/teams";
import { http } from "@/lib/http";
import { resolveMatches } from "@/lib/matchesSource";

export { http };

/**
 * Extend this module for providers such as TheSportsDB; schedules currently go through resolveMatches.
 */
async function safeGet<T>(url: string, headers?: Record<string, string>): Promise<T | null> {
  try {
    const res = await http.get<T>(url, { headers });
    return res.data;
  } catch (e) {
    const err = e as AxiosError;
    console.warn("[api] request failed", err.message);
    return null;
  }
}

/** Schedule and scores: see lib/matchesSource.ts; configure MATCHES_FEED_URL or FOOTBALL_DATA_KEY in .env.example. */
export async function fetchSchedule(): Promise<MatchRecord[]> {
  return resolveMatches();
}

/** Uses the same source as fetchSchedule; client polling should use GET /api/matches. */
export async function fetchScores(): Promise<MatchRecord[]> {
  return resolveMatches();
}

export async function fetchStandings() {
  return getStandingsByGroup();
}

export async function fetchTeams() {
  return TEAMS;
}

export async function fetchNews(): Promise<ArticleRecord[]> {
  return ARTICLES;
}
