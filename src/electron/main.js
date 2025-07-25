import { app } from "electron";
import { createMainWindow } from "./utils/mainWindow.js";
import { createSplashWindow } from "./utils/splashWindow.js";
import { wrapper } from "axios-cookiejar-support";
import axios from "axios";
import electronSquirrelStartup from "electron-squirrel-startup";
import { initialCookieJar } from "./utils/cookieManager.js";
import { registerCookieHandlers } from "./ipc/cookies.js";
import { registerWindowHandlers } from "./ipc/windowControls.js";
import { jsonWebTokenHandlers } from "./ipc/jsonWebToken.js";
import "./db/index.js";
import { projectsHandlers } from "./ipc/projectsHandlers.js";
import { enviromentsHandlers } from "./ipc/environmentsHandler.js";
import { authorizationHandler } from "./ipc/authorizationHandler.js";
import { requestOrFolderMetaHandler } from "./ipc/requestOrFolderMetaHandler.js";
import { tabsHandler } from "./ipc/tabsHandler.js";
import { folderHandlers } from "./ipc/folderHandlers.js";
import { settingsHandlers } from "./ipc/settingsHandlers.js";

// browser style cookies holder by domain/path
export const jar = initialCookieJar(undefined, { rejectPublicSuffixes: false });
// axios client with cookie jar support
export const client = wrapper(axios.create({ jar }));

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (electronSquirrelStartup) {
  app.quit();
}

let splashWindow = null;
let mainWindow = null;

app.whenReady().then(() => {
  splashWindow = createSplashWindow();
  mainWindow = createMainWindow();

  const splashMinDuration = 5000; // 5 sec minimum splash
  const splashShownAt = Date.now();

  mainWindow.once("ready-to-show", () => {
    const elapsed = Date.now() - splashShownAt;
    const remaining = splashMinDuration - elapsed;

    setTimeout(
      () => {
        splashWindow?.close();
        splashWindow = null;
        mainWindow?.show();
        mainWindow.maximize();
      },
      remaining > 0 ? remaining : 0
    );
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0)
      mainWindow = createMainWindow();
  });

  registerCookieHandlers();
  registerWindowHandlers(mainWindow);
  jsonWebTokenHandlers();
  projectsHandlers();
  enviromentsHandlers();
  authorizationHandler();
  requestOrFolderMetaHandler();
  tabsHandler();
  settingsHandlers();
  folderHandlers();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
