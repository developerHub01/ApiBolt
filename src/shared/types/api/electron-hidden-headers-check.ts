import { HiddenHeadersCheckInterface } from "@/shared/types/request-response.types";

export interface ElectronAPIHiddenHeadersCheckInterface {
  getHiddenHeadersCheck(id?: string): Promise<HiddenHeadersCheckInterface>;
  createHiddenHeadersCheck(
    paramId: string
  ): Promise<Partial<HiddenHeadersCheckInterface>>;
  updateHiddenHeadersCheck(
    payload: Partial<HiddenHeadersCheckInterface>
  ): Promise<Partial<HiddenHeadersCheckInterface>>;
  duplicateHiddenHeadersCheck(
    payload: Record<string, string>
  ): Promise<boolean>;
}
