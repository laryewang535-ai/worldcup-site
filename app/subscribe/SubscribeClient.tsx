"use client";

import { useState, type FormEvent } from "react";

export function SubscribeClient() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
  }

  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {done ? (
        <p className="text-lg font-semibold text-emerald-700 dark:text-emerald-300">
          Email capture is not connected yet. Your address was not stored.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none focus:border-brand-accent dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
              placeholder="you@example.com"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-brand-navy px-4 py-2.5 text-sm font-semibold text-white hover:opacity-95 dark:bg-emerald-600"
          >
            Notify me
          </button>
          <p className="text-xs text-slate-500">
            This form is a preview only until an email service is connected.
          </p>
        </form>
      )}
    </div>
  );
}
