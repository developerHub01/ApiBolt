import type { TRequestCodeType } from "@/types/request-code.type";

export const generatePHPCURLCode = () => {};

export const generatePHPFileGetContentsCode = () => {};

export const generatePHPGuzzleCode = () => {};

export const generatePHPCode = (type: TRequestCodeType) => {
  switch (type) {
    case "php-curl":
      return generatePHPCURLCode();
    case "php-guzzle":
      return generatePHPGuzzleCode();
    case "php-file-get-contents":
      return generatePHPFileGetContentsCode();
  }
};
