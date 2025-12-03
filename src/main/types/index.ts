import { RequestListItemInterface } from "@/shared/types/request-response.types";

export interface RequestOrFolderMetaTableInterface extends Omit<
  RequestListItemInterface,
  "children"
> {}
