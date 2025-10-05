import type { TRequestCodeType } from "@/types/request-code.type";

export const generateShellCURLCode = () => {};

export const generateShellHTTPieCode = () => {};

export const generateShellWgetCode = () => {};

export const generateShellCode = (type: TRequestCodeType) => {
  switch (type) {
    case "shell-curl":
      return generateShellCURLCode();
    case "shell-httpie":
      return generateShellHTTPieCode();
    case "shell-wget":
      return generateShellCURLCode();
  }
};
