const DISPLAY_LOCALE = "en-US";
const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const WEEKDAYS_LONG = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function formatLocalTime(d: Date): string {
  const hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const suffix = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;
  return `${String(hour12).padStart(2, "0")}:${minutes} ${suffix}`;
}

function formatLocalTimeZone(d: Date): string {
  const offsetMinutes = -d.getTimezoneOffset();
  if (offsetMinutes === 0) return "GMT";
  const sign = offsetMinutes >= 0 ? "+" : "-";
  const abs = Math.abs(offsetMinutes);
  const hours = Math.floor(abs / 60);
  const minutes = abs % 60;
  return minutes === 0
    ? `GMT${sign}${hours}`
    : `GMT${sign}${hours}:${String(minutes).padStart(2, "0")}`;
}

/** Convert a UTC ISO timestamp into a readable local kickoff string. */
export function formatLocalKickoff(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "Invalid date";
  return `${WEEKDAYS_LONG[d.getDay()].slice(0, 3)}, ${MONTHS_SHORT[d.getMonth()]} ${d.getDate()}, ${formatLocalTime(d)} ${formatLocalTimeZone(d)}`;
}

/** Split local kickoff details across lines so compact cards do not overflow. */
export function formatLocalKickoffLines(iso: string): string[] {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return ["—"];
  return [
    `${MONTHS_SHORT[d.getMonth()]} ${d.getDate()}`,
    WEEKDAYS_LONG[d.getDay()],
    formatLocalTimeZone(d),
    formatLocalTime(d),
  ];
}

/** Used to filter matches by the user's local calendar day. */
export function localDateKey(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "invalid-date";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function formatArticleDate(iso: string): string {
  return new Intl.DateTimeFormat(DISPLAY_LOCALE, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(iso));
}

export function formatLocalSyncTime(d: Date): string {
  if (Number.isNaN(d.getTime())) return "Invalid date";
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")} ${formatLocalTime(d)}`;
}

export function displayMatchStatus(status: import("@/lib/types").MatchStatus): string {
  if (status === "Live") return "Live (Delayed)";
  return status;
}
