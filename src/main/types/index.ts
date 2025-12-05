import { RequestListItemInterface } from "@shared/types/request-response.types";
import { SettingsInterface } from "@shared/types/setting.types";

export interface RequestOrFolderMetaTableInterface extends Omit<
  RequestListItemInterface,
  "children"
> {}

