import type {
  THostType,
  UrlTokenInterface
} from "@shared/types/request-url.types";

export const API_HOST_TYPE_LIST: Array<THostType> = [
  "localhost",
  "127.0.0.1",
  "custom"
];

export const INITIAL_URL_TOKENS_VALUE: Array<UrlTokenInterface> = [
  {
    id: "protocol",
    type: "protocol",
    value: "http:"
  },
  {
    id: "host",
    type: "host",
    value: "localhost"
  },
  {
    id: "port",
    type: "port",
    value: "3000"
  }
];

export const URL_VARIABLE_REGEX = /\{\{([^{}]+)\}\}/g;
export const URL_PURE_VARIABLE_REGEX = /^\{\{([^{}]+)\}\}$/;
