import { VM } from "vm2";
import { RunTestScriptResultPayload } from "@shared/types/test-script.types";
import { TEnvironmentMap } from "@shared/types/environment.types";
// import { ABAutoEngine } from "@/main/engine/testing/ab-auto-engine/engine";
// import { ABTestEngine } from "@/main/engine/testing/ab-test-engine/engine";

export const executeABAutoEngine = async ({
  script,
  // envs,
}: {
  script: string;
  envs: TEnvironmentMap;
}): Promise<RunTestScriptResultPayload> => {
  if (!script)
    return {
      success: true,
      result: [],
    };

  // const abTestEngine = new ABTestEngine(response, envs);
  // const abAutoEngine = new ABAutoEngine(response, envs);

  // const abResponse = {
  //   addDemoResults: abTestEngine.addDemoResults.bind(abTestEngine),
  //   status: abTestEngine.status.bind(abTestEngine),
  //   body: abTestEngine.body.bind(abTestEngine),
  //   headers: abTestEngine.headers.bind(abTestEngine),
  //   cookies: abTestEngine.cookies.bind(abTestEngine),
  //   expect: abTestEngine.expect.bind(abTestEngine),
  //   print: abTestEngine.print.bind(abTestEngine),
  //   getSummary: abTestEngine.getSummary.bind(abTestEngine),
  //   summary: abTestEngine.summary.bind(abTestEngine),
  //   group: abTestEngine.group.bind(abTestEngine),
  //   code: abTestEngine.code.bind(abTestEngine),
  //   response: Object.freeze(structuredClone(abTestEngine.getResponse())),
  //   env: Object.freeze(structuredClone(abTestEngine.getEnvs())),
  // };

  const abRequest = {};

  const serveableAB = Object.freeze({
    req: abRequest,
    // res: abResponse,
  });

  const vm = new VM({
    timeout: 1000,
    sandbox: {
      ab: serveableAB,
    },
  });

  try {
    vm.run(`"use strict";\n${script}`);
    // const result = abTestEngine.getResults();
    return {
      success: true,
      // result,
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

console.log(
  await executeABAutoEngine({
    script: "",
    envs: {},
  }),
);
