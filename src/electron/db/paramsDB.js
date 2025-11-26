import { and, eq, inArray } from "drizzle-orm";
import { db } from "./index.js";
import { paramsTable } from "./schema.js";
import { getTabList } from "./tabsDB.js";
import { getActiveProject } from "./projectsDB.js";

/* id === requestOrFolderMetaId */
export const getParams = async (id) => {
  try {
    if (!id) id = (await getTabList())?.selectedTab;
    const projectId = await getActiveProject();
    if (!id || !projectId) return [];

    const result =
      (await db
        .select()
        .from(paramsTable)
        .where(
          and(
            eq(paramsTable.requestOrFolderMetaId, id),
            eq(paramsTable.projectId, projectId)
          )
        )) ?? [];

    return result.map((item) => ({
      ...item,
      isCheck: Boolean(item.isCheck),
    }));
  } catch (error) {
    console.error(error);
  }
};

export const deleteParams = async (paramId) => {
  try {
    const deleted = await db
      .delete(paramsTable)
      .where(eq(paramsTable.id, paramId));

    return deleted?.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};

export const deleteAllParams = async () => {
  try {
    const deleted = await db.delete(paramsTable);
    return deleted?.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};

/* id === requestOrFolderMetaId */
export const deleteParamsByRequestMetaId = async (requestOrFolderMetaId) => {
  try {
    if (!requestOrFolderMetaId)
      requestOrFolderMetaId = (await getTabList())?.selectedTab;
    const projectId = await getActiveProject();
    if (!requestOrFolderMetaId || !projectId) return false;

    await db
      .delete(paramsTable)
      .where(
        and(
          eq(paramsTable.requestOrFolderMetaId, requestOrFolderMetaId),
          eq(paramsTable.projectId, projectId)
        )
      );
    return true;
  } catch (error) {
    console.error(error);
  }
};

export const createParams = async (payload = {}) => {
  try {
    if (!("requestOrFolderMetaId" in payload))
      payload["requestOrFolderMetaId"] = (await getTabList())?.selectedTab;
    if (!("projectId" in payload))
      payload["projectId"] = await getActiveProject();
    if (!payload.requestOrFolderMetaId || !payload.projectId) return false;

    if ("isCheck" in payload) payload["isCheck"] = Number(payload["isCheck"]);

    if (typeof payload === "object" && !Object.keys(payload).length)
      return true;

    const result = await db.insert(paramsTable).values(payload);
    return result.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};

export const updateParams = async (paramId, payload) => {
  if (!payload) return false;

  delete payload["id"];
  delete payload["requestOrFolderMetaId"];
  delete payload["projectId"];
  delete payload["createdAt"];
  if ("isCheck" in payload) payload["isCheck"] = Number(payload["isCheck"]);

  try {
    const isExist = (
      await db.select().from(paramsTable).where(eq(paramsTable.id, paramId))
    )?.[0];

    if (!isExist)
      await createParams({
        id: paramId,
      });

    if (typeof payload === "object" && !Object.keys(payload).length)
      return true;

    const updated = await db
      .update(paramsTable)
      .set({
        ...payload,
      })
      .where(eq(paramsTable.id, paramId));
    return updated?.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};

export const replaceParams = async (requestOrFolderMetaId, payload) => {
  const projectId = await getActiveProject();
  if (!projectId) return false;

  if (payload)
    payload = payload.map((param) => {
      delete param["requestOrFolderMetaId"];
      delete param["projectId"];
      delete param["createdAt"];
      if ("isCheck" in param) param["isCheck"] = Number(param["isCheck"]);
      param["requestOrFolderMetaId"] = requestOrFolderMetaId;
      param["projectId"] = projectId;

      return param;
    });

  try {
    await db
      .delete(paramsTable)
      .where(
        and(
          eq(paramsTable.requestOrFolderMetaId, requestOrFolderMetaId),
          eq(paramsTable.projectId, projectId)
        )
      );

    if (typeof payload === "object" && !Object.keys(payload).length)
      return true;

    if (!payload.length) return true;
    await db.insert(paramsTable).values(payload);

    return true;
  } catch (error) {
    console.error(error);
  }
};

export const checkAllParamsByRequestMetaId = async (requestOrFolderMetaId) => {
  try {
    if (!requestOrFolderMetaId)
      requestOrFolderMetaId = (await getTabList())?.selectedTab;
    const projectId = await getActiveProject();
    if (!requestOrFolderMetaId || !projectId) return false;

    const rows =
      (await db
        .select()
        .from(paramsTable)
        .where(
          and(
            eq(paramsTable.requestOrFolderMetaId, requestOrFolderMetaId),
            eq(paramsTable.projectId, projectId)
          )
        )) ?? [];
    if (rows.length === 0) return false;

    const checkValue = Number(!rows.every((row) => row.isCheck));

    const updated = await db
      .update(paramsTable)
      .set({
        isCheck: checkValue,
      })
      .where(
        and(
          eq(paramsTable.requestOrFolderMetaId, requestOrFolderMetaId),
          eq(paramsTable.projectId, projectId)
        )
      );

    return updated?.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};

/* 
payload = {
  oldId: newId ---> newId means duplicatedId
}
*/
export const duplicateParams = async (payload) => {
  try {
    if (!payload) return;
    const oldIds = Object.keys(payload);
    const projectId = await getActiveProject();
    if (!oldIds.length || !projectId) return;

    const existingParamsData = await db
      .select()
      .from(paramsTable)
      .where(
        and(
          inArray(paramsTable.requestOrFolderMetaId, oldIds),
          eq(paramsTable.projectId, projectId)
        )
      );

    if (!existingParamsData.length) return true;

    /**
     * - Replacing oldId with duplicatedId
     * and only keeping url so that other things automatically generate by default
     */
    const duplicatePayload = existingParamsData.map((param) => {
      delete param["id"];
      delete param["createdAt"];
      return {
        ...param,
        requestOrFolderMetaId: payload[param.requestOrFolderMetaId],
        projectId,
      };
    });

    const result = await db.insert(paramsTable).values(duplicatePayload);

    return result.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};
