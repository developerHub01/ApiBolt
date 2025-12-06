import { eq } from "drizzle-orm";
import { db } from "@/main/db";
import {
  ACTIVE_CODE_SNIPPIT_TYPE_ID,
  activeCodeSnippitTypeTable,
  DEFAULT_ACTIVE_CODE_SNIPPIT_TYPE,
} from "@/main/db/schema";
import { ElectronAPIActiveCodeSnippitTypeInterface } from "@shared/types/api/electron-active-code-snippit-type";

export const isExistActiveCodeSnippitType = async () =>
  (
    await db
      .select()
      .from(activeCodeSnippitTypeTable)
      .where(eq(activeCodeSnippitTypeTable.id, ACTIVE_CODE_SNIPPIT_TYPE_ID))
  )?.[0];

export const getActiveCodeSnippitType: ElectronAPIActiveCodeSnippitTypeInterface["getActiveCodeSnippitType"] =
  async () => {
    try {
      const result = (
        await db
          .select()
          .from(activeCodeSnippitTypeTable)
          .where(eq(activeCodeSnippitTypeTable.id, ACTIVE_CODE_SNIPPIT_TYPE_ID))
      )?.[0];
      if (result) return result.languageId;

      await createActiveCodeSnippitType();
      throw new Error();
    } catch (error) {
      console.error(error);
      return DEFAULT_ACTIVE_CODE_SNIPPIT_TYPE;
    }
  };

export const createActiveCodeSnippitType: ElectronAPIActiveCodeSnippitTypeInterface["createActiveCodeSnippitType"] =
  async languageId => {
    try {
      const id = ACTIVE_CODE_SNIPPIT_TYPE_ID;
      languageId = languageId ?? DEFAULT_ACTIVE_CODE_SNIPPIT_TYPE;
      return (
        (
          await db.insert(activeCodeSnippitTypeTable).values({
            id,
            languageId,
          })
        )?.rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const updateActiveCodeSnippitType: ElectronAPIActiveCodeSnippitTypeInterface["updateActiveCodeSnippitType"] =
  async (languageId = null) => {
    try {
      languageId = languageId ?? DEFAULT_ACTIVE_CODE_SNIPPIT_TYPE;
      return (
        (
          await db
            .insert(activeCodeSnippitTypeTable)
            .values({
              id: ACTIVE_CODE_SNIPPIT_TYPE_ID,
              languageId,
            })
            .onConflictDoUpdate({
              target: [activeCodeSnippitTypeTable.id],
              set: {
                languageId,
              },
            })
        )?.rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const deleteActiveCodeSnippitType: ElectronAPIActiveCodeSnippitTypeInterface["deleteActiveCodeSnippitType"] =
  async () => {
    try {
      return (
        (
          await db
            .delete(activeCodeSnippitTypeTable)
            .where(
              eq(activeCodeSnippitTypeTable.id, ACTIVE_CODE_SNIPPIT_TYPE_ID),
            )
        )?.rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };
