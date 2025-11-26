import { and, eq, inArray } from "drizzle-orm";
import { db } from "./index.js";
import { headersTable, projectTable } from "./schema.js";
import { getTabList } from "./tabsDB.js";
import {
  createHiddenHeadersCheck,
  getHiddenHeadersCheck,
} from "./hiddenHeadersCheckDB.js";
import { getActiveProject } from "./projectsDB.js";

/* id === requestOrFolderMetaId */
export const getHeaders = async (id) => {
  try {
    if (!id) id = (await getTabList())?.selectedTab;
    const projectId = await getActiveProject();
    if (!id || !projectId) return [];

    const result = await db
      .select()
      .from(headersTable)
      .where(
        and(
          eq(headersTable.requestOrFolderMetaId, id),
          eq(headersTable.projectId, projectId)
        )
      );

    return result.map((item) => ({
      ...item,
      isCheck: Boolean(item.isCheck),
    }));
  } catch (error) {
    console.error(error);
  }
};

export const deleteHeaders = async (paramId) => {
  try {
    const deleted = await db
      .delete(headersTable)
      .where(eq(headersTable.id, paramId));

    return deleted?.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};

/* id === requestOrFolderMetaId */
export const deleteHeadersByRequestMetaId = async (requestOrFolderMetaId) => {
  try {
    if (!requestOrFolderMetaId)
      requestOrFolderMetaId = (await getTabList())?.selectedTab;
    const projectId = await getActiveProject();
    if (!requestOrFolderMetaId || !projectId) return false;

    await db
      .delete(headersTable)
      .where(
        and(
          eq(headersTable.requestOrFolderMetaId, requestOrFolderMetaId),
          eq(headersTable.projectId, projectId)
        )
      );
    return true;
  } catch (error) {
    console.error(error);
  }
};

export const createHeaders = async (payload = {}) => {
  try {
    if (!("requestOrFolderMetaId" in payload))
      payload["requestOrFolderMetaId"] = (await getTabList())?.selectedTab;
    if (!("projectId" in payload))
      payload["projectId"] = await getActiveProject();
    if (!payload.requestOrFolderMetaId || !payload.projectId) return false;

    if ("isCheck" in payload) payload["isCheck"] = Number(payload["isCheck"]);

    if (typeof payload === "object" && !Object.keys(payload).length)
      return true;

    const result = await db.insert(headersTable).values(payload);

    if (result?.rowsAffected) {
      const isExist = await getHiddenHeadersCheck(
        payload.requestOrFolderMetaId
      );

      if (!isExist)
        await createHiddenHeadersCheck({
          requestOrFolderMetaId: payload.requestOrFolderMetaId,
          projectId: payload.projectId,
        });
    }

    return result?.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};

export const updateHeaders = async (headerId, payload) => {
  if (!payload) return false;

  delete payload["id"];
  delete payload["requestOrFolderMetaId"];
  delete payload["projectId"];
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

    if (typeof payload === "object" && !Object.keys(payload).length)
      return true;

    const updated = await db
      .update(headersTable)
      .set({
        ...payload,
      })
      .where(eq(headersTable.id, headerId));
    return updated?.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};

export const replaceHeaders = async (requestOrFolderMetaId, payload) => {
  const projectId = await getActiveProject();
  if (!projectId) return false;

  if (payload)
    payload.map((header) => {
      delete header["id"];
      delete header["requestOrFolderMetaId"];
      delete header["projectId"];
      delete header["createdAt"];
      if ("isCheck" in header) header["isCheck"] = Number(header["isCheck"]);
      header["requestOrFolderMetaId"] = requestOrFolderMetaId;
      header["projectId"] = projectId;
    });

  try {
    await db
      .delete(headersTable)
      .where(
        and(
          eq(headersTable.requestOrFolderMetaId, requestOrFolderMetaId),
          eq(headersTable.projectId, projectId)
        )
      );

    if (
      typeof payload === "object" &&
      ((Array.isArray(payload) && !payload.length) ||
        !Object.keys(payload).length)
    )
      return true;

    await db.insert(headersTable).values(payload);

    return true;
  } catch (error) {
    console.error(error);
  }
};

export const checkAllHeadersByRequestMetaId = async (requestOrFolderMetaId) => {
  try {
    if (!requestOrFolderMetaId)
      requestOrFolderMetaId = (await getTabList())?.selectedTab;
    const projectId = await getActiveProject();
    if (!requestOrFolderMetaId || !projectId) return false;

    const rows =
      (await db
        .select()
        .from(headersTable)
        .where(
          and(
            eq(headersTable.requestOrFolderMetaId, requestOrFolderMetaId),
            eq(headersTable.projectId, projectId)
          )
        )) ?? [];

    const checkValue = Number(!rows.every((row) => row.isCheck));

    const updated = await db
      .update(headersTable)
      .set({
        isCheck: checkValue,
      })
      .where(
        and(
          eq(headersTable.requestOrFolderMetaId, requestOrFolderMetaId),
          eq(headersTable.projectId, projectId)
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
export const duplicateHeaders = async (payload) => {
  try {
    if (!payload) return;
    const oldIds = Object.keys(payload);
    const projectId = await getActiveProject();
    if (!oldIds.length || !projectId) return;

    const existingHeadersData = await db
      .select()
      .from(headersTable)
      .where(
        and(
          inArray(headersTable.requestOrFolderMetaId, oldIds),
          eq(headersTable.projectId, projectId)
        )
      );

    if (!existingHeadersData.length) return true;

    /**
     * - Replacing oldId with duplicatedId
     * and only keeping url so that other things automatically generate by default
     */
    const duplicatePayload = existingHeadersData.map((header) => {
      delete header["id"];
      delete header["createdAt"];
      return {
        ...header,
        requestOrFolderMetaId: payload[header.requestOrFolderMetaId],
        projectId,
      };
    });

    const result = await db.insert(headersTable).values(duplicatePayload);

    return result.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};
