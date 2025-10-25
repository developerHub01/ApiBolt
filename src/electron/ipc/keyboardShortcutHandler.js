import { ipcMain } from "electron";
import { getKeyboardShortcuts } from "../db/keyboardShortcutDB.js";

export const keyboardShortcutHandler = () => {
  ipcMain.handle(
    "getKeyboardShortcuts",
    async (_, ...rest) => await getKeyboardShortcuts(...rest)
  );
};
