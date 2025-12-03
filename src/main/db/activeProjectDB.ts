import { db } from "@/main/db/index.js";
import { eq } from "drizzle-orm";
import { ACTIVE_PROJECT_ID, activeProjectTable } from "@/main/db/schema.js";

export const getActiveProject = async () => {
  try {
    return (
      await db
        .select()
        .from(activeProjectTable)
        .where(eq(activeProjectTable.id, ACTIVE_PROJECT_ID))
    )?.[0]?.activeProjectId;
  } catch (error) {
    console.error(error);
    return null;
  }
};
