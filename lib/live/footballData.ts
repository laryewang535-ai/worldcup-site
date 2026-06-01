import { http } from "@/lib/http";
import type { MatchRecord, MatchStatus } from "@/lib/types";
import { slugify } from "@/lib/slug";

const FOOTBALL_DATA_BASE = "https://api.football-data.org/v4";

type FdTeam = { name?: string; shortName?: string };
type FdScore = { fullTime?: { home: number | null; away: number | null } };
type FdMatch = {
  id?: number;
  utcDate?: string;
  status?: string;
  matchday?: number | null;
  stage?: string;
  group?: string | null;
  homeTeam?: FdTeam;
  awayTeam?: FdTeam;
  score?: FdScore;
};

type FdMatchesResponse = { matches?: FdMatch[] };

function mapFdStatus(raw: string | undefined): MatchStatus {
  const u = (raw ?? "").toUpperCase();
  if (u === "FINISHED" || u === "AWARDED") return "Full Time";
  if (u === "LIVE" || u === "IN_PLAY" || u === "PAUSED") return "Live";
  // football-data v4：SCHEDULED / TIMED / POSTPONED 等未开赛状态
  return "Upcoming";
}

function buildStage(m: FdMatch): string {
  const md = m.matchday != null ? String(m.matchday) : "—";
  if (m.group) return `${String(m.group).replace(/_/g, " ")} · Matchday ${md}`;
  if (m.stage) return `${String(m.stage).replace(/_/g, " ")} · Matchday ${md}`;
  return `Matchday ${md}`;
}

function mapOne(m: FdMatch): MatchRecord | null {
  if (m.id == null || !m.utcDate || !m.homeTeam?.name || !m.awayTeam?.name) return null;
  const status = mapFdStatus(m.status);
  const homeName = m.homeTeam.name;
  const awayName = m.awayTeam.name;
  const homeId = slugify(homeName);
  const awayId = slugify(awayName);
  const ft = m.score?.fullTime;
  const homeScore =
    status === "Upcoming" ? undefined : ft?.home != null && ft.home >= 0 ? ft.home : undefined;
  const awayScore =
    status === "Upcoming" ? undefined : ft?.away != null && ft.away >= 0 ? ft.away : undefined;

  return {
    id: `fd-${m.id}`,
    homeId,
    awayId,
    homeDisplay: homeName,
    awayDisplay: awayName,
    kickoffUtc: m.utcDate,
    stage: buildStage(m),
    status,
    homeScore,
    awayScore,
    featured: false,
  };
}

/**
 * 从 football-data.org 拉取指定赛事赛程（需 FOOTBALL_DATA_KEY）。
 * 免费档可能对 WC 有限制；失败时返回 null，由上层回退 mock。
 */
export async function fetchMatchesFromFootballData(
  token: string,
  competitionCode: string,
): Promise<MatchRecord[] | null> {
  const code = competitionCode.trim() || "WC";
  const url = `${FOOTBALL_DATA_BASE}/competitions/${encodeURIComponent(code)}/matches`;
  try {
    const res = await http.get<FdMatchesResponse>(url, {
      headers: { "X-Auth-Token": token },
    });
    const raw = res.data?.matches;
    if (!Array.isArray(raw) || raw.length === 0) return null;
    const out: MatchRecord[] = [];
    for (const row of raw) {
      const rec = mapOne(row);
      if (rec) out.push(rec);
    }
    return out.length ? out : null;
  } catch (e) {
    console.warn("[football-data] fetch failed", e);
    return null;
  }
}
