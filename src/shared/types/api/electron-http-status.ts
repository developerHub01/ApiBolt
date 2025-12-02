import {
  HttpStatusListInterface,
  HttpStatusSingleInterface,
  HttpStatusUpdatePayloadInterface
} from "@/shared/types/http-status.type";

export interface ElectronAPIHttpStatusInterface {
  getHttpStatus(): Promise<HttpStatusListInterface>;
  getHttpStatusByCode(code: string): Promise<HttpStatusSingleInterface>;
  updateHttpStatus(
    payload: HttpStatusUpdatePayloadInterface
  ): Promise<Required<HttpStatusUpdatePayloadInterface> | null>;
}
