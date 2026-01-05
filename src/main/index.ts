import { app, BrowserWindow, ipcMain } from "electron";
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
import { handleZoomLevel, settingsHandlers } from "@/main/ipc/settingsHandlers";
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
import { generateHttpStatusSeed } from "@/main/seeders/httpStatusSeed";
import { generateKeyboardBindingsSeed } from "@/main/seeders/keyboardShortcutSeed";
import { generateThemesSeed } from "@/main/seeders/themesSeed";
import { createSplashWindow } from "@/main/utils/splashWindow";
import { createMainWindow } from "@/main/utils/mainWindow";
import { jarManager } from "@/main/utils/cookieManager";
import axios, { type AxiosInstance } from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";
import { handleExternalUrl } from "@/main/utils/externalUrl";
import { handleProtocol } from "@/main/utils/custom-protocol";
import { localPasswordHandler } from "@/main/ipc/localPasswordHandler";

export const userDataDir = app.getPath("userData");

export let jar: CookieJar | null = null;
export let client: AxiosInstance | null = null;

export let splashWindow: BrowserWindow | null = null;
export let mainWindow: BrowserWindow | null = null;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  // browser style cookies holder by domain/path
  jar = await jarManager.init();
  // axios client with cookie jar support
  client = wrapper(axios.create({ jar }));

  handleProtocol();

  splashWindow = createSplashWindow();
  mainWindow = createMainWindow();
  const splashMinDuration = 5000; // 5 sec minimum splash
  const splashShownAt = Date.now();

  // Set app user model id for windows
  electronApp.setAppUserModelId("com.api-bolt");

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  // IPC test
  ipcMain.on("ping", () => console.info("pong"));

  mainWindow.once("ready-to-show", () => {
    const elapsed = Date.now() - splashShownAt;
    const remaining = splashMinDuration - elapsed;

    setTimeout(
      () => {
        splashWindow?.close();
        splashWindow = null;
        mainWindow?.show();
        mainWindow?.maximize();
      },
      remaining > 0 ? remaining : 0,
    );
  });

  mainWindow.webContents.on("did-finish-load", async () => {
    await handleZoomLevel();
  });

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });

  mainWindow?.webContents.setWindowOpenHandler(details => {
    handleExternalUrl(details.url);
    return { action: "deny" };
  });

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

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
