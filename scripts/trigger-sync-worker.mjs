#!/usr/bin/env node
/**
 * POST to trigger an immediate sync on the deployed sync-matches Worker.
 * WORKER_SYNC_URL defaults to https://sync-matches-worker.<account>.workers.dev/sync.
 * Set WORKER_SYNC_TOKEN when the Worker is configured with SYNC_TRIGGER_TOKEN.
 */
const url =
  process.env.WORKER_SYNC_URL?.trim() ||
  process.argv.find((a) => a.startsWith("--url="))?.slice("--url=".length) ||
  "";

if (!url) {
  console.error("Set WORKER_SYNC_URL or --url=https://sync-matches-worker.xxx.workers.dev/sync");
  process.exit(1);
}

const headers = { "Content-Type": "application/json" };
const token = process.env.WORKER_SYNC_TOKEN?.trim();
if (token) headers.Authorization = `Bearer ${token}`;

const res = await fetch(url, { method: "POST", headers });
const body = await res.text();
console.log(res.status, body);

if (!res.ok) process.exit(1);
