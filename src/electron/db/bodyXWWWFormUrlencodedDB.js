import { eq, inArray } from "drizzle-orm";
import { db } from "./index.js";
import { bodyXWWWFormUrlencodedTable } from "./schema.js";
import { getTabList } from "./tabsDB.js";

export const getBodyXWWWFormUrlencoded = async (requestOrFolderMetaId) => {
  try {
    if (!requestOrFolderMetaId)
      requestOrFolderMetaId = (await getTabList())?.selectedTab;
    if (!requestOrFolderMetaId) return [];

    const result = await db
      .select()
      .from(bodyXWWWFormUrlencodedTable)
      .where(
        eq(
          bodyXWWWFormUrlencodedTable.requestOrFolderMetaId,
          requestOrFolderMetaId
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

    return deleted?.changes > 0;
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
    if (!requestOrFolderMetaId) return false;

    const deleted = await db
      .delete(bodyXWWWFormUrlencodedTable)
      .where(
        eq(
          bodyXWWWFormUrlencodedTable.requestOrFolderMetaId,
          requestOrFolderMetaId
        )
      );
    return deleted?.changes > 0;
  } catch (error) {
    console.error(error);
  }
};

export const createBodyXWWWFormUrlencoded = async (payload = {}) => {
  try {
    if (!("requestOrFolderMetaId" in payload))
      payload["requestOrFolderMetaId"] = (await getTabList())?.selectedTab;
    if (!payload.requestOrFolderMetaId) return false;
    if ("isCheck" in payload) payload["isCheck"] = Number(payload["isCheck"]);

    const result = await db.insert(bodyXWWWFormUrlencodedTable).values(payload);

    return result?.changes > 0;
  } catch (error) {
    console.error(error);
  }
};

export const updateBodyXWWWFormUrlencoded = async (formId, payload) => {
  if (!payload) return false;

  delete payload["id"];
  delete payload["requestOrFolderMetaId"];
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
    return updated?.changes > 0;
  } catch (error) {
    console.error(error);
  }
};

export const replaceBodyXWWWFormUrlencoded = async (
  requestOrFolderMetaId,
  payload
) => {
  if (payload)
    payload.map((XWWFormUrlencoded) => {
      delete XWWFormUrlencoded["id"];
      delete XWWFormUrlencoded["requestOrFolderMetaId"];
      delete XWWFormUrlencoded["createdAt"];
      if ("isCheck" in XWWFormUrlencoded)
        XWWFormUrlencoded["isCheck"] = Number(XWWFormUrlencoded["isCheck"]);
      XWWFormUrlencoded["requestOrFolderMetaId"] = requestOrFolderMetaId;
    });

  try {
    await db
      .delete(bodyXWWWFormUrlencodedTable)
      .where(
        eq(
          bodyXWWWFormUrlencodedTable.requestOrFolderMetaId,
          requestOrFolderMetaId
        )
      );

    if (!payload.length) return true;
    const created = await db
      .insert(bodyXWWWFormUrlencodedTable)
      .values(payload);

    return created?.changes > 0;
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
    if (!requestOrFolderMetaId) return false;

    const rows =
      (await db
        .select()
        .from(bodyXWWWFormUrlencodedTable)
        .where(
          eq(
            bodyXWWWFormUrlencodedTable.requestOrFolderMetaId,
            requestOrFolderMetaId
          )
        )) ?? [];

    const checkValue = Number(!rows.every((row) => row.isCheck));

    const updated = await db
      .update(bodyXWWWFormUrlencodedTable)
      .set({
        isCheck: checkValue,
      })
      .where(
        eq(
          bodyXWWWFormUrlencodedTable.requestOrFolderMetaId,
          requestOrFolderMetaId
        )
      );
    return updated?.changes > 0;
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
    if (!oldIds.length) return;

    const existingBodyXWWWFormUrlencodedData = await db
      .select()
      .from(bodyXWWWFormUrlencodedTable)
      .where(
        inArray(bodyXWWWFormUrlencodedTable.requestOrFolderMetaId, oldIds)
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
        };
      }
    );

    const result = await db
      .insert(bodyXWWWFormUrlencodedTable)
      .values(duplicatePayload);

    return result.changes > 0;
  } catch (error) {
    console.error(error);
  }
};
