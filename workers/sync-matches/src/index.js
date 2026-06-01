const FOOTBALL_DATA_BASE = "https://api.football-data.org/v4";

function slugify(input) {
  return String(input)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function mapStatus(raw) {
  const status = String(raw ?? "").toUpperCase();
  if (status === "FINISHED" || status === "AWARDED") return "Full Time";
  if (status === "LIVE" || status === "IN_PLAY" || status === "PAUSED") return "Live";
  return "Upcoming";
}

function cleanStage(value) {
  return String(value ?? "")
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildStage(match) {
  const matchday = match.matchday != null ? String(match.matchday) : "—";
  const base = cleanStage(match.group) || cleanStage(match.stage) || "Match";
  return `${base} · Matchday ${matchday}`;
}

function teamName(team) {
  return team?.name || team?.shortName || team?.tla || "";
}

function mapMatch(match) {
  if (match?.id == null || !match.utcDate) return null;

  const homeName = teamName(match.homeTeam);
  const awayName = teamName(match.awayTeam);
  if (!homeName || !awayName) return null;

  const kickoffMs = Date.parse(match.utcDate);
  if (Number.isNaN(kickoffMs)) return null;

  const status = mapStatus(match.status);
  const fullTime = match.score?.fullTime;
  const homeScore =
    status === "Upcoming" ? undefined : fullTime?.home != null ? Number(fullTime.home) : undefined;
  const awayScore =
    status === "Upcoming" ? undefined : fullTime?.away != null ? Number(fullTime.away) : undefined;

  return {
    id: `fd-${match.id}`,
    homeId: slugify(homeName),
    awayId: slugify(awayName),
    homeDisplay: homeName,
    awayDisplay: awayName,
    kickoffUtc: new Date(kickoffMs).toISOString(),
    stage: buildStage(match),
    status,
    ...(Number.isFinite(homeScore) ? { homeScore } : {}),
    ...(Number.isFinite(awayScore) ? { awayScore } : {}),
  };
}

/** 从 football-data 拉取并映射为 MatchRecord[] */
async function fetchFootballDataMatches(env) {
  const token = env.FOOTBALL_DATA_KEY?.trim();
  if (!token) {
    throw new Error("缺少 FOOTBALL_DATA_KEY，请执行 wrangler secret put FOOTBALL_DATA_KEY");
  }

  const competition = env.FOOTBALL_DATA_COMPETITION_CODE?.trim() || "WC";
  const url = `${FOOTBALL_DATA_BASE}/competitions/${encodeURIComponent(competition)}/matches`;

  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "X-Auth-Token": token,
    },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`football-data HTTP ${res.status}: ${body.slice(0, 200)}`);
  }

  const data = await res.json();
  const matches = (Array.isArray(data?.matches) ? data.matches : [])
    .map(mapMatch)
    .filter(Boolean)
    .sort((a, b) => Date.parse(a.kickoffUtc) - Date.parse(b.kickoffUtc));

  if (!matches.length) {
    throw new Error("football-data 返回成功，但没有可映射的比赛数据");
  }

  return matches;
}

/** 写入 R2 的 matches.json */
async function writeMatchesToR2(env, matches) {
  await env.MATCHES_BUCKET.put("matches.json", `${JSON.stringify(matches, null, 2)}\n`, {
    httpMetadata: {
      contentType: "application/json; charset=utf-8",
      cacheControl: "public, max-age=180",
    },
  });
}

async function syncMatches(env) {
  const matches = await fetchFootballDataMatches(env);
  await writeMatchesToR2(env, matches);
  console.log(`[sync-matches-worker] 写入 ${matches.length} 场比赛 -> matches.json`);
  return { count: matches.length, syncedAt: new Date().toISOString() };
}

function isAuthorizedManualTrigger(request, env) {
  const required = env.SYNC_TRIGGER_TOKEN?.trim();
  if (!required) return true;
  const auth = request.headers.get("Authorization")?.trim() ?? "";
  return auth === `Bearer ${required}`;
}

export default {
  async scheduled(event, env, ctx) {
    ctx.waitUntil(
      syncMatches(env).catch((e) => {
        console.error("[sync-matches-worker] 定时同步失败:", e);
      }),
    );
  },

  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/health") {
      return Response.json({ ok: true, service: "sync-matches-worker" });
    }

    if (request.method === "POST" && (url.pathname === "/" || url.pathname === "/sync")) {
      if (!isAuthorizedManualTrigger(request, env)) {
        return Response.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
      }
      try {
        const result = await syncMatches(env);
        return Response.json({ ok: true, ...result });
      } catch (e) {
        console.error("[sync-matches-worker] 手动同步失败:", e);
        return Response.json({ ok: false, error: String(e?.message ?? e) }, { status: 500 });
      }
    }

    return new Response(
      "sync-matches-worker\n\nPOST /sync — 手动同步\nGET /health — 健康检查\nCron */3 * * * * — 每 3 分钟自动同步",
      { headers: { "Content-Type": "text/plain; charset=utf-8" } },
    );
  },
};
