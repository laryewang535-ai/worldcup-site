import type { Metadata } from "next";
import { fetchScores } from "@/lib/api";
import { MATCHES_PAGE_REVALIDATE } from "@/lib/matchesSource";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ScoresClient } from "@/app/scores/ScoresClient";

export const metadata: Metadata = {
  title: "Scores",
  description:
    "Delayed score updates with minimalist summaries—refreshed every three minutes on the client.",
};

/** 与 R2 / MATCHES_CACHE_TTL_SECONDS 对齐的 ISR 周期 */
export const revalidate = MATCHES_PAGE_REVALIDATE;

export default async function ScoresPage() {
  const initial = await fetchScores();

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Scores" }]} />
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Live scores & results
        </h1>
        <p className="max-w-2xl text-slate-600 dark:text-slate-400">
          Finished matches float to the top. Live fixtures stay labeled as delayed to reflect
          real-world broadcast latency.
        </p>
      </header>

      <ScoresClient initial={initial} />
    </div>
  );
}
