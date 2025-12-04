import { app, dialog } from "electron";
import { mainWindow } from "@/main/index.js";
import path from "path";
import { writeFile } from "fs/promises";

export const saveThemePaletteLocal = async (palette: string) => {
  try {
    if (!mainWindow) throw new Error();

    const { canceled, filePath } = await dialog.showSaveDialog(mainWindow, {
      title: "Save theme palette",
      defaultPath: path.join(app.getPath("downloads"), "theme_palette.json"),
      filters: [
        {
          name: "JSON file",
          extensions: ["json"]
        }
      ]
    });

    if (!canceled && filePath) {
      writeFile(filePath, palette);
      return true;
    } else {
      console.warn("Save dialog cancelled.");
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};
