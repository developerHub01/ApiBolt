import { ElectronAPIInterface } from "@shared/types/api/electron-api";
import { ipcMain } from "electron";
import { machineIdSync } from "node-machine-id";

const machineId = machineIdSync();

export const sysmteHandler = (): void => {
  ipcMain.handle(
    "getMachineId",
    async (): ReturnType<ElectronAPIInterface["getMachineId"]> => machineId,
  );
};
