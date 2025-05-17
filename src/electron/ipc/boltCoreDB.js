import { ipcMain } from "electron";
import {
  addBoltCore,
  addMultipleBoltCore,
  deleteBoltCore,
  duplicateBoltCore,
  getAllBoltCore,
  moveBoltCore,
  updateBoltCore,
} from "../db/boltCoreDB.js";

export const boltCoreDBHandlers = () => {
  ipcMain.handle("addBoltCore", addBoltCore);
  ipcMain.handle("addMultipleBoltCore", addMultipleBoltCore);
  ipcMain.handle("updateBoltCore", updateBoltCore);
  ipcMain.handle("duplicateBoltCore", duplicateBoltCore);
  ipcMain.handle("deleteBoltCore", deleteBoltCore);
  ipcMain.handle("moveBoltCore", moveBoltCore);
  ipcMain.handle("getAllBoltCore", getAllBoltCore);
};
