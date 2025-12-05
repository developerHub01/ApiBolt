import { eq } from "drizzle-orm";
import { db } from "@/main/db/index.js";
import { httpStatusTable } from "@/main/db/schema.js";
import { ElectronAPIHttpStatusInterface } from "@shared/types/api/electron-http-status";

export const getHttpStatus: ElectronAPIHttpStatusInterface["getHttpStatus"] =
  async () => {
    try {
      const result = await db.select().from(httpStatusTable);

      return result.reduce((acc, curr) => {
        const { code, ...rest } = curr;
        acc[code] = {
          ...rest,
          editedReason: rest.editedReason ?? "",
          editedDescription: rest.editedDescription ?? ""
        };
        return acc;
      }, {});
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const getHttpStatusByCode: ElectronAPIHttpStatusInterface["getHttpStatusByCode"] =
  async (code: string) => {
    try {
      return (
        await db
          .select()
          .from(httpStatusTable)
          .where(eq(httpStatusTable.code, code))
      )?.[0];
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const updateHttpStatus: ElectronAPIHttpStatusInterface["updateHttpStatus"] =
  async payload => {
    try {
      if (!payload.code || isNaN(Number(payload.code))) throw Error();
      const code = payload.code;

      if (payload.editedReason)
        payload.editedReason = payload.editedReason?.trim();
      if (payload.editedDescription)
        payload.editedDescription = payload.editedDescription?.trim();

      const existingData = (
        await db
          .select()
          .from(httpStatusTable)
          .where(eq(httpStatusTable.code, code))
      )?.[0];

      /* setting null if exsting data and updated data are same so that it mean default data to use */
      if (existingData) {
        if (
          typeof payload.editedReason !== "undefined" &&
          (payload.editedReason === existingData.editedReason ||
            !payload.editedReason)
        )
          payload.editedReason = null;
        if (
          typeof payload.editedDescription !== "undefined" &&
          (payload.editedDescription === existingData.description ||
            !payload.editedDescription)
        )
          payload.editedDescription = null;
      }

      const updatedData = (
        await db
          .update(httpStatusTable)
          .set({ ...payload })
          .where(eq(httpStatusTable.code, code))
          .returning()
      )?.[0];

      if (!updatedData) throw Error();

      return {
        ...updatedData,
        editedReason: updatedData.editedReason ?? "",
        editedDescription: updatedData.editedDescription ?? ""
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const clearHttpStatus = async () => {
  return await db.delete(httpStatusTable);
};
