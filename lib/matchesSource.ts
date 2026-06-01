import type { MatchRecord } from "@/lib/types";
import { MATCHES } from "@/lib/data/matches";
import { fetchMatchesFromFootballData } from "@/lib/live/footballData";

const MOCK: MatchRecord[] = MATCHES;

/** 默认 3 分钟：与比分页轮询间隔一致，减轻外网与自建 BFF 压力 */
const DEFAULT_CACHE_TTL_SECONDS = 180;

/** 页面 ISR revalidate（秒），与 R2 fetch 及内存缓存默认对齐 */
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

/** 统一读取「赛程 JSON 地址」：新变量优先，兼容旧名 MATCHES_JSON_URL */
function resolveFeedUrl(): string | undefined {
  const primary = process.env.MATCHES_FEED_URL?.trim();
  if (primary) return primary;
  return process.env.MATCHES_JSON_URL?.trim() || undefined;
}

/** 浅拷贝赛程行，避免缓存数组被调用方 mutate */
function cloneRecords(rows: MatchRecord[]): MatchRecord[] {
  return rows.map((m) => ({ ...m, events: m.events ? [...m.events] : undefined }));
}

/** 用于命中缓存：配置不变则复用同一份 TTL */
function cacheIdentityKey(): string {
  return [
    process.env.MATCHES_FEED_URL ?? "",
    process.env.MATCHES_JSON_URL ?? "",
    process.env.MATCHES_FEED_AUTHORIZATION ?? "",
    process.env.FOOTBALL_DATA_KEY ?? "",
    process.env.FOOTBALL_DATA_COMPETITION_CODE ?? "",
  ].join("\t");
}

/** 缓存时长（秒），未设置或非法时使用默认 180 秒 */
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

/** 从 HTTPS 地址拉取 MatchRecord[]；可选 Authorization 头（如 Bearer token） */
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
      console.warn("[matchesSource] feed JSON 根节点须为数组");
      return null;
    }
    const parsed = data.filter(isMatchRecord);
    if (!parsed.length) {
      console.warn("[matchesSource] feed 中无合法 MatchRecord，请对照 lib/types.ts");
      return null;
    }
    return parsed;
  } catch (e) {
    console.warn("[matchesSource] feed 请求失败", e);
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * 实际拉取一次外网（无应用层缓存）。fromRemote=true 表示来自 feed 或 football-data。
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
    console.warn("[matchesSource] 已配置外网数据源但拉取失败或为空，已回退演示数据");
  }
  return { matches: MOCK, fromRemote: false };
}

/**
 * 统一赛程数据源（配置尽量简单）：
 * 1. MATCH_DATA_SOURCE=mock → 始终本地演示数据（不缓存）
 * 2. MATCHES_FEED_URL（或兼容 MATCHES_JSON_URL）→ GET MatchRecord[] JSON
 * 3. FOOTBALL_DATA_KEY → football-data.org
 * 4. 以上都不可用 → 本地 mock
 *
 * 外网成功结果在进程内缓存 MATCHES_CACHE_TTL_SECONDS（默认 180），减少重复请求。
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
    console.error("[matchesSource] resolveMatches 异常，回退 mock", e);
    memoryCache = null;
    return MOCK;
  }
}
