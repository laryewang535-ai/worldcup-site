import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTeamById, TEAMS } from "@/lib/data/teams";
import { MATCHES } from "@/lib/data/matches";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AdSlot } from "@/components/AdSlot";
import { AffiliatePromoStrip } from "@/components/AffiliatePromoStrip";
import { MatchCard } from "@/components/MatchCard";

type Props = { params: { teamId: string } };

export async function generateStaticParams() {
  return TEAMS.map((t) => ({ teamId: t.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const team = getTeamById(params.teamId);
  if (!team) return { title: "Team" };
  return {
    title: team.name,
    description: `${team.name} · Group ${team.group} · Neutral squad overview with linked fixtures.`,
  };
}

export default function TeamDetailPage({ params }: Props) {
  const team = getTeamById(params.teamId);
  if (!team) notFound();

  const related = MATCHES.filter((m) => m.homeId === team.id || m.awayId === team.id);

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
        <p className="max-w-3xl text-lg text-slate-600 dark:text-slate-400">{team.intro}</p>
      </header>

      <AffiliatePromoStrip variant="team" />

      <AdSlot variant="top" />

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

      <AdSlot variant="bottom" />
    </div>
  );
}
