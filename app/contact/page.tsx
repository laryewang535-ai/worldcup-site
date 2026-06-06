import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach the maintainers for corrections, partnership notes, or advertising inquiries.",
};

export default function ContactPage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Contact</h1>
        <p className="max-w-2xl text-slate-600 dark:text-slate-400">
          Use this page for factual corrections, partnership notes, or advertising inquiries once a public
          mailbox is connected.
        </p>
      </header>

      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="text-slate-700 dark:text-slate-200">
          Contact email coming soon.
        </p>
        <p className="mt-4 text-sm text-slate-500">
          For privacy-specific requests, mention “Privacy Request” in the subject line so routing stays
          consistent.
        </p>
      </div>
    </div>
  );
}
