import { AFFILIATE_DISCLOSURE, isAffiliateEnabled } from "@/lib/affiliate";

/** Affiliate disclosure: shown only when a tracking ID is configured. */
export function AffiliateDisclosure({ className = "" }: { className?: string }) {
  if (!isAffiliateEnabled()) return null;

  return (
    <p className={`text-xs leading-relaxed text-slate-500 dark:text-slate-500 ${className}`}>
      {AFFILIATE_DISCLOSURE}
    </p>
  );
}
