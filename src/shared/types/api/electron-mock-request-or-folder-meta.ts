import {
  RequestListItemInterface,
  RequestListItemMovePayloadInterface,
  RequestListItemUpdatePayloadInterface,
} from "@shared/types/request-response.types";

export interface ElectronAPIMockRequestOrFolderMetaInterface {
  getMockRequestOrFolderMeta(): Promise<
    Record<string, RequestListItemInterface>
  >;
  getMockRequestOrFolderMetaById(
    id: string,
  ): Promise<RequestListItemInterface | null>;
  createMockRequestOrFolderMeta(
    payload: RequestListItemInterface | Array<RequestListItemInterface>,
  ): Promise<boolean>;
  updateMockRequestOrFolderMeta(
    payload: RequestListItemUpdatePayloadInterface,
  ): Promise<boolean>;
  collapseAllMockRequestOrFolderMeta(
    projectId?: string | null,
  ): Promise<boolean>;
  moveMockRequestOrFolderMeta(
    payload: RequestListItemMovePayloadInterface,
  ): Promise<boolean>;
  deleteMockRequestOrFolderMetaById(
    id: string | Array<string>,
  ): Promise<boolean>;
  duplicateMockRequestOrFolderMeta(
    payload: Array<Omit<RequestListItemInterface, "children" | "createdAt">>,
  ): Promise<boolean>;
  deleteMockRequestOrFolderMetaAll(): Promise<boolean>;
  deleteMockRequestOrFolderMetaByProjectId(id?: string): Promise<boolean>;
  expendOrCollapseMockRequestOrFolderMetaAll(
    id?: string | Array<string> | null,
    isExpended?: boolean,
  ): Promise<boolean>;
}
