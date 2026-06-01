# Cloudflare Workers 同步 matches.json 到 R2

## 流程

```text
Workers Cron（每 3 分钟）
  -> football-data.org
  -> 映射 MatchRecord[]
  -> R2: matches.json
  -> Vercel 通过 MATCHES_FEED_URL 读取
```

代码目录：`workers/sync-matches/`

## 首次部署

1. 登录 Cloudflare（二选一）：
   ```bash
   cd workers/sync-matches && npx wrangler login
   ```
   或设置环境变量 `CLOUDFLARE_API_TOKEN`。

2. 确认 `workers/sync-matches/wrangler.toml` 里 `bucket_name` 为你的 R2 Bucket 名称。

3. 在项目根目录执行：
   ```bash
   R2_BUCKET_NAME=你的bucket名 npm run worker:deploy
   ```
   脚本会从根目录 `.env.local` 读取 `FOOTBALL_DATA_KEY` 并上传为 Worker Secret。

## 手动触发同步

部署成功后：
```bash
WORKER_SYNC_URL=https://sync-matches-worker.<子域>.workers.dev/sync npm run worker:sync-once
```

或在 Cloudflare 控制台：Workers → sync-matches-worker → Triggers → **Trigger Cron**.

## 验证

1. R2 公网地址能打开 JSON：`https://你的r2.dev/matches.json`
2. 本地或 Vercel：`/api/matches` 与 R2 数据一致（默认最多 3 分钟缓存）

## 与 GitHub Actions

启用 Worker 后，可停用 `.github/workflows/sync-matches-to-r2.yml`，避免重复写入 R2。
