import { contextBridge, ipcRenderer, webFrame } from "electron";
import { WindowElectronAPIInterface } from "@shared/types";

const handleApplyThemeInDocument = (theme: Record<string, string>): void => {
  Object.entries(theme).forEach(([key, value]) => {
    document.documentElement.style.setProperty(`--${key}`, value);
  });
};

const handleApplyTheme = async (): Promise<void> => {
  try {
    const activeTheme = await ipcRenderer.invoke("getActiveThemePalette");
    const theme = {
      ...(activeTheme.global ?? {}),
      ...(activeTheme.local ?? {}),
    };

    handleApplyThemeInDocument(theme);
  } catch (error) {
    console.error(error);
  }
};

window.addEventListener("DOMContentLoaded", async () => {
  await handleApplyTheme();
});

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    /**
     * ====================
     * Basic apis
     * ====================
     */
    const basicAPIBridge: WindowElectronAPIInterface["electronAPI"] = {
      getCookiesFromUrl: async url => {
        const cookieURL = new URL(url).origin;
        return await ipcRenderer.invoke("getCookies", cookieURL);
      },
      fetchApi: async payload => {
        return await ipcRenderer.invoke("fetchApi", payload);
      },
      getAllCookies: async () => {
        return await ipcRenderer.invoke("getAllCookies");
      },
      getCookieByDomain: async url => {
        return await ipcRenderer.invoke("getCookieByDomain", url);
      },
      getCookieStringByDomain: async url => {
        return await ipcRenderer.invoke("getCookieStringByDomain", url);
      },

      // window controls (matching new camelCase IPC)
      windowMinimize: async () => ipcRenderer.invoke("windowMinimize"),
      windowMaximize: async () => ipcRenderer.invoke("windowMaximize"),
      windowUnmaximize: async () => ipcRenderer.invoke("windowUnmaximize"),
      windowClose: async () => ipcRenderer.invoke("windowClose"),
      isWindowMaximized: async () => ipcRenderer.invoke("windowIsMaximized"),
      onWindowMaximizeChange: callback => {
        ipcRenderer.on("windowMaximizeChange", (_, isMaximized) => {
          callback(isMaximized);
        });
      },
      removeWindowMaximizeChange: () => {
        ipcRenderer.removeAllListeners("windowMaximizeChange");
      },

      /* zoom handler */
      setZoom: factor => webFrame.setZoomFactor(factor),
      getZoom: () => webFrame.getZoomFactor(),

      generateJWTToken: data => {
        return ipcRenderer.invoke("generateJWTToken", data);
      },

      /**
       * trigger when theme changed
       */
      applyTheme: async () => {
        return await handleApplyTheme();
      },
      applyTestTheme: theme => {
        return handleApplyThemeInDocument(theme);
      },
    };

    /**
     * ====================
     * File system handling
     * ====================
     */
    const electronAPIFileSystemBridge: WindowElectronAPIInterface["electronAPIFileSystem"] =
      {
        openFolder: async path => await ipcRenderer.invoke("openFolder", path),
      };

    /**
     * ====================
     * splash window
     * ====================
     */
    const electronAPISplashWindowBridge: WindowElectronAPIInterface["electronAPISplashWindow"] =
      {
        splashWindowCompleteEnd: async () =>
          ipcRenderer.send("splash-window-complete-end"),
      };

    /**
     * ====================
     * Local Password
     * ====================
     */
    const electronAPILocalPasswordBridge: WindowElectronAPIInterface["electronAPILocalPassword"] =
      {
        getLocalPassword: async (...payload) =>
          await ipcRenderer.invoke("getThemeListMeta", ...payload),
        getHaveLocalPassword: async (...payload) =>
          await ipcRenderer.invoke("getHaveLocalPassword", ...payload),
        matchLocalPassword: async (...payload) =>
          await ipcRenderer.invoke("matchLocalPassword", ...payload),
        setLocalPasswordValid: async () =>
          ipcRenderer.send("local-password-valid"),
        changeLocalPassword: async (...payload) =>
          await ipcRenderer.invoke("changeLocalPassword", ...payload),
      };

    /**
     * ====================
     * Theme
     * ====================
     */
    const electronAPIThemeBridge: WindowElectronAPIInterface["electronAPITheme"] =
      {
        getThemeListMeta: async (...payload) =>
          await ipcRenderer.invoke("getThemeListMeta", ...payload),
        getActiveThemeMeta: async (...payload) =>
          await ipcRenderer.invoke("getActiveThemeMeta", ...payload),
        getThemeById: async (...payload) =>
          await ipcRenderer.invoke("getThemeById", ...payload),
        getThemePaletteById: async (...payload) =>
          await ipcRenderer.invoke("getThemePaletteById", ...payload),
        createTheme: async (...payload) =>
          await ipcRenderer.invoke("createTheme", ...payload),
        updateTheme: async (...payload) =>
          await ipcRenderer.invoke("updateTheme", ...payload),
        deleteThemeById: async (...payload) =>
          await ipcRenderer.invoke("deleteThemeById", ...payload),
        saveThemePalette: async (...payload) =>
          await ipcRenderer.invoke("saveThemePalette", ...payload),
        importThemePaletteInEditor: async (...payload) =>
          await ipcRenderer.invoke("importThemePaletteInEditor", ...payload),
        installTheme: async (...payload) =>
          await ipcRenderer.invoke("installTheme", ...payload),
        unInstallTheme: async (...payload) =>
          await ipcRenderer.invoke("unInstallTheme", ...payload),
      };

    /**
     * ====================
     * Active theme
     * ====================
     */
    const electronAPIActiveThemeBridge: WindowElectronAPIInterface["electronAPIActiveTheme"] =
      {
        getActiveThemeId: async (...payload) =>
          await ipcRenderer.invoke("getActiveThemeId", ...payload),
        getActiveThemePalette: async (...payload) =>
          await ipcRenderer.invoke("getActiveThemePalette", ...payload),
        changeActiveTheme: async (...payload) =>
          await ipcRenderer.invoke("changeActiveTheme", ...payload),
        inActiveTheme: async (...payload) =>
          await ipcRenderer.invoke("inActiveTheme", ...payload),
      };

    /**
     * ====================
     * Http status
     * ====================
     */
    const electronAPIHttpStatusBridge: WindowElectronAPIInterface["electronAPIHttpStatus"] =
      {
        getHttpStatus: async () => await ipcRenderer.invoke("getHttpStatus"),
        getHttpStatusByCode: async () =>
          await ipcRenderer.invoke("getHttpStatusByCode"),
        updateHttpStatus: async (...payload) =>
          await ipcRenderer.invoke("updateHttpStatus", ...payload),
      };

    /**
     * ====================
     * Active sidebar tab
     * ====================
     */
    const electronAPIActiveSidebarTabBridge: WindowElectronAPIInterface["electronAPIActiveSidebarTab"] =
      {
        getActiveSidebarTab: async () =>
          await ipcRenderer.invoke("getActiveSidebarTab"),
        createActiveSidebarTab: async (...payload) =>
          await ipcRenderer.invoke("createActiveSidebarTab", ...payload),
        updateActiveSidebarTab: async (...payload) =>
          await ipcRenderer.invoke("updateActiveSidebarTab", ...payload),
        deleteActiveSidebarTab: async () =>
          await ipcRenderer.invoke("deleteActiveSidebarTab"),
      };

    /**
     * ====================
     * Code snippit
     * ====================
     */
    const electronAPIActiveCodeSnippitTypeBridge: WindowElectronAPIInterface["electronAPIActiveCodeSnippitType"] =
      {
        getActiveCodeSnippitType: async () =>
          await ipcRenderer.invoke("getActiveCodeSnippitType"),
        createActiveCodeSnippitType: async (...payload) =>
          await ipcRenderer.invoke("createActiveCodeSnippitType", ...payload),
        updateActiveCodeSnippitType: async (...payload) =>
          await ipcRenderer.invoke("updateActiveCodeSnippitType", ...payload),
        deleteActiveCodeSnippitType: async () =>
          await ipcRenderer.invoke("deleteActiveCodeSnippitType"),
      };

    /**
     * ====================
     * Cookies
     * ====================
     */
    const electronAPICookiesBridge: WindowElectronAPIInterface["electronAPICookies"] =
      {
        getCookiesByProject: async (...payload) =>
          await ipcRenderer.invoke("getCookiesByProject", ...payload),
        getParsedCookiesByProject: async (...payload) =>
          await ipcRenderer.invoke("getParsedCookiesByProject", ...payload),
        createCookiesByProject: async (...payload) =>
          await ipcRenderer.invoke("createCookiesByProject", ...payload),
        updateCookiesByProject: async (...payload) =>
          await ipcRenderer.invoke("updateCookiesByProject", ...payload),
        deleteCookiesByProject: async (...payload) =>
          await ipcRenderer.invoke("deleteCookiesByProject", ...payload),
        deleteCookieKeyByProject: async (...payload) =>
          await ipcRenderer.invoke("deleteCookieKeyByProject", ...payload),
        clearCookiesByProject: async (...payload) =>
          await ipcRenderer.invoke("clearCookiesByProject", ...payload),
      };

    /**
     * ====================
     * Projects
     * ====================
     */
    const electronAPIProjectsBridge: WindowElectronAPIInterface["electronAPIProjects"] =
      {
        getProjects: async () => await ipcRenderer.invoke("getProjects"),
        createProjects: async (...payload) =>
          await ipcRenderer.invoke("createProjects", ...payload),
        updateProjects: async (...payload) =>
          await ipcRenderer.invoke("updateProjects", ...payload),
        deleteProjects: async (...payload) =>
          await ipcRenderer.invoke("deleteProjects", ...payload),
        changeActiveProject: async (...payload) =>
          await ipcRenderer.invoke("changeActiveProject", ...payload),
        getActiveProject: async () =>
          await ipcRenderer.invoke("getActiveProject"),
        exportProject: async (...payload) =>
          await ipcRenderer.invoke("exportProject", ...payload),
        importProject: async (...payload) =>
          await ipcRenderer.invoke("importProject", ...payload),
      };

    /**
     * ====================
     * Settings
     * ====================
     */
    const electronAPISettingsBridge: WindowElectronAPIInterface["electronAPISettings"] =
      {
        getSettings: async () => await ipcRenderer.invoke("getSettings"),
        updateSettings: async (...payload) =>
          await ipcRenderer.invoke("updateSettings", ...payload),
        updateSettingsBackgroundImages: async (...payload) =>
          await ipcRenderer.invoke(
            "updateSettingsBackgroundImages",
            ...payload,
          ),
      };

    /**
     * ====================
     * Settings request
     * ====================
     */
    const electronAPISettingsRequestBridge: WindowElectronAPIInterface["electronAPISettingsRequest"] =
      {
        getSettingsRequest: async () =>
          await ipcRenderer.invoke("getSettingsRequest"),
        updateSettingsRequest: async (...payload) =>
          await ipcRenderer.invoke("updateSettingsRequest", ...payload),
      };

    /**
     * ====================
     * Environments
     * ====================
     */
    const electronAPIEnvironmentsBridge: WindowElectronAPIInterface["electronAPIEnvironments"] =
      {
        getAllEnvironments: async () =>
          await ipcRenderer.invoke("getAllEnvironments"),
        getEnvironments: async () =>
          await ipcRenderer.invoke("getEnvironments"),
        createEnvironments: async (...payload) =>
          await ipcRenderer.invoke("createEnvironments", ...payload),
        updateEnvironments: async (...payload) =>
          await ipcRenderer.invoke("updateEnvironments", ...payload),
        deleteAllEnvironments: async () =>
          await ipcRenderer.invoke("deleteAllEnvironments"),
        deleteEnvironments: async (...payload) =>
          await ipcRenderer.invoke("deleteEnvironments", ...payload),
        exportEnvironments: async (...payload) =>
          await ipcRenderer.invoke("exportEnvironments", ...payload),
        importEnvironments: async (...payload) =>
          await ipcRenderer.invoke("importEnvironments", ...payload),
      };

    /**
     * ====================
     * Authorization
     * ====================
     */
    const electronAPIAuthorizationBridge: WindowElectronAPIInterface["electronAPIAuthorization"] =
      {
        getAuth: async (...payload) =>
          await ipcRenderer.invoke("getAuth", ...payload),
        getInheritedAuthFromId: async (...payload) =>
          await ipcRenderer.invoke("getInheritedAuthFromId", ...payload),
        createAuth: async (...payload) =>
          await ipcRenderer.invoke("createAuth", ...payload),
        updateAuth: async (...payload) =>
          await ipcRenderer.invoke("updateAuth", ...payload),
        deleteAuth: async (...payload) =>
          await ipcRenderer.invoke("deleteAuth", ...payload),
        duplicateAuth: async (...payload) =>
          await ipcRenderer.invoke("duplicateAuth", ...payload),
      };

    /**
     * ====================
     * Request or folder meta
     * ====================
     */
    const electronAPIRequestOrFolderMetaBridge: WindowElectronAPIInterface["electronAPIRequestOrFolderMeta"] =
      {
        getRequestOrFolderMeta: async () =>
          await ipcRenderer.invoke("getRequestOrFolderMeta"),
        getRequestOrFolderMetaById: async (...payload) =>
          await ipcRenderer.invoke("getRequestOrFolderMetaById", ...payload),
        createRequestOrFolderMeta: async (...payload) =>
          await ipcRenderer.invoke("createRequestOrFolderMeta", ...payload),
        updateRequestOrFolderMeta: async (...payload) =>
          await ipcRenderer.invoke("updateRequestOrFolderMeta", ...payload),
        collapseAllRequestOrFolderMeta: async (...payload) =>
          await ipcRenderer.invoke(
            "collapseAllRequestOrFolderMeta",
            ...payload,
          ),
        moveRequestOrFolderMeta: async (...payload) =>
          await ipcRenderer.invoke("moveRequestOrFolderMeta", ...payload),
        deleteRequestOrFolderMetaById: async (...payload) =>
          await ipcRenderer.invoke("deleteRequestOrFolderMetaById", ...payload),
        deleteRequestOrFolderMetaByProjectId: async (...payload) =>
          await ipcRenderer.invoke(
            "deleteRequestOrFolderMetaByProjectId",
            ...payload,
          ),
        duplicateRequestOrFolderMeta: async (...payload) =>
          await ipcRenderer.invoke("duplicateRequestOrFolderMeta", ...payload),
        deleteRequestOrFolderMetaAll: async () =>
          await ipcRenderer.invoke("deleteRequestOrFolderMetaAll"),
        expendOrCollapseRequestOrFolderMetaAll: async (...payload) =>
          await ipcRenderer.invoke(
            "expendOrCollapseRequestOrFolderMetaAll",
            ...payload,
          ),
      };

    /**
     * ====================
     * Tabs
     * ====================
     */
    const electronAPITabsBridge: WindowElectronAPIInterface["electronAPITabs"] =
      {
        getTabList: async () => await ipcRenderer.invoke("getTabList"),
        updateTabList: async (...payload) =>
          await ipcRenderer.invoke("updateTabList", ...payload),
        deleteAllTabList: async () =>
          await ipcRenderer.invoke("deleteAllTabList"),
        deleteTabListByProjectId: async (...payload) =>
          await ipcRenderer.invoke("deleteTabListByProjectId", ...payload),
      };

    /**
     * ====================
     * Folder
     * ====================
     */
    const electronAPIFolderBridge: WindowElectronAPIInterface["electronAPIFolder"] =
      {
        getFolder: async (...payload) =>
          await ipcRenderer.invoke("getFolder", ...payload),
        updateFolder: async (...payload) =>
          await ipcRenderer.invoke("updateFolder", ...payload),
        duplicateFolder: async (...payload) =>
          await ipcRenderer.invoke("duplicateFolder", ...payload),
      };

    /**
     * ====================
     * Params
     * ====================
     */
    const electronAPIParamsBridge: WindowElectronAPIInterface["electronAPIParams"] =
      {
        getParams: async (...payload) =>
          await ipcRenderer.invoke("getParams", ...payload),
        deleteParams: async (...payload) =>
          await ipcRenderer.invoke("deleteParams", ...payload),
        deleteParamsByRequestMetaId: async (...payload) =>
          await ipcRenderer.invoke("deleteParamsByRequestMetaId", ...payload),
        createParams: async (...payload) =>
          await ipcRenderer.invoke("createParams", ...payload),
        updateParams: async (...payload) =>
          await ipcRenderer.invoke("updateParams", ...payload),
        replaceParams: async (...payload) =>
          await ipcRenderer.invoke("replaceParams", ...payload),
        checkAllParamsByRequestMetaId: async (...payload) =>
          await ipcRenderer.invoke("checkAllParamsByRequestMetaId", ...payload),
        duplicateParams: async (...payload) =>
          await ipcRenderer.invoke("duplicateParams", ...payload),
      };

    /**
     * ====================
     * Headers
     * ====================
     */
    const electronAPIHeadersBridge: WindowElectronAPIInterface["electronAPIHeaders"] =
      {
        getHeaders: async (...payload) =>
          await ipcRenderer.invoke("getHeaders", ...payload),
        deleteHeaders: async (...payload) =>
          await ipcRenderer.invoke("deleteHeaders", ...payload),
        deleteHeadersByRequestMetaId: async (...payload) =>
          await ipcRenderer.invoke("deleteHeadersByRequestMetaId", ...payload),
        createHeaders: async (...payload) =>
          await ipcRenderer.invoke("createHeaders", ...payload),
        updateHeaders: async (...payload) =>
          await ipcRenderer.invoke("updateHeaders", ...payload),
        replaceHeaders: async (...payload) =>
          await ipcRenderer.invoke("replaceHeaders", ...payload),
        checkAllHeadersByRequestMetaId: async (...payload) =>
          await ipcRenderer.invoke(
            "checkAllHeadersByRequestMetaId",
            ...payload,
          ),
        duplicateHeaders: async (...payload) =>
          await ipcRenderer.invoke("duplicateHeaders", ...payload),
      };

    /**
     * ====================
     * Hidden headers
     * ====================
     */
    const electronAPIHiddenHeadersCheckBridge: WindowElectronAPIInterface["electronAPIHiddenHeadersCheck"] =
      {
        getHiddenHeadersCheck: async (...payload) =>
          await ipcRenderer.invoke("getHiddenHeadersCheck", ...payload),
        createHiddenHeadersCheck: async (...payload) =>
          await ipcRenderer.invoke("createHiddenHeadersCheck", ...payload),
        updateHiddenHeadersCheck: async (...payload) =>
          await ipcRenderer.invoke("updateHiddenHeadersCheck", ...payload),
        duplicateHiddenHeadersCheck: async (...payload) =>
          await ipcRenderer.invoke("duplicateHiddenHeadersCheck", ...payload),
      };

    /**
     * ====================
     * Show hidden meta data
     * ====================
     */
    const electronAPIShowHiddenMetaDataBridge: WindowElectronAPIInterface["electronAPIShowHiddenMetaData"] =
      {
        getShowHiddenMetaData: async (...payload) =>
          await ipcRenderer.invoke("getShowHiddenMetaData", ...payload),
        createShowHiddenMetaData: async (...payload) =>
          await ipcRenderer.invoke("createShowHiddenMetaData", ...payload),
        updateShowHiddenMetaData: async (...payload) =>
          await ipcRenderer.invoke("updateShowHiddenMetaData", ...payload),
        duplicateShowHiddenMetaData: async (...payload) =>
          await ipcRenderer.invoke("duplicateShowHiddenMetaData", ...payload),
      };
    contextBridge.exposeInMainWorld(
      "electronAPIShowHiddenMetaData",
      electronAPIShowHiddenMetaDataBridge,
    );

    /**
     * ====================
     * Body raw data
     * ====================
     */
    const electronAPIBodyRawBridge: WindowElectronAPIInterface["electronAPIBodyRaw"] =
      {
        getBodyRaw: async (...payload) =>
          await ipcRenderer.invoke("getBodyRaw", ...payload),
        createBodyRaw: async (...payload) =>
          await ipcRenderer.invoke("createBodyRaw", ...payload),
        updateBodyRaw: async (...payload) =>
          await ipcRenderer.invoke("updateBodyRaw", ...payload),
        duplicateBodyRaw: async (...payload) =>
          await ipcRenderer.invoke("duplicateBodyRaw", ...payload),
        replaceBodyRaw: async (...payload) =>
          await ipcRenderer.invoke("replaceBodyRaw", ...payload),
      };

    /**
     * ====================
     * Body binary data
     * ====================
     */
    const electronAPIBodyBinaryBridge: WindowElectronAPIInterface["electronAPIBodyBinary"] =
      {
        getBodyBinary: async (...payload) =>
          await ipcRenderer.invoke("getBodyBinary", ...payload),
        createBodyBinary: async (...payload) =>
          await ipcRenderer.invoke("createBodyBinary", ...payload),
        updateBodyBinary: async (...payload) =>
          await ipcRenderer.invoke("updateBodyBinary", ...payload),
        deleteBodyBinary: async (...payload) =>
          await ipcRenderer.invoke("deleteBodyBinary", ...payload),
        duplicateBodyBinary: async (...payload) =>
          await ipcRenderer.invoke("duplicateBodyBinary", ...payload),
        replaceBodyBinary: async (...payload) =>
          await ipcRenderer.invoke("replaceBodyBinary", ...payload),
      };

    /**
     * ====================
     * Request meta tab
     * ====================
     */
    const electronAPIRequestMetaTabBridge: WindowElectronAPIInterface["electronAPIRequestMetaTab"] =
      {
        getRequestMetaTab: async (...payload) =>
          await ipcRenderer.invoke("getRequestMetaTab", ...payload),
        createRequestMetaTab: async (...payload) =>
          await ipcRenderer.invoke("createRequestMetaTab", ...payload),
        updateRequestMetaTab: async (...payload) =>
          await ipcRenderer.invoke("updateRequestMetaTab", ...payload),
        deleteRequestMetaTab: async (...payload) =>
          await ipcRenderer.invoke("deleteRequestMetaTab", ...payload),
        duplicateRequestMetaTab: async (...payload) =>
          await ipcRenderer.invoke("duplicateRequestMetaTab", ...payload),
        replaceRequestMetaTab: async (...payload) =>
          await ipcRenderer.invoke("replaceRequestMetaTab", ...payload),
      };

    /**
     * ====================
     * body xwww-form-urlencoded
     * ====================
     */
    const electronAPIBodyXWWWFormUrlencodedBridge: WindowElectronAPIInterface["electronAPIBodyXWWWFormUrlencoded"] =
      {
        getBodyXWWWFormUrlencoded: async (...payload) =>
          await ipcRenderer.invoke("getBodyXWWWFormUrlencoded", ...payload),
        deleteBodyXWWWFormUrlencoded: async (...payload) =>
          await ipcRenderer.invoke("deleteBodyXWWWFormUrlencoded", ...payload),
        deleteBodyXWWWFormUrlencodedByRequestMetaId: async (...payload) =>
          await ipcRenderer.invoke(
            "deleteBodyXWWWFormUrlencodedByRequestMetaId",
            ...payload,
          ),
        createBodyXWWWFormUrlencoded: async (...payload) =>
          await ipcRenderer.invoke("createBodyXWWWFormUrlencoded", ...payload),
        updateBodyXWWWFormUrlencoded: async (...payload) =>
          await ipcRenderer.invoke("updateBodyXWWWFormUrlencoded", ...payload),
        replaceBodyXWWWFormUrlencoded: async (...payload) =>
          await ipcRenderer.invoke("replaceBodyXWWWFormUrlencoded", ...payload),
        checkAllBodyXWWWFormUrlencodedByRequestMetaId: async (...payload) =>
          await ipcRenderer.invoke(
            "checkAllBodyXWWWFormUrlencodedByRequestMetaId",
            ...payload,
          ),
        duplicateBodyXWWWFormUrlencoded: async (...payload) =>
          await ipcRenderer.invoke(
            "duplicateBodyXWWWFormUrlencoded",
            ...payload,
          ),
      };

    /**
     * ====================
     * body form-data
     * ====================
     */
    const electronAPIBodyFormDataBridge: WindowElectronAPIInterface["electronAPIBodyFormData"] =
      {
        getBodyFormData: async (...payload) =>
          await ipcRenderer.invoke("getBodyFormData", ...payload),
        deleteBodyFormData: async (...payload) =>
          await ipcRenderer.invoke("deleteBodyFormData", ...payload),
        deleteBodyFormDataByRequestMetaId: async (...payload) =>
          await ipcRenderer.invoke(
            "deleteBodyFormDataByRequestMetaId",
            ...payload,
          ),
        deleteBodyFormDataFile: async (...payload) =>
          await ipcRenderer.invoke("deleteBodyFormDataFile", ...payload),
        createBodyFormData: async (...payload) =>
          await ipcRenderer.invoke("createBodyFormData", ...payload),
        updateBodyFormData: async (...payload) =>
          await ipcRenderer.invoke("updateBodyFormData", ...payload),
        updateBodyFormDataFile: async (...payload) =>
          await ipcRenderer.invoke("updateBodyFormDataFile", ...payload),
        replaceBodyFormData: async (...payload) =>
          await ipcRenderer.invoke("replaceBodyFormData", ...payload),
        replaceFullBodyFormData: async (...payload) =>
          await ipcRenderer.invoke("replaceFullBodyFormData", ...payload),
        checkAllBodyFormDataByRequestMetaId: async (...payload) =>
          await ipcRenderer.invoke(
            "checkAllBodyFormDataByRequestMetaId",
            ...payload,
          ),
        duplicateBodyFormData: async (...payload) =>
          await ipcRenderer.invoke("duplicateBodyFormData", ...payload),
      };

    /**
     * ====================
     * Meta show column
     * ====================
     */
    const electronAPIMetaShowColumnBridge: WindowElectronAPIInterface["electronAPIMetaShowColumn"] =
      {
        getMetaShowColumn: async (...payload) =>
          await ipcRenderer.invoke("getMetaShowColumn", ...payload),
        createMetaShowColumn: async (...payload) =>
          await ipcRenderer.invoke("createMetaShowColumn", ...payload),
        updateMetaShowColumn: async (...payload) =>
          await ipcRenderer.invoke("updateMetaShowColumn", ...payload),
        deleteMetaShowColumn: async (...payload) =>
          await ipcRenderer.invoke("deleteMetaShowColumn", ...payload),
        duplicateMetaShowColumn: async (...payload) =>
          await ipcRenderer.invoke("duplicateMetaShowColumn", ...payload),
      };

    /**
     * ====================
     * Api url
     * ====================
     */
    const electronAPIApiUrlBridge: WindowElectronAPIInterface["electronAPIApiUrl"] =
      {
        getApiUrlDB: async (...payload) =>
          await ipcRenderer.invoke("getApiUrlDB", ...payload),
        createApiUrl: async (...payload) =>
          await ipcRenderer.invoke("createApiUrl", ...payload),
        duplicateApiUrl: async (...payload) =>
          await ipcRenderer.invoke("duplicateApiUrl", ...payload),
        updateApiUrl: async (...payload) =>
          await ipcRenderer.invoke("updateApiUrl", ...payload),
      };

    /**
     * ====================
     * Request
     * ====================
     */
    const electronAPIRequestBridge: WindowElectronAPIInterface["electronAPIRequest"] =
      {
        clearRequest: async (...payload) =>
          await ipcRenderer.invoke("clearRequest", ...payload),
        exportRequest: async (...payload) =>
          await ipcRenderer.invoke("exportRequest", ...payload),
        importRequest: async (...payload) =>
          await ipcRenderer.invoke("importRequest", ...payload),
        exportFolder: async (...payload) =>
          await ipcRenderer.invoke("exportFolder", ...payload),
        importFolder: async (...payload) =>
          await ipcRenderer.invoke("importFolder", ...payload),
      };

    /**
     * ====================
     * Keyboard shortcut
     * ====================
     */
    const electronAPIKeyboardShortcutBridge: WindowElectronAPIInterface["electronAPIKeyboardShortcut"] =
      {
        getKeyboardShortcuts: async (...payload) =>
          await ipcRenderer.invoke("getKeyboardShortcuts", ...payload),
        getKeyboardShortcutsById: async (...payload) =>
          await ipcRenderer.invoke("getKeyboardShortcutsById", ...payload),
        updateKeyboardShortcuts: async (...payload) =>
          await ipcRenderer.invoke("updateKeyboardShortcuts", ...payload),
        resetKeyboardShortcuts: async (...payload) =>
          await ipcRenderer.invoke("resetKeyboardShortcuts", ...payload),
      };

    /**
     * ====================
     * History
     * ====================
     */
    const electronAPIHistoryBridge: WindowElectronAPIInterface["electronAPIHistory"] =
      {
        getHistoryById: async (...payload) =>
          await ipcRenderer.invoke("getHistoryById", ...payload),
        getHistoryByRequestId: async (...payload) =>
          await ipcRenderer.invoke("getHistoryByRequestId", ...payload),
        createHistory: async (...payload) =>
          await ipcRenderer.invoke("createHistory", ...payload),
        deleteHistoryById: async (...payload) =>
          await ipcRenderer.invoke("deleteHistoryById", ...payload),
        deleteHistoryByRequestId: async (...payload) =>
          await ipcRenderer.invoke("deleteHistoryByRequestId", ...payload),
      };

    /**
     * ===========================
     * Connect all bridge
     * ===========================
     */
    contextBridge.exposeInMainWorld("electronAPI", basicAPIBridge);
    contextBridge.exposeInMainWorld(
      "electronAPIFileSystem",
      electronAPIFileSystemBridge,
    );
    contextBridge.exposeInMainWorld(
      "electronAPISplashWindow",
      electronAPISplashWindowBridge,
    );
    contextBridge.exposeInMainWorld(
      "electronAPILocalPassword",
      electronAPILocalPasswordBridge,
    );
    contextBridge.exposeInMainWorld("electronAPITheme", electronAPIThemeBridge);
    contextBridge.exposeInMainWorld(
      "electronAPIActiveTheme",
      electronAPIActiveThemeBridge,
    );
    contextBridge.exposeInMainWorld(
      "electronAPIHttpStatus",
      electronAPIHttpStatusBridge,
    );
    contextBridge.exposeInMainWorld(
      "electronAPIActiveSidebarTab",
      electronAPIActiveSidebarTabBridge,
    );
    contextBridge.exposeInMainWorld(
      "electronAPIActiveCodeSnippitType",
      electronAPIActiveCodeSnippitTypeBridge,
    );
    contextBridge.exposeInMainWorld(
      "electronAPICookies",
      electronAPICookiesBridge,
    );
    contextBridge.exposeInMainWorld(
      "electronAPIProjects",
      electronAPIProjectsBridge,
    );
    contextBridge.exposeInMainWorld(
      "electronAPISettings",
      electronAPISettingsBridge,
    );
    contextBridge.exposeInMainWorld(
      "electronAPISettingsRequest",
      electronAPISettingsRequestBridge,
    );
    contextBridge.exposeInMainWorld(
      "electronAPIEnvironments",
      electronAPIEnvironmentsBridge,
    );
    contextBridge.exposeInMainWorld(
      "electronAPIAuthorization",
      electronAPIAuthorizationBridge,
    );
    contextBridge.exposeInMainWorld(
      "electronAPIRequestOrFolderMeta",
      electronAPIRequestOrFolderMetaBridge,
    );
    contextBridge.exposeInMainWorld("electronAPITabs", electronAPITabsBridge);
    contextBridge.exposeInMainWorld(
      "electronAPIFolder",
      electronAPIFolderBridge,
    );
    contextBridge.exposeInMainWorld(
      "electronAPIParams",
      electronAPIParamsBridge,
    );
    contextBridge.exposeInMainWorld(
      "electronAPIHeaders",
      electronAPIHeadersBridge,
    );
    contextBridge.exposeInMainWorld(
      "electronAPIHiddenHeadersCheck",
      electronAPIHiddenHeadersCheckBridge,
    );
    contextBridge.exposeInMainWorld(
      "electronAPIBodyRaw",
      electronAPIBodyRawBridge,
    );
    contextBridge.exposeInMainWorld(
      "electronAPIBodyBinary",
      electronAPIBodyBinaryBridge,
    );
    contextBridge.exposeInMainWorld(
      "electronAPIRequestMetaTab",
      electronAPIRequestMetaTabBridge,
    );
    contextBridge.exposeInMainWorld(
      "electronAPIBodyXWWWFormUrlencoded",
      electronAPIBodyXWWWFormUrlencodedBridge,
    );
    contextBridge.exposeInMainWorld(
      "electronAPIBodyFormData",
      electronAPIBodyFormDataBridge,
    );
    contextBridge.exposeInMainWorld(
      "electronAPIMetaShowColumn",
      electronAPIMetaShowColumnBridge,
    );
    contextBridge.exposeInMainWorld(
      "electronAPIApiUrl",
      electronAPIApiUrlBridge,
    );
    contextBridge.exposeInMainWorld(
      "electronAPIRequest",
      electronAPIRequestBridge,
    );
    contextBridge.exposeInMainWorld(
      "electronAPIKeyboardShortcut",
      electronAPIKeyboardShortcutBridge,
    );
    contextBridge.exposeInMainWorld(
      "electronAPIHistory",
      electronAPIHistoryBridge,
    );
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
