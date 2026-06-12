# Design Specification

## Project Overview
- Project name: 2026 FIFA World Cup Global Info Hub.
- Product type: global World Cup information and data website.
- Display language: all pages, navigation, buttons, prompts, hints, articles, and frontend text must be English only.
- Audience: global English-speaking football fans.
- Compliance boundaries: informational utilities only; no betting, cash contests, paid credits, match piracy, official FIFA copyrighted assets, login, or registration.
- Business goals: Google SEO traffic, Google AdSense revenue, and Amazon Associates gear referrals.
- Deployment: free Vercel deployment with no China ICP filing, no mainland server, no backend, and no database.

## Technology Stack
- Next.js, React, TypeScript, and Tailwind CSS.
- Static-first frontend implementation with no admin system and no membership system.
- Responsive desktop, tablet, and mobile layouts with light and dark theme switching.

## Pages And Functional Details

### 1. Home (/)
- Fixed top navigation: Home, Schedule, Scores, Standings, Teams, News, Polls, Gear.
- World Cup kickoff countdown hero.
- Featured matches section.
- Upcoming three-day match preview.
- Recent completed results ticker.
- Footer links: Privacy Policy, Disclaimer, Contact, Subscribe.
- Reserved ad slots: top banner, mid-feed placements, and bottom slot.

### 2. Schedule (/schedule)
- Date filtering plus today, tomorrow, and all-match views when available.
- Match content: teams, placeholder crests, localized kickoff time, stage, and status.
- Status labels: Upcoming, Live (Delayed), Full Time.
- Reserved ad slots between match list sections.

### 3. Scores (/scores)
- Delayed scores refreshed every 3 minutes on the client.
- Reverse chronological order with completed matches first.
- Minimal score and event details only.
- Strictly exclude odds, spreads, betting, wagering, and contest language.

### 4. Standings (/standings)
- Grouped standings sorted by World Cup-style rules.
- Columns: Rank, Team, Pld, W, D, L, GF, GA, GD, Pts.
- Highlight teams in qualification positions.
- Support horizontal scrolling on mobile.

### 5. Teams (/teams and /teams/[teamId])
- List all participating teams in cards.
- Team details include crest placeholder, group, English profile, and related fixtures.
- Use copyright-safe generic visuals to avoid official asset risk.

### 6. News (/news and /news/[articleSlug])
- Article list with title, publish date, summary, and category tag.
- Article pages with English body content and related article recommendations.
- SEO-friendly static routes with inline and bottom ad slots.
- Categories: Previews, Reviews, Team Facts, Player Focus.

### 7. Compliance Pages
- English Privacy Policy at /privacy.
- English Disclaimer at /disclaimer.
- 404 page.

### 8. Iteration-Ready Modules
- Polls at /polls: single-question poll, live results chart, device-level duplicate-vote prevention.
- Gear at /gear: Amazon Associates product cards and outbound links.
- Subscribe at /subscribe: minimal email subscription entry.

## SEO And Performance
- Dedicated title and meta description for every page.
- Clean H1-H6 hierarchy.
- Lazy-loaded images, English alt text, and minified production output.
- Generated sitemap.xml with semantic lowercase dashed URLs.
- Breadcrumbs across the site for Google mobile indexing compatibility.
- Fast loading to reduce bounce rate.

## UI Guidelines
- Minimal modern sports design with no unnecessary decorative animation.
- Primary color: #0F172A. Accent color: #10B981.
- Global light and dark mode support.
- Ad placements must be clear, non-blocking, non-deceptive, and free of pop-ups.

## Data Guidelines
- Prepare integration code for TheSportsDB and Football-Data.org APIs.
- Use shared request helpers with refresh and fallback behavior.
- Use public structured match data only; do not scrape copyrighted editorial content.
- Store no private user data and request no sensitive permissions.

## Development Delivery
- Provide a complete deployable source tree.
- Keep project structure clean and comments concise.
- Implement all pages, routes, ad slots, and API integration placeholders.
- The project should build and deploy to Vercel without major rewrites.
