import { app, ipcMain } from "electron";
import { ElectronAPIAppInfoInterface } from "@shared/types/api/electron-app-info";
import { join } from "node:path";
import { readFile } from "node:fs/promises";
import { AppInfoInterface } from "@shared/types/app-info.types";

export const appInfoHandlers = (): void => {
  ipcMain.handle(
    "getAppInfo",
    async (_): ReturnType<ElectronAPIAppInfoInterface["getAppInfo"]> => {
      const pkgPath = join(app.getAppPath(), "package.json");
      const pkg = JSON.parse(await readFile(pkgPath, "utf-8")) as {
        name: string;
        version: string;
        description: string;
        appInfo: Omit<AppInfoInterface, "version" | "description">;
      };

      return {
        version: pkg.version,
        description: pkg.description,
        ...pkg.appInfo,
      };
    },
  );
};
