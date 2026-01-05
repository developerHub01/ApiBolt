import { ipcMain } from "electron";
import {
  changeLocalPassword,
  getLocalPassword,
} from "@/main/db/localPasswordDB";
import { ElectronAPILocalPasswordInterface } from "@shared/types/api/electron-local-password";

export const localPasswordHandler = () => {
  ipcMain.handle(
    "getLocalPassword",
    async (
      _,
      ...rest: Parameters<ElectronAPILocalPasswordInterface["getLocalPassword"]>
    ): ReturnType<ElectronAPILocalPasswordInterface["getLocalPassword"]> =>
      await getLocalPassword(...rest),
  );
  ipcMain.handle(
    "getHaveLocalPassword",
    async (
      _,
      ...rest: Parameters<
        ElectronAPILocalPasswordInterface["getHaveLocalPassword"]
      >
    ): ReturnType<ElectronAPILocalPasswordInterface["getHaveLocalPassword"]> =>
      Boolean(await getLocalPassword(...rest)),
  );
  ipcMain.handle(
    "matchLocalPassword",
    async (
      _,
      ...rest: Parameters<
        ElectronAPILocalPasswordInterface["matchLocalPassword"]
      >
    ): ReturnType<ElectronAPILocalPasswordInterface["matchLocalPassword"]> => {
      const payload = rest[0];
      const password = await getLocalPassword();
      return payload === password;
    },
  );
  ipcMain.handle(
    "changeLocalPassword",
    async (
      _,
      ...rest: Parameters<
        ElectronAPILocalPasswordInterface["changeLocalPassword"]
      >
    ): ReturnType<ElectronAPILocalPasswordInterface["changeLocalPassword"]> =>
      await changeLocalPassword(...rest),
  );
};
