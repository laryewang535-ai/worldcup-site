/** 将 UTC ISO 转为用户本地可读字符串 */
export function formatLocalKickoff(iso: string): string {
  const d = new Date(iso);
  return new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(d);
}

/** 多行展示本地开赛信息，窄卡片内避免单行过长导致挤压溢出 */
export function formatLocalKickoffLines(iso: string): string[] {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return ["—"];
  const loc = undefined;
  const dateLine = new Intl.DateTimeFormat(loc, { month: "short", day: "numeric" }).format(d);
  const weekdayLine = new Intl.DateTimeFormat(loc, { weekday: "long" }).format(d);
  const timeLine = new Intl.DateTimeFormat(loc, { hour: "2-digit", minute: "2-digit" }).format(d);
  const tzParts = new Intl.DateTimeFormat(loc, { timeZoneName: "short" }).formatToParts(d);
  const tzLine = tzParts.find((p) => p.type === "timeZoneName")?.value ?? "";
  const lines = [dateLine, weekdayLine, tzLine, timeLine];
  return lines.filter((s) => s.length > 0);
}

/** 用于按「用户本地日历日」筛选 */
export function localDateKey(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "invalid-date";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function formatArticleDate(iso: string): string {
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(iso));
}

export function displayMatchStatus(status: import("@/lib/types").MatchStatus): string {
  if (status === "Live") return "Live (Delayed)";
  return status;
}
