"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/schedule", label: "Schedule" },
  { href: "/scores", label: "Scores" },
  { href: "/standings", label: "Standings" },
  { href: "/teams", label: "Teams" },
  { href: "/news", label: "News" },
  { href: "/polls", label: "Polls" },
  { href: "/gear", label: "Gear" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-brand-navy/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="font-semibold text-brand-navy dark:text-white shrink-0">
          2026 World Cup Hub
        </Link>
        <nav className="hidden md:flex flex-wrap items-center justify-end gap-4 text-sm font-medium text-slate-700 dark:text-slate-200">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={
                  active
                    ? "text-brand-accent"
                    : "hover:text-brand-accent transition-colors"
                }
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <details className="md:hidden relative">
            <summary className="list-none cursor-pointer rounded-md border border-slate-200 px-3 py-1.5 text-sm dark:border-slate-700">
              Menu
            </summary>
            <div className="absolute right-0 mt-2 w-48 rounded-md border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-700 dark:bg-slate-900">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="block rounded px-2 py-1.5 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
