export type GearItem = {
  id: string;
  title: string;
  category:
    | "Watch party gear"
    | "Stadium essentials"
    | "Kids soccer gear"
    | "Summer match-day essentials"
    | "Home viewing setup";
  bestFor: string;
  useCase: string;
  description: string;
  priceLabel: string;
  imageAlt: string;
  /** Amazon ASIN；配置 NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG 后由 buildAmazonAffiliateUrl 生成链接 */
  asin: string;
};

export const GEAR_ITEMS: GearItem[] = [
  {
    id: "g-1",
    title: "Wilson traditional size 5 soccer ball",
    category: "Kids soccer gear",
    bestFor: "Family kickabouts",
    useCase: "Backyard play before kickoff or during half-time breaks.",
    description:
      "A classic, neutral soccer ball pick for casual practice, kids, and simple watch-party games without official tournament branding.",
    priceLabel: "See price on Amazon",
    imageAlt: "Classic black and white size five soccer ball",
    asin: "B000L2DSLK",
  },
  {
    id: "g-2",
    title: "GoSports portable pop-up soccer goals",
    category: "Kids soccer gear",
    bestFor: "Backyard mini matches",
    useCase: "Small-sided play for kids and casual fan gatherings.",
    description:
      "A portable goal set with carry-case appeal, useful for family match days when the tournament energy spills into the yard.",
    priceLabel: "See price on Amazon",
    imageAlt: "Portable mini football goals folded beside carrying bag",
    asin: "B01ABXKP2S",
  },
  {
    id: "g-3",
    title: "Coleman portable stadium seat cushion",
    category: "Stadium essentials",
    bestFor: "Long seated sessions",
    useCase: "Extra comfort for bleachers, public viewing areas, and long fan events.",
    description:
      "A practical cushion-style pick for fans who expect to sit through full match windows, ceremonies, or crowded public screens.",
    priceLabel: "See price on Amazon",
    imageAlt: "Foldable stadium cushion with carry strap",
    asin: "B003399128",
  },
  {
    id: "g-4",
    title: "BAGAIL clear stadium tote bag",
    category: "Stadium essentials",
    bestFor: "Venue entry prep",
    useCase: "A clear-bag option for venues and events with transparent bag policies.",
    description:
      "A simple clear tote for match-day essentials. Always check the host venue's current bag policy before packing.",
    priceLabel: "See price on Amazon",
    imageAlt: "Transparent stadium tote bag with shoulder strap",
    asin: "B0D1XV6C45",
  },
  {
    id: "g-5",
    title: "Owala FreeSip insulated water bottle",
    category: "Summer match-day essentials",
    bestFor: "Hydration planning",
    useCase: "Warm-weather travel, long walks, and outdoor watch parties.",
    description:
      "A reusable insulated bottle pick for fans planning around summer heat. Confirm each venue's bottle rules before bringing one inside.",
    priceLabel: "See price on Amazon",
    imageAlt: "Insulated stainless steel water bottle with straw lid",
    asin: "B085DV8T75",
  },
  {
    id: "g-6",
    title: "ROMOSS 30000mAh USB-C power bank",
    category: "Stadium essentials",
    bestFor: "Phone battery backup",
    useCase: "Keeping maps, tickets, messages, and score pages available on long days.",
    description:
      "A higher-capacity charger option for fans travelling between city guides, mobile tickets, and live-score pages.",
    priceLabel: "See price on Amazon",
    imageAlt: "Compact black portable phone charger",
    asin: "B09W9G68QY",
  },
  {
    id: "g-7",
    title: "Cooling towel multipack",
    category: "Summer match-day essentials",
    bestFor: "Hot-weather viewing",
    useCase: "Outdoor fan zones, summer queues, and warm afternoon match windows.",
    description:
      "A low-cost heat-prep pick for families and travelling supporters following matches in summer conditions.",
    priceLabel: "See price on Amazon",
    imageAlt: "Rolled cooling towels in several colors",
    asin: "B073F1TBMR",
  },
  {
    id: "g-8",
    title: "Anker Soundcore 2 Bluetooth speaker",
    category: "Home viewing setup",
    bestFor: "Watch-party audio",
    useCase: "Small home gatherings, patio viewing, and pre-match playlists.",
    description:
      "A portable speaker pick for casual home viewing setups. Use responsibly in shared spaces and public areas.",
    priceLabel: "See price on Amazon",
    imageAlt: "Portable black Bluetooth speaker on a neutral background",
    asin: "B01MTB55WH",
  },
];

export const GEAR_CATEGORIES = Array.from(new Set(GEAR_ITEMS.map((item) => item.category)));
