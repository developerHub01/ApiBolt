import { eq } from "drizzle-orm";
import { db } from "./index.js";
import { headersTable, hiddenHeadersCheckTable } from "./schema.js";
import { getTabList } from "./tabsDB.js";
import {
  createHiddenHeadersCheck,
  getHiddenHeadersCheck,
} from "./hiddenHeadersCheckTableDB.js";

/* id === requestOrFolderMetaId */
export const getHeaders = async (id) => {
  try {
    if (!id) id = (await getTabList())?.selectedTab;
    if (!id) return [];

    const result = await db
      .select()
      .from(headersTable)
      .where(eq(headersTable.requestOrFolderMetaId, id));

    return result.map((item) => ({
      ...item,
      isCheck: Boolean(item.isCheck),
    }));
  } catch (error) {
    console.log(error);
  }
};

export const deleteHeaders = async (paramId) => {
  try {
    const deleted = await db
      .delete(headersTable)
      .where(eq(headersTable.id, paramId));

    return deleted?.changes > 0;
  } catch (error) {
    console.log(error);
  }
};

/* id === requestOrFolderMetaId */
export const deleteHeadersByRequestMetaId = async (requestOrFolderMetaId) => {
  try {
    if (!requestOrFolderMetaId)
      requestOrFolderMetaId = (await getTabList())?.selectedTab;
    if (!requestOrFolderMetaId) return false;

    const deleted = await db
      .delete(headersTable)
      .where(eq(headersTable.requestOrFolderMetaId, requestOrFolderMetaId));
    return deleted?.changes > 0;
  } catch (error) {
    console.log(error);
  }
};

export const createHeaders = async (payload = {}) => {
  try {
    if (!("requestOrFolderMetaId" in payload))
      payload["requestOrFolderMetaId"] = (await getTabList())?.selectedTab;
    if (!payload.requestOrFolderMetaId) return false;
    if ("isCheck" in payload) payload["isCheck"] = Number(payload["isCheck"]);

    const result = await db.insert(headersTable).values(payload);

    if (result?.changes) {
      const isExist = await getHiddenHeadersCheck(
        payload.requestOrFolderMetaId
      );

      if (isExist)
        await createHiddenHeadersCheck({
          requestOrFolderMetaId: payload.requestOrFolderMetaId,
        });
    }

    return result?.changes > 0;
  } catch (error) {
    console.log(error);
  }
};

export const updateHeaders = async (headerId, payload) => {
  if (!payload) return false;

  delete payload["id"];
  delete payload["requestOrFolderMetaId"];
  delete payload["createdAt"];
  if ("isCheck" in payload) payload["isCheck"] = Number(payload["isCheck"]);

  try {
    const isExist = (
      await db.select().from(headersTable).where(eq(headersTable.id, headerId))
    )?.[0];

    if (!isExist)
      await createHeaders({
        id: headerId,
      });

    const updated = await db
      .update(headersTable)
      .set({
        ...payload,
      })
      .where(eq(headersTable.id, headerId));
    return updated?.changes > 0;
  } catch (error) {
    console.log(error);
  }
};

export const checkAllHeadersByRequestMetaId = async (requestOrFolderMetaId) => {
  try {
    if (!requestOrFolderMetaId)
      requestOrFolderMetaId = (await getTabList())?.selectedTab;
    if (!requestOrFolderMetaId) return false;

    const rows =
      (await db
        .select()
        .from(headersTable)
        .where(
          eq(headersTable.requestOrFolderMetaId, requestOrFolderMetaId)
        )) ?? [];

    const checkValue = Number(!rows.every((row) => row.isCheck));

    const updated = await db
      .update(headersTable)
      .set({
        isCheck: checkValue,
      })
      .where(eq(headersTable.requestOrFolderMetaId, requestOrFolderMetaId));
    return updated?.changes > 0;
  } catch (error) {
    console.log(error);
  }
};
