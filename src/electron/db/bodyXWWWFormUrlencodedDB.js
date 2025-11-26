import { and, eq, inArray } from "drizzle-orm";
import { db } from "./index.js";
import { bodyXWWWFormUrlencodedTable } from "./schema.js";
import { getTabList } from "./tabsDB.js";
import { getActiveProject } from "./projectsDB.js";

export const getBodyXWWWFormUrlencoded = async (requestOrFolderMetaId) => {
  try {
    if (!requestOrFolderMetaId)
      requestOrFolderMetaId = (await getTabList())?.selectedTab;
    const projectId = await getActiveProject();
    if (!requestOrFolderMetaId || !projectId) return [];

    const result = await db
      .select()
      .from(bodyXWWWFormUrlencodedTable)
      .where(
        and(
          eq(
            bodyXWWWFormUrlencodedTable.requestOrFolderMetaId,
            requestOrFolderMetaId
          ),
          eq(bodyXWWWFormUrlencodedTable.projectId, projectId)
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

export const deleteBodyXWWWFormUrlencoded = async (formId) => {
  try {
    const deleted = await db
      .delete(bodyXWWWFormUrlencodedTable)
      .where(eq(bodyXWWWFormUrlencodedTable.id, formId));

    return deleted?.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};

/* id === requestOrFolderMetaId */
export const deleteBodyXWWWFormUrlencodedByRequestMetaId = async (
  requestOrFolderMetaId
) => {
  try {
    if (!requestOrFolderMetaId)
      requestOrFolderMetaId = (await getTabList())?.selectedTab;
    const projectId = await getActiveProject();
    if (!requestOrFolderMetaId || !projectId) return false;

    await db
      .delete(bodyXWWWFormUrlencodedTable)
      .where(
        and(
          eq(
            bodyXWWWFormUrlencodedTable.requestOrFolderMetaId,
            requestOrFolderMetaId
          ),
          eq(bodyXWWWFormUrlencodedTable.projectId, projectId)
        )
      );
    return true;
  } catch (error) {
    console.error(error);
  }
};

export const createBodyXWWWFormUrlencoded = async (payload = {}) => {
  try {
    if (!("requestOrFolderMetaId" in payload))
      payload["requestOrFolderMetaId"] = (await getTabList())?.selectedTab;
    if (!("projectId" in payload))
      payload["projectId"] = await getActiveProject();
    if (!payload.requestOrFolderMetaId || !payload.projectId) return false;

    if ("isCheck" in payload) payload["isCheck"] = Number(payload["isCheck"]);

    const result = await db.insert(bodyXWWWFormUrlencodedTable).values(payload);

    return result?.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};

export const updateBodyXWWWFormUrlencoded = async (formId, payload) => {
  if (!payload) return false;

  delete payload["id"];
  delete payload["requestOrFolderMetaId"];
  delete payload["projectId"];
  delete payload["createdAt"];
  if ("isCheck" in payload) payload["isCheck"] = Number(payload["isCheck"]);

  try {
    const isExist = (
      await db
        .select()
        .from(bodyXWWWFormUrlencodedTable)
        .where(eq(bodyXWWWFormUrlencodedTable.id, formId))
    )?.[0];

    if (!isExist)
      await createBodyXWWWFormUrlencoded({
        id: formId,
      });

    const updated = await db
      .update(bodyXWWWFormUrlencodedTable)
      .set({
        ...payload,
      })
      .where(eq(bodyXWWWFormUrlencodedTable.id, formId));
    return updated?.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};

export const replaceBodyXWWWFormUrlencoded = async (
  requestOrFolderMetaId,
  payload
) => {
  const projectId = await getActiveProject();
  if (!projectId) return false;

  if (payload)
    payload.map((XWWFormUrlencoded) => {
      delete XWWFormUrlencoded["id"];
      delete XWWFormUrlencoded["requestOrFolderMetaId"];
      delete XWWFormUrlencoded["projectId"];
      delete XWWFormUrlencoded["createdAt"];
      if ("isCheck" in XWWFormUrlencoded)
        XWWFormUrlencoded["isCheck"] = Number(XWWFormUrlencoded["isCheck"]);
      XWWFormUrlencoded["requestOrFolderMetaId"] = requestOrFolderMetaId;
      XWWFormUrlencoded["projectId"] = projectId;
    });

  try {
    await db
      .delete(bodyXWWWFormUrlencodedTable)
      .where(
        and(
          eq(
            bodyXWWWFormUrlencodedTable.requestOrFolderMetaId,
            requestOrFolderMetaId
          ),
          eq(bodyXWWWFormUrlencodedTable.projectId, projectId)
        )
      );

    if (!payload.length) return true;
    await db.insert(bodyXWWWFormUrlencodedTable).values(payload);

    return true;
  } catch (error) {
    console.error(error);
  }
};

export const checkAllBodyXWWWFormUrlencodedByRequestMetaId = async (
  requestOrFolderMetaId
) => {
  try {
    if (!requestOrFolderMetaId)
      requestOrFolderMetaId = (await getTabList())?.selectedTab;
    const projectId = await getActiveProject();
    if (!requestOrFolderMetaId || !projectId) return false;

    const rows =
      (await db
        .select()
        .from(bodyXWWWFormUrlencodedTable)
        .where(
          and(
            eq(
              bodyXWWWFormUrlencodedTable.requestOrFolderMetaId,
              requestOrFolderMetaId
            ),
            eq(bodyXWWWFormUrlencodedTable.projectId, projectId)
          )
        )) ?? [];

    const checkValue = Number(!rows.every((row) => row.isCheck));

    const updated = await db
      .update(bodyXWWWFormUrlencodedTable)
      .set({
        isCheck: checkValue,
      })
      .where(
        and(
          eq(
            bodyXWWWFormUrlencodedTable.requestOrFolderMetaId,
            requestOrFolderMetaId
          ),
          eq(bodyXWWWFormUrlencodedTable.projectId, projectId)
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
export const duplicateBodyXWWWFormUrlencoded = async (payload) => {
  try {
    if (!payload) return;
    const oldIds = Object.keys(payload);
    const projectId = await getActiveProject();
    if (!oldIds.length || !projectId) return;

    const existingBodyXWWWFormUrlencodedData = await db
      .select()
      .from(bodyXWWWFormUrlencodedTable)
      .where(
        and(
          inArray(bodyXWWWFormUrlencodedTable.requestOrFolderMetaId, oldIds),
          eq(bodyXWWWFormUrlencodedTable.projectId, projectId)
        )
      );

    if (!existingBodyXWWWFormUrlencodedData.length) return true;

    /**
     * - Replacing oldId with duplicatedId
     * and only keeping url so that other things automatically generate by default
     */
    const duplicatePayload = existingBodyXWWWFormUrlencodedData.map(
      (bodyXWWWFormUrlencoded) => {
        delete bodyXWWWFormUrlencoded["id"];
        delete bodyXWWWFormUrlencoded["createdAt"];
        return {
          ...bodyXWWWFormUrlencoded,
          requestOrFolderMetaId:
            payload[bodyXWWWFormUrlencoded.requestOrFolderMetaId],
          projectId,
        };
      }
    );

    const result = await db
      .insert(bodyXWWWFormUrlencodedTable)
      .values(duplicatePayload);

    return result.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};
