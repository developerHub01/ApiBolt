export const getRawContentType = (subtype) => {
  switch (subtype) {
    case "json":
      return "application/json";
    case "xml":
      return "application/xml";
    case "html":
      return "text/html";
    case "text":
      return "text/plain";
    case "javascript":
      return "application/javascript";
    default:
      return "text/plain";
  }
};
