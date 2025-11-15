import { app, shell } from "electron";
import { createMainWindow } from "./utils/mainWindow.js";
import { createSplashWindow } from "./utils/splashWindow.js";
import { wrapper } from "axios-cookiejar-support";
import axios from "axios";
import electronSquirrelStartup from "electron-squirrel-startup";
import { jarManager } from "./utils/cookieManager.js";
import { registerCookieHandlers } from "./ipc/cookies.js";
import { windowHandler } from "./ipc/windowHandler.js";
import { jsonWebTokenHandlers } from "./ipc/jsonWebToken.js";
import "./db/index.js";
import { projectsHandlers } from "./ipc/projectsHandlers.js";
import { enviromentsHandlers } from "./ipc/environmentsHandler.js";
import { authorizationHandler } from "./ipc/authorizationHandler.js";
import { requestOrFolderMetaHandler } from "./ipc/requestOrFolderMetaHandler.js";
import { tabsHandler } from "./ipc/tabsHandler.js";
import { folderHandlers } from "./ipc/folderHandlers.js";
import { handleZoomLevel, settingsHandlers } from "./ipc/settingsHandlers.js";
import { paramsHandlers } from "./ipc/paramsHandlers.js";
import { headersHandlers } from "./ipc/headersHandlers.js";
import { hiddenHeadersCheckHandler } from "./ipc/hiddenHeadersCheckHandler.js";
import { bodyRawHandler } from "./ipc/bodyRawHandler.js";
import { bodyBinaryHandler } from "./ipc/bodyBinaryHandler.js";
import { requestMetaTabHandler } from "./ipc/requestMetaTabHandler.js";
import { bodyXWWWFormUrlencodedHandlers } from "./ipc/bodyXWWWFormUrlencodedHandlers.js";
import { bodyFormDataHandlers } from "./ipc/bodyFormDataHandlers.js";
import { metaShowColumnHandlers } from "./ipc/metaShowColumnHandlers.js";
import { apiUrlHandler } from "./ipc/apiUrlHandler.js";
import { showHiddenMetaDataHandler } from "./ipc/showHiddenMetaDataHandler.js";
import { generateHttpStatusSeed } from "./seeders/httpStatusSeed.js";
import { httpStatusHandler } from "./ipc/httpStatusHandler.js";
import { requestHandler } from "./ipc/requestHandler.js";
import { fileSystemHandler } from "./ipc/fileSystemHandler.js";
import { activeSidebarTabHandler } from "./ipc/activeSidebarTabHandler.js";
import { activeCodeSnippitTypeHandler } from "./ipc/activeCodeSnippitTypeHandler.js";
import { cookiesHandler } from "./ipc/cookiesHandler.js";
import { generateKeyboardBindingsSeed } from "./seeders/keyboardShortcutSeed.js";
import { keyboardShortcutHandler } from "./ipc/keyboardShortcutHandler.js";
import { historyHandler } from "./ipc/historyHandler.js";
import { generateThemesSeed } from "./seeders/themesSeed.js";
import { themeHandler } from "./ipc/themeHandler.js";
import { activeThemeHandler } from "./ipc/activeThemeHandler.js";
import { handleExternalUrl } from "./utils/externalUrl.js";

export const userDataDir = app.getPath("userData");

// browser style cookies holder by domain/path
export const jar = await jarManager.init();
// axios client with cookie jar support
export const client = wrapper(axios.create({ jar }));

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (electronSquirrelStartup) {
  app.quit();
}

export let splashWindow = null;
export let mainWindow = null;

app.whenReady().then(async () => {
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

  mainWindow.webContents.on("did-finish-load", async () => {
    await handleZoomLevel();
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0)
      mainWindow = createMainWindow();
  });

  mainWindow?.webContents.setWindowOpenHandler((details) => {
    handleExternalUrl(details.url); // Open the URL in the user's default browser
    return { action: "deny" }; // Prevent the Electron app from opening the URL
  });

  httpStatusHandler();
  registerCookieHandlers();
  windowHandler(mainWindow);
  jsonWebTokenHandlers();
  activeSidebarTabHandler();
  activeCodeSnippitTypeHandler();
  projectsHandlers();
  themeHandler();
  activeThemeHandler();
  cookiesHandler();
  enviromentsHandlers();
  authorizationHandler();
  requestOrFolderMetaHandler();
  tabsHandler();
  settingsHandlers();
  folderHandlers();
  paramsHandlers();
  headersHandlers();
  hiddenHeadersCheckHandler();
  showHiddenMetaDataHandler();
  bodyRawHandler();
  bodyBinaryHandler();
  requestMetaTabHandler();
  bodyXWWWFormUrlencodedHandlers();
  bodyFormDataHandlers();
  metaShowColumnHandlers();
  apiUrlHandler();
  requestHandler();
  fileSystemHandler();
  keyboardShortcutHandler();
  historyHandler();
  await generateHttpStatusSeed();
  await generateKeyboardBindingsSeed();
  await generateThemesSeed();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
