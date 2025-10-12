import { ipcMain } from "electron";
import {
  createActiveCodeSnippitType,
  deleteActiveCodeSnippitType,
  getActiveCodeSnippitType,
  updateActiveCodeSnippitType,
} from "../db/activeCodeSnippitTypeDB";

export const activeCodeSnippitTypeHandler = () => {
  ipcMain.handle(
    "getActiveCodeSnippitType",
    async (_, ...rest) => await getActiveCodeSnippitType(...rest)
  );
  ipcMain.handle(
    "createActiveCodeSnippitType",
    async (_, ...rest) => await createActiveCodeSnippitType(...rest)
  );
  ipcMain.handle(
    "updateActiveCodeSnippitType",
    async (_, ...rest) => await updateActiveCodeSnippitType(...rest)
  );
  ipcMain.handle(
    "deleteActiveCodeSnippitType",
    async (_, ...rest) => await deleteActiveCodeSnippitType(...rest)
  );
};
