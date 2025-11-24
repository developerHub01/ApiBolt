import { app, dialog, ipcMain } from "electron";
import { clearRequestDB } from "../db/requestDB.js";
import { getRequestOrFolderMetaById } from "../db/requestOrFolderMetaDB.js";
import { getApiUrlDB } from "../db/apiUrlDB.js";
import { getParams } from "../db/paramsDB.js";
import { getHeaders } from "../db/headersDB.js";
import { getHiddenHeadersCheck } from "../db/hiddenHeadersCheckDB.js";
import { getRequestMetaTab } from "../db/requestMetaTabDB.js";
import { getBodyRaw } from "../db/bodyRawDB.js";
import { getBodyBinary } from "../db/bodyBinaryDB.js";
import { getBodyXWWWFormUrlencoded } from "../db/bodyXWWWFormUrlencodedDB.js";
import { getBodyFormData } from "../db/bodyFormDataDB.js";
import path from "path";
import { writeFile } from "fs/promises";
import { mainWindow } from "../main.js";

export const requestHandler = () => {
  ipcMain.handle(
    "clearRequestDB",
    async (_, ...rest) => await clearRequestDB(...rest)
  );
  ipcMain.handle("exportRequest", async (_, id) => {
    try {
      const metaResponse = await getRequestOrFolderMetaById(id);
      if (!metaResponse?.method) return false;
      const { name, method } = metaResponse;

      const apiUrlResponse = await getApiUrlDB(id);
      if (!apiUrlResponse?.url) return false;
      const { url } = apiUrlResponse;

      const params = ((await getParams(id)) ?? []).map(
        ({ id, createdAt, requestOrFolderMetaId, ...other }) => ({
          ...other,
        })
      );
      const headers = ((await getHeaders(id)) ?? []).map(
        ({ id, createdAt, requestOrFolderMetaId, ...other }) => ({
          ...other,
        })
      );
      const hiddenHeadersCheck = await getHiddenHeadersCheck(id);
      if (hiddenHeadersCheck) {
        delete hiddenHeadersCheck["id"];
        delete hiddenHeadersCheck["requestOrFolderMetaId"];
      }
      const requestMetaTab = await getRequestMetaTab(id);
      if (requestMetaTab) {
        delete requestMetaTab["id"];
        delete requestMetaTab["requestOrFolderMetaId"];
      }
      const bodyRaw = await getBodyRaw(id);
      if (bodyRaw) {
        delete bodyRaw["id"];
        delete bodyRaw["requestOrFolderMetaId"];
        delete bodyRaw["lineWrap"];
      }
      const bodyBinary = await getBodyBinary(id);
      if (bodyBinary) {
        delete bodyBinary["id"];
        delete bodyBinary["requestOrFolderMetaId"];
      }
      const bodyXWWWFormUrlencoded = (
        (await getBodyXWWWFormUrlencoded(id)) ?? []
      ).map(({ id, createdAt, requestOrFolderMetaId, ...other }) => ({
        ...other,
      }));
      const bodyFormData = ((await getBodyFormData(id)) ?? []).map(
        ({ id, createdAt, requestOrFolderMetaId, ...other }) => ({
          ...other,
        })
      );

      const payload = {
        name,
        method,
        url,
        params,
        headers,
        hiddenHeadersCheck,
        requestMetaTab,
        bodyRaw,
        bodyBinary,
        bodyXWWWFormUrlencoded,
        bodyFormData,
      };

      const { canceled, filePath } = await dialog.showSaveDialog(mainWindow, {
        title: "Save request data",
        defaultPath: path.join(
          app.getPath("downloads"),
          `${name.replaceAll(" ", "_")}_request.json`
        ),
        filters: [
          {
            name: "JSON file",
            extensions: ["json"],
          },
        ],
      });

      if (!canceled && filePath) {
        await writeFile(filePath, JSON.stringify(payload, null, 2));
        return {
          success: true,
          message: "Request exported successfully!",
        };
      } else {
        throw new Error("Save dialog cancelled.");
      }
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message:
          error.message ?? "Something went wrong while exporting request.",
      };
    }
  });
};
