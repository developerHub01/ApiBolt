import { keyboardBindings } from "../../data/keyboard_short_cut_list.js";
import { db } from "../db/index.js";
import { keyboardShortcutTable } from "../db/schema.js";

export const generateKeyboardBindingsSeed = async () => {
  const payload = Object.entries(keyboardBindings).map(([id, value]) => ({
    id,
    ...value,
    key: JSON.stringify(value.key),
  }));

  try {
    await db
      .insert(keyboardShortcutTable)
      .values(payload)
      .onConflictDoNothing();
  } catch (error) {
    console.error("❌ Error seeding keyboard bindings codes:", error);
  }
};
