import { VM } from "vm2";
import { ABTestEngine } from "@/main/engine/testing/engine";
import type { ResponseInterface } from "@shared/types/request-response.types";
import type { RunTestScriptResultPayload } from "@shared/types/test-script.types";
import type { TEnvironmentMap } from "@shared/types/environment.types";

interface ExecuteTestMessage {
  script: string;
  response: ResponseInterface;
  envs: TEnvironmentMap;
}

const executeTest = ({
  script,
  response,
  envs,
}: ExecuteTestMessage): RunTestScriptResultPayload => {
  if (!script)
    return {
      success: true,
      result: [],
    };

  const ab = new ABTestEngine(response, envs);

  const serveableAB = Object.freeze({
    addDemoResults: ab.addDemoResults.bind(ab),
    status: ab.status.bind(ab),
    body: ab.body.bind(ab),
    headers: ab.headers.bind(ab),
    cookies: ab.cookies.bind(ab),
    expect: ab.expect.bind(ab),
    print: ab.print.bind(ab),
    getSummary: ab.getSummary.bind(ab),
    summary: ab.summary.bind(ab),
    group: ab.group.bind(ab),
    code: ab.code.bind(ab),
    response: Object.freeze(structuredClone(ab.getResponse())),
    env: Object.freeze(structuredClone(ab.getEnvs())),
  });

  const vm = new VM({
    timeout: 1000,
    sandbox: { ab: serveableAB },
  });

  try {
    vm.run(`"use strict";\\n${script}`);
    return {
      success: true,
      result: ab.getResults(),
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

process.parentPort?.on("message", (event) => {
  try {
    const result = executeTest(event.data as ExecuteTestMessage);
    process.parentPort?.postMessage(result);
  } catch (error) {
    process.parentPort?.postMessage({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    } satisfies RunTestScriptResultPayload);
  }
});
