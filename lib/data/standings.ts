import type { StandingRow } from "@/lib/types";
import { TEAMS } from "@/lib/data/teams";

/** 小组积分榜：确定性伪数据，按积分/净胜球/进球排序 */
const SEED: Record<string, StandingRow[]> = {};

function seedStandings() {
  const byGroup = TEAMS.reduce<Record<string, typeof TEAMS>>((acc, t) => {
    acc[t.group] = acc[t.group] ? [...acc[t.group], t] : [t];
    return acc;
  }, {});

  for (const g of Object.keys(byGroup)) {
    const patterns: Array<{ w: number; d: number; l: number; gf: number; ga: number }> = [
      { w: 2, d: 1, l: 0, gf: 6, ga: 2 },
      { w: 1, d: 1, l: 1, gf: 4, ga: 4 },
      { w: 0, d: 2, l: 1, gf: 2, ga: 3 },
      { w: 0, d: 1, l: 2, gf: 1, ga: 5 },
    ];

    const rows: StandingRow[] = byGroup[g].map((t, idx) => {
      const p = patterns[idx % patterns.length];
      const pts = p.w * 3 + p.d;
      return {
        teamId: t.id,
        pld: p.w + p.d + p.l,
        w: p.w,
        d: p.d,
        l: p.l,
        gf: p.gf + (g.charCodeAt(0) % 2),
        ga: p.ga,
        pts,
        qualified: false,
      };
    });

    rows.sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      const gda = a.gf - a.ga;
      const gdb = b.gf - b.ga;
      if (gdb !== gda) return gdb - gda;
      return b.gf - a.gf;
    });

    rows.forEach((r, i) => {
      r.qualified = i < 2;
    });

    SEED[g] = rows;
  }
}

seedStandings();

export function getStandingsByGroup(): Record<string, StandingRow[]> {
  return { ...SEED };
}
