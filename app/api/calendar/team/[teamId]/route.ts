import { NextResponse } from "next/server";
import { fetchSchedule } from "@/lib/api";
import { buildTeamIcs } from "@/lib/calendar";
import { MATCHES } from "@/lib/data/matches";
import { getTeamById } from "@/lib/data/teams";

type Props = { params: { teamId: string } };

export async function GET(_request: Request, { params }: Props) {
  const team = getTeamById(params.teamId);
  if (!team) {
    return NextResponse.json({ error: "Team not found" }, { status: 404 });
  }

  const schedule = await fetchSchedule();
  const source = schedule.length ? schedule : MATCHES;
  const matches = source.filter((match) => match.homeId === team.id || match.awayId === team.id);
  return new NextResponse(buildTeamIcs(team.name, team.id, matches), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${team.id}-world-cup-2026-fixtures.ics"`,
    },
  });
}
