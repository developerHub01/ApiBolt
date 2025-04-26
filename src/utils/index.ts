import { TContentType } from "@/types";

export const getResponseType = (contentType: string): TContentType => {
  if (contentType.includes("application/json")) {
    return "JSON";
  } else if (contentType.includes("text/html")) {
    return "HTML";
  } else if (contentType.includes("text/plain")) {
    return "TEXT";
  } else if (
    contentType.includes("application/javascript") ||
    contentType.includes("application/x-javascript")
  ) {
    return "JavaScript";
  } else if (
    contentType.includes("application/xml") ||
    contentType.includes("text/xml")
  ) {
    return "XML";
  } else {
    return "TEXT";
  }
};
