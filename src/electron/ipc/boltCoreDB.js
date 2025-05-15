import { ipcMain } from "electron";
import {
  addBoltCore,
  getAllBoltCore,
  updateBoltCore,
} from "../db/boltcoreDB.js";

export const boltCoreDBHandlers = () => {
  ipcMain.handle("addBoltCore", addBoltCore);
  ipcMain.handle("updateBoltCore", updateBoltCore);
  ipcMain.handle("getAllBoltCore", getAllBoltCore);
};
