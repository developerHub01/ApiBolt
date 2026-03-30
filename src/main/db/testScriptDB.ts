import { eq } from "drizzle-orm";
import { db } from "@/main/db/index.js";
import { testScriptTable } from "@/main/db/schema.js";
import { getTabList } from "@/main/db/tabsDB.js";
import { ElectronAPITestScriptInterface } from "@shared/types/api/electron-test-script";

export const getTestScript = async (
  ...[requestOrFolderMetaId]: Parameters<
    ElectronAPITestScriptInterface["getTestScript"]
  >
): ReturnType<ElectronAPITestScriptInterface["getTestScript"]> => {
  if (!requestOrFolderMetaId)
    requestOrFolderMetaId = (await getTabList())?.selectedTab;
  if (!requestOrFolderMetaId) throw new Error();

  try {
    return (
      (
        await db
          .select()
          .from(testScriptTable)
          .where(
            eq(testScriptTable.requestOrFolderMetaId, requestOrFolderMetaId),
          )
          .limit(1)
      )?.[0]?.script ?? ""
    );
  } catch (error) {
    console.error(error);
    return "";
  }
};

export const createTestScript = async (
  ...[{ requestId, script }]: Parameters<
    ElectronAPITestScriptInterface["createTestScript"]
  >
): ReturnType<ElectronAPITestScriptInterface["createTestScript"]> => {
  if (!requestId) requestId = (await getTabList())?.selectedTab;
  if (!requestId) throw new Error();

  try {
    await db
      .insert(testScriptTable)
      .values({
        requestOrFolderMetaId: requestId,
        script,
      })
      .onConflictDoNothing();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updateTestScript = async (
  ...[{ requestId, script }]: Parameters<
    ElectronAPITestScriptInterface["updateTestScript"]
  >
): ReturnType<ElectronAPITestScriptInterface["updateTestScript"]> => {
  if (!requestId) requestId = (await getTabList())?.selectedTab;
  if (!requestId) throw new Error();

  try {
    await db
      .insert(testScriptTable)
      .values({
        requestOrFolderMetaId: requestId,
        script,
      })
      .onConflictDoUpdate({
        target: [testScriptTable.requestOrFolderMetaId],
        set: {
          script,
        },
      });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteTestScript = async (
  ...[requestOrFolderMetaId]: Parameters<
    ElectronAPITestScriptInterface["deleteTestScript"]
  >
): ReturnType<ElectronAPITestScriptInterface["deleteTestScript"]> => {
  if (!requestOrFolderMetaId)
    requestOrFolderMetaId = (await getTabList())?.selectedTab;
  if (!requestOrFolderMetaId) throw new Error();

  try {
    return (
      (
        await db
          .delete(testScriptTable)
          .where(
            eq(testScriptTable.requestOrFolderMetaId, requestOrFolderMetaId),
          )
      ).rowsAffected > 0
    );
  } catch (error) {
    console.error(error);
    return false;
  }
};
