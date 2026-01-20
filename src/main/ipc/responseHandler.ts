import { app, dialog, ipcMain, IpcMainInvokeEvent } from "electron";
import { ElectronAPIResponseInterface } from "@shared/types/api/electron-response";
import mime from "mime-types";
import { mainWindow } from "@/main/index";
import path from "node:path";
import { writeFile } from "node:fs/promises";

export const responseHandler = (): void => {
  ipcMain.handle(
    "saveResponse",
    async (
      _: IpcMainInvokeEvent,
      ...rest: Parameters<ElectronAPIResponseInterface["saveResponse"]>
    ): Promise<ReturnType<ElectronAPIResponseInterface["saveResponse"]>> => {
      try {
        if (!mainWindow) throw new Error();

        const { data, contentType } = rest[0];

        const extension = mime.extension(contentType);
        const fileName = `response_file.${extension}`;

        let payload: string | Buffer;

        if (extension === "json" && typeof data === "object")
          payload = JSON.stringify(data, null, 2);
        else payload = data as string | Buffer;

        const { canceled, filePath } = await dialog.showSaveDialog(mainWindow, {
          title: "Save response data",
          defaultPath: path.join(app.getPath("downloads"), fileName),
          filters: extension
            ? [
                {
                  name: extension.toUpperCase(),
                  extensions: [extension],
                },
              ]
            : [],
        });

        if (!canceled && filePath) await writeFile(filePath, payload);
        else throw new Error("Save dialog cancelled.");

        return true;
      } catch (error) {
        return false;
      }
    },
  );
};
