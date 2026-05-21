import { app, BrowserWindow } from "electron";
import { API_BOLT_PROTOCOL } from "@shared/constant";

const PROTOCOL = API_BOLT_PROTOCOL;

/* Register with OS: "API_BOLT_PROTOCOL:// links should open this app" */
export const initDeepLink = (mainWindow: BrowserWindow | null) => {
  if (process.defaultApp && process.argv.length >= 2) {
    /* Dev mode on Windows */
    app.setAsDefaultProtocolClient(PROTOCOL, process.execPath, [
      process.argv[1],
    ]);
  } else {
    /* Prod mode */
    app.setAsDefaultProtocolClient(PROTOCOL);
  }

  /* link clicked while app already running */
  app.on("open-url", (e, url) => {
    e.preventDefault(); /* stop OS from opening in browser */
    if (mainWindow?.webContents) {
      mainWindow.webContents.send(
        "deep-link",
        url,
      ); /* forward raw URL to renderer */
    }
  });
};

/* Helper to forward link from process.argv or commandLine (Windows/Linux) */
export const forwardDeepLink = (
  args: Array<string>,
  getMainWindow: () => BrowserWindow | null,
) => {
  const url = args.find(arg => arg.startsWith(`${PROTOCOL}://`));

  try {
    if (!url) throw new Error("empty url");
    const parsed = new URL(url);
    if (parsed.protocol !== `${PROTOCOL}:`) throw new Error("invalid url");
  } catch (error) {
    console.error(error);
  }

  const mainWindow = getMainWindow();
  if (url && mainWindow?.webContents)
    mainWindow.webContents.send("deep-link", url);
};
