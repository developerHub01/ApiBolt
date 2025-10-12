import { eq } from "drizzle-orm";
import { db } from "./index.js";
import {
  ACTIVE_CODE_SNIPPIT_TYPE_ID,
  activeCodeSnippitTypeTable,
} from "./schema.js";

export const getActiveCodeSnippitType = async () => {
  try {
    const languageId = (
      await db
        .select()
        .from(activeCodeSnippitTypeTable)
        .where(eq(activeCodeSnippitTypeTable.id, ACTIVE_CODE_SNIPPIT_TYPE_ID))
    )?.[0]?.languageId;
    if (languageId) return languageId;

    await createActiveCodeSnippitType();
    return null;
  } catch (error) {
    console.error(error);
  }
};

export const createActiveCodeSnippitType = async (payload = {}) => {
  const id = payload?.id ?? ACTIVE_CODE_SNIPPIT_TYPE_ID;

  try {
    const response = await db.insert(activeCodeSnippitTypeTable).values({
      id,
      ...payload,
    });
    return Boolean(response?.changes);
  } catch (error) {
    console.error(error);
  }
};

export const updateActiveCodeSnippitType = async (languageId = null) => {
  try {
    const isExist = await getActiveCodeSnippitType();

    if (!isExist) {
      return await createActiveCodeSnippitType({
        languageId,
      });
    }

    const updated = await db
      .update(activeCodeSnippitTypeTable)
      .set({
        languageId,
      })
      .where(eq(activeCodeSnippitTypeTable.id, ACTIVE_CODE_SNIPPIT_TYPE_ID));

    return Boolean(updated?.changes);
  } catch (error) {
    console.error(error);
  }
};

export const deleteActiveCodeSnippitType = async () => {
  try {
    return (
      (await db
        .delete(activeCodeSnippitTypeTable)
        .where(eq(activeCodeSnippitTypeTable.id, ACTIVE_CODE_SNIPPIT_TYPE_ID))
        ?.changes) > 0
    );
  } catch (error) {
    console.error(error);
  }
};
