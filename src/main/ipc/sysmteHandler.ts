import { ElectronAPIInterface } from "@shared/types/api/electron-api";
import { ipcMain } from "electron";
import { MACHINE_ID } from "@/main/constant";

export const sysmteHandler = (): void => {
  ipcMain.handle(
    "getMachineId",
    async (): ReturnType<ElectronAPIInterface["getMachineId"]> => MACHINE_ID,
  );
};
