"use client";

import { useEffect, useMemo, useState } from "react";
import type { MatchRecord } from "@/lib/types";
import { MatchCard } from "@/components/MatchCard";
import { AdSlot } from "@/components/AdSlot";

function sortMatches(list: MatchRecord[]): MatchRecord[] {
  return [...list].sort((a, b) => {
    const aDone = a.status === "Full Time" ? 1 : 0;
    const bDone = b.status === "Full Time" ? 1 : 0;
    if (aDone !== bDone) return bDone - aDone;
    const tb = Date.parse(b.kickoffUtc);
    const ta = Date.parse(a.kickoffUtc);
    const sb = Number.isFinite(tb) ? tb : 0;
    const sa = Number.isFinite(ta) ? ta : 0;
    return sb - sa;
  });
}

async function fetchMatchesFromApi(): Promise<MatchRecord[]> {
  const res = await fetch("/api/matches", { cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = (await res.json()) as unknown;
  if (!Array.isArray(data)) throw new Error("INVALID_PAYLOAD");
  return data as MatchRecord[];
}

export function ScoresClient({ initial }: { initial: MatchRecord[] }) {
  const [matches, setMatches] = useState<MatchRecord[]>(initial);
  const [lastSync, setLastSync] = useState<Date>(() => new Date());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const id = setInterval(async () => {
      try {
        const next = await fetchMatchesFromApi();
        setMatches(sortMatches(next));
        setLastSync(new Date());
        setError(null);
      } catch {
        setError("Refresh failed — showing last successful snapshot.");
      }
    }, 3 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  const sorted = useMemo(() => sortMatches(matches), [matches]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Auto-refresh every 3 minutes (delayed scores). No odds or wagering content.
        </p>
        <p className="text-xs text-slate-500" suppressHydrationWarning>
          Last sync: {lastSync.toLocaleString()}
        </p>
      </div>
      {error ? <p className="text-sm text-amber-700 dark:text-amber-300">{error}</p> : null}

      <AdSlot variant="top" />

      <div className="space-y-6">
        {sorted.map((m, idx) => (
          <div key={m.id} className="space-y-4">
            <MatchCard match={m} />
            {m.events?.length ? (
              <ul className="ml-4 list-disc text-sm text-slate-600 dark:text-slate-400">
                {m.events.map((e, i) => (
                  <li key={`${m.id}-evt-${i}`}>{e}</li>
                ))}
              </ul>
            ) : null}
            {idx % 3 === 2 && idx !== sorted.length - 1 ? (
              <AdSlot variant="inline" label="Scores feed advertisement" />
            ) : null}
          </div>
        ))}
      </div>

      <AdSlot variant="bottom" />
    </div>
  );
}
