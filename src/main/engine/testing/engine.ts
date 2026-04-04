import { TestResultCodePayloadInterface } from "@shared/types/test-script.types";
import { isDeepStrictEqual } from "node:util";
import { ResponseInterface } from "@shared/types/request-response.types";
import {
  TestResultInterface,
  TestResultSummaryPayloadInterface,
  TTestResults,
} from "@shared/types/test-script.types";
import { CookieInterface } from "@shared/types/cookies.types";

export class ABTestEngine {
  private results: TTestResults = [];
  private currentInsideGroup: boolean = false;

  constructor(private response: ResponseInterface) {
    this.response = response;
  }

  private push = (result: TestResultInterface) => {
    const last = this.results.at(-1);
    if (
      result.type !== "group" &&
      this.currentInsideGroup &&
      last?.type === "group"
    )
      return last.children.push(result);

    return this.results.push(result);
  };

  getResponse = () => this.response;

  private pushTest = (name: string, success: boolean, message: string) =>
    this.push({
      type: "test",
      name,
      success,
      message,
    });

  private applyNegation = <
    T extends Record<string, (...args: Array<unknown>) => unknown>,
  >(
    api: T,
  ) =>
    Object.fromEntries(
      Object.entries(api).map(([key, fn]) => [
        key,
        (...args: Parameters<T[keyof T]>) => {
          const beforeLength = this.results.length;
          fn(...args);

          const last = this.results[this.results.length - 1];
          if (
            !last ||
            this.results.length === beforeLength ||
            last.type !== "test"
          )
            return;

          last.success = !last.success;
          last.message = "NOT: " + last.message;
        },
      ]),
    );

  addDemoResults = () => {
    this.results = [
      {
        type: "test",
        name: "Test 1",
        success: true,
        message: "Message 1",
      },
      {
        type: "test",
        name: "Test 2",
        success: true,
        message: "Message 2",
      },
      {
        type: "test",
        name: "Test 3",
        success: false,
        message: "Message 3",
      },
      {
        type: "test",
        name: "Test 4",
        success: true,
        message: "Message 4",
      },
    ];
  };

  /**
   * ===============================
   * STATUS ASSERTIONS
   * ===============================
   */
  status = (name: string) => {
    const actual = this.response.status;

    const api = {
      toBe: (expected: number) =>
        this.pushTest(
          name,
          actual === expected,
          `Expected ${actual} to be ${expected}`,
        ),

      toBeOneOf: (list: Array<number>) =>
        this.pushTest(
          name,
          list.includes(actual),
          `Expected ${actual} to be one of ${list.join(", ")}`,
        ),

      toBeGreaterThan: (num: number) =>
        this.pushTest(name, actual > num, `Expected ${actual} > ${num}`),

      toBeLessThan: (num: number) =>
        this.pushTest(name, actual < num, `Expected ${actual} < ${num}`),

      toBeBetween: (min: number, max: number) =>
        this.pushTest(
          name,
          actual >= min && actual <= max,
          `Expected ${actual} between ${min}-${max}`,
        ),

      toBeSuccess: () =>
        this.pushTest(
          name,
          actual >= 200 && actual < 300,
          `Expected ${actual} to be 2xx`,
        ),
      toBeClientError: () =>
        this.pushTest(
          name,
          actual >= 400 && actual < 500,
          `Expected ${actual} to be 4xx`,
        ),
      toBeServerError: () =>
        this.pushTest(
          name,
          actual >= 500 && actual < 600,
          `Expected ${actual} to be 5xx`,
        ),
      toBeRedirect: () =>
        this.pushTest(
          name,
          actual >= 300 && actual < 400,
          `Expected ${actual} to be 3xx`,
        ),

      toBeOK: () => this.pushTest(name, actual === 200, `Expected 200`),
      toBeCreated: () => this.pushTest(name, actual === 201, `Expected 201`),
      toBeAccepted: () => this.pushTest(name, actual === 202, `Expected 202`),
      toBeNoContent: () => this.pushTest(name, actual === 204, `Expected 204`),
      toBeBadRequest: () => this.pushTest(name, actual === 400, `Expected 400`),
      toBeUnauthorized: () =>
        this.pushTest(name, actual === 401, `Expected 401`),
      toBeForbidden: () => this.pushTest(name, actual === 403, `Expected 403`),
      toBeNotFound: () => this.pushTest(name, actual === 404, `Expected 404`),
      toBeInternalServerError: () =>
        this.pushTest(name, actual === 500, `Expected 500`),
      toBeBadGateway: () => this.pushTest(name, actual === 502, `Expected 502`),
      toBeServiceUnavailable: () =>
        this.pushTest(name, actual === 503, `Expected 503`),
    } as Record<string, (...args: Array<unknown>) => unknown>;

    return {
      ...api,
      not: this.applyNegation(api),
    };
  };

