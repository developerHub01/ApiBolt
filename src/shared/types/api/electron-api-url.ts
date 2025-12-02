import { ApiUrlPayload } from "@/shared/types/request-url.types";

export interface ElectronAPIApiUrlInterface {
  getApiUrlDB(requestOrFolderMetaId?: string): Promise<ApiUrlPayload>;
  createApiUrl(payload: Partial<ApiUrlPayload>): Promise<boolean>;
  /* old ids and new ids map */
  duplicateApiUrl(payload: Record<string, string>): Promise<boolean>;
  updateApiUrl(payload: Partial<ApiUrlPayload>): Promise<boolean>;
}
