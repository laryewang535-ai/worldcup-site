import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AdSlot } from "@/components/AdSlot";
import { GearProductGrid } from "@/components/GearProductGrid";
import { isAffiliateEnabled } from "@/lib/affiliate";

export const metadata: Metadata = {
  title: "World Cup Watch Party Gear",
  description:
    "Scenario-based Amazon affiliate ideas for watch parties, stadium essentials, kids soccer gear, and summer match-day preparation.",
};

export default function GearPage() {
  const affiliateReady = isAffiliateEnabled();

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Gear" }]} />
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          World Cup watch party and match-day gear
        </h1>
        <p className="max-w-2xl text-slate-600 dark:text-slate-400">
          {affiliateReady
            ? "Practical scenario-based picks via Amazon Associates: stadium essentials, home viewing setup, kids soccer gear, and summer match-day preparation. Generic products only, no official FIFA merchandising."
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
