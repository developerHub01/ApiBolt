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
  url: string;
  method: THTTPMethods;
  authorization: {
    type: TAuthType;
    data?:
      | BasicAuthInterface
      | TBearerToken
      | JWTBearerAuthInterface
      | APIKeyInterface;
  };
  body: {
    selected: TRequestBodyType;
    rawData: string;
    headers: Array<ParamInterface>;
    formData: Array<ParamInterface>;
    xWWWFormUrlencodedData: Array<ParamInterface>;
    binaryData: string | null;
    rawRequestBodyType: TContentType;
  };
  status?: {
    code: string;
    details: string;
  };
  size?: {
    requestSize: RequestResponseSizeInterface;
    responseSize: RequestResponseSizeInterface;
  };
}
