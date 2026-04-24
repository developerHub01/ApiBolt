import { ipcMain } from "electron";
import { ElectronAPITestScriptInterface } from "@shared/types/api/electron-test-script";
import {
  createTestScript,
  deleteTestScript,
  duplicateTestScript,
  getTestScript,
  updateTestScript,
} from "@/main/db/testScriptDB";
import { executeTest } from "@/main/engine/testing/executor";
import { TEST_SCRIPT_DEFAULT_ERROR_MESSAGE } from "@shared/constant/test-script";
import { getEnvironmentsMap } from "@/main/db/environmentsDB";

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
      try {
        const script = (await getTestScript(requestId))?.script ?? "";
        if (!script) throw new Error("Script not found");

        const envs = await getEnvironmentsMap();

        return executeTest({
          script,
          response: structuredClone(response),
          envs: structuredClone(envs),
        });
      } catch (error) {
        return {
          success: false,
          message:
            error instanceof Error
              ? error.message
              : TEST_SCRIPT_DEFAULT_ERROR_MESSAGE,
        };
      }
    },
  );
  ipcMain.handle(
    "duplicateTestScript",
    async (
      _,
      ...rest: Parameters<ElectronAPITestScriptInterface["duplicateTestScript"]>
    ): ReturnType<ElectronAPITestScriptInterface["duplicateTestScript"]> =>
      await duplicateTestScript(...rest),
  );
};
