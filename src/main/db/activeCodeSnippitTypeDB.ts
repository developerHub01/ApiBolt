import { eq } from "drizzle-orm";
import { db } from "@/main/db";
import {
  ACTIVE_CODE_SNIPPIT_TYPE_ID,
  activeCodeSnippitTypeTable
} from "@/main/db/schema";

export const isExistActiveCodeSnippitType = async () =>
  (
    await db
      .select()
      .from(activeCodeSnippitTypeTable)
      .where(eq(activeCodeSnippitTypeTable.id, ACTIVE_CODE_SNIPPIT_TYPE_ID))
  )?.[0];

export const getActiveCodeSnippitType = async () => {
  try {
    const result = (
      await db
        .select()
        .from(activeCodeSnippitTypeTable)
        .where(eq(activeCodeSnippitTypeTable.id, ACTIVE_CODE_SNIPPIT_TYPE_ID))
    )?.[0];
    if (result) return result.languageId;

    await createActiveCodeSnippitType();
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createActiveCodeSnippitType = async (payload = {}) => {
  const id = payload?.id ?? ACTIVE_CODE_SNIPPIT_TYPE_ID;

  try {
    const response = await db.insert(activeCodeSnippitTypeTable).values({
      id,
      ...payload
    });
    return Boolean(response?.rowsAffected);
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updateActiveCodeSnippitType = async (languageId = null) => {
  try {
    const isExist = await isExistActiveCodeSnippitType();
    if (!isExist) {
      return await createActiveCodeSnippitType({
        languageId
      });
    }

    const updated = await db
      .update(activeCodeSnippitTypeTable)
      .set({
        languageId
      })
      .where(eq(activeCodeSnippitTypeTable.id, ACTIVE_CODE_SNIPPIT_TYPE_ID));

    return Boolean(updated?.rowsAffected);
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteActiveCodeSnippitType = async () => {
  try {
    return (
      (await db
        .delete(activeCodeSnippitTypeTable)
        .where(eq(activeCodeSnippitTypeTable.id, ACTIVE_CODE_SNIPPIT_TYPE_ID))
        ?.rowsAffected) > 0
    );
  } catch (error) {
    console.error(error);
    return false;
    
  }
};
