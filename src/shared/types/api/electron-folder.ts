import { ResponseFolderDataInterface } from "@/shared/types/request-response.types";

export interface ElectronAPIFolderInterface {
  getFolder(
    requestOrFolderMetaId?: string
  ): Promise<ResponseFolderDataInterface>;
  updateFolder(
    payload: Partial<ResponseFolderDataInterface> & {
      requestOrFolderMetaId?: string;
    }
  ): Promise<boolean>;
  duplicateFolder(payload: Record<string, string>): Promise<boolean>;
}
