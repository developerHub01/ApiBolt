import { ipcMain } from "electron";
import {
  createHistory,
  deleteHistoryById,
  deleteHistoryByRequestId,
  getHistoryById,
  getHistoryByRequestId,
} from "@/main/db/historyDB";
import { ElectronAPIHistoryInterface } from "@shared/types/api/electron-history";

export const historyHandler = (): void => {
  ipcMain.handle(
    "getHistoryById",
    async (
      _,
      ...rest: Parameters<ElectronAPIHistoryInterface["getHistoryById"]>
    ): ReturnType<ElectronAPIHistoryInterface["getHistoryById"]> =>
      await getHistoryById(...rest),
  );
  ipcMain.handle(
    "getHistoryByRequestId",
    async (
      _,
      ...rest: Parameters<ElectronAPIHistoryInterface["getHistoryByRequestId"]>
    ): ReturnType<ElectronAPIHistoryInterface["getHistoryByRequestId"]> =>
      await getHistoryByRequestId(...rest),
  );
  ipcMain.handle(
    "createHistory",
    async (
      _,
      ...rest: Parameters<ElectronAPIHistoryInterface["createHistory"]>
    ): ReturnType<ElectronAPIHistoryInterface["createHistory"]> =>
      await createHistory(...rest),
  );
  ipcMain.handle(
    "deleteHistoryById",
    async (
      _,
      ...rest: Parameters<ElectronAPIHistoryInterface["deleteHistoryById"]>
    ): ReturnType<ElectronAPIHistoryInterface["deleteHistoryById"]> =>
      await deleteHistoryById(...rest),
  );
  ipcMain.handle(
    "deleteHistoryByRequestId",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIHistoryInterface["deleteHistoryByRequestId"]
      >
    ): ReturnType<ElectronAPIHistoryInterface["deleteHistoryByRequestId"]> =>
      await deleteHistoryByRequestId(...rest),
  );
};
