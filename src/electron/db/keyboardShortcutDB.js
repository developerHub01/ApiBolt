import { eq, isNull } from "drizzle-orm";
import { db } from "./index.js";
import { keyboardShortcutTable } from "./schema.js";
import { getActiveProject } from "./projectsDB.js";

/* id === projectId */
export const getKeyboardShortcuts = async () => {
  const activeProjectId = await getActiveProject();
  try {
    let globalShortCuts = await db
      .select()
      .from(keyboardShortcutTable)
      .where(isNull(keyboardShortcutTable.projectId));

    let localShortCuts = activeProjectId
      ? await db
          .select()
          .from(keyboardShortcutTable)
          .where(eq(keyboardShortcutTable.projectId, activeProjectId))
      : [];

    globalShortCuts = (globalShortCuts ?? []).reduce((acc, curr) => {
      acc[curr.id] = {
        ...curr,
        key: curr.key ? JSON.parse(curr.key) : curr.key,
      };
      return acc;
    }, {});

    localShortCuts = (localShortCuts ?? []).reduce((acc, curr) => {
      acc[curr.id] = {
        ...curr,
        key: curr.key ? JSON.parse(curr.key) : curr.key,
      };
      return acc;
    }, {});

    return {
      global: globalShortCuts,
      local: localShortCuts,
    };
  } catch (error) {
    console.error(error);
  }
};
