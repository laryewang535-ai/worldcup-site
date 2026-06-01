import type { Metadata } from "next";
import { fetchStandings } from "@/lib/api";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AdSlot } from "@/components/AdSlot";
import { getTeamById } from "@/lib/data/teams";

export const metadata: Metadata = {
  title: "Standings",
  description:
    "Group tables with points, goal difference, and qualification highlighting—optimized for mobile scrolling.",
};

export default async function StandingsPage() {
  const standings = await fetchStandings();
  const groups = Object.keys(standings).sort();

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Standings" }]} />
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Group standings
        </h1>
        <p className="max-w-2xl text-slate-600 dark:text-slate-400">
          Tables sort by points, then goal difference, then goals scored. Top-two rows are highlighted as
          advancing placeholders for this demo dataset.
        </p>
      </header>

      <AdSlot variant="top" />

      <div className="grid gap-8">
        {groups.map((g, gi) => (
          <section key={g} aria-labelledby={`group-${g}`} className="space-y-3">
            <h2 id={`group-${g}`} className="text-lg font-bold text-slate-900 dark:text-white">
              Group {g}
            </h2>
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="min-w-[720px] w-full border-collapse text-sm">
                <thead className="bg-slate-100 text-left text-xs font-semibold uppercase tracking-wide text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  <tr>
                    <th className="px-3 py-2">Rank</th>
                    <th className="px-3 py-2">Team</th>
                    <th className="px-3 py-2">Pld</th>
                    <th className="px-3 py-2">W</th>
                    <th className="px-3 py-2">D</th>
                    <th className="px-3 py-2">L</th>
                    <th className="px-3 py-2">GF</th>
                    <th className="px-3 py-2">GA</th>
                    <th className="px-3 py-2">GD</th>
                    <th className="px-3 py-2">Pts</th>
                  </tr>
                </thead>
                <tbody>
                  {standings[g].map((row, idx) => {
                    const team = getTeamById(row.teamId);
                    const gd = row.gf - row.ga;
                    const qualified = row.qualified;
                    return (
                      <tr
                        key={row.teamId}
                        className={
                          qualified
                            ? "bg-emerald-500/10 dark:bg-emerald-500/15"
                            : idx % 2 === 0
                              ? "bg-white dark:bg-slate-900"
                              : "bg-slate-50 dark:bg-slate-950"
                        }
                      >
                        <td className="px-3 py-2 font-semibold tabular-nums">{idx + 1}</td>
                        <td className="px-3 py-2 font-medium text-slate-900 dark:text-slate-50">
                          {team?.name ?? row.teamId}
                          {qualified ? (
                            <span className="ml-2 rounded-full bg-emerald-600/15 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-800 dark:text-emerald-200">
                              Advancing
                            </span>
                          ) : null}
                        </td>
                        <td className="px-3 py-2 tabular-nums">{row.pld}</td>
                        <td className="px-3 py-2 tabular-nums">{row.w}</td>
                        <td className="px-3 py-2 tabular-nums">{row.d}</td>
                        <td className="px-3 py-2 tabular-nums">{row.l}</td>
                        <td className="px-3 py-2 tabular-nums">{row.gf}</td>
                        <td className="px-3 py-2 tabular-nums">{row.ga}</td>
                        <td className="px-3 py-2 tabular-nums">{gd >= 0 ? `+${gd}` : gd}</td>
                        <td className="px-3 py-2 font-bold tabular-nums text-brand-accent">{row.pts}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {gi % 2 === 1 ? <AdSlot variant="inline" label="Standings advertisement" /> : null}
          </section>
        ))}
      </div>

      <AdSlot variant="bottom" />
    </div>
  );
}
