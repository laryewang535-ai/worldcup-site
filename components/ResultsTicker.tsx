"use client";

import type { MatchRecord } from "@/lib/types";
import { getTeamById } from "@/lib/data/teams";

export function ResultsTicker({ matches }: { matches: MatchRecord[] }) {
  const done = matches
    .filter((m) => m.status === "Full Time" && m.homeScore != null && m.awayScore != null)
    .slice(0, 12);

  if (!done.length) return null;

  const text = done
    .map((m) => {
      const h = getTeamById(m.homeId)?.name ?? m.homeDisplay ?? m.homeId;
      const a = getTeamById(m.awayId)?.name ?? m.awayDisplay ?? m.awayId;
      return `${h} ${m.homeScore}–${m.awayScore} ${a}`;
    })
    .join("   ·   ");

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white py-2 text-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex animate-marquee whitespace-nowrap text-slate-700 dark:text-slate-200">
        <span className="px-4 font-semibold text-brand-accent">Latest full-time results</span>
        <span>{text}</span>
        <span className="px-8" aria-hidden>
          {text}
        </span>
      </div>
    </div>
  );
}
