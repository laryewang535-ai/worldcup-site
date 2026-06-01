import { AxiosError } from "axios";
import type { ArticleRecord, MatchRecord } from "@/lib/types";
import { ARTICLES } from "@/lib/data/articles";
import { getStandingsByGroup } from "@/lib/data/standings";
import { TEAMS } from "@/lib/data/teams";
import { http } from "@/lib/http";
import { resolveMatches } from "@/lib/matchesSource";

export { http };

/**
 * TheSportsDB 等其它供应商可在此扩展；当前赛程统一走 resolveMatches。
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

/** 赛程 / 比分：见 lib/matchesSource.ts；配置 MATCHES_FEED_URL 或 FOOTBALL_DATA_KEY（.env.example） */
export async function fetchSchedule(): Promise<MatchRecord[]> {
  return resolveMatches();
}

/** 与 fetchSchedule 同源；客户端轮询请改用 GET /api/matches */
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
