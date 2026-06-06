export type MatchStatus = "Upcoming" | "Live" | "Full Time";

export type MatchRecord = {
  id: string;
  homeId: string;
  awayId: string;
  /** 外部数据在本地队库无记录时的展示名 */
  homeDisplay?: string;
  awayDisplay?: string;
  /** ISO 8601 UTC 时间 */
  kickoffUtc: string;
  stage: string;
  citySlug?: string;
  stadium?: string;
  status: MatchStatus;
  homeScore?: number;
  awayScore?: number;
  /** 极简关键事件，正文为英文 */
  events?: string[];
  featured?: boolean;
};

export type CityRecord = {
  slug: string;
  name: string;
  country: "Canada" | "Mexico" | "United States";
  stadium: string;
  timezone: string;
  summary: string;
  transportNotes: string[];
  prepTips: string[];
};

export type TeamRecord = {
  id: string;
  name: string;
  group: string;
  intro: string;
};

export type StandingRow = {
  teamId: string;
  pld: number;
  w: number;
  d: number;
  l: number;
  gf: number;
  ga: number;
  pts: number;
  /** Qualification status once it is confirmed. */
  qualified?: boolean;
};

export type NewsCategory =
  | "Guides"
  | "Explainers";

export type ArticleRecord = {
  slug: string;
  title: string;
  publishedAt: string;
  summary: string;
  category: NewsCategory;
  body: string[];
};
