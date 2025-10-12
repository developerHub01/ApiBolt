import type { TRequestCodeType } from "@/types/code-snippit.types";

export const generatePowerShellInvokeRestMethodCode = () => {};

export const generatePowerShellInvokeWebRequestCode = () => {};

export const generatePowerShellCode = (type: TRequestCodeType) => {
  switch (type) {
    case "powershell-invoke-restmethod":
      return generatePowerShellInvokeRestMethodCode();
    case "powershell-invoke-webrequest":
      return generatePowerShellInvokeWebRequestCode();
  }
};
