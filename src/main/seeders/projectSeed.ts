import { db } from "@/main/db/index.js";
import { GLOBAL_PROJECT_ID, projectTable } from "@/main/db/schema.js";

export const generateProjectSeed = async () => {
  try {
    await db
      .insert(projectTable)
      .values({
        id: GLOBAL_PROJECT_ID,
      })
      .onConflictDoNothing();
  } catch (error) {
    console.error("❌ Error seeding setting:", error);
  }
};
