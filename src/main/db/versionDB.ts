import { eq } from "drizzle-orm";
import { db } from "@/main/db/index.js";
import { versionTable } from "@/main/db/schema.js";

export const getAppVersion = async () => {
  try {
    return (
      await db
        .select()
        .from(versionTable)
        .where(eq(versionTable.key, "version"))
    )?.[0]?.value;
  } catch (error) {
    // console.error(error);
    return null;
  }
};

export const setAppVersion = async (version: string) => {
  try {
    return (
      (
        await db
          .insert(versionTable)
          .values({
            key: "version",
            value: version,
          })
          .onConflictDoUpdate({
            target: [versionTable.key],
            set: {
              value: version,
            },
          })
      ).rowsAffected > 0
    );
  } catch (error) {
    console.error(error);
    return false;
  }
};
