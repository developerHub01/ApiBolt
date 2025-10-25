const { contextBridge, ipcRenderer, webFrame } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  getCookiesFromUrl: async (url) => {
    const cookieURL = new URL(url).origin;
    return await ipcRenderer.invoke("getCookies", cookieURL);
  },
  fetchApi: async (payload) => {
    return await ipcRenderer.invoke("fetchApi", payload);
  },
  getAllCookies: async () => {
    return await ipcRenderer.invoke("getAllCookies");
  },
  getCookieByDomain: async (url) => {
    return await ipcRenderer.invoke("getCookieByDomain", url);
  },
  getCookieStringByDomain: async (url) => {
    return await ipcRenderer.invoke("getCookieStringByDomain", url);
  },

  // window controls (matching new camelCase IPC)
  windowMinimize: async () => ipcRenderer.invoke("windowMinimize"),
  windowMaximize: async () => ipcRenderer.invoke("windowMaximize"),
  windowUnmaximize: async () => ipcRenderer.invoke("windowUnmaximize"),
  windowClose: async () => ipcRenderer.invoke("windowClose"),
  isWindowMaximized: async () => ipcRenderer.invoke("windowIsMaximized"),
  onWindowMaximizeChange: (callback) => {
    ipcRenderer.on("windowMaximizeChange", (_, isMaximized) => {
      callback(isMaximized);
    });
  },
  removeWindowMaximizeChange: () => {
    ipcRenderer.removeAllListeners("windowMaximizeChange");
  },

  generateJWTToken: async (data) => {
    return await ipcRenderer.invoke("generateJWTToken", data);
  },
});

contextBridge.exposeInMainWorld("electronFileSystem", {
  openFolder: async (path) => await ipcRenderer.invoke("openFolder", path),
});

contextBridge.exposeInMainWorld("electronAPIZoom", {
  setZoom: (factor) => webFrame.setZoomFactor(factor),
  getZoom: () => webFrame.getZoomFactor(),
});

contextBridge.exposeInMainWorld("electronAPIHttpStatusDB", {
  getHttpStatus: async () => await ipcRenderer.invoke("getHttpStatus"),
  getHttpStatusByCode: async () =>
    await ipcRenderer.invoke("getHttpStatusByCode"),
  updateHttpStatus: async (payload) =>
    await ipcRenderer.invoke("updateHttpStatus", payload),
});

contextBridge.exposeInMainWorld("electronAPIActiveSidebarTabDB", {
  getActiveSidebarTab: async () =>
    await ipcRenderer.invoke("getActiveSidebarTab"),
  createActiveSidebarTab: async (payload) =>
    await ipcRenderer.invoke("createActiveSidebarTab", payload),
  updateActiveSidebarTab: async (payload) =>
    await ipcRenderer.invoke("updateActiveSidebarTab", payload),
  deleteActiveSidebarTab: async () =>
    await ipcRenderer.invoke("deleteActiveSidebarTab"),
});

contextBridge.exposeInMainWorld("electronAPIActiveCodeSnippitTypeDB", {
  getActiveCodeSnippitType: async () =>
    await ipcRenderer.invoke("getActiveCodeSnippitType"),
  createActiveCodeSnippitType: async (payload) =>
    await ipcRenderer.invoke("createActiveCodeSnippitType", payload),
  updateActiveCodeSnippitType: async (payload) =>
    await ipcRenderer.invoke("updateActiveCodeSnippitType", payload),
  deleteActiveCodeSnippitType: async () =>
    await ipcRenderer.invoke("deleteActiveCodeSnippitType"),
});

contextBridge.exposeInMainWorld("electronAPICookiesDB", {
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
});

contextBridge.exposeInMainWorld("electronAPIProjectsDB", {
  getProjects: async () => await ipcRenderer.invoke("getProjects"),
  createProjects: async (payload) =>
    await ipcRenderer.invoke("createProjects", payload),
  updateProjects: async (id, payload) =>
    await ipcRenderer.invoke("updateProjects", id, payload),
  deleteProjects: async (id) => await ipcRenderer.invoke("deleteProjects", id),
  changeActiveProject: async (id) =>
    await ipcRenderer.invoke("changeActiveProject", id),
  getActiveProject: async () => await ipcRenderer.invoke("getActiveProject"),
});

