import { AuthorizationPayloadInterface } from "@/shared/types/authorization.types";

export interface ElectronAPIAuthorizationInterface {
  getAuth(requestId?: string): Promise<AuthorizationPayloadInterface>;
  getInheritedAuthFromId(
    requestId: string
  ): Promise<AuthorizationPayloadInterface>;
  createAuth(): Promise<boolean>;
  updateAuth(updatePayload: {
    requestOrFolderId?: string;
    payload: Partial<Omit<AuthorizationPayloadInterface, "id">>;
  }): Promise<AuthorizationPayloadInterface>;
  deleteAuth(id?: string): Promise<boolean>;
  duplicateAuth(payload: Record<string, string>): Promise<boolean>;
}
