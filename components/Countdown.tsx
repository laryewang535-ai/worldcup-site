"use client";

import { useEffect, useMemo, useState } from "react";

type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

function calc(now: number, targetMs: number): Remaining {
  const diff = targetMs - now;
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }
  const days = Math.floor(diff / (24 * 60 * 60 * 1000));
  const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((diff % (60 * 1000)) / 1000);
  return { days, hours, minutes, seconds, done: false };
}

function parseKickoffMs(prop: number): number {
  if (Number.isFinite(prop) && prop > 1e12) return prop;
  return Date.parse("2026-06-11T22:00:00.000Z");
}

type GridMode = "loading" | "live" | "done";

function CountdownGrid({ mode, values }: { mode: GridMode; values: Remaining | null }) {
  if (mode === "done") {
    return (
      <div className="mt-8 rounded-xl border border-white/10 bg-white/5 px-4 py-6 text-center backdrop-blur">
        <p className="text-lg font-semibold text-emerald-300">当前倒计时目标已过</p>
        <p className="mt-2 text-sm text-slate-200">
          请查看下方赛程获取下一场开赛时间；或在环境变量{" "}
          <code className="rounded bg-white/10 px-1 py-0.5 text-xs">NEXT_PUBLIC_COUNTDOWN_TARGET_ISO</code>{" "}
          中指定未来的 UTC 开赛时刻以重新启用倒计时。
        </p>
      </div>
    );
  }

  const boxes = [
    { label: "Days", v: mode === "loading" ? "—" : values?.days ?? 0 },
    { label: "Hours", v: mode === "loading" ? "—" : values?.hours ?? 0 },
    { label: "Minutes", v: mode === "loading" ? "—" : values?.minutes ?? 0 },
    { label: "Seconds", v: mode === "loading" ? "—" : values?.seconds ?? 0 },
  ] as const;

  return (
    <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {boxes.map((b) => (
        <div
          key={b.label}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-center backdrop-blur"
        >
          <div
            className={`text-3xl font-black tabular-nums ${mode === "loading" ? "text-white/40" : ""}`}
          >
            {typeof b.v === "number" ? b.v : b.v}
          </div>
          <div className="mt-1 text-xs uppercase tracking-wide text-slate-300">{b.label}</div>
        </div>
      ))}
    </div>
  );
}

/** 首页开幕倒计时；kickoffUtcMs 由服务端根据赛程或环境变量算出，避免 hydration 数字不一致 */
export function CountdownHero({ kickoffUtcMs }: { kickoffUtcMs: number }) {
  const targetMs = useMemo(() => parseKickoffMs(kickoffUtcMs), [kickoffUtcMs]);
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    const tick = () => setRemaining(calc(Date.now(), targetMs));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  const mode: GridMode = remaining === null ? "loading" : remaining.done ? "done" : "live";

  return (
    <section className="rounded-2xl bg-gradient-to-br from-brand-navy to-slate-900 p-8 text-white shadow-xl">
      <p className="text-sm uppercase tracking-widest text-emerald-300/90">Countdown to kickoff</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">2026 World Cup Global Info Hub</h1>
      <p className="mt-3 max-w-2xl text-slate-200">
        Neutral schedules, standings, and news—built for fast loading, mobile screens, and clear local kickoff
        times.
      </p>

      <CountdownGrid mode={mode} values={remaining} />
    </section>
  );
}
