import {
  CreateTestScriptInterface,
  TestScriptPayloadInterface,
  UpdateTestScriptInterface,
} from "@shared/types/test-script.types";

export interface ElectronAPITestScriptInterface {
  getTestScript(
    requestId?: string | null,
  ): Promise<TestScriptPayloadInterface | null>;
  createTestScript(payload: CreateTestScriptInterface): Promise<boolean>;
  updateTestScript(payload: UpdateTestScriptInterface): Promise<boolean>;
  deleteTestScript(requestId?: string | null): Promise<boolean>;
}
