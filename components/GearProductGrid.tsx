import { buildAmazonAffiliateUrl, isAffiliateEnabled } from "@/lib/affiliate";
import { GEAR_CATEGORIES, GEAR_ITEMS } from "@/lib/data/gear";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";

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
            <h2 id={`gear-${category.replace(/\s+/g, "-").toLowerCase()}`} className="text-xl font-bold text-slate-900 dark:text-white">
              {category}
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {categoryItems.map((item) => (
                <article
                  key={item.id}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                >
                  <div
                    className="aspect-video w-full rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700"
                    role="img"
                    aria-label={item.imageAlt}
                  />
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-brand-accent">
                    {item.useCase}
                  </p>
                  <h3 className="mt-2 text-lg font-bold text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{item.priceLabel}</p>
                  <a
                    href={buildAmazonAffiliateUrl(item.asin)}
                    target="_blank"
                    rel="nofollow sponsored noopener noreferrer"
                    className="mt-4 inline-flex rounded-lg bg-brand-accent px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
                  >
                    View on Amazon
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
