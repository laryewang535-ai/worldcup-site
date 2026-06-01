# GitHub Actions 同步 matches.json 到 Cloudflare R2

## 目标流程

```text
GitHub Actions 定时触发
  -> npm run sync:matches:once
  -> 生成 public/matches.json
  -> 上传到 Cloudflare R2 的 matches.json
  -> Vercel 通过 MATCHES_FEED_URL 读取该文件
```

## 1. Cloudflare R2 准备

1. 在 Cloudflare 创建一个 R2 Bucket，例如：`worldcup-matches`。
2. 为该 Bucket 创建 R2 API Token / Access Key。
3. 让 `matches.json` 可以被公网读取：
   - 推荐给 R2 绑定自定义域名，例如 `https://data.example.com/matches.json`。
   - 或使用 Cloudflare 提供的公开访问方式。

## 2. GitHub 仓库 Secrets

在 GitHub 仓库：

`Settings -> Secrets and variables -> Actions -> Secrets`

新增以下 Secrets：

| 名称 | 说明 |
| --- | --- |
| `FOOTBALL_DATA_KEY` | football-data.org 的 API Token |
| `R2_ACCOUNT_ID` | Cloudflare Account ID |
| `R2_ACCESS_KEY_ID` | R2 Access Key ID |
| `R2_SECRET_ACCESS_KEY` | R2 Secret Access Key |
| `R2_BUCKET_NAME` | R2 Bucket 名称，例如 `worldcup-matches` |

可选变量：

`Settings -> Secrets and variables -> Actions -> Variables`

| 名称 | 说明 |
| --- | --- |
| `FOOTBALL_DATA_COMPETITION_CODE` | 赛事代码，默认 `WC` |

## 3. GitHub Actions 工作流

工作流文件：

```text
.github/workflows/sync-matches-to-r2.yml
```

它支持：

- 手动运行：`Actions -> Sync matches to Cloudflare R2 -> Run workflow`
- 定时运行：当前为每 5 分钟一次

说明：GitHub Actions 的定时任务不适合精确 3 分钟，5 分钟是更稳妥的起步值。

## 4. Vercel 环境变量

在 Vercel 项目：

`Settings -> Environment Variables`

配置：

```bash
MATCHES_FEED_URL=https://你的R2公开域名/matches.json
MATCHES_CACHE_TTL_SECONDS=180
```

不要把 `FOOTBALL_DATA_KEY` 放到 Vercel，除非你仍想让 Vercel 直接请求 football-data。推荐只让 GitHub Actions 持有该 Key。

## 5. 验证

1. 先在 GitHub Actions 手动运行一次 workflow。
2. 打开 R2 公网地址：

```text
https://你的R2公开域名/matches.json
```

确认能看到 JSON 数组。

3. 打开 Vercel 网站：

```text
https://你的站点域名/api/matches
```

确认返回的数据来自 R2 的 `matches.json`。

## 6. 常见问题

- 如果 GitHub Actions 失败，先看 `Generate matches.json` 是否报 football-data token 或赛事代码错误。
- 如果上传失败，检查 R2 的 Account ID、Access Key、Secret、Bucket 名称。
- 如果 Vercel 仍显示演示数据，检查 `MATCHES_FEED_URL` 是否是公网可访问 URL，且返回根节点为 JSON 数组。
