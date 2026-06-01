import Link from "next/link";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-slate-600 dark:text-slate-400 mb-6">
      <ol className="flex flex-wrap gap-2 items-center">
        {items.map((c, i) => (
          <li key={`${c.label}-${i}`} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden>/</span>}
            {c.href ? (
              <Link className="hover:text-brand-accent" href={c.href}>
                {c.label}
              </Link>
            ) : (
              <span className="text-slate-900 dark:text-slate-100 font-medium">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
