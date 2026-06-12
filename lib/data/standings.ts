import type { MatchRecord, StandingRow } from "@/lib/types";
import { TEAMS } from "@/lib/data/teams";

/** Pre-tournament tables start at zero until confirmed results are available. */
const SEED: Record<string, StandingRow[]> = {};

function seedStandings() {
  const byGroup = TEAMS.reduce<Record<string, typeof TEAMS>>((acc, t) => {
    acc[t.group] = acc[t.group] ? [...acc[t.group], t] : [t];
    return acc;
  }, {});

  for (const g of Object.keys(byGroup)) {
    const rows: StandingRow[] = byGroup[g].map((t) => ({
      teamId: t.id,
      pld: 0,
      w: 0,
      d: 0,
      l: 0,
      gf: 0,
      ga: 0,
      pts: 0,
      qualified: false,
    }));

    SEED[g] = rows;
  }
}

seedStandings();

export function getStandingsByGroup(): Record<string, StandingRow[]> {
  return { ...SEED };
}

function cloneSeed(): Record<string, StandingRow[]> {
  return Object.fromEntries(
    Object.entries(SEED).map(([group, rows]) => [
      group,
      rows.map((row) => ({ ...row })),
    ]),
  );
}

function sortRows(rows: StandingRow[]): StandingRow[] {
  return rows.sort((a, b) => {
    const gdA = a.gf - a.ga;
    const gdB = b.gf - b.ga;
    return b.pts - a.pts || gdB - gdA || b.gf - a.gf || a.teamId.localeCompare(b.teamId);
  });
}

export function getStandingsByGroupFromMatches(matches: MatchRecord[]): Record<string, StandingRow[]> {
  const standings = cloneSeed();
  const teamGroups = Object.fromEntries(TEAMS.map((team) => [team.id, team.group]));
  const rowByTeam = new Map<string, StandingRow>();

  for (const rows of Object.values(standings)) {
    for (const row of rows) {
      rowByTeam.set(row.teamId, row);
    }
  }

  for (const match of matches) {
    if (
      match.status !== "Full Time" ||
      typeof match.homeScore !== "number" ||
      typeof match.awayScore !== "number"
    ) {
      continue;
    }

    const home = rowByTeam.get(match.homeId);
    const away = rowByTeam.get(match.awayId);
    if (!home || !away || teamGroups[match.homeId] !== teamGroups[match.awayId]) {
      continue;
    }

    home.pld += 1;
    away.pld += 1;
    home.gf += match.homeScore;
    home.ga += match.awayScore;
    away.gf += match.awayScore;
    away.ga += match.homeScore;

    if (match.homeScore > match.awayScore) {
      home.w += 1;
      home.pts += 3;
      away.l += 1;
    } else if (match.homeScore < match.awayScore) {
      away.w += 1;
      away.pts += 3;
      home.l += 1;
    } else {
      home.d += 1;
      away.d += 1;
      home.pts += 1;
      away.pts += 1;
    }
  }

  return Object.fromEntries(
    Object.entries(standings).map(([group, rows]) => [group, sortRows(rows)]),
  );
}
