import { buildAmazonAffiliateUrl, isAffiliateEnabled } from "@/lib/affiliate";
import { GEAR_CATEGORIES, GEAR_ITEMS } from "@/lib/data/gear";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";

const CATEGORY_COPY: Record<string, string> = {
  "Watch party gear": "Small upgrades for casual gatherings, score tracking, and pre-match routines.",
  "Stadium essentials": "Practical picks for long match days, venue rules, travel, and mobile tickets.",
  "Kids soccer gear": "Simple backyard gear for families who want to turn match energy into play.",
  "Summer match-day essentials": "Heat and hydration prep for June and July match windows.",
  "Home viewing setup": "Useful additions for watching fixtures at home with friends or family.",
};

/** 联盟商品网格：未配置 Tracking ID 时不展示 */
export function GearProductGrid({ limit }: { limit?: number } = {}) {
  if (!isAffiliateEnabled()) return null;

  const items = limit ? GEAR_ITEMS.slice(0, limit) : GEAR_ITEMS;

  return (
    <div className="space-y-6">
      {GEAR_CATEGORIES.map((category) => {
        const categoryItems = items.filter((item) => item.category === category);
        if (!categoryItems.length) return null;
        return (
          <section key={category} aria-labelledby={`gear-${category.replace(/\s+/g, "-").toLowerCase()}`} className="space-y-3">
            <div>
              <h2 id={`gear-${category.replace(/\s+/g, "-").toLowerCase()}`} className="text-xl font-bold text-slate-900 dark:text-white">
              {category}
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
                {CATEGORY_COPY[category]}
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {categoryItems.map((item) => (
                <article
                  key={item.id}
                  className="flex min-h-[25rem] flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                >
                  <div
                    className="aspect-video w-full rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700"
                    role="img"
                    aria-label={item.imageAlt}
                  />
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-brand-accent">
                    {item.bestFor}
                  </p>
                  <h3 className="mt-2 text-lg font-bold text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="mt-2 text-sm font-medium text-slate-700 dark:text-slate-300">{item.useCase}</p>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{item.description}</p>
                  <p className="mt-3 text-xs text-slate-500 dark:text-slate-500">{item.priceLabel}</p>
                  <a
                    href={buildAmazonAffiliateUrl(item.asin)}
                    target="_blank"
                    rel="nofollow sponsored noopener noreferrer"
                    className="mt-auto inline-flex w-fit rounded-lg bg-brand-accent px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
                  >
                    Check current price
                  </a>
                </article>
              ))}
            </div>
          </section>
        );
      })}
      <AffiliateDisclosure />
    </div>
  );
}
