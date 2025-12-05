import { ElectronResponseInterface } from "@shared/types";

export interface ElectronAPIRequestInterface {
  clearRequest(
    requestOrFolderMetaId?: string
  ): Promise<ElectronResponseInterface>;
  exportRequest(
    requestOrFolderMetaId?: string
  ): Promise<ElectronResponseInterface>;
  importRequest(
    requestOrFolderMetaId?: string
  ): Promise<ElectronResponseInterface>;
  exportFolder(
    requestOrFolderMetaId?: string
  ): Promise<ElectronResponseInterface>;
  importFolder(
    requestOrFolderMetaId?: string | null
  ): Promise<ElectronResponseInterface>;
}
