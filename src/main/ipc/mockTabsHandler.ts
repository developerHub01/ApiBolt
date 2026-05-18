import { ipcMain } from "electron";
import { ElectronAPIMockTabsInterface } from "@shared/types/api/electron-mock-tabs";
import {
  deleteAllMockTabList,
  deleteMockTabListByProjectId,
  getMockTabList,
  updateMockTabList,
} from "@/main/db/mockTabsDB";

export const mockTabsHandler = (): void => {
  ipcMain.handle(
    "getMockTabList",
    async (
      _,
      ...rest: Parameters<ElectronAPIMockTabsInterface["getMockTabList"]>
    ): ReturnType<ElectronAPIMockTabsInterface["getMockTabList"]> =>
      await getMockTabList(...rest),
  );
  ipcMain.handle(
    "updateMockTabList",
    async (
      _,
      ...rest: Parameters<ElectronAPIMockTabsInterface["updateMockTabList"]>
    ): ReturnType<ElectronAPIMockTabsInterface["updateMockTabList"]> =>
      await updateMockTabList(...rest),
  );
  ipcMain.handle(
    "deleteAllMockTabList",
    async (
      _,
      ...rest: Parameters<ElectronAPIMockTabsInterface["deleteAllMockTabList"]>
    ): ReturnType<ElectronAPIMockTabsInterface["deleteAllMockTabList"]> =>
      await deleteAllMockTabList(...rest),
  );
  ipcMain.handle(
    "deleteMockTabListByProjectId",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIMockTabsInterface["deleteMockTabListByProjectId"]
      >
    ): ReturnType<
      ElectronAPIMockTabsInterface["deleteMockTabListByProjectId"]
    > => await deleteMockTabListByProjectId(...rest),
  );
};
