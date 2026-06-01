import type { TeamRecord } from "@/lib/types";

function initials(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return "?";
  const parts = trimmed.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  const a = parts[0][0];
  const b = parts[parts.length - 1][0];
  if (!a || !b) return "?";
  return (a + b).toUpperCase();
}

function hueFromId(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h + id.charCodeAt(i) * 13) % 360;
  return h;
}

/** 无版权队徽占位：首字母色块 */
export function TeamAvatar({
  team,
  size = "md",
}: {
  team: Pick<TeamRecord, "id" | "name">;
  size?: "sm" | "md" | "lg";
}) {
  const h = hueFromId(team.id);
  const dim =
    size === "sm" ? "h-8 w-8 text-[10px]" : size === "lg" ? "h-14 w-14 text-sm" : "h-10 w-10 text-xs";

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full font-bold text-white shadow-inner ${dim}`}
      style={{ background: `linear-gradient(135deg, hsl(${h} 65% 42%), hsl(${(h + 40) % 360} 70% 32%))` }}
      aria-hidden
      title={team.name}
    >
      {initials(team.name)}
    </div>
  );
}
