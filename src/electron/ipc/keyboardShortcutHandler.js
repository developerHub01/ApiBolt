import { ipcMain } from "electron";
import {
  getKeyboardShortcuts,
  getKeyboardShortcutsById,
  resetKeyboardShortcuts,
  updateKeyboardShortcuts,
} from "../db/keyboardShortcutDB.js";

export const keyboardShortcutHandler = () => {
  ipcMain.handle(
    "getKeyboardShortcuts",
    async (_, ...rest) => await getKeyboardShortcuts(...rest)
  );
  ipcMain.handle(
    "getKeyboardShortcutsById",
    async (_, ...rest) => await getKeyboardShortcutsById(...rest)
  );
  ipcMain.handle(
    "updateKeyboardShortcuts",
    async (_, ...rest) => await updateKeyboardShortcuts(...rest)
  );
  ipcMain.handle(
    "resetKeyboardShortcuts",
    async (_, ...rest) => await resetKeyboardShortcuts(...rest)
  );
};
