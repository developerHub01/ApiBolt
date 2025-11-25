import { app, dialog, ipcMain } from "electron";
import { clearRequestDB } from "../db/requestDB.js";
import {
  getRequestOrFolderMetaById,
  updateRequestOrFolderMeta,
} from "../db/requestOrFolderMetaDB.js";
import { getApiUrlDB, updateApiUrl } from "../db/apiUrlDB.js";
import { getParams, replaceParams } from "../db/paramsDB.js";
import { getHeaders, replaceHeaders } from "../db/headersDB.js";
import {
  getHiddenHeadersCheck,
  updateHiddenHeadersCheck,
} from "../db/hiddenHeadersCheckDB.js";
import {
  getRequestMetaTab,
  updateRequestMetaTab,
} from "../db/requestMetaTabDB.js";
import { getBodyRaw, replaceBodyRaw } from "../db/bodyRawDB.js";
import { getBodyBinary, replaceBodyBinary } from "../db/bodyBinaryDB.js";
import {
  getBodyXWWWFormUrlencoded,
  replaceBodyXWWWFormUrlencoded,
} from "../db/bodyXWWWFormUrlencodedDB.js";
import { getBodyFormData, replaceBodyFormData } from "../db/bodyFormDataDB.js";
import path from "path";
import { readFile, writeFile } from "fs/promises";
import { mainWindow } from "../main.js";
import { getInheritedAuthFromId, replaceAuth } from "../db/authorizationDB.js";
import { getSelectedTab } from "../db/tabsDB.js";
import { runInTransaction } from "../utils/db.js";

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

      const authorization = await getInheritedAuthFromId(id);
      if (authorization) {
        delete authorization["id"];
        delete authorization["projectId"];
        delete authorization["requestOrFolderMetaId"];
      }

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
        authorization,
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
  ipcMain.handle("importRequest", async (_, requestId) => {
    try {
      requestId = requestId ?? (await getSelectedTab());
      if (!requestId) throw new Error("no request selected");

      const { filePaths } = await dialog.showOpenDialog(mainWindow, {
        title: "Open request data",
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

      let fileData = await readFile(filePath, "utf-8");
      try {
        fileData = JSON.parse(fileData);
      } catch (error) {
        throw new Error("Not valid JSON data");
      }

      const {
        name,
        url,
        method,
        params,
        headers,
        hiddenHeadersCheck,
        requestMetaTab,
        bodyRaw,
        bodyBinary,
        bodyXWWWFormUrlencoded,
        bodyFormData,
        authorization,
      } = fileData;

      if (Array.isArray(bodyFormData)) {
        bodyFormData.map((form, index) => {
          if (Array.isArray(form.value)) {
            bodyFormData[index].value = JSON.stringify(
              bodyFormData[index].value
            );
          }
        });
      }

      await runInTransaction(async () => {
        if (
          /**
           * ===================
           * request-meta-data
           * ===================
           */
          !(await updateRequestOrFolderMeta({
            id: requestId,
            name,
            method,
          })) ||
          /**
           * ===================
           * api-url
           * ===================
           */
          !(await updateApiUrl({
            requestOrFolderMetaId: requestId,
            url,
          })) ||
          /**
           * ===================
           * Params
           * ===================
           */
          !(await replaceParams(requestId, params)) ||
          /**
           * ===================
           * Headers
           * ===================
           */
          !(await replaceHeaders(requestId, headers)) ||
          /**
           * ===================
           * Hidden headers check
           * ===================
           */
          !(await updateHiddenHeadersCheck({
            requestOrFolderMetaId: requestId,
            ...hiddenHeadersCheck,
          })) ||
          /**
           * ===================
           * Request meta-tab
           * ===================
           */
          !(await updateRequestMetaTab({
            requestOrFolderMetaId: requestId,
            ...requestMetaTab,
          })) ||
          /**
           * ===================
           * body x-www-formurlencoded
           * ===================
           */
          !(await replaceBodyXWWWFormUrlencoded(
            requestId,
            bodyXWWWFormUrlencoded
          )) ||
          /**
           * ===================
           * body form-data
           * ===================
           */
          !(await replaceBodyFormData(requestId, bodyFormData)) ||
          /**
           * ===================
           * body binary-data
           * ===================
           */
          !(await replaceBodyBinary({
            requestOrFolderMetaId: requestId,
            ...bodyBinary,
          })) ||
          /**
           * ===================
           * body raw-data
           * ===================
           */
          !(await replaceBodyRaw({
            requestOrFolderMetaId: requestId,
            ...bodyRaw,
          })) ||
          /**
           * ===================
           * Authorization
           * ===================
           */
          !(await replaceAuth({
            requestOrFolderId: requestId,
            payload: authorization,
          }))
        ) {
          throw new Error("Not valid request-file.");
        }
      });

      return {
        success: true,
        message: "Request imported successfully!",
      };
    } catch (error) {
      console.error("error ======================\n", error);
      return {
        success: false,
        message:
          error.message ?? "Something went wrong while exporting request.",
      };
    }
  });
};
