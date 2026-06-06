import { NextResponse } from "next/server";
import { resolveMatches } from "@/lib/matchesSource";

export const dynamic = "force-dynamic";

/** Client polling endpoint for schedules and scores; resolveMatches uses a 3-minute memory cache by default. */
export async function GET() {
  try {
    const matches = await resolveMatches();
    return NextResponse.json(matches);
  } catch (e) {
    console.error("[api/matches]", e);
    return NextResponse.json({ error: "MATCHES_LOAD_FAILED" }, { status: 500 });
  }
}
