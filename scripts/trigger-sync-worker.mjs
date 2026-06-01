#!/usr/bin/env node
/**
 * POST 触发已部署的 sync-matches Worker 立即同步一次。
 * 环境变量 WORKER_SYNC_URL，默认 https://sync-matches-worker.<account>.workers.dev/sync
 * 若 Worker 配置了 SYNC_TRIGGER_TOKEN，设置 WORKER_SYNC_TOKEN。
 */
const url =
  process.env.WORKER_SYNC_URL?.trim() ||
  process.argv.find((a) => a.startsWith("--url="))?.slice("--url=".length) ||
  "";

if (!url) {
  console.error("请设置 WORKER_SYNC_URL 或 --url=https://sync-matches-worker.xxx.workers.dev/sync");
  process.exit(1);
}

const headers = { "Content-Type": "application/json" };
const token = process.env.WORKER_SYNC_TOKEN?.trim();
if (token) headers.Authorization = `Bearer ${token}`;

const res = await fetch(url, { method: "POST", headers });
const body = await res.text();
console.log(res.status, body);

if (!res.ok) process.exit(1);
