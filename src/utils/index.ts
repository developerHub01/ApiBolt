export const getResponseType = (contentType: string) => {
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

export const getPayloadSize = (data: any): number => {
  console.log({ data });
  try {
    const str = typeof data === "string" ? data : JSON.stringify(data);
    // return new TextEncoder().encode(str).length;
    return new Blob([str]).size;
  } catch (err) {
    console.error("getPayloadSize error:", err);
    return 0;
  }
};
