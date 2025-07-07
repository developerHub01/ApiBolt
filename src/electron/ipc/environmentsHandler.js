import { ipcMain } from "electron";
import {
  getAllEnvironments,
  getEnvironments,
  createEnvironments,
  updateEnvironments,
  deleteAllEnvironments,
  deleteEnvironments,
} from "../db/environmentsDB.js";

export const enviromentsHandlers = () => {
  ipcMain.handle(
    "getAllEnvironments",
    async (_, ...rest) => await getAllEnvironments(...rest)
  );
  ipcMain.handle(
    "getEnvironments",
    async (_, ...rest) => await getEnvironments(...rest)
  );
  ipcMain.handle(
    "createEnvironments",
    async (_, ...rest) => await createEnvironments(...rest)
  );
  ipcMain.handle(
    "updateEnvironments",
    async (_, ...rest) => await updateEnvironments(...rest)
  );
  ipcMain.handle(
    "deleteAllEnvironments",
    async (_, ...rest) => await deleteAllEnvironments(...rest)
  );
  ipcMain.handle(
    "deleteEnvironments",
    async (_, ...rest) => await deleteEnvironments(...rest)
  );
};
