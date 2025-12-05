import { BodyBinaryInterface } from "@shared/types/request-response.types";

export interface ElectronAPIBodyBinaryInterface {
  getBodyBinary(requestId?: string | null): Promise<BodyBinaryInterface | null>;
  createBodyBinary(payload: Partial<BodyBinaryInterface>): Promise<boolean>;
  updateBodyBinary(requestId?: string | null): Promise<boolean>;
  deleteBodyBinary(requestId?: string | null): Promise<boolean>;
  duplicateBodyBinary(payload: Record<string, string>): Promise<boolean>;
  replaceBodyBinary(
    payload: Pick<BodyBinaryInterface, "requestOrFolderMetaId"> &
      Partial<
        Omit<BodyBinaryInterface, "requestOrFolderMetaId"> & {
          path: BodyBinaryInterface["path"] | null;
        }
      >
  ): Promise<boolean>;
}
