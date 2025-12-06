import { ElectronResponseInterface } from "@shared/types";
import {
  EnvironmentInterface,
  EnvironmentPayloadInterface,
} from "@shared/types/environment.types";

export interface ElectronAPIEnvironmentsInterface {
  getAllEnvironments(id?: string | null): Promise<Array<EnvironmentInterface>>;
  getEnvironments(id?: string | null): Promise<Array<EnvironmentInterface>>;
  createEnvironments(
    payload: Partial<EnvironmentPayloadInterface> &
      Required<Pick<EnvironmentPayloadInterface, "id">>,
  ): Promise<boolean>;
  updateEnvironments(
    payload: Partial<EnvironmentPayloadInterface> &
      Required<Pick<EnvironmentPayloadInterface, "id">>,
  ): Promise<boolean>;
  deleteAllEnvironments(): Promise<boolean>;
  deleteEnvironments(id: string): Promise<boolean>;
  exportEnvironments(id?: string): Promise<ElectronResponseInterface>;
  importEnvironments(id?: string): Promise<ElectronResponseInterface>;
}
