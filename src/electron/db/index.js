import "dotenv/config";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import path from "path";
import { app } from "electron";

/* absolute path */
const dbPath = path.join(app.getAppPath(), "db", "api-bolt.db");

const client = createClient({ url: `file:${dbPath}` });
export const db = drizzle({ client });
