import { NextResponse } from "next/server";
import { fetchSchedule } from "@/lib/api";
import { buildMatchIcs } from "@/lib/calendar";
import { MATCHES, matchById } from "@/lib/data/matches";
import { matchSlug } from "@/lib/matchSeo";

type Props = { params: { matchId: string } };

export async function GET(_request: Request, { params }: Props) {
  const schedule = await fetchSchedule();
  const match = schedule.find((m) => m.id === params.matchId) ?? matchById(params.matchId) ?? MATCHES.find((m) => m.id === params.matchId);
  if (!match) {
    return NextResponse.json({ error: "Match not found" }, { status: 404 });
  }

  return new NextResponse(buildMatchIcs(match), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${matchSlug(match)}.ics"`,
    },
  });
}
