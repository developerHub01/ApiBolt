import { db } from "@/main/db/index.js";
import { settingRequestTable } from "@/main/db/schema.js";
import { defaultSettingsRequest } from "@/data/settings_request";
import { isNull } from "drizzle-orm";

export const settingRequestSeed = async () => {
  try {
    const doExist = Boolean(
      (
        await db
          .select({
            id: settingRequestTable.id,
          })
          .from(settingRequestTable)
          .where(isNull(settingRequestTable.projectId))
          .limit(1)
      )?.[0]?.id,
    );
    if (doExist) return;

    await db
      .insert(settingRequestTable)
      .values(defaultSettingsRequest)
      .onConflictDoNothing();
  } catch (error) {
    console.error("❌ Error seeding setting request:", error);
  }
};
