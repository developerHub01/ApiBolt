import { app, BrowserWindow, ipcMain, session } from "electron";
import { electronApp, optimizer } from "@electron-toolkit/utils";

import { httpStatusHandler } from "@/main/ipc/httpStatusHandler";
import { registerCookieHandlers } from "@/main/ipc/cookies";
import { windowHandler } from "@/main/ipc/windowHandler";
import { jsonWebTokenHandlers } from "@/main/ipc/jsonWebToken";
import { activeSidebarTabHandler } from "@/main/ipc/activeSidebarTabHandler";
import { activeCodeSnippitTypeHandler } from "@/main/ipc/activeCodeSnippitTypeHandler";
import { projectsHandlers } from "@/main/ipc/projectsHandlers";
import { themeHandler } from "@/main/ipc/themeHandler";
import { activeThemeHandler } from "@/main/ipc/activeThemeHandler";
import { cookiesHandler } from "@/main/ipc/cookiesHandler";
import { authorizationHandler } from "@/main/ipc/authorizationHandler";
import { enviromentsHandlers } from "@/main/ipc/environmentsHandler";
import { requestOrFolderMetaHandler } from "@/main/ipc/requestOrFolderMetaHandler";
import { tabsHandler } from "@/main/ipc/tabsHandler";
import { handleZoomLevel, settingsHandler } from "@/main/ipc/settingsHandler";
import { settingsRequestHandler } from "@/main/ipc/settingsRequestHandler";
import { folderHandlers } from "@/main/ipc/folderHandlers";
import { paramsHandlers } from "@/main/ipc/paramsHandlers";
import { headersHandlers } from "@/main/ipc/headersHandlers";
import { hiddenHeadersCheckHandler } from "@/main/ipc/hiddenHeadersCheckHandler";
import { showHiddenMetaDataHandler } from "@/main/ipc/showHiddenMetaDataHandler";
import { bodyRawHandler } from "@/main/ipc/bodyRawHandler";
import { bodyBinaryHandler } from "@/main/ipc/bodyBinaryHandler";
import { requestMetaTabHandler } from "@/main/ipc/requestMetaTabHandler";
import { bodyXWWWFormUrlencodedHandlers } from "@/main/ipc/bodyXWWWFormUrlencodedHandlers";
import { bodyFormDataHandlers } from "@/main/ipc/bodyFormDataHandlers";
import { metaShowColumnHandlers } from "@/main/ipc/metaShowColumnHandlers";
import { apiUrlHandler } from "@/main/ipc/apiUrlHandler";
import { requestHandler } from "@/main/ipc/requestHandler";
import { fileSystemHandler } from "@/main/ipc/fileSystemHandler";
import { keyboardShortcutHandler } from "@/main/ipc/keyboardShortcutHandler";
import { historyHandler } from "@/main/ipc/historyHandler";
import { localPasswordHandler } from "@/main/ipc/localPasswordHandler";

import { generateProjectSeed } from "@/main/seeders/projectSeed";
import { generateHttpStatusSeed } from "@/main/seeders/httpStatusSeed";
import { generateKeyboardBindingsSeed } from "@/main/seeders/keyboardShortcutSeed";
import { generateThemesSeed } from "@/main/seeders/themesSeed";
import { generateSettingsSeed } from "@/main/seeders/settingSeed";
import { settingRequestSeed } from "@/main/seeders/settingRequestSeed";

import { SettingRequestState } from "@/main/state/settingRequest";

import { createSplashWindow } from "@/main/utils/splashWindow";
import { createLocalPasswordWindow } from "@/main/utils/localPasswordWindow";
import { createMainWindow } from "@/main/utils/mainWindow";

import { jarManager } from "@/main/utils/cookieManager";
import axios, { type AxiosInstance } from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";
import { handleExternalUrl } from "@/main/utils/externalUrl";
import { handleProtocol } from "@/main/utils/custom-protocol";
import { getLocalPassword } from "@/main/db/localPasswordDB";
import { applyingThemeBackground } from "@/main/utils/applyingTheme";
import { runMigrations } from "@/main/db";
import { responseHandler } from "@/main/ipc/responseHandler";
import { sysmteHandler } from "@/main/ipc/sysmteHandler";
import { WEBSITE_BASE_URL } from "@shared/constant/api-bolt";
import { pathParamsHandlers } from "@/main/ipc/pathParamsHandlers";

/***
 * App basic setup declaration
 */
export const userDataDir = app.getPath("userData");

const serverAPIUrl = WEBSITE_BASE_URL;

export let jar: CookieJar | null = null;
export let client: AxiosInstance | null = null;

/***
 * Initiallizing all windows declaration
 */
export let splashWindow: BrowserWindow | null = null;
export let localPasswordWindow: BrowserWindow | null = null;
export let mainWindow: BrowserWindow | null = null;

/***
 * To track is a window is closed by user or programmatically
 */
const windowCloseReason = new WeakMap<BrowserWindow, "user" | "programmatic">();

/***
 * Windows open close helper functions
 */
export const showMainWindow = () => {
  if (!mainWindow) return;
  if (mainWindow.isMinimized()) mainWindow.restore();
  mainWindow.show();
  mainWindow.focus();
  mainWindow.maximize();
  mainWindow.setAlwaysOnTop(true);
  mainWindow.setAlwaysOnTop(false);
};

export const showLocalPasswordWindow = () => {
  if (!localPasswordWindow) return;
  localPasswordWindow.show();
};

export const closeSplash = () => {
  if (!splashWindow) return;

  windowCloseReason.set(splashWindow, "programmatic");
  splashWindow.close();
};

