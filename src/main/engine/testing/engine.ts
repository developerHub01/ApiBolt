import { isDeepStrictEqual } from "node:util";
import { ResponseInterface } from "@shared/types/request-response.types";
import { TTestResults } from "@shared/types/test-script.types";
import { CookieInterface } from "@shared/types/cookies.types";

export class ABTestEngine {
  private results: TTestResults = [];

  constructor(private response: ResponseInterface) {
    this.response = response;
  }

  private push = (name: string, success: boolean, message: string) =>
    this.results.push({
      name,
      success,
      message,
    });

  addDemoResults = () => {
    this.results = [
      {
        name: "Test 1",
        success: true,
        message: "Message 1",
      },
      {
        name: "Test 2",
        success: true,
        message: "Message 2",
      },
      {
        name: "Test 3",
        success: false,
        message: "Message 3",
      },
      {
        name: "Test 4",
        success: true,
        message: "Message 4",
      },
    ];
  };

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
          if (!last || this.results.length === beforeLength) return;
          last.success = !last.success;
          last.message = "NOT: " + last.message;
        },
      ]),
    );

  /**
   * ===============================
   * STATUS ASSERTIONS
   * ===============================
   */
  status = (name: string) => {
    const actual = this.response.status;

    const api = {
      toBe: (expected: number) =>
        this.push(
          name,
          actual === expected,
          `Expected ${actual} to be ${expected}`,
        ),

      toBeOneOf: (list: Array<number>) =>
        this.push(
          name,
          list.includes(actual),
          `Expected ${actual} to be one of ${list.join(", ")}`,
        ),

      toBeGreaterThan: (num: number) =>
        this.push(name, actual > num, `Expected ${actual} > ${num}`),

      toBeLessThan: (num: number) =>
        this.push(name, actual < num, `Expected ${actual} < ${num}`),

      toBeBetween: (min: number, max: number) =>
        this.push(
          name,
          actual >= min && actual <= max,
          `Expected ${actual} between ${min}-${max}`,
        ),

      toBeSuccess: () =>
        this.push(
          name,
          actual >= 200 && actual < 300,
          `Expected ${actual} to be 2xx`,
        ),
      toBeClientError: () =>
        this.push(
          name,
          actual >= 400 && actual < 500,
          `Expected ${actual} to be 4xx`,
        ),
      toBeServerError: () =>
        this.push(
          name,
          actual >= 500 && actual < 600,
          `Expected ${actual} to be 5xx`,
        ),
      toBeRedirect: () =>
        this.push(
          name,
          actual >= 300 && actual < 400,
          `Expected ${actual} to be 3xx`,
        ),

      toBeOK: () => this.push(name, actual === 200, `Expected 200`),
      toBeCreated: () => this.push(name, actual === 201, `Expected 201`),
      toBeAccepted: () => this.push(name, actual === 202, `Expected 202`),
      toBeNoContent: () => this.push(name, actual === 204, `Expected 204`),
      toBeBadRequest: () => this.push(name, actual === 400, `Expected 400`),
      toBeUnauthorized: () => this.push(name, actual === 401, `Expected 401`),
      toBeForbidden: () => this.push(name, actual === 403, `Expected 403`),
      toBeNotFound: () => this.push(name, actual === 404, `Expected 404`),
      toBeInternalServerError: () =>
        this.push(name, actual === 500, `Expected 500`),
      toBeBadGateway: () => this.push(name, actual === 502, `Expected 502`),
      toBeServiceUnavailable: () =>
        this.push(name, actual === 503, `Expected 503`),
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
    const actual = this.response.data;

    const api = {
      toBe: (expected: unknown) =>
        this.push(
          name,
          actual === expected,
          `Expected ${JSON.stringify(actual, null, 2)} to be ${JSON.stringify(expected, null, 2)}`,
        ),

      toEqual: (expected: unknown) =>
        this.push(
          name,
          isDeepStrictEqual(actual, expected),
          `Expected ${JSON.stringify(actual, null, 2)} to equal ${JSON.stringify(expected, null, 2)}`,
        ),

      toExist: () =>
        this.push(
          name,
          actual !== undefined && actual !== null,
          `Expected value to exist`,
        ),

      toBeType: (
        type: "string" | "number" | "boolean" | "object" | "array",
      ) => {
        const actualType = Array.isArray(actual) ? "array" : typeof actual;
        this.push(
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
        this.push(
          name,
          success,
          `Expected ${JSON.stringify(actual)} to contain ${JSON.stringify(item)}`,
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
            this.push(name, false, `Expected property '${key}' not found`);
            return;
          }
        }
        this.push(name, true, `Property '${key}' exists`);
      },

      toHaveLength: (len: number) =>
        this.push(
          name,
          Array.isArray(actual) && (actual as Array<unknown>).length === len,
          `Expected length ${len}, got ${Array.isArray(actual) ? (actual as Array<unknown>).length : "not array"}`,
        ),

      /* numbers */
      toBeGreaterThan: (num: number) => {
        if (typeof actual !== "number" || isNaN(actual)) {
          this.push(name, false, `Expected a number, got ${typeof actual}`);
          return;
        }
        this.push(name, actual > num, `Expected ${actual} > ${num}`);
      },

      toBeLessThan: (num: number) => {
        if (typeof actual !== "number" || isNaN(actual)) {
          this.push(name, false, `Expected a number, got ${typeof actual}`);
          return;
        }
        this.push(name, actual < num, `Expected ${actual} < ${num}`);
      },

      toBeBetween: (min: number, max: number) => {
        if (typeof actual !== "number" || isNaN(actual)) {
          this.push(name, false, `Expected a number, got ${typeof actual}`);
          return;
        }
        this.push(
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
        this.push(
          name,
          actual !== null &&
            typeof actual === "object" &&
            key.toLowerCase() in actual,
          `Expected header '${key}' to exist`,
        ),

      toHaveHeaderValue: (key: string, value: string | RegExp) => {
        if (!actual) {
          this.push(name, false, "Headers are null");
          return;
        }
        if (typeof actual !== "object") {
          this.push(name, false, "Headers are not an object");
          return;
        }

        const val = (actual as Record<string, unknown>)[key.toLowerCase()];
        if (val === undefined || val === null) {
          this.push(name, false, `Expected header '${key}' to exist`);
          return;
        }

        let success = false;
        if (typeof val === "string") {
          success = value instanceof RegExp ? value.test(val) : val === value;
        } else {
          this.push(
            name,
            false,
            `Header '${key}' value is not a string: ${typeof val}`,
          );
          return;
        }

        this.push(
          name,
          success,
          `Expected header '${key}' value to be ${
            value instanceof RegExp ? value : JSON.stringify(value, null, 2)
          }, got ${JSON.stringify(val, null, 2)}`,
        );
      },

      toHaveContentType: (type: string) => {
        if (!actual) {
          this.push(name, false, "Headers are null");
          return;
        }
        if (typeof actual !== "object") {
          this.push(name, false, "Headers are not an object");
          return;
        }

        const val = (actual as Record<string, unknown>)["content-type"];
        if (typeof val !== "string") {
          this.push(
            name,
            false,
            `Content-Type header not found or not a string`,
          );
          return;
        }

        const success = val.includes(type);
        this.push(
          name,
          success,
          `Expected 'Content-Type' to include '${type}', got ${val}`,
        );
      },

      toExist: () =>
        this.push(
          name,
          actual !== undefined && actual !== null,
          "Expected headers object to exist",
        ),

      toBeEmpty: () =>
        this.push(
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
        this.push(
          cookieKey || "cookies",
          cookieKey ? Boolean(actual) : Boolean(cookies.length),
          `Expected cookie${cookieKey ? ` '${cookieKey}'` : "s"} to exist`,
        ),

      toBe: (expected: string) => {
        if (!actual) {
          this.push(cookieKey || "cookies", false, "Cookie not found");
          return;
        }
        this.push(
          cookieKey || "cookies",
          actual.value === expected,
          `Expected cookie '${cookieKey}' to have value '${expected}', got '${actual.value}'`,
        );
      },

      toEqual: (expected: CookieInterface) => {
        if (!actual) {
          this.push(cookieKey || "cookies", false, "Cookie not found");
          return;
        }
        this.push(
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
          this.push(cookieKey || "cookies", false, "Cookie not found");
          return;
        }
        this.push(
          cookieKey || "cookies",
          actual.value.includes(substring),
          `Expected cookie '${cookieKey}' to contain '${substring}'`,
        );
      },

      toHaveProperty: (prop: keyof CookieInterface) => {
        if (!actual) {
          this.push(cookieKey || "cookies", false, "Cookie not found");
          return;
        }
        this.push(
          cookieKey || "cookies",
          prop in actual,
          `Expected cookie '${cookieKey}' to have property '${prop}'`,
        );
      },

      toHaveLength: (len: number) => {
        if (cookieKey) {
          this.push(cookieKey, false, "Cannot check length on single cookie");
          return;
        }
        this.push(
          "cookies",
          cookies.length === len,
          `Expected cookies array length ${len}, got ${cookies.length}`,
        );
      },

      toExpireAfter: (seconds: number) => {
        if (!actual || (!actual.maxAge && !actual.expires)) {
          this.push(cookieKey || "cookies", false, "Cookie expiry not found");
          return;
        }
        const expirySeconds =
          actual.maxAge ?? 0; /* only check maxAge for simplicity */
        this.push(
          cookieKey || "cookies",
          expirySeconds >= seconds,
          `Expected cookie '${cookieKey}' to expire after ${seconds}s, got ${expirySeconds}`,
        );
      },

      toExpireBefore: (seconds: number) => {
        if (!actual || (!actual.maxAge && !actual.expires)) {
          this.push(cookieKey || "cookies", false, "Cookie expiry not found");
          return;
        }
        const expirySeconds = actual.maxAge ?? 0;
        this.push(
          cookieKey || "cookies",
          expirySeconds <= seconds,
          `Expected cookie '${cookieKey}' to expire before ${seconds}s, got ${expirySeconds}`,
        );
      },

      toHavePath: (path: string) => {
        if (!actual) {
          this.push(cookieKey || "cookies", false, "Cookie not found");
          return;
        }
        this.push(
          cookieKey || "cookies",
          actual.path === path,
          `Expected cookie '${cookieKey}' path '${path}', got '${actual.path}'`,
        );
      },

      toHaveDomain: (domain: string) => {
        if (!actual) {
          this.push(cookieKey || "cookies", false, "Cookie not found");
          return;
        }
        this.push(
          cookieKey || "cookies",
          actual.domain === domain,
          `Expected cookie '${cookieKey}' domain '${domain}', got '${actual.domain}'`,
        );
      },

      toBeSecure: () => {
        this.push(
          cookieKey || "cookies",
          Boolean(actual?.secure),
          `Expected cookie '${cookieKey}' to be secure`,
        );
      },

      toBeHttpOnly: () => {
        this.push(
          cookieKey || "cookies",
          Boolean(actual?.httpOnly),
          `Expected cookie '${cookieKey}' to be httpOnly`,
        );
      },

      toBeSameSite: (sameSite: "lax" | "strict" | "none") => {
        if (!actual) {
          this.push(cookieKey || "cookies", false, "Cookie not found");
          return;
        }
        this.push(
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
    const body = this.response.data;
    const headers = this.response.headers;
    const cookies = this.response.cookies || [];

    const api = {
      toBe: (expected: number) =>
        this.push(
          name,
          status === expected,
          `Expected ${status} to be ${expected}`,
        ),
      toBeOneOf: (list: Array<number>) =>
        this.push(
          name,
          list.includes(status),
          `Expected ${status} to be one of ${list.join(", ")}`,
        ),
      toBeGreaterThan: (num: number) =>
        this.push(name, status > num, `Expected ${status} > ${num}`),
      toBeLessThan: (num: number) =>
        this.push(name, status < num, `Expected ${status} < ${num}`),
      toBeBetween: (min: number, max: number) =>
        this.push(
          name,
          status >= min && status <= max,
          `Expected ${status} between ${min}-${max}`,
        ),
      toBeSuccess: () =>
        this.push(
          name,
          status >= 200 && status < 300,
          `Expected ${status} to be 2xx`,
        ),
      toBeClientError: () =>
        this.push(
          name,
          status >= 400 && status < 500,
          `Expected ${status} to be 4xx`,
        ),
      toBeServerError: () =>
        this.push(
          name,
          status >= 500 && status < 600,
          `Expected ${status} to be 5xx`,
        ),
      toBeRedirect: () =>
        this.push(
          name,
          status >= 300 && status < 400,
          `Expected ${status} to be 3xx`,
        ),
      toBeOK: () => this.push(name, status === 200, `Expected 200`),
      toBeCreated: () => this.push(name, status === 201, `Expected 201`),
      toBeAccepted: () => this.push(name, status === 202, `Expected 202`),
      toBeNoContent: () => this.push(name, status === 204, `Expected 204`),
      toBeBadRequest: () => this.push(name, status === 400, `Expected 400`),
      toBeUnauthorized: () => this.push(name, status === 401, `Expected 401`),
      toBeForbidden: () => this.push(name, status === 403, `Expected 403`),
      toBeNotFound: () => this.push(name, status === 404, `Expected 404`),
      toBeInternalServerError: () =>
        this.push(name, status === 500, `Expected 500`),
      toBeBadGateway: () => this.push(name, status === 502, `Expected 502`),
      toBeServiceUnavailable: () =>
        this.push(name, status === 503, `Expected 503`),

      toEqual: (expected: unknown) =>
        this.push(
          name,
          isDeepStrictEqual(body, expected),
          `Expected ${JSON.stringify(body)} to equal ${JSON.stringify(expected)}`,
        ),
      toExist: () =>
        this.push(
          name,
          body !== undefined && body !== null,
          `Expected value to exist`,
        ),
      toBeType: (
        type: "string" | "number" | "boolean" | "object" | "array",
      ) => {
        const actualType = Array.isArray(body) ? "array" : typeof body;
        this.push(
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
        this.push(
          name,
          success,
          `Expected ${JSON.stringify(body)} to contain ${JSON.stringify(item)}`,
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
            this.push(name, false, `Expected property '${key}' not found`);
            return;
          }
        }
        this.push(name, true, `Property '${key}' exists`);
      },
      toHaveLength: (len: number) =>
        this.push(
          name,
          Array.isArray(body) && (body as Array<unknown>).length === len,
          `Expected length ${len}, got ${Array.isArray(body) ? (body as Array<unknown>).length : "not array"}`,
        ),
      toBeGreaterThanNumber: (num: number) =>
        this.push(
          name,
          typeof body === "number" && body > num,
          `Expected ${body} > ${num}`,
        ),
      toBeLessThanNumber: (num: number) =>
        this.push(
          name,
          typeof body === "number" && body < num,
          `Expected ${body} < ${num}`,
        ),
      toBeBetweenNumber: (min: number, max: number) =>
        this.push(
          name,
          typeof body === "number" && body >= min && body <= max,
          `Expected ${body} between ${min}-${max}`,
        ),

      toHaveHeader: (key: string) =>
        this.push(
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
        this.push(
          name,
          success,
          `Expected header '${key}' value to be ${value}, got ${val}`,
        );
      },
      toHaveContentType: (type: string) => {
        const val = headers
          ? (headers as Record<string, unknown>)["content-type"]
          : undefined;
        this.push(
          name,
          typeof val === "string" && val.includes(type),
          `Expected Content-Type to include '${type}', got ${val}`,
        );
      },

      toExistCookie: (cookieKey: string) => {
        this.push(
          name,
          cookies.some(c => c.key === cookieKey),
          `Expected cookie '${cookieKey}' to exist`,
        );
      },
      toBeCookie: (cookieKey: string, value: string) => {
        const c = cookies.find(c => c.key === cookieKey);
        this.push(
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

  getResults = () => {
    return this.results;
  };
}

/*===================================
========= APIBOLT ENGINE DOCS =======
=====================================*/

// /*=============================
// ======== STATUS ASSERTIONS =====
// ==============================*/

// // Basic Assertions
// ab.status("Status is 200").toBe(200)
// ab.status("Status is not 500").not.toBe(500)

// // Multiple Values
// ab.status("Valid success").toBeOneOf([200, 201, 204])
// ab.status("Not allowed").not.toBeOneOf([400, 401, 403])

// // Comparison Assertions
// ab.status("Greater than 199").toBeGreaterThan(199)
// ab.status("Less than 300").toBeLessThan(300)
// ab.status("Not greater than 500").not.toBeGreaterThan(500)
// ab.status("Not less than 100").not.toBeLessThan(100)

// // Range Assertions
// ab.status("2xx range").toBeBetween(200, 299)
// ab.status("Not in 4xx range").not.toBeBetween(400, 499)
// ab.status("Valid HTTP range").toBeBetween(100, 599)
// ab.status("Invalid range").not.toBeBetween(600, 999)

// // Category Assertions
// ab.status("Success response").toBeSuccess()
// ab.status("Client error").toBeClientError()
// ab.status("Server error").toBeServerError()
// ab.status("Redirect").toBeRedirect()
// ab.status("Not server error").not.toBeServerError()
// ab.status("Not redirect").not.toBeRedirect()

// // Shortcut / Exact Status
// ab.status("OK").toBeOK()
// ab.status("Created").toBeCreated()
// ab.status("Accepted").toBeAccepted()
// ab.status("No Content").toBeNoContent()
// ab.status("Bad Request").toBeBadRequest()
// ab.status("Unauthorized").toBeUnauthorized()
// ab.status("Forbidden").toBeForbidden()
// ab.status("Not Found").toBeNotFound()
// ab.status("Internal Server Error").toBeInternalServerError()
// ab.status("Bad Gateway").toBeBadGateway()
// ab.status("Service Unavailable").toBeServiceUnavailable()
// ab.status("Not OK").not.toBeOK()
// ab.status("Not Created").not.toBeCreated()
// ab.status("Not Internal Error").not.toBeInternalServerError()

// /*=============================
// ======== BODY ASSERTIONS ======
// ==============================*/

// // Equality
// ab.body("Value is 10").toBe(10)
// ab.body("Value is not 20").not.toBe(20)
// ab.body("Deep equality").toEqual({ key: "value" })
// ab.body("Deep not equal").not.toEqual({ key: "other" })

// // Existence
// ab.body("Value exists").toExist()
// ab.body("Value does not exist").not.toExist()

// // Type
// ab.body("Check string").toBeType("string")
// ab.body("Check number").toBeType("number")
// ab.body("Check boolean").toBeType("boolean")
// ab.body("Check object").toBeType("object")
// ab.body("Check array").toBeType("array")
// ab.body("Type is not string").not.toBeType("string")
// ab.body("Type is not array").not.toBeType("array")

// // Containment
// ab.body("Array contains item").toContain("apple")
// ab.body("String contains substring").toContain("hello")
// ab.body("Array does not contain").not.toContain("banana")
// ab.body("String does not contain").not.toContain("bye")

// // Property / Key
// ab.body("Has property").toHaveProperty("user.name")
// ab.body("Nested property exists").toHaveProperty("user.address.city")
// ab.body("Property missing").not.toHaveProperty("user.age")

// // Length
// ab.body("Array has length 3").toHaveLength(3)
// ab.body("Array has length not 5").not.toHaveLength(5)

// // Numbers
// ab.body("Greater than 10").toBeGreaterThan(10)
// ab.body("Not greater than 100").not.toBeGreaterThan(100)
// ab.body("Less than 50").toBeLessThan(50)
// ab.body("Not less than 5").not.toBeLessThan(5)
// ab.body("Between 10 and 20").toBeBetween(10, 20)
// ab.body("Not between 30 and 40").not.toBeBetween(30, 40)

// /*=============================
// ======= HEADERS ASSERTIONS =====
// ==============================*/

// // Existence
// ab.headers("Headers exist").toExist()
// ab.headers("Headers do not exist").not.toExist()

// // Property / Key
// ab.headers("Header 'content-type' exists").toHaveProperty("content-type")
// ab.headers("Header 'authorization' exists").toHaveProperty("authorization")
// ab.headers("Header missing").not.toHaveProperty("x-custom-header")

// /*=============================
// ======= COOKIES ASSERTIONS =====
// ==============================*/

// // Existence
// ab.cookies("session_id").toExist()
// ab.cookies("session_id").not.toExist()
// ab.cookies().toExist() // checks that at least one cookie exists

// // Value
// ab.cookies("session_id").toBe("123456")
// ab.cookies("session_id").not.toBe("abcdef")
// ab.cookies("session_id").toEqual({ key: "session_id", value: "123456", path: "/", secure: true })

// // Containment
// ab.cookies("session_id").toContain("123")
// ab.cookies("session_id").not.toContain("xyz")

// // Property / Key
// ab.cookies("session_id").toHaveProperty("path")
// ab.cookies("session_id").toHaveProperty("secure")
// ab.cookies("session_id").not.toHaveProperty("domain")

// // Path / Domain / Secure / HttpOnly
// ab.cookies("session_id").toHavePath("/")
// ab.cookies("session_id").toHaveDomain("example.com")
// ab.cookies("session_id").toBeSecure()
// ab.cookies("session_id").toBeHttpOnly()

// // SameSite
// ab.cookies("session_id").toBeSameSite("lax")
// ab.cookies("session_id").toBeSameSite("strict")
// ab.cookies("session_id").toBeSameSite("none")

// // Expiry / MaxAge
// ab.cookies("session_id").toExpireAfter(3600) // expires after at least 3600 seconds
// ab.cookies("session_id").toExpireBefore(7200) // expires before 7200 seconds

// /*=============================
// ======= FULL EXAMPLES =========
// ==============================*/

// // Status Examples
// ab.status("Check 200").toBeOK()
// ab.status("Check not server error").not.toBeServerError()
// ab.status("Success or created").toBeOneOf([200, 201])
// ab.status("Invalid status").not.toBeBetween(600, 700)

// // Body Examples
// ab.body("Check exact number").toBe(42)
// ab.body("Check deep object").toEqual({ id: 1, name: "test" })
// ab.body("Value exists").toExist()
// ab.body("Type check").toBeType("array")
// ab.body("Array contains").toContain("value")
// ab.body("Object has nested").toHaveProperty("user.address.zip")
// ab.body("Array length").toHaveLength(3)
// ab.body("Greater than / Less than").toBeGreaterThan(5)
// ab.body("Between range").toBeBetween(1, 10)

// // Headers Examples
// ab.headers("Check content-type").toHaveProperty("content-type")
// ab.headers("Check existence").toExist()
// ab.headers("Check missing header").not.toHaveProperty("x-missing")

// // Cookies Examples
// ab.cookies("auth_token").toExist()
// ab.cookies("auth_token").toBe("abcdef123456")
// ab.cookies("auth_token").toContain("123")
// ab.cookies("auth_token").toHaveProperty("path")
// ab.cookies("auth_token").toHavePath("/")
// ab.cookies("auth_token").toBeSecure()
// ab.cookies("auth_token").toBeHttpOnly()
// ab.cookies("auth_token").toBeSameSite("strict")
// ab.cookies("auth_token").toExpireAfter(1800)
// ab.cookies("auth_token").toExpireBefore(3600)
// ab.cookies().toExist()
// ab.cookies().toHaveLength(3)
