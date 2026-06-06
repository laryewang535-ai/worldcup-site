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

/** Affiliate product grid: hidden unless a tracking ID is configured. */
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
                    View official Amazon page
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
      className: "from-emerald-50 via-white to-slate-100 text-emerald-900 dark:from-emerald-950 dark:via-slate-900 dark:to-slate-800 dark:text-emerald-100",
    },
    goal: {
      title: "Pop-up Goals",
      detail: "Backyard play",
      className: "from-sky-50 via-white to-emerald-50 text-sky-900 dark:from-sky-950 dark:via-slate-900 dark:to-emerald-950 dark:text-sky-100",
    },
    seat: {
      title: "Seat Cushion",
      detail: "Long events",
      className: "from-amber-50 via-white to-slate-100 text-amber-900 dark:from-amber-950 dark:via-slate-900 dark:to-slate-800 dark:text-amber-100",
    },
    bag: {
      title: "Clear Bag",
      detail: "Venue prep",
      className: "from-cyan-50 via-white to-slate-100 text-cyan-900 dark:from-cyan-950 dark:via-slate-900 dark:to-slate-800 dark:text-cyan-100",
    },
    bottle: {
      title: "Water Bottle",
      detail: "Hydration",
      className: "from-blue-50 via-white to-cyan-50 text-blue-900 dark:from-blue-950 dark:via-slate-900 dark:to-cyan-950 dark:text-blue-100",
    },
    power: {
      title: "Power Bank",
      detail: "Phone backup",
      className: "from-slate-100 via-white to-emerald-50 text-slate-800 dark:from-slate-800 dark:via-slate-900 dark:to-emerald-950 dark:text-slate-100",
    },
    towel: {
      title: "Cooling Towels",
      detail: "Hot weather",
      className: "from-rose-50 via-white to-sky-50 text-rose-900 dark:from-rose-950 dark:via-slate-900 dark:to-sky-950 dark:text-rose-100",
    },
    speaker: {
      title: "Speaker",
      detail: "Home viewing",
      className: "from-indigo-50 via-white to-slate-100 text-indigo-900 dark:from-indigo-950 dark:via-slate-900 dark:to-slate-800 dark:text-indigo-100",
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
      <div className="absolute inset-x-8 bottom-5 h-3 rounded-full bg-slate-900/10 blur-md dark:bg-black/30" />
      <div className="relative flex h-full w-full items-center justify-center">
        <VisualShape visual={visual} />
      </div>
      <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] dark:bg-slate-950/45" />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="max-w-[13rem] rounded-lg border border-white/70 bg-white/85 px-4 py-3 text-center shadow-lg backdrop-blur dark:border-slate-700 dark:bg-slate-950/80">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white shadow-sm dark:bg-emerald-500">
            <span className="relative block h-4 w-5 rounded-sm border-2 border-current">
              <span className="absolute -left-0.5 -top-3 h-4 w-6 rounded-t-full border-2 border-current border-b-0" />
            </span>
          </div>
          <div className="mt-2 text-sm font-black text-slate-900 dark:text-white">
            Amazon preview locked
          </div>
          <div className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">
            Use the link below to view current product images and details.
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-4 rounded-md bg-white/80 px-3 py-2 shadow-sm backdrop-blur dark:bg-slate-950/65">
        <div className="text-sm font-black uppercase">{item.title}</div>
        <div className="mt-0.5 text-xs font-semibold opacity-70">{item.detail}</div>
      </div>
    </div>
  );
}

