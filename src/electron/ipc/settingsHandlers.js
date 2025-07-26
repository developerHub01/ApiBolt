import { BrowserWindow, ipcMain } from "electron";
import { getSettings, getZoomLevel, updateSettings } from "../db/settingsDB.js";

export const settingsHandlers = () => {
  ipcMain.handle("getSettings", async (_) => await getSettings());
  ipcMain.handle("updateSettings", async (_, ...rest) => {
    try {
      const result = await updateSettings(...rest);

      const payload = rest?.[0] ?? {};
      /* checking is there updating zoomLevel */
      if (result && typeof payload.zoomLevel === "number") {
        /* getting access of focused window */
        const window = BrowserWindow.getFocusedWindow();
        /* getting zoomLevel comparing both global and project based */
        const zoomLevel = await getZoomLevel();

        /* window and zoomlevel found then update zoomLevel */
        if (window && typeof zoomLevel === "number")
          window.webContents.setZoomFactor(zoomLevel);
      }

      return result;
    } catch (error) {
      console.log(error);
    }
  });
};
