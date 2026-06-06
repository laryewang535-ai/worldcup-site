#!/usr/bin/env node
/**
 * Deploy the sync-matches Worker:
 * 1. Read FOOTBALL_DATA_KEY from the project-root .env.local when present.
 * 2. npm install + wrangler secret + wrangler deploy
 *
 * Requires Cloudflare login: npx wrangler login.
 * Or set the CLOUDFLARE_API_TOKEN environment variable.
 */
import { readFile, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const workerDir = resolve(root, "workers/sync-matches");

function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, { stdio: "inherit", cwd: workerDir, ...opts });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

function parseEnvFile(text) {
  const out = {};
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
    if (key) out[key] = value;
  }
  return out;
}

async function loadRootEnv() {
  try {
    const text = await readFile(resolve(root, ".env.local"), "utf8");
    return parseEnvFile(text);
  } catch (e) {
    if (e?.code === "ENOENT") return {};
    throw e;
  }
}

async function patchBucketName(bucketName) {
  const tomlPath = resolve(workerDir, "wrangler.toml");
  let toml = await readFile(tomlPath, "utf8");
  toml = toml.replace(/^bucket_name\s*=\s*".*"$/m, `bucket_name = "${bucketName}"`);
  await writeFile(tomlPath, toml, "utf8");
  console.log(`[deploy] wrangler.toml bucket_name -> ${bucketName}`);
}

async function main() {
  const bucketFromEnv = process.env.R2_BUCKET_NAME?.trim();
  const bucketArg = process.argv.find((a) => a.startsWith("--bucket="))?.slice("--bucket=".length);
  const bucketName = bucketArg || bucketFromEnv;

  if (bucketName) {
    await patchBucketName(bucketName);
  } else {
    console.warn(
      "[deploy] Missing R2 bucket. Set R2_BUCKET_NAME or run: node scripts/deploy-sync-worker.mjs --bucket=your-bucket-name",
    );
  }

  console.log("[deploy] npm install (workers/sync-matches)...");
  run("npm", ["install"]);

  console.log("[deploy] wrangler whoami...");
  run("npx", ["wrangler", "whoami"]);

  const env = await loadRootEnv();
  const key = process.env.FOOTBALL_DATA_KEY?.trim() || env.FOOTBALL_DATA_KEY?.trim();
  if (key) {
    console.log("[deploy] Uploading FOOTBALL_DATA_KEY secret...");
    const r = spawnSync("npx", ["wrangler", "secret", "put", "FOOTBALL_DATA_KEY"], {
      cwd: workerDir,
      input: key,
      stdio: ["pipe", "inherit", "inherit"],
    });
    if (r.status !== 0) process.exit(r.status ?? 1);
  } else {
    console.warn("[deploy] FOOTBALL_DATA_KEY not found. Run manually: cd workers/sync-matches && npx wrangler secret put FOOTBALL_DATA_KEY");
  }

  console.log("[deploy] wrangler deploy...");
  run("npx", ["wrangler", "deploy"]);

  console.log("\n[deploy] Done. Trigger a manual sync:");
  console.log("  npm run worker:sync-once");
  console.log("or POST https://sync-matches-worker.<your-subdomain>.workers.dev/sync");
}

main().catch((e) => {
  console.error("[deploy] failed:", e);
  process.exit(1);
});
