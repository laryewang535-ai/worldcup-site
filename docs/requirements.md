# Product Requirements

## Project Overview
- Project name: 2026 FIFA World Cup Global Info Hub.
- Product type: global World Cup information and data site.
- Audience: English-speaking internet users worldwide.
- Compliance boundaries: informational and utility content only; no betting, cash contests, paid credits, match streaming, copyrighted media misuse, user login, or registration system.
- Business goals: organic Google SEO traffic, Google AdSense monetization, and Amazon Associates gear referrals.
- Deployment target: one-click Vercel deployment with no China ICP filing, no mainland server, and no required backend dependency.

## Technology Stack
- Next.js, React, TypeScript, and Tailwind CSS.
- Frontend-first rendering with no database, admin backend, or account system.
- Fully responsive desktop and mobile layout with light and dark themes.

## Site Map And Features

### 1. Home (/)
- Fixed top navigation: Home, Schedule, Scores, Standings, Teams, News, Polls, Gear.
- World Cup kickoff countdown hero.
- Featured matches module.
- Three-day schedule preview.
- Recent completed results ticker.
- Global footer links: Privacy Policy, Disclaimer, Contact, Subscribe.
- Reserved ad placements: top banner, in-feed slots, and bottom slot.

### 2. Schedule (/schedule)
- Match list filtered or switched by date.
- Match details: home team, away team, team placeholder crest, local kickoff time, stage, and status.
- Status labels: Upcoming, Live (Delayed), Full Time.
- Reserved ad placements between list sections.

### 3. Scores (/scores)
- Delayed score display with frontend refresh every 3 minutes.
- Reverse chronological ordering with completed matches prioritized.
- Minimal result data: score and concise key events.
- No odds, spreads, betting, wagering, or handicap content.

### 4. Standings (/standings)
- Grouped standings tables with deterministic sorting.
- Columns: Rank, Team, Pld, W, D, L, GF, GA, GD, Pts.
- Highlight qualification positions.
- Horizontal scrolling support on mobile.

### 5. Teams (/teams and /teams/[teamId])
- Card list of all participating teams.
- Team detail pages with crest placeholder, group, English profile, and related schedule.
- Use generic copyright-safe visual assets; do not use official FIFA copyrighted assets.

### 6. News (/news and /news/[articleSlug])
- Article list with title, publish date, summary, and category tag.
- Article detail pages with body content and related articles.
- SEO-friendly static routes with inline and bottom ad placements.
- Categories: Previews, Reviews, Team Facts, Player Focus.

### 7. Required Compliance Pages
- Privacy Policy at /privacy.
- Disclaimer at /disclaimer.
- 404 page.

### 8. Planned Modules Included In The Base Build
- Polls at /polls: one-question poll, live results, duplicate-vote prevention.
- Gear at /gear: affiliate product cards and outbound links.
- Subscribe at /subscribe: minimal email subscription entry.

## SEO And Performance
- Each page has a dedicated title, meta description, and clean heading hierarchy.
- Lazy-loaded images, English alt text, and optimized code output.
- Generated sitemap.xml with semantic lowercase dashed URLs.
- Breadcrumb navigation and mobile-friendly layout.
- Fast page loads to reduce bounce rate.

## UI And Interaction
- Minimal modern sports interface with restrained motion.
- Primary colors: navy #0F172A and accent green #10B981.
- Light and dark theme support.
- Ads must not cover core content, induce clicks, or use pop-ups.

## Data Interface
- Prepared integration paths for TheSportsDB and Football-Data.org.
- Shared request helpers with scheduled refresh and fallback handling.
- Use only public structured match data; do not scrape copyrighted content.
- Store no private user data and request no sensitive permissions.

## Delivery Criteria
- Complete source code ready for deployment.
- Clean project structure and readable code.
- All pages, routes, ad placements, and API placeholders implemented.
- Buildable and deployable without major follow-up changes.
