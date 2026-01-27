import { is } from "@electron-toolkit/utils";
import { BrowserWindow, shell } from "electron";
import path, { join } from "node:path";

import linuxIcon from "../../../resources/icons/png/256x256.png?asset";

export const createMainWindow = () => {
  const iconPath =
    process.platform === "linux"
      ? linuxIcon
      : process.platform === "win32"
        ? join(__dirname, "../../../resources/icons/win/icon.ico")
        : join(__dirname, "../../../resources/icons/mac/icon.icns");

  const win = new BrowserWindow({
    show: false,
    minHeight: 600,
    minWidth: 750,
    frame: false,
    titleBarStyle: "hidden",
    center: true,
    vibrancy: "under-window",
    visualEffectState: "active",
    title: "ApiBolt",
    autoHideMenuBar: true,
    icon: iconPath,

    webPreferences: {
      preload: path.join(__dirname, "../", "preload", "index.js"),
      contextIsolation: true,
      nodeIntegration: false,
      spellcheck: false,
      sandbox: true,
      webSecurity: true,
      allowRunningInsecureContent: false,
    },
  });

  if (is.dev) win.webContents.openDevTools();

  win.webContents.setWindowOpenHandler(details => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    win.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    // win.loadFile(path.join(app.getAppPath(), "src", "renderer", "index.html"));
    win.loadFile(join(__dirname, "../renderer/index.html"));
  }

  return win;
};