  /**
   * ===============================
   * BODY ASSERTIONS
   * ===============================
   */
  body = (name: string) => {
    const actual = this.response.body;

    const api = {
      toBe: (expected: unknown) =>
        this.pushTest(
          name,
          actual === expected,
          `Expected ${JSON.stringify(actual, null, 2)} to be ${JSON.stringify(expected, null, 2)}`,
        ),

      toEqual: (expected: unknown) =>
        this.pushTest(
          name,
          isDeepStrictEqual(actual, expected),
          `Expected ${JSON.stringify(actual, null, 2)} to equal ${JSON.stringify(expected, null, 2)}`,
        ),

      toExist: () =>
        this.pushTest(
          name,
          actual !== undefined && actual !== null,
          `Expected value to exist`,
        ),

      toBeType: (
        type: "string" | "number" | "boolean" | "object" | "array",
      ) => {
        const actualType = Array.isArray(actual) ? "array" : typeof actual;
        this.pushTest(
          name,
          actualType === type,
          `Expected type ${type}, got ${actualType}`,
        );
      },

      toContain: (item: unknown) => {
        let success = false;
        if (typeof actual === "string")
          success = actual.includes(item as string);
        else if (Array.isArray(actual))
          success = (actual as Array<unknown>).includes(item);
        this.pushTest(
          name,
          success,
          `Expected ${JSON.stringify(actual, null, 2)} to contain ${JSON.stringify(item, null, 2)}`,
        );
      },

      toHaveProperty: (key: string) => {
        const keys = key.split(".");
        let val: unknown = actual;
        for (const k of keys) {
          if (
            val &&
            typeof val === "object" &&
            k in (val as Record<string, unknown>)
          )
            val = (val as Record<string, unknown>)[k];
          else {
            this.pushTest(name, false, `Expected property '${key}' not found`);
            return;
          }
        }
        this.pushTest(name, true, `Property '${key}' exists`);
      },

      toHaveLength: (len: number) =>
        this.pushTest(
          name,
          Array.isArray(actual) && (actual as Array<unknown>).length === len,
          `Expected length ${len}, got ${Array.isArray(actual) ? (actual as Array<unknown>).length : "not array"}`,
        ),

      /* numbers */
      toBeGreaterThan: (num: number) => {
        if (typeof actual !== "number" || isNaN(actual)) {
          this.pushTest(name, false, `Expected a number, got ${typeof actual}`);
          return;
        }
        this.pushTest(name, actual > num, `Expected ${actual} > ${num}`);
      },

      toBeLessThan: (num: number) => {
        if (typeof actual !== "number" || isNaN(actual)) {
          this.pushTest(name, false, `Expected a number, got ${typeof actual}`);
          return;
        }
        this.pushTest(name, actual < num, `Expected ${actual} < ${num}`);
      },

      toBeBetween: (min: number, max: number) => {
        if (typeof actual !== "number" || isNaN(actual)) {
          this.pushTest(name, false, `Expected a number, got ${typeof actual}`);
          return;
        }
        this.pushTest(
          name,
          actual >= min && actual <= max,
          `Expected ${actual} between ${min} - ${max}`,
        );
      },
    } as Record<string, (...args: Array<unknown>) => unknown>;

    return {
      ...api,
      not: this.applyNegation(api),
    };
  };

