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

function emptyRow(teamId: string, teamName?: string): StandingRow {
  return {
    teamId,
    teamName,
    pld: 0,
    w: 0,
    d: 0,
    l: 0,
    gf: 0,
    ga: 0,
    pts: 0,
    qualified: false,
  };
}

function groupFromStage(stage: string): string | null {
  const match = stage.match(/\bGROUP\s+([A-Z])\b/i);
  return match?.[1]?.toUpperCase() ?? null;
}

export function getStandingsByGroupFromMatches(matches: MatchRecord[]): Record<string, StandingRow[]> {
  const remoteStandings: Record<string, StandingRow[]> = {};
  const remoteRowByGroupTeam = new Map<string, StandingRow>();

  for (const match of matches) {
    const group = groupFromStage(match.stage);
    if (!group) continue;

    remoteStandings[group] = remoteStandings[group] ?? [];
    for (const side of [
      { id: match.homeId, name: match.homeDisplay },
      { id: match.awayId, name: match.awayDisplay },
    ]) {
      const key = `${group}:${side.id}`;
      if (remoteRowByGroupTeam.has(key)) continue;
      const row = emptyRow(side.id, side.name);
      remoteRowByGroupTeam.set(key, row);
      remoteStandings[group].push(row);
    }
  }

  if (remoteRowByGroupTeam.size > 0) {
    for (const match of matches) {
      const group = groupFromStage(match.stage);
      if (
        !group ||
        match.status !== "Full Time" ||
        typeof match.homeScore !== "number" ||
        typeof match.awayScore !== "number"
      ) {
        continue;
      }

      const home = remoteRowByGroupTeam.get(`${group}:${match.homeId}`);
      const away = remoteRowByGroupTeam.get(`${group}:${match.awayId}`);
      if (!home || !away) continue;

      applyResult(home, away, match.homeScore, match.awayScore);
    }

    return Object.fromEntries(
      Object.entries(remoteStandings).map(([group, rows]) => [group, sortRows(rows)]),
    );
  }

  const standings = cloneSeed();
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
    if (!home || !away) continue;
    applyResult(home, away, match.homeScore, match.awayScore);
  }

  return Object.fromEntries(
    Object.entries(standings).map(([group, rows]) => [group, sortRows(rows)]),
  );
}

function applyResult(home: StandingRow, away: StandingRow, homeScore: number, awayScore: number) {
  home.pld += 1;
  away.pld += 1;
  home.gf += homeScore;
  home.ga += awayScore;
  away.gf += awayScore;
  away.ga += homeScore;

  if (homeScore > awayScore) {
    home.w += 1;
    home.pts += 3;
    away.l += 1;
  } else if (homeScore < awayScore) {
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
