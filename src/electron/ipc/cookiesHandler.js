import { ipcMain } from "electron";
import {
  createCookiesByProject,
  deleteCookiesByProject,
  getCookiesByProject,
  updateCookiesByProject,
} from "../db/cookiesDB.js";

export const cookiesHandler = () => {
  ipcMain.handle(
    "getCookiesByProject",
    async (_, ...rest) => await getCookiesByProject(...rest)
  );
  ipcMain.handle(
    "createCookiesByProject",
    async (_, ...rest) => await createCookiesByProject(...rest)
  );
  ipcMain.handle(
    "updateCookiesByProject",
    async (_, ...rest) => await updateCookiesByProject(...rest)
  );
  ipcMain.handle(
    "deleteCookiesByProject",
    async (_, ...rest) => await deleteCookiesByProject(...rest)
  );
};
