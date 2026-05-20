import Link from "next/link";
import { AFFILIATE_GEAR_PATH, isAffiliateEnabled } from "@/lib/affiliate";

type Variant = "home" | "article" | "team";

const copy: Record<
  Variant,
  { title: string; body: string; cta: string }
> = {
  home: {
    title: "Match-day essentials",
    body: "Training balls, portable goals, stadium cushions, and hydration gear—curated for watch parties and kickabouts.",
    cta: "Browse fan gear",
  },
  article: {
    title: "Gear up for the tournament",
    body: "Neutral, non-official picks for training and match days. No wagering, no hype—just practical fan kit ideas.",
    cta: "See gear picks",
  },
  team: {
    title: "Prep for your team’s fixtures",
    body: "Comfortable sidelines kit and portable gear for following every stage—browse our Amazon affiliate shortlist.",
    cta: "Shop fan gear",
  },
};

/**
 * 轻量联盟导流条：高意图页面展示，未配置 tag 时不渲染。
 * 主转化在 /gear 详情页完成。
 */
export function AffiliatePromoStrip({ variant }: { variant: Variant }) {
  if (!isAffiliateEnabled()) return null;

  const { title, body, cta } = copy[variant];

  return (
    <aside
      className="rounded-2xl border border-emerald-500/25 bg-gradient-to-br from-emerald-500/10 to-slate-50 p-6 dark:from-emerald-500/10 dark:to-slate-900/80"
      aria-label="Fan gear recommendations"
    >
      <h2 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h2>
      <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400">{body}</p>
      <Link
        href={AFFILIATE_GEAR_PATH}
        className="mt-4 inline-flex rounded-lg bg-brand-accent px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
      >
        {cta}
      </Link>
    </aside>
  );
}
