import { app, BrowserWindow } from "electron";
import path from "path";

export const createMainWindow = () => {
  const win = new BrowserWindow({
    show: false,
    minHeight: 600,
    minWidth: 750,
    frame: false,
    titleBarStyle: "hidden",

    webPreferences: {
      preload: path.join(app.getAppPath(), "src", "electron", "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      spellcheck: false,
    },
  });

  win.loadFile(path.join(app.getAppPath(), "dist-react", "index.html"));

  win.webContents.openDevTools();

  return win;
};
