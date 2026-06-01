import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Editorial, scheduling, and third-party data disclaimers for this non-official informational hub.",
};

export default function DisclaimerPage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Disclaimer" }]} />
      <article className="prose prose-slate max-w-3xl dark:prose-invert">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Disclaimer</h1>
        <p className="text-sm text-slate-500">Last updated: May 13, 2026</p>

        <h2>Non-affiliation</h2>
        <p>
          This project is not affiliated with FIFA, national federations, or broadcast partners. Names of
          tournaments, teams, and cities may appear strictly for informational context.
        </p>

        <h2>Data accuracy</h2>
        <p>
          Match times, scores, and standings may rely on third-party APIs or curated demo datasets. Always
          verify critical details with official sources before travel or ticketing decisions.
        </p>

        <h2>No wagering</h2>
        <p>
          We do not publish odds, betting guidance, or gambling promotions. If user-generated content is ever
          enabled, moderate it strictly.
        </p>

        <h2>No live broadcasts</h2>
        <p>
          We do not stream matches or host highlight clips that could infringe broadcasting rights.
        </p>

        <h2>Editorial content</h2>
        <p>
          Articles are explanatory and opinion-light. They do not guarantee outcomes on the pitch.
        </p>
      </article>
    </div>
  );
}
