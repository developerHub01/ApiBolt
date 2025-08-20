import fs from "fs";
import path from "path";
import { dialog, ipcMain } from "electron";
import {
  checkAllBodyFormDataByRequestMetaId,
  createBodyFormData,
  deleteBodyFormData,
  deleteBodyFormDataByRequestMetaId,
  deleteBodyFormDataFile,
  getBodyFormData,
  getBodyFormDataByFormId,
  updateBodyFormData,
} from "../db/bodyFormDataDB.js";

export const bodyFormDataHandlers = () => {
  ipcMain.handle("getBodyFormData", async (_, ...rest) => {
    let result = await getBodyFormData(...rest);

    /* checking file existance, if not then showing null as flag */
    result = result.map((form) => {
      if (!Array.isArray(form.value) || !form.value) return form;

      form.value = form.value?.map((filePath) => {
        if (!filePath || !fs.existsSync(filePath)) return null;
        return filePath;
      });

      return form;
    });

    /* filtering the non-existing files from db start */
    try {
      /* extracting non-existing files */
      const needUpdateMissingFileInDB = result
        .filter((formData) => {
          if (!Array.isArray(formData.value)) return false;

          return formData.value?.some((item) => !item);
        })
        .map((formData) => ({
          id: formData.id,
          value: formData.value.filter(Boolean),
        }));

      /* updating in db removing file path of non-existing */
      if (needUpdateMissingFileInDB && needUpdateMissingFileInDB?.length)
        await Promise.all(
          needUpdateMissingFileInDB.map(async (formData) => {
            return await updateBodyFormData(formData.id, {
              value: (formData?.value ?? []).length
                ? JSON.stringify([...formData?.value])
                : "",
            });
          })
        );
    } catch {}
    /* filtering the non-existing files from db end */

    /* extracting names of files from os */
    result = result.map((formData) => {
      if (!Array.isArray(formData.value)) return formData;

      try {
        return {
          ...formData,
          value: formData.value.map((filePath) => path.basename(filePath)),
        };
      } catch (error) {
        return formData;
      }
    });

    return result;
  });
  ipcMain.handle(
    "deleteBodyFormData",
    async (_, ...rest) => await deleteBodyFormData(...rest)
  );
  ipcMain.handle(
    "deleteBodyFormDataByRequestMetaId",
    async (_, ...rest) => await deleteBodyFormDataByRequestMetaId(...rest)
  );
  ipcMain.handle(
    "deleteBodyFormDataFile",
    async (_, ...rest) => await deleteBodyFormDataFile(...rest)
  );
  ipcMain.handle(
    "createBodyFormData",
    async (_, ...rest) => await createBodyFormData(...rest)
  );
  ipcMain.handle(
    "updateBodyFormData",
    async (_, ...rest) => await updateBodyFormData(...rest)
  );
  ipcMain.handle("updateBodyFormDataFile", async (_, ...rest) => {
    try {
      const id = rest?.[0];
      if (!id) return false;

      const formData = await getBodyFormDataByFormId(id);
      if (!formData) return false;

      let prevValue = Array.isArray(formData.value) ? formData.value : [];

      let result = await dialog.showOpenDialog({
        properties: ["openFile"],
        title: "Select file",
        buttonLabel: "Select",
      });

      result = result?.filePaths;
      if (!Array.isArray(result)) return;

      return await updateBodyFormData(id, {
        value: JSON.stringify([...prevValue, ...result]),
      });
    } catch (error) {
      return false;
    }
  });
  ipcMain.handle(
    "checkAllBodyFormDataByRequestMetaId",
    async (_, ...rest) => await checkAllBodyFormDataByRequestMetaId(...rest)
  );
};
