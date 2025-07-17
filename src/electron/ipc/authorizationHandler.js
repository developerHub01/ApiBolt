import { ipcMain } from "electron";
import {
  getAuth,
  createAuth,
  updateAuth,
  deleteAuth,
} from "../db/authorizationDB.js";

export const authorizationHandler = () => {
  ipcMain.handle("getAuth", async (_, ...rest) => await getAuth(...rest));
  ipcMain.handle("createAuth", async (_, ...rest) => await createAuth(...rest));
  ipcMain.handle("updateAuth", async (_, ...rest) => await updateAuth(...rest));
  ipcMain.handle("deleteAuth", async (_, ...rest) => await deleteAuth(...rest));
};
