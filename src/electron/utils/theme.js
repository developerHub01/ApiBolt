import { app, dialog } from "electron";
import { mainWindow } from "../main.js";
import path from "path";
import { writeFile } from "fs/promises";

export const saveThemePaletteLocal = async (palette) => {
  try {
    const { canceled, filePath } = await dialog.showSaveDialog(mainWindow, {
      title: "Save theme palette",
      defaultPath: path.join(app.getPath("downloads"), "theme_palette.json"),
      filters: [
        {
          name: "JSON file",
          extensions: ["json"],
        },
      ],
    });

    if (!canceled && filePath) {
      writeFile(filePath, palette);
    } else {
      console.warn("Save dialog cancelled.");
    }
  } catch (error) {
    console.error(error);
  }
};
