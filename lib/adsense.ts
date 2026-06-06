/** Google AdSense publisher ID shared by the global script and ad slots. */
export const ADSENSE_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim() || "ca-pub-7763961180831088";

/** Set NEXT_PUBLIC_ADSENSE_SLOT after creating a display ad unit in AdSense. */
export const ADSENSE_SLOT = process.env.NEXT_PUBLIC_ADSENSE_SLOT?.trim() || "";