contextBridge.exposeInMainWorld("electronAPISettingsDB", {
  getSettings: async () => await ipcRenderer.invoke("getSettings"),
  updateSettings: async (...payload) =>
    await ipcRenderer.invoke("updateSettings", ...payload),
  updateSettingsBackgroundImages: async (...payload) =>
    await ipcRenderer.invoke("updateSettingsBackgroundImages", ...payload),
});

contextBridge.exposeInMainWorld("electronAPIEnvironmentsDB", {
  getAllEnvironments: async () =>
    await ipcRenderer.invoke("getAllEnvironments"),
  getEnvironments: async () => await ipcRenderer.invoke("getEnvironments"),
  createEnvironments: async (payload) =>
    await ipcRenderer.invoke("createEnvironments", payload),
  updateEnvironments: async (payload) =>
    await ipcRenderer.invoke("updateEnvironments", payload),
  deleteAllEnvironments: async () =>
    await ipcRenderer.invoke("deleteAllEnvironments"),
  deleteEnvironments: async (id) =>
    await ipcRenderer.invoke("deleteEnvironments", id),
});

contextBridge.exposeInMainWorld("electronAPIAuthorizationDB", {
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
});

contextBridge.exposeInMainWorld("electronAPIRequestOrFolderMetaDB", {
  getRequestOrFolderMeta: async () =>
    await ipcRenderer.invoke("getRequestOrFolderMeta"),
  createRequestOrFolderMeta: async (...payload) =>
    await ipcRenderer.invoke("createRequestOrFolderMeta", ...payload),
  updateRequestOrFolderMeta: async (...payload) =>
    await ipcRenderer.invoke("updateRequestOrFolderMeta", ...payload),
  collapseAllRequestOrFolderMeta: async (...payload) =>
    await ipcRenderer.invoke("collapseAllRequestOrFolderMeta", ...payload),
  moveRequestOrFolderMeta: async (...payload) =>
    await ipcRenderer.invoke("moveRequestOrFolderMeta", ...payload),
  deleteRequestOrFolderMetaById: async (...payload) =>
    await ipcRenderer.invoke("deleteRequestOrFolderMetaById", ...payload),
  deleteRequestOrFolderMetaByProjectId: async (...payload) =>
    await ipcRenderer.invoke(
      "deleteRequestOrFolderMetaByProjectId",
      ...payload
    ),
  duplicateRequestOrFolderMeta: async (...payload) =>
    await ipcRenderer.invoke("duplicateRequestOrFolderMeta", ...payload),
  deleteRequestOrFolderMetaAll: async () =>
    await ipcRenderer.invoke("deleteRequestOrFolderMetaAll"),
  expendOrCollapseRequestOrFolderMetaAll: async (...payload) =>
    await ipcRenderer.invoke(
      "expendOrCollapseRequestOrFolderMetaAll",
      ...payload
    ),
});

contextBridge.exposeInMainWorld("electronAPITabsDB", {
  getTabList: async () => await ipcRenderer.invoke("getTabList"),
  updateTabList: async (...payload) =>
    await ipcRenderer.invoke("updateTabList", ...payload),
  deleteAllTabList: async () => await ipcRenderer.invoke("deleteAllTabList"),
  deleteTabListByProjectId: async (...payload) =>
    await ipcRenderer.invoke("deleteTabListByProjectId", ...payload),
});

contextBridge.exposeInMainWorld("electronAPIFolderDB", {
  getFolder: async (...payload) =>
    await ipcRenderer.invoke("getFolder", ...payload),
  updateFolder: async (...payload) =>
    await ipcRenderer.invoke("updateFolder", ...payload),
  duplicateFolder: async (...payload) =>
    await ipcRenderer.invoke("duplicateFolder", ...payload),
});

contextBridge.exposeInMainWorld("electronAPIParamsDB", {
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
});

contextBridge.exposeInMainWorld("electronAPIHeadersDB", {
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
    await ipcRenderer.invoke("checkAllHeadersByRequestMetaId", ...payload),
  duplicateHeaders: async (...payload) =>
    await ipcRenderer.invoke("duplicateHeaders", ...payload),
});

contextBridge.exposeInMainWorld("electronAPIHiddenHeadersCheckDB", {
  getHiddenHeadersCheck: async (...payload) =>
    await ipcRenderer.invoke("getHiddenHeadersCheck", ...payload),
  createHiddenHeadersCheck: async (...payload) =>
    await ipcRenderer.invoke("createHiddenHeadersCheck", ...payload),
  updateHiddenHeadersCheck: async (...payload) =>
    await ipcRenderer.invoke("updateHiddenHeadersCheck", ...payload),
  duplicateHiddenHeadersCheck: async (...payload) =>
    await ipcRenderer.invoke("duplicateHiddenHeadersCheck", ...payload),
});

