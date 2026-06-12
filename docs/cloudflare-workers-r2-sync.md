# Cloudflare Workers Sync To R2

## Flow
```text
Workers Cron every 3 minutes
  -> football-data.org API
  -> map to MatchRecord[]
  -> write matches.json to Cloudflare R2
  -> Vercel reads it through MATCHES_FEED_URL
```

Code directory: `workers/sync-matches/`.

## First Deployment
1. Sign in to Cloudflare using one of these options:
```bash
cd workers/sync-matches
npx wrangler login
```
Or set the `CLOUDFLARE_API_TOKEN` environment variable.

2. Confirm that `bucket_name` in `workers/sync-matches/wrangler.toml` matches your R2 bucket name.

3. From the project root, run:
```bash
R2_BUCKET_NAME=your-bucket-name npm run worker:deploy
```
The script reads `FOOTBALL_DATA_KEY` from the project-root `.env.local` file when present and uploads it as a Worker secret.

## Manual Sync
After deployment:
```bash
WORKER_SYNC_URL=https://sync-matches-worker.<subdomain>.workers.dev/sync npm run worker:sync-once
```
Or use the Cloudflare dashboard: Workers -> sync-matches-worker -> Triggers -> Trigger Cron.

## Verification
1. Confirm that the public R2 URL opens JSON, for example `https://your-r2-domain.example/matches.json`.
2. Confirm that local or Vercel `/api/matches` returns the same R2 data. The default cache can take up to 3 minutes.

## GitHub Actions
After enabling the Worker, disable `.github/workflows/sync-matches-to-r2.yml` if it exists to avoid duplicate R2 writes.
