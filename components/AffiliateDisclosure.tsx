import { AFFILIATE_DISCLOSURE, isAffiliateEnabled } from "@/lib/affiliate";

/** 联盟披露：仅在已配置 Tracking ID 时展示 */
export function AffiliateDisclosure({ className = "" }: { className?: string }) {
  if (!isAffiliateEnabled()) return null;

  return (
    <p className={`text-xs leading-relaxed text-slate-500 dark:text-slate-500 ${className}`}>
      {AFFILIATE_DISCLOSURE}
    </p>
  );
}
