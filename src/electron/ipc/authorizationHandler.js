import { ipcMain } from "electron";
import {
  getAuth,
  createAuth,
  updateAuth,
  deleteAuth,
  getInheritedAuthFromId,
  duplicateAuth,
} from "../db/authorizationDB.js";

export const authorizationHandler = () => {
  ipcMain.handle("getAuth", async (_, ...rest) => await getAuth(...rest));
  ipcMain.handle(
    "getInheritedAuthFromId",
    async (_, ...rest) => await getInheritedAuthFromId(...rest)
  );
  ipcMain.handle("createAuth", async (_, ...rest) => await createAuth(...rest));
  ipcMain.handle("updateAuth", async (_, ...rest) => await updateAuth(...rest));
  ipcMain.handle("deleteAuth", async (_, ...rest) => await deleteAuth(...rest));
  ipcMain.handle(
    "duplicateAuth",
    async (_, ...rest) => await duplicateAuth(...rest)
  );
};
