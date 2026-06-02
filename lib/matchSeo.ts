import type { MatchRecord } from "@/lib/types";
import { getTeamById } from "@/lib/data/teams";
import { slugify } from "@/lib/slug";

export function teamName(id: string, fallback?: string): string {
  return getTeamById(id)?.name ?? fallback ?? id;
}

export function matchSlug(match: MatchRecord): string {
  const day = match.kickoffUtc.slice(0, 10);
  return `${slugify(teamName(match.homeId, match.homeDisplay))}-vs-${slugify(
    teamName(match.awayId, match.awayDisplay),
  )}-${day}`;
}

export function findMatchBySlug(matches: MatchRecord[], slug: string): MatchRecord | undefined {
  return matches.find((match) => matchSlug(match) === slug);
}

export function matchTitle(match: MatchRecord): string {
  return `${teamName(match.homeId, match.homeDisplay)} vs ${teamName(
    match.awayId,
    match.awayDisplay,
  )}`;
}
