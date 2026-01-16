import { GLOBAL_PROJECT_ID, settingTable } from "@/main/db/schema.js";
import { eq } from "drizzle-orm";
import { db } from "@/main/db/index.js";
import { getActiveProject } from "@/main/db/projectsDB.js";
import { ElectronAPISettingsInterface } from "@shared/types/api/electron-settings";
import { defaultSettings } from "@/data/settings";

export const getSettings = async () => {
  try {
    const activeProjectId = await getActiveProject();
    let settings = activeProjectId
      ? (
          await db
            .select()
            .from(settingTable)
            .where(eq(settingTable.projectId, activeProjectId))
            .limit(1)
        )?.[0]
      : null;

    let globalSetting = (
      await db
        .select()
        .from(settingTable)
        .where(eq(settingTable.projectId, GLOBAL_PROJECT_ID))
        .limit(1)
    )?.[0];

    // if (!globalSetting) {
    //   await db.insert(settingTable).values(defaultSettings);
    //   globalSetting = (
    //     await db
    //       .select()
    //       .from(settingTable)
    //       .where(isNull(settingTable.projectId))
    //       .limit(1)
    //   )?.[0];
    // }

    settings = settings ?? null;
    globalSetting = globalSetting ?? null;

    return {
      settings: settings,
      globalSetting: globalSetting,
    };
  } catch (error) {
    console.error(error);
    return {
      settings: null,
      globalSetting: defaultSettings,
    };
  }
};

export const getZoomLevel = async () => {
  try {
    const activeProjectId = await getActiveProject();

    const zoomLevel = activeProjectId
      ? (
          await db
            .select({
              zoomLevel: settingTable.zoomLevel,
            })
            .from(settingTable)
            .where(
              eq(settingTable.projectId, activeProjectId ?? GLOBAL_PROJECT_ID),
            )
            .limit(1)
        )?.[0]?.zoomLevel
      : null;

    return zoomLevel ?? 1;
  } catch (error) {
    console.error(error);
    return 1;
  }
};

export const getApplyingZoomLevel = async () => {
  try {
    const activeProjectId = await getActiveProject();

    if (activeProjectId) {
      const projectZoomLevel = (
        await db
          .select({ zoomLevel: settingTable.zoomLevel })
          .from(settingTable)
          .where(eq(settingTable.projectId, activeProjectId))
      )?.[0]?.zoomLevel;

      /* if -1 means default then return default zoomLevel=1 */
      if (projectZoomLevel === -1) return 1;
      /* if have valid zoomLevel then return it */
      if (typeof projectZoomLevel === "number") return projectZoomLevel;
    }

    const globalZoomLevel = (
      await db
        .select({ zoomLevel: settingTable.zoomLevel })
        .from(settingTable)
        .where(eq(settingTable.projectId, GLOBAL_PROJECT_ID))
    )?.[0]?.zoomLevel;
    /**
     * If global have level as default(-1)
     * or if null, thought not going to just for safty
     * then return default 1
     * **/
    if (globalZoomLevel === -1 || globalZoomLevel === null) return 1;

    return globalZoomLevel;
  } catch (error) {
    console.error(error);
    return 1;
  }
};

/* must contain projectId */
export const updateSettings = async (
  payload: Parameters<ElectronAPISettingsInterface["updateSettings"]>[0],
) => {
  const { projectId: pI, ...updatePayload } = payload;
  const projectId = payload.projectId ?? GLOBAL_PROJECT_ID;

  for (const key in updatePayload) {
    const value = updatePayload[key];
    if (value == undefined) updatePayload[key] = null;
  }

  if (
    typeof payload.isZoomable === "number" &&
    (payload.isZoomable > 1 || payload.isZoomable < -1)
  )
    updatePayload.isZoomable = 0; // reset to default if out of range

  const isExist = Boolean(
    (
      await db
        .select({
          id: settingTable.id,
        })
        .from(settingTable)
        .where(eq(settingTable.projectId, projectId))
        .limit(1)
    )?.[0]?.id,
  );

  if (!isExist)
    return (
      (
        await db.insert(settingTable).values({
          ...updatePayload,
          projectId,
        })
      ).rowsAffected > 0
    );

  return (
    (
      await db
        .update(settingTable)
        .set({
          ...updatePayload,
        })
        .where(eq(settingTable.projectId, projectId))
    ).rowsAffected > 0
  );
};

export const deleteSettings = async () => {
  try {
    return (await db.delete(settingTable))?.rowsAffected > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
};
