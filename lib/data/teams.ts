import type { TeamRecord } from "@/lib/types";
import { slugify } from "@/lib/slug";

const GROUPS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
] as const;

const NAMES: string[] = [
  "United States",
  "Mexico",
  "Canada",
  "Brazil",
  "Argentina",
  "Colombia",
  "Uruguay",
  "Ecuador",
  "England",
  "France",
  "Spain",
  "Germany",
  "Italy",
  "Netherlands",
  "Belgium",
  "Portugal",
  "Switzerland",
  "Denmark",
  "Sweden",
  "Norway",
  "Poland",
  "Croatia",
  "Serbia",
  "Wales",
  "Japan",
  "South Korea",
  "Australia",
  "Iran",
  "Saudi Arabia",
  "Morocco",
  "Nigeria",
  "Senegal",
  "Egypt",
  "Ghana",
  "Tunisia",
  "Algeria",
  "Costa Rica",
  "Jamaica",
  "Panama",
  "Honduras",
  "New Zealand",
  "Ukraine",
  "Austria",
  "Czechia",
  "Turkey",
  "Scotland",
  "Paraguay",
  "Chile",
  "Peru",
];

function buildTeams(): TeamRecord[] {
  const out: TeamRecord[] = [];
  let i = 0;
  for (const g of GROUPS) {
    for (let k = 0; k < 4; k++) {
      const name = NAMES[i] ?? `Team ${i + 1}`;
      const id = slugify(name);
      out.push({
        id,
        name,
        group: g,
        intro: `${name} enters the 2026 finals with a clear tactical identity, squad depth across Europe and domestic leagues, and supporters expecting decisive group-stage performances before the knockout rounds.`,
      });
      i++;
    }
  }
  return out;
}

export const TEAMS: TeamRecord[] = buildTeams();

export function getTeamById(id: string): TeamRecord | undefined {
  return TEAMS.find((t) => t.id === id);
}

export function teamsByGroup(): Record<string, TeamRecord[]> {
  return TEAMS.reduce<Record<string, TeamRecord[]>>((acc, t) => {
    acc[t.group] = acc[t.group] ? [...acc[t.group], t] : [t];
    return acc;
  }, {});
}
