import type { Metadata } from "next";
import Link from "next/link";
import { fetchNews } from "@/lib/api";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AdSlot } from "@/components/AdSlot";
import { formatArticleDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "News",
  description:
    "Editorial previews, tactical reviews, team facts, and player-focused explainers—English only.",
};

export default async function NewsPage() {
  const articles = await fetchNews();

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "News" }]} />
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Newsroom
        </h1>
        <p className="max-w-2xl text-slate-600 dark:text-slate-400">
          Opinion-light explainers aligned with our schedules and standings tools. Categories help scanners
          jump to the story shape they need.
        </p>
      </header>

      <AdSlot variant="top" />

      <div className="grid gap-6">
        {articles.map((a, i) => (
          <article
            key={a.slug}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-emerald-800 dark:text-emerald-200">
                {a.category}
              </span>
              <time dateTime={a.publishedAt}>{formatArticleDate(a.publishedAt)}</time>
            </div>
            <h2 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
              <Link href={`/news/${a.slug}`} className="hover:text-brand-accent">
                {a.title}
              </Link>
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">{a.summary}</p>
            <Link
              href={`/news/${a.slug}`}
              className="mt-4 inline-flex font-semibold text-brand-accent hover:underline"
            >
              Read article
            </Link>
            {i % 2 === 1 ? (
              <div className="mt-6">
                <AdSlot variant="inline" label="Article index advertisement" />
              </div>
            ) : null}
          </article>
        ))}
      </div>

      <AdSlot variant="bottom" />
    </div>
  );
}
