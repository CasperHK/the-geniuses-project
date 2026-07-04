import { asc, eq } from "drizzle-orm";
import { GENIUS_CATEGORIES, type GeniusCategory } from "../constants/genius-categories";
import { db } from "../db";
import { achievements, geniuses, type GeniusRow } from "../db/schema";
import type { Genius, GeniusWithAchievements, GroupedGeniuses } from "../types/genius";

function toGenius(row: GeniusRow): Genius {
  return {
    id: row.id,
    name: row.name,
    chineseName: row.chineseName,
    slug: row.slug,
    category: row.category,
    era: row.era,
    bio: row.bio,
    avatarUrl: row.avatarUrl,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

export class GeniusService {
  async listAll(): Promise<Genius[]> {
    const rows = await db.select().from(geniuses).orderBy(asc(geniuses.name));
    return rows.map(toGenius);
  }

  async listByCategory(category: GeniusCategory): Promise<Genius[]> {
    const rows = await db
      .select()
      .from(geniuses)
      .where(eq(geniuses.category, category))
      .orderBy(asc(geniuses.name));

    return rows.map(toGenius);
  }

  async listGroupedByCategory(): Promise<GroupedGeniuses[]> {
    const groups = await Promise.all(
      GENIUS_CATEGORIES.map(async (category) => ({
        category,
        items: await this.listByCategory(category),
      }))
    );

    return groups;
  }

  async getById(id: string): Promise<Genius | null> {
    const row = await db.query.geniuses.findFirst({
      where: eq(geniuses.id, id),
    });

    return row ? toGenius(row) : null;
  }

  async getBySlug(slug: string): Promise<Genius | null> {
    const row = await db.query.geniuses.findFirst({
      where: eq(geniuses.slug, slug),
    });

    return row ? toGenius(row) : null;
  }

  async getFullProfile(id: string): Promise<GeniusWithAchievements | null> {
    const genius = await this.getById(id);
    if (!genius) {
      return null;
    }

    const achievementRows = await db
      .select()
      .from(achievements)
      .where(eq(achievements.geniusId, id))
      .orderBy(asc(achievements.year));

    return {
      genius,
      achievements: achievementRows,
    };
  }
}
