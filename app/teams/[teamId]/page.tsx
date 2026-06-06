import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTeamById, TEAMS } from "@/lib/data/teams";
import { MATCHES } from "@/lib/data/matches";
import { cityForMatch } from "@/lib/data/cities";
import { ARTICLES } from "@/lib/data/articles";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AdSlot } from "@/components/AdSlot";
import { AffiliatePromoStrip } from "@/components/AffiliatePromoStrip";
import { MatchCard } from "@/components/MatchCard";
import { formatLocalKickoff } from "@/lib/format";

type Props = { params: { teamId: string } };

export async function generateStaticParams() {
  return TEAMS.map((t) => ({ teamId: t.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const team = getTeamById(params.teamId);
  if (!team) return { title: "Team" };
  return {
    title: `${team.name} World Cup 2026 schedule and fixtures`,
    description: `${team.name} World Cup 2026 schedule, next match, group fixtures, local kickoff times, calendar download, and related team guides.`,
  };
}

export default function TeamDetailPage({ params }: Props) {
  const team = getTeamById(params.teamId);
  if (!team) notFound();

  const related = MATCHES.filter((m) => m.homeId === team.id || m.awayId === team.id);
  const nextMatch = related
    .filter((m) => new Date(m.kickoffUtc).getTime() >= Date.now())
    .sort((a, b) => new Date(a.kickoffUtc).getTime() - new Date(b.kickoffUtc).getTime())[0];
  const articles = ARTICLES.slice(0, 3);

  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Teams", href: "/teams" },
          { label: team.name },
        ]}
      />

      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-accent">
          Group {team.group}
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{team.name}</h1>
        <p className="max-w-3xl text-lg text-slate-600 dark:text-slate-400">
          {team.name} World Cup 2026 schedule, group fixtures, next match details, local kickoff times, and
          practical fan reminders. {team.intro}
        </p>
      </header>

      <AdSlot variant="top" />

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Group</div>
          <div className="mt-2 text-2xl font-black text-slate-900 dark:text-white">{team.group}</div>
          <Link href="/standings" className="mt-3 inline-flex text-sm font-semibold text-brand-accent hover:underline">
            View standings
          </Link>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 md:col-span-2">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Next match</div>
          {nextMatch ? (
            <>
              <div className="mt-2 text-lg font-bold text-slate-900 dark:text-white">
                {formatLocalKickoff(nextMatch.kickoffUtc)}
              </div>
              <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                {nextMatch.stage} · {cityForMatch(nextMatch).name}
              </div>
            </>
          ) : (
            <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              No upcoming fixture is available in the current schedule source.
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <a
          href={`/api/calendar/team/${team.id}`}
          className="rounded-lg bg-brand-navy px-4 py-2 text-sm font-semibold text-white hover:opacity-95 dark:bg-emerald-600"
        >
          Add {team.name} fixtures to calendar
        </a>
      </div>

      <AffiliatePromoStrip variant="team" />

      <section aria-labelledby="fixtures-heading" className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 id="fixtures-heading" className="text-xl font-bold text-slate-900 dark:text-white">
            Fixtures involving {team.name}
          </h2>
          <Link href="/schedule" className="text-sm font-semibold text-brand-accent hover:underline">
            Full schedule
          </Link>
        </div>
        <div className="grid gap-4">
          {related.map((m) => (
            <MatchCard key={m.id} match={m} showLink />
          ))}
        </div>
      </section>

      <section aria-labelledby="cities-heading" className="space-y-4">
        <h2 id="cities-heading" className="text-xl font-bold text-slate-900 dark:text-white">
          Host cities for {team.name} fixtures
        </h2>
        <div className="flex flex-wrap gap-2">
          {Array.from(new Map(related.map((m) => [cityForMatch(m).slug, cityForMatch(m)])).values()).map((city) => (
            <Link
              key={city.slug}
              href={`/cities/${city.slug}`}
              className="rounded-full border border-slate-200 px-3 py-1.5 text-sm font-semibold hover:border-brand-accent dark:border-slate-700"
            >
              {city.name}
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="team-guides-heading" className="space-y-4">
        <h2 id="team-guides-heading" className="text-xl font-bold text-slate-900 dark:text-white">
          Related World Cup guides
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/news/${article.slug}`}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-brand-accent dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="text-xs font-semibold uppercase tracking-wide text-brand-accent">{article.category}</div>
              <h3 className="mt-2 font-bold text-slate-900 dark:text-white">{article.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{article.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <AdSlot variant="bottom" />
    </div>
  );
}
