import { db } from "@/main/db/index";
import { GLOBAL_PROJECT_ID, settingRequestTable } from "@/main/db/schema";
import { defaultSettingsRequest } from "@/data/settings_request";
// import { eq } from "drizzle-orm";

export const settingRequestSeed = async () => {
  try {
    // const doExist = Boolean(
    //   (
    //     await db
    //       .select({
    //         id: settingRequestTable.id,
    //       })
    //       .from(settingRequestTable)
    //       .where(eq(settingRequestTable.projectId, GLOBAL_PROJECT_ID))
    //       .limit(1)
    //   )?.[0]?.id,
    // );
    // if (doExist) return;

    await db
      .insert(settingRequestTable)
      .values({
        ...defaultSettingsRequest,
        projectId: GLOBAL_PROJECT_ID,
      })
      .onConflictDoNothing();
  } catch (error) {
    console.error("❌ Error seeding setting request:", error);
  }
};
