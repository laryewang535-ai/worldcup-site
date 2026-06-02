import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CITIES } from "@/lib/data/cities";

export const metadata: Metadata = {
  title: "World Cup 2026 Host City Guides",
  description:
    "Global fan guides for World Cup 2026 host cities with venue context, local kickoff times, and match-day preparation notes.",
};

export default function CitiesPage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cities" }]} />
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          World Cup 2026 host city guides
        </h1>
        <p className="max-w-3xl text-slate-600 dark:text-slate-400">
          Venue-focused guides for global fans tracking local kickoff times, city context, and practical
          match-day preparation.
        </p>
      </header>

      <AdSlot variant="top" />

      <div className="grid gap-4 md:grid-cols-2">
        {CITIES.map((city) => (
          <Link
            key={city.slug}
            href={`/cities/${city.slug}`}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-brand-accent dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="text-xs font-semibold uppercase tracking-wide text-brand-accent">
              {city.country}
            </div>
            <h2 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">{city.name}</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{city.stadium}</p>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">{city.summary}</p>
          </Link>
        ))}
      </div>

      <AdSlot variant="bottom" />
    </div>
  );
}
