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
                  <ProductVisual visual={item.visual} label={item.imageAlt} />
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

function ProductVisual({ visual, label }: { visual: string; label: string }) {
  const copy: Record<string, { title: string; detail: string; className: string }> = {
    ball: {
      title: "Soccer Ball",
      detail: "Size 5",
      className: "from-emerald-50 via-white to-slate-100 text-emerald-800 dark:from-emerald-950 dark:via-slate-900 dark:to-slate-800 dark:text-emerald-100",
    },
    goal: {
      title: "Pop-up Goals",
      detail: "Backyard play",
      className: "from-sky-50 via-white to-emerald-50 text-sky-800 dark:from-sky-950 dark:via-slate-900 dark:to-emerald-950 dark:text-sky-100",
    },
    seat: {
      title: "Seat Cushion",
      detail: "Long events",
      className: "from-amber-50 via-white to-slate-100 text-amber-800 dark:from-amber-950 dark:via-slate-900 dark:to-slate-800 dark:text-amber-100",
    },
    bag: {
      title: "Clear Bag",
      detail: "Venue prep",
      className: "from-cyan-50 via-white to-slate-100 text-cyan-800 dark:from-cyan-950 dark:via-slate-900 dark:to-slate-800 dark:text-cyan-100",
    },
    bottle: {
      title: "Water Bottle",
      detail: "Hydration",
      className: "from-blue-50 via-white to-cyan-50 text-blue-800 dark:from-blue-950 dark:via-slate-900 dark:to-cyan-950 dark:text-blue-100",
    },
    power: {
      title: "Power Bank",
      detail: "Phone backup",
      className: "from-slate-100 via-white to-emerald-50 text-slate-800 dark:from-slate-800 dark:via-slate-900 dark:to-emerald-950 dark:text-slate-100",
    },
    towel: {
      title: "Cooling Towels",
      detail: "Hot weather",
      className: "from-rose-50 via-white to-sky-50 text-rose-800 dark:from-rose-950 dark:via-slate-900 dark:to-sky-950 dark:text-rose-100",
    },
    speaker: {
      title: "Speaker",
      detail: "Home viewing",
      className: "from-violet-50 via-white to-slate-100 text-violet-800 dark:from-violet-950 dark:via-slate-900 dark:to-slate-800 dark:text-violet-100",
    },
  };

  const item = copy[visual] ?? copy.ball;

  return (
    <div
      className={`relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-gradient-to-br p-5 dark:border-slate-700 ${item.className}`}
      role="img"
      aria-label={label}
    >
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/50 dark:bg-white/10" />
      <div className="absolute -bottom-10 -left-8 h-32 w-32 rounded-full bg-white/60 dark:bg-white/10" />
      <div className="relative text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-current/20 bg-white/75 text-3xl font-black tracking-normal shadow-sm dark:bg-slate-950/50">
          {item.title
            .split(" ")
            .map((word) => word[0])
            .join("")
            .slice(0, 2)}
        </div>
        <div className="mt-4 text-sm font-black uppercase tracking-wide">{item.title}</div>
        <div className="mt-1 text-xs font-semibold opacity-75">{item.detail}</div>
      </div>
    </div>
  );
}
