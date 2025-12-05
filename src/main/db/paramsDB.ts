import { eq, inArray } from "drizzle-orm";
import { db } from "@/main/db/index.js";
import { paramsTable } from "@/main/db/schema.js";
import { getTabList } from "@/main/db/tabsDB.js";
import { ElectronAPIParamsInterface } from "@shared/types/api/electron-params";

/* id === requestOrFolderMetaId */
export const getParams: ElectronAPIParamsInterface["getParams"] = async id => {
  try {
    id = id ?? (await getTabList())?.selectedTab;
    if (!id) throw new Error();

    const result =
      (await db
        .select()
        .from(paramsTable)
        .where(eq(paramsTable.requestOrFolderMetaId, id))) ?? [];

    return result;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const deleteParams: ElectronAPIParamsInterface["deleteParams"] =
  async paramId => {
    try {
      return (
        (await db.delete(paramsTable).where(eq(paramsTable.id, paramId)))
          ?.rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const deleteAllParams = async () => {
  try {
    return (await db.delete(paramsTable))?.rowsAffected > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
};

/* id === requestOrFolderMetaId */
export const deleteParamsByRequestMetaId: ElectronAPIParamsInterface["deleteParamsByRequestMetaId"] =
  async requestOrFolderMetaId => {
    try {
      requestOrFolderMetaId =
        requestOrFolderMetaId ?? (await getTabList())?.selectedTab;
      if (!requestOrFolderMetaId) throw new Error();

      return (
        (
          await db
            .delete(paramsTable)
            .where(eq(paramsTable.requestOrFolderMetaId, requestOrFolderMetaId))
        ).rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const createParams: ElectronAPIParamsInterface["createParams"] =
  async payload => {
    try {
      const requestOrFolderMetaId =
        payload.requestOrFolderMetaId ?? (await getTabList())?.selectedTab;
      if (!requestOrFolderMetaId) throw new Error();

      if (typeof payload === "object" && !Object.keys(payload).length)
        return true;

      const result = await db.insert(paramsTable).values({
        ...payload,
        requestOrFolderMetaId
      });
      return result.rowsAffected > 0;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const updateParams: ElectronAPIParamsInterface["updateParams"] = async (
  paramId,
  payload
) => {
  try {
    if (!payload) return false;

    const isExist = (
      await db.select().from(paramsTable).where(eq(paramsTable.id, paramId))
    )?.[0];

    if (!isExist)
      await createParams({
        id: paramId
      });

    if (typeof payload === "object" && !Object.keys(payload).length)
      return true;

    return (
      (
        await db
          .update(paramsTable)
          .set({
            ...payload,
            requestOrFolderMetaId: payload.requestOrFolderMetaId ?? undefined
          })
          .where(eq(paramsTable.id, paramId))
      )?.rowsAffected > 0
    );
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const replaceParams: ElectronAPIParamsInterface["replaceParams"] =
  async (requestOrFolderMetaId, payload) => {
    try {
      const replacePayload = payload?.map(param => {
        const { id, ...rest } = param;
        return {
          ...rest,
          requestOrFolderMetaId:
            param["requestOrFolderMetaId"] ?? requestOrFolderMetaId,
          value: Array.isArray(param.value)
            ? JSON.stringify(param.value)
            : param.value
        };
      });
      return await db.transaction(async tsx => {
        await tsx
          .delete(paramsTable)
          .where(eq(paramsTable.requestOrFolderMetaId, requestOrFolderMetaId));

        if (replacePayload && !Object.keys(replacePayload).length) return true;

        if (!replacePayload?.length) return true;
        await tsx.insert(paramsTable).values(replacePayload);

        return true;
      });
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const checkAllParamsByRequestMetaId: ElectronAPIParamsInterface["checkAllParamsByRequestMetaId"] =
  async requestOrFolderMetaId => {
    try {
      requestOrFolderMetaId =
        requestOrFolderMetaId ?? (await getTabList())?.selectedTab;
      if (!requestOrFolderMetaId) throw new Error();

      const rows =
        (await db
          .select()
          .from(paramsTable)
          .where(
            eq(paramsTable.requestOrFolderMetaId, requestOrFolderMetaId)
          )) ?? [];
      if (rows.length === 0) return false;

      const checkValue = !rows.every(row => row.isCheck);

      return (
        (
          await db
            .update(paramsTable)
            .set({
              isCheck: checkValue
            })
            .where(eq(paramsTable.requestOrFolderMetaId, requestOrFolderMetaId))
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
export const duplicateParams: ElectronAPIParamsInterface["duplicateParams"] =
  async payload => {
    try {
      if (!payload) throw new Error();
      const oldIds = Object.keys(payload);
      if (!oldIds.length) throw new Error();

      const existingParamsData = await db
        .select()
        .from(paramsTable)
        .where(inArray(paramsTable.requestOrFolderMetaId, oldIds));

      if (!existingParamsData.length) return true;

      /**
       * - Replacing oldId with duplicatedId
       * and only keeping url so that other things automatically generate by default
       */
      const duplicatePayload = existingParamsData.map(param => {
        const { id, createdAt, ...rest } = param;
        return {
          ...rest,
          requestOrFolderMetaId: payload[param.requestOrFolderMetaId]
        };
      });

      const result = await db.insert(paramsTable).values(duplicatePayload);

      return result.rowsAffected > 0;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
