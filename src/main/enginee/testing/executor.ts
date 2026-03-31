import { VM } from "vm2";
import { ABTestEngine } from "@/main/enginee/testing/enginee";
import { ResponseInterface } from "@shared/types/request-response.types";

export const executeTest = (code: string, response: ResponseInterface) => {
  const ab = new ABTestEngine(code);

  const vm = new VM({
    timeout: 1000,
    sandbox: { ab },
  });

  try {
    vm.run(`"use strict";\n${code}`);
    console.log(ab.getResults());
  } catch (error) {
    // console.error(error);
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(message);
  }
};
