import { ShowHiddenMetaInterface } from "@/shared/types/request-response.types";

export interface ElectronAPIShowHiddenMetaDataInterface {
  getShowHiddenMetaData(id?: string): Promise<ShowHiddenMetaInterface>;
  createShowHiddenMetaData(
    paramId: string
  ): Promise<Partial<ShowHiddenMetaInterface>>;
  updateShowHiddenMetaData(
    payload: Partial<
      ShowHiddenMetaInterface & {
        requestOrFolderMetaId: string;
      }
    >
  ): Promise<Partial<ShowHiddenMetaInterface>>;
  duplicateShowHiddenMetaData(
    payload: Record<string, string>
  ): Promise<boolean>;
}
