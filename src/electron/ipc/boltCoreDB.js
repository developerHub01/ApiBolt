import { ipcMain } from "electron";
import {
  addBoltCore,
  deleteBoltCore,
  getAllBoltCore,
  updateBoltCore,
} from "../db/boltcoreDB.js";

export const boltCoreDBHandlers = () => {
  ipcMain.handle("addBoltCore", addBoltCore);
  ipcMain.handle("updateBoltCore", updateBoltCore);
  ipcMain.handle("deleteBoltCore", deleteBoltCore);
  ipcMain.handle("getAllBoltCore", getAllBoltCore);
};
