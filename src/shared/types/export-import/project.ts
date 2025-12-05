import { AuthorizationPayloadInterface } from "@shared/types/authorization.types";
import {
  BodyBinaryInterface,
  BodyRawInterface,
  HiddenHeadersCheckInterface,
  ParamHeaderBuildPayloadInterface,
  ParamHeaderPayloadInterface,
  RequestListItemInterface,
  RequestTabInterface
} from "@shared/types/request-response.types";
import { ApiUrlPayload } from "@shared/types/request-url.types";
import { EnvironmentInterface } from "@shared/types/environment.types";

export type EnvironmentExportInterface = Omit<
  EnvironmentInterface,
  "id" | "projectId" | "createdAt"
>;

export interface ProjectExportFileInterface {
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
  authorization: Record<
    string,
    Omit<AuthorizationPayloadInterface, "id" | "projectId">
  >;
}
