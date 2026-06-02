import type { MatchRecord } from "@/lib/types";
import { cityForMatch } from "@/lib/data/cities";
import { matchTitle } from "@/lib/matchSeo";

function escapeIcsText(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

function icsDate(iso: string): string {
  return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

export function buildMatchIcs(match: MatchRecord): string {
  const start = new Date(match.kickoffUtc);
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
  const city = cityForMatch(match);
  const title = `${matchTitle(match)} - World Cup 2026`;
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//World Cup Info Hub//Match Calendar//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${match.id}@worldcup-info-hub`,
    `DTSTAMP:${icsDate(new Date().toISOString())}`,
    `DTSTART:${icsDate(match.kickoffUtc)}`,
    `DTEND:${icsDate(end.toISOString())}`,
    `SUMMARY:${escapeIcsText(title)}`,
    `LOCATION:${escapeIcsText(`${match.stadium ?? city.stadium}, ${city.name}, ${city.country}`)}`,
    `DESCRIPTION:${escapeIcsText(`${match.stage}. Follow local time, scores, and fixtures on World Cup Info Hub.`)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return `${lines.join("\r\n")}\r\n`;
}

export function buildTeamIcs(teamName: string, teamId: string, matches: MatchRecord[]): string {
  const events = matches.map((match) => {
    const start = new Date(match.kickoffUtc);
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
    const city = cityForMatch(match);
    return [
      "BEGIN:VEVENT",
      `UID:${match.id}-${teamId}@worldcup-info-hub`,
      `DTSTAMP:${icsDate(new Date().toISOString())}`,
      `DTSTART:${icsDate(match.kickoffUtc)}`,
      `DTEND:${icsDate(end.toISOString())}`,
      `SUMMARY:${escapeIcsText(`${matchTitle(match)} - World Cup 2026`)}`,
      `LOCATION:${escapeIcsText(`${match.stadium ?? city.stadium}, ${city.name}, ${city.country}`)}`,
      `DESCRIPTION:${escapeIcsText(`${match.stage}. ${teamName} fixture reminder from World Cup Info Hub.`)}`,
      "END:VEVENT",
    ].join("\r\n");
  });

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//World Cup Info Hub//Team Calendar//EN",
    "CALSCALE:GREGORIAN",
    `X-WR-CALNAME:${escapeIcsText(`${teamName} World Cup 2026 fixtures`)}`,
    ...events,
    "END:VCALENDAR",
  ].join("\r\n") + "\r\n";
}
