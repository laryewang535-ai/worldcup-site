import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { AffiliatePromoStrip } from "@/components/AffiliatePromoStrip";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MatchCard } from "@/components/MatchCard";
import { fetchSchedule } from "@/lib/api";
import { MATCHES_PAGE_REVALIDATE } from "@/lib/matchesSource";
import { localDateKey } from "@/lib/format";

export const metadata: Metadata = {
  title: "World Cup Matches Today",
  description:
    "World Cup 2026 matches today with local kickoff times, live-score links, and the next available fixtures when no match is scheduled.",
};

export const revalidate = MATCHES_PAGE_REVALIDATE;
export const dynamic = "force-dynamic";

function todayKey(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default async function TodayPage() {
  const matches = await fetchSchedule();
  const today = todayKey();
  const todaysMatches = matches.filter((match) => localDateKey(match.kickoffUtc) === today);
  const upcoming = matches
    .filter((match) => new Date(match.kickoffUtc).getTime() >= Date.now())
    .sort((a, b) => new Date(a.kickoffUtc).getTime() - new Date(b.kickoffUtc).getTime())
    .slice(0, 6);
  const displayMatches = todaysMatches.length ? todaysMatches : upcoming;

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Today" }]} />
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-accent">
          Local time · No odds · No wagering
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          World Cup matches today
        </h1>
        <p className="max-w-3xl text-slate-600 dark:text-slate-400">
          Track today&apos;s World Cup 2026 games in your device timezone. If no match is scheduled today,
          the next available fixtures are shown so fans still have a useful schedule entry point.
        </p>
      </header>

      <AdSlot variant="top" />

      <div className="flex flex-wrap gap-3">
        <Link href="/scores" className="rounded-lg bg-brand-navy px-4 py-2 text-sm font-semibold text-white hover:opacity-95 dark:bg-emerald-600">
          Live scores
        </Link>
        <Link href="/subscribe" className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold hover:border-brand-accent dark:border-slate-700">
          Get daily reminders
        </Link>
        <Link href="/schedule" className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold hover:border-brand-accent dark:border-slate-700">
          Full schedule
        </Link>
      </div>

      <section aria-labelledby="today-list" className="space-y-4">
        <h2 id="today-list" className="text-xl font-bold text-slate-900 dark:text-white">
          {todaysMatches.length ? "Today's fixtures" : "Next available fixtures"}
        </h2>
        <div className="grid gap-4">
          {displayMatches.map((match) => (
            <MatchCard key={match.id} match={match} showLink />
          ))}
        </div>
        {!displayMatches.length ? (
          <p className="text-sm text-slate-600 dark:text-slate-400">
            No fixtures are available in the current schedule source.
          </p>
        ) : null}
      </section>

      <AdSlot variant="inline" label="Today page advertisement" />
      <AffiliatePromoStrip variant="home" />
      <AdSlot variant="bottom" />
    </div>
  );
}
