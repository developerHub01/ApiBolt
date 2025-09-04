import { app, BrowserWindow } from "electron";
import path from "path";

export const createSplashWindow = () => {
  const win = new BrowserWindow({
    width: 330,
    height: 330,
    frame: false,
    transparent: true,
    resizable: false,
    titleBarStyle: "hidden",
  });

  win.loadFile(path.join(app.getAppPath(), "dist-react", "splash.html"));

  return win;
};
