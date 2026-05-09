import { TDoFirstStartUpWork } from "@/main/types/basic-meta-db.types";
import { eq } from "drizzle-orm";
import { db } from "@/main/db/index.js";
import { APP_BASIC_META_ID, appBasicMetaTable } from "@/main/db/schema.js";

export const getAppVersion = async () => {
  try {
    return (
      (
        await db
          .select()
          .from(appBasicMetaTable)
          .where(eq(appBasicMetaTable.id, APP_BASIC_META_ID))
      )?.[0]?.version ?? null
    );
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const setAppVersion = async (version: string) => {
  try {
    return (
      (
        await db
          .insert(appBasicMetaTable)
          .values({
            id: APP_BASIC_META_ID,
            version,
          })
          .onConflictDoUpdate({
            target: [appBasicMetaTable.id],
            set: {
              version,
            },
          })
      ).rowsAffected > 0
    );
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const isAppInstallReported = async () => {
  try {
    return Boolean(
      (
        await db
          .select({
            installReported: appBasicMetaTable.installReported,
          })
          .from(appBasicMetaTable)
          .where(eq(appBasicMetaTable.id, APP_BASIC_META_ID))
      )?.[0]?.installReported,
    );
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const inableAppInstallReported = async () => {
  try {
    return (
      (
        await db
          .update(appBasicMetaTable)
          .set({
            installReported: true,
          })
          .where(eq(appBasicMetaTable.id, APP_BASIC_META_ID))
      ).rowsAffected > 0
    );
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const doFirstStartUpWork: TDoFirstStartUpWork = async ({
  currentVersion,
}) => {
  await setAppVersion(currentVersion);

  // if (!(await isAppInstallReported())) await inableAppInstallReported();

  return true;
};
