import type { TRequestCodeType } from "@/types/code-snippit.types";

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
