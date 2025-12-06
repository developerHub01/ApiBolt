import { ipcMain } from "electron";
import { fetchApi } from "@/main/utils/api.js";
import { jarManager } from "@/main/utils/cookieManager.js";
import { ElectronAPIInterface } from "@shared/types/api/electron-api";

export const registerCookieHandlers = () => {
  ipcMain.handle(
    "fetchApi",
    async (
      _,
      ...rest: Parameters<ElectronAPIInterface["fetchApi"]>
    ): ReturnType<ElectronAPIInterface["fetchApi"]> => await fetchApi(...rest),
  );
  ipcMain.handle(
    "getAllCookies",
    async (): ReturnType<ElectronAPIInterface["getAllCookies"]> =>
      await jarManager.getCookiesAll(),
  );
  ipcMain.handle(
    "getCookieByDomain",
    async (
      _,
      ...[url]: Parameters<ElectronAPIInterface["getCookieByDomain"]>
    ): ReturnType<ElectronAPIInterface["getCookieByDomain"]> => {
      try {
        const normalizedUrl = new URL(url).origin;
        return await jarManager.getCookiesByDomain(normalizedUrl);
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  );
  ipcMain.handle(
    "getCookieStringByDomain",
    async (
      _,
      ...[url]: Parameters<ElectronAPIInterface["getCookieStringByDomain"]>
    ): ReturnType<ElectronAPIInterface["getCookieStringByDomain"]> => {
      try {
        const normalizedUrl = new URL(url).origin;
        return (
          (await jarManager.getCookiesStringByDomain(normalizedUrl)) ?? null
        );
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  );
};
