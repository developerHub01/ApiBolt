import { ipcMain } from "electron";
import { ElectronAPITestScriptInterface } from "@shared/types/api/electron-test-script";
import { TEST_SCRIPT_DEFAULT_ERROR_MESSAGE } from "@shared/constant/test-script";
import { getEnvironmentsMap } from "@/main/db/environmentsDB";
import { executeABAutoEngine } from "@/main/engine/testing/ab-auto-engine/executor";

export const testAutoScriptHandler = (): void => {
  ipcMain.handle(
    "runTestScript",
    async (
      _,
      // ...[{ requestId, response }]: Parameters<
      //   ElectronAPITestScriptInterface["runTestScript"]
      // >
    ): ReturnType<ElectronAPITestScriptInterface["runTestScript"]> => {
      try {
        // const script = (await getTestScript(requestId))?.script ?? "";
        const envs = await getEnvironmentsMap();

        return executeABAutoEngine({
          script: "",
          // response: structuredClone(response),
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
};
