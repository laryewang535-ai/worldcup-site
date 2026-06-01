"use client";

import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "wc2026_single_poll_v1";

type Option = { id: string; label: string };

const OPTIONS: Option[] = [
  { id: "possession", label: "Controlled possession builds" },
  { id: "transitions", label: "Direct transitions and counters" },
  { id: "setpieces", label: "Set-piece mastery decides tight games" },
];

/** 演示基线票数（无后端时用于可视化比例） */
const BASE: Record<string, number> = {
  possession: 128,
  transitions: 104,
  setpieces: 76,
};

export function PollsClient() {
  const [counts, setCounts] = useState<Record<string, number>>(BASE);
  const [vote, setVote] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { vote?: string };
        if (parsed.vote) setVote(parsed.vote);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const total = useMemo(
    () => OPTIONS.reduce((sum, o) => sum + (counts[o.id] ?? 0), 0),
    [counts],
  );

  function submit(optionId: string) {
    if (vote) return;
    setVote(optionId);
    setCounts((c) => ({ ...c, [optionId]: (c[optionId] ?? 0) + 1 }));
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ vote: optionId, ts: Date.now() }));
    } catch {
      /* ignore */
    }
  }

  if (!mounted) {
    return <p className="text-sm text-slate-500">Loading poll…</p>;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Which playing style do you expect to dominate the knockouts?
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          One vote per browser. Results update instantly on this device—swap in a backend later if you need
          global totals.
        </p>

        <div className="mt-6 space-y-3">
          {OPTIONS.map((o) => {
            const count = counts[o.id] ?? 0;
            const pct = total ? Math.round((count / total) * 1000) / 10 : 0;
            const active = vote === o.id;
            return (
              <button
                key={o.id}
                type="button"
                onClick={() => submit(o.id)}
                disabled={Boolean(vote)}
                className={`w-full rounded-xl border px-4 py-3 text-left transition ${
                  active
                    ? "border-brand-accent bg-emerald-500/10"
                    : "border-slate-200 hover:border-brand-accent dark:border-slate-700"
                } ${vote && !active ? "opacity-60" : ""}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-semibold text-slate-900 dark:text-slate-50">{o.label}</span>
                  <span className="text-sm font-bold tabular-nums text-brand-accent">{pct}%</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div
                    className="h-full rounded-full bg-brand-accent transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {vote ? (
          <p className="mt-4 text-sm font-medium text-emerald-700 dark:text-emerald-300">
            Thanks — your vote is locked on this device.
          </p>
        ) : (
          <p className="mt-4 text-sm text-slate-500">Tap an option to vote once.</p>
        )}
      </div>
    </div>
  );
}