  /*========================
   HEADERS ASSERTIONS
  ========================*/
  headers = (name: string) => {
    const actual = this.response.headers;

    const api = {
      toHaveHeader: (key: string) =>
        this.pushTest(
          name,
          actual !== null &&
            typeof actual === "object" &&
            key.toLowerCase() in actual,
          `Expected header '${key}' to exist`,
        ),

      toHaveHeaderValue: (key: string, value: string | RegExp) => {
        if (!actual) {
          this.pushTest(name, false, "Headers are null");
          return;
        }
        if (typeof actual !== "object") {
          this.pushTest(name, false, "Headers are not an object");
          return;
        }

        const val = (actual as Record<string, unknown>)[key.toLowerCase()];
        if (val === undefined || val === null) {
          this.pushTest(name, false, `Expected header '${key}' to exist`);
          return;
        }

        let success = false;
        if (typeof val === "string") {
          success = value instanceof RegExp ? value.test(val) : val === value;
        } else {
          this.pushTest(
            name,
            false,
            `Header '${key}' value is not a string: ${typeof val}`,
          );
          return;
        }

        this.pushTest(
          name,
          success,
          `Expected header '${key}' value to be ${
            value instanceof RegExp ? value : JSON.stringify(value, null, 2)
          }, got ${JSON.stringify(val, null, 2)}`,
        );
      },

      toHaveContentType: (type: string) => {
        if (!actual) {
          this.pushTest(name, false, "Headers are null");
          return;
        }
        if (typeof actual !== "object") {
          this.pushTest(name, false, "Headers are not an object");
          return;
        }

        const val = (actual as Record<string, unknown>)["content-type"];
        if (typeof val !== "string") {
          this.pushTest(
            name,
            false,
            `Content-Type header not found or not a string`,
          );
          return;
        }

        const success = val.includes(type);
        this.pushTest(
          name,
          success,
          `Expected 'Content-Type' to include '${type}', got ${val}`,
        );
      },

      toExist: () =>
        this.pushTest(
          name,
          actual !== undefined && actual !== null,
          "Expected headers object to exist",
        ),

      toBeEmpty: () =>
        this.pushTest(
          name,
          actual !== null &&
            typeof actual === "object" &&
            Object.keys(actual).length === 0,
          "Expected headers to be empty",
        ),
    } as Record<string, (...args: Array<unknown>) => unknown>;

    return {
      ...api,
      not: this.applyNegation(api),
    };
  };

