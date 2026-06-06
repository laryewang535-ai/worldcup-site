import type { StandingRow } from "@/lib/types";
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
