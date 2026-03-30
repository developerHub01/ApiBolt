import {
  CreateTestScriptInterface,
  UpdateTestScriptInterface,
} from "@shared/types/test-script.types";

export interface ElectronAPITestScriptInterface {
  getTestScript(requestId?: string | null): Promise<string>;
  createTestScript(payload: CreateTestScriptInterface): Promise<boolean>;
  updateTestScript(payload: UpdateTestScriptInterface): Promise<boolean>;
  deleteTestScript(requestId?: string | null): Promise<boolean>;
}
