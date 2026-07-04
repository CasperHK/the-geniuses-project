export const GENIUS_CATEGORIES = ["math", "physics", "cs", "chemistry"] as const;

export type GeniusCategory = (typeof GENIUS_CATEGORIES)[number];

export const GENIUS_CATEGORY_LABELS: Record<GeniusCategory, string> = {
  math: "數學",
  physics: "物理",
  cs: "計算機科學",
  chemistry: "化學",
};
