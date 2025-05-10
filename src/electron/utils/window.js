import { app, BrowserWindow } from "electron";
import path from "path";

export const createWindow = () => {
  const win = new BrowserWindow({
    minHeight: 500,
    minWidth: 600,

    titleBarStyle: "hidden",
    // expose window controls in Windows/Linux
    ...(process.platform !== "darwin"
      ? {
          titleBarOverlay: "hidden",
        }
      : {}),

    webPreferences: {
      preload: path.join(app.getAppPath(), "src", "electron", "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  win.maximize();

  win.loadFile(path.join(app.getAppPath(), "dist-react", "index.html"));

  // win.webContents.openDevTools();

  return win;
};
