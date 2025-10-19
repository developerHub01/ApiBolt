import { ipcMain } from "electron";
import {
  clearCookiesByProject,
  createCookiesByProject,
  deleteCookieKeyByProject,
  deleteCookiesByProject,
  getCookiesByProject,
  getParsedCookiesByProject,
  updateCookiesByProject,
} from "../db/cookiesDB.js";
import { jarManager } from "../utils/cookieManager.js";

export const cookiesHandler = () => {
  ipcMain.handle(
    "getCookiesByProject",
    async (_, ...rest) => await getCookiesByProject(...rest)
  );
  ipcMain.handle(
    "getParsedCookiesByProject",
    async (_, ...rest) => await getParsedCookiesByProject(...rest)
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
  ipcMain.handle("deleteCookieKeyByProject", async (_, ...rest) => {
    const response = await deleteCookieKeyByProject(...rest);
    await jarManager.loadFromDB();
    return response;
  });
  ipcMain.handle("clearCookiesByProject", async (_, ...rest) => {
    const response = await clearCookiesByProject(...rest);
    await jarManager.loadFromDB();
    return response;
  });
};
