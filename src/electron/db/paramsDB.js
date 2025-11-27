import { eq, inArray } from "drizzle-orm";
import { db } from "./index.js";
import { paramsTable } from "./schema.js";
import { getTabList } from "./tabsDB.js";

/* id === requestOrFolderMetaId */
export const getParams = async (id) => {
  try {
    if (!id) id = (await getTabList())?.selectedTab;
    if (!id) return [];

    const result =
      (await db
        .select()
        .from(paramsTable)
        .where(eq(paramsTable.requestOrFolderMetaId, id))) ?? [];

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
    if (!requestOrFolderMetaId) return false;

    await db
      .delete(paramsTable)
      .where(eq(paramsTable.requestOrFolderMetaId, requestOrFolderMetaId));
    return true;
  } catch (error) {
    console.error(error);
  }
};

export const createParams = async (payload = {}) => {
  try {
    if (!("requestOrFolderMetaId" in payload))
      payload["requestOrFolderMetaId"] = (await getTabList())?.selectedTab;
    if (!payload.requestOrFolderMetaId) return false;
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
  if (payload)
    payload = payload.map((param) => {
      delete param["requestOrFolderMetaId"];
      delete param["createdAt"];
      if ("isCheck" in param) param["isCheck"] = Number(param["isCheck"]);
      param["requestOrFolderMetaId"] = requestOrFolderMetaId;

      return param;
    });

  try {
    await db
      .delete(paramsTable)
      .where(eq(paramsTable.requestOrFolderMetaId, requestOrFolderMetaId));

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
    if (!requestOrFolderMetaId) return false;

    const rows =
      (await db
        .select()
        .from(paramsTable)
        .where(eq(paramsTable.requestOrFolderMetaId, requestOrFolderMetaId))) ??
      [];
    if (rows.length === 0) return false;

    const checkValue = Number(!rows.every((row) => row.isCheck));

    const updated = await db
      .update(paramsTable)
      .set({
        isCheck: checkValue,
      })
      .where(eq(paramsTable.requestOrFolderMetaId, requestOrFolderMetaId));

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
    if (!oldIds.length) return;

    const existingParamsData = await db
      .select()
      .from(paramsTable)
      .where(inArray(paramsTable.requestOrFolderMetaId, oldIds));

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
      };
    });

    const result = await db.insert(paramsTable).values(duplicatePayload);

    return result.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};
