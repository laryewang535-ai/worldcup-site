export type GearItem = {
  id: string;
  title: string;
  priceLabel: string;
  imageAlt: string;
  /** Amazon ASIN；配置 NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG 后由 buildAmazonAffiliateUrl 生成链接 */
  asin: string;
};

export const GEAR_ITEMS: GearItem[] = [
  {
    id: "g-1",
    title: "Neutral training football (size 5)",
    priceLabel: "See price on Amazon",
    imageAlt: "Generic size five football on neutral studio background",
    asin: "B000000001",
  },
  {
    id: "g-2",
    title: "Portable pop-up goal set",
    priceLabel: "See price on Amazon",
    imageAlt: "Portable mini football goals folded beside carrying bag",
    asin: "B000000002",
  },
  {
    id: "g-3",
    title: "Stadium seat cushion (compact)",
    priceLabel: "See price on Amazon",
    imageAlt: "Foldable stadium cushion with carry strap",
    asin: "B000000003",
  },
  {
    id: "g-4",
    title: "Insulated water bottle (750ml)",
    priceLabel: "See price on Amazon",
    imageAlt: "Stainless steel insulated bottle with sport lid",
    asin: "B000000004",
  },
];
