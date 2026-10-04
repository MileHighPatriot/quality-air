import type { IconName } from "@/components/Icon";

export type Season = "furnace" | "ac";

/** Oct to Mar is furnace season, Apr to Sep is AC season. `month` is 0-based. */
export function seasonForMonth(month: number): Season {
  return month >= 3 && month <= 8 ? "ac" : "furnace";
}

export const seasons: Record<Season, { icon: IconName; text: string; tone: string }> = {
  furnace: {
    icon: "flame",
    text: "Furnace season: book a heating tune-up before the first cold snap.",
    tone: "bg-ember",
  },
  ac: {
    icon: "snow",
    text: "AC season: book a cooling tune-up before the first 90° day.",
    tone: "bg-sky",
  },
};
