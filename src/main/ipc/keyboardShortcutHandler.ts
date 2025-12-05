import { ipcMain } from "electron";
import {
  getKeyboardShortcuts,
  getKeyboardShortcutsById,
  resetKeyboardShortcuts,
  updateKeyboardShortcuts
} from "@/main/db/keyboardShortcutDB.js";
import { ElectronAPIKeyboardShortcutInterface } from "@shared/types/api/electron-keyboard-shortcuts";

export const keyboardShortcutHandler = () => {
  ipcMain.handle(
    "getKeyboardShortcuts",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIKeyboardShortcutInterface["getKeyboardShortcuts"]
      >
    ): ReturnType<
      ElectronAPIKeyboardShortcutInterface["getKeyboardShortcuts"]
    > => await getKeyboardShortcuts(...rest)
  );
  ipcMain.handle(
    "getKeyboardShortcutsById",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIKeyboardShortcutInterface["getKeyboardShortcutsById"]
      >
    ): ReturnType<
      ElectronAPIKeyboardShortcutInterface["getKeyboardShortcutsById"]
    > => await getKeyboardShortcutsById(...rest)
  );
  ipcMain.handle(
    "updateKeyboardShortcuts",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIKeyboardShortcutInterface["updateKeyboardShortcuts"]
      >
    ): ReturnType<
      ElectronAPIKeyboardShortcutInterface["updateKeyboardShortcuts"]
    > => await updateKeyboardShortcuts(...rest)
  );
  ipcMain.handle(
    "resetKeyboardShortcuts",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIKeyboardShortcutInterface["resetKeyboardShortcuts"]
      >
    ): ReturnType<
      ElectronAPIKeyboardShortcutInterface["resetKeyboardShortcuts"]
    > => await resetKeyboardShortcuts(...rest)
  );
};
