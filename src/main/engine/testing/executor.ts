import { VM } from "vm2";
import { ABTestEngine } from "@/main/engine/testing/engine";
import { ResponseInterface } from "@shared/types/request-response.types";
import { RunTestScriptResultPayload } from "@shared/types/test-script.types";

export const executeTest = (
  code: string,
  response: ResponseInterface,
): RunTestScriptResultPayload => {
  const ab = new ABTestEngine(response);

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
    response: ab.getResponse(),
  });

  const vm = new VM({
    timeout: 1000,
    sandbox: {
      ab: serveableAB,
    },
  });

  try {
    vm.run(`"use strict";\n${code}`);
    const result = ab.getResults();
    console.log(result);
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
