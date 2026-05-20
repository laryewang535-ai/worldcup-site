import Link from "next/link";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { isAffiliateEnabled } from "@/lib/affiliate";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50 py-10 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 md:flex-row md:justify-between">
        <div>
          <p className="font-semibold text-slate-900 dark:text-slate-100">
            2026 World Cup Global Info Hub
          </p>
          <p className="mt-2 max-w-md">
            Informational schedules, scores, and standings. No live broadcasts, no
            wagering, no user accounts.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Link className="hover:text-brand-accent" href="/privacy">
            Privacy Policy
          </Link>
          <Link className="hover:text-brand-accent" href="/disclaimer">
            Disclaimer
          </Link>
          <Link className="hover:text-brand-accent" href="/contact">
            Contact
          </Link>
          <Link className="hover:text-brand-accent" href="/subscribe">
            Subscribe
          </Link>
          {isAffiliateEnabled() ? (
            <Link className="hover:text-brand-accent" href="/gear">
              Gear
            </Link>
          ) : null}
        </div>
      </div>
      <AffiliateDisclosure className="mx-auto mt-6 max-w-6xl px-4" />
      <p className="mx-auto mt-8 max-w-6xl px-4 text-xs text-slate-500">
        © {new Date().getFullYear()} World Cup Info Hub. All rights reserved.
      </p>
    </footer>
  );
}
