import { settingTable } from "@/main/db/schema.js";
import { eq, isNull } from "drizzle-orm";
import { db } from "@/main/db/index.js";
import { getActiveProject } from "@/main/db/projectsDB.js";

export const defaultSettings = {
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

    let settings = null;

    if (activeProjectId)
      settings = (
        await db
          .select()
          .from(settingTable)
          .where(eq(settingTable.projectId, activeProjectId))
          .limit(1)
      )?.[0];

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
      settings,
      globalSetting,
    };
  } catch (error) {
    console.error(error);
  }
};

export const getZoomLevel = async () => {
  try {
    const activeProjectId = await getActiveProject();

    let settings = null;
    if (activeProjectId)
      settings = await db
        .select()
        .from(settingTable)
        .where(eq(settingTable.projectId, activeProjectId));

    if (!settings || !settings?.length) {
      settings = await db
        .select()
        .from(settingTable)
        .where(isNull(settingTable.projectId));
    }

    return settings?.[0]?.zoomLevel ?? 1;
  } catch (error) {
    console.error(error);
  }
};

export const getApplyingZoomLevel = async () => {
  try {
    const activeProjectId = await getActiveProject();

    if (activeProjectId) {
      let projectZoomLevel = (
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
  }
};

/* must contain projectId */
export const updateSettings = async payload => {
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

  const data = await db
    .select()
    .from(settingTable)
    .where(
      projectId
        ? eq(settingTable.projectId, projectId)
        : isNull(settingTable.projectId),
    );

  let updated;
  if (!data || !data.length) {
    updated = await db.insert(settingTable).values({
      ...updatePayload,
      ...(projectId ? { projectId } : {}),
    });
  } else {
    updated = await db
      .update(settingTable)
      .set({
        ...updatePayload,
      })
      .where(
        projectId
          ? eq(settingTable.projectId, projectId)
          : isNull(settingTable.projectId),
      );
  }

  return updated.rowsAffected > 0;
};

export const deleteSettings = async () => {
  const deleted = await db.delete(settingTable);

  return deleted?.rowsAffected > 0;
};
