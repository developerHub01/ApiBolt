import { ipcMain } from "electron";
import {
  addBoltCore,
  addMultipleBoltCore,
  deleteBoltCore,
  duplicateBoltCore,
  getAllBoltCore,
  updateBoltCore,
} from "../db/boltCoreDB.js";

export const boltCoreDBHandlers = () => {
  ipcMain.handle("addBoltCore", addBoltCore);
  ipcMain.handle("addMultipleBoltCore", addMultipleBoltCore);
  ipcMain.handle("updateBoltCore", updateBoltCore);
  ipcMain.handle("duplicateBoltCore", duplicateBoltCore);
  ipcMain.handle("deleteBoltCore", deleteBoltCore);
  ipcMain.handle("getAllBoltCore", getAllBoltCore);
};
