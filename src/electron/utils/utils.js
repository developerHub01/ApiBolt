import jwt from "jsonwebtoken";

export const hasValue = (value) => value !== null && value !== undefined;

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

export const generateJWT = ({ payload, secret, algorithm }) =>
  jwt.sign(payload, secret, {
    algorithm,
  });
