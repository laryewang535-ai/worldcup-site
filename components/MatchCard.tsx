import Link from "next/link";
import type { MatchRecord } from "@/lib/types";
import { getTeamById } from "@/lib/data/teams";
import { TeamAvatar } from "@/components/TeamAvatar";
import { displayMatchStatus, formatLocalKickoffLines } from "@/lib/format";

export function MatchCard({ match, showLink }: { match: MatchRecord; showLink?: boolean }) {
  const home = getTeamById(match.homeId);
  const away = getTeamById(match.awayId);
  const homeSide = home ?? { id: match.homeId, name: match.homeDisplay ?? match.homeId };
  const awaySide = away ?? { id: match.awayId, name: match.awayDisplay ?? match.awayId };

  const score =
    match.homeScore != null && match.awayScore != null
      ? `${match.homeScore} – ${match.awayScore}`
      : "—";

  const kickoffLines = formatLocalKickoffLines(match.kickoffUtc);

  const inner = (
    <div className="flex min-h-0 min-w-0 flex-col gap-4 overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        {/* 主队 / 客队：允许换行，避免与右侧元数据抢宽度 */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 sm:gap-x-4">
            <div className="flex min-w-0 max-w-full items-center gap-2">
              <TeamAvatar team={homeSide} />
              <span className="min-w-0 break-words font-semibold text-slate-900 dark:text-slate-50">
                {homeSide.name}
              </span>
            </div>
            <span className="shrink-0 text-slate-400">vs</span>
            <div className="flex min-w-0 max-w-full flex-row-reverse items-center gap-2">
              <span className="min-w-0 break-words text-right font-semibold text-slate-900 dark:text-slate-50">
                {awaySide.name}
              </span>
              <TeamAvatar team={awaySide} />
            </div>
          </div>
        </div>
        {/* 赛段 + 分多行展示开赛时间，右对齐且可换行 */}
        <div className="w-full shrink-0 text-left text-xs leading-snug text-slate-600 dark:text-slate-400 sm:w-[7.5rem] sm:text-right md:w-[9.25rem]">
          <div className="break-words font-medium text-slate-700 dark:text-slate-300">{match.stage}</div>
          <div className="mt-1.5 space-y-0.5">
            {kickoffLines.map((line, i) => (
              <div key={`${match.id}-kick-${i}`} className="break-words tabular-nums">
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex min-w-0 flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3 dark:border-slate-800">
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
            match.status === "Live"
              ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
              : match.status === "Full Time"
                ? "bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-100"
                : "bg-amber-500/15 text-amber-800 dark:text-amber-200"
          }`}
        >
          {displayMatchStatus(match.status)}
        </span>
        <div className="text-lg font-black tabular-nums text-slate-900 dark:text-white">{score}</div>
      </div>
    </div>
  );

  if (showLink) {
    return (
      <Link
        href={`/schedule#${match.id}`}
        className="block min-w-0 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950"
      >
        {inner}
      </Link>
    );
  }

  return inner;
}
