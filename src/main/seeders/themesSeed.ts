import { isNull } from "drizzle-orm";
import { defaultThemeList, defaultActiveThemeId } from "@/data/themes.js";
import { db } from "@/main/db/index.js";
import {
  activeThemeTable,
  GLOBAL_PROJECT_ID,
  themeTable,
} from "@/main/db/schema.js";

export const generateThemesSeed = async () => {
  try {
    const payload = defaultThemeList.map(theme => ({
      ...theme,
      palette: JSON.stringify(theme.palette),
    }));

    await db.insert(themeTable).values(payload).onConflictDoNothing();

    const haveGlobalActiveTheme = (
      await db
        .select()
        .from(activeThemeTable)
        .where(isNull(activeThemeTable.projectId))
    )?.[0]?.activeTheme;

    if (!haveGlobalActiveTheme) {
      await db
        .insert(activeThemeTable)
        .values({
          activeTheme: defaultActiveThemeId,
          projectId: GLOBAL_PROJECT_ID,
        })
        .onConflictDoNothing();
    }
  } catch (error) {
    console.error("❌ Error seeding default themes:", error);
  }
};
