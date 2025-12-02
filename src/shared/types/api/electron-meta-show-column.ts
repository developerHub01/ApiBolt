import { MetaShowColumnInterface } from "@/shared/types/request-response.types";

export interface ElectronAPIMetaShowColumnInterface {
  getMetaShowColumn(
    requestOrFolderMetaId?: string
  ): Promise<MetaShowColumnInterface>;
  createMetaShowColumn(
    payload: Partial<MetaShowColumnInterface>
  ): Promise<boolean>;
  updateMetaShowColumn(
    payload: Partial<MetaShowColumnInterface>
  ): Promise<boolean>;
  deleteMetaShowColumn(requestOrFolderMetaId?: string): Promise<boolean>;
  duplicateMetaShowColumn(payload: Record<string, string>): Promise<boolean>;
}
