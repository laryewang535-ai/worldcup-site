import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { fetchSchedule } from "@/lib/api";
import { MATCHES_PAGE_REVALIDATE } from "@/lib/matchesSource";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AdSlot } from "@/components/AdSlot";
import { MatchCard } from "@/components/MatchCard";
import { localDateKey } from "@/lib/format";

export const metadata: Metadata = {
  title: "Schedule",
  description:
    "Filter upcoming fixtures by local calendar day with automatic timezone conversion—no wagering content.",
};

/** 与 R2 / MATCHES_CACHE_TTL_SECONDS 对齐的 ISR 周期 */
export const revalidate = MATCHES_PAGE_REVALIDATE;

function todayKey(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function tomorrowKey(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default async function SchedulePage({
  searchParams,
}: {
  searchParams?: { day?: string; view?: string };
}) {
  const matches = await fetchSchedule();
  const view = searchParams?.view ?? "all";
  const dayFilter = searchParams?.day;

  const today = todayKey();
  const tomorrow = tomorrowKey();

  let filtered = matches;
  if (view === "today") {
    filtered = matches.filter((m) => localDateKey(m.kickoffUtc) === today);
  } else if (view === "tomorrow") {
    filtered = matches.filter((m) => localDateKey(m.kickoffUtc) === tomorrow);
  } else if (dayFilter) {
    filtered = matches.filter((m) => localDateKey(m.kickoffUtc) === dayFilter);
  }

  const dates = Array.from(new Set(matches.map((m) => localDateKey(m.kickoffUtc))))
    .filter((d) => d !== "invalid-date")
    .sort();

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Schedule" }]} />
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Match schedule
        </h1>
        <p className="max-w-2xl text-slate-600 dark:text-slate-400">
          Kickoff times use your device timezone. Status labels follow a simple model: Upcoming, Live
          (Delayed), or Full Time.
        </p>
      </header>

      <AdSlot variant="top" />

      <div className="flex flex-wrap gap-2">
        <FilterChip href="/schedule" active={view === "all" && !dayFilter}>
          All matches
        </FilterChip>
        <FilterChip href="/schedule?view=today" active={view === "today"}>
          Today
        </FilterChip>
        <FilterChip href="/schedule?view=tomorrow" active={view === "tomorrow"}>
          Tomorrow
        </FilterChip>
      </div>

      <div className="flex flex-wrap gap-2 text-sm">
        <span className="text-slate-500 dark:text-slate-400">Jump to date:</span>
        {dates.map((d) => (
          <Link
            key={d}
            href={`/schedule?day=${d}`}
            className={`rounded-full border px-3 py-1 ${
              dayFilter === d
                ? "border-brand-accent bg-emerald-500/10 text-emerald-800 dark:text-emerald-200"
                : "border-slate-200 hover:border-brand-accent dark:border-slate-700"
            }`}
          >
            {d}
          </Link>
        ))}
      </div>

      <div className="space-y-6">
        {filtered.map((m, idx) => (
          <div key={m.id} id={m.id} className="space-y-4">
            <MatchCard match={m} />
            {idx % 4 === 3 && idx !== filtered.length - 1 ? (
              <AdSlot variant="inline" label="List advertisement" />
            ) : null}
          </div>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-slate-600 dark:text-slate-400">
          No fixtures for this filter yet—try another day or view all matches.
        </p>
      ) : null}

      <AdSlot variant="bottom" />
    </div>
  );
}

function FilterChip({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
        active
          ? "bg-brand-navy text-white dark:bg-emerald-600 dark:text-white"
          : "border border-slate-200 bg-white text-slate-800 hover:border-brand-accent dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
      }`}
    >
      {children}
    </Link>
  );
}
