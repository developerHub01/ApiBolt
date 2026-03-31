import { ipcMain } from "electron";
import { ElectronAPITestScriptInterface } from "@shared/types/api/electron-test-script";
import {
  createTestScript,
  deleteTestScript,
  getTestScript,
  updateTestScript,
} from "@/main/db/testScriptDB";
import { executeTest } from "../enginee/testing/executor";

export const testScriptHandler = (): void => {
  ipcMain.handle(
    "getTestScript",
    async (
      _,
      ...rest: Parameters<ElectronAPITestScriptInterface["getTestScript"]>
    ): ReturnType<ElectronAPITestScriptInterface["getTestScript"]> =>
      await getTestScript(...rest),
  );
  ipcMain.handle(
    "createTestScript",
    async (
      _,
      ...rest: Parameters<ElectronAPITestScriptInterface["createTestScript"]>
    ): ReturnType<ElectronAPITestScriptInterface["createTestScript"]> =>
      await createTestScript(...rest),
  );
  ipcMain.handle(
    "updateTestScript",
    async (
      _,
      ...rest: Parameters<ElectronAPITestScriptInterface["updateTestScript"]>
    ): ReturnType<ElectronAPITestScriptInterface["updateTestScript"]> =>
      await updateTestScript(...rest),
  );
  ipcMain.handle(
    "deleteTestScript",
    async (
      _,
      ...rest: Parameters<ElectronAPITestScriptInterface["deleteTestScript"]>
    ): ReturnType<ElectronAPITestScriptInterface["deleteTestScript"]> =>
      await deleteTestScript(...rest),
  );
  ipcMain.handle(
    "runTestScript",
    async (
      _,
      ...[{ requestId, response }]: Parameters<
        ElectronAPITestScriptInterface["runTestScript"]
      >
    ): ReturnType<ElectronAPITestScriptInterface["runTestScript"]> => {
      const script = (await getTestScript(requestId))?.script ?? "";
      if (!script) return;

      executeTest(script, response);
    },
  );
};
