import { app } from "electron";
import { createWindow } from "./utils/window.js";
import { wrapper } from "axios-cookiejar-support";
import axios from "axios";
import electronSquirrelStartup from "electron-squirrel-startup";
import { initialCookieJar } from "./utils/cookieManager.js";
import { registerCookieHandlers } from "./ipc/cookies.js";
import { registerWindowHandlers } from "./ipc/windowControls.js";
import { jsonWebTokenHandlers } from "./ipc/jsonWebToken.js";
import "./db/boltcoreDB.js";
import "./ipc/boltCoreDB.js";
import { boltCoreDBHandlers } from "./ipc/boltCoreDB.js";
import { openFoldersDBHandlers } from "./ipc/openFoldersDB.js";
import { tabsDBHandlers } from "./ipc/tabsDB.js";
import { requestOrFolderDBHandlers } from "./ipc/requestOrFolder.js";
import "./db/index.js";
import { projectsHandlers } from "./ipc/projectsHandlers.js";
import { enviromentsHandlers } from "./ipc/environmentsHandler.js";
import { authorizationHandler } from "./ipc/authorizationHandler.js";
import { requestOrFolderMetaHandler } from "./ipc/requestOrFolderMetaHandler.js";

// browser style cookies holder by domain/path
export const jar = initialCookieJar(undefined, { rejectPublicSuffixes: false });
// axios client with cookie jar support
export const client = wrapper(axios.create({ jar }));

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (electronSquirrelStartup) {
  app.quit();
}

app.whenReady().then(() => {
  let mainWindow = createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) mainWindow = createWindow();
  });

  registerCookieHandlers();
  registerWindowHandlers(mainWindow);
  jsonWebTokenHandlers();
  boltCoreDBHandlers();
  openFoldersDBHandlers();
  tabsDBHandlers();
  requestOrFolderDBHandlers();
  projectsHandlers();
  enviromentsHandlers();
  authorizationHandler();
  requestOrFolderMetaHandler();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
