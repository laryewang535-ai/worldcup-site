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
          Replace the mailbox below with your production alias. We respond to factual corrections and media kit
          requests only.
        </p>
      </header>

      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="text-slate-700 dark:text-slate-200">
          Email:{" "}
          <a className="font-semibold text-brand-accent hover:underline" href="mailto:hello@example.com">
            hello@example.com
          </a>
        </p>
        <p className="mt-4 text-sm text-slate-500">
          For privacy-specific requests, mention “Privacy Request” in the subject line so routing stays
          consistent.
        </p>
      </div>
    </div>
  );
}
