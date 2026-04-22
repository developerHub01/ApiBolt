import { eq, inArray } from "drizzle-orm";
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

/* 
payload = {
  oldId: newId ---> newId means duplicatedId
}
*/
export const duplicateTestScript: ElectronAPITestScriptInterface["duplicateTestScript"] =
  async payload => {
    try {
      if (!payload) throw new Error();
      const oldIds = Object.keys(payload);
      if (!oldIds.length) throw new Error();

      const existingBodyRawData = await db
        .select()
        .from(testScriptTable)
        .where(inArray(testScriptTable.requestId, oldIds));

      if (!existingBodyRawData.length) return true;

      /**
       * - Replacing oldId with duplicatedId
       * and only keeping url so that other things automatically generate by default
       */
      const duplicatePayload = existingBodyRawData.map(raw => {
        const { requestId, ...rest } = raw;
        return {
          ...rest,
          requestId: payload[raw.requestId],
        };
      });

      return (
        (await db.insert(testScriptTable).values(duplicatePayload))
          .rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };
