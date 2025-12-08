import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import path from "path";

const dbPath = `file:${path.join("db", "api-bolt.db")}`;

export default defineConfig({
  out: "./drizzle",
  schema: "./src/main/db/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: dbPath,
  },
});
