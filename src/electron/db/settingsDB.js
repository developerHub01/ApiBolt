import { settingTable } from "./schema.js";
import { eq, isNull } from "drizzle-orm";
import { db } from "./index.js";
import { getActiveProject } from "./projectsDB.js";

export const defaultSettings = {
  backgroundImages: null /* default == "default" | global == null */,
  backgroundOpacity: 1,
  backgroundBlur: 0,
  codeFontSize: 16,
  indentationSize: 4,
  zoomLevel: 1,
  isZoomable: 0,
  layoutType: "ltr",
  projectId: null,
};

export const getSettings = async () => {
  try {
    const activeProjectId = await getActiveProject();

    let settings = null;

    if (activeProjectId)
      settings = await db
        .select()
        .from(settingTable)
        .where(eq(settingTable.projectId, activeProjectId));

    let globalSetting = await db
      .select()
      .from(settingTable)
      .where(isNull(settingTable.projectId));

    if (!globalSetting || !globalSetting?.length) {
      await db.insert(settingTable).values(defaultSettings);
      globalSetting = await db
        .select()
        .from(settingTable)
        .where(isNull(settingTable.projectId));
    }

    settings = settings?.[0] ?? null;
    globalSetting = globalSetting?.[0] ?? null;

    return {
      settings,
      globalSetting,
    };
  } catch (error) {
    console.log(error);
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
    console.log(error);
  }
};

/* must contain projectId */
export const updateSettings = async (payload) => {
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
        : isNull(settingTable.projectId)
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
          : isNull(settingTable.projectId)
      );
  }

  return updated?.changes > 0;
};

export const deleteSettings = async () => {
  const deleted = await db.delete(settingTable);

  return deleted?.changes > 0;
};
