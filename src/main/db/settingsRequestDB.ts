import { GLOBAL_PROJECT_ID, settingRequestTable } from "@/main/db/schema.js";
import { eq } from "drizzle-orm";
import { db } from "@/main/db/index.js";
import { getActiveProject } from "@/main/db/projectsDB.js";
import { ElectronAPISettingsRequestInterface } from "@shared/types/api/electron-settings-request";
import { defaultSettingsRequest } from "@/data/settings_request";

export const getSettingsRequest = async () => {
  try {
    const activeProjectId = await getActiveProject();
    let settings = activeProjectId ? (
      await db
        .select()
        .from(settingRequestTable)
        .where(eq(settingRequestTable.projectId, activeProjectId))
        .limit(1)
    )?.[0] : null;


    let globalSetting = (
      await db
        .select()
        .from(settingRequestTable)
        .where(eq(settingRequestTable.projectId, GLOBAL_PROJECT_ID))
        .limit(1)
    )?.[0];

    // if (!globalSetting) {
    //   await db.insert(settingRequestTable).values(defaultSettingsRequest);
    //   globalSetting = (
    //     await db
    //       .select()
    //       .from(settingRequestTable)
    //       .where(isNull(settingRequestTable.projectId))
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
      globalSetting: defaultSettingsRequest,
    }
  }
};

export const getSettingsRequestByProjectId = async (id?: string | null) => {
  try {
    const activeProjectId = id ?? (await getActiveProject());
    if (!activeProjectId) throw new Error()

    return (
      await db
        .select()
        .from(settingRequestTable)
        .where(eq(settingRequestTable.projectId, activeProjectId))
        .limit(1)
    )?.[0] ?? null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getSettingsRequestByGlobal = async () => {
  try {
    return (
      await db
        .select()
        .from(settingRequestTable)
        .where(eq(settingRequestTable.projectId, GLOBAL_PROJECT_ID))
        .limit(1)
    )?.[0] ?? defaultSettingsRequest;
  } catch (error) {
    console.error(error);
    return defaultSettingsRequest;
  }
};

/* must contain projectId */
export const updateSettingsRequest = async (payload: Parameters<ElectronAPISettingsRequestInterface["updateSettingsRequest"]>[0]) => {
  const { projectId: pI, ...updatePayload } = payload;
  const projectId = payload.projectId ?? GLOBAL_PROJECT_ID

  for (const key in updatePayload) {
    const value = updatePayload[key];
    if (value == undefined) updatePayload[key] = null;
  }

  const isExist = Boolean((await db.select({
    id: settingRequestTable.id
  }).from(settingRequestTable).where(
    eq(settingRequestTable.projectId, projectId))
    .limit(1))?.[0]?.id)

  if (!isExist) return (await db.insert(settingRequestTable).values({
    ...updatePayload,
    projectId,
  }).returning())?.[0]

  return (await db.update(settingRequestTable).set({
    ...updatePayload,
  }).where(eq(settingRequestTable.projectId, projectId)).returning())?.[0]
};

export const deleteSettingsRequest = async () => {
  try {
    return (await db.delete(settingRequestTable))?.rowsAffected > 0;
  } catch (error) {
    console.error(error)
    return false
  }
};
