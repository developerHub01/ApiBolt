import { utilityProcess } from "electron";
import { resolve } from "node:path";
import type { ResponseInterface } from "@shared/types/request-response.types";
import type { RunTestScriptResultPayload } from "@shared/types/test-script.types";
import type { TEnvironmentMap } from "@shared/types/environment.types";

const EXECUTION_TIMEOUT_MS = 1500;

export const executeTest = ({
  script,
  response,
  envs,
}: {
  script: string;
  response: ResponseInterface;
  envs: TEnvironmentMap;
}): Promise<RunTestScriptResultPayload> => {
  if (!script)
    return Promise.resolve({
      success: true,
      result: [],
    });

  return new Promise((resolveResult) => {
    let settled = false;
    let timeout: NodeJS.Timeout | undefined;

    const finish = (result: RunTestScriptResultPayload) => {
      if (settled) return;
      settled = true;
      if (timeout) clearTimeout(timeout);
      child.kill();
      resolveResult(result);
    };

    const child = utilityProcess.fork(
      resolve(__dirname, "test-script-worker.js"),
      [],
      {
        serviceName: "API Bolt test script",
        stdio: "ignore",
      },
    );

    child.on("message", (event) => {
      finish(event.data as RunTestScriptResultPayload);
    });

    child.on("exit", (code) => {
      if (settled) return;
      finish({
        success: false,
        message: `Test script worker exited before returning a result (code: ${code ?? "unknown"}).`,
      });
    });

    child.on("error", (error) => {
      finish({
        success: false,
        message: error.message || "Failed to start the test script worker.",
      });
    });

    timeout = setTimeout(() => {
      finish({
        success: false,
        message: `Test script exceeded the ${EXECUTION_TIMEOUT_MS}ms execution limit.`,
      });
    }, EXECUTION_TIMEOUT_MS);

    child.postMessage({
      script,
      response: structuredClone(response),
      envs: structuredClone(envs),
    });
  });
};
