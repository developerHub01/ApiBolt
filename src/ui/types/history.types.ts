import type {
  ParamInterface,
  RequestResponseSizeInterface,
  TContentType,
  THTTPMethods,
  TRequestBodyType,
} from "@/types/request-response.types";
import type {
  APIKeyInterface,
  BasicAuthInterface,
  JWTBearerAuthInterface,
  TAuthType,
  TBearerToken,
} from "@/types/authorization.types";

export interface HistoryItemInterface {
  id: string;
  url: string;
  method: THTTPMethods;
  name: string;
  request: string;
  authorization?: {
    type: TAuthType;
    inheritedId?: string | null;
    basicAuth?: BasicAuthInterface;
    bearerAuth?: TBearerToken;
    jwtAuth?: JWTBearerAuthInterface;
    apiKeyAuth?: APIKeyInterface;
  };
  params?: Array<ParamInterface>;
  headers?: Array<ParamInterface>;
  formData?: Array<ParamInterface>;
  xWWWFormUrlencoded?: Array<ParamInterface>;
  binaryData?: string;
  raw?: string;
  rawType?: TContentType;
  requestBodyType?: TRequestBodyType;
  responseStatus?: string;
  responseSize?: {
    requestSize: RequestResponseSizeInterface;
    responseSize: RequestResponseSizeInterface;
  };
  createdAt?: string;
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
