import type { MatchRecord } from "@/lib/types";

const DEFAULT_OPENING_MS = Date.parse("2026-06-11T22:00:00.000Z");

/**
 * Resolve the homepage countdown target timestamp in UTC milliseconds:
 * 1. Prefer NEXT_PUBLIC_COUNTDOWN_TARGET_ISO so it can be aligned with the real opener.
 * 2. Otherwise use the earliest scheduled kickoff after the current time.
 * 3. Otherwise use the built-in default opener time.
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
