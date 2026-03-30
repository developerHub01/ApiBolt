import { eq } from "drizzle-orm";
import { db } from "@/main/db/index.js";
import { testScriptTable } from "@/main/db/schema.js";
import { getTabList } from "@/main/db/tabsDB.js";
import { ElectronAPITestScriptInterface } from "@shared/types/api/electron-test-script";

export const getTestScript = async (
  ...[requestId]: Parameters<ElectronAPITestScriptInterface["getTestScript"]>
): ReturnType<ElectronAPITestScriptInterface["getTestScript"]> => {
  if (!requestId) requestId = (await getTabList())?.selectedTab;
  if (!requestId) throw new Error();

  try {
    return (
      (
        await db
          .select()
          .from(testScriptTable)
          .where(eq(testScriptTable.requestId, requestId))
          .limit(1)
      )?.[0] ?? null
    );
  } catch (error) {
    console.error(error);
    return null;
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
        requestId,
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
        requestId,
        script,
      })
      .onConflictDoUpdate({
        target: [testScriptTable.requestId],
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
  ...[requestId]: Parameters<ElectronAPITestScriptInterface["deleteTestScript"]>
): ReturnType<ElectronAPITestScriptInterface["deleteTestScript"]> => {
  if (!requestId) requestId = (await getTabList())?.selectedTab;
  if (!requestId) throw new Error();

  try {
    return (
      (
        await db
          .delete(testScriptTable)
          .where(eq(testScriptTable.requestId, requestId))
      ).rowsAffected > 0
    );
  } catch (error) {
    console.error(error);
    return false;
  }
};
