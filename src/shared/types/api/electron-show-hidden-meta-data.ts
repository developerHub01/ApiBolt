import { ShowHiddenMetaInterface } from "@shared/types/request-response.types";

export interface ElectronAPIShowHiddenMetaDataInterface {
  getShowHiddenMetaData(
    id?: string | null,
  ): Promise<ShowHiddenMetaInterface | null>;
  createShowHiddenMetaData(
    payload: Partial<ShowHiddenMetaInterface>,
  ): Promise<Partial<ShowHiddenMetaInterface> | null>;
  updateShowHiddenMetaData(
    payload: Partial<
      ShowHiddenMetaInterface & {
        requestOrFolderMetaId: string;
      }
    >,
  ): Promise<Partial<ShowHiddenMetaInterface | null>>;
  duplicateShowHiddenMetaData(
    payload: Record<string, string>,
  ): Promise<boolean>;
}
