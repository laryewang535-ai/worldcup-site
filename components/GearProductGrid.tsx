import { buildAmazonAffiliateUrl, isAffiliateEnabled } from "@/lib/affiliate";
import { GEAR_ITEMS } from "@/lib/data/gear";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";

/** 联盟商品网格：未配置 Tracking ID 时不展示 */
export function GearProductGrid() {
  if (!isAffiliateEnabled()) return null;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {GEAR_ITEMS.map((item) => (
          <article
            key={item.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div
              className="aspect-video w-full rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700"
              role="img"
              aria-label={item.imageAlt}
            />
            <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">{item.title}</h2>
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
      <AffiliateDisclosure />
    </div>
  );
}
