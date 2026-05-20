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

export const metadata: Metadata = {
  title: "Home",
  description:
    "Opening countdown, featured fixtures, a three-day schedule preview, and the latest full-time results ticker.",
};

/** 首页赛程与数据源缓存对齐（默认 3 分钟，见 MATCHES_CACHE_TTL_SECONDS） */
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

      <section aria-labelledby="featured-heading" className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <h2 id="featured-heading" className="text-xl font-bold text-slate-900 dark:text-white">
            Today&apos;s spotlight fixtures
          </h2>
          <Link href="/schedule" className="text-sm font-semibold text-brand-accent hover:underline">
            Full schedule
          </Link>
        </div>
        {/* 中等屏两列、大屏三列，减轻单卡过窄导致文字挤压 */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {featured.map((m) => (
            <MatchCard key={m.id} match={m} showLink />
          ))}
        </div>
      </section>

      <AffiliatePromoStrip variant="home" />

      <section aria-labelledby="three-day-heading" className="space-y-4">
        <h2 id="three-day-heading" className="text-xl font-bold text-slate-900 dark:text-white">
          Three-day window preview
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Showing the earliest triple batch of calendar dates present in the dataset—swap for live API dates in
          production.
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
