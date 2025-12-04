import type {
  ParamInterface,
  RequestResponseSizeInterface,
  TBinaryData,
  TContentType,
  THTTPMethods,
  TRequestBodyType
} from "@/shared/types/request-response.types";
import type {
  APIKeyInterface,
  BasicAuthInterface,
  JWTBearerAuthInterface,
  TAuthType,
  TBearerToken
} from "@/shared/types/authorization.types";

export interface HistoryItemInterface {
  id: string;
  url: string;
  method: THTTPMethods;
  name: string;
  request: string;
  params?: Array<ParamInterface> | null;
  headers?: Array<ParamInterface> | null;
  authorization?: {
    type: TAuthType;
    inheritedId?: string | null;
    basicAuth?: BasicAuthInterface;
    bearerAuth?: TBearerToken;
    jwtAuth?: JWTBearerAuthInterface;
    apiKeyAuth?: APIKeyInterface;
  } | null;
  body?: {
    type: TRequestBodyType;
    formData?: Array<ParamInterface>;
    xWWWFormUrlencoded?: Array<ParamInterface>;
    binaryData?: TBinaryData;
    rawType?: TContentType;
    raw?: string;
  } | null;
  responseStatus?: string | null;
  responseSize?: {
    requestSize: RequestResponseSizeInterface;
    responseSize: RequestResponseSizeInterface;
  } | null;
  createdAt?: string | null;
}

export type HistoryItemMetaInterface = Pick<
  HistoryItemInterface,
  "id" | "method" | "responseStatus" | "createdAt"
>;

export type CreateHistoryItemInterface = Omit<
  HistoryItemInterface,
  "id" | "createdAt"
>;

export type THistoryFilter = THTTPMethods | "all";
