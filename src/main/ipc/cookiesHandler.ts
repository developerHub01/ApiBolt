import { ipcMain } from "electron";
import {
  clearCookiesByProject,
  createCookiesByProject,
  deleteCookieKeyByProject,
  deleteCookiesByProject,
  getCookiesByProject,
  getParsedCookiesByProject,
  updateCookiesByProject,
} from "@/main/db/cookiesDB.js";
import { jarManager } from "@/main/utils/cookieManager.js";
import { ElectronAPICookiesInterface } from "@shared/types/api/electron-cookies";

export const cookiesHandler = () => {
  ipcMain.handle(
    "getCookiesByProject",
    async (
      _,
      ...rest: Parameters<ElectronAPICookiesInterface["getCookiesByProject"]>
    ): ReturnType<ElectronAPICookiesInterface["getCookiesByProject"]> =>
      await getCookiesByProject(...rest),
  );
  ipcMain.handle(
    "getParsedCookiesByProject",
    async (
      _,
      ...rest: Parameters<
        ElectronAPICookiesInterface["getParsedCookiesByProject"]
      >
    ): ReturnType<ElectronAPICookiesInterface["getParsedCookiesByProject"]> =>
      await getParsedCookiesByProject(...rest),
  );
  ipcMain.handle(
    "createCookiesByProject",
    async (
      _,
      ...rest: Parameters<ElectronAPICookiesInterface["createCookiesByProject"]>
    ): ReturnType<ElectronAPICookiesInterface["createCookiesByProject"]> => {
      const response = await createCookiesByProject(...rest);
      await jarManager.loadFromDB();
      return response;
    },
  );
  ipcMain.handle(
    "updateCookiesByProject",
    async (
      _,
      ...rest: Parameters<ElectronAPICookiesInterface["updateCookiesByProject"]>
    ): ReturnType<ElectronAPICookiesInterface["updateCookiesByProject"]> => {
      const response = await updateCookiesByProject(...rest);
      await jarManager.loadFromDB();
      return response;
    },
  );
  ipcMain.handle(
    "deleteCookiesByProject",
    async (
      _,
      ...rest: Parameters<ElectronAPICookiesInterface["deleteCookiesByProject"]>
    ): ReturnType<ElectronAPICookiesInterface["deleteCookiesByProject"]> => {
      const response = await deleteCookiesByProject(...rest);
      await jarManager.loadFromDB();
      return response;
    },
  );
  ipcMain.handle(
    "deleteCookieKeyByProject",
    async (
      _,
      ...rest: Parameters<
        ElectronAPICookiesInterface["deleteCookieKeyByProject"]
      >
    ): ReturnType<ElectronAPICookiesInterface["deleteCookieKeyByProject"]> => {
      const response = await deleteCookieKeyByProject(...rest);
      await jarManager.loadFromDB();
      return response;
    },
  );
  ipcMain.handle(
    "clearCookiesByProject",
    async (
      _,
      ...rest: Parameters<ElectronAPICookiesInterface["clearCookiesByProject"]>
    ): ReturnType<ElectronAPICookiesInterface["clearCookiesByProject"]> => {
      const response = await clearCookiesByProject(...rest);
      await jarManager.loadFromDB();
      return response;
    },
  );
};
