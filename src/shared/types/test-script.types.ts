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

export type TTestResultType = "test" | "print" | "group" | "summary" | "code";

export interface TestResultTestPayloadInterface {
  type: "test";
  name: string;
  success: boolean;
  message: string;
}

export interface TestResultPrintPayloadInterface {
  type: "print";
  name: string;
  message: string;
}

export interface TestResultCodePayloadInterface {
  type: "code";
  name: string;
  code: string;
  language: "javascript" | "markdown" | "json";
}

export interface TestResultSummaryPayloadInterface {
  type: "summary";
  name: string;
  summary: {
    total: number;
    tests: number;
    prints: number;
    passed: number;
    failed: number;
    successRate: number;
  };
}

export interface TestResultGroupPayloadInterface {
  type: "group";
  name: string;
  children: Array<Exclude<TestResultInterface, "group">>;
}

export type TestResultInterface =
  | TestResultTestPayloadInterface
  | TestResultPrintPayloadInterface
  | TestResultSummaryPayloadInterface
  | TestResultGroupPayloadInterface
  | TestResultCodePayloadInterface;

export type TTestResults = Array<TestResultInterface>;

export interface RunTestScriptResultPayload {
  success: boolean;
  result?: TTestResults;
  message?: string;
}

export type TTestResultTab = "all" | "success" | "failed";
