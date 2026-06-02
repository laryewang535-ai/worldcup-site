import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { AffiliatePromoStrip } from "@/components/AffiliatePromoStrip";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MatchCard } from "@/components/MatchCard";
import { cityForMatch } from "@/lib/data/cities";
import { MATCHES } from "@/lib/data/matches";
import { getTeamById } from "@/lib/data/teams";
import { formatLocalKickoff } from "@/lib/format";
import { findMatchBySlug, matchSlug, matchTitle } from "@/lib/matchSeo";

type Props = { params: { matchSlug: string } };

export async function generateStaticParams() {
  return MATCHES.map((match) => ({ matchSlug: matchSlug(match) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const match = findMatchBySlug(MATCHES, params.matchSlug);
  if (!match) return { title: "World Cup match" };
  const title = matchTitle(match);
  const city = cityForMatch(match);
  return {
    title: `${title} time, venue, and local kickoff`,
    description: `${title} World Cup 2026 match guide with local kickoff time, ${city.name} venue information, calendar download, and related team fixtures.`,
  };
}

export default async function MatchDetailPage({ params }: Props) {
  const matches = MATCHES;
  const match = findMatchBySlug(matches, params.matchSlug);
  if (!match) notFound();

  const city = cityForMatch(match);
  const title = matchTitle(match);
  const home = getTeamById(match.homeId);
  const away = getTeamById(match.awayId);
  const related = matches
    .filter((m) => m.id !== match.id && [m.homeId, m.awayId].some((id) => id === match.homeId || id === match.awayId))
    .slice(0, 4);

  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Matches", href: "/schedule" },
          { label: title },
        ]}
      />

      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-accent">
          {match.stage} · {city.name}
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
          {title} World Cup 2026 match time and guide
        </h1>
        <p className="max-w-3xl text-lg text-slate-600 dark:text-slate-400">
          Follow kickoff time, venue context, related team fixtures, and calendar reminders for this
          wagering-free match guide.
        </p>
      </header>

      <AdSlot variant="top" />

      <MatchCard match={match} />

      <div className="grid gap-4 md:grid-cols-3">
        <InfoPanel label="Local kickoff" value={formatLocalKickoff(match.kickoffUtc)} />
        <InfoPanel label="Venue" value={match.stadium ?? city.stadium} />
        <InfoPanel label="Host city" value={`${city.name}, ${city.country}`} href={`/cities/${city.slug}`} />
      </div>

      <div className="flex flex-wrap gap-3">
        <a
          href={`/api/calendar/match/${match.id}`}
          className="rounded-lg bg-brand-navy px-4 py-2 text-sm font-semibold text-white hover:opacity-95 dark:bg-emerald-600"
        >
          Add this match to calendar
        </a>
        {home ? (
          <Link href={`/teams/${home.id}`} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold hover:border-brand-accent dark:border-slate-700">
            {home.name} fixtures
          </Link>
        ) : null}
        {away ? (
          <Link href={`/teams/${away.id}`} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold hover:border-brand-accent dark:border-slate-700">
            {away.name} fixtures
          </Link>
        ) : null}
      </div>

      <section aria-labelledby="impact-heading" className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <h2 id="impact-heading" className="text-xl font-bold text-slate-900 dark:text-white">
          Standings impact
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          This fixture belongs to {match.stage}. Use the standings page to check points, goal difference,
          and qualification placeholders as results update.
        </p>
        <Link href="/standings" className="mt-4 inline-flex text-sm font-semibold text-brand-accent hover:underline">
          View group standings
        </Link>
      </section>

      <AdSlot variant="inline" label="Match guide advertisement" />
      <AffiliatePromoStrip variant="match" />

      {related.length ? (
        <section aria-labelledby="related-matches" className="space-y-4">
          <h2 id="related-matches" className="text-xl font-bold text-slate-900 dark:text-white">
            Related team fixtures
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {related.map((m) => (
              <MatchCard key={m.id} match={m} showLink />
            ))}
          </div>
        </section>
      ) : null}

      <AdSlot variant="bottom" />
    </div>
  );
}

function InfoPanel({ label, value, href }: { label: string; value: string; href?: string }) {
  const content = <div className="text-base font-bold text-slate-900 dark:text-white">{value}</div>;
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</div>
      {href ? (
        <Link href={href} className="mt-2 block hover:text-brand-accent">
          {content}
        </Link>
      ) : (
        <div className="mt-2">{content}</div>
      )}
    </div>
  );
}