function VisualShape({ visual }: { visual: string }) {
  if (visual === "ball") {
    return (
      <div className="relative h-28 w-28 rounded-full border border-slate-300 bg-white shadow-xl dark:border-slate-600">
        <div className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-md bg-slate-900 dark:bg-slate-100" />
        <div className="absolute left-5 top-5 h-6 w-6 rounded-full bg-slate-900 dark:bg-slate-100" />
        <div className="absolute right-5 top-6 h-6 w-6 rounded-full bg-slate-900 dark:bg-slate-100" />
        <div className="absolute bottom-5 left-7 h-6 w-6 rounded-full bg-slate-900 dark:bg-slate-100" />
        <div className="absolute bottom-6 right-7 h-5 w-5 rounded-full bg-slate-900 dark:bg-slate-100" />
      </div>
    );
  }

  if (visual === "goal") {
    return (
      <div className="relative h-24 w-36">
        <div className="absolute inset-x-3 bottom-2 h-20 rounded-t-2xl border-4 border-sky-700 bg-white/45 shadow-xl dark:border-sky-200 dark:bg-slate-950/30" />
        <div className="absolute left-8 top-5 h-14 border-l border-sky-700/40 dark:border-sky-100/40" />
        <div className="absolute left-16 top-5 h-14 border-l border-sky-700/40 dark:border-sky-100/40" />
        <div className="absolute left-24 top-5 h-14 border-l border-sky-700/40 dark:border-sky-100/40" />
        <div className="absolute inset-x-6 top-10 border-t border-sky-700/40 dark:border-sky-100/40" />
        <div className="absolute inset-x-6 top-16 border-t border-sky-700/40 dark:border-sky-100/40" />
      </div>
    );
  }

  if (visual === "seat") {
    return (
      <div className="relative h-28 w-32">
        <div className="absolute left-5 top-3 h-20 w-24 rounded-2xl border border-amber-700/25 bg-amber-500 shadow-xl dark:bg-amber-400" />
        <div className="absolute left-3 bottom-2 h-12 w-28 rounded-2xl border border-amber-800/20 bg-amber-600 shadow-lg dark:bg-amber-500" />
        <div className="absolute left-10 top-8 h-1 w-14 rounded-full bg-white/50" />
        <div className="absolute left-8 bottom-8 h-1 w-20 rounded-full bg-white/45" />
      </div>
    );
  }

  if (visual === "bag") {
    return (
      <div className="relative h-32 w-28">
        <div className="absolute left-6 top-1 h-10 w-16 rounded-t-full border-4 border-cyan-700/50 border-b-0 dark:border-cyan-200/60" />
        <div className="absolute bottom-2 left-2 h-24 w-24 rounded-2xl border border-cyan-700/30 bg-cyan-100/70 shadow-xl backdrop-blur dark:bg-cyan-300/20" />
        <div className="absolute bottom-8 left-7 h-12 w-14 rounded-lg border border-cyan-700/30 bg-white/35" />
        <div className="absolute bottom-5 left-6 h-1 w-16 rounded-full bg-cyan-700/30 dark:bg-cyan-100/40" />
      </div>
    );
  }

  if (visual === "bottle") {
    return (
      <div className="relative h-32 w-20">
        <div className="absolute left-6 top-1 h-7 w-8 rounded-t-lg bg-blue-800 shadow dark:bg-blue-200" />
        <div className="absolute left-4 top-7 h-24 w-12 rounded-2xl border border-blue-800/20 bg-gradient-to-b from-blue-500 to-cyan-400 shadow-xl dark:from-blue-300 dark:to-cyan-200" />
        <div className="absolute left-6 top-12 h-12 w-8 rounded-xl bg-white/35" />
        <div className="absolute left-7 top-16 h-1 w-6 rounded-full bg-white/60" />
      </div>
    );
  }

  if (visual === "power") {
    return (
      <div className="relative h-24 w-36">
        <div className="absolute left-3 top-4 h-16 w-28 rounded-2xl bg-slate-900 shadow-xl dark:bg-slate-100" />
        <div className="absolute right-1 top-9 h-7 w-5 rounded-r-md bg-slate-700 dark:bg-slate-300" />
        <div className="absolute left-8 top-9 h-2 w-16 rounded-full bg-emerald-400" />
        <div className="absolute left-8 top-14 h-2 w-10 rounded-full bg-white/70 dark:bg-slate-400" />
      </div>
    );
  }

  if (visual === "towel") {
    return (
      <div className="relative h-28 w-36">
        <div className="absolute left-7 top-4 h-20 w-20 rotate-[-10deg] rounded-2xl bg-rose-400 shadow-xl dark:bg-rose-300" />
        <div className="absolute left-14 top-8 h-20 w-20 rotate-6 rounded-2xl bg-sky-300 shadow-lg dark:bg-sky-200" />
        <div className="absolute left-11 top-10 h-1 w-14 rotate-[-10deg] rounded-full bg-white/60" />
        <div className="absolute left-20 top-16 h-1 w-14 rotate-6 rounded-full bg-white/70" />
      </div>
    );
  }

  return (
    <div className="relative h-24 w-36">
      <div className="absolute left-4 top-5 h-14 w-28 rounded-2xl bg-slate-900 shadow-xl dark:bg-slate-100" />
      <div className="absolute left-8 top-9 h-6 w-6 rounded-full border-4 border-indigo-400 bg-slate-800 dark:bg-slate-200" />
      <div className="absolute right-8 top-9 h-6 w-6 rounded-full border-4 border-indigo-400 bg-slate-800 dark:bg-slate-200" />
      <div className="absolute left-16 top-8 h-2 w-6 rounded-full bg-white/70 dark:bg-slate-500" />
    </div>
  );
}
