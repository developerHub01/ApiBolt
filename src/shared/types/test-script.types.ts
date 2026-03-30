export interface TestScriptPayloadInterface {
  requestId: string;
  script: string;
}

export interface UpdateTestScriptInterface extends Omit<
  TestScriptPayloadInterface,
  "requestId"
> {
  requestId?: string | null;
}

export interface CreateTestScriptInterface extends UpdateTestScriptInterface {}
