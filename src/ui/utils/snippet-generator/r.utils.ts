import type { TRequestCodeType } from "@/types/request-code.type";

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
