export const GENIUS_CATEGORIES = ["chemistry", "physics", "math", "biology"] as const;

export type GeniusCategory = (typeof GENIUS_CATEGORIES)[number];

export const GENIUS_CATEGORY_LABELS: Record<GeniusCategory, string> = {
  chemistry: "化學",
  physics: "物理",
  math: "數學",
  biology: "生物",
};
