import { ElectronResponseInterface } from "@shared/types";

export interface ElectronAPIRequestInterface {
  clearRequest(
    requestOrFolderMetaId?: string | null,
  ): Promise<ElectronResponseInterface>;
  exportRequest(
    requestOrFolderMetaId?: string | null,
  ): Promise<ElectronResponseInterface>;
  importRequest(
    requestOrFolderMetaId?: string | null,
  ): Promise<ElectronResponseInterface>;
  exportFolder(
    requestOrFolderMetaId?: string | null,
  ): Promise<ElectronResponseInterface>;
  importFolder(
    requestOrFolderMetaId?: string | null,
  ): Promise<ElectronResponseInterface>;
}
