import { ipcMain } from "electron";
import { generateJWT } from "@/main/utils/utils.js";

export const jsonWebTokenHandlers = () => {
  ipcMain.handle("generateJWTToken", (_, { payload, secret, algorithm }) => {
    return generateJWT({
      payload,
      secret,
      algorithm,
    });
  });
};
