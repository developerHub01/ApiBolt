import { is } from "@electron-toolkit/utils";
import { BrowserWindow, shell } from "electron";
import path, { join } from "path";

export const createSplashWindow = () => {
  const win = new BrowserWindow({
    width: 330,
    height: 330,
    frame: false,
    transparent: true,
    resizable: false,
    titleBarStyle: "hidden",
    title: "splash",
    vibrancy: "under-window",
    visualEffectState: "active",

    webPreferences: {
      // preload: path.join(app.getAppPath(), "src", "preload", "index.js"),
      preload: path.join(__dirname, "../", "preload", "index.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      spellcheck: false
    }
  });

  win.webContents.setWindowOpenHandler(details => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    win.loadURL(`${process.env["ELECTRON_RENDERER_URL"]}/splash.html`);
  } else {
    // win.loadFile(path.join(app.getAppPath(), "src", "renderer", "splash.html"));
    win.loadFile(join(__dirname, "../../renderer/splash.html"));
  }

  return win;
};