contextBridge.exposeInMainWorld("electronAPIShowHiddenMetaDataDB", {
  getShowHiddenMetaData: async (...payload) =>
    await ipcRenderer.invoke("getShowHiddenMetaData", ...payload),
  createShowHiddenMetaData: async (...payload) =>
    await ipcRenderer.invoke("createShowHiddenMetaData", ...payload),
  updateShowHiddenMetaData: async (...payload) =>
    await ipcRenderer.invoke("updateShowHiddenMetaData", ...payload),
  duplicateShowHiddenMetaData: async (...payload) =>
    await ipcRenderer.invoke("duplicateShowHiddenMetaData", ...payload),
});

contextBridge.exposeInMainWorld("electronAPIBodyRawDB", {
  getBodyRaw: async (...payload) =>
    await ipcRenderer.invoke("getBodyRaw", ...payload),
  createBodyRaw: async (...payload) =>
    await ipcRenderer.invoke("createBodyRaw", ...payload),
  updateBodyRaw: async (...payload) =>
    await ipcRenderer.invoke("updateBodyRaw", ...payload),
  duplicateBodyRaw: async (...payload) =>
    await ipcRenderer.invoke("duplicateBodyRaw", ...payload),
});

contextBridge.exposeInMainWorld("electronAPIBodyBinaryDB", {
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
});

contextBridge.exposeInMainWorld("electronAPIRequestMetaTabDB", {
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
});

contextBridge.exposeInMainWorld("electronAPIBodyXWWWFormUrlencodedDB", {
  getBodyXWWWFormUrlencoded: async (...payload) =>
    await ipcRenderer.invoke("getBodyXWWWFormUrlencoded", ...payload),
  deleteBodyXWWWFormUrlencoded: async (...payload) =>
    await ipcRenderer.invoke("deleteBodyXWWWFormUrlencoded", ...payload),
  deleteBodyXWWWFormUrlencodedByRequestMetaId: async (...payload) =>
    await ipcRenderer.invoke(
      "deleteBodyXWWWFormUrlencodedByRequestMetaId",
      ...payload
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
      ...payload
    ),
  duplicateBodyXWWWFormUrlencoded: async (...payload) =>
    await ipcRenderer.invoke("duplicateBodyXWWWFormUrlencoded", ...payload),
});

contextBridge.exposeInMainWorld("electronAPIBodyFormDataDB", {
  getBodyFormData: async (...payload) =>
    await ipcRenderer.invoke("getBodyFormData", ...payload),
  deleteBodyFormData: async (...payload) =>
    await ipcRenderer.invoke("deleteBodyFormData", ...payload),
  deleteBodyFormDataByRequestMetaId: async (...payload) =>
    await ipcRenderer.invoke("deleteBodyFormDataByRequestMetaId", ...payload),
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
  checkAllBodyFormDataByRequestMetaId: async (...payload) =>
    await ipcRenderer.invoke("checkAllBodyFormDataByRequestMetaId", ...payload),
  duplicateBodyFormData: async (...payload) =>
    await ipcRenderer.invoke("duplicateBodyFormData", ...payload),
});

contextBridge.exposeInMainWorld("electronAPIMetaShowColumnDB", {
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
});

contextBridge.exposeInMainWorld("electronAPIApiUrl", {
  getApiUrlDB: async (...payload) =>
    await ipcRenderer.invoke("getApiUrlDB", ...payload),
  createApiUrl: async (...payload) =>
    await ipcRenderer.invoke("createApiUrl", ...payload),
  duplicateApiUrl: async (...payload) =>
    await ipcRenderer.invoke("duplicateApiUrl", ...payload),
  updateApiUrl: async (...payload) =>
    await ipcRenderer.invoke("updateApiUrl", ...payload),
});

contextBridge.exposeInMainWorld("electronAPIRequest", {
  clearRequestDB: async (...payload) =>
    await ipcRenderer.invoke("clearRequestDB", ...payload),
});

contextBridge.exposeInMainWorld("electronAPIKeyboardShortcut", {
  getKeyboardShortcuts: async (...payload) =>
    await ipcRenderer.invoke("getKeyboardShortcuts", ...payload),
});
