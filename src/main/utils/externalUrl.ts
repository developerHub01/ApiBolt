import { dialog, shell } from "electron";
import { mainWindow } from "@/main/index.js";

const allowedProtocols = new Set(["http:", "https:"]);

export const handleExternalUrl = async (url: string) => {
  const parsedUrl = maybeParseUrl(url);
  if (!parsedUrl || !mainWindow) return;

  const { protocol } = parsedUrl;
  // We could handle all possible link cases here, not only http/https
  if (!allowedProtocols.has(protocol)) return;

  try {
    const { response } = await dialog.showMessageBox(mainWindow, {
      type: "warning",
      title: "Open External Link",
      message: "An external link is about to be opened.",
      detail:
        "The link you selected will be opened in your default browser. Make sure you trust the source before continuing.",
      buttons: ["Cancel", "Open Link"],
      defaultId: 1,
      cancelId: 0,
    });

    if (response !== 1) return;
  } catch (error) {
    console.error(error);
  }

  try {
    await shell.openExternal(url);
  } catch (error) {
    console.error(`Failed to open url: ${error}`);
  }
};

export const maybeParseUrl = (url: string): URL | null => {
  try {
    return new URL(url);
  } catch (err) {
    console.error(`Failed to parse url: ${url}`);
    return null;
  }
};
