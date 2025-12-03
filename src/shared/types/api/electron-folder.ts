import { ResponseFolderDataInterface } from "@/shared/types/request-response.types";

export interface ElectronAPIFolderInterface {
  getFolder(
    requestOrFolderMetaId?: string | null
  ): Promise<ResponseFolderDataInterface | null>;
  updateFolder(
    payload: Partial<ResponseFolderDataInterface> & {
      requestOrFolderMetaId?: string | null;
    }
  ): Promise<boolean>;
  duplicateFolder(payload: Record<string, string>): Promise<boolean>;
}
