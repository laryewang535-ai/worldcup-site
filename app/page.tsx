import type { Metadata } from "next";
import Link from "next/link";
import { fetchSchedule } from "@/lib/api";
import { MATCHES_PAGE_REVALIDATE } from "@/lib/matchesSource";
import { CountdownHero } from "@/components/Countdown";
import { AdSlot } from "@/components/AdSlot";
import { AffiliatePromoStrip } from "@/components/AffiliatePromoStrip";
import { ResultsTicker } from "@/components/ResultsTicker";
import { MatchCard } from "@/components/MatchCard";
import { localDateKey } from "@/lib/format";
import { resolveCountdownKickoffMs } from "@/lib/countdownTarget";
import { CITIES } from "@/lib/data/cities";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Opening countdown, featured fixtures, host city guides, and local kickoff times for World Cup 2026.",
};

/** Align homepage schedule refresh with the data-source cache; default is 3 minutes via MATCHES_CACHE_TTL_SECONDS. */
export const revalidate = MATCHES_PAGE_REVALIDATE;

export default async function HomePage() {
  const matches = await fetchSchedule();
  const kickoffUtcMs = resolveCountdownKickoffMs(matches);
  const featured =
    matches.filter((m) => m.featured).length > 0
      ? matches.filter((m) => m.featured).slice(0, 3)
      : [...matches].slice(0, 3);

  const distinctDays = Array.from(new Set(matches.map((m) => localDateKey(m.kickoffUtc))))
    .filter((d) => d !== "invalid-date")
    .sort();
  const previewDays = distinctDays.slice(0, 3);
  const threeDay = matches
    .filter((m) => previewDays.includes(localDateKey(m.kickoffUtc)))
    .sort((a, b) => new Date(a.kickoffUtc).getTime() - new Date(b.kickoffUtc).getTime())
    .slice(0, 10);

  return (
    <div className="space-y-10">
      <AdSlot variant="top" />

      <CountdownHero kickoffUtcMs={kickoffUtcMs} />

      <section aria-labelledby="today-heading" className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-accent">
              Local kickoff times
            </p>
            <h2 id="today-heading" className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
              Today&apos;s World Cup matches
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
              A dedicated SEO entry for today&apos;s fixtures, live-score links, and the next available
              matches when the tournament is between match days.
            </p>
          </div>
          <Link href="/today" className="inline-flex shrink-0 rounded-lg bg-brand-navy px-4 py-2 text-sm font-semibold text-white hover:opacity-95 dark:bg-emerald-600">
            View today&apos;s matches
          </Link>
        </div>
      </section>

      <section aria-labelledby="featured-heading" className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <h2 id="featured-heading" className="text-xl font-bold text-slate-900 dark:text-white">
            Today&apos;s spotlight fixtures
          </h2>
          <Link href="/schedule" className="text-sm font-semibold text-brand-accent hover:underline">
            Full schedule
          </Link>
        </div>
        {/* Two columns on medium screens and three on large screens to keep cards readable. */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {featured.map((m) => (
            <MatchCard key={m.id} match={m} showLink />
          ))}
        </div>
      </section>

      <AffiliatePromoStrip variant="home" />

      <section aria-labelledby="city-guides-heading" className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <h2 id="city-guides-heading" className="text-xl font-bold text-slate-900 dark:text-white">
            Host city watch guides
          </h2>
          <Link href="/cities" className="text-sm font-semibold text-brand-accent hover:underline">
            All cities
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {CITIES.slice(0, 6).map((city) => (
            <Link
              key={city.slug}
              href={`/cities/${city.slug}`}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-brand-accent dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="text-xs font-semibold uppercase tracking-wide text-brand-accent">
                {city.country}
              </div>
              <h3 className="mt-2 font-bold text-slate-900 dark:text-white">{city.name}</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{city.stadium}</p>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="three-day-heading" className="space-y-4">
        <h2 id="three-day-heading" className="text-xl font-bold text-slate-900 dark:text-white">
          Three-day window preview
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Showing the earliest available match dates currently listed on the site.
        </p>
        <div className="grid gap-4">
          {threeDay.map((m) => (
            <MatchCard key={m.id} match={m} showLink />
          ))}
        </div>
      </section>

      <section aria-labelledby="results-heading" className="space-y-3">
        <h2 id="results-heading" className="text-xl font-bold text-slate-900 dark:text-white">
          Latest full-time results
        </h2>
        <ResultsTicker matches={matches} />
      </section>

      <AdSlot variant="bottom" label="Bottom advertisement" />
    </div>
  );
}
