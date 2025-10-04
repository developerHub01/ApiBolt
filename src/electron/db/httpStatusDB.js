import { eq } from "drizzle-orm";
import { db } from "./index.js";
import { httpStatusTable } from "./schema.js";

export const getHttpStatus = async () => {
  try {
    const result = await db.select().from(httpStatusTable);

    return result.reduce((acc, curr) => {
      const { code, ...rest } = curr;
      acc[code] = {
        ...rest,
        editedReason: rest.editedReason ?? "",
        editedDescription: rest.editedDescription ?? "",
      };
      return acc;
    }, {});
  } catch (error) {
    console.error(error);
  }
};

export const getHttpStatusByCode = async (code) => {
  try {
    return (
      await db
        .select()
        .from(httpStatusTable)
        .where(eq(httpStatusTable.code, code))
    )?.[0];
  } catch (error) {
    console.error(error);
  }
};

export const updateHttpStatus = async (payload = {}) => {
  try {
    if (!payload.code || isNaN(Number(payload.code))) return false;

    const code = payload.code;

    delete payload.code;
    delete payload.reason;
    delete payload.description;

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
        (payload.editedReason === existingData.payload || !payload.editedReason)
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

    if (!updatedData) return null;

    return {
      ...updatedData,
      editedReason: updatedData.editedReason ?? "",
      editedDescription: updatedData.editedDescription ?? "",
    };
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const clearHttpStatus = async () => {
  return await db.delete(httpStatusTable);
};
