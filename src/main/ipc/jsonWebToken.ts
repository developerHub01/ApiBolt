import { ipcMain } from "electron";
import { generateJWT } from "@/main/utils/utils.js";
import { ElectronAPIInterface } from "@/shared/types/api/electron-api";

export const jsonWebTokenHandlers = () => {
  ipcMain.handle(
    "generateJWTToken",
    (
      _,
      ...rest: Parameters<ElectronAPIInterface["generateJWTToken"]>
    ): ReturnType<ElectronAPIInterface["generateJWTToken"]> => {
      const { payload, secret, algorithm } = rest[0];

      return Promise.resolve(
        generateJWT({
          payload,
          secret,
          algorithm
        })
      );
    }
  );
};
