import { isNull } from "drizzle-orm";
import { defaultThemeList } from "../../data/themes.js";
import { db } from "../db/index.js";
import {
  activeThemeTable,
  themeTable,
} from "../db/schema.js";

export const generateThemesSeed = async () => {
  try {
    const payload = defaultThemeList.map((theme) => ({
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
          activeTheme: defaultThemeList[0].id,
          projectId: null,
        })
        .onConflictDoNothing();
    }
  } catch (error) {
    console.error("❌ Error seeding default themes:", error);
  }
};
