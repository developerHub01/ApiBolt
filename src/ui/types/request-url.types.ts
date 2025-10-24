export type THostType = "localhost" | "127.0.0.1" | "custom";

export type TAPIUrlTokenType = "protocol" | "host" | "port" | "text" | "env";

export type TAPIUrlOriginTokenType = Extract<
  TAPIUrlTokenType,
  "protocol" | "host" | "port"
>;

export interface UrlTokenInterface {
  id: string;
  type: TAPIUrlTokenType;
  value: string;
}

export interface ApiUrlPayload {
  url: string;
}

export interface ApiUrlDuplicatePayloadItem extends ApiUrlPayload {
  requestOrFolderMetaId: string;
}
