import fs from "fs";
import path from "path";
import { dialog, ipcMain } from "electron";
import {
  checkAllBodyFormDataByRequestMetaId,
  createBodyFormData,
  deleteBodyFormData,
  deleteBodyFormDataByRequestMetaId,
  deleteBodyFormDataFile,
  duplicateBodyFormData,
  getBodyFormData,
  getBodyFormDataByFormId,
  replaceBodyFormData,
  replaceFullBodyFormData,
  updateBodyFormData
} from "@/main/db/bodyFormDataDB.js";
import { ElectronAPIBodyFormDataInterface } from "@/shared/types/api/electron-body-form";
import {
  FileDataInterface,
  FormDataPayloadInterface
} from "@/shared/types/request-response.types";

export const bodyFormDataHandlers = () => {
  ipcMain.handle(
    "getBodyFormData",
    async (
      _,
      ...rest: Parameters<ElectronAPIBodyFormDataInterface["getBodyFormData"]>
    ): ReturnType<ElectronAPIBodyFormDataInterface["getBodyFormData"]> => {
      const rawResult = (await getBodyFormData(...rest)).map(form => {
        if (!Array.isArray(form.value) || !form.value) return form;
        return {
          ...form,
          /* checking file existance, if not then showing null as flag */
          value: form.value?.map(filePath => {
            if (!filePath || !fs.existsSync(filePath)) return null;
            return filePath;
          })
        };
      });

      /* filtering the non-existing files from db start */

      /* extracting non-existing files */
      const needUpdateMissingFileInDB = rawResult
        .filter(formData => {
          if (!Array.isArray(formData.value)) return false;
          return formData.value?.some(item => !item);
        })
        .map(formData => ({
          id: formData.id,
          value: (formData.value as Array<string>).filter(Boolean)
        }));

      /* updating in db removing file path of non-existing */
      if (needUpdateMissingFileInDB && needUpdateMissingFileInDB?.length)
        await Promise.all(
          needUpdateMissingFileInDB.map(async formData => {
            return await updateBodyFormData(formData.id, {
              value: (formData?.value ?? []).length
                ? JSON.stringify([...formData.value])
                : ""
            });
          })
        );

      /* filtering the non-existing files from db end */

      /* extracting names of files from os */
      const result: Array<FormDataPayloadInterface> = rawResult.map(
        formData => {
          if (!Array.isArray(formData.value))
            return formData as FormDataPayloadInterface;

          try {
            return {
              ...formData,
              value: (formData.value as Array<string>).map(
                filePath =>
                  ({
                    file: path.basename(filePath),
                    path: filePath
                  }) as FileDataInterface
              )
            };
          } catch (error) {
            return formData as FormDataPayloadInterface;
          }
        }
      );

      return result;
    }
  );
  ipcMain.handle(
    "deleteBodyFormData",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIBodyFormDataInterface["deleteBodyFormData"]
      >
    ): ReturnType<ElectronAPIBodyFormDataInterface["deleteBodyFormData"]> =>
      await deleteBodyFormData(...rest)
  );
  ipcMain.handle(
    "deleteBodyFormDataByRequestMetaId",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIBodyFormDataInterface["deleteBodyFormDataByRequestMetaId"]
      >
    ): ReturnType<
      ElectronAPIBodyFormDataInterface["deleteBodyFormDataByRequestMetaId"]
    > => await deleteBodyFormDataByRequestMetaId(...rest)
  );
  ipcMain.handle(
    "deleteBodyFormDataFile",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIBodyFormDataInterface["deleteBodyFormDataFile"]
      >
    ): ReturnType<ElectronAPIBodyFormDataInterface["deleteBodyFormDataFile"]> =>
      await deleteBodyFormDataFile(...rest)
  );
  ipcMain.handle(
    "createBodyFormData",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIBodyFormDataInterface["createBodyFormData"]
      >
    ): ReturnType<ElectronAPIBodyFormDataInterface["createBodyFormData"]> =>
      await createBodyFormData(...rest)
  );
  ipcMain.handle(
    "updateBodyFormData",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIBodyFormDataInterface["updateBodyFormData"]
      >
    ): ReturnType<ElectronAPIBodyFormDataInterface["updateBodyFormData"]> =>
      await updateBodyFormData(...rest)
  );
  ipcMain.handle(
    "updateBodyFormDataFile",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIBodyFormDataInterface["updateBodyFormDataFile"]
      >
    ): ReturnType<
      ElectronAPIBodyFormDataInterface["updateBodyFormDataFile"]
    > => {
      try {
        const id = rest?.[0];
        if (!id) throw new Error();

        const formData = await getBodyFormDataByFormId(id);
        if (!formData) throw new Error();

        const prevValue = Array.isArray(formData.value) ? formData.value : [];

        const result = await dialog.showOpenDialog({
          properties: ["openFile"],
          title: "Select file",
          buttonLabel: "Select"
        });

        const filePath = result?.filePaths;
        if (!Array.isArray(filePath)) throw new Error();

        return await updateBodyFormData(id, {
          value: JSON.stringify([...prevValue, ...filePath])
        });
      } catch (error) {
        return false;
      }
    }
  );
  ipcMain.handle(
    "replaceBodyFormData",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIBodyFormDataInterface["replaceBodyFormData"]
      >
    ): ReturnType<ElectronAPIBodyFormDataInterface["replaceBodyFormData"]> =>
      await replaceBodyFormData(...rest)
  );
  ipcMain.handle(
    "replaceFullBodyFormData",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIBodyFormDataInterface["replaceFullBodyFormData"]
      >
    ): ReturnType<
      ElectronAPIBodyFormDataInterface["replaceFullBodyFormData"]
    > => await replaceFullBodyFormData(...rest)
  );
  ipcMain.handle(
    "checkAllBodyFormDataByRequestMetaId",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIBodyFormDataInterface["checkAllBodyFormDataByRequestMetaId"]
      >
    ): ReturnType<
      ElectronAPIBodyFormDataInterface["checkAllBodyFormDataByRequestMetaId"]
    > => await checkAllBodyFormDataByRequestMetaId(...rest)
  );
  ipcMain.handle(
    "duplicateBodyFormData",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIBodyFormDataInterface["duplicateBodyFormData"]
      >
    ): ReturnType<ElectronAPIBodyFormDataInterface["duplicateBodyFormData"]> =>
      await duplicateBodyFormData(...rest)
  );
};
