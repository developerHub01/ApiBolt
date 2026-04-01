import { ResponseInterface } from "@shared/types/request-response.types";
import { TTestResults } from "@shared/types/test-script.types";

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

  getResults = () => {
    return this.results;
  };
}

/*===================================
============= DOCS ==================
=====================================*/
// // ===============================
// // ApiBolt STATUS ASSERTION CHEATSHEET
// // ===============================

// // 1. Basic Assertions
// ab.status("Status is 200").toBe(200)
// ab.status("Status is not 500").not.toBe(500)

// // 2. Multiple Values
// ab.status("Status is valid success").toBeOneOf([200, 201, 204])
// ab.status("Status is not allowed").not.toBeOneOf([400, 401, 403])

// // 3. Comparison Assertions
// ab.status("Greater than 199").toBeGreaterThan(199)
// ab.status("Less than 300").toBeLessThan(300)

// ab.status("Not greater than 500").not.toBeGreaterThan(500)
// ab.status("Not less than 100").not.toBeLessThan(100)

// // 4. Range Assertions
// ab.status("2xx range").toBeBetween(200, 299)
// ab.status("Not in 4xx range").not.toBeBetween(400, 499)

// // 5. Category Assertions
// ab.status("Success response").toBeSuccess()        // 200–299
// ab.status("Client error").toBeClientError()       // 400–499
// ab.status("Server error").toBeServerError()       // 500–599
// ab.status("Redirect").toBeRedirect()              // 300–399

// ab.status("Not server error").not.toBeServerError()
// ab.status("Not redirect").not.toBeRedirect()

// // 6. Exact Status Shortcuts
// ab.status("OK").toBeOK()                          // 200
// ab.status("Created").toBeCreated()                // 201
// ab.status("Accepted").toBeAccepted()              // 202
// ab.status("No Content").toBeNoContent()           // 204

// ab.status("Bad Request").toBeBadRequest()         // 400
// ab.status("Unauthorized").toBeUnauthorized()     // 401
// ab.status("Forbidden").toBeForbidden()           // 403
// ab.status("Not Found").toBeNotFound()            // 404

// ab.status("Internal Error").toBeInternalServerError() // 500
// ab.status("Bad Gateway").toBeBadGateway()        // 502
// ab.status("Service Down").toBeServiceUnavailable() // 503

// // 7. Edge / Advanced Cases
// ab.status("Valid HTTP range").toBeBetween(100, 599)
// ab.status("Invalid status check").not.toBeBetween(600, 999)

// // ===============================
// // INTERNAL METHODS YOU MUST IMPLEMENT
// // ===============================

// // Core:
// // - toBe(expected: number)
// // - toBeOneOf(list: Array<number>)

// // Comparison:
// // - toBeGreaterThan(num: number)
// // - toBeLessThan(num: number)

// // Range:
// // - toBeBetween(min: number, max: number)

// // Category:
// // - toBeSuccess()
// // - toBeClientError()
// // - toBeServerError()
// // - toBeRedirect()

// // Shortcuts:
// // - toBeOK()
// // - toBeCreated()
// // - toBeAccepted()
// // - toBeNoContent()
// // - toBeBadRequest()
// // - toBeUnauthorized()
// // - toBeForbidden()
// // - toBeNotFound()
// // - toBeInternalServerError()
// // - toBeBadGateway()
// // - toBeServiceUnavailable()

// // Modifier:
// // - .not (negates the last test result)

// // ===============================
// // REAL WORLD EXAMPLES
// // ===============================

// ab.status("API should succeed").toBeSuccess()
// ab.status("Should not be server error").not.toBeServerError()
// ab.status("Valid success codes").toBeOneOf([200, 201, 204])
// ab.status("Exact OK").toBeOK()