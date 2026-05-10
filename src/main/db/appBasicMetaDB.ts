import { TDoFirstStartUpWork } from "@/main/types/basic-meta-db.types";
import { eq } from "drizzle-orm";
import { db } from "@/main/db/index";
import { APP_BASIC_META_ID, appBasicMetaTable } from "@/main/db/schema";
import { MACHINE_ID } from "@/main/constant";
import { app } from "electron";
import { httpRequest } from "@/main/utils/httpWrapper";

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
  dbVersion,
}) => {
  const currentVersion = app.getVersion();
  if (dbVersion !== currentVersion) await setAppVersion(currentVersion);

  (async () => {
    if (await isAppInstallReported()) return;

    try {
      const response = await httpRequest<{
        data: undefined;
      }>({
        method: "POST",
        url: `/app-install/report`,
        data: {
          deviceId: MACHINE_ID,
          version: currentVersion,
        },
      });

      if (response.success) await inableAppInstallReported();
    } catch (error) {
      console.error(error);
    }
  })();
};
