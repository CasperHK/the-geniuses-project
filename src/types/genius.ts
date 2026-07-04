import type { GeniusCategory } from "../constants/genius-categories";

export interface Genius {
  id: string;
  name: string;
  slug: string;
  category: GeniusCategory;
  era: string | null;
  bio: string | null;
  avatarUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Achievement {
  id: number;
  geniusId: string;
  title: string;
  description: string | null;
  latex: string | null;
  year: number | null;
  createdAt: Date;
}

export interface GeniusWithAchievements {
  genius: Genius;
  achievements: Achievement[];
}

export interface GroupedGeniuses {
  category: GeniusCategory;
  items: Genius[];
}
