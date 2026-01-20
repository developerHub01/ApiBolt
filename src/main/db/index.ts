import "dotenv/config";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import path from "node:path";
import { app } from "electron";
import { migrate } from "drizzle-orm/libsql/migrator";

const dbPath = app.isPackaged
  ? path.join(app.getPath("userData"), "api-bolt.db")
  : path.join(process.cwd(), "db", "api-bolt.db");

const client = createClient({ url: `file:${dbPath}` });
export const db = drizzle({ client });

export const runMigrations = async () => {
  const migrationsPath = app.isPackaged
    ? path.join(process.resourcesPath, "drizzle")
    : path.join(process.cwd(), "drizzle");

  try {
    await migrate(db, { migrationsFolder: migrationsPath });
    console.info("✅ Migrations successful");
  } catch (err) {
    console.error("❌ Migration error:", err);
  }
};
