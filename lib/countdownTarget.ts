import type { MatchRecord } from "@/lib/types";

const DEFAULT_OPENING_MS = Date.parse("2026-06-11T22:00:00.000Z");

/**
 * 解析首页倒计时目标时间戳（毫秒 UTC）：
 * 1. 优先使用 NEXT_PUBLIC_COUNTDOWN_TARGET_ISO（便于与真实揭幕战对齐）
 * 2. 否则取赛程中「当前时刻之后」的最早一场开赛时间
 * 3. 再否则使用内置默认揭幕时间
 */
export function resolveCountdownKickoffMs(matches: MatchRecord[]): number {
  const raw = process.env.NEXT_PUBLIC_COUNTDOWN_TARGET_ISO?.trim();
  const envMs = raw ? Date.parse(raw) : NaN;
  if (Number.isFinite(envMs)) return envMs;

  const now = Date.now();
  let best = Number.POSITIVE_INFINITY;
  for (const m of matches) {
    const t = Date.parse(m.kickoffUtc);
    if (!Number.isFinite(t) || t <= now) continue;
    if (t < best) best = t;
  }
  if (best !== Number.POSITIVE_INFINITY) return best;

  return DEFAULT_OPENING_MS;
}
