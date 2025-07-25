import { app, BrowserWindow } from "electron";
import path from "path";

export const createMainWindow = () => {
  const win = new BrowserWindow({
    show: false,
    minHeight: 500,
    minWidth: 650,
    frame: false,
    fullscreen: true,
    titleBarStyle: "hidden",

    webPreferences: {
      preload: path.join(app.getAppPath(), "src", "electron", "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadFile(path.join(app.getAppPath(), "dist-react", "index.html"));

  win.webContents.openDevTools();

  return win;
};
