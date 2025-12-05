import { ipcMain } from "electron";
import {
  createActiveCodeSnippitType,
  deleteActiveCodeSnippitType,
  getActiveCodeSnippitType,
  updateActiveCodeSnippitType
} from "@/main/db/activeCodeSnippitTypeDB.js";
import { ElectronAPIActiveCodeSnippitTypeInterface } from "@shared/types/api/electron-active-code-snippit-type.js";

export const activeCodeSnippitTypeHandler = () => {
  ipcMain.handle(
    "getActiveCodeSnippitType",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIActiveCodeSnippitTypeInterface["getActiveCodeSnippitType"]
      >
    ): ReturnType<
      ElectronAPIActiveCodeSnippitTypeInterface["getActiveCodeSnippitType"]
    > => await getActiveCodeSnippitType(...rest)
  );
  ipcMain.handle(
    "createActiveCodeSnippitType",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIActiveCodeSnippitTypeInterface["createActiveCodeSnippitType"]
      >
    ): ReturnType<
      ElectronAPIActiveCodeSnippitTypeInterface["createActiveCodeSnippitType"]
    > => await createActiveCodeSnippitType(...rest)
  );
  ipcMain.handle(
    "updateActiveCodeSnippitType",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIActiveCodeSnippitTypeInterface["updateActiveCodeSnippitType"]
      >
    ): ReturnType<
      ElectronAPIActiveCodeSnippitTypeInterface["updateActiveCodeSnippitType"]
    > => await updateActiveCodeSnippitType(...rest)
  );
  ipcMain.handle(
    "deleteActiveCodeSnippitType",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIActiveCodeSnippitTypeInterface["deleteActiveCodeSnippitType"]
      >
    ): ReturnType<
      ElectronAPIActiveCodeSnippitTypeInterface["deleteActiveCodeSnippitType"]
    > => await deleteActiveCodeSnippitType(...rest)
  );
};
