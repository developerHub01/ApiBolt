import "dotenv/config";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import path from "node:path";
import fs from "node:fs/promises";
import { app } from "electron";
import { migrate } from "drizzle-orm/libsql/migrator";
import { getAppVersion, setAppVersion } from "@/main/db/versionDB";
import { compareVersions } from "@/main/utils/utils";

const userDataPath = app.isPackaged
  ? app.getPath("userData")
  : path.join(process.cwd(), "db");
const currentVersion = app.getVersion();

const dbPath = path.join(userDataPath, `api-bolt-v${currentVersion}.db`);

const client = createClient({
  url: `file:${dbPath}`,
});

export const db = drizzle({
  client,
});

const cleanupOldDBs = async (keep: number): Promise<void> => {
  const files = await fs.readdir(userDataPath);

  const dbFiles = files
    .filter(file => file.startsWith("api-bolt-v") && file.endsWith(".db"))
    .map(file => {
      const version = file.replace("api-bolt-v", "").replace(".db", "");
      return {
        file,
        version,
      };
    });

  /* sort versions (numeric) */
  dbFiles.sort((a, b) => compareVersions(a.version, b.version));

  const toDelete = [
    /* this is for incase if have that file too without versioning */
    {
      file: "api-bolt.db",
    },
    ...dbFiles.slice(0, -keep),
  ];

  await Promise.allSettled(
    toDelete.map(async ({ file }) => {
      try {
        await fs.unlink(path.join(userDataPath, file));
      } catch (err) {
        console.error("Failed to delete:", file, err);
      }
    }),
  );
};

export const runMigrations = async () => {
  const migrationsPath = app.isPackaged
    ? path.join(process.resourcesPath, "drizzle")
    : path.join(process.cwd(), "drizzle");

  try {
    await migrate(db, {
      migrationsFolder: migrationsPath,
    });
    console.info("✅ Migrations successful");
  } catch (err) {
    console.error("❌ Migration error:", err);
  }
};

export const prepareDB = async () => {
  const currentVersion = app.getVersion();
  let dbVersion: string | null = null;

  try {
    dbVersion = await getAppVersion();
  } catch {
    console.warn("⚠️ Could not read DB version (probably old DB)");
  }

  await runMigrations();

  if (dbVersion !== currentVersion) await setAppVersion(currentVersion);

  cleanupOldDBs(2);
};
