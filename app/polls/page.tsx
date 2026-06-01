import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AdSlot } from "@/components/AdSlot";
import { PollsClient } from "@/app/polls/PollsClient";

export const metadata: Metadata = {
  title: "Polls",
  description: "Single-question fan poll with one vote per browser and instant on-device results.",
};

export default function PollsPage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Polls" }]} />
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Fan poll</h1>
        <p className="max-w-2xl text-slate-600 dark:text-slate-400">
          Lightweight interaction layer—no accounts, no prizes, no payments.
        </p>
      </header>

      <AdSlot variant="top" />

      <PollsClient />

      <AdSlot variant="bottom" />
    </div>
  );
}