  /*========================
   COOKIES ASSERTIONS
  ========================*/
  cookies = (cookieKey?: string) => {
    const cookies = this.response.cookies || [];
    const actual: CookieInterface | undefined = cookieKey
      ? cookies.find(c => c.key === cookieKey)
      : undefined;

    const api = {
      toExist: () =>
        this.pushTest(
          cookieKey || "cookies",
          cookieKey ? Boolean(actual) : Boolean(cookies.length),
          `Expected cookie${cookieKey ? ` '${cookieKey}'` : "s"} to exist`,
        ),

      toBe: (expected: string) => {
        if (!actual) {
          this.pushTest(cookieKey || "cookies", false, "Cookie not found");
          return;
        }
        this.pushTest(
          cookieKey || "cookies",
          actual.value === expected,
          `Expected cookie '${cookieKey}' to have value '${expected}', got '${actual.value}'`,
        );
      },

      toEqual: (expected: CookieInterface) => {
        if (!actual) {
          this.pushTest(cookieKey || "cookies", false, "Cookie not found");
          return;
        }
        this.pushTest(
          cookieKey || "cookies",
          isDeepStrictEqual(actual, expected),
          `Expected cookie '${cookieKey}' to equal ${JSON.stringify(
            expected,
            null,
            2,
          )}, got ${JSON.stringify(actual, null, 2)}`,
        );
      },

      toContain: (substring: string) => {
        if (!actual) {
          this.pushTest(cookieKey || "cookies", false, "Cookie not found");
          return;
        }
        this.pushTest(
          cookieKey || "cookies",
          actual.value.includes(substring),
          `Expected cookie '${cookieKey}' to contain '${substring}'`,
        );
      },

      toHaveProperty: (prop: keyof CookieInterface) => {
        if (!actual) {
          this.pushTest(cookieKey || "cookies", false, "Cookie not found");
          return;
        }
        this.pushTest(
          cookieKey || "cookies",
          prop in actual,
          `Expected cookie '${cookieKey}' to have property '${prop}'`,
        );
      },

      toHaveLength: (len: number) => {
        if (cookieKey) {
          this.pushTest(
            cookieKey,
            false,
            "Cannot check length on single cookie",
          );
          return;
        }
        this.pushTest(
          "cookies",
          cookies.length === len,
          `Expected cookies array length ${len}, got ${cookies.length}`,
        );
      },

      toExpireAfter: (seconds: number) => {
        if (!actual || (!actual.maxAge && !actual.expires)) {
          this.pushTest(
            cookieKey || "cookies",
            false,
            "Cookie expiry not found",
          );
          return;
        }
        const expirySeconds =
          actual.maxAge ?? 0; /* only check maxAge for simplicity */
        this.pushTest(
          cookieKey || "cookies",
          expirySeconds >= seconds,
          `Expected cookie '${cookieKey}' to expire after ${seconds}s, got ${expirySeconds}`,
        );
      },

      toExpireBefore: (seconds: number) => {
        if (!actual || (!actual.maxAge && !actual.expires)) {
          this.pushTest(
            cookieKey || "cookies",
            false,
            "Cookie expiry not found",
          );
          return;
        }
        const expirySeconds = actual.maxAge ?? 0;
        this.pushTest(
          cookieKey || "cookies",
          expirySeconds <= seconds,
          `Expected cookie '${cookieKey}' to expire before ${seconds}s, got ${expirySeconds}`,
        );
      },

      toHavePath: (path: string) => {
        if (!actual) {
          this.pushTest(cookieKey || "cookies", false, "Cookie not found");
          return;
        }
        this.pushTest(
          cookieKey || "cookies",
          actual.path === path,
          `Expected cookie '${cookieKey}' path '${path}', got '${actual.path}'`,
        );
      },

      toHaveDomain: (domain: string) => {
        if (!actual) {
          this.pushTest(cookieKey || "cookies", false, "Cookie not found");
          return;
        }
        this.pushTest(
          cookieKey || "cookies",
          actual.domain === domain,
          `Expected cookie '${cookieKey}' domain '${domain}', got '${actual.domain}'`,
        );
      },

      toBeSecure: () => {
        this.pushTest(
          cookieKey || "cookies",
          Boolean(actual?.secure),
          `Expected cookie '${cookieKey}' to be secure`,
        );
      },

      toBeHttpOnly: () => {
        this.pushTest(
          cookieKey || "cookies",
          Boolean(actual?.httpOnly),
          `Expected cookie '${cookieKey}' to be httpOnly`,
        );
      },

      toBeSameSite: (sameSite: "lax" | "strict" | "none") => {
        if (!actual) {
          this.pushTest(cookieKey || "cookies", false, "Cookie not found");
          return;
        }
        this.pushTest(
          cookieKey || "cookies",
          actual.sameSite === sameSite,
          `Expected cookie '${cookieKey}' sameSite to be '${sameSite}', got '${actual.sameSite}'`,
        );
      },
    } as Record<string, (...args: Array<unknown>) => void>;

    return {
      ...api,
      not: this.applyNegation(api),
    };
  };

