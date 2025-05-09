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
    console.log("Fetching API with payload:", payload);
    return await ipcRenderer.invoke("fetchApi", payload);
  },
});
