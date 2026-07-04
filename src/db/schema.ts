import { sql } from "drizzle-orm";
import { check, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const geniusCategories = ["math", "physics", "cs", "chemistry"] as const;
export type GeniusCategory = (typeof geniusCategories)[number];

export const geniuses = sqliteTable(
  "geniuses",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    category: text("category").$type<GeniusCategory>().notNull(),
    era: text("era"),
    bio: text("bio"),
    avatarUrl: text("avatar_url"),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .notNull()
      .default(sql`(unixepoch() * 1000)`),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .notNull()
      .default(sql`(unixepoch() * 1000)`),
  },
  (table) => ({
    geniusesCategoryCheck: check(
      "geniuses_category_check",
      sql`${table.category} in ('math', 'physics', 'cs', 'chemistry')`
    ),
  })
);

export const achievements = sqliteTable("achievements", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  geniusId: text("genius_id")
    .notNull()
    .references(() => geniuses.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  latex: text("latex"),
  year: integer("year"),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .default(sql`(unixepoch() * 1000)`),
});

export type GeniusRow = typeof geniuses.$inferSelect;
export type AchievementRow = typeof achievements.$inferSelect;
