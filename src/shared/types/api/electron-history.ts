import {
  CreateHistoryItemInterface,
  HistoryItemInterface,
  HistoryItemMetaInterface
} from "@/shared/types/history.types";

export interface ElectronAPIHistoryInterface {
  getHistoryById(id: string): Promise<HistoryItemInterface | null>;
  getHistoryByRequestId(
    requestId: string
  ): Promise<Array<HistoryItemMetaInterface>>;
  createHistory(
    payload: CreateHistoryItemInterface
  ): Promise<Array<HistoryItemMetaInterface> | HistoryItemMetaInterface | null>;
  deleteHistoryById(id: string): Promise<boolean>;
  deleteHistoryByRequestId(id: string): Promise<boolean>;
}
