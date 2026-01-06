import { app, dialog } from "electron";
import { mainWindow } from "@/main/index";
import path from "path";
import { readFile, writeFile } from "fs/promises";
import { ThemeInterface } from "@shared/types/theme.types";

export const saveThemePaletteLocal = async (palette: string) => {
  try {
    if (!mainWindow) throw new Error();

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

export const importThemePaletteInEditor = async () => {
  try {
    if (!mainWindow) throw new Error();

    const { filePaths } = await dialog.showOpenDialog(mainWindow, {
      title: "Import theme palette in editor",
      defaultPath: app.getPath("downloads"),
      filters: [
        {
          name: "JSON file",
          extensions: ["json"],
        },
      ],
    });
    const filePath = filePaths?.[0];
    if (!filePath) throw new Error("No file selected.");
    const fileStringData = await readFile(filePath, "utf-8");
    const fileData = JSON.parse(fileStringData) as ThemeInterface["palette"];

    return fileData;
  } catch (error) {
    console.error(error);
    return null;
  }
};
