/** Amazon Associates Tracking ID，例如 yoursite-20 */
export const AMAZON_ASSOCIATE_TAG =
  process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG?.trim() ?? "";

const PLACEHOLDER_TAGS = new Set(["", "youraffiliate-20", "your-affiliate-20"]);

/** 联盟营销是否已配置（未配置时不展示任何联盟 UI） */
export function isAffiliateEnabled(): boolean {
  return !PLACEHOLDER_TAGS.has(AMAZON_ASSOCIATE_TAG);
}

/** 联盟商品聚合页 */
export const AFFILIATE_GEAR_PATH = "/gear";

/**
 * 根据 ASIN 生成亚马逊联盟链接。
 * @param asin 商品 ASIN（10 位字母数字）
 */
export function buildAmazonAffiliateUrl(asin: string): string {
  const id = asin.trim();
  const params = new URLSearchParams({ tag: AMAZON_ASSOCIATE_TAG });
  return `https://www.amazon.com/dp/${encodeURIComponent(id)}?${params.toString()}`;
}

/** 页脚/商品旁标准披露文案（英文，与全站语言一致） */
export const AFFILIATE_DISCLOSURE =
  "As an Amazon Associate we earn from qualifying purchases. Product links may include affiliate tracking.";
