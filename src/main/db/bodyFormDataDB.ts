import { and, eq, inArray, like, not } from "drizzle-orm";
import { db } from "@/main/db/index.js";
import { bodyFormDataTable } from "@/main/db/schema.js";
import { getTabList } from "@/main/db/tabsDB.js";
import { ElectronAPIBodyFormDataInterface } from "@shared/types/api/electron-body-form";

export const getBodyFormDataByFormId = async (id: string) => {
  try {
    const result = (
      await db
        .select()
        .from(bodyFormDataTable)
        .where(eq(bodyFormDataTable.id, id))
    )?.[0];

    try {
      result["value"] = JSON.parse(result["value"]);
    } catch {
      console.error("not json");
    }

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getBodyFormData = async (
  requestOrFolderMetaId: Parameters<
    ElectronAPIBodyFormDataInterface["getBodyFormData"]
  >[0],
) => {
  try {
    requestOrFolderMetaId =
      requestOrFolderMetaId ?? (await getTabList())?.selectedTab;
    if (!requestOrFolderMetaId) throw new Error();

    const rawFormData = await db
      .select()
      .from(bodyFormDataTable)
      .where(
        eq(bodyFormDataTable.requestOrFolderMetaId, requestOrFolderMetaId),
      );

    const formDataList = rawFormData.map(item => {
      let value: string | Array<string> = item["value"];
      try {
        value = JSON.parse(value);
      } catch {
        console.error("not json");
      }

      return {
        ...item,
        value,
      };
    });

    return formDataList;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const deleteBodyFormData: ElectronAPIBodyFormDataInterface["deleteBodyFormData"] =
  async formId => {
    try {
      return (
        (
          await db
            .delete(bodyFormDataTable)
            .where(eq(bodyFormDataTable.id, formId))
        )?.rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };

/* id === requestOrFolderMetaId */
export const deleteBodyFormDataByRequestMetaId: ElectronAPIBodyFormDataInterface["deleteBodyFormDataByRequestMetaId"] =
  async requestOrFolderMetaId => {
    try {
      requestOrFolderMetaId =
        requestOrFolderMetaId ?? (await getTabList())?.selectedTab;
      if (!requestOrFolderMetaId) throw new Error();

      return (
        (
          await db
            .delete(bodyFormDataTable)
            .where(
              eq(
                bodyFormDataTable.requestOrFolderMetaId,
                requestOrFolderMetaId,
              ),
            )
        ).rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const deleteBodyFormDataFile: ElectronAPIBodyFormDataInterface["deleteBodyFormDataFile"] =
  async (formId, index = 0) => {
    try {
      const formData = await getBodyFormDataByFormId(formId);
      if (!formData) throw new Error();

      if (
        !formData ||
        !Array.isArray(formData?.value) ||
        formData?.value?.length <= index
      )
        throw new Error();

      formData.value?.splice(index, 1);
      formData.value = formData.value ?? [];

      const updatedValue = formData.value.length
        ? JSON.stringify(formData.value)
        : "";

      return (
        (
          await db
            .update(bodyFormDataTable)
            .set({
              value: updatedValue,
            })
            .where(eq(bodyFormDataTable.id, formId))
        )?.rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const createBodyFormData: ElectronAPIBodyFormDataInterface["createBodyFormData"] =
  async payload => {
    try {
      const requestOrFolderMetaId =
        payload.requestOrFolderMetaId ?? (await getTabList())?.selectedTab;
      if (!requestOrFolderMetaId) throw new Error();
      const value = Array.isArray(payload.value)
        ? JSON.stringify(payload.value)
        : payload.value;

      return (
        (
          await db.insert(bodyFormDataTable).values({
            ...payload,
            value,
            requestOrFolderMetaId,
          })
        )?.rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const updateBodyFormData: ElectronAPIBodyFormDataInterface["updateBodyFormData"] =
  async (formId, payload) => {
    if (!payload) throw new Error();

    delete payload["id"];
    delete payload["requestOrFolderMetaId"];
    delete payload["createdAt"];

    const value = Array.isArray(payload.value)
      ? JSON.stringify(payload.value)
      : payload.value;

    try {
      const isExist = (
        await db
          .select()
          .from(bodyFormDataTable)
          .where(eq(bodyFormDataTable.id, formId))
          .limit(1)
      )?.[0];

      if (!isExist)
        return await createBodyFormData({
          id: formId,
          ...payload,
          value,
        });

      const updated = await db
        .update(bodyFormDataTable)
        .set({
          ...payload,
          value,
        })
        .where(eq(bodyFormDataTable.id, formId));
      return updated?.rowsAffected > 0;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const replaceBodyFormData: ElectronAPIBodyFormDataInterface["replaceBodyFormData"] =
  async (requestOrFolderMetaId, payload = []) => {
    try {
      const replacePayload = payload.map(formData => {
        const { id, createdAt, ...rest } = formData;
        return {
          ...rest,
          requestOrFolderMetaId:
            formData["requestOrFolderMetaId"] ?? requestOrFolderMetaId,
          value: Array.isArray(formData.value)
            ? JSON.stringify(formData.value)
            : formData.value,
        };
      });

      return await db.transaction(async tsx => {
        await tsx.delete(bodyFormDataTable).where(
          and(
            eq(bodyFormDataTable.requestOrFolderMetaId, requestOrFolderMetaId),
            /* it only remove valued value not file */
            not(
              and(
                like(bodyFormDataTable.value, "[%"), // starts with [
                like(bodyFormDataTable.value, "%]"), // ends with ]
              )!,
            ),
          ),
        );

        if (!replacePayload?.length) return true;
        await tsx.insert(bodyFormDataTable).values(replacePayload);

        return true;
      });
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const replaceFullBodyFormData: ElectronAPIBodyFormDataInterface["replaceFullBodyFormData"] =
  async (requestOrFolderMetaId, payload = []) => {
    const replacePayload = payload.map(formData => {
      const { id, createdAt, ...rest } = formData;
      return {
        ...rest,
        requestOrFolderMetaId:
          formData["requestOrFolderMetaId"] ?? requestOrFolderMetaId,
        value: Array.isArray(formData.value)
          ? JSON.stringify(formData.value)
          : formData.value,
      };
    });

    try {
      await db
        .delete(bodyFormDataTable)
        .where(
          eq(bodyFormDataTable.requestOrFolderMetaId, requestOrFolderMetaId),
        );

      if (!replacePayload?.length) return true;
      return (
        (await db.insert(bodyFormDataTable).values(replacePayload))
          ?.rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const checkAllBodyFormDataByRequestMetaId: ElectronAPIBodyFormDataInterface["checkAllBodyFormDataByRequestMetaId"] =
  async requestOrFolderMetaId => {
    try {
      requestOrFolderMetaId =
        requestOrFolderMetaId ?? (await getTabList())?.selectedTab;
      if (!requestOrFolderMetaId) throw new Error();

      const rows =
        (await db
          .select()
          .from(bodyFormDataTable)
          .where(
            eq(bodyFormDataTable.requestOrFolderMetaId, requestOrFolderMetaId),
          )) ?? [];

      const checkValue = !rows.every(row => row.isCheck);

      return (
        (
          await db
            .update(bodyFormDataTable)
            .set({
              isCheck: checkValue,
            })
            .where(
              eq(
                bodyFormDataTable.requestOrFolderMetaId,
                requestOrFolderMetaId,
              ),
            )
        )?.rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };

/* 
payload = {
  oldId: newId ---> newId means duplicatedId
}
*/
export const duplicateBodyFormData: ElectronAPIBodyFormDataInterface["duplicateBodyFormData"] =
  async payload => {
    try {
      if (!payload) throw new Error();
      const oldIds = Object.keys(payload);
      if (!oldIds.length) throw new Error();

      const existingBodyFormData = await db
        .select()
        .from(bodyFormDataTable)
        .where(inArray(bodyFormDataTable.requestOrFolderMetaId, oldIds));

      if (!existingBodyFormData.length) return true;

      /**
       * - Replacing oldId with duplicatedId
       * and only keeping url so that other things automatically generate by default
       */
      const duplicatePayload = existingBodyFormData.map(formData => {
        const { id, createdAt, ...rest } = formData;
        return {
          ...rest,
          requestOrFolderMetaId: payload[formData.requestOrFolderMetaId],
        };
      });

      return (
        (await db.insert(bodyFormDataTable).values(duplicatePayload))
          .rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };
