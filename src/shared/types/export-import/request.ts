import {
  BodyBinaryInterface,
  BodyRawInterface,
  HiddenHeadersCheckInterface,
  ParamHeaderBuildPayloadInterface,
  ParamHeaderPayloadInterface,
  RequestTabInterface,
  THTTPMethods
} from "@/shared/types/request-response.types";
import { AuthorizationPayloadInterface } from "@/shared/types/authorization.types";

interface Param extends Omit<
  ParamHeaderBuildPayloadInterface,
  "id" | "requestOrFolderMetaId" | "createdAt" | "isCheck"
> {
  isCheck: number;
}

interface Header extends Omit<
  ParamHeaderPayloadInterface,
  "id" | "requestOrFolderMetaId" | "createdAt" | "isCheck"
> {
  isCheck: number;
}

type HiddenHeaders = {
  [K in keyof HiddenHeadersCheckInterface]: number;
};

export interface RequestExportFileInterface {
  name: string;
  method: THTTPMethods;
  url: string;
  params: Array<Param>;
  headers: Array<Header>;
  hiddenHeadersCheck: HiddenHeaders;
  requestMetaTab: Omit<RequestTabInterface, "requestOrFolderMetaId">;
  bodyRaw: Pick<BodyRawInterface, "type" | "rawData">;
  bodyBinary: Pick<BodyBinaryInterface, "path">;
  bodyXWWWFormUrlencoded: Array<Header>;
  bodyFormData: RequestExportFileInterface["params"];
  authorization: Omit<
    AuthorizationPayloadInterface,
    "id" | "projectId" | "requestOrFolderMetaId"
  >;
}
