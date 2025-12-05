import { HiddenHeadersCheckInterface } from "@shared/types/request-response.types";

export interface ElectronAPIHiddenHeadersCheckInterface {
  getHiddenHeadersCheck(
    id?: string | null
  ): Promise<HiddenHeadersCheckInterface | null>;
  createHiddenHeadersCheck(
    payload: Partial<HiddenHeadersCheckInterface>
  ): Promise<Partial<HiddenHeadersCheckInterface | null>>;
  updateHiddenHeadersCheck(
    payload: Partial<HiddenHeadersCheckInterface>
  ): Promise<Partial<HiddenHeadersCheckInterface> | null>;
  duplicateHiddenHeadersCheck(
    payload: Record<string, string>
  ): Promise<boolean>;
}
