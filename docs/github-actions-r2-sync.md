# GitHub Actions Sync To Cloudflare R2

## Target Flow
```text
GitHub Actions scheduled trigger
  -> football-data.org API
  -> generate public/matches.json
  -> upload matches.json to Cloudflare R2
  -> Vercel reads the file through MATCHES_FEED_URL
```

## 1. Cloudflare R2 Setup
1. Create an R2 bucket in Cloudflare, for example `worldcup-matches`.
2. Create an R2 API token or access key for the bucket.
3. Make `matches.json` publicly readable:
- Recommended: bind a custom domain such as `https://data.example.com/matches.json`.
- Alternative: use Cloudflare's public access option.

## 2. GitHub Repository Secrets
In the GitHub repository, open Settings -> Secrets and variables -> Actions.

Add these secrets:

| Name | Description |
| --- | --- |
| `FOOTBALL_DATA_KEY` | football-data.org API token |
| `R2_ACCOUNT_ID` | Cloudflare account ID |
| `R2_ACCESS_KEY_ID` | R2 access key ID |
| `R2_SECRET_ACCESS_KEY` | R2 secret access key |
| `R2_BUCKET_NAME` | R2 bucket name, for example `worldcup-matches` |

Optional variable:

| Name | Description |
| --- | --- |
| `FOOTBALL_DATA_COMPETITION_CODE` | Competition code, default `WC` |

## 3. GitHub Actions Workflow
Workflow file:
```text
.github/workflows/sync-matches-to-r2.yml
```

It supports:
- Manual run: Actions -> Sync matches to Cloudflare R2 -> Run workflow.
- Scheduled run: currently every 5 minutes.

GitHub Actions scheduled jobs are not ideal for exact 3-minute intervals. A 5-minute interval is the safer starting point.

## 4. Vercel Environment Variable
In the Vercel project, open Settings -> Environment Variables.

Set:
```bash
MATCHES_FEED_URL=https://your-public-r2-domain/matches.json
```

Do not put `FOOTBALL_DATA_KEY` in Vercel unless you still want Vercel to request football-data directly. Prefer keeping that key only in GitHub Actions.

## 5. Verification
1. Run the workflow manually once in GitHub Actions.
2. Open the public R2 URL:
```text
https://your-public-r2-domain/matches.json
```
Confirm that it returns a JSON array.

3. Open the Vercel site endpoint:
```text
https://your-site-domain/api/matches
```
Confirm that the response comes from the R2 `matches.json` data.

## 6. Troubleshooting
- If GitHub Actions fails, check whether `Generate matches.json` reports a football-data token or competition-code error.
- If upload fails, check the R2 account ID, access key, secret, and bucket name.
- If Vercel still shows demo data, confirm that `MATCHES_FEED_URL` is publicly accessible and returns a JSON array at the root.
