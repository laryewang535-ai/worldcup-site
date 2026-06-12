"use client";

import { useEffect, useRef } from "react";
import { ADSENSE_CLIENT, ADSENSE_SLOT } from "@/lib/adsense";

type Variant = "top" | "inline" | "bottom";

const styles: Record<Variant, string> = {
  top: "min-h-[72px] border border-dashed border-slate-300 dark:border-slate-700 rounded-lg",
  inline:
    "min-h-[120px] border border-dashed border-slate-300 dark:border-slate-700 rounded-lg my-6",
  bottom:
    "min-h-[64px] border border-dashed border-slate-300 dark:border-slate-700 rounded-lg",
};

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

/** AdSense slot: no content overlays and no pop-ups. */
export function AdSlot({
  variant,
  label = "Advertisement",
}: {
  variant: Variant;
  label?: string;
}) {
  const pushed = useRef(false);
  const hasUnit = Boolean(ADSENSE_SLOT);

  useEffect(() => {
    if (!hasUnit || pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ignore until the script has finished loading.
    }
  }, [hasUnit]);

  // Do not reserve space without a manual ad slot; auto ads are handled by the global layout script.
  if (!hasUnit) return null;

  return (
    <aside role="note" aria-label={label} className={`overflow-hidden ${styles[variant]}`}>
      <ins
        className="adsbygoogle block w-full"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={ADSENSE_SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
