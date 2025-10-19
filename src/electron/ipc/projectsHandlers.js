import { ipcMain } from "electron";
import {
  changeActiveProject,
  createProjects,
  deleteProjects,
  getActiveProject,
  getProjects,
  updateProjects,
} from "../db/projectsDB.js";
import { jarManager } from "../utils/cookieManager.js";

export const projectsHandlers = () => {
  ipcMain.handle("getProjects", async (_) => await getProjects());
  ipcMain.handle(
    "createProjects",
    async (_, ...rest) => await createProjects(...rest)
  );
  ipcMain.handle(
    "updateProjects",
    async (_, ...rest) => await updateProjects(...rest)
  );
  ipcMain.handle(
    "deleteProjects",
    async (_, ...rest) => await deleteProjects(...rest)
  );
  ipcMain.handle("changeActiveProject", async (_, ...rest) => {
    const response = await changeActiveProject(...rest);
    await jarManager.loadFromDB();
    return response;
  });
  ipcMain.handle("getActiveProject", async (_) => await getActiveProject());
};
