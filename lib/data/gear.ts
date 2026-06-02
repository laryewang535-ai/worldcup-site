export type GearItem = {
  id: string;
  title: string;
  category:
    | "Watch party gear"
    | "Stadium essentials"
    | "Kids soccer gear"
    | "Summer match-day essentials"
    | "Home viewing setup";
  useCase: string;
  priceLabel: string;
  imageAlt: string;
  /** Amazon ASIN；配置 NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG 后由 buildAmazonAffiliateUrl 生成链接 */
  asin: string;
};

export const GEAR_ITEMS: GearItem[] = [
  {
    id: "g-1",
    title: "Neutral size 5 soccer ball",
    category: "Kids soccer gear",
    useCase: "Backyard kickabouts before and after match windows.",
    priceLabel: "See price on Amazon",
    imageAlt: "Generic size five football on neutral studio background",
    asin: "B01M6453MB",
  },
  {
    id: "g-2",
    title: "Portable pop-up goal set",
    category: "Kids soccer gear",
    useCase: "Small-sided play during watch parties and family match days.",
    priceLabel: "See price on Amazon",
    imageAlt: "Portable mini football goals folded beside carrying bag",
    asin: "B01M7T7Q5F",
  },
  {
    id: "g-3",
    title: "Compact stadium seat cushion",
    category: "Stadium essentials",
    useCase: "Extra comfort for long stadium sessions and public viewing areas.",
    priceLabel: "See price on Amazon",
    imageAlt: "Foldable stadium cushion with carry strap",
    asin: "B00339910A",
  },
  {
    id: "g-4",
    title: "Insulated water bottle",
    category: "Summer match-day essentials",
    useCase: "Hydration planning for warm-weather travel and outdoor viewing.",
    priceLabel: "See price on Amazon",
    imageAlt: "Stainless steel insulated bottle with sport lid",
    asin: "B0CP46X8NQ",
  },
  {
    id: "g-5",
    title: "Clear stadium crossbody bag",
    category: "Stadium essentials",
    useCase: "A practical bag format for venues with clear-bag policies.",
    priceLabel: "See price on Amazon",
    imageAlt: "Transparent stadium crossbody bag on a light background",
    asin: "B0C2HL72WV",
  },
  {
    id: "g-6",
    title: "Portable phone power bank",
    category: "Watch party gear",
    useCase: "Keep phones charged while tracking scores, maps, and tickets.",
    priceLabel: "See price on Amazon",
    imageAlt: "Compact black portable phone charger",
    asin: "B07XW7ZVKD",
  },
  {
    id: "g-7",
    title: "Mini projector for home viewing",
    category: "Home viewing setup",
    useCase: "A bigger screen option for casual watch parties at home.",
    priceLabel: "See price on Amazon",
    imageAlt: "Small home projector on a media table",
    asin: "B0B28G5Y4R",
  },
  {
    id: "g-8",
    title: "Cooling towel multipack",
    category: "Summer match-day essentials",
    useCase: "Heat-prep gear for summer fan travel and outdoor viewing.",
    priceLabel: "See price on Amazon",
    imageAlt: "Rolled cooling towels in several colors",
    asin: "B073F1TBMR",
  },
];

export const GEAR_CATEGORIES = Array.from(new Set(GEAR_ITEMS.map((item) => item.category)));