  /*========================
   EXPECT ASSERTIONS
  ========================*/
  expect = (name: string) => {
    const status = this.response.status;
    const body = this.response.body;
    const headers = this.response.headers;
    const cookies = this.response.cookies || [];

    const api = {
      toBe: (expected: number) =>
        this.pushTest(
          name,
          status === expected,
          `Expected ${status} to be ${expected}`,
        ),
      toBeOneOf: (list: Array<number>) =>
        this.pushTest(
          name,
          list.includes(status),
          `Expected ${status} to be one of ${list.join(", ")}`,
        ),
      toBeGreaterThan: (num: number) =>
        this.pushTest(name, status > num, `Expected ${status} > ${num}`),
      toBeLessThan: (num: number) =>
        this.pushTest(name, status < num, `Expected ${status} < ${num}`),
      toBeBetween: (min: number, max: number) =>
        this.pushTest(
          name,
          status >= min && status <= max,
          `Expected ${status} between ${min}-${max}`,
        ),
      toBeSuccess: () =>
        this.pushTest(
          name,
          status >= 200 && status < 300,
          `Expected ${status} to be 2xx`,
        ),
      toBeClientError: () =>
        this.pushTest(
          name,
          status >= 400 && status < 500,
          `Expected ${status} to be 4xx`,
        ),
      toBeServerError: () =>
        this.pushTest(
          name,
          status >= 500 && status < 600,
          `Expected ${status} to be 5xx`,
        ),
      toBeRedirect: () =>
        this.pushTest(
          name,
          status >= 300 && status < 400,
          `Expected ${status} to be 3xx`,
        ),
      toBeOK: () => this.pushTest(name, status === 200, `Expected 200`),
      toBeCreated: () => this.pushTest(name, status === 201, `Expected 201`),
      toBeAccepted: () => this.pushTest(name, status === 202, `Expected 202`),
      toBeNoContent: () => this.pushTest(name, status === 204, `Expected 204`),
      toBeBadRequest: () => this.pushTest(name, status === 400, `Expected 400`),
      toBeUnauthorized: () =>
        this.pushTest(name, status === 401, `Expected 401`),
      toBeForbidden: () => this.pushTest(name, status === 403, `Expected 403`),
      toBeNotFound: () => this.pushTest(name, status === 404, `Expected 404`),
      toBeInternalServerError: () =>
        this.pushTest(name, status === 500, `Expected 500`),
      toBeBadGateway: () => this.pushTest(name, status === 502, `Expected 502`),
      toBeServiceUnavailable: () =>
        this.pushTest(name, status === 503, `Expected 503`),

      toEqual: (expected: unknown) =>
        this.pushTest(
          name,
          isDeepStrictEqual(body, expected),
          `Expected ${JSON.stringify(body, null, 2)} to equal ${JSON.stringify(expected, null, 2)}`,
        ),
      toExist: () =>
        this.pushTest(
          name,
          body !== undefined && body !== null,
          `Expected value to exist`,
        ),
      toBeType: (
        type: "string" | "number" | "boolean" | "object" | "array",
      ) => {
        const actualType = Array.isArray(body) ? "array" : typeof body;
        this.pushTest(
          name,
          actualType === type,
          `Expected type ${type}, got ${actualType}`,
        );
      },
      toContain: (item: unknown) => {
        let success = false;
        if (typeof body === "string") success = body.includes(item as string);
        else if (Array.isArray(body))
          success = (body as Array<unknown>).includes(item);
        this.pushTest(
          name,
          success,
          `Expected ${JSON.stringify(body, null, 2)} to contain ${JSON.stringify(item, null, 2)}`,
        );
      },
      toHaveProperty: (key: string) => {
        const keys = key.split(".");
        let val: unknown = body;
        for (const k of keys) {
          if (
            val &&
            typeof val === "object" &&
            k in (val as Record<string, unknown>)
          )
            val = (val as Record<string, unknown>)[k];
          else {
            this.pushTest(name, false, `Expected property '${key}' not found`);
            return;
          }
        }
        this.pushTest(name, true, `Property '${key}' exists`);
      },
      toHaveLength: (len: number) =>
        this.pushTest(
          name,
          Array.isArray(body) && (body as Array<unknown>).length === len,
          `Expected length ${len}, got ${Array.isArray(body) ? (body as Array<unknown>).length : "not array"}`,
        ),
      toBeGreaterThanNumber: (num: number) =>
        this.pushTest(
          name,
          typeof body === "number" && body > num,
          `Expected ${typeof body === "object" ? JSON.stringify(body, null, 2) : body} > ${num}`,
        ),
      toBeLessThanNumber: (num: number) =>
        this.pushTest(
          name,
          typeof body === "number" && body < num,
          `Expected ${typeof body === "object" ? JSON.stringify(body, null, 2) : body} < ${num}`,
        ),
      toBeBetweenNumber: (min: number, max: number) =>
        this.pushTest(
          name,
          typeof body === "number" && body >= min && body <= max,
          `Expected ${typeof body === "object" ? JSON.stringify(body, null, 2) : body} between ${min}-${max}`,
        ),

      toHaveHeader: (key: string) =>
        this.pushTest(
          name,
          headers && key.toLowerCase() in headers,
          `Expected header '${key}' to exist`,
        ),
      toHaveHeaderValue: (key: string, value: string | RegExp) => {
        const val = headers
          ? (headers as Record<string, unknown>)[key.toLowerCase()]
          : undefined;
        let success = false;
        if (typeof val === "string")
          success = value instanceof RegExp ? value.test(val) : val === value;
        this.pushTest(
          name,
          success,
          `Expected header '${key}' value to be ${value}, got ${val}`,
        );
      },
      toHaveContentType: (type: string) => {
        const val = headers
          ? (headers as Record<string, unknown>)["content-type"]
          : undefined;
        this.pushTest(
          name,
          typeof val === "string" && val.includes(type),
          `Expected Content-Type to include '${type}', got ${val}`,
        );
      },

      toExistCookie: (cookieKey: string) => {
        this.pushTest(
          name,
          cookies.some(c => c.key === cookieKey),
          `Expected cookie '${cookieKey}' to exist`,
        );
      },
      toBeCookie: (cookieKey: string, value: string) => {
        const c = cookies.find(c => c.key === cookieKey);
        this.pushTest(
          name,
          c?.value === value,
          `Expected cookie '${cookieKey}' to be '${value}', got '${c?.value}'`,
        );
      },
    } as Record<string, (...args: Array<unknown>) => unknown>;

    return {
      ...api,
      not: this.applyNegation(api),
    };
  };

