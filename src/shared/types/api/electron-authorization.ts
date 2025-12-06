import { AuthorizationPayloadInterface } from "@shared/types/authorization.types";

export interface ElectronAPIAuthorizationInterface {
  getAuth(
    requestId?: string | null,
  ): Promise<AuthorizationPayloadInterface | null>;
  getInheritedAuthFromId(
    requestId: string,
  ): Promise<AuthorizationPayloadInterface | null>;
  createAuth(payload: Partial<AuthorizationPayloadInterface>): Promise<boolean>;
  updateAuth(updatePayload: {
    requestOrFolderId?: string;
    payload: Partial<Omit<AuthorizationPayloadInterface, "id">>;
  }): Promise<AuthorizationPayloadInterface | null>;
  deleteAuth(id?: string | null): Promise<boolean>;
  duplicateAuth(payload: Record<string, string>): Promise<boolean>;
}
