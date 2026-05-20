import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AdSlot } from "@/components/AdSlot";
import { GearProductGrid } from "@/components/GearProductGrid";
import { isAffiliateEnabled } from "@/lib/affiliate";

export const metadata: Metadata = {
  title: "Gear",
  description:
    "Curated Amazon affiliate ideas for match-day comfort—neutral fan kit without official FIFA marks.",
};

export default function GearPage() {
  const affiliateReady = isAffiliateEnabled();

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Gear" }]} />
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Fan gear picks
        </h1>
        <p className="max-w-2xl text-slate-600 dark:text-slate-400">
          {affiliateReady
            ? "Practical match-day essentials via Amazon Associates—generic products only, no official FIFA merchandising."
            : "Fan gear recommendations will appear here once Amazon Associates is configured."}
        </p>
      </header>

      <AdSlot variant="top" />

      <GearProductGrid />

      <AdSlot variant="inline" label="Gear mid-page advertisement" />

      <AdSlot variant="bottom" />
    </div>
  );
}
