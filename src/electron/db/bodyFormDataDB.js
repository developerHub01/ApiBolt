import { and, eq, inArray, like, not } from "drizzle-orm";
import { db } from "./index.js";
import { bodyFormDataTable, projectTable } from "./schema.js";
import { getTabList } from "./tabsDB.js";
import { getActiveProject } from "./projectsDB.js";

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
    const projectId = await getActiveProject();
    if (!requestOrFolderMetaId || !projectId) return [];

    let result = await db
      .select()
      .from(bodyFormDataTable)
      .where(
        and(
          eq(bodyFormDataTable.requestOrFolderMetaId, requestOrFolderMetaId),
          eq(bodyFormDataTable.projectId, projectId)
        )
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
    const projectId = await getActiveProject();
    if (!requestOrFolderMetaId || !projectId) return false;

    await db
      .delete(bodyFormDataTable)
      .where(
        and(
          eq(bodyFormDataTable.requestOrFolderMetaId, requestOrFolderMetaId),
          eq(bodyFormDataTable.projectId, projectId)
        )
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
    if (!("projectId" in payload))
      payload["projectId"] = await getActiveProject();
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
  delete payload["projectId"];
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
  const projectId = await getActiveProject();
  if (!projectId) return false;

  if (payload)
    payload.map((formData) => {
      delete formData["id"];
      delete formData["requestOrFolderMetaId"];
      delete formData["projectId"];
      delete formData["createdAt"];
      if ("isCheck" in formData)
        formData["isCheck"] = Number(formData["isCheck"]);
      formData["requestOrFolderMetaId"] = requestOrFolderMetaId;
      formData["projectId"] = projectId;
    });

  try {
    await db.delete(bodyFormDataTable).where(
      and(
        eq(bodyFormDataTable.requestOrFolderMetaId, requestOrFolderMetaId),
        eq(bodyFormDataTable.projectId, projectId),
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
  const projectId = await getActiveProject();
  if (!projectId) return false;

  if (payload)
    payload.map((formData) => {
      delete formData["id"];
      delete formData["requestOrFolderMetaId"];
      delete formData["projectId"];
      delete formData["createdAt"];
      if ("isCheck" in formData)
        formData["isCheck"] = Number(formData["isCheck"]);
      formData["requestOrFolderMetaId"] = requestOrFolderMetaId;
      formData["projectId"] = projectId;
    });

  try {
    await db
      .delete(bodyFormDataTable)
      .where(
        and(
          eq(bodyFormDataTable.requestOrFolderMetaId, requestOrFolderMetaId),
          eq(bodyFormDataTable.projectId, projectId)
        )
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
    const projectId = await getActiveProject();
    if (!requestOrFolderMetaId || !projectId) return false;

    const rows =
      (await db
        .select()
        .from(bodyFormDataTable)
        .where(
          and(
            eq(bodyFormDataTable.requestOrFolderMetaId, requestOrFolderMetaId),
            eq(bodyFormDataTable.projectId, projectId)
          )
        )) ?? [];

    const checkValue = Number(!rows.every((row) => row.isCheck));

    const updated = await db
      .update(bodyFormDataTable)
      .set({
        isCheck: checkValue,
      })
      .where(
        and(
          eq(bodyFormDataTable.requestOrFolderMetaId, requestOrFolderMetaId),
          eq(bodyFormDataTable.projectId, projectId)
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
export const duplicateBodyFormData = async (payload) => {
  try {
    if (!payload) return;
    const oldIds = Object.keys(payload);
    const projectId = await getActiveProject();
    if (!oldIds.length || !projectId) return;

    const existingBodyFormData = await db
      .select()
      .from(bodyFormDataTable)
      .where(
        and(
          inArray(bodyFormDataTable.requestOrFolderMetaId, oldIds),
          eq(bodyFormDataTable.projectId, projectId)
        )
      );

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
        projectId,
      };
    });

    const result = await db.insert(bodyFormDataTable).values(duplicatePayload);

    return result.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};
