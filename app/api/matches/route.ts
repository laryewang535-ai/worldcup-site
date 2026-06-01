import { NextResponse } from "next/server";
import { resolveMatches } from "@/lib/matchesSource";

export const dynamic = "force-dynamic";

/** 客户端轮询赛程/比分；服务端 resolveMatches 默认 3 分钟内存缓存，避免每次轮询都打外网 */
export async function GET() {
  try {
    const matches = await resolveMatches();
    return NextResponse.json(matches);
  } catch (e) {
    console.error("[api/matches]", e);
    return NextResponse.json({ error: "MATCHES_LOAD_FAILED" }, { status: 500 });
  }
}
