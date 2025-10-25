import { keyboardBindings } from "../../data/keyboard_short_cut_list.js";
import { db } from "../db/index.js";
import { keyboardShortcutTable } from "../db/schema.js";

export const generateKeyboardBindingsSeed = async () => {
  try {
    await db
      .insert(keyboardShortcutTable)
      .values(
        keyboardBindings.map((item) => ({
          ...item,
          key: JSON.stringify(item.key),
        }))
      )
      .onConflictDoNothing();
  } catch (error) {
    console.error("❌ Error seeding keyboard bindings codes:", error);
  }
};
