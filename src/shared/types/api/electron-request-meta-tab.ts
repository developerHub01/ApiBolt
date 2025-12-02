import { RequestTabInterface } from "@/shared/types/request-response.types";

export interface ElectronAPIRequestMetaTabInterface {
  getRequestMetaTab(requestId?: string): Promise<RequestTabInterface>;
  createRequestMetaTab(payload: Partial<RequestTabInterface>): Promise<boolean>;
  updateRequestMetaTab(payload: Partial<RequestTabInterface>): Promise<boolean>;
  deleteRequestMetaTab(requestId?: string): Promise<boolean>;
  duplicateRequestMetaTab(requestId?: Record<string, string>): Promise<boolean>;
  replaceRequestMetaTab(
    payload?: Partial<RequestTabInterface>
  ): Promise<boolean>;
}
