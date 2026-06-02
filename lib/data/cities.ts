import type { CityRecord, MatchRecord } from "@/lib/types";

export const CITIES: CityRecord[] = [
  {
    slug: "atlanta",
    name: "Atlanta",
    country: "United States",
    stadium: "Atlanta Stadium",
    timezone: "America/New_York",
    summary:
      "A southeast U.S. host city with indoor match-day conditions and strong airport access for international fans.",
    transportNotes: [
      "Check official transit and stadium guidance again close to match day.",
      "Plan extra arrival time for high-demand group and knockout fixtures.",
    ],
    prepTips: ["Clear stadium bag", "Portable charger", "Light layers for indoor/outdoor transfers"],
  },
  {
    slug: "boston",
    name: "Boston",
    country: "United States",
    stadium: "Boston Stadium",
    timezone: "America/New_York",
    summary:
      "A northeastern host city suited to travelling supporters planning early departures from the city core.",
    transportNotes: [
      "Confirm train, shuttle, and ride-share plans before travelling to the venue area.",
      "Keep post-match transport flexible after evening fixtures.",
    ],
    prepTips: ["Comfortable walking shoes", "Compact rain layer", "Portable charger"],
  },
  {
    slug: "dallas",
    name: "Dallas",
    country: "United States",
    stadium: "Dallas Stadium",
    timezone: "America/Chicago",
    summary:
      "A central U.S. host city with a major stadium setting and summer heat considerations for travelling fans.",
    transportNotes: [
      "Build extra travel time into stadium-area arrivals.",
      "Hydration and sun protection are practical essentials for match-day movement.",
    ],
    prepTips: ["Insulated water bottle", "Sunscreen", "Breathable match-day clothing"],
  },
  {
    slug: "guadalajara",
    name: "Guadalajara",
    country: "Mexico",
    stadium: "Guadalajara Stadium",
    timezone: "America/Mexico_City",
    summary:
      "A Mexican host city with strong football culture and high interest from regional and international supporters.",
    transportNotes: [
      "Use official city and venue travel updates when ticket details are confirmed.",
      "Keep local time conversion visible if you are following from outside Mexico.",
    ],
    prepTips: ["Portable charger", "Compact day bag", "Reusable bottle where permitted"],
  },
  {
    slug: "houston",
    name: "Houston",
    country: "United States",
    stadium: "Houston Stadium",
    timezone: "America/Chicago",
    summary:
      "A Gulf Coast host city where humidity, indoor venue planning, and airport logistics matter for visitors.",
    transportNotes: [
      "Check venue entry rules before packing bags or bottles.",
      "Leave room for weather and traffic changes around match windows.",
    ],
    prepTips: ["Clear stadium bag", "Cooling towel", "Portable charger"],
  },
  {
    slug: "kansas-city",
    name: "Kansas City",
    country: "United States",
    stadium: "Kansas City Stadium",
    timezone: "America/Chicago",
    summary:
      "A central host city with a dedicated stadium district and strong regional match-day demand.",
    transportNotes: [
      "Confirm parking, shuttle, and stadium district access before match day.",
      "Arrive early for fixtures involving high-travel supporter bases.",
    ],
    prepTips: ["Seat cushion", "Clear stadium bag", "Portable charger"],
  },
  {
    slug: "los-angeles",
    name: "Los Angeles",
    country: "United States",
    stadium: "Los Angeles Stadium",
    timezone: "America/Los_Angeles",
    summary:
      "A west coast host city with a large international audience and heavy demand for local kickoff-time searches.",
    transportNotes: [
      "Check official stadium entry and transit guidance before choosing a route.",
      "Allow extra time for cross-city travel on match days.",
    ],
    prepTips: ["Sunscreen", "Clear stadium bag", "Portable charger"],
  },
  {
    slug: "mexico-city",
    name: "Mexico City",
    country: "Mexico",
    stadium: "Mexico City Stadium",
    timezone: "America/Mexico_City",
    summary:
      "The opening-match host city and one of the tournament's most searched global football destinations.",
    transportNotes: [
      "Follow official venue guidance for security, timing, and permitted items.",
      "Account for altitude and city travel time when planning match-day movement.",
    ],
    prepTips: ["Reusable bottle where permitted", "Light jacket", "Portable charger"],
  },
  {
    slug: "miami",
    name: "Miami",
    country: "United States",
    stadium: "Miami Stadium",
    timezone: "America/New_York",
    summary:
      "A southeast host city with strong Latin American fan interest and high demand for travel-prep content.",
    transportNotes: [
      "Plan around warm weather and stadium-area traffic.",
      "Check official event and transit updates before leaving for the venue.",
    ],
    prepTips: ["Sunscreen", "Cooling towel", "Clear stadium bag"],
  },
  {
    slug: "monterrey",
    name: "Monterrey",
    country: "Mexico",
    stadium: "Monterrey Stadium",
    timezone: "America/Monterrey",
    summary:
      "A northern Mexico host city with regional travel appeal and a strong club-football backdrop.",
    transportNotes: [
      "Use official match-day travel information once venue operations are published.",
      "Keep local kickoff times clear for fans following from other time zones.",
    ],
    prepTips: ["Sunscreen", "Portable charger", "Compact day bag"],
  },
  {
    slug: "new-york-new-jersey",
    name: "New York New Jersey",
    country: "United States",
    stadium: "New York New Jersey Stadium",
    timezone: "America/New_York",
    summary:
      "The final host market and a high-intent search destination for global fans planning around the biggest fixture.",
    transportNotes: [
      "Use official transit and stadium guidance for final-week fixtures.",
      "Expect heavy demand around knockout matches and the final.",
    ],
    prepTips: ["Clear stadium bag", "Portable charger", "Comfortable walking shoes"],
  },
  {
    slug: "philadelphia",
    name: "Philadelphia",
    country: "United States",
    stadium: "Philadelphia Stadium",
    timezone: "America/New_York",
    summary:
      "An east coast host city with strong travel links and useful long-tail search demand around local match times.",
    transportNotes: [
      "Check official transit guidance before selecting parking or public transport.",
      "Allow extra time around stadium complex entry points.",
    ],
    prepTips: ["Clear stadium bag", "Seat cushion", "Portable charger"],
  },
  {
    slug: "san-francisco-bay-area",
    name: "San Francisco Bay Area",
    country: "United States",
    stadium: "San Francisco Bay Area Stadium",
    timezone: "America/Los_Angeles",
    summary:
      "A west coast host market where local-time conversion is especially useful for Asian and European audiences.",
    transportNotes: [
      "Confirm stadium-area transit and parking guidance before travelling.",
      "Pack for changing evening temperatures in the broader Bay Area.",
    ],
    prepTips: ["Light layer", "Portable charger", "Clear stadium bag"],
  },
  {
    slug: "seattle",
    name: "Seattle",
    country: "United States",
    stadium: "Seattle Stadium",
    timezone: "America/Los_Angeles",
    summary:
      "A Pacific Northwest host city with strong football culture and practical weather-prep needs.",
    transportNotes: [
      "Check official transit and gate guidance ahead of match day.",
      "Keep rain-ready layers available without overpacking.",
    ],
    prepTips: ["Compact rain layer", "Clear stadium bag", "Portable charger"],
  },
  {
    slug: "toronto",
    name: "Toronto",
    country: "Canada",
    stadium: "Toronto Stadium",
    timezone: "America/Toronto",
    summary:
      "A Canadian host city with early-tournament search demand from North American and global supporters.",
    transportNotes: [
      "Use official city and venue guidance for transit and security updates.",
      "Plan for downtown movement and match-day crowding.",
    ],
    prepTips: ["Light jacket", "Portable charger", "Comfortable walking shoes"],
  },
  {
    slug: "vancouver",
    name: "Vancouver",
    country: "Canada",
    stadium: "Vancouver Stadium",
    timezone: "America/Vancouver",
    summary:
      "A west coast Canadian host city with broad international appeal and strong time-zone search value.",
    transportNotes: [
      "Check official transit updates before heading to the venue.",
      "Prepare for mild weather shifts between day and evening fixtures.",
    ],
    prepTips: ["Light rain layer", "Portable charger", "Clear stadium bag"],
  },
];

const CITY_ROTATION = CITIES.map((c) => c.slug);

export function getCityBySlug(slug: string | undefined): CityRecord | undefined {
  if (!slug) return undefined;
  return CITIES.find((city) => city.slug === slug);
}

export function cityForMatch(match: MatchRecord): CityRecord {
  const explicit = getCityBySlug(match.citySlug);
  if (explicit) return explicit;
  const numeric = Number(match.id.replace(/\D/g, ""));
  const index = Number.isFinite(numeric) && numeric > 0 ? numeric - 1 : 0;
  return CITIES[index % CITY_ROTATION.length];
}

export function matchesForCity(matches: MatchRecord[], citySlug: string): MatchRecord[] {
  return matches.filter((match) => cityForMatch(match).slug === citySlug);
}
