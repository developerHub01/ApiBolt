import type { TRequestCodeType } from "@/types/code-snippit.types";

export const generateRHttrCode = () => {};

export const generateRRcurlCode = () => {};

export const generateRCode = (type: TRequestCodeType) => {
  switch (type) {
    case "r-httr":
      return generateRHttrCode();
    case "r-rcurl":
      return generateRRcurlCode();
  }
};
