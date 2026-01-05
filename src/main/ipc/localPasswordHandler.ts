import { ipcMain } from "electron";
import {
  changeLocalPassword,
  getLocalPassword,
} from "@/main/db/localPasswordDB";
import { ElectronAPILocalPasswordInterface } from "@shared/types/api/electron-local-password";
import { closeLocalPassword, showMainWindow } from "@/main/index";
import bcrypt from "bcryptjs";

export const PASSWORD_SALT = 12;

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
      const hasedPassword = await getLocalPassword();
      if (!hasedPassword) return false;

      return bcrypt.compare(payload, hasedPassword);
    },
  );
  ipcMain.handle(
    "setLocalPasswordValid",
    async (): ReturnType<
      ElectronAPILocalPasswordInterface["setLocalPasswordValid"]
    > => {
      closeLocalPassword();
      showMainWindow();
    },
  );
  ipcMain.handle(
    "changeLocalPassword",
    async (
      _,
      ...rest: Parameters<
        ElectronAPILocalPasswordInterface["changeLocalPassword"]
      >
    ): ReturnType<ElectronAPILocalPasswordInterface["changeLocalPassword"]> => {
      const password = rest[0];

      const hasedPassword = password
        ? await bcrypt.hash(password, PASSWORD_SALT)
        : null;
      return await changeLocalPassword(hasedPassword);
    },
  );
};
