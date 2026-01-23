export const APP_NAME = "APIBolt";

export const METHOD = ["GET", "POST", "PUT", "PATCH", "DELETE"] as const;

export const JWT_ALGO_LIST = [
  "HS256",
  "HS384",
  "HS512",
  "RS256",
  "RS384",
  "RS512",
  "ES256",
  "ES384",
  "ES512",
  "PS256",
  "none",
];

export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const MAX_REQUEST_RESPONSE_WINDOW_SIZE = 30;
