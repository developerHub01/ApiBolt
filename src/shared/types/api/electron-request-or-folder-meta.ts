import {
  RequestListItemInterface,
  RequestListItemMovePayloadInterface,
  RequestListItemUpdatePayloadInterface
} from "@shared/types/request-response.types";

export interface ElectronAPIRequestOrFolderMetaInterface {
  getRequestOrFolderMeta(): Promise<Record<string, RequestListItemInterface>>;
  getRequestOrFolderMetaById(
    id: string
  ): Promise<RequestListItemInterface | null>;
  createRequestOrFolderMeta(
    payload: RequestListItemInterface | Array<RequestListItemInterface>
  ): Promise<boolean>;
  updateRequestOrFolderMeta(
    payload: RequestListItemUpdatePayloadInterface
  ): Promise<boolean>;
  collapseAllRequestOrFolderMeta(projectId?: string | null): Promise<boolean>;
  moveRequestOrFolderMeta(
    payload: RequestListItemMovePayloadInterface
  ): Promise<boolean>;
  deleteRequestOrFolderMetaById(id: string | Array<string>): Promise<boolean>;
  duplicateRequestOrFolderMeta(
    payload: Array<Omit<RequestListItemInterface, "children" | "createdAt">>
  ): Promise<boolean>;
  deleteRequestOrFolderMetaAll(): Promise<boolean>;
  deleteRequestOrFolderMetaByProjectId(id?: string): Promise<boolean>;
  expendOrCollapseRequestOrFolderMetaAll(
    id?: string | Array<string> | null,
    isExpended?: boolean
  ): Promise<boolean>;
}
