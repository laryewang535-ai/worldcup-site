import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { AffiliatePromoStrip } from "@/components/AffiliatePromoStrip";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MatchCard } from "@/components/MatchCard";
import { CITIES, getCityBySlug, matchesForCity } from "@/lib/data/cities";
import { MATCHES } from "@/lib/data/matches";

type Props = { params: { citySlug: string } };

export async function generateStaticParams() {
  return CITIES.map((city) => ({ citySlug: city.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = getCityBySlug(params.citySlug);
  if (!city) return { title: "Host city guide" };
  return {
    title: `${city.name} World Cup 2026 watch guide`,
    description: `${city.name} World Cup 2026 guide with ${city.stadium}, local kickoff times, hosted matches, travel-prep notes, and fan essentials.`,
  };
}

export default async function CityGuidePage({ params }: Props) {
  const city = getCityBySlug(params.citySlug);
  if (!city) notFound();

  const cityMatches = matchesForCity(MATCHES, city.slug);

  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Cities", href: "/cities" },
          { label: city.name },
        ]}
      />

      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-accent">
          {city.country} · {city.timezone}
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
          {city.name} World Cup 2026 watch guide
        </h1>
        <p className="max-w-3xl text-lg text-slate-600 dark:text-slate-400">{city.summary}</p>
      </header>

      <AdSlot variant="top" />

      <div className="grid gap-4 md:grid-cols-3">
        <GuideFact label="Venue" value={city.stadium} />
        <GuideFact label="Timezone" value={city.timezone} />
        <GuideFact label="Hosted fixtures" value={String(cityMatches.length)} />
      </div>

      <section aria-labelledby="city-matches" className="space-y-4">
        <h2 id="city-matches" className="text-xl font-bold text-slate-900 dark:text-white">
          Matches in {city.name}
        </h2>
        <div className="grid gap-4">
          {cityMatches.map((match) => (
            <MatchCard key={match.id} match={match} showLink />
          ))}
        </div>
        {!cityMatches.length ? (
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Fixture assignments will appear here once the schedule data source includes this city.
          </p>
        ) : null}
      </section>

      <section aria-labelledby="travel-prep" className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h2 id="travel-prep" className="text-xl font-bold text-slate-900 dark:text-white">
            Transport and entry notes
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
            {city.transportNotes.map((note) => (
              <li key={note}>- {note}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Match-day prep list</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
            {city.prepTips.map((tip) => (
              <li key={tip}>- {tip}</li>
            ))}
          </ul>
          <Link href="/gear" className="mt-4 inline-flex text-sm font-semibold text-brand-accent hover:underline">
            Browse fan essentials
          </Link>
        </div>
      </section>

      <AdSlot variant="inline" label="City guide advertisement" />
      <AffiliatePromoStrip variant="city" />

      <section aria-labelledby="city-updates" className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <h2 id="city-updates" className="text-xl font-bold text-slate-900 dark:text-white">
          Get {city.name} match updates
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Use the email updates page to connect this city guide with match reminders once your ESP is wired.
        </p>
        <Link href="/subscribe" className="mt-4 inline-flex rounded-lg bg-brand-navy px-4 py-2 text-sm font-semibold text-white hover:opacity-95 dark:bg-emerald-600">
          Subscribe for updates
        </Link>
      </section>

      <AdSlot variant="bottom" />
    </div>
  );
}

function GuideFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-2 text-base font-bold text-slate-900 dark:text-white">{value}</div>
    </div>
  );
}
