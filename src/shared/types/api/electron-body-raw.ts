import { BodyRawInterface } from "@/shared/types/request-response.types";

export interface ElectronAPIBodyRawInterface {
  getBodyRaw(requestId?: string): Promise<BodyRawInterface>;
  createBodyRaw(
    payload: Partial<BodyRawInterface> &
      Required<Pick<BodyRawInterface, "requestOrFolderMetaId">>
  ): Promise<boolean>;
  /* if in payload requestOrFolderMetaId not exist then it will pick active tab from backend */
  updateBodyRaw(payload: Partial<BodyRawInterface>): Promise<boolean>;
  duplicateBodyRaw(payload: Record<string, string>): Promise<boolean>;
  replaceBodyRaw(payload: Partial<BodyRawInterface>): Promise<boolean>;
}
