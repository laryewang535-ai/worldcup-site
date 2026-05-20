import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES, articleBySlug, relatedArticles } from "@/lib/data/articles";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AdSlot } from "@/components/AdSlot";
import { AffiliatePromoStrip } from "@/components/AffiliatePromoStrip";
import { formatArticleDate } from "@/lib/format";

type Props = { params: { articleSlug: string } };

export async function generateStaticParams() {
  return ARTICLES.map((a) => ({ articleSlug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = articleBySlug(params.articleSlug);
  if (!article) return { title: "Article" };
  return {
    title: article.title,
    description: article.summary,
  };
}

export default function ArticlePage({ params }: Props) {
  const article = articleBySlug(params.articleSlug);
  if (!article) notFound();

  const related = relatedArticles(article.slug);

  return (
    <div className="space-y-10">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "News", href: "/news" },
          { label: article.title },
        ]}
      />

      <article>
        <header className="space-y-3">
          <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-emerald-800 dark:text-emerald-200">
              {article.category}
            </span>
            <time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt)}</time>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
            {article.title}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">{article.summary}</p>
        </header>

        <AdSlot variant="top" label="Article top advertisement" />

        <div className="prose prose-slate mt-8 max-w-3xl dark:prose-invert">
          {article.body.map((p, idx) => (
            <p key={idx} className="mb-4 text-slate-700 dark:text-slate-300">
              {p}
            </p>
          ))}
        </div>

        <div className="mt-8">
          <AdSlot variant="inline" label="In-article advertisement" />
        </div>
      </article>

      <AffiliatePromoStrip variant="article" />

      <section aria-labelledby="related-heading" className="space-y-4">
        <h2 id="related-heading" className="text-xl font-bold text-slate-900 dark:text-white">
          Related articles
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {related.map((r) => (
            <Link
              key={r.slug}
              href={`/news/${r.slug}`}
              className="rounded-xl border border-slate-200 bg-white p-4 text-sm shadow-sm hover:border-brand-accent dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="text-xs font-semibold uppercase text-slate-500">{r.category}</div>
              <div className="mt-2 font-semibold text-slate-900 dark:text-white">{r.title}</div>
              <p className="mt-2 line-clamp-3 text-slate-600 dark:text-slate-400">{r.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <AdSlot variant="bottom" label="Article bottom advertisement" />
    </div>
  );
}
