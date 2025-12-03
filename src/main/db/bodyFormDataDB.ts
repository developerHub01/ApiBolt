import { and, eq, inArray, like, not } from "drizzle-orm";
import { db } from "@/main/db/index.js";
import { bodyFormDataTable } from "@/main/db/schema.js";
import { getTabList } from "@/main/db/tabsDB.js";

export const getBodyFormDataByFormId = async (id) => {
  try {
    const result = (
      await db
        .select()
        .from(bodyFormDataTable)
        .where(eq(bodyFormDataTable.id, id))
    )?.[0];

    if (result) result["isCheck"] = Boolean(result["isCheck"]);

    try {
      result["value"] = JSON.parse(result["value"]);
    } catch {}

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const getBodyFormData = async (requestOrFolderMetaId) => {
  try {
    if (!requestOrFolderMetaId)
      requestOrFolderMetaId = (await getTabList())?.selectedTab;
    if (!requestOrFolderMetaId) return [];

    let result = await db
      .select()
      .from(bodyFormDataTable)
      .where(
        eq(bodyFormDataTable.requestOrFolderMetaId, requestOrFolderMetaId)
      );

    result = result.map((item) => {
      item = {
        ...item,
        isCheck: Boolean(item.isCheck),
      };

      try {
        item["value"] = JSON.parse(item["value"]);
      } catch {}

      return item;
    });

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const deleteBodyFormData = async (formId) => {
  try {
    const deleted = await db
      .delete(bodyFormDataTable)
      .where(eq(bodyFormDataTable.id, formId));

    return deleted?.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};

/* id === requestOrFolderMetaId */
export const deleteBodyFormDataByRequestMetaId = async (
  requestOrFolderMetaId
) => {
  try {
    if (!requestOrFolderMetaId)
      requestOrFolderMetaId = (await getTabList())?.selectedTab;
    if (!requestOrFolderMetaId) return false;

    await db
      .delete(bodyFormDataTable)
      .where(
        eq(bodyFormDataTable.requestOrFolderMetaId, requestOrFolderMetaId)
      );
    return true;
  } catch (error) {
    console.error(error);
  }
};

export const deleteBodyFormDataFile = async (formId, index = 0) => {
  try {
    const formData = await getBodyFormDataByFormId(formId);

    if (
      !formData ||
      !Array.isArray(formData?.value) ||
      formData?.value?.length <= index
    )
      return false;

    formData.value?.splice(index, 1);
    formData.value = formData.value ?? [];

    const updatedValue = formData.value.length
      ? JSON.stringify(formData.value)
      : "";

    const updated = await db
      .update(bodyFormDataTable)
      .set({
        value: updatedValue,
      })
      .where(eq(bodyFormDataTable.id, formId));

    return updated?.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};

export const createBodyFormData = async (payload = {}) => {
  try {
    if (!("requestOrFolderMetaId" in payload))
      payload["requestOrFolderMetaId"] = (await getTabList())?.selectedTab;
    if (!payload.requestOrFolderMetaId) return false;
    if ("isCheck" in payload) payload["isCheck"] = Number(payload["isCheck"]);

    const result = await db.insert(bodyFormDataTable).values(payload);

    return result?.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};

export const updateBodyFormData = async (formId, payload) => {
  if (!payload) return false;

  delete payload["id"];
  delete payload["requestOrFolderMetaId"];
  delete payload["createdAt"];
  if ("isCheck" in payload) payload["isCheck"] = Number(payload["isCheck"]);

  try {
    const isExist = (
      await db
        .select()
        .from(bodyFormDataTable)
        .where(eq(bodyFormDataTable.id, formId))
    )?.[0];

    if (!isExist)
      await createBodyFormData({
        id: formId,
      });

    const updated = await db
      .update(bodyFormDataTable)
      .set({
        ...payload,
      })
      .where(eq(bodyFormDataTable.id, formId));
    return updated?.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};

export const replaceBodyFormData = async (requestOrFolderMetaId, payload) => {
  if (payload)
    payload.map((formData) => {
      delete formData["id"];
      delete formData["requestOrFolderMetaId"];
      delete formData["createdAt"];
      if ("isCheck" in formData)
        formData["isCheck"] = Number(formData["isCheck"]);
      formData["requestOrFolderMetaId"] = requestOrFolderMetaId;
    });

  try {
    await db.delete(bodyFormDataTable).where(
      and(
        eq(bodyFormDataTable.requestOrFolderMetaId, requestOrFolderMetaId),
        /* it only remove valued value not file */
        not(
          and(
            like(bodyFormDataTable.value, "[%"), // starts with [
            like(bodyFormDataTable.value, "%]") // ends with ]
          )
        )
      )
    );

    if (!payload?.length) return true;
    await db.insert(bodyFormDataTable).values(payload);

    return true;
  } catch (error) {
    console.error(error);
  }
};

export const replaceFullBodyFormData = async (
  requestOrFolderMetaId,
  payload
) => {
  if (payload)
    payload.map((formData) => {
      delete formData["id"];
      delete formData["requestOrFolderMetaId"];
      delete formData["createdAt"];
      if ("isCheck" in formData)
        formData["isCheck"] = Number(formData["isCheck"]);
      formData["requestOrFolderMetaId"] = requestOrFolderMetaId;
    });

  try {
    await db
      .delete(bodyFormDataTable)
      .where(
        eq(bodyFormDataTable.requestOrFolderMetaId, requestOrFolderMetaId)
      );

    if (!payload?.length) return true;
    const created = await db.insert(bodyFormDataTable).values(payload);

    return created?.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};

export const checkAllBodyFormDataByRequestMetaId = async (
  requestOrFolderMetaId
) => {
  try {
    if (!requestOrFolderMetaId)
      requestOrFolderMetaId = (await getTabList())?.selectedTab;
    if (!requestOrFolderMetaId) return false;

    const rows =
      (await db
        .select()
        .from(bodyFormDataTable)
        .where(
          eq(bodyFormDataTable.requestOrFolderMetaId, requestOrFolderMetaId)
        )) ?? [];

    const checkValue = Number(!rows.every((row) => row.isCheck));

    const updated = await db
      .update(bodyFormDataTable)
      .set({
        isCheck: checkValue,
      })
      .where(
        eq(bodyFormDataTable.requestOrFolderMetaId, requestOrFolderMetaId)
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
export const duplicateBodyFormData = async (payload) => {
  try {
    if (!payload) return;
    const oldIds = Object.keys(payload);
    if (!oldIds.length) return;

    const existingBodyFormData = await db
      .select()
      .from(bodyFormDataTable)
      .where(inArray(bodyFormDataTable.requestOrFolderMetaId, oldIds));

    if (!existingBodyFormData.length) return true;

    /**
     * - Replacing oldId with duplicatedId
     * and only keeping url so that other things automatically generate by default
     */
    const duplicatePayload = existingBodyFormData.map((formData) => {
      delete formData["id"];
      delete formData["createdAt"];
      return {
        ...formData,
        requestOrFolderMetaId: payload[formData.requestOrFolderMetaId],
      };
    });

    const result = await db.insert(bodyFormDataTable).values(duplicatePayload);

    return result.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};
