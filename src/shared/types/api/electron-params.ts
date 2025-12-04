import {
  ParamHeaderBuildPayloadInterface,
  ParamHeaderPayloadInterface
} from "@/shared/types/request-response.types";

export interface ElectronAPIParamsInterface {
  getParams(id?: string | null): Promise<Array<ParamHeaderPayloadInterface>>;
  deleteParams(paramId: string): Promise<boolean>;
  deleteParamsByRequestMetaId(
    requestOrFolderMetaId?: string | null
  ): Promise<boolean>;
  createParams(
    payload: Partial<ParamHeaderBuildPayloadInterface>
  ): Promise<boolean>;
  updateParams(
    paramId: string,
    payload: Partial<ParamHeaderBuildPayloadInterface>
  ): Promise<boolean>;
  replaceParams(
    requestOrFolderMetaId: string,
    payload?: Array<Partial<ParamHeaderBuildPayloadInterface>>
  ): Promise<boolean>;
  checkAllParamsByRequestMetaId(
    requestOrFolderMetaId?: string | null
  ): Promise<boolean>;
  duplicateParams(payload: Record<string, string>): Promise<boolean>;
}
