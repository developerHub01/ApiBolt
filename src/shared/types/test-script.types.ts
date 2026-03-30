export interface UpdateTestScriptInterface {
  requestId?: string | null;
  script: string;
}

export interface CreateTestScriptInterface extends UpdateTestScriptInterface {}