export const closeLocalPassword = () => {
  if (!localPasswordWindow) return;

  windowCloseReason.set(localPasswordWindow, "programmatic");
  localPasswordWindow.close();
};

/***
 * Main window opening function
 */
const enterMainApp = () => {
  if (!mainWindow) return;

  if (mainWindow.webContents.isLoading())
    mainWindow.once("ready-to-show", () => {
      showMainWindow();
    });
  else showMainWindow();

  closeLocalPassword();
};

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      else mainWindow.focus();
    } else if (localPasswordWindow) localPasswordWindow.focus();
    else if (splashWindow) splashWindow.focus();
  });

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.whenReady().then(async () => {
    /**
     * setting app id
     */
    if (process.platform === "win32") app.setAppUserModelId("com.api-bolt");
    else electronApp.setAppUserModelId("com.api-bolt");

    /***
     * First migrate the db
     */
    await runMigrations();

    /***
     *  sessions security ===========
     */
    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
      const connectSources = [
        "'self'",
        // "http://localhost:3000",
        // "http://localhost:5173",
        // "https://*.vercel.app",
        serverAPIUrl,
      ]
        .filter(Boolean)
        .join(" ");

      callback({
        responseHeaders: {
          ...details.responseHeaders,
          "Content-Security-Policy": [
            `default-src 'self'; ` +
              `script-src 'self' 'unsafe-inline' 'unsafe-eval'; ` +
              `style-src 'self' 'unsafe-inline'; ` +
              `img-src 'self' data: api-bolt: https://*.supabase.co; ` +
              `connect-src 'self'${connectSources ? " " + connectSources : ""};`,
          ],
        },
      });
    });

    /***
     * App basic setup start on app statup.
     * cookies | axios-client | protocols | app-model-id | splash
     */
    jar = await jarManager.init();
    // axios client with cookie jar support
    client = wrapper(axios.create({ jar }));
    /* handle protocol ex: api-bolt:// */
    handleProtocol();

    /***
     * flag to check do have local password or not
     */
    const haveLocalPassword = Boolean(await getLocalPassword());
    /***
     * getting background color from theme palette
     */
    const backgroundColor = await applyingThemeBackground();

    /***
     * create all windows
     */
    splashWindow = createSplashWindow();
    localPasswordWindow = createLocalPasswordWindow();
    mainWindow = createMainWindow();
    mainWindow.setBackgroundColor(backgroundColor);

    /***
     * by default setting all windows closing reasone as "user"
     */
    windowCloseReason.set(splashWindow, "user");
    windowCloseReason.set(localPasswordWindow, "user");
    windowCloseReason.set(mainWindow, "user");

    /***
     * handling splash and other windows opening
     */
    splashWindow.show();

    // Default open or close DevTools by F12 in development
    // and ignore CommandOrControl + R in production.
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    app.on("browser-window-created", (_, window) => {
      optimizer.watchWindowShortcuts(window);
    });

    // IPC test
    ipcMain.on("ping", () => console.info("pong"));

    /***
     * Render main window or local-password window if splash loading finished
     */
    ipcMain.on("splash-window-complete-end", () => {
      if (haveLocalPassword) {
        showLocalPasswordWindow();
        closeSplash();
      } else {
        enterMainApp();
        setTimeout(() => closeSplash(), 200);
      }
    });

    /***
     * Render main window after local password matched
     * that will only call if local password have and local-password-window open and can validate the password
     */
    ipcMain.on("local-password-valid", () => {
      enterMainApp();
    });

    // mainWindow.once("ready-to-show", () => {});

    /***
     * on mainWindow loading finish then handle the zoom-level of the window
     */
    mainWindow.webContents.on("did-finish-load", async () => {
      await handleZoomLevel();
    });

    app.on("activate", function () {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
    });

    /***
     * handling external links in mainWindow. to forcefully open external link outside the app instead of in
     */
    mainWindow?.webContents.setWindowOpenHandler(details => {
      handleExternalUrl(details.url);
      return { action: "deny" };
    });

    /***
     * Initiallizing all IPC handlers
     */
    sysmteHandler();
    localPasswordHandler();
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
    settingsHandler();
    settingsRequestHandler();
    folderHandlers();
    paramsHandlers();
    pathParamsHandlers();
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
    responseHandler();
    fileSystemHandler();
    keyboardShortcutHandler();
    historyHandler();

    /***
     * Initiallizing all seeds
     */
    (async () => {
      try {
        (
          await Promise.allSettled([
            generateProjectSeed(),
            generateHttpStatusSeed(),
            generateKeyboardBindingsSeed(),
            generateThemesSeed(),
            generateSettingsSeed(),
            settingRequestSeed(),
            SettingRequestState.loadGlobalFromDB(),
          ])
        ).forEach((result, index) => {
          if (result.status === "rejected")
            console.error(`Seed at index ${index} failed:`, result.reason);
        });
      } catch (err) {
        console.error("Critical error during seeding sequence:", err);
      }
    })();
  });
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

/***
 * track window creating, closings and before clsoings
 */
app.on("browser-window-created", (_, win) => {
  /**
   * before closing the window checking is that closed by user or not. if user then close because if user closed it means user intended  to close the app
   */
  win.on("close", () => {
    const reasone = windowCloseReason.get(win) ?? "user";

    if (reasone !== "user") return;
    app.quit();
  });

  /**
   * after close app clear windows and windowCloseReason Map
   */
  win.on("closed", () => {
    windowCloseReason.delete(win);

    if (win === splashWindow) splashWindow = null;
    if (win === localPasswordWindow) localPasswordWindow = null;
    if (win === mainWindow) mainWindow = null;
  });
});
