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
  addMultipleBoltCore: async (payload) => {
    if (typeof payload !== "object") return;

    payload = payload.map((item) => ({
      ...item,
      _id: item.id,
      id: undefined,
    }));

    console.log({ payload });
    return await ipcRenderer.invoke("addMultipleBoltCore", payload);
  },
  updateBoltCore: async (id, payload) => {
    if (typeof payload !== "object" || !id) return;

    if (payload.id) payload._id = payload.id;
    delete payload.id;
    return await ipcRenderer.invoke("updateBoltCore", id, payload);
  },
  deleteBoltCore: async (id) => {
    if (!id) return;
    return await ipcRenderer.invoke("deleteBoltCore", id);
  },
  getAllBoltCore: async () => {
    return await ipcRenderer.invoke("getAllBoltCore");
  },
  onBoltCoreChange: (cb) => ipcRenderer.on("boltCoreChange", cb),
});
