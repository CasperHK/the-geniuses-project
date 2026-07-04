import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

declare global {
  var __geniusesDb__: ReturnType<typeof drizzle<typeof schema>> | undefined;
}

const sqlite = new Database("sqlite.db");

export const db = globalThis.__geniusesDb__ ?? drizzle(sqlite, { schema });

if (process.env.NODE_ENV !== "production") {
  globalThis.__geniusesDb__ = db;
}
