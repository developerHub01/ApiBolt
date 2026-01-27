import { is } from "@electron-toolkit/utils";
import { BrowserWindow, shell } from "electron";
import path, { join } from "node:path";

import linuxIcon from "../../../resources/icons/png/256x256.png?asset";

export const createLocalPasswordWindow = () => {
  const iconPath =
    process.platform === "linux"
      ? linuxIcon
      : process.platform === "win32"
        ? join(__dirname, "../../../resources/icons/win/icon.ico")
        : join(__dirname, "../../../resources/icons/mac/icon.icns");

  const win = new BrowserWindow({
    show: false,
    width: 400,
    height: 480,
    frame: false,
    transparent: true,
    resizable: false,
    titleBarStyle: "hidden",
    title: "local-password",
    vibrancy: "under-window",
    visualEffectState: "active",
    alwaysOnTop: true,
    icon: iconPath,

    webPreferences: {
      // preload: path.join(app.getAppPath(), "src", "preload", "index.js"),
      preload: path.join(__dirname, "../", "preload", "index.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      spellcheck: false,
      webSecurity: true,
      allowRunningInsecureContent: false,
    },
  });

  // win.webContents.openDevTools();

  win.webContents.setWindowOpenHandler(details => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    win.loadURL(`${process.env["ELECTRON_RENDERER_URL"]}/local-password.html`);
  } else {
    // win.loadFile(path.join(app.getAppPath(), "src", "renderer", "local-password.html"));
    win.loadFile(join(__dirname, "../renderer/local-password.html"));
  }

  return win;
};
