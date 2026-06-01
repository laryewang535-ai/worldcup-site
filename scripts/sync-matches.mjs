import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import process from "node:process";

const FOOTBALL_DATA_BASE = "https://api.football-data.org/v4";
const DEFAULT_COMPETITION = "WC";
const DEFAULT_INTERVAL_SECONDS = 180;
const DEFAULT_OUTPUT = "public/matches.json";

async function loadEnvFile(file) {
  try {
    const text = await readFile(file, "utf8");
    for (const rawLine of text.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith("#")) continue;
      const eq = line.indexOf("=");
      if (eq === -1) continue;
      const key = line.slice(0, eq).trim();
      let value = line.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (key && process.env[key] == null) process.env[key] = value;
    }
  } catch (e) {
    if (e?.code !== "ENOENT") throw e;
  }
}

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

async function fetchFootballDataMatches() {
  const token = process.env.FOOTBALL_DATA_KEY?.trim();
  if (!token) {
    throw new Error("缺少 FOOTBALL_DATA_KEY，请在 .env.local 中配置 football-data.org Token");
  }

  const competition = process.env.FOOTBALL_DATA_COMPETITION_CODE?.trim() || DEFAULT_COMPETITION;
  const url = `${FOOTBALL_DATA_BASE}/competitions/${encodeURIComponent(competition)}/matches`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "X-Auth-Token": token,
    },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`football-data 请求失败：HTTP ${res.status} ${body.slice(0, 200)}`);
  }

  const data = await res.json();
  const raw = Array.isArray(data?.matches) ? data.matches : [];
  const matches = raw
    .map(mapMatch)
    .filter(Boolean)
    .sort((a, b) => Date.parse(a.kickoffUtc) - Date.parse(b.kickoffUtc));

  if (!matches.length) {
    throw new Error("football-data 返回成功，但没有可映射的比赛数据");
  }

  return matches;
}

async function writeJsonAtomic(file, data) {
  const output = resolve(process.cwd(), file);
  await mkdir(dirname(output), { recursive: true });
  const tmp = `${output}.tmp`;
  await writeFile(tmp, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  await rename(tmp, output);
  return output;
}

async function syncOnce() {
  const started = new Date();
  const outputFile = process.env.MATCHES_OUTPUT_PATH?.trim() || DEFAULT_OUTPUT;
  const matches = await fetchFootballDataMatches();
  const output = await writeJsonAtomic(outputFile, matches);
  console.log(
    `[sync-matches] ${started.toISOString()} 写入 ${matches.length} 场比赛 -> ${output}`,
  );
}

async function main() {
  await loadEnvFile(resolve(process.cwd(), ".env.local"));
  await loadEnvFile(resolve(process.cwd(), ".env"));

  const once = process.argv.includes("--once");
  const intervalRaw = process.env.MATCHES_SYNC_INTERVAL_SECONDS?.trim();
  const intervalSeconds = intervalRaw ? Number(intervalRaw) : DEFAULT_INTERVAL_SECONDS;
  const intervalMs =
    Number.isFinite(intervalSeconds) && intervalSeconds > 0
      ? Math.floor(intervalSeconds * 1000)
      : DEFAULT_INTERVAL_SECONDS * 1000;

  const run = async () => {
    try {
      await syncOnce();
    } catch (e) {
      console.error("[sync-matches] 同步失败：", e);
      if (once) process.exitCode = 1;
    }
  };

  await run();
  if (once) return;

  console.log(`[sync-matches] 已启动定时同步，每 ${Math.round(intervalMs / 1000)} 秒刷新一次`);
  setInterval(run, intervalMs);
}

main().catch((e) => {
  console.error("[sync-matches] 启动失败：", e);
  process.exit(1);
});
