import { app, BrowserWindow } from "electron";
import path from "path";

export const createWindow = () => {
  const win = new BrowserWindow({
    webPreferences: {
      preload: path.join(app.getAppPath(), "src", "electron", "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  win.maximize();

  win.loadFile(path.join(app.getAppPath(), "dist-react", "index.html"));
};
