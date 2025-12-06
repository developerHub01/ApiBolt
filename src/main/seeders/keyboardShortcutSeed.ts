import { isNull } from "drizzle-orm";
import { keyboardBindings } from "@/data/keyboard_short_cut_list.js";
import { db } from "@/main/db/index.js";
import { keyboardShortcutTable } from "@/main/db/schema.js";

export const generateKeyboardBindingsSeed = async () => {
  try {
    /* first selecting all global ids */
    const existingGlobalKeybindingIds = (
      (await db
        .select({
          id: keyboardShortcutTable.id,
        })
        .from(keyboardShortcutTable)
        .where(isNull(keyboardShortcutTable.projectId))) ?? []
    ).map(item => item.id);

    /* making exsting ids set */
    const existingIdSet = new Set(existingGlobalKeybindingIds);

    /* filtering out existing and keep remaining with adjusted fileds */
    const payload = Object.entries(keyboardBindings)
      .filter(([id]) => !existingIdSet.has(id))
      .map(([id, value]) => ({
        id,
        ...value,
        key: JSON.stringify(value.key),
      }));
    /* nothing to update then exit */
    if (!payload.length) return;

    /* insert not existing rows for global keybaord binding */
    await db
      .insert(keyboardShortcutTable)
      .values(payload)
      .onConflictDoNothing();
  } catch (error) {
    console.error("❌ Error seeding keyboard bindings codes:", error);
  }
};
