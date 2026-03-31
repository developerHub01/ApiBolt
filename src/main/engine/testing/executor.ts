import { VM } from "vm2";
import { ABTestEngine } from "@/main/engine/testing/engine";
import { ResponseInterface } from "@shared/types/request-response.types";

export const executeTest = (code: string, response: ResponseInterface) => {
  const ab = new ABTestEngine(response);

  const vm = new VM({
    timeout: 1000,
    sandbox: { ab },
  });

  try {
    vm.run(`"use strict";\n${code}`);
    return {
      success: true,
      result: ab.getResults(),
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
