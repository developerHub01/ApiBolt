import { TestScriptPayloadInterface } from "@shared/types/test-script.types";
import { AuthorizationPayloadInterface } from "@shared/types/authorization.types";
import {
  BodyBinaryInterface,
  BodyRawInterface,
  HiddenHeadersCheckInterface,
  ParamHeaderBuildPayloadInterface,
  ParamHeaderPayloadInterface,
  RequestListItemInterface,
  RequestTabInterface,
} from "@shared/types/request-response.types";
import { ApiUrlPayload } from "@shared/types/request-url.types";
import { EnvironmentExportInterface } from "@shared/types/export-import/environments";

export interface ProjectExportFileInterface {
  type: "project";
  project: {
    name: string;
  };
  environments: Array<EnvironmentExportInterface>;
  requestList: Record<
    string,
    Omit<RequestListItemInterface, "createdAt" | "children">
  >;
  apiUrlList: Record<
    string,
    ApiUrlPayload & {
      requestOrFolderMetaId: string;
    }
  >;
  paramsList: Record<
    string,
    Array<Omit<ParamHeaderBuildPayloadInterface, "id" | "createdAt">>
  >;
  headersList: Record<
    string,
    Array<Omit<ParamHeaderPayloadInterface, "id" | "createdAt">>
  >;
  hiddenHeadersCheckList: Record<
    string,
    HiddenHeadersCheckInterface & {
      requestOrFolderMetaId: string;
    }
  >;
  formDataList: ProjectExportFileInterface["headersList"];
  xWWWFormUrlencodedList: ProjectExportFileInterface["headersList"];
  binaryDataList: Record<
    string,
    Pick<BodyBinaryInterface, "requestOrFolderMetaId" | "path">
  >;
  rawDataList: Record<
    string,
    Pick<BodyRawInterface, "requestOrFolderMetaId" | "type" | "rawData">
  >;
  requestMetaTabList: Record<string, RequestTabInterface>;
  testScriptList: Record<string, Pick<TestScriptPayloadInterface, "script">>;
  authorization: Record<
    string,
    Omit<AuthorizationPayloadInterface, "id" | "projectId">
  >;
}
