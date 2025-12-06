import {
  HttpStatusListInterface,
  HttpStatusSingleInterface,
  HttpStatusUpdatePayloadInterface,
} from "@shared/types/http-status.type";

export interface ElectronAPIHttpStatusInterface {
  getHttpStatus(): Promise<HttpStatusListInterface | null>;
  getHttpStatusByCode(code: string): Promise<HttpStatusSingleInterface | null>;
  updateHttpStatus(
    payload: HttpStatusUpdatePayloadInterface,
  ): Promise<Required<HttpStatusUpdatePayloadInterface> | null>;
}
