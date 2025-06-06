import { ipcMain } from "electron";
import { createProjects, deleteProjects, getProjects } from "../db/projectsDB.js";

export const projectsHandlers = () => {
  ipcMain.handle("getProjects", async (_) => await getProjects());
  ipcMain.handle(
    "createProjects",
    async (_, ...rest) => await createProjects(...rest)
  );
  ipcMain.handle(
    "updateProjects",
    async (_, ...rest) => await getProjects(...rest)
  );
  ipcMain.handle(
    "deleteProjects",
    async (_, ...rest) => await deleteProjects(...rest)
  );
};
