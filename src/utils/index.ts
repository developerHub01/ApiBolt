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
  try {
    const str = typeof data === "string" ? data : JSON.stringify(data);
    return new TextEncoder().encode(str).length;
  } catch (err) {
    console.error("getPayloadSize error:", err);
    return 0;
  }
};

export const formatSize = (size: number) =>
  size > 1024 ? `${(size / 1024).toFixed(2)} KB` : `${size} B`;