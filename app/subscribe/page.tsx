import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AdSlot } from "@/components/AdSlot";
import { SubscribeClient } from "@/app/subscribe/SubscribeClient";

export const metadata: Metadata = {
  title: "Subscribe",
  description: "Minimal newsletter capture placeholder—wire to your ESP before production use.",
};

export default function SubscribePage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Subscribe" }]} />
      <header className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Email updates
        </h1>
        <p className="mx-auto max-w-2xl text-slate-600 dark:text-slate-400">
          Drop your email if you want tournament reminders once delivery infrastructure is connected.
        </p>
      </header>

      <AdSlot variant="top" />

      <SubscribeClient />

      <AdSlot variant="bottom" />
    </div>
  );
}
