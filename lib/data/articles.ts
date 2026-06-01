import type { ArticleRecord } from "@/lib/types";

export const ARTICLES: ArticleRecord[] = [
  {
    slug: "opening-weekend-storylines",
    title: "Opening Weekend Storylines to Track",
    publishedAt: "2026-06-09T10:00:00.000Z",
    summary:
      "Compact schedules, travel load, and early yellow-card risk could shape the first knockout pathways.",
    category: "Previews",
    body: [
      "The opening weekend often sets the emotional temperature for the entire tournament. Managers must balance intensity with rotation risk, especially when the third group game arrives quickly on short rest.",
      "Look for teams that can control tempo without overcommitting full-backs. Early goals can force reactive substitutions that echo through matchday three when margins are tight.",
      "This hub focuses on schedules, standings, and neutral match facts—no wagering or odds discussion—so you can follow the narrative without noise.",
    ],
  },
  {
    slug: "tactical-review-high-press",
    title: "Tactical Review: High Press vs Mid-Block",
    publishedAt: "2026-06-07T14:30:00.000Z",
    summary:
      "A concise review of how two defensive shapes change transition danger and set-piece volume.",
    category: "Reviews",
    body: [
      "High pressing can create quick wins, but it raises foul counts and set-piece exposure. Mid-blocks sacrifice some initiative yet can funnel attacks toward predictable wide zones.",
      "The best teams toggle between both states within the same half, using triggers based on opponent build-up patterns rather than static lines.",
    ],
  },
  {
    slug: "team-facts-squad-rotation",
    title: "Team Facts: Rotation Windows and Travel",
    publishedAt: "2026-06-05T09:15:00.000Z",
    summary:
      "Travel distance between venues remains a practical constraint for several squads.",
    category: "Team Facts",
    body: [
      "Venue clusters reduce fatigue, while cross-border trips increase recovery demands. Staff track sleep, hydration, and soft-tissue markers more aggressively during short turnarounds.",
      "Fans can use the schedule page to compare local kickoff times and plan viewing windows without third-party apps.",
    ],
  },
  {
    slug: "player-focus-midfield-pairs",
    title: "Player Focus: Midfield Pair Chemistry",
    publishedAt: "2026-06-03T11:45:00.000Z",
    summary:
      "Why complementary profiles beat star stacking in central areas.",
    category: "Player Focus",
    body: [
      "A destroyer-plus-progressor pairing remains the most stable spine for knockout football. The destroyer resets danger; the progressor advances play with fewer touches.",
      "When both profiles overlap, lines become porous. Coaches often solve this with staggered pressing roles rather than pure man-marking.",
    ],
  },
  {
    slug: "group-stage-predictions-cautious",
    title: "Group Stage Predictions: A Cautious Framework",
    publishedAt: "2026-06-01T08:00:00.000Z",
    summary:
      "Use standings math, not vibes: points, goal difference, then goals scored.",
    category: "Previews",
    body: [
      "FIFA-style tiebreakers reward clarity. When two teams are level on points, goal difference is the first separator, followed by goals scored, then head-to-head where applicable.",
      "Our standings view mirrors that hierarchy visually so you can sanity-check scenarios as results arrive.",
    ],
  },
  {
    slug: "set-piece-trends-review",
    title: "Set-Piece Trends: Ins and Outs",
    publishedAt: "2026-05-28T16:20:00.000Z",
    summary:
      "Delivery shapes, screening runs, and second-ball hunting decide most dead-ball goals.",
    category: "Reviews",
    body: [
      "Near-post flick-ons remain popular, but far-post recycling has grown as keepers cheat centrally. Defensive coaches now assign dedicated second-ball hunters outside the six-yard box.",
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
