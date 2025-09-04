import type { THostType, UrlTokenInterface } from "@/types/request-url.types";

export const apiHostTypeList: Array<THostType> = [
  "localhost",
  "127.0.0.1",
  "custom",
];

export const initialUrlTokensValue: Array<UrlTokenInterface> = [
  { id: "protocol", type: "protocol", value: "http" },
  { id: "host", type: "host", value: "localhost" },
  { id: "port", type: "port", value: "3000" },
];
