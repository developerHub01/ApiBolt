import { ResponseInterface } from "@shared/types/request-response.types";

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

export interface RunTestScriptPayload {
  requestId?: string | null;
  response: ResponseInterface;
}

export interface RunTestScriptResultPayload {
  success: boolean;
  result?: TTestResults;
  message?: string;
}

export interface TestResultInterface {
  name: string;
  success: boolean;
  message: string;
}

export type TTestResults = Array<TestResultInterface>;

export type TTestResultTab = "all" | "success" | "failed";
