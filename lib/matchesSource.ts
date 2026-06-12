import type { MatchRecord } from "@/lib/types";
import { MATCHES } from "@/lib/data/matches";
import { fetchMatchesFromFootballData } from "@/lib/live/footballData";

const MOCK: MatchRecord[] = MATCHES;

/** Default is 3 minutes, matching the scores polling interval to reduce upstream and BFF load. */
const DEFAULT_CACHE_TTL_SECONDS = 180;

/** Page ISR revalidate value in seconds, aligned with R2 fetch and memory-cache defaults. */
export const MATCHES_PAGE_REVALIDATE = DEFAULT_CACHE_TTL_SECONDS;

function isMatchRecord(x: unknown): x is MatchRecord {
  if (!x || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  if (
    typeof o.id !== "string" ||
    typeof o.homeId !== "string" ||
    typeof o.awayId !== "string" ||
    typeof o.kickoffUtc !== "string" ||
    typeof o.stage !== "string" ||
    (o.status !== "Upcoming" && o.status !== "Live" && o.status !== "Full Time")
  ) {
    return false;
  }
  if (Number.isNaN(Date.parse(o.kickoffUtc))) return false;
  return true;
}

/** Read the schedule JSON URL; the new variable wins while MATCHES_JSON_URL remains supported. */
function resolveFeedUrl(): string | undefined {
  const primary = process.env.MATCHES_FEED_URL?.trim();
  if (primary) return primary;
  return process.env.MATCHES_JSON_URL?.trim() || undefined;
}

/** Shallow-copy match rows so callers cannot mutate the cached array. */
function cloneRecords(rows: MatchRecord[]): MatchRecord[] {
  return rows.map((m) => ({ ...m, events: m.events ? [...m.events] : undefined }));
}

/** Cache key helper: unchanged configuration reuses the same TTL entry. */
function cacheIdentityKey(): string {
  return [
    process.env.MATCHES_FEED_URL ?? "",
    process.env.MATCHES_JSON_URL ?? "",
    process.env.MATCHES_FEED_AUTHORIZATION ?? "",
    process.env.FOOTBALL_DATA_KEY ?? "",
    process.env.FOOTBALL_DATA_COMPETITION_CODE ?? "",
  ].join("\t");
}

/** Cache duration in seconds; unset or invalid values fall back to 180 seconds. */
function cacheTtlSeconds(): number {
  const raw = process.env.MATCHES_CACHE_TTL_SECONDS?.trim();
  const n = raw ? Number(raw) : NaN;
  if (Number.isFinite(n) && n > 0) return Math.floor(n);
  return DEFAULT_CACHE_TTL_SECONDS;
}

function cacheTtlMs(): number {
  return cacheTtlSeconds() * 1000;
}

type MemoryCache = { key: string; expires: number; matches: MatchRecord[] };
let memoryCache: MemoryCache | null = null;

/** Fetch MatchRecord[] from an HTTPS URL with an optional Authorization header, such as a bearer token. */
async function tryRemoteMatchesJson(url: string): Promise<MatchRecord[] | null> {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), 12_000);
  const auth = process.env.MATCHES_FEED_AUTHORIZATION?.trim();
  const headers: Record<string, string> = { Accept: "application/json" };
  if (auth) headers.Authorization = auth;
  try {
    const res = await fetch(url, {
      signal: ac.signal,
      next: { revalidate: cacheTtlSeconds() },
      headers,
    });
    if (!res.ok) {
      console.warn("[matchesSource] feed HTTP", res.status, url.slice(0, 80));
      return null;
    }
    const data = (await res.json()) as unknown;
    if (!Array.isArray(data)) {
      console.warn("[matchesSource] feed JSON root must be an array");
      return null;
    }
    const parsed = data.filter(isMatchRecord);
    if (!parsed.length) {
      console.warn("[matchesSource] feed contains no valid MatchRecord entries; check lib/types.ts");
      return null;
    }
    return parsed;
  } catch (e) {
    console.warn("[matchesSource] feed request failed", e);
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Perform one upstream fetch without application-level caching. fromRemote=true means data came from feed or football-data.
 */
async function fetchRemoteMatchesOnce(): Promise<{ matches: MatchRecord[]; fromRemote: boolean }> {
  const feedUrl = resolveFeedUrl();
  if (feedUrl) {
    const remote = await tryRemoteMatchesJson(feedUrl);
    if (remote?.length) return { matches: cloneRecords(remote), fromRemote: true };
  }

  const token = process.env.FOOTBALL_DATA_KEY?.trim();
  const competition = process.env.FOOTBALL_DATA_COMPETITION_CODE?.trim() ?? "WC";
  if (token) {
    const live = await fetchMatchesFromFootballData(token, competition);
    if (live?.length) return { matches: cloneRecords(live), fromRemote: true };
  }

  if (feedUrl || token) {
    console.warn("[matchesSource] remote source is configured but failed or returned empty data; falling back to demo data");
  }
  return { matches: MOCK, fromRemote: false };
}

/**
 * Unified schedule data source with intentionally simple configuration:
 * 1. MATCH_DATA_SOURCE=mock -> always use local demo data without caching.
 * 2. MATCHES_FEED_URL, or legacy MATCHES_JSON_URL -> GET MatchRecord[] JSON.
 * 3. FOOTBALL_DATA_KEY → football-data.org
 * 4. If none are available -> local mock data.
 *
 * Successful remote results are cached in-process for MATCHES_CACHE_TTL_SECONDS, default 180, to reduce repeat requests.
 */
export async function resolveMatches(): Promise<MatchRecord[]> {
  try {
    const source = (process.env.MATCH_DATA_SOURCE ?? "").toLowerCase();
    if (source === "mock") return MOCK;

    const key = cacheIdentityKey();
    const ttl = cacheTtlMs();
    const now = Date.now();

    if (memoryCache && memoryCache.key === key && memoryCache.expires > now) {
      return cloneRecords(memoryCache.matches);
    }

    const { matches, fromRemote } = await fetchRemoteMatchesOnce();

    if (fromRemote) {
      memoryCache = { key, expires: now + ttl, matches: cloneRecords(matches) };
    } else {
      memoryCache = null;
    }

    return matches;
  } catch (e) {
    console.error("[matchesSource] resolveMatches failed; falling back to mock data", e);
    memoryCache = null;
    return MOCK;
  }
}
