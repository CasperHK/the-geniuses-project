export const GENIUS_CATEGORIES = ["math", "physics", "cs", "chemistry"] as const;

export type GeniusCategory = (typeof GENIUS_CATEGORIES)[number];

export const GENIUS_CATEGORY_LABELS: Record<GeniusCategory, string> = {
  math: "Mathematics",
  physics: "Physics",
  cs: "Computer Science",
  chemistry: "Chemistry",
};
