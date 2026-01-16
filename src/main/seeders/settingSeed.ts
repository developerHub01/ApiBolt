import { db } from "@/main/db/index.js";
import { GLOBAL_PROJECT_ID, settingTable } from "@/main/db/schema.js";
import { defaultSettings } from "@/data/settings";
// import { eq } from "drizzle-orm";

export const generateSettingsSeed = async () => {
  try {
    // const doExist = Boolean(
    //   (
    //     await db
    //       .select({
    //         id: settingTable.id,
    //       })
    //       .from(settingTable)
    //       .where(eq(settingTable.projectId, GLOBAL_PROJECT_ID))
    //       .limit(1)
    //   )?.[0]?.id,
    // );
    // if (doExist) return;

    await db
      .insert(settingTable)
      .values({
        ...defaultSettings,
        projectId: GLOBAL_PROJECT_ID,
      })
      .onConflictDoNothing();
  } catch (error) {
    console.error("❌ Error seeding setting:", error);
  }
};
