import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AdSlot } from "@/components/AdSlot";
import { GearProductGrid } from "@/components/GearProductGrid";
import { isAffiliateEnabled } from "@/lib/affiliate";

export const metadata: Metadata = {
  title: "World Cup Watch Party Gear",
  description:
    "Curated World Cup watch party and match-day gear ideas: clear stadium bags, seat cushions, water bottles, power banks, cooling towels, soccer balls, backyard goals, and home viewing audio.",
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
            ? "Practical Amazon Associates picks for stadium prep, summer viewing, family kickabouts, and home watch parties. Generic products only, no official FIFA merchandising or tournament endorsement."
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
