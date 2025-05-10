const { contextBridge, ipcRenderer } = require("electron");

console.log("⚙️ Preload script running...");

contextBridge.exposeInMainWorld("electronAPI", {
  getCookiesFromUrl: async (url) => {
    const cookieURL = new URL(url).origin;
    return await ipcRenderer.invoke("getCookies", cookieURL);
  },
  sayHello: () => {
    console.log("Hello from the preload script!");
  },
  fetchApi: async (payload) => {
    return await ipcRenderer.invoke("fetchApi", payload);
  },
  getAllCookies: async () => {
    return await ipcRenderer.invoke("getAllCookies");
  },
  getCookieByDomain: async (domain) => {
    return await ipcRenderer.invoke("getCookieByDomain", domain);
  },
});
