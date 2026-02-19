import { PathParamInterface } from "@shared/types/request-response.types";

export interface ElectronAPIPathParamsInterface {
  getPathParams(id?: string | null): Promise<PathParamInterface>;
  deletePathParamsByRequestMetaId(
    requestOrFolderMetaId?: string | null,
  ): Promise<boolean>;
  createPathParams(
    requestOrFolderMetaId: string,
    payload: Partial<PathParamInterface>,
  ): Promise<boolean>;
  updatePathParams(
    requestOrFolderMetaId: string,
    payload: Partial<PathParamInterface>,
  ): Promise<boolean>;
}
