import {
  ParamHeaderBuildPayloadInterface,
  ParamHeaderPayloadInterface
} from "@/shared/types/request-response.types";

export interface ElectronAPIHeadersInterface {
  getHeaders(
    requestOrFolderMetaId?: string
  ): Promise<Array<ParamHeaderPayloadInterface>>;
  deleteHeaders(paramId: string): Promise<boolean>;
  deleteHeadersByRequestMetaId(
    requestOrFolderMetaId?: string
  ): Promise<boolean>;
  createHeaders(
    payload: Partial<ParamHeaderBuildPayloadInterface>
  ): Promise<boolean>;
  updateHeaders(
    paramId: string,
    payload: Partial<ParamHeaderBuildPayloadInterface>
  ): Promise<boolean>;
  replaceHeaders(
    requestOrFolderMetaId: string,
    payload: Array<Partial<ParamHeaderBuildPayloadInterface>>
  ): Promise<boolean>;
  checkAllHeadersByRequestMetaId(
    requestOrFolderMetaId?: string
  ): Promise<boolean>;
  duplicateHeaders(payload: Record<string, string>): Promise<boolean>;
}
