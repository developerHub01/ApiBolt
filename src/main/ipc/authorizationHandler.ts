import { ipcMain } from "electron";
import {
  getAuth,
  createAuth,
  updateAuth,
  deleteAuth,
  getInheritedAuthFromId,
  duplicateAuth,
} from "@/main/db/authorizationDB.js";
import { ElectronAPIAuthorizationInterface } from "@shared/types/api/electron-authorization";

export const authorizationHandler = (): void => {
  ipcMain.handle(
    "getAuth",
    async (
      _,
      ...rest: Parameters<ElectronAPIAuthorizationInterface["getAuth"]>
    ): ReturnType<ElectronAPIAuthorizationInterface["getAuth"]> =>
      await getAuth(...rest),
  );
  ipcMain.handle(
    "getInheritedAuthFromId",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIAuthorizationInterface["getInheritedAuthFromId"]
      >
    ): ReturnType<
      ElectronAPIAuthorizationInterface["getInheritedAuthFromId"]
    > => await getInheritedAuthFromId(...rest),
  );
  ipcMain.handle(
    "createAuth",
    async (
      _,
      ...rest: Parameters<ElectronAPIAuthorizationInterface["createAuth"]>
    ): ReturnType<ElectronAPIAuthorizationInterface["createAuth"]> =>
      await createAuth(...rest),
  );
  ipcMain.handle(
    "updateAuth",
    async (
      _,
      ...rest: Parameters<ElectronAPIAuthorizationInterface["updateAuth"]>
    ): ReturnType<ElectronAPIAuthorizationInterface["updateAuth"]> =>
      await updateAuth(...rest),
  );
  ipcMain.handle(
    "deleteAuth",
    async (
      _,
      ...rest: Parameters<ElectronAPIAuthorizationInterface["deleteAuth"]>
    ): ReturnType<ElectronAPIAuthorizationInterface["deleteAuth"]> =>
      await deleteAuth(...rest),
  );
  ipcMain.handle(
    "duplicateAuth",
    async (
      _,
      ...rest: Parameters<ElectronAPIAuthorizationInterface["duplicateAuth"]>
    ): ReturnType<ElectronAPIAuthorizationInterface["duplicateAuth"]> =>
      await duplicateAuth(...rest),
  );
};
