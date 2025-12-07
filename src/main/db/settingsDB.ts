import { settingTable } from "@/main/db/schema.js";
import { eq, isNull } from "drizzle-orm";
import { db } from "@/main/db/index.js";
import { getActiveProject } from "@/main/db/projectsDB.js";
import { SettingsInterface, } from "@shared/types/setting.types";
import { ElectronAPISettingsInterface } from "@shared/types/api/electron-settings";

type SettingRawInterface = Omit<SettingsInterface, "backgroundImages"> & {
  backgroundImages: "default" | string | null,
}

export const defaultSettings: SettingRawInterface = {
  /* default == "default" | global == null */
  backgroundImages: "default",
  maxNumberOfImages: -1,
  backgroundOpacity: -1,
  slideInterval: -1,
  backgroundBlur: -1,
  codeFontSize: -1,
  indentationSize: -1,
  zoomLevel: -1,
  isZoomable: -1,
  activityBarVisible: -1,
  layoutType: "default",
  projectId: null,
};



export const getSettings = async () => {
  try {
    const activeProjectId = await getActiveProject();
    let settings = activeProjectId ? (
      await db
        .select()
        .from(settingTable)
        .where(eq(settingTable.projectId, activeProjectId))
        .limit(1)
    )?.[0] : null;


    let globalSetting = (
      await db
        .select()
        .from(settingTable)
        .where(isNull(settingTable.projectId))
        .limit(1)
    )?.[0];

    if (!globalSetting) {
      await db.insert(settingTable).values(defaultSettings);
      globalSetting = (
        await db
          .select()
          .from(settingTable)
          .where(isNull(settingTable.projectId))
          .limit(1)
      )?.[0];
    }

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
    }
  }
};

export const getZoomLevel = async () => {
  try {
    const activeProjectId = await getActiveProject();

    const zoomLevel = activeProjectId ? (await db
      .select({
        zoomLevel: settingTable.zoomLevel
      })
      .from(settingTable)
      .where(activeProjectId ? eq(settingTable.projectId, activeProjectId) :
        isNull(settingTable.projectId)

      ).limit(1))?.[0]?.zoomLevel : null;


    return zoomLevel ?? 1;
  } catch (error) {
    console.error(error);
    return 1
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
        .where(isNull(settingTable.projectId))
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
    return 1
  }
};

/* must contain projectId */
export const updateSettings = async (payload: Parameters<ElectronAPISettingsInterface["updateSettings"]>[0]) => {
  const { projectId = null, ...updatePayload } = payload;

  for (const key in updatePayload) {
    const value = updatePayload[key];
    if (value == undefined) updatePayload[key] = null;
  }

  if (
    typeof payload.isZoomable === "number" &&
    (payload.isZoomable > 1 || payload.isZoomable < -1)
  )
    updatePayload.isZoomable = 0; // reset to default if out of range

  return (await db.insert(settingTable).values({
    ...updatePayload,
    projectId,
  }).onConflictDoUpdate({
    target: [settingTable.projectId],
    set: {
    ...updatePayload,
    }
  })).rowsAffected > 0
};

export const deleteSettings = async () => {
  try {
    return (await db.delete(settingTable))?.rowsAffected > 0;
  } catch (error) {
    console.error(error)
    return false
  }
};
