import { db } from "@/main/db/index.js";
import { settingTable } from "@/main/db/schema.js";
import { defaultSettings } from "@/data/settings";
import { isNull } from "drizzle-orm";

export const generateSettingsSeed = async () => {
  try {
    const doExist = Boolean(
      (
        await db
          .select({
            id: settingTable.id,
          })
          .from(settingTable)
          .where(isNull(settingTable.projectId))
          .limit(1)
      )?.[0]?.id,
    );
    if (doExist) return;

    await db.insert(settingTable).values(defaultSettings).onConflictDoNothing();
  } catch (error) {
    console.error("❌ Error seeding setting:", error);
  }
};
