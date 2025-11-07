import type {
  ParamInterface,
  RequestResponseSizeInterface,
  TBinaryData,
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
  params?: Array<ParamInterface>;
  headers?: Array<ParamInterface>;
  authorization?: {
    type: TAuthType;
    inheritedId?: string | null;
    basicAuth?: BasicAuthInterface;
    bearerAuth?: TBearerToken;
    jwtAuth?: JWTBearerAuthInterface;
    apiKeyAuth?: APIKeyInterface;
  };
  body?: {
    type: TRequestBodyType;
    formData?: Array<ParamInterface>;
    xWWWFormUrlencoded?: Array<ParamInterface>;
    binaryData?: TBinaryData;
    rawType?: TContentType;
    raw?: string;
  };
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
