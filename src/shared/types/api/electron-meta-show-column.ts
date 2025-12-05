import { MetaShowColumnInterface } from "@shared/types/request-response.types";

export interface ElectronAPIMetaShowColumnInterface {
  getMetaShowColumn(
    requestOrFolderMetaId?: string | null
  ): Promise<MetaShowColumnInterface | null>;
  createMetaShowColumn(
    payload: Partial<MetaShowColumnInterface>
  ): Promise<boolean>;
  updateMetaShowColumn(
    payload: Partial<MetaShowColumnInterface>
  ): Promise<boolean>;
  deleteMetaShowColumn(requestOrFolderMetaId?: string | null): Promise<boolean>;
  duplicateMetaShowColumn(payload: Record<string, string>): Promise<boolean>;
}
