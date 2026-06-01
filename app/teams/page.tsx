import type { Metadata } from "next";
import Link from "next/link";
import { fetchTeams } from "@/lib/api";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AdSlot } from "@/components/AdSlot";
import { TeamAvatar } from "@/components/TeamAvatar";

export const metadata: Metadata = {
  title: "Teams",
  description:
    "Browse every finals squad card with quick links to schedules and neutral English summaries.",
};

export default async function TeamsPage() {
  const teams = await fetchTeams();

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Teams" }]} />
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Participating teams
        </h1>
        <p className="max-w-2xl text-slate-600 dark:text-slate-400">
          Crests use neutral generated badges (no FIFA assets). Profiles explain identity at a glance and
          link to full fixtures involving each nation.
        </p>
      </header>

      <AdSlot variant="top" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {teams.map((t) => (
          <Link
            key={t.id}
            href={`/teams/${t.id}`}
            className="block rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-brand-accent dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-start gap-3">
              <TeamAvatar team={t} size="lg" />
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">{t.name}</h2>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Group {t.group}
                </p>
                <p className="mt-2 line-clamp-3 text-sm text-slate-600 dark:text-slate-400">{t.intro}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <AdSlot variant="bottom" />
    </div>
  );
}
