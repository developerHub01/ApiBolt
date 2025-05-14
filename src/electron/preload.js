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

  generateJWTToken: (data) => ipcRenderer.invoke("generateJWTToken", data),
});

contextBridge.exposeInMainWorld("electronAPIDB", {
  addBoltCore: async (payload) => {
    if (typeof payload !== "object") return;

    payload._id = payload.id;
    delete payload.id;
    return await ipcRenderer.invoke("addBoltCore", payload);
  },
  getAllBoltCore: async () => {
    return await ipcRenderer.invoke("getAllBoltCore");
  },
});
