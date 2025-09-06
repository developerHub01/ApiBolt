import { eq } from "drizzle-orm";
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
    console.log(error);
  }
};

export const deleteParams = async (paramId) => {
  try {
    const deleted = await db
      .delete(paramsTable)
      .where(eq(paramsTable.id, paramId));

    return deleted?.changes > 0;
  } catch (error) {
    console.log(error);
  }
};

export const deleteAllParams = async () => {
  try {
    const deleted = await db.delete(paramsTable);
    return deleted?.changes > 0;
  } catch (error) {
    console.log(error);
  }
};

/* id === requestOrFolderMetaId */
export const deleteParamsByRequestMetaId = async (requestOrFolderMetaId) => {
  try {
    if (!requestOrFolderMetaId)
      requestOrFolderMetaId = (await getTabList())?.selectedTab;
    if (!requestOrFolderMetaId) return false;

    const deleted = await db
      .delete(paramsTable)
      .where(eq(paramsTable.requestOrFolderMetaId, requestOrFolderMetaId));
    return deleted?.changes > 0;
  } catch (error) {
    console.log(error);
  }
};

export const createParams = async (payload = {}) => {
  try {
    if (!("requestOrFolderMetaId" in payload))
      payload["requestOrFolderMetaId"] = (await getTabList())?.selectedTab;
    if (!payload.requestOrFolderMetaId) return false;
    if ("isCheck" in payload) payload["isCheck"] = Number(payload["isCheck"]);

    const result = await db.insert(paramsTable).values(payload);
    return result.changes > 0;
  } catch (error) {
    console.log(error);
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

    const updated = await db
      .update(paramsTable)
      .set({
        ...payload,
      })
      .where(eq(paramsTable.id, paramId));
    return updated?.changes > 0;
  } catch (error) {
    console.log(error);
  }
};

export const replaceParams = async (requestOrFolderMetaId, payload) => {
  if (!payload) return false;

  payload.map((param) => {
    delete param["id"];
    delete param["requestOrFolderMetaId"];
    delete param["createdAt"];
    if ("isCheck" in param) param["isCheck"] = Number(param["isCheck"]);
    param["requestOrFolderMetaId"] = requestOrFolderMetaId;
  });

  try {
    await db
      .delete(paramsTable)
      .where(eq(paramsTable.requestOrFolderMetaId, requestOrFolderMetaId));

    if (!payload.length) return true;
    const created = await db.insert(paramsTable).values(payload);

    return created?.changes > 0;
  } catch (error) {
    console.log(error);
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

    return updated?.changes > 0;
  } catch (error) {
    console.log(error);
  }
};
