import { VM } from "vm2";
import { ABTestEngine } from "@/main/engine/testing/engine";
import { ResponseInterface } from "@shared/types/request-response.types";
import { RunTestScriptResultPayload } from "@shared/types/test-script.types";
import { TEnvironmentMap } from "@shared/types/environment.types";

export const executeTest = ({
  script,
  response,
  envs,
}: {
  script: string;
  response: ResponseInterface;
  envs: TEnvironmentMap;
}): RunTestScriptResultPayload => {
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
    sandbox: {
      ab: serveableAB,
    },
  });

  try {
    vm.run(`"use strict";\n${script}`);
    const result = ab.getResults();
    return {
      success: true,
      result,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(message);
    return {
      success: false,
      message,
    };
  }
};
