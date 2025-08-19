const { contextBridge, ipcRenderer, webFrame } = require("electron");

/* =================================== */
ipcRenderer.on("set-zoom", (_, zoomLevel) => {
  webFrame.setZoomFactor(zoomLevel < 0 ? 1 : zoomLevel);
});
/* =================================== */

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

  windowControls: (type) => ipcRenderer.invoke("windowControls", type),
  isWindowMaximized: () => ipcRenderer.invoke("isWindowMaximized"),
  onWindowMaximizeChange: (callback) => {
    ipcRenderer.on("windowMaximizeChange", (_, isMaximized) => {
      callback(isMaximized);
    });
  },

  generateJWTToken: (data) => ipcRenderer.invoke("generateJWTToken", data),
});

contextBridge.exposeInMainWorld("electronAPIZoom", {
  setZoom: (factor) => webFrame.setZoomFactor(factor),
  getZoom: () => webFrame.getZoomFactor(),
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
  getAuth: async () => await ipcRenderer.invoke("getAuth"),
  createAuth: async () => await ipcRenderer.invoke("createAuth"),
  updateAuth: async (...payload) =>
    await ipcRenderer.invoke("updateAuth", ...payload),
  deleteAuth: async (...payload) =>
    await ipcRenderer.invoke("deleteAuth", ...payload),
});

contextBridge.exposeInMainWorld("electronAPIRequestOrFolderMetaDB", {
  getRequestOrFolderMeta: async () =>
    await ipcRenderer.invoke("getRequestOrFolderMeta"),
  createRequestOrFolderMeta: async (...payload) =>
    await ipcRenderer.invoke("createRequestOrFolderMeta", ...payload),
  updateRequestOrFolderMeta: async (...payload) =>
    await ipcRenderer.invoke("updateRequestOrFolderMeta", ...payload),
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
  checkAllParamsByRequestMetaId: async (...payload) =>
    await ipcRenderer.invoke("checkAllParamsByRequestMetaId", ...payload),
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
  checkAllHeadersByRequestMetaId: async (...payload) =>
    await ipcRenderer.invoke("checkAllHeadersByRequestMetaId", ...payload),
});

contextBridge.exposeInMainWorld("electronAPIHiddenHeadersCheckTableDB", {
  getHiddenHeadersCheck: async (...payload) =>
    await ipcRenderer.invoke("getHiddenHeadersCheck", ...payload),
  createHiddenHeadersCheck: async (...payload) =>
    await ipcRenderer.invoke("createHiddenHeadersCheck", ...payload),
  updateHiddenHeadersCheck: async (...payload) =>
    await ipcRenderer.invoke("updateHiddenHeadersCheck", ...payload),
});

contextBridge.exposeInMainWorld("electronAPIBodyRawDB", {
  getBodyRaw: async (...payload) =>
    await ipcRenderer.invoke("getBodyRaw", ...payload),
  createBodyRaw: async (...payload) =>
    await ipcRenderer.invoke("createBodyRaw", ...payload),
  updateBodyRaw: async (...payload) =>
    await ipcRenderer.invoke("updateBodyRaw", ...payload),
});
