import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl space-y-6 py-16 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-accent">404</p>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Page not found</h1>
      <p className="text-slate-600 dark:text-slate-400">
        The fixture you clicked may have moved. Try the schedule page or head home.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link className="rounded-lg bg-brand-accent px-4 py-2 font-semibold text-white" href="/">
          Back to home
        </Link>
        <Link
          className="rounded-lg border border-slate-200 px-4 py-2 font-semibold text-slate-800 dark:border-slate-700 dark:text-slate-100"
          href="/schedule"
        >
          View schedule
        </Link>
      </div>
    </div>
  );
}
