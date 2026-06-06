import type { ArticleRecord } from "@/lib/types";

export const ARTICLES: ArticleRecord[] = [
  {
    slug: "world-cup-2026-local-time-guide",
    title: "How to Read World Cup 2026 Kickoff Times",
    publishedAt: "2026-06-01T08:00:00.000Z",
    summary:
      "A simple guide to UTC, host-city time zones, and device-local match times for global fans.",
    category: "Guides",
    body: [
      "World Cup 2026 matches are hosted across Canada, Mexico, and the United States, so kickoff times can span several time zones. This site stores kickoff times in UTC and displays practical local-time views on schedule, team, city, and match pages.",
      "If you are travelling, compare the listed host city with your device time before adding fixtures to your calendar. Calendar downloads are intended to make that conversion easier, but official ticketing and venue notices should always be checked before match day.",
      "For SEO and user clarity, each match guide focuses on the teams, host city, venue context, and kickoff time rather than unconfirmed broadcast or ticket details.",
    ],
  },
  {
    slug: "world-cup-2026-group-standings-explained",
    title: "World Cup 2026 Group Standings Explained",
    publishedAt: "2026-06-01T08:10:00.000Z",
    summary:
      "What Pld, W, D, L, GF, GA, GD, and Pts mean before results start updating.",
    category: "Explainers",
    body: [
      "Group tables start at zero before confirmed results are available. Pld means matches played, W is wins, D is draws, L is losses, GF is goals for, GA is goals against, GD is goal difference, and Pts is total points.",
      "A win is worth three points and a draw is worth one point. Goal difference and goals scored are commonly used to separate teams with the same points total, though official tournament rules should be checked for the final tie-break order.",
      "This site avoids projected rankings before matches are played. Standings pages are designed to become more useful once verified results are available.",
    ],
  },
  {
    slug: "world-cup-2026-city-guide-checklist",
    title: "World Cup 2026 Host City Checklist",
    publishedAt: "2026-06-01T08:20:00.000Z",
    summary:
      "A neutral checklist for comparing host-city pages, venue context, and match-day preparation.",
    category: "Guides",
    body: [
      "Host city pages collect venue name, country, time zone, related matches, and practical preparation notes in one place. They are designed for fans comparing travel windows and local kickoff times.",
      "Before travelling, check official venue rules, transport notices, bag policies, and ticketing guidance. This site keeps preparation tips neutral when official details are not yet confirmed.",
      "Useful items for long match days can include a portable charger, clear bag where required, comfortable walking shoes, weather-appropriate layers, and hydration planning within venue rules.",
    ],
  },
  {
    slug: "world-cup-2026-calendar-reminders-guide",
    title: "Using Calendar Reminders for World Cup 2026 Matches",
    publishedAt: "2026-06-01T08:30:00.000Z",
    summary:
      "How match and team calendar files help fans keep kickoff times organized.",
    category: "Guides",
    body: [
      "Each match page can provide a calendar download for a single fixture, while team pages can provide a team fixture calendar. These files are especially useful when matches are shown in a time zone different from your own.",
      "Calendar apps may display converted local times based on your device settings. If you travel during the tournament, recheck the event time after your device time zone changes.",
      "Calendar reminders are convenience tools, not official ticketing or broadcast notices. Always compare them with official tournament information for high-stakes planning.",
    ],
  },
];

export function articleBySlug(slug: string): ArticleRecord | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function relatedArticles(
  slug: string,
  limit = 3,
): ArticleRecord[] {
  return ARTICLES.filter((a) => a.slug !== slug).slice(0, limit);
}