  /*========================
   PRINT 
  ========================*/
  print = (name: string, value: unknown = "") => {
    this.push({
      type: "print",
      name,
      message:
        typeof value === "object"
          ? JSON.stringify(value, null, 2)
          : String(value),
    });
  };

  /*========================
   CODE 
  ========================*/
  code = (
    name: string,
    value: unknown = "",
    language: TestResultCodePayloadInterface["language"] = "markdown",
  ) => {
    this.push({
      type: "code",
      name,
      code:
        typeof value === "object"
          ? JSON.stringify(value, null, 2)
          : String(value),
      language,
    });
  };

  /*========================
   SUMMARY
  ========================*/
  getSummary = () => {
    const walk = (results: TTestResults) =>
      results.reduce(
        (acc, curr) => {
          acc.total++;

          switch (curr.type) {
            case "test": {
              acc.tests++;
              if (curr.success) acc.passed++;
              else acc.failed++;
              break;
            }

            case "print":
              acc.prints++;
              break;

            case "group": {
              const child = walk(curr.children);
              acc.total += child.total;
              acc.tests += child.tests;
              acc.prints += child.prints;
              acc.passed += child.passed;
              acc.failed += child.failed;
              break;
            }

            case "summary":
              break;
          }

          return acc;
        },
        {
          total: 0,
          tests: 0,
          prints: 0,
          passed: 0,
          failed: 0,
          successRate: 0,
        } as TestResultSummaryPayloadInterface["summary"],
      );

    const summary = walk(this.results);

    return {
      ...summary,
      successRate: Math.round(
        summary.tests ? (summary.passed / summary.tests) * 100 : 0,
      ),
    };
  };

  printSummary = () =>
    this.print(
      "Summary",
      `=================================
===== HERE ARE TEST SUMMARY =====
${JSON.stringify(this.getSummary(), null, 2)}
=================================`,
    );

  summary = () =>
    this.push({
      type: "summary",
      name: "Summary",
      summary: this.getSummary(),
    });

  /*========================
   GROUPING
  ========================*/
  group = (name: string, callback: () => void = () => {}) => {
    if (this.currentInsideGroup) return callback();

    this.currentInsideGroup = true;
    this.push({
      type: "group",
      name,
      children: [],
    });
    callback();
    this.currentInsideGroup = false;
  };

  getResults = () => this.results;
}
