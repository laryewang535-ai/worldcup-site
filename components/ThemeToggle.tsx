"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <span className="h-9 w-20 rounded-md border border-slate-200 dark:border-slate-700" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-brand-accent hover:text-brand-accent dark:border-slate-700 dark:text-slate-200"
      aria-label="Toggle color theme"
    >
      {isDark ? "Light mode" : "Dark mode"}
    </button>
  );
}
