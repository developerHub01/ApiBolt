const { contextBridge, ipcRenderer } = require("electron");

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
