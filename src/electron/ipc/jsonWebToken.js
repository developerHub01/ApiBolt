import { ipcMain } from "electron";
import jwt from "jsonwebtoken";

export const jsonWebTokenHandlers = () => {
  ipcMain.handle("generateJWTToken", (_, { payload, secret, algorithm }) => {
    return jwt.sign(payload, secret, {
      algorithm,
    });
  });
};
