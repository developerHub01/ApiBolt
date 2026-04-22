import {
  BodyBinaryInterface,
  BodyRawInterface,
  HiddenHeadersCheckInterface,
  ParamHeaderBuildPayloadInterface,
  ParamHeaderPayloadInterface,
  RequestTabInterface,
  THTTPMethods,
} from "@shared/types/request-response.types";
import { AuthorizationPayloadInterface } from "@shared/types/authorization.types";
import { TestScriptPayloadInterface } from "@shared/types/test-script.types";

interface Param extends Omit<
  ParamHeaderBuildPayloadInterface,
  "id" | "requestOrFolderMetaId" | "createdAt"
> {}

interface Header extends Omit<
  ParamHeaderPayloadInterface,
  "id" | "requestOrFolderMetaId" | "createdAt"
> {}

export interface RequestExportFileInterface {
  type: "request";
  name: string;
  method: THTTPMethods;
  url: string;
  params: Array<Param>;
  headers: Array<Header>;
  hiddenHeadersCheck: HiddenHeadersCheckInterface;
  requestMetaTab: Omit<RequestTabInterface, "requestOrFolderMetaId">;
  bodyRaw: Pick<BodyRawInterface, "type" | "rawData">;
  // bodyBinary: Pick<BodyBinaryInterface, "path">;
  bodyBinary: {
    [K in keyof Pick<BodyBinaryInterface, "path">]:
      | BodyBinaryInterface["path"]
      | null;
  };
  bodyXWWWFormUrlencoded: Array<Header>;
  bodyFormData: RequestExportFileInterface["params"];
  testScript: Pick<TestScriptPayloadInterface, "script">;
  authorization: Omit<
    AuthorizationPayloadInterface,
    "id" | "projectId" | "requestOrFolderMetaId"
  >;
}
