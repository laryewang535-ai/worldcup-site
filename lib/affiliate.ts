/** Amazon Associates tracking ID, for example yoursite-20. */
export const AMAZON_ASSOCIATE_TAG =
  process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG?.trim() ?? "";

const PLACEHOLDER_TAGS = new Set(["", "youraffiliate-20", "your-affiliate-20"]);

/** Whether affiliate marketing is configured; no affiliate UI is shown when unset. */
export function isAffiliateEnabled(): boolean {
  return !PLACEHOLDER_TAGS.has(AMAZON_ASSOCIATE_TAG);
}

/** Affiliate product collection page. */
export const AFFILIATE_GEAR_PATH = "/gear";

/**
 * Build an Amazon affiliate link from an ASIN.
 * @param asin Product ASIN, a 10-character alphanumeric code.
 */
export function buildAmazonAffiliateUrl(asin: string): string {
  const id = asin.trim();
  const params = new URLSearchParams({ tag: AMAZON_ASSOCIATE_TAG });
  return `https://www.amazon.com/dp/${encodeURIComponent(id)}?${params.toString()}`;
}

/** Standard disclosure copy for the footer and product areas. */
export const AFFILIATE_DISCLOSURE =
  "As an Amazon Associate we earn from qualifying purchases. Product links may include affiliate tracking.";
