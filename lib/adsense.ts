/** Google AdSense 发布商 ID（全局脚本与广告单元共用） */
export const ADSENSE_CLIENT = "ca-pub-7763961180831088";

/** 在 AdSense 后台创建展示广告单元后，填入 NEXT_PUBLIC_ADSENSE_SLOT */
export const ADSENSE_SLOT = process.env.NEXT_PUBLIC_ADSENSE_SLOT?.trim() || "";
