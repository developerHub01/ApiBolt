import { ipcMain } from "electron";
import { addBoltCore, getAllBoltCore } from "../db/boltcoreDB.js";

export const boltCoreDBHandlers = () => {
  ipcMain.handle("addBoltCore", addBoltCore);
  ipcMain.handle("getAllBoltCore", getAllBoltCore);
};
